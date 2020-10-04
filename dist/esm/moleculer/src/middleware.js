import _ from 'lodash';
import errors from './errors.js';
import utils_1 from './utils.js';
import middlewares from './middlewares/index.js';

const { BrokerOptionsError } = errors;
const { isObject, isFunction, isString }	= utils_1;

class MiddlewareHandler {

	constructor(broker) {
		this.broker = broker;

		this.list = [];

		this.registeredHooks = {};
	}

	add(mw) {
		if (!mw) return;

		if (isString(mw)) {
			const found = _.get(middlewares, mw);
			if (!found)
				throw new BrokerOptionsError(`Invalid built-in middleware type '${mw}'.`, { type: mw });
			mw = found;
		}

		if (isFunction(mw))
			mw = mw.call(this.broker, this.broker);

		if (!isObject(mw))
			throw new BrokerOptionsError(`Invalid middleware type '${typeof mw}'. Accepted only Object of Function.`, { type: typeof mw });

		Object.keys(mw).forEach(key => {
			if (isFunction(mw[key])) {
				if (Array.isArray(this.registeredHooks[key]))
					this.registeredHooks[key].push(mw[key]);
				else
					this.registeredHooks[key] = [mw[key]];
			}
		});

		this.list.push(mw);
	}

	/**
	 * Wrap a handler
	 *
	 * @param {string} method
	 * @param {Function} handler
	 * @param {Object} def
	 * @returns {Function}
	 * @memberof MiddlewareHandler
	 */
	wrapHandler(method, handler, def) {
		if (this.registeredHooks[method] && this.registeredHooks[method].length) {
			handler = this.registeredHooks[method].reduce((handler, fn) => {
				return fn.call(this.broker, handler, def);
			}, handler);
		}

		return handler;
	}

	/**
	 * Call a handler asynchronously in all middlewares
	 *
	 * @param {String} method
	 * @param {Array<any>} args
	 * @param {Object} opts
	 * @returns {Promise}
	 * @memberof MiddlewareHandler
	 */
	callHandlers(method, args, opts = {}) {
		if (this.registeredHooks[method] && this.registeredHooks[method].length) {
			const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
			return list.reduce((p, fn) => p.then(() => fn.apply(this.broker, args)), this.broker.Promise.resolve());
		}

		return this.broker.Promise.resolve();
	}

	/**
	 * Call a handler synchronously in all middlewares
	 *
	 * @param {String} method
	 * @param {Array<any>} args
	 * @param {Object} opts
	 * @returns {Array<any}
	 * @memberof MiddlewareHandler
	 */
	callSyncHandlers(method, args, opts = {}) {
		if (this.registeredHooks[method] && this.registeredHooks[method].length) {
			const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
			return list.map(fn => fn.apply(this.broker, args));
		}
		return;
	}

	/**
	 * Get count of registered middlewares
	 *
	 * @returns {Number}
	 * @memberof MiddlewareHandler
	 */
	count() {
		return this.list.length;
	}

	/**
	 * Wrap a method
	 *
	 * @param {string} method
	 * @param {Function} handler
	 * @param {any} bindTo
	 * @param {Object} opts
	 * @returns {Function}
	 * @memberof MiddlewareHandler
	 */
	wrapMethod(method, handler, bindTo = this.broker, opts = {}) {
		if (this.registeredHooks[method] && this.registeredHooks[method].length) {
			const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
			handler = list.reduce((next, fn) => fn.call(bindTo, next), handler.bind(bindTo));
		}

		return handler;
	}

}

var middleware = MiddlewareHandler;

export default middleware;
//# sourceMappingURL=middleware.js.map
