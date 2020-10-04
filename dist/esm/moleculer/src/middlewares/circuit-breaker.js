import constants from '../constants.js';
import { setInterval, setTimeout } from 'timers-browserify';
import metrics from '../metrics/index.js';

const { METRIC }	= metrics;

var circuitBreaker = function circuitBreakerMiddleware(broker) {

	let windowTimer;
	const store = new Map();
	let logger;

	/**
	 * Create timer to clear endpoint store
	 *
	 * @param {Number} windowTime
	 */
	function createWindowTimer(windowTime) {
		if (!windowTimer) {
			windowTimer = setInterval(() => resetStore(), (windowTime || 60) * 1000);
			windowTimer.unref();
		}
	}

	/**
	 * Clear endpoint state store
	 */
	function resetStore() {
		if (!logger) return;

		logger.debug("Reset circuit-breaker endpoint states...");
		store.forEach((item, key) => {
			if (item.count == 0) {
				logger.debug(`Remove '${key}' endpoint state because it is not used`);
				store.delete(key);
				return;
			}

			logger.debug(`Clean '${key}' endpoint state.`);
			item.count = 0;
			item.failures = 0;
		});
	}

	/**
	 * Get Endpoint state from store. If not exists, create it.
	 *
	 * @param {Endpoint} ep
	 * @param {Service} service
	 * @param {Object} opts
	 * @returns {Object}
	 */
	function getEpState(ep, service, opts) {
		let item = store.get(ep.name);
		if (!item) {
			item = {
				ep,
				service,
				opts,
				count: 0,
				failures: 0,
				state: constants.CIRCUIT_CLOSE,
				cbTimer: null
			};
			store.set(ep.name, item);
		}
		return item;
	}

	/**
	 * Increment failure counter
	 *
	 * @param {Object} item
	 * @param {Error} err
	 * @param {Context} ctx
	 */
	function failure(item, err, ctx) {
		item.count++;
		item.failures++;

		checkThreshold(item);
	}

	/**
	 * Increment request counter and switch CB to CLOSE if it is on HALF_OPEN_WAIT.
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	 */
	function success(item, ctx) {
		item.count++;

		if (item.state === constants.CIRCUIT_HALF_OPEN_WAIT)
			circuitClose(item);
		else
			checkThreshold(item);
	}

	/**
	 * Check circuit-breaker failure threshold of Endpoint
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	 */
	function checkThreshold(item, ctx) {
		if (item.count >= item.opts.minRequestCount) {
			const rate = item.failures / item.count;
			if (rate >= item.opts.threshold)
				trip(item);
		}
	}

	/**
	 * Trip the circuit-breaker, change the status to open
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	 */
	function trip(item, ctx) {
		if (item.state == constants.CIRCUIT_OPEN) return;

		item.state = constants.CIRCUIT_OPEN;
		item.ep.state = false;

		if (item.cbTimer) {
			clearTimeout(item.cbTimer);
			item.cbTimer = null;
		}

		item.cbTimer = setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
		item.cbTimer.unref();

		const action = item.ep.action;
		const service = item.service.fullName;

		const rate = item.count > 0 ? item.failures / item.count : 0;
		logger.debug(`Circuit breaker has been opened on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name, failures: item.failures, count: item.count, rate });
		broker.broadcast("$circuit-breaker.opened", { nodeID: item.ep.id, service, action: action.name, failures: item.failures, count: item.count, rate });

		broker.metrics.set(METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 1, { affectedNodeID: item.ep.id, service, action: action.name });
		broker.metrics.increment(METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL, { affectedNodeID: item.ep.id, service, action: action.name });
	}

	/**
	 * Change circuit-breaker status to half-open
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	 */
	function halfOpen(item) {
		item.state = constants.CIRCUIT_HALF_OPEN;
		item.ep.state = true;

		const action = item.ep.action;
		const service = item.service.fullName;

		logger.debug(`Circuit breaker has been half-opened on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name });

		broker.broadcast("$circuit-breaker.half-opened", { nodeID: item.ep.id, service, action: action.name });

		broker.metrics.set(METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });
		broker.metrics.set(METRIC.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 1, { affectedNodeID: item.ep.id, service, action: action.name });

		if (item.cbTimer) {
			clearTimeout(item.cbTimer);
			item.cbTimer = null;
		}
	}

	/**
	 * Change circuit-breaker status to half-open waiting. First request is invoked after half-open.
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	*/
	function halfOpenWait(item, ctx) {
		item.state = constants.CIRCUIT_HALF_OPEN_WAIT;
		item.ep.state = false;

		// Anti-stick protection
		item.cbTimer = setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
		item.cbTimer.unref();
	}

	/**
	 * Change circuit-breaker status to close
	 *
	 * @param {Object} item
	 * @param {Context} ctx
	 */
	function circuitClose(item) {
		item.state = constants.CIRCUIT_CLOSE;
		item.ep.state = true;
		item.failures = 0;
		item.count = 0;

		const action = item.ep.action;
		const service = item.service.fullName;

		logger.debug(`Circuit breaker has been closed on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name });

		broker.broadcast("$circuit-breaker.closed", { nodeID: item.ep.id, service, action: action.name });

		broker.metrics.set(METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });
		broker.metrics.set(METRIC.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });

		if (item.cbTimer) {
			clearTimeout(item.cbTimer);
			item.cbTimer = null;
		}
	}

	/**
	 * Middleware wrapper function
	 *
	 * @param {Function} handler
	 * @param {Action} action
	 * @returns {Function}
	 */
	function wrapCBMiddleware(handler, action) {
		const service = action.service;
		// Merge action option and broker options
		const opts = Object.assign({}, this.options.circuitBreaker || {}, action.circuitBreaker || {});
		if (opts.enabled) {
			return function circuitBreakerMiddleware(ctx) {
				// Get endpoint state item
				const ep = ctx.endpoint;
				const item = getEpState(ep, service, opts);

				// Handle half-open state in circuit breaker
				if (item.state == constants.CIRCUIT_HALF_OPEN) {
					halfOpenWait(item);
				}

				// Call the handler
				return handler(ctx).then(res => {
					const item = getEpState(ep, service, opts);
					success(item);

					return res;
				}).catch(err => {
					if (opts.check && opts.check(err)) {
						// Failure if error is created locally (not came from a 3rd node error)
						if (item && (!err.nodeID || err.nodeID == ctx.nodeID)) {
							const item = getEpState(ep, service, opts);
							failure(item);
						}
					}

					return this.Promise.reject(err);
				});
			}.bind(this);
		}

		return handler;
	}


	return {
		name: "CircuitBreaker",

		created(broker) {
			logger = broker.getLogger("circuit-breaker");

			// Expose the internal state store.
			broker.CircuitBreakerStore = store;

			const opts = broker.options.circuitBreaker;
			if (opts.enabled) {
				createWindowTimer(opts.windowTime);

				if (broker.isMetricsEnabled()) {
					broker.metrics.register({ name: METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, type: METRIC.TYPE_GAUGE, labelNames: ["affectedNodeID", "service", "action"], description: "Number of active opened circuit-breakers" });
					broker.metrics.register({ name: METRIC.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL, type: METRIC.TYPE_COUNTER, labelNames: ["affectedNodeID", "service", "action"], description: "Number of opened circuit-breakers" });
					broker.metrics.register({ name: METRIC.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, type: METRIC.TYPE_GAUGE, labelNames: ["affectedNodeID", "service", "action"], description: "Number of active half-opened circuit-breakers" });
				}
			}
		},

		localAction: wrapCBMiddleware,
		remoteAction: wrapCBMiddleware,

		stopped() {
			if (windowTimer) {
				clearInterval(windowTimer);
			}

			delete broker.CircuitBreakerStore;
		}
	};
};

export default circuitBreaker;
//# sourceMappingURL=circuit-breaker.js.map
