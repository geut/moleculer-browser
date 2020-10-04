import _ from 'lodash';
import utils_1 from '../../utils.js';

const { isObject } = utils_1;

/**
 * Abstract Trace Exporter
 *
 * @class BaseTraceExporter
 */
class BaseTraceExporter {

	/**
	 * Creates an instance of BaseTraceExporter.
	 * @param {Object?} opts
	 * @memberof BaseTraceExporter
	 */
	constructor(opts) {
		this.opts = opts || {};
		this.Promise = Promise; // default promise before logger is initialized
	}

	/**
	 * Initialize Trace Exporter.
	 *
	 * @param {Tracer} tracer
	 * @memberof BaseTraceExporter
	 */
	init(tracer) {
		this.tracer = tracer;
		this.broker = tracer.broker;
		this.Promise = this.broker.Promise;
		this.logger = this.opts.logger || this.tracer.logger;
	}

	/**
	 * Stop Trace exporter
	 */
	stop() {
		// Not implemented
	}

	/**
	 * Span is started.
	 *
	 * @param {Span} span
	 * @memberof BaseTraceExporter
	 */
	spanStarted(/*span*/) {
		// Not implemented
	}

	/**
	 * Span is finished.
	 *
	 * @param {Span} span
	 * @memberof BaseTraceExporter
	 */
	spanFinished(/*span*/) {
		// Not implemented
	}

	/**
	 * Flattening tags to one-level object.
	 * E.g.
	 *  **From:**
	 * 	```js
	 * 	{
	 * 		error: {
	 * 			name: "MoleculerError"
	 * 		}
	 * 	}
	 *  ```
	 *
	 * 	**To:**
	 * 	```js
	 *  {
	 * 		"error.name": "MoleculerError"
	 *  }
	 *  ```
	 *
	 * @param {Object} obj
	 * @param {boolean} [convertToString=false]
	 * @param {string} [path=""]
	 * @returns {Object}
	 * @memberof BaseTraceExporter
	 */
	flattenTags(obj, convertToString = false, path = "") {
		if (!obj) return null;

		return Object.keys(obj).reduce((res, k) => {
			const o = obj[k];
			const pp = (path ? path + "." : "") + k;

			if (isObject(o))
				Object.assign(res, this.flattenTags(o, convertToString, pp));
			else if (o !== undefined) {
				res[pp] = convertToString ? String(o) : o;
			}

			return res;
		}, {});
	}

	/**
	 * Convert Error to POJO.
	 *
	 * @param {Error} err
	 * @returns {Object}
	 * @memberof BaseTraceExporter
	 */
	errorToObject(err) {
		if (!err) return null;

		return _.pick(err, this.tracer.opts.errorFields);
	}
}

var base = BaseTraceExporter;

export default base;
//# sourceMappingURL=base.js.map
