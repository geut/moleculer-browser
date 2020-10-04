import constants from './constants.js';
import base from './types/base.js';
import gauge from './types/gauge.js';
import counter from './types/counter.js';
import histogram from './types/histogram.js';
import info from './types/info.js';
import reporters from './reporters/index.js';
import registry from './registry.js';

var metrics = {
	METRIC: constants,

	MetricRegistry: registry,

	BaseMetric: base,
	CounterMetric: counter,
	GaugeMetric: gauge,
	HistrogramMetric: histogram,
	InfoMetric: info,

	Reporters: reporters
};

export default metrics;
//# sourceMappingURL=index.js.map
