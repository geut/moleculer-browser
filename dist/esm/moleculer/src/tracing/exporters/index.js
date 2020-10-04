import errors from '../../errors.js';
import utils_1 from '../../utils.js';
import require$$19 from '../../../../no-impl.js';
import base from './base.js';
import console from './console.js';
import event from './event.js';
import eventLegacy from './event-legacy.js';
import zipkin from './zipkin.js';
import newrelic from './newrelic.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Exporters = {
	Base: base,
	Console: console,
	Datadog: require$$19,
	//DatadogSimple: require("./datadog-simple"),
	Event: event,
	EventLegacy: eventLegacy,
	Jaeger: require$$19,
	Zipkin: zipkin,
	NewRelic: newrelic
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Exporters).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Exporters[n];
}

/**
 * Resolve exporter by name
 *
 * @param {object|string} opt
 * @returns {Exporters.Base}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (opt instanceof Exporters.Base) {
		return opt;
	} else if (isString(opt)) {
		let ExporterClass = getByName(opt);
		if (ExporterClass)
			return new ExporterClass();
		else
			throw new BrokerOptionsError(`Invalid tracing exporter type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let ExporterClass = getByName(opt.type);
		if (ExporterClass)
			return new ExporterClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid tracing exporter type '${opt.type}'.`, { type: opt.type });
	}

	throw new BrokerOptionsError(`Invalid tracing exporter type '${opt}'.`, { type: opt });
}

function register(name, value) {
	Exporters[name] = value;
}

var exporters = Object.assign(Exporters, { resolve, register });

export default exporters;
//# sourceMappingURL=index.js.map
