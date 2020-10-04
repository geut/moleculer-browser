import constants$1 from './src/constants.js';
import errors from './src/errors.js';
import constants from './src/metrics/constants.js';
import utils_1 from './src/utils.js';
import types from './src/metrics/types/index.js';
import require$$19 from '../no-impl.js';
import reporters from './src/metrics/reporters/index.js';
import strategies from './src/strategies/index.js';
import discoverers from './src/registry/discoverers/index.js';
import registry from './src/registry/index.js';
import loggers from './src/loggers/index.js';
import fastest from './src/validators/fastest.js';
import validators from './src/validators/index.js';
import cachers from './src/cachers/index.js';
import transporters from './src/transporters/index.js';
import serializers from './src/serializers/index.js';
import middlewares from './src/middlewares/index.js';
import exporters from './src/tracing/exporters/index.js';
import service from './src/service.js';
import context from './src/context.js';
import serviceBroker from './src/service-broker.js';

const {
	CIRCUIT_CLOSE,
	CIRCUIT_HALF_OPEN,
	CIRCUIT_HALF_OPEN_WAIT,
	CIRCUIT_OPEN
} = constants$1;

var moleculer = {
	ServiceBroker: serviceBroker,
	Loggers: loggers,
	Service: service,
	Context: context,

	Cachers: cachers,

	Transporters: transporters,
	Serializers: serializers,
	Strategies: strategies,
	Validators: validators,
	Validator: fastest, // deprecated
	TracerExporters: exporters,
	MetricTypes: types,
	MetricReporters: reporters,
	METRIC: constants,

	Registry: registry,
	Discoverers: discoverers,

	Middlewares: middlewares,

	Errors: errors,

	Runner: require$$19,
	Utils: utils_1,

	CIRCUIT_CLOSE,
	CIRCUIT_HALF_OPEN,
	CIRCUIT_HALF_OPEN_WAIT,
	CIRCUIT_OPEN,

	MOLECULER_VERSION: serviceBroker.MOLECULER_VERSION,
	PROTOCOL_VERSION: serviceBroker.PROTOCOL_VERSION
};

export default moleculer;
//# sourceMappingURL=index.js.map
