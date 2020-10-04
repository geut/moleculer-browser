import errors from '../errors.js';
import utils_1 from '../utils.js';
import require$$19 from '../../../no-impl.js';
import base from './base.js';
import memory from './memory.js';
import memoryLru from './memory-lru.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Cachers = {
	Base: base,
	Memory: memory,
	MemoryLRU: memoryLru,
	Redis: require$$19
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Cachers).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Cachers[n];
}

/**
 * Resolve cacher by name
 *
 * @param {object|string} opt
 * @returns {Cacher}
 */
function resolve(opt) {
	if (opt instanceof Cachers.Base) {
		return opt;
	} else if (opt === true) {
		return new Cachers.Memory();
	} else if (isString(opt)) {
		let CacherClass = getByName(opt);
		if (CacherClass)
			return new CacherClass();

		if (opt.startsWith("redis://"))
			CacherClass = Cachers.Redis;

		if (CacherClass)
			return new CacherClass(opt);
		else
			throw new BrokerOptionsError(`Invalid cacher type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let CacherClass = getByName(opt.type || "Memory");
		if (CacherClass)
			return new CacherClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid cacher type '${opt.type}'.`, { type: opt.type });
	}

	return null;
}

function register(name, value) {
	Cachers[name] = value;
}

var cachers = Object.assign(Cachers, { resolve, register });

export default cachers;
//# sourceMappingURL=index.js.map
