import base from './base.js';

/**
 * Local (built-in) Discoverer class
 *
 * @class Discoverer
 */
class LocalDiscoverer extends base {

	/**
	 * Creates an instance of Discoverer.
	 *
	 * @memberof LocalDiscoverer
	 */
	constructor(opts) {
		super(opts);
	}

	/**
	 * Initialize Discoverer
	 *
	 * @param {any} registry
	 *
	 * @memberof LocalDiscoverer
	 */
	init(registry) {
		super.init(registry);
	}

	/**
	 * Discover a new or old node.
	 *
	 * @param {String} nodeID
	 */
	discoverNode(nodeID) {
		if (!this.transit) return this.Promise.resolve();
		return this.transit.discoverNode(nodeID);
	}

	/**
	 * Discover all nodes (after connected)
	 */
	discoverAllNodes() {
		if (!this.transit) return this.Promise.resolve();
		return this.transit.discoverNodes();
	}

	/**
	 * Local service registry has been changed. We should notify remote nodes.
	 *
	 * @param {String} nodeID
	 */
	sendLocalNodeInfo(nodeID) {
		if (!this.transit) return this.Promise.resolve();

		const info = this.broker.getLocalNodeInfo();
		return this.transit.sendNodeInfo(info, nodeID);
	}

}

var local = LocalDiscoverer;

export default local;
//# sourceMappingURL=local.js.map
