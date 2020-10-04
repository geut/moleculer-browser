import errors from '../errors.js';
import utils_1 from '../utils.js';
import require$$19 from '../../../no-impl.js';
import base from './base.js';
import formatted from './formatted.js';
import console_1 from './console.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;


const Loggers = {
	Base: base,
	Formatted: formatted,

	Bunyan: require$$19,
	Console: console_1,
	Datadog: require$$19,
	Debug: require$$19,
	File: require$$19,
	Log4js: require$$19,
	Pino: require$$19,
	Winston: require$$19,

	LEVELS: base.LEVELS
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Loggers).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Loggers[n];
}

/**
 * Resolve reporter by name
 *
 * @param {object|string} opt
 * @returns {Reporter}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (opt instanceof Loggers.Base) {
		return opt;
	} else if (isString(opt)) {
		let LoggerClass = getByName(opt);
		if (LoggerClass)
			return new LoggerClass();

	} else if (isObject(opt)) {
		let LoggerClass = getByName(opt.type);
		if (LoggerClass)
			return new LoggerClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid logger configuration. Type: '${opt.type}'`, { type: opt.type });
	}

	throw new BrokerOptionsError(`Invalid logger configuration: '${opt}'`, { type: opt });
}

function register(name, value) {
	Loggers[name] = value;
}

var loggers = Object.assign(Loggers, { resolve, register });

export default loggers;
//# sourceMappingURL=index.js.map
