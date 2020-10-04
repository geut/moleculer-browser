import require$$19 from '../../../no-impl.js';
import actionHook from './action-hook.js';
import bulkhead from './bulkhead.js';
import contextTracker from './context-tracker.js';
import circuitBreaker from './circuit-breaker.js';
import timeout from './timeout.js';
import retry from './retry.js';
import fallback from './fallback.js';
import errorHandler from './error-handler.js';
import metrics from './metrics.js';
import tracing from './tracing.js';
import debounce from './debounce.js';
import throttle from './throttle.js';
import encryption from './transmit/encryption.js';
import compression from './transmit/compression.js';
import transitLogger from './debugging/transit-logger.js';
import actionLogger from './debugging/action-logger.js';

const Middlewares = {
	ActionHook: actionHook,
	Bulkhead: bulkhead,
	ContextTracker: contextTracker,
	CircuitBreaker: circuitBreaker,
	Timeout: timeout,
	Retry: retry,
	Fallback: fallback,
	ErrorHandler: errorHandler,
	Metrics: metrics,
	Tracing: tracing,

	Debounce: debounce,
	Throttle: throttle,

	HotReload: require$$19,

	Transmit: {
		Encryption: encryption,
		Compression: compression
	},

	Debugging: {
		TransitLogger: transitLogger,
		ActionLogger: actionLogger,
	}
};

var middlewares = Middlewares;

export default middlewares;
//# sourceMappingURL=index.js.map
