import errors from '../errors.js';
import getCpuUsage from '../../../cpu-usage.js';
import utils_1 from '../utils.js';
import base from './base.js';
import roundRobin from './round-robin.js';
import random_1 from './random.js';
import latency from './latency.js';
import shard from './shard.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Strategies = {
	Base: base,
	RoundRobin: roundRobin,
	Random: random_1,
	CpuUsage: getCpuUsage,
	Latency: latency,
	Shard: shard
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Strategies).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Strategies[n];
}

/**
 * Resolve strategy by name
 *
 * @param {object|string} opt
 * @returns {Strategy}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (Object.prototype.isPrototypeOf.call(Strategies.Base, opt)) {
		return opt;
	} else if (isString(opt)) {
		let StrategyClass = getByName(opt);
		if (StrategyClass)
			return StrategyClass;
		else
			throw new BrokerOptionsError(`Invalid strategy type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let StrategyClass = getByName(opt.type || "RoundRobin");
		if (StrategyClass)
			return StrategyClass;
		else
			throw new BrokerOptionsError(`Invalid strategy type '${opt.type}'.`, { type: opt.type });
	}

	return Strategies.RoundRobin;
}


function register(name, value) {
	Strategies[name] = value;
}

var strategies = Object.assign(Strategies, { resolve, register });

export default strategies;
//# sourceMappingURL=index.js.map
