/*
 * moleculer
 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
 * MIT Licensed
 */

// Packet types
const PACKET_UNKNOWN		= "???";
const PACKET_EVENT 			= "EVENT";
const PACKET_REQUEST 		= "REQ";
const PACKET_RESPONSE		= "RES";
const PACKET_DISCOVER 		= "DISCOVER";
const PACKET_INFO 			= "INFO";
const PACKET_DISCONNECT 	= "DISCONNECT";
const PACKET_HEARTBEAT 		= "HEARTBEAT";
const PACKET_PING 			= "PING";
const PACKET_PONG 			= "PONG";

const PACKET_GOSSIP_REQ		= "GOSSIP_REQ";
const PACKET_GOSSIP_RES		= "GOSSIP_RES";
const PACKET_GOSSIP_HELLO	= "GOSSIP_HELLO";

const DATATYPE_UNDEFINED = 0;
const DATATYPE_NULL = 1;
const DATATYPE_JSON = 2;
const DATATYPE_BUFFER = 3;

/**
 * Packet for transporters
 *
 * @class Packet
 */
class Packet {
	/**
	 * Creates an instance of Packet.
	 *
	 * @param {String} type
	 * @param {String} target
	 * @param {any} payload
	 *
	 * @memberof Packet
	 */
	constructor(type, target, payload) {
		this.type = type || PACKET_UNKNOWN;
		this.target = target;
		this.payload = payload || {};
	}
}

var packets = {
	PACKET_UNKNOWN,
	PACKET_EVENT,
	PACKET_REQUEST,
	PACKET_RESPONSE,
	PACKET_DISCOVER,
	PACKET_INFO,
	PACKET_DISCONNECT,
	PACKET_HEARTBEAT,
	PACKET_PING,
	PACKET_PONG,
	PACKET_GOSSIP_REQ,
	PACKET_GOSSIP_RES,
	PACKET_GOSSIP_HELLO,

	DATATYPE_UNDEFINED,
	DATATYPE_NULL,
	DATATYPE_JSON,
	DATATYPE_BUFFER,

	Packet
};

export default packets;
//# sourceMappingURL=packets.js.map
