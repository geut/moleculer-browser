import proc from '../../../process.js';
import _ from 'lodash';
import * as os from '../../../os.js';
import utils_1 from '../utils.js';
import node from './node.js';

const { getIpList } = utils_1;

/**
 * Catalog for nodes
 *
 * @class NodeCatalog
 */
class NodeCatalog {

	/**
	 * Creates an instance of NodeCatalog.
	 *
	 * @param {Registry} registry
	 * @param {ServiceBroker} broker
	 *
	 * @memberof NodeCatalog
	 */
	constructor(registry, broker) {
		this.registry = registry;
		this.broker = broker;
		this.logger = registry.logger;

		this.nodes = new Map();

		this.createLocalNode();
	}

	/**
	 * Create local node with local information
	 *
	 * @returns
	 * @memberof NodeCatalog
	 */
	createLocalNode() {
		const node$1 = new node(this.broker.nodeID);
		node$1.local = true;
		node$1.ipList = getIpList();
		node$1.instanceID = this.broker.instanceID;
		node$1.hostname = os.hostname();
		node$1.client = {
			type: "browser",
			version: this.broker.MOLECULER_VERSION,
			langVersion: proc.version
		};
		node$1.metadata = this.broker.metadata;
		node$1.seq = 1;

		this.add(node$1.id, node$1);

		this.localNode = node$1;
		return node$1;
	}

	/**
	 * Add a new node
	 *
	 * @param {String} id
	 * @param {any} node
	 * @memberof NodeCatalog
	 */
	add(id, node) {
		this.nodes.set(id, node);
	}

	/**
	 * Check a node exist by nodeID
	 *
	 * @param {String} id
	 * @returns
	 * @memberof NodeCatalog
	 */
	has(id) {
		return this.nodes.has(id);
	}

	/**
	 * Get a node by nodeID
	 *
	 * @param {String} id
	 * @returns
	 * @memberof NodeCatalog
	 */
	get(id) {
		return this.nodes.get(id);
	}

	/**
	 * Delete a node by nodeID
	 *
	 * @param {String} id
	 * @returns
	 * @memberof NodeCatalog
	 */
	delete(id) {
		return this.nodes.delete(id);
	}

	/**
	 * Get count of all registered nodes
	 */
	count() {
		return this.nodes.size;
	}

	/**
	 * Get count of online nodes
	 */
	onlineCount() {
		let count = 0;
		this.nodes.forEach(node => {
			if (node.available)
				count++;
		});

		return count;
	}

	/**
	 * Process incoming INFO packet payload
	 *
	 * @param {any} payload
	 * @memberof NodeCatalog
	 */
	processNodeInfo(payload) {
		const nodeID = payload.sender;
		//let oldNode;
		let node$1 = this.get(nodeID);
		let isNew = false;
		let isReconnected = false;

		if (!node$1) {
			isNew = true;
			node$1 = new node(nodeID);

			this.add(nodeID, node$1);
		} else if (!node$1.available) {
			isReconnected = true;
			node$1.lastHeartbeatTime = Math.round(proc.uptime());
			node$1.available = true;
			node$1.offlineSince = null;
		}

		// Update instance
		const needRegister = node$1.update(payload, isReconnected);

		// Refresh services if 'seq' is greater or it is a reconnected node
		if (needRegister && node$1.services) {
			this.registry.registerServices(node$1, node$1.services);
		}

		// Local notifications
		if (isNew) {
			this.broker.broadcastLocal("$node.connected", { node: node$1, reconnected: false });
			this.logger.info(`Node '${nodeID}' connected.`);
			this.registry.updateMetrics();
		} else if (isReconnected) {
			this.broker.broadcastLocal("$node.connected", { node: node$1, reconnected: true });
			this.logger.info(`Node '${nodeID}' reconnected.`);
			this.registry.updateMetrics();
		} else {
			this.broker.broadcastLocal("$node.updated", { node: node$1 });
			this.logger.debug(`Node '${nodeID}' updated.`);
		}

		return node$1;
	}

	/**
	 * Disconnected a node
	 *
	 * @param {String} nodeID
	 * @param {Boolean} isUnexpected
	 * @memberof NodeCatalog
	 */
	disconnected(nodeID, isUnexpected) {
		let node = this.get(nodeID);
		if (node && node.available) {
			node.disconnected(isUnexpected);

			this.registry.unregisterServicesByNode(node.id);

			this.broker.broadcastLocal("$node.disconnected", { node, unexpected: !!isUnexpected });

			this.registry.updateMetrics();

			this.logger.warn(`Node '${node.id}' disconnected${isUnexpected ? " unexpectedly" : ""}.`);

			if (this.broker.transit)
				this.broker.transit.removePendingRequestByNodeID(nodeID);
		}
	}


	/**
	 * Get a node list
	 *
	 * @param {Object} {onlyAvailable = false, withServices = false}
	 * @returns
	 * @memberof NodeCatalog
	 */
	list({ onlyAvailable = false, withServices = false }) {
		let res = [];
		this.nodes.forEach(node => {
			if (onlyAvailable && !node.available)
				return;

			if (withServices)
				res.push(_.omit(node, ["rawInfo"]));
			else
				res.push(_.omit(node, ["services", "rawInfo"]));
		});

		return res;
	}

	/**
	 * Get a copy from node list.
	 */
	toArray() {
		return Array.from(this.nodes.values());
	}
}

var nodeCatalog = NodeCatalog;

export default nodeCatalog;
//# sourceMappingURL=node-catalog.js.map
