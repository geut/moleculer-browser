import errors from '../../errors.js';
import utils_1 from '../../utils.js';
import base from './base.js';
import console from './console.js';
import require$$19 from '../../../../no-impl.js';
import event from './event.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Reporters = {
	Base: base,
	Console: console,
	CSV: require$$19,
	Event: event,
	Datadog: require$$19,
	Prometheus: require$$19,
	StatsD: require$$19,
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Reporters).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Reporters[n];
}

/**
 * Resolve reporter by name
 *
 * @param {object|string} opt
 * @returns {Reporter}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (opt instanceof Reporters.Base) {
		return opt;
	} else if (isString(opt)) {
		let ReporterClass = getByName(opt);
		if (ReporterClass)
			return new ReporterClass();

	} else if (isObject(opt)) {
		let ReporterClass = getByName(opt.type);
		if (ReporterClass)
			return new ReporterClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid metric reporter type '${opt.type}'.`, { type: opt.type });
	}

	throw new BrokerOptionsError(`Invalid metric reporter type '${opt}'.`, { type: opt });
}

function register(name, value) {
	Reporters[name] = value;
}

var reporters = Object.assign(Reporters, { resolve, register });

export default reporters;
//# sourceMappingURL=index.js.map
