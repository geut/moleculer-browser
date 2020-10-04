import errors from '../errors.js';
import utils_1 from '../utils.js';
import require$$19 from '../../../no-impl.js';
import base from './base.js';
import fake from './fake.js';

const { isObject, isString } = utils_1;
const { BrokerOptionsError } = errors;

const Transporters = {
	Base: base,
	Fake: fake,
	NATS: require$$19,
	MQTT: require$$19,
	Redis: require$$19,
	AMQP: require$$19,
	AMQP10: require$$19,
	Kafka: require$$19,
	STAN: require$$19,
	TCP: require$$19
};

function getByName(name) {
	/* istanbul ignore next */
	if (!name)
		return null;

	let n = Object.keys(Transporters).find(n => n.toLowerCase() == name.toLowerCase());
	if (n)
		return Transporters[n];
}

/**
 * Resolve transporter by name
 *
 * @param {object|string} opt
 * @returns {Transporter}
 */
function resolve(opt) {
	if (opt instanceof Transporters.Base) {
		return opt;
	} else if (isString(opt)) {
		let TransporterClass = getByName(opt);
		if (TransporterClass)
			return new TransporterClass();

		if (opt.startsWith("nats://"))
			TransporterClass = Transporters.NATS;
		else if (opt.startsWith("mqtt://") || opt.startsWith("mqtts://"))
			TransporterClass = Transporters.MQTT;
		else if (opt.startsWith("redis://") || opt.startsWith("rediss://"))
			TransporterClass = Transporters.Redis;
		else if (opt.startsWith("amqp://") || opt.startsWith("amqps://"))
			TransporterClass = Transporters.AMQP;
		else if (opt.startsWith("amqp10://"))
			TransporterClass = Transporters.AMQP10;
		else if (opt.startsWith("kafka://"))
			TransporterClass = Transporters.Kafka;
		else if (opt.startsWith("stan://"))
			TransporterClass = Transporters.STAN;
		else if (opt.startsWith("tcp://"))
			TransporterClass = Transporters.TCP;

		if (TransporterClass)
			return new TransporterClass(opt);
		else
			throw new BrokerOptionsError(`Invalid transporter type '${opt}'.`, { type: opt });

	} else if (isObject(opt)) {
		let TransporterClass = getByName(opt.type || "NATS");

		if (TransporterClass)
			return new TransporterClass(opt.options);
		else
			throw new BrokerOptionsError(`Invalid transporter type '${opt.type}'.`, { type: opt.type });
	}

	return null;
}

function register(name, value) {
	Transporters[name] = value;
}


var transporters = Object.assign(Transporters, { resolve, register });

export default transporters;
//# sourceMappingURL=index.js.map
