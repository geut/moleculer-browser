import errors from '../../errors.js';
import base from './base.js';
import gauge from './gauge.js';
import counter from './counter.js';
import histogram from './histogram.js';
import info from './info.js';

const { BrokerOptionsError } = errors;

const Types = {
	Base: base,
	Counter: counter,
	Gauge: gauge,
	Histogram: histogram,
	Info: info,
};

/**
 * Get MetricType class by name.
 *
 * @param {String} name
 * @returns
 */
function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Types).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Types[n];
}

/**
 * Resolve metric type by name
 *
 * @param {string} type
 * @returns {BaseMetric}
 * @memberof ServiceBroker
 */
function resolve(type) {
	const TypeClass = getByName(type);
	if (!TypeClass)
		throw new BrokerOptionsError(`Invalid metric type '${type}'.`, { type });

	return TypeClass;
}

function register(name, value) {
	Types[name] = value;
}

var types = Object.assign(Types, { resolve, register });

export default types;
//# sourceMappingURL=index.js.map
