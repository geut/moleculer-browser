import { setInterval } from 'timers-browserify';
import _ from 'lodash';
import constants from '../constants.js';
import kleur from 'kleur';
import utils_1 from '../../utils.js';
import base from './base.js';

const { isFunction } = utils_1;

/**
 * Console reporter for Moleculer Metrics
 *
 * @class ConsoleReporter
 * @extends {BaseReporter}
 */
class ConsoleReporter extends base {

	/**
	 * Creates an instance of ConsoleReporter.
	 * @param {Object} opts
	 * @memberof ConsoleReporter
	 */
	constructor(opts) {
		super(opts);

		this.opts = _.defaultsDeep(this.opts, {
			interval: 5,
			logger: null,
			colors: true,
			onlyChanges: true,
		});

		if (!this.opts.colors)
			kleur.enabled = false;

		this.lastChanges = new Set();
	}

	/**
	 * Initialize reporter
	 * @param {MetricRegistry} registry
	 * @memberof ConsoleReporter
	 */
	init(registry) {
		super.init(registry);

		if (this.opts.interval > 0) {
			this.timer = setInterval(() => this.print(), this.opts.interval * 1000);
			this.timer.unref();
		}
	}

	/**
	 * Convert labels to label string
	 *
	 * @param {Object} labels
	 * @returns {String}
	 * @memberof ConsoleReporter
	 */
	labelsToStr(labels) {
		const keys = Object.keys(labels);
		if (keys.length == 0)
			return kleur.gray("{}");

		return kleur.gray("{") + keys.map(key => `${kleur.gray(this.formatLabelName(key))}: ${kleur.magenta("" + labels[key])}`).join(", ") + kleur.gray("}");
	}

	/**
	 * Print metrics to the console.
	 *
	 * @memberof ConsoleReporter
	 */
	print() {
		let list = this.registry.list({
			includes: this.opts.includes,
			excludes: this.opts.excludes,
		});

		if (this.opts.onlyChanges)
			list = list.filter(metric => this.lastChanges.has(metric.name));

		if (list.length == 0)
			return;

		this.log(kleur.gray(`------------------- [ METRICS START (${list.length}) ] -------------------`));

		list.forEach(metric => {
			this.log(kleur.cyan().bold(this.formatMetricName(metric.name)) + " " + kleur.gray("(" + metric.type + ")"));
			if (metric.values.size == 0) {
				this.log(kleur.gray("  <no values>"));
			} else {
				const unit = metric.unit ? kleur.gray(this.registry.pluralizeUnit(metric.unit)) : "";
				metric.values.forEach(item => {
					let val;
					const labelStr = this.labelsToStr(item.labels);
					switch(metric.type) {
						case constants.TYPE_COUNTER:
						case constants.TYPE_GAUGE:
						case constants.TYPE_INFO:
							val = item.value === "" ? kleur.grey("<empty string>") : kleur.green().bold(item.value);
							if (item.rate != null) {
								/*const s = [];
								Object.keys(item.rates).forEach(b => {
									s.push(`Rate${b}: ${item.rates[b] != null ? item.rates[b].toFixed(2) : "-"}`);
								});

								val = kleur.green().bold(`Value: ${val} | ` + s.join(" | "));
								*/

								val = val + kleur.grey(" | Rate: ") + (item.rate != null ? kleur.green().bold(item.rate.toFixed(2)) : "-");
							}

							break;
						case constants.TYPE_HISTOGRAM: {
							const s = [];
							s.push(`Count: ${item.count}`);

							if (item.buckets) {
								Object.keys(item.buckets).forEach(b => {
									s.push(`${b}: ${item.buckets[b] != null ? item.buckets[b] : "-"}`);
								});
							}

							if (item.quantiles) {
								s.push(`Min: ${item.min != null ? item.min.toFixed(2) : "-"}`);
								s.push(`Mean: ${item.mean != null ? item.mean.toFixed(2) : "-"}`);
								s.push(`Var: ${item.variance != null ? item.variance.toFixed(2) : "-"}`);
								s.push(`StdDev: ${item.stdDev != null ? item.stdDev.toFixed(2) : "-"}`);
								s.push(`Max: ${item.max != null ? item.max.toFixed(2) : "-"}`);

								Object.keys(item.quantiles).forEach(key => {
									s.push(`${key}: ${item.quantiles[key] != null ? item.quantiles[key].toFixed(2) : "-"}`);
								});
							}

							if (item.rate != null)
								s.push(`Rate: ${item.rate != null ? item.rate.toFixed(2) : "-"}`);

							val = kleur.green().bold(s.join(" | "));
							break;
						}
					}
					this.log(`  ${labelStr}: ${val} ${unit}`);
				});
			}
			this.log("");
		});

		this.log(kleur.gray(`-------------------- [ METRICS END (${list.length}) ] --------------------`));

		this.lastChanges.clear();
	}

	/**
	 * Print messages
	 *
	 * @param  {...any} args
	 */
	log(...args) {
		if (isFunction(this.opts.logger)) {
			return this.opts.logger(...args);
		} else {
			return this.logger.info(...args);
		}
	}

	/**
	 * Some metric has been changed.
	 *
	 * @param {BaseMetric} metric
	 * @param {any} value
	 * @param {Object} labels
	 * @param {Number?} timestamp
	 *
	 * @memberof BaseReporter
	 */
	metricChanged(metric) {
		if (!this.matchMetricName(metric.name)) return;

		this.lastChanges.add(metric.name);
	}
}

var console = ConsoleReporter;

export default console;
//# sourceMappingURL=console.js.map
