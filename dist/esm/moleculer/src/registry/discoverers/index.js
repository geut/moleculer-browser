import errors from '../../errors.js';
import utils_1 from '../../utils.js';
import require$$19 from '../../../../no-impl.js';
import base from './base.js';
import local from './local.js';

const { BrokerOptionsError } = errors;
const { isObject, isString } = utils_1;

const Discoverers = {
	Base: base,
	Local: local,
	Etcd3: require$$19,
	Redis: require$$19
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Discoverers).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Discoverers[n];
}

/**
 * Resolve discoverer by name
 *
 * @param {object|string} opt
 * @returns {Discoverer}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (opt instanceof Discoverers.Base) {
		return opt;
	} else if (isString(opt)) {
		let DiscovererClass = getByName(opt);
		if (DiscovererClass)
			return new DiscovererClass();

		if (opt.startsWith("redis://"))
			return new Discoverers.Redis(opt);

		if (opt.startsWith("etcd3://"))
			return new Discoverers.Etcd3(opt);

		throw new BrokerOptionsError(`Invalid Discoverer type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let DiscovererClass = getByName(opt.type || "Local");
		if (DiscovererClass)
			return new DiscovererClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid Discoverer type '${opt.type}'.`, { type: opt.type });
	}

	return new Discoverers.Local();
}

function register(name, value) {
	Discoverers[name] = value;
}

var discoverers = Object.assign(Discoverers, { resolve, register });

export default discoverers;
//# sourceMappingURL=index.js.map
