import constants from '../constants.js';
import gauge from './gauge.js';

/**
 * Counter metric class.
 *
 * @class CounterMetric
 * @extends {GaugeMetric}
 */
class CounterMetric extends gauge {

	/**
	 * Creates an instance of CounterMetric.
	 * @param {Object} opts
	 * @param {MetricRegistry} registry
	 * @memberof CounterMetric
	 */
	constructor(opts, registry) {
		super(opts, registry);
		this.type = constants.TYPE_COUNTER;
	}

	/**
	 * Disabled decrement method.
	 *
	 * @memberof CounterMetric
	 */
	decrement() {
		throw new Error("Counter can't be decreased.");
	}
}

var counter = CounterMetric;

export default counter;
//# sourceMappingURL=counter.js.map
