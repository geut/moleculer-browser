import errors from '../errors.js';
import utils_1 from '../utils.js';
import require$$19 from '../../../no-impl.js';
import base from './base.js';
import json from './json.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Serializers = {
	Base: base,
	JSON: json,
	Avro: require$$19,
	MsgPack: require$$19,
	ProtoBuf: require$$19,
	Thrift: require$$19,
	Notepack: require$$19
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Serializers).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Serializers[n];
}

/**
 * Resolve serializer by name
 *
 * @param {object|string} opt
 * @returns {Serializer}
 * @memberof ServiceBroker
 */
function resolve(opt) {
	if (opt instanceof Serializers.Base) {
		return opt;
	} else if (isString(opt)) {
		let SerializerClass = getByName(opt);
		if (SerializerClass)
			return new SerializerClass();
		else
			throw new BrokerOptionsError(`Invalid serializer type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let SerializerClass = getByName(opt.type || "JSON");
		if (SerializerClass)
			return new SerializerClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid serializer type '${opt.type}'.`, { type: opt.type });
	}

	return new Serializers.JSON();
}

function register(name, value) {
	Serializers[name] = value;
}

var serializers = Object.assign(Serializers, { resolve, register });

export default serializers;
//# sourceMappingURL=index.js.map
