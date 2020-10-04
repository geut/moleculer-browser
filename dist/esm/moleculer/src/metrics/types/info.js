import _ from 'lodash';
import constants from '../constants.js';
import base from './base.js';

const { pick } = _;



/**
 * Information metric.
 *
 * @class InfoMetric
 * @extends {BaseMetric}
 */
class InfoMetric extends base {

	/**
	 * Creates an instance of InfoMetric.
	 * @param {Object} opts
	 * @param {MetricRegistry} registry
	 * @memberof InfoMetric
	 */
	constructor(opts, registry) {
		super(opts, registry);
		this.type = constants.TYPE_INFO;
	}

	/**
	 * Set value.
	 *
	 * @param {*} value
	 * @param {Object?} labels
	 * @param {Number?} timestamp
	 * @returns
	 * @memberof InfoMetric
	 */
	set(value, labels, timestamp) {
		const hash = this.hashingLabels(labels);
		let item = this.values.get(hash);
		if (item) {
			if (value != item.value) {
				item.value = value;
				item.timestamp = timestamp == null ? Date.now() : timestamp;
				this.changed(value, labels, timestamp);
			}
		} else {
			item = {
				value,
				labels: pick(labels, this.labelNames),
				timestamp: timestamp == null ? Date.now() : timestamp
			};
			this.values.set(hash, item);
			this.changed(value, labels, timestamp);
		}

		return item;
	}

	/**
	 * Reset item by labels.
	 *
	 * @param {Object} labels
	 * @param {Number?} timestamp
	 * @returns
	 * @memberof InfoMetric
	 */
	reset(labels, timestamp) {
		return this.set(null, labels, timestamp);
	}

	/**
	 * Reset all items.
	 *
	 * @param {Number?} timestamp
	 * @memberof InfoMetric
	 */
	resetAll(timestamp) {
		this.values.forEach(item => {
			item.value = null;
			item.timestamp = timestamp == null ? Date.now() : timestamp;
		});
		this.changed();
	}

	/**
	 * Generate a snapshot.
	 *
	 * @returns {Array<Object>}
	 * @memberof InfoMetric
	 */
	generateSnapshot() {
		const snapshot = Array.from(this.values.keys()).map(key => {
			const item = this.values.get(key);
			return {
				key,
				value: item.value,
				labels: item.labels,
				timestamp: item.timestamp
			};
		});

		return snapshot;
	}
}

var info = InfoMetric;

export default info;
//# sourceMappingURL=info.js.map
