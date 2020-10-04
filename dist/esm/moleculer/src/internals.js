import errors from './errors.js';
import utils_1 from './utils.js';

const { MoleculerClientError } = errors;


var internals = function() {
	const schema = {
		name: "$node",

		actions: {
			list: {
				cache: false,
				tracing: false,
				params: {
					withServices: { type: "boolean", optional: true, convert: true, default: false },
					onlyAvailable: { type: "boolean", optional: true, convert: true, default: false },
				},
				handler(ctx) {
					return this.broker.registry.getNodeList(ctx.params);
				}
			},

			services: {
				cache: false,
				tracing: false,
				params: {
					onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
					skipInternal: { type: "boolean", optional: true, convert: true, default: false },
					withActions: { type: "boolean", optional: true, convert: true, default: false },
					withEvents: { type: "boolean", optional: true, convert: true, default: false },
					onlyAvailable: { type: "boolean", optional: true, convert: true, default: false },
					grouping: { type: "boolean", optional: true, convert: true, default: true },
				},
				handler(ctx) {
					return this.broker.registry.getServiceList(ctx.params);
				}
			},

			actions: {
				cache: false,
				tracing: false,
				params: {
					onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
					skipInternal: { type: "boolean", optional: true, convert: true, default: false },
					withEndpoints: { type: "boolean", optional: true, convert: true, default: false },
					onlyAvailable: { type: "boolean", optional: true, convert: true, default: false },
				},
				handler(ctx) {
					return this.broker.registry.getActionList(ctx.params);
				}
			},

			events: {
				cache: false,
				tracing: false,
				params: {
					onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
					skipInternal: { type: "boolean", optional: true, convert: true, default: false },
					withEndpoints: { type: "boolean", optional: true, convert: true, default: false },
					onlyAvailable: { type: "boolean", optional: true, convert: true, default: false },
				},
				handler(ctx) {
					return this.broker.registry.getEventList(ctx.params);
				}
			},

			health: {
				cache: false,
				tracing: false,
				handler() {
					return this.broker.getHealthStatus();
				}
			},

			options: {
				cache: false,
				tracing: false,
				params: {},
				handler() {
					return utils_1.safetyObject(this.broker.options, this.broker.options);
				}
			},

			metrics: {
				cache: false,
				tracing: false,
				params: {
					types: { type: "multi", optional: true, rules: [ { type: "string" }, { type: "array", items: "string" } ] },
					includes: { type: "multi", optional: true, rules: [ { type: "string" }, { type: "array", items: "string" } ] },
					excludes: { type: "multi", optional: true, rules: [ { type: "string" }, { type: "array", items: "string" } ] }
				},
				handler(ctx) {
					if (!this.broker.isMetricsEnabled())
						return this.Promise.reject(new MoleculerClientError("Metrics feature is disabled", 400, "METRICS_DISABLED"));

					return this.broker.metrics.list(ctx.params);
				}
			}
		}
	};

	return schema;
};

export default internals;
//# sourceMappingURL=internals.js.map
