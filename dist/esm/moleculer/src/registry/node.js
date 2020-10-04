import proc from '../../../process.js';

/**
 * Node class
 *
 * @class Node
 */
class Node {
	/**
	 * Creates an instance of Node.
	 *
	 * @param {String} id
	 *
	 * @memberof Node
	 */
	constructor(id) {
		this.id = id;
		this.instanceID = null;
		this.available = true;
		this.local = false;
		this.lastHeartbeatTime = Math.round(proc.uptime());
		this.config = {};
		this.client = {};
		this.metadata = null;

		this.ipList = null;
		this.port = null;
		this.hostname = null;
		this.udpAddress = null;

		this.rawInfo = null;
		this.services = [];

		this.cpu = null;
		this.cpuSeq = null;

		this.seq = 0;
		this.offlineSince = null;
	}

	/**
	 * Update properties
	 *
	 * @param {object} payload
	 * @param {boolean} isReconnected
	 * @memberof Node
	 */
	update(payload, isReconnected) {
		// Update properties
		this.metadata = payload.metadata;
		this.ipList = payload.ipList;
		this.hostname = payload.hostname;
		this.port = payload.port;
		this.client = payload.client || {};
		this.config = payload.config || {};
		this.instanceID = payload.instanceID;

		// Process services & events
		this.services = payload.services;
		this.rawInfo = payload;

		const newSeq = payload.seq || 1;
		if (newSeq > this.seq || isReconnected) {
			this.seq = newSeq;
			return true;
		}
	}

	/**
	 * Update local properties.
	 *
	 * @memberof Node
	 * @param {Function} cpuUsage
	 */
	updateLocalInfo(cpuUsage) {
		return cpuUsage().then(res => {
			const newVal = Math.round(res.avg);
			if (this.cpu != newVal) {
				this.cpu = newVal;
				this.cpuSeq++;
			}
		}).catch(() => { /* silent */ });
	}

	/**
	 * Update heartbeat properties
	 *
	 * @param {any} payload
	 * @memberof Node
	 */
	heartbeat(payload) {
		if (!this.available) {
			this.available = true;
			this.offlineSince = null;
		}

		if (payload.cpu != null) {
			this.cpu = payload.cpu;
			this.cpuSeq = payload.cpuSeq || 1;
		}

		this.lastHeartbeatTime = Math.round(proc.uptime());
	}

	/**
	 * Node disconnected
	 *
	 * @memberof Node
	 */
	disconnected() {
		if (this.available) {
			this.offlineSince = Math.round(proc.uptime());
			this.seq++;
		}

		this.available = false;
	}
}

var node = Node;

export default node;
//# sourceMappingURL=node.js.map
