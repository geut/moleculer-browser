import proc from '../../process.js';
import _ from 'lodash';
import utils_1 from './utils.js';
import loggers from './loggers/index.js';

const { isPlainObject, isString } = utils_1;


const noop = () => {};
const cwd = proc.cwd();

/**
 * Log factory class.
 *
 * @class LoggerFactory
 */
class LoggerFactory {

	/**
	 * Constructor of LoggerFactory
	 */
	constructor(broker) {
		this.broker = broker;
		this.appenders = [];
		this.cache = new Map();
	}

	/**
	 * Initialize module.
	 */
	init(opts) {
		this.opts = opts;

		const globalLogLevel = this.broker.options.logLevel || "info";

		if (opts === false || opts == null) {
			// No logger
			this.appenders = [];

		} else if (opts === true || opts === console) {
			// Default console logger
			this.appenders = [loggers.resolve({
				type: "Console",
				options: {
					level: globalLogLevel
				}
			})];

		} else {
			if (!Array.isArray(opts)) {
				opts = [opts];
			}

			this.appenders = _.compact(opts).map(o => {
				// Built-in shorthand
				if (isString(o))
					return loggers.resolve({ type: o, options: { level: globalLogLevel } });

				// Build-in with options
				if (isPlainObject(o))
					return loggers.resolve(_.defaultsDeep({}, o, { options: { level: globalLogLevel } }));

				// Custom logger instance
				return loggers.resolve(o);
			});
		}

		// Initialize appenders
		this.appenders.forEach(app => app.init(this));
	}

	/**
	 * Stopping all appenders
	 */
	stop() {
		return this.broker.Promise.all(this.appenders.map(appender => appender.stop()));
	}

	/**
	 * Get caller information from error stack trace.
	 */
	getCallerFromStack() {
		const _prepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const stack = new Error().stack;
		Error.prepareStackTrace = _prepareStackTrace;

		if (stack.length > 2) {
			const site = stack[2];
			return {
				filename: site.getFileName().substring(cwd.length + 1),
				lineNumber: site.getLineNumber(),
				columnNumber: site.getColumnNumber(),
				methodName: site.getMethodName(),
				functionName: site.getFunctionName(),
			};
		}
	}

	/**
	 * Get a logger for a module (service, transporter, cacher, context...etc)
	 *
	 * @param {Object} bindings
	 * @returns {ModuleLogger}
	 *
	 * @memberof ServiceBroker
	 */
	getLogger(bindings) {
		let logger = this.cache.get(this.getBindingsKey(bindings));
		if (logger) return logger;

		logger = {};
		const broker = this.broker;
		const appenders = this.appenders;

		const logHandlers = _.compact(appenders.map(app => app.getLogHandler(bindings)));

		loggers.LEVELS.forEach((type) => {
			if (logHandlers.length == 0)
				return logger[type] = noop;

			logger[type] = function(...args) {
				if (broker.middlewares && broker.middlewares.registeredHooks.newLogEntry)
					broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

				if (logHandlers.length == 0) return;

				for(let i = 0; i < logHandlers.length; i++)
					logHandlers[i](type, args);
			};
		});

		/*logger.log = function(type, ...args) {
			if (broker.middlewares)
				broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

			if (logHandlers.length == 0) return;

			logHandlers.forEach(fn => fn(type, args));
		};*/

		logger.appenders = appenders;


		this.cache.set(this.getBindingsKey(bindings), logger);

		return logger;
	}

	/**
	 * Create a key from bindings for logger caching.
	 *
	 * @param {object} bindings
	 * @returns {String}
	 */
	getBindingsKey(bindings) {
		if (!bindings) return "";

		return ["nodeID", "ns", "mod"]
			.map(key => bindings[key])
			.join("|");
	}

}

var loggerFactory = LoggerFactory;

export default loggerFactory;
//# sourceMappingURL=logger-factory.js.map
