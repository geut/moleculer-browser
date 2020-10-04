import base from './base.js';

/**
 * Round-robin strategy class
 *
 * @class RoundRobinStrategy
 */
class RoundRobinStrategy extends base {

	constructor(registry, broker, opts) {
		super(registry, broker, opts);

		this.counter = 0;
	}

	select(list) {
		// Reset counter
		if (this.counter >= list.length) {
			this.counter = 0;
		}
		return list[this.counter++];
	}

}

var roundRobin = RoundRobinStrategy;

export default roundRobin;
//# sourceMappingURL=round-robin.js.map
