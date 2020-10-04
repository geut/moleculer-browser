import { Buffer } from 'buffer';
import base from './base.js';

/**
 * JSON serializer for Moleculer
 *
 * @class JSONSerializer
 */
class JSONSerializer extends base {

	/**
	 * Creates an instance of JSONSerializer.
	 *
	 * @memberof JSONSerializer
	 */
	constructor() {
		super();
	}

	/**
	 * Serializer a JS object to Buffer
	 *
	 * @param {Object} obj
	 * @param {String} type of packet
	 * @returns {Buffer}
	 *
	 * @memberof Serializer
	 */
	serialize(obj) {
		return Buffer.from(JSON.stringify(obj));
	}

	/**
	 * Deserialize Buffer to JS object
	 *
	 * @param {Buffer} buf
	 * @param {String} type of packet
	 * @returns {Object}
	 *
	 * @memberof Serializer
	 */
	deserialize(buf) {
		return JSON.parse(buf);
	}
}

var json = JSONSerializer;

export default json;
//# sourceMappingURL=json.js.map
