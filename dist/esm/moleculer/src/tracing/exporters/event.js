import { setInterval } from 'timers-browserify';
import _ from 'lodash';
import utils_1 from '../../utils.js';
import base from './base.js';

const { isFunction } 		= utils_1;

/**
 * Event Trace Exporter.
 *
 * @class EventTraceExporter
 */
class EventTraceExporter extends base {

	/**
	 * Creates an instance of EventTraceExporter.
	 * @param {Object?} opts
	 * @memberof EventTraceExporter
	 */
	constructor(opts) {
		super(opts);

		this.opts = _.defaultsDeep(this.opts, {
			/** @type {String} Base URL for Zipkin server. */
			eventName: "$tracing.spans",

			sendStartSpan: false,
			sendFinishSpan: true,

			broadcast: false,

			groups: null,

			/** @type {Number} Batch send time interval. */
			interval: 5,

			spanConverter: null,

			/** @type {Object?} Default span tags */
			defaultTags: null
		});

		this.queue = [];
	}

	/**
	 * Initialize Trace Exporter.
	 *
	 * @param {Tracer} tracer
	 * @memberof EventTraceExporter
	 */
	init(tracer) {
		super.init(tracer);

		if (this.opts.interval > 0) {
			this.timer = setInterval(() => this.flush(), this.opts.interval * 1000);
			this.timer.unref();
		}

		this.defaultTags = isFunction(this.opts.defaultTags) ? this.opts.defaultTags.call(this, tracer) : this.opts.defaultTags;
	}

	/**
	 * Stop Trace exporter
	 */
	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		return this.Promise.resolve();
	}

	/**
	 * Span is started.
	 *
	 * @param {Span} span
	 * @memberof BaseTraceExporter
	 */
	spanStarted(span) {
		if (this.opts.sendStartSpan) {
			this.queue.push(span);
			if (!this.timer)
				this.flush();
		}
	}

	/**
	 * Span is finished.
	 *
	 * @param {Span} span
	 * @memberof EventTraceExporter
	 */
	spanFinished(span) {
		if (this.opts.sendFinishSpan) {
			this.queue.push(span);
			if (!this.timer)
				this.flush();
		}
	}

	/**
	 * Flush tracing data to Datadog server
	 *
	 * @memberof EventTraceExporter
	 */
	flush() {
		if (this.queue.length == 0) return;

		const data = this.generateTracingData();
		this.queue.length = 0;

		if (this.opts.broadcast) {
			this.logger.debug(`Send tracing spans (${data.length} spans) broadcast events.`);
			this.broker.broadcast(this.opts.eventName, data, { groups: this.opts.groups });
		} else {
			this.logger.debug(`Send tracing spans (${data.length} spans) events.`);
			this.broker.emit(this.opts.eventName, data, { groups: this.opts.groups });
		}
	}

	/**
	 * Generate tracing data with custom converter
	 *
	 * @returns {Array<Object>}
	 * @memberof EventTraceExporter
	 */
	generateTracingData() {
		if (isFunction(this.opts.spanConverter))
			return this.queue.map(span => this.opts.spanConverter.call(this, span));

		return Array.from(this.queue).map(span => {
			const newSpan = Object.assign({}, span);
			if (newSpan.error)
				newSpan.error = this.errorToObject(span.error);

			return newSpan;
		});
	}

}

var event = EventTraceExporter;

export default event;
//# sourceMappingURL=event.js.map
