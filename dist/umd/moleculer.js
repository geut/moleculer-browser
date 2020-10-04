(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('eventemitter2'), require('browser-process-hrtime'), require('timers-browserify'), require('lodash'), require('glob'), require('path'), require('buffer'), require('es6-error'), require('stream'), require('kleur'), require('cpus'), require('fs'), require('crypto'), require('lru-cache'), require('util'), require('fastest-validator'), require('fflate'), require('fn-args')) :
	typeof define === 'function' && define.amd ? define(['exports', 'eventemitter2', 'browser-process-hrtime', 'timers-browserify', 'lodash', 'glob', 'path', 'buffer', 'es6-error', 'stream', 'kleur', 'cpus', 'fs', 'crypto', 'lru-cache', 'util', 'fastest-validator', 'fflate', 'fn-args'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Moleculer = {}, global.EE, global.hrtime, global.timersBrowserify, global._, global.glob, global.path, global.buffer, global.ExtendableError, global.require$$0, global.kleur, global.cpus, global.fs, global.crypto, global.LRU, global.util, global.Validator, global.fflate, global.functionArguments));
}(this, (function (exports, EE, hrtime, timersBrowserify, _, glob, path, buffer, ExtendableError, require$$0, kleur, cpus, fs, crypto, LRU, util, Validator, fflate, functionArguments) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var EE__default = /*#__PURE__*/_interopDefaultLegacy(EE);
	var hrtime__default = /*#__PURE__*/_interopDefaultLegacy(hrtime);
	var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
	var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
	var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
	var ExtendableError__default = /*#__PURE__*/_interopDefaultLegacy(ExtendableError);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var kleur__default = /*#__PURE__*/_interopDefaultLegacy(kleur);
	var cpus__default = /*#__PURE__*/_interopDefaultLegacy(cpus);
	var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
	var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
	var LRU__default = /*#__PURE__*/_interopDefaultLegacy(LRU);
	var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
	var Validator__default = /*#__PURE__*/_interopDefaultLegacy(Validator);
	var functionArguments__default = /*#__PURE__*/_interopDefaultLegacy(functionArguments);

	/*
	 * moleculer
	 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var constants = {

		// Circuit-breaker states
		CIRCUIT_CLOSE: 				"close",
		CIRCUIT_HALF_OPEN: 			"half_open",
		CIRCUIT_HALF_OPEN_WAIT: 	"half_open_wait",
		CIRCUIT_OPEN: 				"open"

	};

	var global$1 = (typeof global !== 'undefined'
	  ? global : typeof self !== 'undefined'
	    ? self : typeof window !== 'undefined'
	      ? window : {});

	class Process extends EE__default['default'] {
	  constructor () {
	    super();

	    this.title = 'browser';
	    this.browser = true;
	    this.env = {};
	    this.argv = [];
	    this.version = '';
	    this.versions = {
	      http_parser: '0.0',
	      node: '12.18.4',
	      v8: '0.0',
	      uv: '0.0',
	      zlib: '0.0',
	      ares: '0.0',
	      icu: '0.0',
	      modules: '0',
	      openssl: '0.0'
	    };
	    this.hrtime = hrtime__default['default'];
	    this.pid = 0;
	    this.exitCode = 0;
	    this.connected = true;
	    this._startTime = Date.now();
	    this._errorCallback = null;
	  }

	  exit (code) {
	    this.exitCode = code;
	    this.emit('exit', [code]);
	    throw new Error('process.exit() called.')
	  }

	  setUncaughtExceptionCaptureCallback (cb) {
	    if (this._errorCallback) {
	      window.removeEventListener('error', this._errorCallback);
	    }
	    this._errorCallback = cb;
	    if (cb) {
	      window.addEventListener('error', cb);
	    }
	  }

	  hasUncaughtExceptionCaptureCallback () {
	    return this._errorCallback !== null
	  }

	  cwd () {
	    return '/'
	  }

	  uptime () {
	    return Math.floor((Date.now() - this._startTime) / 1000)
	  }

	  memoryUsage () {
	    if (!performance && !performance.memory) {
	      return {
	        rss: 0,
	        heapTotal: Number.MAX_SAFE_INTEGER,
	        heapUsed: 0,
	        external: 0
	      }
	    }

	    const { memory } = performance;

	    return {
	      rss: 0,
	      heapTotal: memory.totalJSHeapSize,
	      heapUsed: memory.usedJSHeapSize,
	      external: 0
	    }
	  }

	  nextTick (handler, ...args) {
	    queueMicrotask(() => handler(...args));
	  }

	  _getActiveHandles () {
	    return []
	  }

	  _getActiveRequests () {
	    return []
	  }
	}

	const proc = new Process();

	//
	// We monkey patch the current process to use our updated version.
	//

	const currentProcess = (global$1 && global$1.process) || process;

	if (currentProcess) {
	  for (const prop in proc) {
	    if (typeof proc[prop] === 'function') {
	      currentProcess[prop] = proc[prop].bind(proc);
	      continue
	    }

	    currentProcess[prop] = proc[prop];
	  }
	}

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	/*
	 * moleculer
	 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	// Packet types
	const PACKET_UNKNOWN		= "???";
	const PACKET_EVENT 			= "EVENT";
	const PACKET_REQUEST 		= "REQ";
	const PACKET_RESPONSE		= "RES";
	const PACKET_DISCOVER 		= "DISCOVER";
	const PACKET_INFO 			= "INFO";
	const PACKET_DISCONNECT 	= "DISCONNECT";
	const PACKET_HEARTBEAT 		= "HEARTBEAT";
	const PACKET_PING 			= "PING";
	const PACKET_PONG 			= "PONG";

	const PACKET_GOSSIP_REQ		= "GOSSIP_REQ";
	const PACKET_GOSSIP_RES		= "GOSSIP_RES";
	const PACKET_GOSSIP_HELLO	= "GOSSIP_HELLO";

	const DATATYPE_UNDEFINED = 0;
	const DATATYPE_NULL = 1;
	const DATATYPE_JSON = 2;
	const DATATYPE_BUFFER = 3;

	/**
	 * Packet for transporters
	 *
	 * @class Packet
	 */
	class Packet {
		/**
		 * Creates an instance of Packet.
		 *
		 * @param {String} type
		 * @param {String} target
		 * @param {any} payload
		 *
		 * @memberof Packet
		 */
		constructor(type, target, payload) {
			this.type = type || PACKET_UNKNOWN;
			this.target = target;
			this.payload = payload || {};
		}
	}

	var packets = {
		PACKET_UNKNOWN,
		PACKET_EVENT,
		PACKET_REQUEST,
		PACKET_RESPONSE,
		PACKET_DISCOVER,
		PACKET_INFO,
		PACKET_DISCONNECT,
		PACKET_HEARTBEAT,
		PACKET_PING,
		PACKET_PONG,
		PACKET_GOSSIP_REQ,
		PACKET_GOSSIP_RES,
		PACKET_GOSSIP_HELLO,

		DATATYPE_UNDEFINED,
		DATATYPE_NULL,
		DATATYPE_JSON,
		DATATYPE_BUFFER,

		Packet
	};

	var errors = createCommonjsModule(function (module) {



	/**
	 * Custom Moleculer Error class
	 *
	 * @class MoleculerError
	 * @extends {ExtendableError}
	 */
	class MoleculerError extends ExtendableError__default['default'] {
		/**
		 * Creates an instance of MoleculerError.
		 *
		 * @param {String?} message
		 * @param {Number?} code
		 * @param {String?} type
		 * @param {any} data
		 *
		 * @memberof MoleculerError
		 */
		constructor(message, code, type, data) {
			super(message);
			this.code = code || 500;
			this.type = type;
			this.data = data;
			this.retryable = false;
		}
	}

	/**
	 * Custom Moleculer Error class for retryable errors.
	 *
	 * @class MoleculerRetryableError
	 * @extends {MoleculerError}
	 */
	class MoleculerRetryableError extends MoleculerError {
		/**
		 * Creates an instance of MoleculerRetryableError.
		 *
		 * @param {String?} message
		 * @param {Number?} code
		 * @param {String?} type
		 * @param {any} data
		 *
		 * @memberof MoleculerRetryableError
		 */
		constructor(message, code, type, data) {
			super(message);
			this.code = code || 500;
			this.type = type;
			this.data = data;
			this.retryable = true;
		}
	}

	/**
	 * Moleculer Error class for Broker disconnections which is retryable.
	 *
	 * @class MoleculerServerError
	 * @extends {MoleculerRetryableError}
	 */
	class BrokerDisconnectedError extends MoleculerRetryableError {
		constructor() {
			super("The broker's transporter has disconnected. Please try again when a connection is reestablished.", 502, "BAD_GATEWAY");
			// Stack trace is hidden because it creates a lot of logs and, in this case, won't help users find the issue
			this.stack = "";
		}
	}

	/**
	 * Moleculer Error class for server error which is retryable.
	 *
	 * @class MoleculerServerError
	 * @extends {MoleculerRetryableError}
	 */
	class MoleculerServerError extends MoleculerRetryableError {
	}

	/**
	 * Moleculer Error class for client errors which is not retryable.
	 *
	 * @class MoleculerClientError
	 * @extends {MoleculerError}
	 */
	class MoleculerClientError extends MoleculerError {
		/**
		 * Creates an instance of MoleculerClientError.
		 *
		 * @param {String?} message
		 * @param {Number?} code
		 * @param {String?} type
		 * @param {any} data
		 *
		 * @memberof MoleculerClientError
		 */
		constructor(message, code, type, data) {
			super(message, code || 400, type, data);
		}
	}


	/**
	 * 'Service not found' Error message
	 *
	 * @class ServiceNotFoundError
	 * @extends {MoleculerRetryableError}
	 */
	class ServiceNotFoundError extends MoleculerRetryableError {
		/**
		 * Creates an instance of ServiceNotFoundError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ServiceNotFoundError
		 */
		constructor(data = {}) {
			let msg;
			if (data.nodeID && data.action)
				msg = `Service '${data.action}' is not found on '${data.nodeID}' node.`;
			else if (data.action)
				msg = `Service '${data.action}' is not found.`;

			if (data.service && data.version)
				msg = `Service '${data.version}.${data.service}' not found.`;
			else if (data.service)
				msg = `Service '${data.service}' not found.`;

			super(msg, 404, "SERVICE_NOT_FOUND", data);
		}
	}

	/**
	 * 'Service not available' Error message
	 *
	 * @class ServiceNotAvailableError
	 * @extends {MoleculerRetryableError}
	 */
	class ServiceNotAvailableError extends MoleculerRetryableError {
		/**
		 * Creates an instance of ServiceNotAvailableError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ServiceNotAvailableError
		 */
		constructor(data) {
			let msg;
			if (data.nodeID)
				msg = `Service '${data.action}' is not available on '${data.nodeID}' node.`;
			else
				msg = `Service '${data.action}' is not available.`;

			super(msg, 404, "SERVICE_NOT_AVAILABLE", data);
		}
	}

	/**
	 * 'Request timed out' Error message. Retryable.
	 *
	 * @class RequestTimeoutError
	 * @extends {MoleculerRetryableError}
	 */
	class RequestTimeoutError extends MoleculerRetryableError {
		/**
		 * Creates an instance of RequestTimeoutError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestTimeoutError
		 */
		constructor(data) {
			super(`Request is timed out when call '${data.action}' action on '${data.nodeID}' node.`, 504, "REQUEST_TIMEOUT", data);
		}
	}

	/**
	 * 'Request skipped for timeout' Error message
	 *
	 * @class RequestSkippedError
	 * @extends {MoleculerError}
	 */
	class RequestSkippedError extends MoleculerError {
		/**
		 * Creates an instance of RequestSkippedError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestSkippedError
		 */
		constructor(data) {
			super(`Calling '${data.action}' is skipped because timeout reached on '${data.nodeID}' node.`, 514, "REQUEST_SKIPPED", data);
			this.retryable = false;
		}
	}

	/**
	 * 'Request rejected' Error message. Retryable.
	 *
	 * @class RequestRejectedError
	 * @extends {MoleculerRetryableError}
	 */
	class RequestRejectedError extends MoleculerRetryableError {
		/**
		 * Creates an instance of RequestRejectedError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestRejectedError
		 */
		constructor(data) {
			super(`Request is rejected when call '${data.action}' action on '${data.nodeID}' node.`, 503, "REQUEST_REJECTED", data);
		}
	}

	/**
	 * 'Queue is full' error message. Retryable.
	 *
	 * @class QueueIsFullError
	 * @extends {MoleculerRetryableError}
	 */
	class QueueIsFullError extends MoleculerRetryableError {
		/**
		 * Creates an instance of QueueIsFullError.
		 *
		 * @param {Object} data
		 *
		 * @memberof QueueIsFullError
		 */
		constructor(data) {
			super(`Queue is full. Request '${data.action}' action on '${data.nodeID}' node is rejected.`, 429, "QUEUE_FULL", data);
		}
	}

	/**
	 * 'Parameters of action call validation error
	 *
	 * @class ValidationError
	 * @extends {MoleculerClientError}
	 */
	class ValidationError extends MoleculerClientError {
		/**
		 * Creates an instance of ValidationError.
		 *
		 * @param {String} message
		 * @param {String} type
		 * @param {any} data
		 *
		 * @memberof ValidationError
		 */
		constructor(message, type, data) {
			super(message, 422, type || "VALIDATION_ERROR", data);
		}
	}

	/**
	 * 'Max request call level!' Error message
	 *
	 * @class MaxCallLevelError
	 * @extends {MoleculerError}
	 */
	class MaxCallLevelError extends MoleculerError {
		/**
		 * Creates an instance of MaxCallLevelError.
		 *
		 * @param {Object} data
		 *
		 * @memberof MaxCallLevelError
		 */
		constructor(data) {
			super(`Request level is reached the limit (${data.level}) on '${data.nodeID}' node.`, 500, "MAX_CALL_LEVEL", data);
			this.retryable = false;
		}
	}

	/**
	 * Custom Moleculer Error class for Service schema errors
	 *
	 * @class ServiceSchemaError
	 * @extends {Error}
	 */
	class ServiceSchemaError extends MoleculerError {
		/**
		 * Creates an instance of ServiceSchemaError.
		 *
		 * @param {String} msg
		 * @param {Object} data
		 * @memberof ServiceSchemaError
		 */
		constructor(msg, data) {
			super(msg, 500, "SERVICE_SCHEMA_ERROR", data);
		}
	}

	/**
	 * Custom Moleculer Error class for broker option errors
	 *
	 * @class BrokerOptionsError
	 * @extends {Error}
	 */
	class BrokerOptionsError extends MoleculerError {
		/**
		 * Creates an instance of BrokerOptionsError.
		 *
		 * @param {String} msg
		 * @param {Object} data
		 * @memberof BrokerOptionsError
		 */
		constructor(msg, data) {
			super(msg, 500, "BROKER_OPTIONS_ERROR", data);
		}
	}

	/**
	 * Custom Moleculer Error class for Graceful stopping
	 *
	 * @class GracefulStopTimeoutError
	 * @extends {Error}
	 */
	class GracefulStopTimeoutError extends MoleculerError {
		/**
		 * Creates an instance of GracefulStopTimeoutError.
		 *
		 * @param {Object?} data
		 * @memberof GracefulStopTimeoutError
		 */
		constructor(data) {
			if (data && data.service)  {
				super(`Unable to stop '${data.service.name}' service gracefully.`, 500, "GRACEFUL_STOP_TIMEOUT", data && data.service ? {
					name: data.service.name,
					version: data.service.version
				} : null);
			} else {
				super("Unable to stop ServiceBroker gracefully.", 500, "GRACEFUL_STOP_TIMEOUT");
			}
		}
	}

	/**
	 * Protocol version is mismatch
	 *
	 * @class ProtocolVersionMismatchError
	 * @extends {Error}
	 */
	class ProtocolVersionMismatchError extends MoleculerError {
		/**
		 * Creates an instance of ProtocolVersionMismatchError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ProtocolVersionMismatchError
		 */
		constructor(data) {
			super("Protocol version mismatch.", 500, "PROTOCOL_VERSION_MISMATCH", data);
		}
	}

	/**
	 * Invalid packet format error
	 *
	 * @class InvalidPacketDataError
	 * @extends {Error}
	 */
	class InvalidPacketDataError extends MoleculerError {
		/**
		 * Creates an instance of InvalidPacketDataError.
		 *
		 * @param {Object} data
		 *
		 * @memberof InvalidPacketDataError
		 */
		constructor(data) {
			super("Invalid packet data.", 500, "INVALID_PACKET_DATA", data);
		}
	}

	/**
	 * Recreate an error from a transferred payload `err`
	 *
	 * @param {Error} err
	 * @returns {MoleculerError}
	 */
	function recreateError(err) {
		const Class = module.exports[err.name];
		if (Class) {
			switch(err.name) {
				case "MoleculerError": return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerRetryableError": return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerServerError": return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerClientError": return new Class(err.message, err.code, err.type, err.data);

				case "ValidationError": return new Class(err.message, err.type, err.data);

				case "ServiceNotFoundError": return new Class(err.data);
				case "ServiceNotAvailableError": return new Class(err.data);
				case "RequestTimeoutError": return new Class(err.data);
				case "RequestSkippedError": return new Class(err.data);
				case "RequestRejectedError": return new Class(err.data);
				case "QueueIsFullError": return new Class(err.data);
				case "MaxCallLevelError": return new Class(err.data);
				case "GracefulStopTimeoutError": return new Class(err.data);
				case "ProtocolVersionMismatchError": return new Class(err.data);
				case "InvalidPacketDataError": return new Class(err.data);

				case "ServiceSchemaError":
				case "BrokerOptionsError": return new Class(err.message, err.data);
			}
		}
	}


	module.exports = {
		MoleculerError,
		MoleculerRetryableError,
		MoleculerServerError,
		MoleculerClientError,

		ServiceNotFoundError,
		ServiceNotAvailableError,

		ValidationError,
		RequestTimeoutError,
		RequestSkippedError,
		RequestRejectedError,
		QueueIsFullError,
		MaxCallLevelError,

		ServiceSchemaError,
		BrokerOptionsError,
		GracefulStopTimeoutError,

		ProtocolVersionMismatchError,
		InvalidPacketDataError,

		BrokerDisconnectedError,

		recreateError
	};
	});

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var constants$1 = {

		// --- METRIC TYPES ---

		TYPE_COUNTER:  	"counter",
		TYPE_GAUGE:  	"gauge",
		TYPE_HISTOGRAM: "histogram",
		TYPE_INFO:  	"info",

		// --- METRICREGISTRY METRICS ---

		// MOLECULER_METRICS_COMMON_COLLECT_TOTAL: "moleculer.metrics.common.collect.total",
		// MOLECULER_METRICS_COMMON_COLLECT_TIME: "moleculer.metrics.common.collect.time",

		// --- PROCESS METRICS ---

		PROCESS_ARGUMENTS: "process.arguments",

		PROCESS_PID: "process.pid",
		PROCESS_PPID: "process.ppid",

		PROCESS_MEMORY_HEAP_SIZE_TOTAL: "process.memory.heap.size.total", // bytes
		PROCESS_MEMORY_HEAP_SIZE_USED: "process.memory.heap.size.used", // bytes
		PROCESS_MEMORY_RSS: "process.memory.rss", // bytes
		PROCESS_MEMORY_EXTERNAL: "process.memory.external", // bytes

		PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL: "process.memory.heap.space.size.total", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_USED: "process.memory.heap.space.size.used", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE: "process.memory.heap.space.size.available", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL: "process.memory.heap.space.size.physical", // bytes

		PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL: "process.memory.heap.stat.heap.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL: "process.memory.heap.stat.executable.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL: "process.memory.heap.stat.physical.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL: "process.memory.heap.stat.available.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE: "process.memory.heap.stat.used.heap.size", // bytes
		PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT: "process.memory.heap.stat.heap.size.limit", // bytes
		PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY: "process.memory.heap.stat.mallocated.memory", // bytes
		PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY: "process.memory.heap.stat.peak.mallocated.memory", // bytes
		PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE: "process.memory.heap.stat.zap.garbage",

		PROCESS_UPTIME: "process.uptime", // seconds
		PROCESS_INTERNAL_ACTIVE_HANDLES: "process.internal.active.handles",
		PROCESS_INTERNAL_ACTIVE_REQUESTS: "process.internal.active.requests",

		PROCESS_VERSIONS_NODE: "process.versions.node",

		// --- EVENT LOOP METRICS ---

		PROCESS_EVENTLOOP_LAG_MIN: "process.eventloop.lag.min", // msec
		PROCESS_EVENTLOOP_LAG_AVG: "process.eventloop.lag.avg", // msec
		PROCESS_EVENTLOOP_LAG_MAX: "process.eventloop.lag.max", // msec
		PROCESS_EVENTLOOP_LAG_COUNT: "process.eventloop.lag.count",

		// --- GARBAGE COLLECTOR METRICS ---

		PROCESS_GC_TIME: "process.gc.time", // nanoseconds
		PROCESS_GC_TOTAL_TIME: "process.gc.total.time", // milliseconds
		PROCESS_GC_EXECUTED_TOTAL: "process.gc.executed.total",

		// --- OS METRICS ---

		OS_MEMORY_FREE: "os.memory.free", // bytes
		OS_MEMORY_USED: "os.memory.used", // bytes
		OS_MEMORY_TOTAL: "os.memory.total", // bytes
		OS_UPTIME: "os.uptime", // seconds
		OS_TYPE: "os.type",
		OS_RELEASE: "os.release",
		OS_HOSTNAME: "os.hostname",
		OS_ARCH: "os.arch",
		OS_PLATFORM: "os.platform",
		OS_USER_UID: "os.user.uid",
		OS_USER_GID: "os.user.gid",
		OS_USER_USERNAME: "os.user.username",
		OS_USER_HOMEDIR: "os.user.homedir",

		OS_DATETIME_UNIX: "os.datetime.unix",
		OS_DATETIME_ISO: "os.datetime.iso",
		OS_DATETIME_UTC: "os.datetime.utc",
		OS_DATETIME_TZ_OFFSET: "os.datetime.tz.offset",

		OS_NETWORK_ADDRESS: "os.network.address",
		OS_NETWORK_MAC: "os.network.mac",

		OS_CPU_LOAD_1: "os.cpu.load.1",
		OS_CPU_LOAD_5: "os.cpu.load.5",
		OS_CPU_LOAD_15: "os.cpu.load.15",
		OS_CPU_UTILIZATION: "os.cpu.utilization",

		OS_CPU_USER: "os.cpu.user", // seconds
		OS_CPU_SYSTEM: "os.cpu.system", // seconds

		OS_CPU_TOTAL: "os.cpu.total",
		OS_CPU_INFO_MODEL: "os.cpu.info.model",
		OS_CPU_INFO_SPEED: "os.cpu.info.speed",
		OS_CPU_INFO_TIMES_USER: "os.cpu.info.times.user",
		OS_CPU_INFO_TIMES_SYS: "os.cpu.info.times.sys",

		// --- MOLECULER NODE METRICS ---

		MOLECULER_NODE_TYPE: "moleculer.node.type",
		MOLECULER_NODE_VERSIONS_MOLECULER: "moleculer.node.versions.moleculer",
		MOLECULER_NODE_VERSIONS_LANG: "moleculer.node.versions.lang",
		MOLECULER_NODE_VERSIONS_PROTOCOL: "moleculer.node.versions.protocol",

		// --- MOLECULER BROKER METRICS ---

		MOLECULER_BROKER_NAMESPACE: "moleculer.broker.namespace",
		MOLECULER_BROKER_STARTED: "moleculer.broker.started",
		MOLECULER_BROKER_LOCAL_SERVICES_TOTAL: "moleculer.broker.local.services.total",
		MOLECULER_BROKER_MIDDLEWARES_TOTAL: "moleculer.broker.middlewares.total",

		// --- MOLECULER REGISTRY METRICS ---

		MOLECULER_REGISTRY_NODES_TOTAL: "moleculer.registry.nodes.total",
		MOLECULER_REGISTRY_NODES_ONLINE_TOTAL: "moleculer.registry.nodes.online.total",
		MOLECULER_REGISTRY_SERVICES_TOTAL: "moleculer.registry.services.total",
		MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL: "moleculer.registry.service.endpoints.total",
		MOLECULER_REGISTRY_ACTIONS_TOTAL: "moleculer.registry.actions.total",
		MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL: "moleculer.registry.action.endpoints.total",
		MOLECULER_REGISTRY_EVENTS_TOTAL: "moleculer.registry.events.total",
		MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL: "moleculer.registry.event.endpoints.total",

		// --- MOLECULER REQUEST METRICS ---

		MOLECULER_REQUEST_TOTAL: "moleculer.request.total",
		MOLECULER_REQUEST_ACTIVE: "moleculer.request.active",
		MOLECULER_REQUEST_ERROR_TOTAL: "moleculer.request.error.total",
		MOLECULER_REQUEST_TIME: "moleculer.request.time", //msec
		MOLECULER_REQUEST_LEVELS: "moleculer.request.levels",
		//MOLECULER_REQUEST_DIRECTCALL_TOTAL: "moleculer.request.directcall.total",
		//MOLECULER_REQUEST_MULTICALL_TOTAL: "moleculer.request.multicall.total",

		// --- MOLECULER EVENTS METRICS ---

		MOLECULER_EVENT_EMIT_TOTAL: "moleculer.event.emit.total",
		MOLECULER_EVENT_BROADCAST_TOTAL: "moleculer.event.broadcast.total",
		MOLECULER_EVENT_BROADCASTLOCAL_TOTAL: "moleculer.event.broadcast-local.total",
		MOLECULER_EVENT_RECEIVED_TOTAL: "moleculer.event.received.total",
		MOLECULER_EVENT_RECEIVED_ACTIVE: "moleculer.event.received.active",
		MOLECULER_EVENT_RECEIVED_ERROR_TOTAL: "moleculer.event.received.error.total",
		MOLECULER_EVENT_RECEIVED_TIME: "moleculer.event.received.time", //msec

		// --- MOLECULER TRANSIT METRICS ---

		MOLECULER_TRANSIT_PUBLISH_TOTAL: "moleculer.transit.publish.total",
		MOLECULER_TRANSIT_RECEIVE_TOTAL: "moleculer.transit.receive.total",

		MOLECULER_TRANSIT_REQUESTS_ACTIVE: "moleculer.transit.requests.active",
		MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE: "moleculer.transit.streams.send.active",
		//MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE: "moleculer.transit.streams.receive.active",
		MOLECULER_TRANSIT_READY: "moleculer.transit.ready", // true/false
		MOLECULER_TRANSIT_CONNECTED: "moleculer.transit.connected", // true/false

		MOLECULER_TRANSIT_PONG_TIME: "moleculer.transit.pong.time", // true/false
		MOLECULER_TRANSIT_PONG_SYSTIME_DIFF: "moleculer.transit.pong.systime-diff", // true/false

		MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL: "moleculer.transit.orphan.response.total",

		// --- MOLECULER TRANSPORTER METRICS ---

		MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL: "moleculer.transporter.packets.sent.total",
		MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES: "moleculer.transporter.packets.sent.bytes", // bytes
		MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL: "moleculer.transporter.packets.received.total",
		MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES: "moleculer.transporter.packets.received.bytes", // bytes

		// --- MOLECULER CIRCUIT BREAKER METRICS ---

		MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE: "moleculer.circuit-breaker.opened.active",
		MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL: "moleculer.circuit-breaker.opened.total",
		MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE: "moleculer.circuit-breaker.half-opened.active",

		// --- MOLECULER FALLBACK METRICS ---

		MOLECULER_REQUEST_FALLBACK_TOTAL: "moleculer.request.fallback.total",

		// --- MOLECULER BULKHEAD METRICS ---

		MOLECULER_REQUEST_BULKHEAD_INFLIGHT: "moleculer.request.bulkhead.inflight",
		MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE: "moleculer.request.bulkhead.queue.size",

		MOLECULER_EVENT_BULKHEAD_INFLIGHT: "moleculer.event.bulkhead.inflight",
		MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE: "moleculer.event.bulkhead.queue.size",

		// --- MOLECULER RETRY METRICS ---

		MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL: "moleculer.request.retry.attempts.total",

		// --- MOLECULER TIMEOUT METRICS ---

		MOLECULER_REQUEST_TIMEOUT_TOTAL: "moleculer.request.timeout.total",

		// --- MOLECULER CACHER METRICS ---

		MOLECULER_CACHER_GET_TOTAL: "moleculer.cacher.get.total",
		MOLECULER_CACHER_GET_TIME: "moleculer.cacher.get.time",
		MOLECULER_CACHER_FOUND_TOTAL: "moleculer.cacher.found.total",
		MOLECULER_CACHER_SET_TOTAL: "moleculer.cacher.set.total",
		MOLECULER_CACHER_SET_TIME: "moleculer.cacher.set.time",
		MOLECULER_CACHER_DEL_TOTAL: "moleculer.cacher.del.total",
		MOLECULER_CACHER_DEL_TIME: "moleculer.cacher.del.time",
		MOLECULER_CACHER_CLEAN_TOTAL: "moleculer.cacher.clean.total",
		MOLECULER_CACHER_CLEAN_TIME: "moleculer.cacher.clean.time",
		MOLECULER_CACHER_EXPIRED_TOTAL: "moleculer.cacher.expired.total",

		MOLECULER_DISCOVERER_REDIS_COLLECT_TOTAL: "moleculer.discoverer.redis.collect.total",
		MOLECULER_DISCOVERER_REDIS_COLLECT_TIME: "moleculer.discoverer.redis.collect.time",

		MOLECULER_DISCOVERER_ETCD_COLLECT_TOTAL: "moleculer.discoverer.etcd.collect.total",
		MOLECULER_DISCOVERER_ETCD_COLLECT_TIME: "moleculer.discoverer.etcd.collect.time",

		// --- COMMON UNITS ---
		// Inspired by https://docs.datadoghq.com/developers/metrics/#units

		// Bytes
		UNIT_BIT: "bit",
		UNIT_BYTE: "byte",
		UNIT_KILOBYTES: "kilobyte",
		UNIT_MEGABYTE: "megabyte",
		UNIT_GIGABYTE: "gigabyte",
		UNIT_TERRABYTE: "terrabyte",
		UNIT_PETABYTE: "petabyte",
		UNIT_EXOBYTE: "exabyte",

		// Time
		UNIT_NANOSECONDS: "nanosecond",
		UNIT_MICROSECONDS: "microsecond",
		UNIT_MILLISECONDS: "millisecond",
		UNIT_SECONDS: "second",
		UNIT_MINUTE: "minute",
		UNIT_HOUR: "hour",
		UNIT_DAY: "day",
		UNIT_WEEK: "week",
		UNIT_MONTH: "month",
		UNIT_YEAR: "year",

		// Process
		UNIT_HANDLE: "handle",
		UNIT_CPU: "cpu",
		UNIT_GHZ: "GHz",

		// Network
		UNIT_REQUEST: "request",
		UNIT_CONNECTION: "connection",
		UNIT_PACKET: "packet",
		UNIT_MESSAGE: "message",
		UNIT_STREAM: "stream",
		UNIT_EVENT: "event",
	};

	const EventEmitter = EE__default['default'];

	class RafPerf extends EventEmitter {
	  constructor (options) {
	    super();

	    this.options = { ...RafPerf.defaultOptions, ...options };

	    this.reset();

	    this.tick = this.tick.bind(this);
	    this.onVisibilityChange = this.onVisibilityChange.bind(this);
	  }

	  reset () {
	    this.isVisible = true;
	    this.running = false;
	    this.prevTime = null;
	    this.startTime = null;

	    this.frameDuration = RafPerf.fpsToMs(this.options.fps);

	    this.performance = undefined;
	    this.perfSamples = [];

	    if (this.requestID) cancelAnimationFrame(this.requestID);
	  }

	  start () {
	    // Check if loop is already running
	    if (this.running) return

	    // Set running state and initial time
	    this.running = true;
	    this.prevTime = RafPerf.now();
	    this.startTime = this.prevTime;
	    this.perfStartTime = this.prevTime;

	    // Add visibility listener
	    document.addEventListener(
	      'visibilitychange',
	      this.onVisibilityChange,
	      false
	    );

	    // Start ticking
	    this.requestID = requestAnimationFrame(this.tick);
	  }

	  tick () {
	    // Ensure loop is running
	    if (!this.running || !this.isVisible) return

	    const { performances } = this.options;

	    // Compute delta time since previous time
	    const time = RafPerf.now();
	    const deltaTime = time - this.prevTime;

	    // Compute delta since previous frame
	    const frameDeltaTime = time - this.startTime;

	    // Check elapsed time is more than desired frame duration
	    if (deltaTime > this.frameDuration) {
	      if (performances.enabled) {
	        // Push delta time for average computation
	        this.perfSamples.push(frameDeltaTime);

	        // Check if enough time has passed to sample or number of samples collected is enough
	        const perfNeedsUpdates =
	          (performances.sampleDuration &&
	            time - this.perfStartTime > performances.sampleDuration) ||
	          this.perfSamples.length > performances.samplesCount;

	        if (perfNeedsUpdates) {
	          // Check average and update performance ratio
	          const averageDeltaTime =
	            this.perfSamples.reduce((time, sum) => time + sum) /
	            this.perfSamples.length;
	          this.performance = this.frameDuration / averageDeltaTime;
	          this.emit('perf', this.performance);

	          // Reset performances variables
	          this.perfSamples = [];
	          this.perfStartTime = time;
	        }
	      }

	      // Update prev and start time
	      // Compensate for gap between delta time and x number of frames
	      this.prevTime = time - (deltaTime % this.frameDuration);
	      this.startTime = time;

	      // Call user callback function with delta time
	      this.emit('tick', frameDeltaTime);
	    }

	    this.requestID = requestAnimationFrame(this.tick);
	  }

	  stop () {
	    document.removeEventListener(
	      'visibilitychange',
	      this.onVisibilityChange,
	      false
	    );

	    this.reset();
	  }

	  onVisibilityChange () {
	    this.isVisible = !document.hidden;

	    if (this.isVisible) {
	      this.reset();
	      this.start();
	    }
	  }
	}

	// Static
	RafPerf.defaultOptions = {
	  fps: 60,
	  performances: {
	    enabled: true,
	    samplesCount: 200,
	    // If everything runs smoothtly, samplesCount will be used over sampleDuration
	    // 1000 ms / 60 fps * 200 samplesCount = 3333 ms
	    sampleDuration: 4000
	  }
	};

	RafPerf.now = () => {
	  return (performance || Date).now()
	};

	RafPerf.fpsToMs = value => {
	  return (1 / value) * 1000
	};

	// Simulate https://nodejs.org/api/os.html#os_os_loadavg
	const _osLoadAvg = [
	  // 1 minute
	  {
	    time: Math.floor(Date.now() / 1000),
	    init: false,
	    avg: 0
	  },

	  // 5 minutes
	  {
	    time: Math.floor(Date.now() / 1000),
	    avg: 0
	  },

	  // 15 minutes
	  {
	    time: Math.floor(Date.now() / 1000),
	    avg: 0
	  }
	];

	function updateLoadAvg (avg) {
	  const currentTime = Math.floor(Date.now() / 1000);
	  if (!_osLoadAvg[0].init || (currentTime - _osLoadAvg[0].time) > 60) {
	    _osLoadAvg[0].init = true;
	    _osLoadAvg[0].time = currentTime;
	    _osLoadAvg[0].avg = avg;
	  }

	  if ((currentTime - _osLoadAvg[1].time) > 60 * 5) {
	    _osLoadAvg[1].time = currentTime;
	    _osLoadAvg[1].avg = avg;
	  }

	  if ((currentTime - _osLoadAvg[2].time) > 60 * 15) {
	    _osLoadAvg[2].time = currentTime;
	    _osLoadAvg[2].avg = avg;
	  }
	}

	function loadavg () {
	  return _osLoadAvg.map(value => value.avg)
	}

	/**
	 * getCpuUsage
	 *
	 * Simulate cpuUsage of the browser based on the FPS performance.
	 *
	 * rate 1 (60fps) -> 0% usage
	 * rate 0.5 (30fps) -> 50% usage
	 * rate 0 (0fps) -> 100% usage
	 *
	 * @param {Boolean=100} sampleTime
	 * @returns {Promise<Result>}
	 */
	function getCpuUsage (sampleTime = 100) {
	  const engine = new RafPerf({
	    performances: {
	      enabled: true,
	      samplesCount: 3,
	      sampleDuration: sampleTime
	    }
	  });

	  return new Promise((resolve, reject) => {
	    engine.once('perf', ratio => {
	      engine.stop();

	      if (!ratio) {
	        return reject(new Error('CpuUsage: ratio perf not found.'))
	      }

	      const avg = 100 - (ratio * 100);
	      const avgByCpu = avg / cpus__default['default']().length;

	      updateLoadAvg(avg);

	      resolve({
	        avg,
	        usages: cpus__default['default']().map(cpu => avgByCpu)
	      });
	    });

	    engine.start();
	  })
	}

	getCpuUsage.loadavg = loadavg;

	/* global performance */

	const hostname = () => {
	  if (typeof location !== 'undefined') {
	    return location.hostname
	  } else return ''
	};

	const release = () => {
	  if (typeof navigator !== 'undefined') {
	    return navigator.appVersion
	  }
	  return ''
	};

	const userInfo = () => ({
	  uid: 1000,
	  gid: 1000,
	  username: 'moleculer',
	  homedir: '/home/moleculer',
	  shell: '/bin/bash'
	});
	const endianness = () => 'LE';
	const uptime = () => Date.now();
	const type = () => 'Browser';
	const networkInterfaces = () => ({});
	const getNetworkInterfaces = () => ({});
	const arch = () => 'javascript';
	const platform = () => 'browser';
	const tmpdir = () => '/tmp';
	const tmpDir = () => '/tmp';
	const EOL = '\n';
	const homedir = () => '/';
	const loadavg$1 = getCpuUsage.loadavg;
	const totalmem = () => performance ? performance.memory.totalJSHeapSize : Number.MAX_VALUE;
	const freemem = () => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : Number.MAX_VALUE;

	var os = /*#__PURE__*/Object.freeze({
		__proto__: null,
		hostname: hostname,
		release: release,
		userInfo: userInfo,
		endianness: endianness,
		uptime: uptime,
		type: type,
		networkInterfaces: networkInterfaces,
		getNetworkInterfaces: getNetworkInterfaces,
		arch: arch,
		platform: platform,
		tmpdir: tmpdir,
		tmpDir: tmpDir,
		EOL: EOL,
		homedir: homedir,
		loadavg: loadavg$1,
		totalmem: totalmem,
		freemem: freemem,
		cpus: cpus__default['default']
	});

	const lut = [];
	for (let i=0; i<256; i++) { lut[i] = (i<16?"0":"")+(i).toString(16); }

	const RegexCache = new Map();

	const deprecateList = [];

	const byteMultipliers = {
		b:  1,
		kb: 1 << 10,
		mb: 1 << 20,
		gb: 1 << 30,
		tb: Math.pow(1024, 4),
		pb: Math.pow(1024, 5),
	};
	// eslint-disable-next-line security/detect-unsafe-regex
	const parseByteStringRe = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;

	class TimeoutError extends ExtendableError__default['default'] {}

	/**
	 * Circular replacing of unsafe properties in object
	 *
	 * @param {Object=} options List of options to change circularReplacer behaviour
	 * @param {number=} options.maxSafeObjectSize Maximum size of objects for safe object converting
	 * @return {function(...[*]=)}
	 */
	function circularReplacer(options = { maxSafeObjectSize: Infinity }) {
		const seen = new WeakSet();
		return function(key, value) {
			if (typeof value === "object" && value !== null) {
				const objectType = value.constructor && value.constructor.name || typeof value;

				if (options.maxSafeObjectSize && "length" in value && value.length > options.maxSafeObjectSize) {
					return `[${objectType} ${value.length}]`;
				}

				if (options.maxSafeObjectSize && "size" in value && value.size > options.maxSafeObjectSize) {
					return `[${objectType} ${value.size}]`;
				}

				if (seen.has(value)) {
					//delete this[key];
					return;
				}
				seen.add(value);
			}
			return value;
		};
	}

	const units = ["h", "m", "s", "ms", "μs", "ns"];
	const divisors = [60 * 60 * 1000, 60 * 1000, 1000, 1, 1e-3, 1e-6];

	const utils = {

		isFunction(fn) {
			return typeof fn === "function";
		},

		isString(s) {
			return typeof s === "string" || s instanceof String;
		},

		isObject(o) {
			return o !== null && typeof o === "object" && !(o instanceof String);
		},

		isPlainObject(o) {
			return o !=null ? Object.getPrototypeOf(o) === Object.prototype || Object.getPrototypeOf(o) === null : false;
		},

		flatten(arr) {
			return Array.prototype.reduce.call(arr, (a, b) => a.concat(b), []);
		},

		humanize(milli) {
			if (milli == null) return "?";

			for (let i = 0; i < divisors.length; i++) {
				const val = milli / divisors[i];
				if (val >= 1.0)
					return "" + Math.floor(val) + units[i];
			}

			return "now";
		},

		// Fast UUID generator: e7 https://jsperf.com/uuid-generator-opt/18
		generateToken() {
			const d0 = Math.random()*0xffffffff|0;
			const d1 = Math.random()*0xffffffff|0;
			const d2 = Math.random()*0xffffffff|0;
			const d3 = Math.random()*0xffffffff|0;
			return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+"-"+
				lut[d1&0xff]+lut[d1>>8&0xff]+"-"+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+"-"+
				lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+"-"+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
				lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
		},

		removeFromArray(arr, item) {
			if (!arr || arr.length == 0) return arr;
			const idx = arr.indexOf(item);
			if (idx !== -1)
				arr.splice(idx, 1);

			return arr;
		},

		/**
		 * Get default NodeID (computerName)
		 *
		 * @returns
		 */
		getNodeID() {
			return os.hostname().toLowerCase() + "-" + proc.pid;
		},

		/**
		 * Get list of local IPs
		 *
		 * @returns
		 */
		getIpList() {
			const list = [];
			const ilist = [];
			const interfaces = os.networkInterfaces();
			for (let iface in interfaces) {
				for (let i in interfaces[iface]) {
					const f = interfaces[iface][i];
					if (f.family === "IPv4") {
						if (f.internal) {
							ilist.push(f.address);
							break;
						} else {
							list.push(f.address);
							break;
						}
					}
				}
			}
			return list.length > 0 ? list : ilist;
		},

		/**
		 * Check the param is a Promise instance
		 *
		 * @param {any} p
		 * @returns
		 */
		isPromise(p) {
			return (p != null && typeof p.then === "function");
		},

		/**
		 * Polyfill a Promise library with missing Bluebird features.
		 *
		 * NOT USED & NOT TESTED YET !!!
		 *
		 * @param {PromiseClass} P
		 */
		polyfillPromise(P) {
			if (!utils.isFunction(P.method)) {
				// Based on https://github.com/petkaantonov/bluebird/blob/master/src/method.js#L8
				P.method = function(fn) {
					return function() {
						try {
							const val = fn.apply(this, arguments);
							return P.resolve(val);
						} catch (err) {
							return P.reject(err);
						}
					};
				};
			}

			if (!utils.isFunction(P.delay)) {
				// Based on https://github.com/petkaantonov/bluebird/blob/master/src/timers.js#L15
				P.delay = function(ms) {
					return new P(resolve => timersBrowserify.setTimeout(resolve, +ms));
				};
				P.prototype.delay = function(ms) {
					return this.then(res => P.delay(ms).then(() => res));
					//return this.then(res => new P(resolve => setTimeout(() => resolve(res), +ms)));
				};
			}

			if (!utils.isFunction(P.prototype.timeout)) {
				P.TimeoutError = TimeoutError;

				P.prototype.timeout = function(ms, message) {
					let timer;
					const timeout = new P((resolve, reject) => {
						timer = timersBrowserify.setTimeout(() => reject(new P.TimeoutError(message)), +ms);
					});

					return P.race([
						timeout,
						this
					])
						.then(value => {
							clearTimeout(timer);
							return value;
						})
						.catch(err => {
							clearTimeout(timer);
							throw err;
						});
				};
			}

			if (!utils.isFunction(P.mapSeries)) {

				P.mapSeries = function(arr, fn) {
					const promFn = Promise.method(fn);
					const res = [];

					return arr.reduce((p, item, i) => {
						return p.then(r => {
							res[i] = r;
							return promFn(item, i);
						});
					}, P.resolve()).then(r => {
						res[arr.length] = r;
						return res.slice(1);
					});
				};
			}
		},

		/**
		 * Clear `require` cache. Used for service hot reloading
		 *
		 * @param {String} filename
		 */
		clearRequireCache(filename) {
			/* istanbul ignore next */
			Object.keys(require.cache).forEach(function(key) {
				if (key == filename) {
					delete require.cache[key];
				}
			});
		},

		/**
		 * String matcher to handle dot-separated event/action names.
		 *
		 * @param {String} text
		 * @param {String} pattern
		 * @returns {Boolean}
		 */
		match(text, pattern) {
			// Simple patterns
			if (pattern.indexOf("?") == -1) {

				// Exact match (eg. "prefix.event")
				const firstStarPosition = pattern.indexOf("*");
				if (firstStarPosition == -1) {
					return pattern === text;
				}

				// Eg. "prefix**"
				const len = pattern.length;
				if (len > 2 && pattern.endsWith("**") && firstStarPosition > len - 3) {
					pattern = pattern.substring(0, len - 2);
					return text.startsWith(pattern);
				}

				// Eg. "prefix*"
				if (len > 1 && pattern.endsWith("*") && firstStarPosition > len - 2) {
					pattern = pattern.substring(0, len - 1);
					if (text.startsWith(pattern)) {
						return text.indexOf(".", len) == -1;
					}
					return false;
				}

				// Accept simple text, without point character (*)
				if (len == 1 && firstStarPosition == 0) {
					return text.indexOf(".") == -1;
				}

				// Accept all inputs (**)
				if (len == 2 && firstStarPosition == 0 && pattern.lastIndexOf("*") == 1) {
					return true;
				}
			}

			// Regex (eg. "prefix.ab?cd.*.foo")
			const origPattern = pattern;
			let regex = RegexCache.get(origPattern);
			if (regex == null) {
				if (pattern.startsWith("$")) {
					pattern = "\\" + pattern;
				}
				pattern = pattern.replace(/\?/g, ".");
				pattern = pattern.replace(/\*\*/g, "§§§");
				pattern = pattern.replace(/\*/g, "[^\\.]*");
				pattern = pattern.replace(/§§§/g, ".*");

				pattern = "^" + pattern + "$";

				// eslint-disable-next-line security/detect-non-literal-regexp
				regex = new RegExp(pattern, "");
				RegexCache.set(origPattern, regex);
			}
			return regex.test(text);
		},

		/**
		 * Deprecate a method or property
		 *
		 * @param {Object|Function|String} prop
		 * @param {String} msg
		 */
		deprecate(prop, msg) {
			if (arguments.length == 1)
				msg = prop;

			if (deprecateList.indexOf(prop) === -1) {
				// eslint-disable-next-line no-console
				console.warn(kleur__default['default'].yellow().bold(`DeprecationWarning: ${msg}`));
				deprecateList.push(prop);
			}
		},

		/**
		 * Remove circular references & Functions from the JS object
		 *
		 * @param {Object|Array} obj
		 * @param {Object=} options List of options to change circularReplacer behaviour
		 * @param {number=} options.maxSafeObjectSize List of options to change circularReplacer behaviour
		 * @returns {Object|Array}
		 */
		safetyObject(obj, options) {
			return JSON.parse(JSON.stringify(obj, circularReplacer(options)));
		},

		/**
		 * Sets a variable on an object based on its dot path.
		 *
		 * @param {Object} obj
		 * @param {String} path
		 * @param {*} value
		 * @returns {Object}
		 */
		dotSet(obj, path, value) {
			const parts = path.split(".");
			const part = parts.shift();
			if (parts.length > 0) {
				if (!Object.prototype.hasOwnProperty.call(obj, part)) {
					obj[part] = {};
				} else if (obj[part] == null) {
					obj[part] = {};
				} else {
					if (typeof obj[part] !== "object") {
						throw new Error("Value already set and it's not an object");
					}
				}
				obj[part] = utils.dotSet(obj[part], parts.join("."), value);
				return obj;
			}
			obj[path] = value;
			return obj;
		},

		/**
		 * Make directories recursively
		 * @param {String} p - directory path
		 */
		makeDirs(p) {
			p.split(path__default['default'].sep)
				.reduce((prevPath, folder) => {
					const currentPath = path__default['default'].join(prevPath, folder, path__default['default'].sep);
					if (!fs__default['default'].existsSync(currentPath)) {
						fs__default['default'].mkdirSync(currentPath);
					}
					return currentPath;
				}, "");
		},

		/**
		 * Parse a byte string to number of bytes. E.g "1kb" -> 1024
		 * Credits: https://github.com/visionmedia/bytes.js
		 *
		 * @param {String} v
		 * @returns {Number}
		 */
		parseByteString(v) {
			if (typeof v === "number" && !isNaN(v)) {
				return v;
			}

			if (typeof v !== "string") {
				return null;
			}

			// Test if the string passed is valid
			let results = parseByteStringRe.exec(v);
			let floatValue;
			let unit = "b";

			if (!results) {
				// Nothing could be extracted from the given string
				floatValue = parseInt(v, 10);
				if (Number.isNaN(floatValue))
					return null;

				unit = "b";
			} else {
				// Retrieve the value and the unit
				floatValue = parseFloat(results[1]);
				unit = results[4].toLowerCase();
			}

			return Math.floor(byteMultipliers[unit] * floatValue);
		}
	};

	var utils_1 = utils;

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Abstract Base Metric class.
	 *
	 * @class BaseMetric
	 */
	class BaseMetric {

		/**
		 * Creates an instance of BaseMetric.
		 *
		 * @param {Object} opts
		 * @param {MetricRegistry} registry
		 * @memberof BaseMetric
		 */
		constructor(opts, registry) {
			this.registry = registry;
			this.type = opts.type;
			this.name = opts.name;
			this.description = opts.description;
			this.labelNames = opts.labelNames || [];
			this.unit = opts.unit;
			this.aggregator = opts.aggregator || registry.opts.defaultAggregator;

			this.lastSnapshot = null;
			this.dirty = true;

			this.values = new Map();
		}

		/**
		 * Set dirty flag
		 *
		 * @memberof BaseMetric
		 */
		setDirty() {
			this.dirty = true;
		}

		/**
		 * Clear dirty flag
		 *
		 * @memberof BaseMetric
		 */
		clearDirty() {
			this.dirty = false;
		}

		/**
		 * Get metric item by labels
		 *
		 * @param {Object?} labels
		 * @returns {Object}
		 * @memberof BaseMetric
		 */
		get(labels) {
			const hash = this.hashingLabels(labels);
			return this.values.get(hash);
		}

		/**
		 * Reset item by labels
		 *
		 * @memberof BaseMetric
		 */
		reset(/*labels, timestamp*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Reset all items
		 *
		 * @memberof BaseMetric
		 */
		resetAll(/*timestamp*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Clear metric values.
		 *
		 * @memberof BaseMetric
		 */
		clear() {
			this.values = new Map();
			this.changed();
		}

		/**
		 * Create a hash from label values. It will
		 * be used as a key in Map.
		 *
		 * @param {Object} labels
		 * @returns {String}
		 * @memberof BaseMetric
		 */
		hashingLabels(labels) {
			if (this.labelNames.length == 0 || labels == null || typeof labels !== "object")
				return "";

			const parts = [];
			for (let i = 0; i < this.labelNames.length; i++) {
				const v = labels[this.labelNames[i]];
				if (typeof v == "number")
					parts.push(v);
				else if (typeof v === "string")
					parts.push("\"" + v + "\"");
				else if (typeof v === "boolean")
					parts.push("" + v);
				else
					parts.push("");
			}
			return parts.join("|");
		}

		/**
		 * Get a snapshot.
		 *
		 * @returns {Object}
		 * @memberof BaseMetric
		 */
		snapshot() {
			if (!this.dirty && this.lastSnapshot)
				return this.lastSnapshot;

			this.lastSnapshot = this.generateSnapshot();
			this.clearDirty();

			return this.lastSnapshot;
		}

		/**
		 * Generate a snapshot.
		 *
		 * @memberof BaseMetric
		 */
		generateSnapshot() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Metric has been changed.
		 * @param {any} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 */
		changed(value, labels, timestamp) {
			this.setDirty();
			this.registry.changed(this, value, labels, timestamp);
		}

		/**
		 * Export to a POJO.
		 */
		toObject() {
			return {
				type: this.type,
				name: this.name,
				description: this.description,
				labelNames: this.labelNames,
				unit: this.unit,

				values: this.snapshot()
			};
		}
	}

	var base = BaseMetric;

	const INTERVAL = 5;
	const SECONDS_PER_MINUTE = 60.0;

	// https://github.com/dropwizard/metrics/blob/4.0-maintenance/metrics-core/src/main/java/com/codahale/metrics/EWMA.java
	/* istanbul ignore next
	function getAlpha(min) {
		return 1 - Math.exp(-INTERVAL / SECONDS_PER_MINUTE / min);
	}
	*/

	class MetricRate {

		constructor(metric, item, min) {
			this.metric = metric;
			this.item = item;
			this.min = min;
			//this.alpha = getAlpha(min);

			this.rate = 0;

			this.lastValue = 0;
			this.lastTickTime = Date.now();
			this.value = null;

			this.timer = timersBrowserify.setInterval(() => this.tick(), INTERVAL * 1000).unref();
		}

		update(value) {
			this.value = value;
		}

		tick() {
			// Get elapsed seconds
			const now = Date.now();
			const elapsedSec = (now - this.lastTickTime) / 1000;
			this.lastTickTime = now;

			// Get difference between new and old value
			const diff = this.value - this.lastValue;
			this.lastValue = this.value;

			// Calculate the current requests/minute
			const oneMinRate = diff / elapsedSec * SECONDS_PER_MINUTE;

			// Weighted calculation
			let rate = this.rate + (oneMinRate - this.rate) * 0.5;
			// EWMA: const rate = this.rate + (this.alpha * (oneMinRate - this.rate));

			// Rounding
			if (Math.abs(rate) < 0.05) rate = 0;
			const changed = Math.abs(rate - this.rate) > 0.01;

			this.rate = rate;

			if (changed)
				this.metric.changed(this.item.value, this.item.labels, now);
		}

		reset() {
			this.lastValue = 0;
			this.value = null;

			this.rate = 0;
		}

	}
	var rates = MetricRate;

	const { pick } = ___default['default'];




	/**
	 * Gauge metric class.
	 *
	 * @class GaugeMetric
	 * @extends {BaseMetric}
	 */
	class GaugeMetric extends base {

		/**
		 * Creates an instance of GaugeMetric.
		 * @param {Object} opts
		 * @param {MetricRegistry} registry
		 * @memberof GaugeMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_GAUGE;
			this.rate = opts.rate;
		}

		/**
		 * Increment value
		 *
		 * @param {Object} labels
		 * @param {Number?} value
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		increment(labels, value, timestamp) {
			if (value == null)
				value = 1;

			const item = this.get(labels);
			return this.set((item ? item.value : 0) + value, labels, timestamp);
		}

		/**
		 * Decrement value.
		 *
		 * @param {Object} labels
		 * @param {Number?} value
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		decrement(labels, value, timestamp) {
			if (value == null)
				value = 1;

			const item = this.get(labels);
			return this.set((item ? item.value : 0) - value, labels, timestamp);
		}

		/**
		 * Set value.
		 *
		 * @param {Number?} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		set(value, labels, timestamp) {
			const hash = this.hashingLabels(labels);
			let item = this.values.get(hash);
			if (item) {
				if (item.value != value) {
					item.value = value;
					item.timestamp = timestamp == null ? Date.now() : timestamp;

					if (item.rate)
						item.rate.update(value);

					this.changed(value, labels, timestamp);
				}
			} else {
				item = {
					value,
					labels: pick(labels, this.labelNames),
					timestamp: timestamp == null ? Date.now() : timestamp,
				};
				this.values.set(hash, item);

				if (this.rate) {
					item.rate = new rates(this, item, 1);
					item.rate.update(value);
				}

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
		 * @memberof GaugeMetric
		 */
		reset(labels, timestamp) {
			return this.set(0, labels, timestamp);
		}

		/**
		 * Reset all items.
		 *
		 * @param {Number?} timestamp
		 * @memberof GaugeMetric
		 */
		resetAll(timestamp) {
			this.values.forEach(item => {
				item.value = 0;
				item.timestamp = timestamp == null ? Date.now() : timestamp;
			});
			this.changed(null, null, timestamp);
		}

		/**
		 * Generate a snapshot.
		 *
		 * @returns {Array<Object>}
		 * @memberof GaugeMetric
		 */
		generateSnapshot() {
			const snapshot = Array.from(this.values.keys()).map(key => {
				const item = this.values.get(key);
				const res = {
					key,
					value: item.value,
					labels: item.labels,
					timestamp: item.timestamp
				};

				if (item.rate)
					res.rate = item.rate.rate;

				return res;
			});

			return snapshot;
		}
	}

	var gauge = GaugeMetric;

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
			this.type = constants$1.TYPE_COUNTER;
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

	const { isPlainObject } = utils_1;
	const sortAscending = (a, b) => a - b;
	const setProp = (o, k, v) => {
		o[k] = v;
		return o;
	};

	/**
	 * Histogram metric class.
	 *
	 * @class HistogramMetric
	 * @extends {BaseMetric}
	 */
	class HistogramMetric extends base {

		/**
		 * Creates an instance of HistogramMetric.
		 * @param {Object} opts
		 * @param {MetricRegistry} registry
		 * @memberof HistogramMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_HISTOGRAM;

			// Create buckets
			if (isPlainObject(opts.linearBuckets)) {
				this.buckets = HistogramMetric.generateLinearBuckets(opts.linearBuckets.start, opts.linearBuckets.width, opts.linearBuckets.count);
			} else if (isPlainObject(opts.exponentialBuckets)) {
				this.buckets = HistogramMetric.generateExponentialBuckets(opts.exponentialBuckets.start, opts.exponentialBuckets.factor, opts.exponentialBuckets.count);
			} else if (Array.isArray(opts.buckets)) {
				this.buckets = Array.from(opts.buckets);
			} else if (opts.buckets === true) {
				this.buckets = this.registry.opts.defaultBuckets;
			}
			if (this.buckets) {
				this.buckets.sort(sortAscending);
			}

			// Create quantiles
			if (Array.isArray(opts.quantiles)) {
				this.quantiles = Array.from(opts.quantiles);
			} else if (opts.quantiles === true) {
				this.quantiles = this.registry.opts.defaultQuantiles;
			}
			if (this.quantiles) {
				this.quantiles.sort(sortAscending);
				this.maxAgeSeconds = opts.maxAgeSeconds || this.registry.opts.defaultMaxAgeSeconds; // 1 minute
				this.ageBuckets = opts.ageBuckets || this.registry.opts.defaultAgeBuckets; // 10 secs per bucket
			}

			this.rate = opts.rate;
		}

		/**
		 * Observe a value.
		 *
		 * @param {Number} value
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof HistogramMetric
		 */
		observe(value, labels, timestamp) {
			const hash = this.hashingLabels(labels);
			let item = this.values.get(hash);
			if (!item) {
				item = this.resetItem({
					labels: ___default['default'].pick(labels, this.labelNames)
				});

				if (this.rate)
					item.rate = new rates(this, item, 1);

				this.values.set(hash, item);
			}

			item.timestamp = timestamp == null ? Date.now() : timestamp;
			item.sum += value;
			item.count++;
			item.lastValue = value;

			if (item.bucketValues) {
				const len = this.buckets.length;
				for (let i = 0; i < len; i++) {
					if (value <= this.buckets[i]) {
						item.bucketValues[this.buckets[i]] += 1;
					}
				}
			}

			if (item.quantileValues) {
				item.quantileValues.add(value);
			}

			if (item.rate)
				item.rate.update(item.count);

			this.changed(value, labels, timestamp);

			return item;
		}

		/**
		 * Create new bucket values based on options.
		 *
		 * @returns {Object}
		 * @memberof HistogramMetric
		 */
		createBucketValues() {
			return this.buckets.reduce((a, bound) => setProp(a, bound, 0), {});
		}

		/**
		 * Generate a snapshot
		 *
		 * @returns {Array<Object>}
		 * @memberof HistogramMetric
		 */
		generateSnapshot() {
			return Array.from(this.values.keys()).map(key => this.generateItemSnapshot(this.values.get(key), key));
		}

		/**
		 * Generate a snapshot for an item
		 *
		 * @param {Object} item
		 * @param {String} key
		 * @returns {Object}
		 * @memberof HistogramMetric
		 */
		generateItemSnapshot(item, key) {
			const snapshot = {
				key,
				labels: item.labels,
				count: item.count,
				sum: item.sum,
				lastValue: item.lastValue,
				timestamp: item.timestamp,
			};

			if (this.buckets)
				snapshot.buckets = this.buckets.reduce((a, b) => setProp(a, b, item.bucketValues[b]), {});

			if (this.quantiles)
				Object.assign(snapshot, item.quantileValues.snapshot());

			if (item.rate)
				snapshot.rate = item.rate.rate;

			return snapshot;
		}

		/**
		 * Reset value of item.
		 *
		 * @param {Object} item
		 * @param {Number?} timestamp
		 */
		resetItem(item, timestamp) {
			item.timestamp = timestamp == null ? Date.now() : timestamp;
			item.sum = 0;
			item.count = 0;
			item.lastValue = null;

			if (this.buckets) {
				item.bucketValues = this.createBucketValues();
			}

			if (this.quantiles) {
				item.quantileValues = new TimeWindowQuantiles(this, this.quantiles, this.maxAgeSeconds, this.ageBuckets);
			}

			return item;
		}

		/**
		 * Reset item by labels.
		 *
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof HistogramMetric
		 */
		reset(labels, timestamp) {
			const hash = this.hashingLabels(labels);
			const item = this.values.get(hash);
			if (item) {
				this.resetItem(item, timestamp);
				this.changed(null, labels, timestamp);
			}
		}

		/**
		 * Reset all items.
		 *
		 * @param {Number?} timestamp
		 * @memberof HistogramMetric
		 */
		resetAll(timestamp) {
			this.values.forEach(item => this.resetItem(item, timestamp));
			this.changed();
		}

		/**
		 * Generate linear buckets
		 *
		 * @static
		 * @param {Number} start
		 * @param {Number} width
		 * @param {Number} count
		 * @returns {Array<Number>}
		 * @memberof HistogramMetric
		 */
		static generateLinearBuckets(start, width, count) {
			const buckets = [];
			for (let i = 0; i < count; i++)
				buckets.push(start + i * width);

			return buckets;
		}

		/**
		 * Generate exponential buckets
		 *
		 * @static
		 * @param {Number} start
		 * @param {Number} factor
		 * @param {Number} count
		 * @returns {Array<Number>}
		 * @memberof HistogramMetric
		 */
		static generateExponentialBuckets(start, factor, count) {
			const buckets = [];
			for (let i = 0; i < count; i++)
				buckets[i] = start * Math.pow(factor, i);

			return buckets;
		}
	}

	/**
	 * Timewindow class for quantiles.
	 *
	 * @class TimeWindowQuantiles
	 */
	class TimeWindowQuantiles {

		/**
		 * Creates an instance of TimeWindowQuantiles.
		 * @param {BaseMetric} metric
		 * @param {Array<Number>} quantiles
		 * @param {Number} maxAgeSeconds
		 * @param {Number} ageBuckets
		 * @memberof TimeWindowQuantiles
		 */
		constructor(metric, quantiles, maxAgeSeconds, ageBuckets) {
			this.metric = metric;
			this.quantiles = Array.from(quantiles);
			this.maxAgeSeconds = maxAgeSeconds;
			this.ageBuckets = ageBuckets;
			this.ringBuckets = [];
			for(let i = 0; i < ageBuckets; i++) {
				this.ringBuckets.push(new Bucket());
			}
			this.dirty = true;

			this.currentBucket = -1;
			this.rotate();

			this.lastSnapshot = null;
			this.setDirty();
		}

		/**
		 * Set dirty flag.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		setDirty() {
			this.dirty = true;
			this.metric.setDirty();
		}

		/**
		 * Clear dirty flag.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		clearDirty() {
			this.dirty = false;
		}

		/**
		 * Rotate the ring buckets.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		rotate() {
			this.currentBucket = (this.currentBucket + 1) % this.ageBuckets;
			this.ringBuckets[this.currentBucket].clear();
			this.setDirty();

			timersBrowserify.setTimeout(() => this.rotate(), (this.maxAgeSeconds / this.ageBuckets) * 1000).unref();
		}

		/**
		 * Add a new value to the current bucket.
		 *
		 * @param {Number} value
		 * @memberof TimeWindowQuantiles
		 */
		add(value) {
			this.setDirty();
			this.ringBuckets[this.currentBucket].add(value);
		}

		/**
		 * Generate a snapshot from buckets and calculate min, max, mean, quantiles, variance & StdDev.
		 *
		 * @returns {Object}
		 * @memberof TimeWindowQuantiles
		 */
		snapshot() {
			if (!this.dirty && this.lastSnapshot)
				return this.lastSnapshot;

			const samples = this.ringBuckets.reduce((a, b) => a.concat(b.samples), []);
			samples.sort(sortAscending);

			const mean = samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : null;
			const variance = samples.length > 1 ? samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (samples.length - 1) : null;
			const stdDev = variance ? Math.sqrt(variance) : null;

			this.lastSnapshot = {
				min: samples.length ? samples[0] : null,
				mean,
				variance,
				stdDev,
				max: samples.length ? samples[samples.length - 1] : null,
				quantiles: this.quantiles.reduce((a, q) => setProp(a, q, samples[Math.ceil(q * samples.length) - 1]), {})
			};

			this.clearDirty();

			return this.lastSnapshot;
		}
	}

	/**
	 * Bucket class
	 *
	 * @class Bucket
	 */
	class Bucket {
		/**
		 * Creates an instance of Bucket.
		 * @memberof Bucket
		 */
		constructor() {
			this.count = 0;
			this.samples = [];
		}

		/**
		 * Add value to the bucket.
		 *
		 * @param {Number} value
		 * @memberof Bucket
		 */
		add(value) {
			this.samples.push(value);
			this.count++;
		}

		/**
		 * Clear bucket.
		 *
		 * @memberof Bucket
		 */
		clear() {
			this.count = 0;
			this.samples.length = 0;
		}
	}

	HistogramMetric.Bucket = Bucket;
	HistogramMetric.TimeWindowQuantiles = TimeWindowQuantiles;

	var histogram = HistogramMetric;

	const { pick: pick$1 } = ___default['default'];



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
			this.type = constants$1.TYPE_INFO;
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
					labels: pick$1(labels, this.labelNames),
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

	const { BrokerOptionsError } = errors;

	const Types = {
		Base: base,
		Counter: counter,
		Gauge: gauge,
		Histogram: histogram,
		Info: info,
	};

	/**
	 * Get MetricType class by name.
	 *
	 * @param {String} name
	 * @returns
	 */
	function getByName(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Types).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Types[n];
	}

	/**
	 * Resolve metric type by name
	 *
	 * @param {string} type
	 * @returns {BaseMetric}
	 * @memberof ServiceBroker
	 */
	function resolve(type) {
		const TypeClass = getByName(type);
		if (!TypeClass)
			throw new BrokerOptionsError(`Invalid metric type '${type}'.`, { type });

		return TypeClass;
	}

	function register(name, value) {
		Types[name] = value;
	}

	var types = Object.assign(Types, { resolve, register });

	const { match, isString } = utils_1;

	/**
	 * Metric reporter base class.
	 *
	 * @class BaseReporter
	 */
	class BaseReporter {

		/**
		 * Creates an instance of BaseReporter.
		 *
		 * @param {Object} opts
		 * @memberof BaseReporter
		 */
		constructor(opts) {
			this.opts = ___default['default'].defaultsDeep(opts, {
				includes: null,
				excludes: null,

				metricNamePrefix: null,
				metricNameSuffix: null,

				metricNameFormatter: null,
				labelNameFormatter: null,
			});

			if (isString(this.opts.includes))
				this.opts.includes = [this.opts.includes];

			if (isString(this.opts.excludes))
				this.opts.excludes = [this.opts.excludes];
		}

		/**
		 * Initialize reporter
		 *
		 * @param {MetricRegistry} registry
		 * @memberof BaseReporter
		 */
		init(registry) {
			this.registry = registry;
			this.broker = this.registry.broker;
			this.logger = this.registry.logger;
		}

		/**
		 * Stop reporter
		 *
		 * @memberof BaseReporter
		 */
		stop() {
			return Promise.resolve();
		}

		/**
		 * Match the metric name. Check the `includes` & `excludes` patterns.
		 *
		 * @param {String} name
		 * @returns {boolean}
		 * @memberof BaseReporter
		 */
		matchMetricName(name) {
			if (Array.isArray(this.opts.includes)) {
				if (!this.opts.includes.some(pattern => match(name, pattern)))
					return false;
			}

			if (Array.isArray(this.opts.excludes)) {
				if (!this.opts.excludes.every(pattern => !match(name, pattern)))
					return false;
			}

			return true;
		}

		/**
		 * Format metric name. Add prefix, suffix and call custom formatter.
		 *
		 * @param {String} name
		 * @returns {String}
		 * @memberof BaseReporter
		 */
		formatMetricName(name) {
			name = (this.opts.metricNamePrefix ? this.opts.metricNamePrefix : "") + name + (this.opts.metricNameSuffix ? this.opts.metricNameSuffix : "");
			if (this.opts.metricNameFormatter)
				return this.opts.metricNameFormatter(name);
			return name;
		}

		/**
		 * Format label name. Call custom formatter.
		 *
		 * @param {String} name
		 * @returns {String}
		 * @memberof BaseReporter
		 */
		formatLabelName(name) {
			if (this.opts.labelNameFormatter)
				return this.opts.labelNameFormatter(name);
			return name;
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
		metricChanged(/*metric, value, labels, timestamp*/) {
			// Not implemented. Abstract method
		}
	}

	var base$1 = BaseReporter;

	const { isFunction } = utils_1;

	/**
	 * Console reporter for Moleculer Metrics
	 *
	 * @class ConsoleReporter
	 * @extends {BaseReporter}
	 */
	class ConsoleReporter extends base$1 {

		/**
		 * Creates an instance of ConsoleReporter.
		 * @param {Object} opts
		 * @memberof ConsoleReporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				interval: 5,
				logger: null,
				colors: true,
				onlyChanges: true,
			});

			if (!this.opts.colors)
				kleur__default['default'].enabled = false;

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
				this.timer = timersBrowserify.setInterval(() => this.print(), this.opts.interval * 1000);
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
				return kleur__default['default'].gray("{}");

			return kleur__default['default'].gray("{") + keys.map(key => `${kleur__default['default'].gray(this.formatLabelName(key))}: ${kleur__default['default'].magenta("" + labels[key])}`).join(", ") + kleur__default['default'].gray("}");
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

			this.log(kleur__default['default'].gray(`------------------- [ METRICS START (${list.length}) ] -------------------`));

			list.forEach(metric => {
				this.log(kleur__default['default'].cyan().bold(this.formatMetricName(metric.name)) + " " + kleur__default['default'].gray("(" + metric.type + ")"));
				if (metric.values.size == 0) {
					this.log(kleur__default['default'].gray("  <no values>"));
				} else {
					const unit = metric.unit ? kleur__default['default'].gray(this.registry.pluralizeUnit(metric.unit)) : "";
					metric.values.forEach(item => {
						let val;
						const labelStr = this.labelsToStr(item.labels);
						switch(metric.type) {
							case constants$1.TYPE_COUNTER:
							case constants$1.TYPE_GAUGE:
							case constants$1.TYPE_INFO:
								val = item.value === "" ? kleur__default['default'].grey("<empty string>") : kleur__default['default'].green().bold(item.value);
								if (item.rate != null) {
									/*const s = [];
									Object.keys(item.rates).forEach(b => {
										s.push(`Rate${b}: ${item.rates[b] != null ? item.rates[b].toFixed(2) : "-"}`);
									});

									val = kleur.green().bold(`Value: ${val} | ` + s.join(" | "));
									*/

									val = val + kleur__default['default'].grey(" | Rate: ") + (item.rate != null ? kleur__default['default'].green().bold(item.rate.toFixed(2)) : "-");
								}

								break;
							case constants$1.TYPE_HISTOGRAM: {
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

								val = kleur__default['default'].green().bold(s.join(" | "));
								break;
							}
						}
						this.log(`  ${labelStr}: ${val} ${unit}`);
					});
				}
				this.log("");
			});

			this.log(kleur__default['default'].gray(`-------------------- [ METRICS END (${list.length}) ] --------------------`));

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

	var console$1 = ConsoleReporter;

	var require$$19 = false;

	/**
	 * Event reporter for Moleculer Metrics
	 *
	 * @class EventReporter
	 * @extends {BaseReporter}
	 */
	class EventReporter extends base$1 {

		/**
		 * Creates an instance of EventReporter.
		 * @param {Object} opts
		 * @memberof EventReporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				eventName: "$metrics.snapshot",

				broadcast: false,
				groups: null,

				onlyChanges: false,

				interval: 5,
			});

			this.lastChanges = new Set();
		}

		/**
		 * Initialize reporter.
		 *
		 * @param {MetricRegistry} registry
		 * @memberof EventReporter
		 */
		init(registry) {
			super.init(registry);

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.sendEvent(), this.opts.interval * 1000);
				this.timer.unref();
			}
		}

		/**
		 * Send metrics snapshot via event.
		 *
		 * @memberof EventReporter
		 */
		sendEvent() {
			let list = this.registry.list({
				includes: this.opts.includes,
				excludes: this.opts.excludes,
			});

			if (this.opts.onlyChanges)
				list = list.filter(metric => this.lastChanges.has(metric.name));

			if (list.length == 0)
				return;

			if (this.opts.broadcast) {
				this.logger.debug(`Send metrics.snapshot (${list.length} metrics) broadcast events.`);
				this.broker.broadcast(this.opts.eventName, list, { groups: this.opts.groups });
			} else {
				this.logger.debug(`Send metrics.snapshot (${list.length} metrics) events.`);
				this.broker.emit(this.opts.eventName, list, { groups: this.opts.groups });
			}

			this.lastChanges.clear();
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

	var event = EventReporter;

	const { isObject, isString: isString$1 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$1 } = errors;

	const Reporters = {
		Base: base$1,
		Console: console$1,
		CSV: require$$19,
		Event: event,
		Datadog: require$$19,
		Prometheus: require$$19,
		StatsD: require$$19,
	};

	function getByName$1(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Reporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Reporters[n];
	}

	/**
	 * Resolve reporter by name
	 *
	 * @param {object|string} opt
	 * @returns {Reporter}
	 * @memberof ServiceBroker
	 */
	function resolve$1(opt) {
		if (opt instanceof Reporters.Base) {
			return opt;
		} else if (isString$1(opt)) {
			let ReporterClass = getByName$1(opt);
			if (ReporterClass)
				return new ReporterClass();

		} else if (isObject(opt)) {
			let ReporterClass = getByName$1(opt.type);
			if (ReporterClass)
				return new ReporterClass(opt.options);
			else
				throw new BrokerOptionsError$1(`Invalid metric reporter type '${opt.type}'.`, { type: opt.type });
		}

		throw new BrokerOptionsError$1(`Invalid metric reporter type '${opt}'.`, { type: opt });
	}

	function register$1(name, value) {
		Reporters[name] = value;
	}

	var reporters = Object.assign(Reporters, { resolve: resolve$1, register: register$1 });

	/**
	 * CPU usage measure.
	 *
	 * Based on: https://github.com/icebob/cpu
	 */


	/* istanbul ignore next */
	var cpuUsage = function getCpuUsage(sampleTime = 100) {
		return new Promise((resolve, reject) => {
			try {
				const first = os.cpus().map(cpu => cpu.times);
				timersBrowserify.setTimeout(() => {
					try {
						const second = os.cpus().map(cpu => cpu.times);
						timersBrowserify.setTimeout(() => {
							try {
								const third = os.cpus().map(cpu => cpu.times);

								const usages = [];
								for (let i = 0; i < first.length; i++) {
									const first_idle = first[i].idle;
									const first_total = first[i].idle + first[i].user + first[i].nice + first[i].sys + first[i].irq;
									const second_idle = second[i].idle;
									const second_total = second[i].idle + second[i].user + second[i].nice + second[i].sys + second[i].irq;
									const third_idle = third[i].idle;
									const third_total = third[i].idle + third[i].user + third[i].nice + third[i].sys + third[i].irq;
									const first_usage = 1 - (second_idle - first_idle) / (second_total - first_total);
									const second_usage = 1 - (third_idle - second_idle) / (third_total - second_total);
									const per_usage = (first_usage + second_usage) / 2 * 100;
									usages.push(per_usage);
								}

								resolve({
									avg: usages.reduce((a, b) => a + b, 0) / usages.length,
									usages
								});
							} catch (err) {
								reject(err);
							}
						}, sampleTime);
					} catch (err) {
						reject(err);
					}
				}, sampleTime);
			} catch (err) {
				reject(err);
			}
		});
	};

	let v8, eventLoop;

	// Load `v8` module for heap metrics.
	try {
		v8 = require$$19;
	} catch (e) {
		// silent
	}

	/**
	 * Register common OS, process & Moleculer metrics.
	 */
	function registerCommonMetrics() {
		this.logger.debug("Registering common metrics...");

		// --- METRICS SELF METRICS ---

		// this.register({ name: METRIC.MOLECULER_METRICS_COMMON_COLLECT_TOTAL, type: METRIC.TYPE_COUNTER, description: "Number of metric collections" });
		// this.register({ name: METRIC.MOLECULER_METRICS_COMMON_COLLECT_TIME, type: METRIC.TYPE_GAUGE, description: "Time of collecting metrics", unit: METRIC.UNIT_MILLISECONDS });

		// --- PROCESS METRICS ---

		const item = this.register({ name: constants$1.PROCESS_ARGUMENTS, type: constants$1.TYPE_INFO, labelNames: ["index"], description: "Process arguments" });
		proc.argv.map((arg, index) => item.set(arg, { index }));

		this.register({ name: constants$1.PROCESS_PID, type: constants$1.TYPE_INFO, description: "Process PID" }).set(proc.pid);
		this.register({ name: constants$1.PROCESS_PPID, type: constants$1.TYPE_INFO, description: "Process parent PID" }).set(proc.ppid);

		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SIZE_USED, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process used heap size" });
		this.register({ name: constants$1.PROCESS_MEMORY_RSS, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process RSS size" });
		this.register({ name: constants$1.PROCESS_MEMORY_EXTERNAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process external memory size" });

		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, labelNames: ["space"], unit: constants$1.UNIT_BYTE, description: "Process total heap space size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED, type: constants$1.TYPE_GAUGE, labelNames: ["space"], unit: constants$1.UNIT_BYTE, description: "Process used heap space size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE, type: constants$1.TYPE_GAUGE, labelNames: ["space"], unit: constants$1.UNIT_BYTE, description: "Process available heap space size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL, type: constants$1.TYPE_GAUGE, labelNames: ["space"], unit: constants$1.UNIT_BYTE, description: "Process physical heap space size" });

		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat executable size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat physical size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat available size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat used size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat size limit" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Process heap stat mallocated size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "Peak of process heap stat mallocated size" });
		this.register({ name: constants$1.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE, type: constants$1.TYPE_GAUGE, description: "Process heap stat zap garbage" });

		this.register({ name: constants$1.PROCESS_UPTIME, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_SECONDS, description: "Process uptime" });
		this.register({ name: constants$1.PROCESS_INTERNAL_ACTIVE_HANDLES, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_HANDLE, description: "Number of active process handlers" });
		this.register({ name: constants$1.PROCESS_INTERNAL_ACTIVE_REQUESTS, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_REQUEST, description: "Number of active process requests" });

		this.register({ name: constants$1.PROCESS_VERSIONS_NODE, type: constants$1.TYPE_INFO, description: "Node version" }).set(proc.versions.node);

		// --- OS METRICS ---

		this.register({ name: constants$1.OS_MEMORY_FREE, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "OS free memory size" });
		this.register({ name: constants$1.OS_MEMORY_USED, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "OS used memory size" });
		this.register({ name: constants$1.OS_MEMORY_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_BYTE, description: "OS total memory size" });
		this.register({ name: constants$1.OS_UPTIME, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_SECONDS, description: "OS uptime" });
		this.register({ name: constants$1.OS_TYPE, type: constants$1.TYPE_INFO, description: "OS type" }).set(os.type());
		this.register({ name: constants$1.OS_RELEASE, type: constants$1.TYPE_INFO, description: "OS release" }).set(os.release());
		this.register({ name: constants$1.OS_HOSTNAME, type: constants$1.TYPE_INFO, description: "Hostname" }).set(os.hostname());
		this.register({ name: constants$1.OS_ARCH, type: constants$1.TYPE_INFO, description: "OS architecture" }).set(os.arch());
		this.register({ name: constants$1.OS_PLATFORM, type: constants$1.TYPE_INFO, description: "OS platform" }).set(os.platform());

		const userInfo = getUserInfo();
		this.register({ name: constants$1.OS_USER_UID, type: constants$1.TYPE_INFO, description: "UID" }).set(userInfo.uid);
		this.register({ name: constants$1.OS_USER_GID, type: constants$1.TYPE_INFO, description: "GID" }).set(userInfo.gid);
		this.register({ name: constants$1.OS_USER_USERNAME, type: constants$1.TYPE_INFO, description: "Username" }).set(userInfo.username);
		this.register({ name: constants$1.OS_USER_HOMEDIR, type: constants$1.TYPE_INFO, description: "User's home directory" }).set(userInfo.homedir);

		this.register({ name: constants$1.OS_NETWORK_ADDRESS, type: constants$1.TYPE_INFO, labelNames: ["interface", "family"], description: "Network address" });
		this.register({ name: constants$1.OS_NETWORK_MAC, type: constants$1.TYPE_INFO, labelNames: ["interface", "family"], description: "MAC address" });

		this.register({ name: constants$1.OS_DATETIME_UNIX, type: constants$1.TYPE_GAUGE, description: "Current datetime in Unix format" });
		this.register({ name: constants$1.OS_DATETIME_ISO, type: constants$1.TYPE_INFO, description: "Current datetime in ISO string" });
		this.register({ name: constants$1.OS_DATETIME_UTC, type: constants$1.TYPE_INFO, description: "Current UTC datetime" });
		this.register({ name: constants$1.OS_DATETIME_TZ_OFFSET, type: constants$1.TYPE_GAUGE, description: "Timezone offset" });

		this.register({ name: constants$1.OS_CPU_LOAD_1, type: constants$1.TYPE_GAUGE, description: "CPU load1" });
		this.register({ name: constants$1.OS_CPU_LOAD_5, type: constants$1.TYPE_GAUGE, description: "CPU load5" });
		this.register({ name: constants$1.OS_CPU_LOAD_15, type: constants$1.TYPE_GAUGE, description: "CPU load15" });
		this.register({ name: constants$1.OS_CPU_UTILIZATION, type: constants$1.TYPE_GAUGE, description: "CPU utilization" });

		this.register({ name: constants$1.OS_CPU_USER, type: constants$1.TYPE_GAUGE, description: "CPU user time" });
		this.register({ name: constants$1.OS_CPU_SYSTEM, type: constants$1.TYPE_GAUGE, description: "CPU system time" });

		this.register({ name: constants$1.OS_CPU_TOTAL, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_CPU, description: "Number of CPUs" });
		this.register({ name: constants$1.OS_CPU_INFO_MODEL, type: constants$1.TYPE_INFO, labelNames: ["index"], description: "CPU model" });
		this.register({ name: constants$1.OS_CPU_INFO_SPEED, type: constants$1.TYPE_GAUGE, labelNames: ["index"], unit: constants$1.UNIT_GHZ, description: "CPU speed" });
		this.register({ name: constants$1.OS_CPU_INFO_TIMES_USER, type: constants$1.TYPE_GAUGE, labelNames: ["index"], description: "CPU user time" });
		this.register({ name: constants$1.OS_CPU_INFO_TIMES_SYS, type: constants$1.TYPE_GAUGE, labelNames: ["index"], description: "CPU system time" });

		startGCWatcher.call(this);
		startEventLoopStats.call(this);

		this.logger.debug(`Registered ${this.store.size} common metrics.`);
	}

	/**
	 * Start GC watcher listener.
	 */
	function startGCWatcher() {
	// Load `gc-stats` module for GC metrics.
		try {
			const gc = (require$$19)();

			/* istanbul ignore next */
			if (gc) {
				// --- GARBAGE COLLECTOR METRICS ---

				this.register({ name: constants$1.PROCESS_GC_TIME, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_NANOSECONDS, description: "GC time" });
				this.register({ name: constants$1.PROCESS_GC_TOTAL_TIME, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_MILLISECONDS, description: "Total time of GC" });
				this.register({ name: constants$1.PROCESS_GC_EXECUTED_TOTAL, type: constants$1.TYPE_GAUGE, labelNames: ["type"], unit: null, description: "Number of executed GC" });

				gc.on("stats", stats => {
					this.set(constants$1.PROCESS_GC_TIME, stats.pause);
					this.increment(constants$1.PROCESS_GC_TOTAL_TIME, null, stats.pause / 1e6);
					if (stats.gctype == 1)
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "scavenge" });
					if (stats.gctype == 2)
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "marksweep" });
					if (stats.gctype == 4)
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "incremental" });
					if (stats.gctype == 8)
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "weakphantom" });
					if (stats.gctype == 15) {
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "scavenge" });
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "marksweep" });
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "incremental" });
						this.increment(constants$1.PROCESS_GC_EXECUTED_TOTAL, { type: "weakphantom" });
					}
				});
			}
		} catch (e) {
			// silent
		}
	}

	function startEventLoopStats() {
		// Load `event-loop-stats` metric for Event-loop metrics.
		try {
			eventLoop = require$$19;
			if (eventLoop) {
				this.register({ name: constants$1.PROCESS_EVENTLOOP_LAG_MIN, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_MILLISECONDS, description: "Minimum of event loop lag" });
				this.register({ name: constants$1.PROCESS_EVENTLOOP_LAG_AVG, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_MILLISECONDS, description: "Average of event loop lag" });
				this.register({ name: constants$1.PROCESS_EVENTLOOP_LAG_MAX, type: constants$1.TYPE_GAUGE, unit: constants$1.UNIT_MILLISECONDS, description: "Maximum of event loop lag" });
				this.register({ name: constants$1.PROCESS_EVENTLOOP_LAG_COUNT, type: constants$1.TYPE_GAUGE, description: "Number of event loop lag samples." });
			}
		} catch (e) {
			// silent
		}
	}

	/**
	 * Update common metric values.
	 *
	 * @returns {Promise}
	 */
	function updateCommonMetrics() {
		this.logger.debug("Update common metric values...");
		const end = this.timer();

		// --- PROCESS METRICS ---

		const procMem = proc.memoryUsage();

		this.set(constants$1.PROCESS_MEMORY_HEAP_SIZE_TOTAL, procMem.heapTotal);
		this.set(constants$1.PROCESS_MEMORY_HEAP_SIZE_USED, procMem.heapUsed);
		this.set(constants$1.PROCESS_MEMORY_RSS, procMem.rss);
		this.set(constants$1.PROCESS_MEMORY_EXTERNAL, procMem.external);

		if (v8 && v8.getHeapSpaceStatistics) {
			const stat = v8.getHeapSpaceStatistics();
			stat.forEach(item => {
				const space = item.space_name;
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL, item.space_size, { space });
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED, item.space_used_size, { space });
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE, item.space_available_size, { space });
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL, item.physical_space_size, { space });
			});
		}

		if (v8 && v8.getHeapStatistics) {
			const stat = v8.getHeapStatistics();
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL, stat.total_heap_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL, stat.total_heap_size_executable);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL, stat.total_physical_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL, stat.total_available_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE, stat.used_heap_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT, stat.heap_size_limit);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY, stat.malloced_memory);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY, stat.peak_malloced_memory);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE, stat.does_zap_garbage);
		}

		this.set(constants$1.PROCESS_UPTIME, proc.uptime());
		this.set(constants$1.PROCESS_INTERNAL_ACTIVE_HANDLES, proc._getActiveHandles().length);
		this.set(constants$1.PROCESS_INTERNAL_ACTIVE_REQUESTS, proc._getActiveRequests().length);

		// --- OS METRICS ---

		const freeMem = os.freemem();
		const totalMem = os.totalmem();
		const usedMem = totalMem - freeMem;
		this.set(constants$1.OS_MEMORY_FREE, freeMem);
		this.set(constants$1.OS_MEMORY_USED, usedMem);
		this.set(constants$1.OS_MEMORY_TOTAL, totalMem);
		this.set(constants$1.OS_UPTIME, os.uptime());
		this.set(constants$1.OS_TYPE, os.type());
		this.set(constants$1.OS_RELEASE, os.release());
		this.set(constants$1.OS_HOSTNAME, os.hostname());
		this.set(constants$1.OS_ARCH, os.arch());
		this.set(constants$1.OS_PLATFORM, os.platform());

		// --- NETWORK INTERFACES ---


		const getNetworkInterfaces = () =>{
			const list = [];
			const ilist = [];
			const interfaces = os.networkInterfaces();
			for (let iface in interfaces) {
				for (let i in interfaces[iface]) {
					const f = interfaces[iface][i];
					if (f.internal) {
						ilist.push({ f,iface });
					} else {
						list.push({ f,iface });
					}
				}
			}
			return list.length > 0 ? list : ilist;
		};

		const interfaces = getNetworkInterfaces();
		for (let { f,iface } of interfaces) {
			this.set(constants$1.OS_NETWORK_ADDRESS, f.address, { interface: iface, family: f.family });
			this.set(constants$1.OS_NETWORK_MAC, f.mac, { interface: iface, family: f.family });
		}

		const d = new Date();
		this.set(constants$1.OS_DATETIME_UNIX, d.valueOf());
		this.set(constants$1.OS_DATETIME_ISO, d.toISOString());
		this.set(constants$1.OS_DATETIME_UTC, d.toUTCString());
		this.set(constants$1.OS_DATETIME_TZ_OFFSET, d.getTimezoneOffset());

		const load = os.loadavg();
		this.set(constants$1.OS_CPU_LOAD_1, load[0]);
		this.set(constants$1.OS_CPU_LOAD_5, load[1]);
		this.set(constants$1.OS_CPU_LOAD_15, load[2]);

		if (eventLoop && eventLoop.sense) {
			const stat = eventLoop.sense();
			this.set(constants$1.PROCESS_EVENTLOOP_LAG_MIN, stat.min);
			this.set(constants$1.PROCESS_EVENTLOOP_LAG_AVG, stat.num ? stat.sum / stat.num : 0);
			this.set(constants$1.PROCESS_EVENTLOOP_LAG_MAX, stat.max);
			this.set(constants$1.PROCESS_EVENTLOOP_LAG_COUNT, stat.num);
		}

		// this.increment(METRIC.MOLECULER_METRICS_COMMON_COLLECT_TOTAL);
		const duration = end();

		return this.broker.Promise.resolve()
			.then(() => cpuUsage().then(res => {
				this.set(constants$1.OS_CPU_UTILIZATION, res.avg);

				try {
					const cpus = os.cpus();
					this.set(constants$1.OS_CPU_TOTAL, cpus.length);
					this.set(constants$1.OS_CPU_USER, cpus.reduce((a,b) => a + b.times.user, 0));
					this.set(constants$1.OS_CPU_SYSTEM, cpus.reduce((a,b) => a + b.times.sys, 0));

					cpus.forEach((cpu, index) => {
						this.set(constants$1.OS_CPU_INFO_MODEL, cpu.model, { index });
						this.set(constants$1.OS_CPU_INFO_SPEED, cpu.speed, { index });
						this.set(constants$1.OS_CPU_INFO_TIMES_USER, cpu.times.user, { index });
						this.set(constants$1.OS_CPU_INFO_TIMES_SYS, cpu.times.sys, { index });
					});

				} catch(err) {
					// silent
				}
			}))
			.catch(() => {
				// silent this.logger.warn("Unable to collect CPU usage metrics.", err);
			})
			.then(() => {
				this.logger.debug(`Collected common metric values in ${duration.toFixed(3)} msec.`);
			});
	}

	/**
	 * Get OS user info (safe-mode)
	 *
	 * @returns
	 */
	function getUserInfo() {
		try {
			return os.userInfo();
		} catch (e) {
			/* istanbul ignore next */
			return {};
		}
	}

	/**
	 * Measure event loop lag.
	 *
	 * @returns {Promise<Number>}
	 *
	function measureEventLoopLag() {
		return new Promise(resolve => {
			const start = process.hrtime();
			setImmediate(() => {
				const delta = process.hrtime(start);
				resolve(delta[0] * 1e9 + delta[1]);
			});
		});
	}*/

	var commons = {
		registerCommonMetrics,
		updateCommonMetrics
	};

	const { match: match$1, isFunction: isFunction$1, isPlainObject: isPlainObject$1, isString: isString$2 } = utils_1;



	const { registerCommonMetrics: registerCommonMetrics$1, updateCommonMetrics: updateCommonMetrics$1 } = commons;

	const METRIC_NAME_REGEXP 	= /^[a-zA-Z_][a-zA-Z0-9-_:.]*$/;
	const METRIC_LABEL_REGEXP 	= /^[a-zA-Z_][a-zA-Z0-9-_.]*$/;

	/**
	 * Metric Registry class
	 */
	class MetricRegistry {

		/**
		 * Creates an instance of MetricRegistry.
		 *
		 * @param {ServiceBroker} broker
		 * @param {Object} opts
		 * @memberof MetricRegistry
		 */
		constructor(broker, opts) {
			this.broker = broker;
			this.logger = broker.getLogger("metrics");

			this.dirty = true;

			if (opts === true || opts === false)
				opts = { enabled: opts };

			this.opts = ___default['default'].defaultsDeep({}, opts, {
				enabled: true,
				collectProcessMetrics: proc.env.NODE_ENV !== "test",
				collectInterval: 5,

				reporter: false,

				defaultBuckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000], // in milliseconds
				defaultQuantiles: [0.5, 0.9, 0.95, 0.99, 0.999], // percentage
				defaultMaxAgeSeconds: 60,
				defaultAgeBuckets: 10,
				defaultAggregator: "sum"
			});

			this.store = new Map();

			if (this.opts.enabled)
				this.logger.info("Metrics: Enabled");
		}

		/**
		 * Initialize Registry.
		 */
		init() {
			if (this.opts.enabled) {

				// Create Reporter instances
				if (this.opts.reporter) {
					const reporters$1 = Array.isArray(this.opts.reporter) ? this.opts.reporter : [this.opts.reporter];

					this.reporter = ___default['default'].compact(reporters$1).map(r => {
						const reporter = reporters.resolve(r);
						reporter.init(this);
						return reporter;
					});

					const reporterNames = this.reporter.map(reporter => this.broker.getConstructorName(reporter));
					this.logger.info(`Metric reporter${reporterNames.length > 1 ? "s" : ""}: ${reporterNames.join(", ")}`);
				}

				// Start colllect timer
				if (this.opts.collectProcessMetrics) {
					this.collectTimer = timersBrowserify.setInterval(() => {
						updateCommonMetrics$1.call(this);
					}, this.opts.collectInterval * 1000);
					this.collectTimer.unref();

					registerCommonMetrics$1.call(this);
					updateCommonMetrics$1.call(this);
				}
			}
		}

		/**
		 * Stop Metric Registry
		 */
		stop() {
			if (this.collectTimer) {
				clearInterval(this.collectTimer);
			}

			if (this.reporter) {
				return this.broker.Promise.all(this.reporter.map(r => r.stop()));
			}
		}

		/**
		 * Check metric is enabled?
		 *
		 * @returns
		 * @memberof MetricRegistry
		 */
		isEnabled() {
			return this.opts.enabled;
		}

		/**
		 * Register a new metric.
		 *
		 * @param {Object} opts
		 * @returns {BaseMetric}
		 * @memberof MetricRegistry
		 */
		register(opts) {
			if (!isPlainObject$1(opts))
				throw new Error("Wrong argument. Must be an Object.");

			if (!opts.type)
				throw new Error("The metric 'type' property is mandatory.");

			if (!opts.name)
				throw new Error("The metric 'name' property is mandatory.");

			if (!METRIC_NAME_REGEXP.test(opts.name))
				throw new Error("The metric 'name' is not valid: " + opts.name);

			if (Array.isArray(opts.labelNames)) {
				opts.labelNames.forEach(name => {
					if (!METRIC_LABEL_REGEXP.test(name))
						throw new Error(`The '${opts.name}' metric label name is not valid: ${name}`);

				});
			}

			const MetricClass = types.resolve(opts.type);

			if (!this.opts.enabled)
				return null;

			const item = new MetricClass(opts, this);
			this.store.set(opts.name, item);
			return item;
		}

		/**
		 * Check a metric by name.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 * @memberof MetricRegistry
		 */
		hasMetric(name) {
			return this.store.has(name);
		}

		/**
		 * Get metric by name
		 *
		 * @param {String} name
		 * @returns {BaseMetric}
		 * @memberof MetricRegistry
		 */
		getMetric(name) {
			const item = this.store.get(name);
			if (!item)
				return null;

			return item;
		}

		/**
		 * Increment a metric value.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {number} [value=1]
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		increment(name, labels, value = 1, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			if (!isFunction$1(item.increment))
				throw new Error("Invalid metric type. Incrementing works only with counter & gauge metric types.");

			return item.increment(labels, value, timestamp);
		}

		/**
		 * Decrement a metric value.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {number} [value=1]
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		decrement(name, labels, value = 1, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			if (!isFunction$1(item.decrement))
				throw new Error("Invalid metric type. Decrementing works only with gauge metric type.");

			return item.decrement(labels, value, timestamp);
		}

		/**
		 * Set a metric value.
		 *
		 * @param {String} name
		 * @param {*} value
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		set(name, value, labels, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			if (!isFunction$1(item.set))
				throw new Error("Invalid metric type. Value setting works only with counter, gauge & info metric types.");

			return item.set(value, labels, timestamp);
		}

		/**
		 * Observe a metric.
		 *
		 * @param {String} name
		 * @param {Number} value
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		observe(name, value, labels, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			if (!isFunction$1(item.observe))
				throw new Error("Invalid metric type. Observing works only with histogram metric type.");

			return item.observe(value, labels, timestamp);
		}

		/**
		 * Reset metric values.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		reset(name, labels, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			item.reset(labels, timestamp);
		}

		/**
		 * Reset metric all values.
		 *
		 * @param {String} name
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		resetAll(name, timestamp) {
			if (!this.opts.enabled)
				return null;

			const item = this.getMetric(name);
			item.resetAll(timestamp);
		}

		/**
		 * Start a timer & observe the elapsed time.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns {Function} `end`˙function.
		 * @memberof MetricRegistry
		 */
		timer(name, labels, timestamp) {
			let item;
			if (name && this.opts.enabled) {
				item = this.getMetric(name);
				if (!isFunction$1(item.observe) && !isFunction$1(item.set)) {
					/* istanbul ignore next */
					throw new Error("Invalid metric type. Timing works only with histogram or gauge metric types");
				}
			}

			const start = proc.hrtime();
			return () => {
				const delta = proc.hrtime(start);
				const duration = (delta[0] + delta[1] / 1e9) * 1000;

				if (item) {
					if (item.type == constants$1.TYPE_HISTOGRAM)
						item.observe(duration, labels, timestamp);
					else if (item.type == constants$1.TYPE_GAUGE)
						item.set(duration, labels, timestamp);
				}

				return duration;
			};
		}

		/**
		 * Some metric has been changed.
		 *
		 * @param {BaseMetric} metric
		 * @param {any} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 *
		 * @memberof MetricRegistry
		 */
		changed(metric, value, labels, timestamp) {
			this.dirty = true;
			if (Array.isArray(this.reporter))
				this.reporter.forEach(reporter => reporter.metricChanged(metric, value, labels, timestamp));
		}

		/**
		 * List all registered metrics with labels & values.
		 *
		 * @param {Object?} opts
		 * @param {String|Array<String>|null} opts.types
		 * @param {String|Array<String>|null} opts.includes
		 * @param {String|Array<String>|null} opts.excludes
		 */
		list(opts) {
			const res = [];
			opts = opts || {};

			const types = opts.types != null ? (isString$2(opts.types) ? [opts.types] : opts.types) : null;
			const includes = opts.includes != null ? (isString$2(opts.includes) ? [opts.includes] : opts.includes) : null;
			const excludes = opts.excludes != null ? (isString$2(opts.excludes) ? [opts.excludes] : opts.excludes) : null;

			this.store.forEach(metric => {
				if (types && !types.some(type => metric.type == type))
					return;

				if (includes && !includes.some(pattern => match$1(metric.name, pattern)))
					return;

				if (excludes && !excludes.every(pattern => !match$1(metric.name, pattern)))
					return;

				res.push(metric.toObject());
			});

			return res;
		}


		/**
		 * Pluralize metric units.
		 *
		 * @param {String} unit
		 * @returns {String}
		 */
		pluralizeUnit(unit) {
			switch(unit) {
				case constants$1.UNIT_GHZ:
					return unit;
			}
			return unit + "s";
		}
	}

	var registry = MetricRegistry;

	var metrics = {
		METRIC: constants$1,

		MetricRegistry: registry,

		BaseMetric: base,
		CounterMetric: counter,
		GaugeMetric: gauge,
		HistrogramMetric: histogram,
		InfoMetric: info,

		Reporters: reporters
	};

	const { Packet: Packet$1 } 		= packets;


	const { Transform } 	= require$$0__default['default'];
	const { METRIC }		= metrics;

	/**
	 * Transit class
	 *
	 * @class Transit
	 */
	class Transit {

		/**
		 * Create an instance of Transit.
		 *
		 * @param {ServiceBroker} Broker instance
		 * @param {Transporter} Transporter instance
		 * @param {Object?} opts
		 *
		 * @memberof Transit
		 */
		constructor(broker, transporter, opts) {
			this.broker = broker;
			this.Promise = broker.Promise;
			this.logger = broker.getLogger("transit");
			this.nodeID = broker.nodeID;
			this.metrics = broker.metrics;
			this.instanceID = broker.instanceID;
			this.tx = transporter;
			this.opts = opts;
			this.discoverer = broker.registry.discoverer;

			this.pendingRequests = new Map();
			this.pendingReqStreams = new Map();
			this.pendingResStreams = new Map();

			/* deprecated */
			this.stat = {
				packets: {
					sent: {
						count: 0,
						bytes: 0
					},
					received: {
						count: 0,
						bytes: 0
					}
				}
			};

			this.connected = false;
			this.disconnecting = false;
			this.isReady = false;

			const wrappedMessageHandler = (cmd, packet) => this.messageHandler(cmd, packet);

			this.publish = this.broker.wrapMethod("transitPublish", this.publish, this);
			this.messageHandler = this.broker.wrapMethod("transitMessageHandler", this.messageHandler, this);


			if (this.tx) {
				this.tx.init(this, wrappedMessageHandler, this.afterConnect.bind(this));

				this.tx.send = this.broker.wrapMethod("transporterSend", this.tx.send, this.tx);
				this.tx.receive = this.broker.wrapMethod("transporterReceive", this.tx.receive, this.tx, { reverse: true });
			}

			this.__connectResolve = null;

			this.registerMoleculerMetrics();
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics.register({ name: METRIC.MOLECULER_TRANSIT_READY, type: METRIC.TYPE_GAUGE, description: "Transit is ready" }).set(0);
			this.metrics.register({ name: METRIC.MOLECULER_TRANSIT_CONNECTED, type: METRIC.TYPE_GAUGE, description: "Transit is connected" }).set(0);

			this.metrics.register({ name: METRIC.MOLECULER_TRANSIT_PONG_TIME, type: METRIC.TYPE_GAUGE, labelNames: ["targetNodeID"], description: "Ping time" });
			this.metrics.register({ name: METRIC.MOLECULER_TRANSIT_PONG_SYSTIME_DIFF, type: METRIC.TYPE_GAUGE, labelNames: ["targetNodeID"], description: "System time difference between nodes" });

			this.metrics.register({ name: METRIC.MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL, type: METRIC.TYPE_COUNTER, description: "Number of orphan responses" });
		}

		/**
		 * It will be called after transporter connected or reconnected.
		 *
		 * @param {any} wasReconnect
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		afterConnect(wasReconnect) {
			return this.Promise.resolve()

				.then(() => {
					if (wasReconnect) {
						// After reconnecting, we should send a broadcast INFO packet because there may new nodes.
						// In case of disabled balancer, it triggers the `makeBalancedSubscriptions` method.
						return this.discoverer.sendLocalNodeInfo();
					} else {
						// After connecting we should subscribe to topics
						return this.makeSubscriptions();
					}
				})

				.then(() => this.discoverer.discoverAllNodes())
				.delay(500) // Waiting for incoming INFO packets

				.then(() => {
					this.connected = true;
					this.metrics.set(METRIC.MOLECULER_TRANSIT_CONNECTED, 1);

					this.broker.broadcastLocal("$transporter.connected", { wasReconnect: !!wasReconnect });

					if (this.__connectResolve) {
						this.__connectResolve();
						this.__connectResolve = null;
					}

					return null;
				});
		}

		/**
		 * Connect with transporter. If failed, try again after 5 sec.
		 *
		 * @memberof Transit
		 */
		connect() {
			this.logger.info("Connecting to the transporter...");
			return new this.Promise(resolve => {
				this.__connectResolve = resolve;

				const doConnect = () => {
					let reconnectStarted = false;

					/* istanbul ignore next */
					const errorHandler = (err) => {
						if (this.disconnecting) return;
						if (reconnectStarted) return;

						this.logger.warn("Connection is failed.", err && err.message || "Unknown error");
						this.logger.debug(err);

						if (this.opts.disableReconnect) {
							return;
						}

						reconnectStarted = true;

						timersBrowserify.setTimeout(() => {
							this.logger.info("Reconnecting...");
							doConnect();
						}, 5 * 1000);
					};
					/* istanbul ignore next */
					this.tx.connect(errorHandler).catch(errorHandler);
				};

				doConnect();

			});
		}

		/**
		 * Disconnect with transporter
		 *
		 * @memberof Transit
		 */
		disconnect() {
			this.connected = false;
			this.isReady = false;
			this.disconnecting = true;
			this.metrics.set(METRIC.MOLECULER_TRANSIT_CONNECTED, 0);

			this.broker.broadcastLocal("$transporter.disconnected", { graceFul: true });

			return this.Promise.resolve()
				.then(() => {
					if (this.tx.connected) {
						return this.discoverer.localNodeDisconnected()
							.then(() => this.tx.disconnect());
					}
				})
				.then(() => this.disconnecting = false);
		}

		/**
		 * Local broker is ready (all services loaded).
		 * Send INFO packet to all other nodes
		 */
		ready() {
			if (this.connected) {
				this.isReady = true;
				this.metrics.set(METRIC.MOLECULER_TRANSIT_READY, 1);
				return this.discoverer.localNodeReady();
			}
		}

		/**
		 * Send DISCONNECT to remote nodes
		 *
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		sendDisconnectPacket() {
			return this.publish(new Packet$1(packets.PACKET_DISCONNECT)).catch(/* istanbul ignore next */ err => this.logger.debug("Unable to send DISCONNECT packet.", err));
		}

		/**
		 * Subscribe to topics for transportation
		 *
		 * @memberof Transit
		 */
		makeSubscriptions() {
			this.subscribing = this.tx.makeSubscriptions([

				// Subscribe to broadcast events
				{ cmd: packets.PACKET_EVENT, nodeID: this.nodeID },

				// Subscribe to requests
				{ cmd: packets.PACKET_REQUEST, nodeID: this.nodeID },

				// Subscribe to node responses of requests
				{ cmd: packets.PACKET_RESPONSE, nodeID: this.nodeID },

				// Discover handler
				{ cmd: packets.PACKET_DISCOVER },
				{ cmd: packets.PACKET_DISCOVER, nodeID: this.nodeID },

				// NodeInfo handler
				{ cmd: packets.PACKET_INFO }, // Broadcasted INFO. If a new node connected
				{ cmd: packets.PACKET_INFO, nodeID: this.nodeID }, // Response INFO to DISCOVER packet

				// Disconnect handler
				{ cmd: packets.PACKET_DISCONNECT },

				// Heartbeat handler
				{ cmd: packets.PACKET_HEARTBEAT },

				// Ping handler
				{ cmd: packets.PACKET_PING }, // Broadcasted
				{ cmd: packets.PACKET_PING, nodeID: this.nodeID }, // Targeted

				// Pong handler
				{ cmd: packets.PACKET_PONG, nodeID: this.nodeID }

			]).then(() => {
				this.subscribing = null;
			});

			return this.subscribing;
		}

		/**
		 * Message handler for incoming packets
		 *
		 * @param {Array} topic
		 * @param {String} msg
		 * @returns {Boolean} If packet is processed return with `true`
		 *
		 * @memberof Transit
		 */
		messageHandler(cmd, packet) {
			try {
				const payload = packet.payload;

				// Check payload
				if (!payload) {
					/* istanbul ignore next */
					throw new errors.MoleculerServerError("Missing response payload.", 500, "MISSING_PAYLOAD");
				}

				// Check protocol version
				if (payload.ver !== this.broker.PROTOCOL_VERSION && !this.opts.disableVersionCheck) {
					throw new errors.ProtocolVersionMismatchError({
						nodeID: payload.sender,
						actual: this.broker.PROTOCOL_VERSION,
						received: payload.ver
					});
				}

				if (payload.sender === this.nodeID) {

					// Detect nodeID conflict
					if (cmd === packets.PACKET_INFO && payload.instanceID !== this.instanceID) {
						return this.broker.fatal("ServiceBroker has detected a nodeID conflict, use unique nodeIDs. ServiceBroker stopped.");
					}

					// Skip own packets (if only built-in balancer disabled)
					if (cmd !== packets.PACKET_EVENT && cmd !== packets.PACKET_REQUEST && cmd !== packets.PACKET_RESPONSE)
						return;
				}

				// Request
				if (cmd === packets.PACKET_REQUEST) {
					return this.requestHandler(payload);
				}

				// Response
				else if (cmd === packets.PACKET_RESPONSE) {
					this.responseHandler(payload);
				}

				// Event
				else if (cmd === packets.PACKET_EVENT) {
					this.eventHandler(payload);
				}

				// Discover
				else if (cmd === packets.PACKET_DISCOVER) {
					this.discoverer.sendLocalNodeInfo(payload.sender);
				}

				// Node info
				else if (cmd === packets.PACKET_INFO) {
					this.discoverer.processRemoteNodeInfo(payload.sender, payload);
				}

				// Disconnect
				else if (cmd === packets.PACKET_DISCONNECT) {
					this.discoverer.remoteNodeDisconnected(payload.sender, false);
				}

				// Heartbeat
				else if (cmd === packets.PACKET_HEARTBEAT) {
					this.discoverer.heartbeatReceived(payload.sender, payload);
				}

				// Ping
				else if (cmd === packets.PACKET_PING) {
					this.sendPong(payload);
				}

				// Pong
				else if (cmd === packets.PACKET_PONG) {
					this.processPong(payload);
				}

				return true;
			} catch (err) {
				this.logger.error(err, cmd, packet);
			}
			return false;
		}

		/**
		 * Handle incoming event
		 *
		 * @param {any} payload
		 * @memberof Transit
		 */
		eventHandler(payload) {
			this.logger.debug(`Event '${payload.event}' received from '${payload.sender}' node` + (payload.groups ? ` in '${payload.groups.join(", ")}' group(s)` : "") + ".");

			if (!this.broker.started) {
				this.logger.warn(`Incoming '${payload.event}' event from '${payload.sender}' node is dropped, because broker is stopped.`);
				return;
			}

			// Create caller context
			const ctx = new this.broker.ContextFactory(this.broker);
			ctx.id = payload.id;
			ctx.eventName = payload.event;
			ctx.setParams(payload.data, this.broker.options.contextParamsCloning);
			ctx.eventGroups = payload.groups;
			ctx.eventType = payload.broadcast ? "broadcast" : "emit";
			ctx.meta = payload.meta || {};
			ctx.level = payload.level;
			ctx.tracing = !!payload.tracing;
			ctx.parentID = payload.parentID;
			ctx.requestID = payload.requestID;
			ctx.caller = payload.caller;
			ctx.nodeID = payload.sender;

			this.broker.emitLocalServices(ctx);
		}

		/**
		 * Handle incoming request
		 *
		 * @param {Object} payload
		 *
		 * @memberof Transit
		 */
		requestHandler(payload) {
			this.logger.debug(`<= Request '${payload.action}' received from '${payload.sender}' node.`);

			try {
				if (!this.broker.started) {
					this.logger.warn(`Incoming '${payload.action}' request from '${payload.sender}' node is dropped because broker is stopped.`);
					throw new errors.ServiceNotAvailableError({ action: payload.action, nodeID: this.nodeID });
				}

				let pass;
				if (payload.stream !== undefined) {
					pass = this._handleIncomingRequestStream(payload);
					if (pass === null) // eslint-disable-line security/detect-possible-timing-attacks
						return this.Promise.resolve();
				}

				const endpoint = this.broker._getLocalActionEndpoint(payload.action);

				// Recreate caller context
				const ctx = new this.broker.ContextFactory(this.broker);
				ctx.setEndpoint(endpoint);
				ctx.id = payload.id;
				ctx.setParams(pass ? pass : payload.params, this.broker.options.contextParamsCloning);
				ctx.parentID = payload.parentID;
				ctx.requestID = payload.requestID;
				ctx.caller = payload.caller;
				ctx.meta = payload.meta || {};
				ctx.level = payload.level;
				ctx.tracing = payload.tracing;
				ctx.nodeID = payload.sender;

				if (payload.timeout != null)
					ctx.options.timeout = payload.timeout;

				const p = endpoint.action.handler(ctx);
				// Pointer to Context
				p.ctx = ctx;

				return p
					.then(res => this.sendResponse(payload.sender, payload.id, ctx.meta, res, null))
					.catch(err => this.sendResponse(payload.sender, payload.id, ctx.meta, null, err));

			} catch (err) {
				return this.sendResponse(payload.sender, payload.id, payload.meta, null, err);
			}
		}

		/**
		 * Handle incoming request stream.
		 *
		 * @param {Object} payload
		 * @returns {Stream}
		 */
		_handleIncomingRequestStream(payload) {
			let pass = this.pendingReqStreams.get(payload.id);
			let isNew = false;

			if (!payload.stream && !pass) {
				// It is not a stream data
				return false;
			}

			if (!pass) {
				isNew = true;
				this.logger.debug(`<= New stream is received from '${payload.sender}'. Seq: ${payload.seq}`);

				// Create a new pass stream
				pass = new Transform({
					objectMode: payload.meta && payload.meta["$streamObjectMode"],
					transform: function(chunk, encoding, done) {
						this.push(chunk);
						return done();
					}
				});

				pass.$prevSeq = -1;
				pass.$pool = new Map();

				this.pendingReqStreams.set(payload.id, pass);
			}

			if (payload.seq > pass.$prevSeq + 1) {
				// Some chunks are late. Store these chunks.
				this.logger.info(`Put the chunk into pool (size: ${pass.$pool.size}). Seq: ${payload.seq}`);

				pass.$pool.set(payload.seq, payload);

				// TODO: start timer.
				// TODO: check length of pool.
				// TODO: reset seq

				return isNew ? pass : null;
			}

			// the next stream chunk received
			pass.$prevSeq = payload.seq;

			if (pass.$prevSeq > 0) {
				if (!payload.stream) {

					// Check stream error
					if (payload.meta && payload.meta["$streamError"]) {
						pass.emit("error", this._createErrFromPayload(payload.meta["$streamError"], payload.sender));
					}

					this.logger.debug(`<= Stream closing is received from '${payload.sender}'. Seq: ${payload.seq}`);

					// End of stream
					pass.end();

					// Remove pending request stream
					this.pendingReqStreams.delete(payload.id);

					return null;

				} else {
					this.logger.debug(`<= Stream chunk is received from '${payload.sender}'. Seq: ${payload.seq}`);
					pass.write(payload.params.type === "Buffer" ? buffer.Buffer.from(payload.params.data) : payload.params);
				}
			}

			// Check newer chunks in the pool
			if (pass.$pool.size > 0) {
				this.logger.warn(`Has stored packets. Size: ${pass.$pool.size}`);
				const nextSeq = pass.$prevSeq + 1;
				const nextPacket = pass.$pool.get(nextSeq);
				if (nextPacket) {
					pass.$pool.delete(nextSeq);
					setImmediate(() => this.requestHandler(nextPacket));
				}
			}

			return isNew ? pass : null;
		}

		/**
		 * Create an Error instance from payload ata
		 * @param {Object} error
		 * @param {String} sender
		 */
		_createErrFromPayload(error, sender) {
			let err = errors.recreateError(error);
			if (!err) {
				err = new Error(error.message);
				err.name = error.name;
				err.code = error.code;
				err.type = error.type;
				err.data = error.data;
			}
			err.retryable = error.retryable;
			err.nodeID = error.nodeID || sender;

			if (error.stack)
				err.stack = error.stack;

			return err;
		}

		/**
		 * Process incoming response of request
		 *
		 * @param {Object} packet
		 *
		 * @memberof Transit
		 */
		responseHandler(packet) {
			const id = packet.id;
			const req = this.pendingRequests.get(id);

			// If not exists (timed out), we skip response processing
			if (req == null) {
				this.logger.debug("Orphan response is received. Maybe the request is timed out earlier. ID:", packet.id, ", Sender:", packet.sender);
				this.metrics.increment(METRIC.MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL);
				return;
			}

			this.logger.debug(`<= Response '${req.action.name}' is received from '${packet.sender}'.`);

			// Update nodeID in context (if it uses external balancer)
			req.ctx.nodeID = packet.sender;

			// Merge response meta with original meta
			Object.assign(req.ctx.meta || {}, packet.meta || {});

			// Handle stream response
			if (packet.stream != null) {
				if (this._handleIncomingResponseStream(packet, req))
					return;
			}

			// Remove pending request
			this.removePendingRequest(id);

			if (!packet.success) {
				req.reject(this._createErrFromPayload(packet.error, packet.sender));
			} else {
				req.resolve(packet.data);
			}
		}

		/**
		 * Handle incoming response stream.
		 *
		 * @param {Object} packet
		 * @param {Object} req
		 */
		_handleIncomingResponseStream(packet, req) {
			let pass = this.pendingResStreams.get(packet.id);
			if (!pass && !packet.stream)
				return false;

			if (!pass) {
				this.logger.debug(`<= New stream is received from '${packet.sender}'. Seq: ${packet.seq}`);

				pass = new Transform({
					objectMode: packet.meta && packet.meta["$streamObjectMode"],
					transform: function(chunk, encoding, done) {
						this.push(chunk);
						return done();
					}
				});

				pass.$prevSeq = -1;
				pass.$pool = new Map();

				this.pendingResStreams.set(packet.id, pass);

				req.resolve(pass);
			}

			if (packet.seq > pass.$prevSeq + 1) {
				// Some chunks are late. Store these chunks.
				this.logger.info(`Put the chunk into pool (size: ${pass.$pool.size}). Seq: ${packet.seq}`);

				pass.$pool.set(packet.seq, packet);

				// TODO: start timer.
				// TODO: check length of pool.
				// TODO: resetting seq.

				return true;
			}

			// the next stream chunk received
			pass.$prevSeq = packet.seq;

			if (pass.$prevSeq > 0) {

				if (!packet.stream) {
					// Received error?
					if (!packet.success)
						pass.emit("error", this._createErrFromPayload(packet.error, packet.sender));

					this.logger.debug(`<= Stream closing is received from '${packet.sender}'. Seq: ${packet.seq}`);

					// End of stream
					pass.end();

					// Remove pending request
					this.removePendingRequest(packet.id);

					return true;

				} else {
					// stream chunk
					this.logger.debug(`<= Stream chunk is received from '${packet.sender}'. Seq: ${packet.seq}`);
					pass.write(packet.data.type === "Buffer" ? buffer.Buffer.from(packet.data.data):packet.data);
				}
			}

			// Check newer chunks in the pool
			if (pass.$pool.size > 0) {
				this.logger.warn(`Has stored packets. Size: ${pass.$pool.size}`);
				const nextSeq = pass.$prevSeq + 1;
				const nextPacket = pass.$pool.get(nextSeq);
				if (nextPacket) {
					pass.$pool.delete(nextSeq);
					setImmediate(() => this.responseHandler(nextPacket));
				}
			}

			return true;
		}


		/**
		 * Send a request to a remote service. It returns a Promise
		 * what will be resolved when the response received.
		 *
		 * @param {<Context>} ctx Context of request
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		request(ctx) {
			if (this.opts.maxQueueSize && this.pendingRequests.size >= this.opts.maxQueueSize)
				/* istanbul ignore next */
				return this.Promise.reject(new errors.QueueIsFullError({
					action: ctx.action.name,
					nodeID: this.nodeID,
					size: this.pendingRequests.size,
					limit: this.opts.maxQueueSize
				}));

			// Expanded the code that v8 can optimize it.  (TryCatchStatement disable optimizing)
			return new this.Promise((resolve, reject) => this._sendRequest(ctx, resolve, reject));
		}

		/**
		 * Send a remote request
		 *
		 * @param {<Context>} ctx      Context of request
		 * @param {Function} resolve   Resolve of Promise
		 * @param {Function} reject    Reject of Promise
		 *
		 * @memberof Transit
		 */
		_sendRequest(ctx, resolve, reject) {
			const isStream = ctx.params && ctx.params.readable === true && typeof ctx.params.on === "function" && typeof ctx.params.pipe === "function";

			const request = {
				action: ctx.action,
				nodeID: ctx.nodeID,
				ctx,
				resolve,
				reject,
				stream: isStream // ???
			};

			const payload = {
				id: ctx.id,
				action: ctx.action.name,
				params: isStream ? null : ctx.params,
				meta: ctx.meta,
				timeout: ctx.options.timeout,
				level: ctx.level,
				tracing: ctx.tracing,
				parentID: ctx.parentID,
				requestID: ctx.requestID,
				caller: ctx.caller,
				stream: isStream,
			};

			if (payload.stream) {
				if (ctx.params.readableObjectMode === true || (ctx.params._readableState && ctx.params._readableState.objectMode === true)) {
					payload.meta = payload.meta || {};
					payload.meta["$streamObjectMode"] = true;
				}
				payload.seq = 0;
			}

			const packet = new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, payload);

			const nodeName = ctx.nodeID ? `'${ctx.nodeID}'` : "someone";
			this.logger.debug(`=> Send '${ctx.action.name}' request to ${nodeName} node.`);

			const publishCatch = /* istanbul ignore next */ err => this.logger.error(`Unable to send '${ctx.action.name}' request to ${nodeName} node.`, err);

			// Add to pendings
			this.pendingRequests.set(ctx.id, request);

			// Publish request
			return this.publish(packet)
				.then(() => {
					if (isStream) {
						// Skip to send ctx.meta with chunks because it doesn't appear on the remote side.
						payload.meta = {};
						// Still send information about objectMode in case of packets are received in wrong order
						if (ctx.params.readableObjectMode === true || (ctx.params._readableState && ctx.params._readableState.objectMode === true)) {
							payload.meta["$streamObjectMode"] = true;
						}

						const stream = ctx.params;
						stream.on("data", (chunk) => {
							stream.pause();
							const chunks = [];
							if (chunk instanceof buffer.Buffer && this.opts.maxChunkSize > 0 && chunk.length > this.opts.maxChunkSize) {
								let len = chunk.length;
								let i = 0;
								while (i < len) {
									chunks.push(chunk.slice(i, i += this.opts.maxChunkSize));
								}
							} else {
								chunks.push(chunk);
							}
							for (const ch of chunks) {
								const copy = Object.assign({}, payload);
								copy.seq = ++payload.seq;
								copy.stream = true;
								copy.params = ch;

								this.logger.debug(`=> Send stream chunk to ${nodeName} node. Seq: ${copy.seq}`);

								this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy))
									.catch(publishCatch);
							}
							stream.resume();
							return;
						});

						stream.on("end", () => {
							const copy = Object.assign({}, payload);
							copy.seq = ++payload.seq;
							copy.params = null;
							copy.stream = false;

							this.logger.debug(`=> Send stream closing to ${nodeName} node. Seq: ${copy.seq}`);

							return this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy))
								.catch(publishCatch);
						});

						stream.on("error", err => {
							const copy = Object.assign({}, payload);
							copy.seq = ++payload.seq;
							copy.stream = false;
							copy.meta["$streamError"] = this._createPayloadErrorField(err);
							copy.params = null;

							this.logger.debug(`=> Send stream error to ${nodeName} node.`, copy.meta["$streamError"]);

							return this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy))
								.catch(publishCatch);
						});
					}
				})
				.catch(err => {
					publishCatch(err);
					reject(err);
				});
		}

		/**
		 * Send an event to a remote node.
		 * The event is balanced by transporter
		 *
		 * @param {Context} ctx
		 *
		 * @memberof Transit
		 */
		sendEvent(ctx) {
			const groups = ctx.eventGroups;
			if (ctx.endpoint)
				this.logger.debug(`=> Send '${ctx.eventName}' event to '${ctx.nodeID}' node` + (groups ? ` in '${groups.join(", ")}' group(s)` : "") + ".");
			else
				this.logger.debug(`=> Send '${ctx.eventName}' event to '${groups.join(", ")}' group(s).`);

			return this.publish(new Packet$1(packets.PACKET_EVENT, ctx.endpoint ? ctx.nodeID : null, {
				id: ctx.id,
				event: ctx.eventName,
				data: ctx.params,
				groups,
				broadcast: ctx.eventType == "broadcast",
				meta: ctx.meta,
				level: ctx.level,
				tracing: ctx.tracing,
				parentID: ctx.parentID,
				requestID: ctx.requestID,
				caller: ctx.caller,
				needAck: ctx.needAck
			})).catch(/* istanbul ignore next */ err => this.logger.error(`Unable to send '${ctx.eventName}' event to groups.`, err));
		}

		/**
		 * Remove a pending request
		 *
		 * @param {any} id
		 *
		 * @memberof Transit
		 */
		removePendingRequest(id) {
			this.pendingRequests.delete(id);

			this.pendingReqStreams.delete(id);
			this.pendingResStreams.delete(id);
		}

		/**
		 * Remove a pending request & streams
		 *
		 * @param {String} nodeID
		 *
		 * @memberof Transit
		 */
		removePendingRequestByNodeID(nodeID) {
			this.logger.debug(`Remove pending requests of '${nodeID}' node.`);
			this.pendingRequests.forEach((req, id) => {
				if (req.nodeID === nodeID) {
					this.pendingRequests.delete(id);

					// Reject the request
					req.reject(new errors.RequestRejectedError({
						action: req.action.name,
						nodeID: req.nodeID
					}));

					this.pendingReqStreams.delete(id);
					this.pendingResStreams.delete(id);
				}
			});
		}

		/**
		 * Create error field in outgoing payload
		 *
		 * @param {Error} err
		 * @returns {Object}
		 * @memberof Transit
		 */
		_createPayloadErrorField(err) {
			return {
				name: err.name,
				message: err.message,
				nodeID: err.nodeID || this.nodeID,
				code: err.code,
				type: err.type,
				retryable: err.retryable,
				stack: err.stack,
				data: err.data
			};
		}

		/**
		 * Send back the response of request
		 *
		 * @param {String} nodeID
		 * @param {String} id
		 * @param {any} meta
		 * @param {any} data
		 * @param {Error} err
		 *
		 * @memberof Transit
		 */
		sendResponse(nodeID, id, meta, data, err) {
			// Publish the response
			const payload = {
				id: id,
				meta: meta,
				success: err == null,
				data: data
			};

			if (err)
				payload.error = this._createPayloadErrorField(err);

			const publishCatch = /* istanbul ignore next */ err => this.logger.error(`Unable to send '${id}' response to '${nodeID}' node.`, err);

			if (data && data.readable === true && typeof data.on === "function" && typeof data.pipe === "function") {
				// Streaming response
				payload.stream = true;
				if (data.readableObjectMode === true || (data._readableState && data._readableState.objectMode === true)) {
					payload.meta = payload.meta || {};
					payload.meta["$streamObjectMode"] = true;
				}
				payload.seq = 0;

				const stream = data;
				stream.pause();

				stream.on("data", (chunk) => {
					stream.pause();
					const chunks = [];
					if (chunk instanceof buffer.Buffer && this.opts.maxChunkSize > 0 && chunk.length > this.opts.maxChunkSize) {
						let len = chunk.length;
						let i = 0;
						while (i < len) {
							chunks.push(chunk.slice(i, i += this.opts.maxChunkSize));
						}
					} else {
						chunks.push(chunk);
					}
					for (const ch of chunks) {
						const copy = Object.assign({}, payload);
						copy.seq = ++payload.seq;
						copy.stream = true;
						copy.data = ch;

						this.logger.debug(`=> Send stream chunk to ${nodeID} node. Seq: ${copy.seq}`);

						this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy))
							.catch(publishCatch);
					}
					stream.resume();
					return;
				});

				stream.on("end", () => {
					const copy = Object.assign({}, payload);
					copy.stream = false;
					copy.seq = ++payload.seq;
					copy.data = null;

					this.logger.debug(`=> Send stream closing to ${nodeID} node. Seq: ${copy.seq}`);

					return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy))
						.catch(publishCatch);
				});

				stream.on("error", err => {
					const copy = Object.assign({}, payload);
					copy.stream = false;
					copy.seq = ++payload.seq;
					if (err) {
						copy.success = false;
						copy.error = this._createPayloadErrorField(err);
					}

					this.logger.debug(`=> Send stream error to ${nodeID} node.`, copy.error);

					return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy))
						.catch(publishCatch);
				});

				payload.data = null;
				return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, payload))
					.then(() => {
						if (payload.stream)
							stream.resume();
					})
					.catch(publishCatch);

			}

			return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, payload))
				.catch(publishCatch);
		}

		/**
		 * Discover other nodes. It will be called after success connect.
		 *
		 * @memberof Transit
		 */
		discoverNodes() {
			return this.publish(new Packet$1(packets.PACKET_DISCOVER))
				.catch(/* istanbul ignore next */ err => this.logger.error("Unable to send DISCOVER packet.", err));
		}

		/**
		 * Discover a node. It will be called if we got message from an unknown node.
		 *
		 * @memberof Transit
		 */
		discoverNode(nodeID) {
			return this.publish(new Packet$1(packets.PACKET_DISCOVER, nodeID))
				.catch(/* istanbul ignore next */ err => this.logger.error(`Unable to send DISCOVER packet to '${nodeID}' node.`, err));
		}

		/**
		 * Send node info package to other nodes.
		 *
		 * @memberof Transit
		 */
		sendNodeInfo(info, nodeID) {
			if (!this.connected || !this.isReady) return this.Promise.resolve();

			const p = !nodeID && this.broker.options.disableBalancer ? this.tx.makeBalancedSubscriptions() : this.Promise.resolve();
			return p.then(() => this.publish(new Packet$1(packets.PACKET_INFO, nodeID, {
				services: info.services,
				ipList: info.ipList,
				hostname: info.hostname,
				client: info.client,
				config: info.config,
				instanceID: this.broker.instanceID,
				metadata: info.metadata,
				seq: info.seq
			}))).catch(/* istanbul ignore next */ err => this.logger.error(`Unable to send INFO packet to '${nodeID}' node.`, err));

		}

		/**
		 * Send ping to a node (or all nodes if nodeID is null)
		 *
		 * @param {String} nodeID
		 * @param {String} id
		 * @returns
		 * @memberof Transit
		 */
		sendPing(nodeID, id) {
			return this.publish(new Packet$1(packets.PACKET_PING, nodeID, { time: Date.now(), id: id || this.broker.generateUid() }))
				.catch(/* istanbul ignore next */ err => this.logger.error(`Unable to send PING packet to '${nodeID}' node.`, err));
		}

		/**
		 * Send back pong response
		 *
		 * @param {Object} payload
		 * @returns
		 * @memberof Transit
		 */
		sendPong(payload) {
			return this.publish(new Packet$1(packets.PACKET_PONG, payload.sender, {
				time: payload.time,
				id: payload.id,
				arrived: Date.now()
			})).catch(/* istanbul ignore next */ err => this.logger.error(`Unable to send PONG packet to '${payload.sender}' node.`, err));
		}

		/**
		 * Process incoming PONG packet.
		 * Measure ping time & current time difference.
		 *
		 * @param {Object} payload
		 * @memberof Transit
		 */
		processPong(payload) {
			const now = Date.now();
			const elapsedTime = now - payload.time;
			const timeDiff = Math.round(now - payload.arrived - elapsedTime / 2);

			// this.logger.debug(`PING-PONG from '${payload.sender}' - Time: ${elapsedTime}ms, Time difference: ${timeDiff}ms`);

			this.broker.broadcastLocal("$node.pong", { nodeID: payload.sender, elapsedTime, timeDiff, id: payload.id });

			this.metrics.set(METRIC.MOLECULER_TRANSIT_PONG_TIME, elapsedTime, { targetNodeID: payload.sender });
			this.metrics.set(METRIC.MOLECULER_TRANSIT_PONG_SYSTIME_DIFF, timeDiff, { targetNodeID: payload.sender });
		}

		/**
		 * Send a node heartbeat. It will be called with timer from local Discoverer.
		 *
		 * @params {Node} localNode
		 * @memberof Transit
		 */
		sendHeartbeat(localNode) {
			return this.publish(new Packet$1(packets.PACKET_HEARTBEAT, null, {
				cpu: localNode.cpu
			})).catch(/* istanbul ignore next */ err => this.logger.error("Unable to send HEARTBEAT packet.", err));

		}

		/**
		 * Subscribe via transporter
		 *
		 * @param {String} topic
		 * @param {String=} nodeID
		 *
		 * @deprecated
		 * @memberof Transit
		 */
		subscribe(topic, nodeID) {
			return this.tx.subscribe(topic, nodeID);
		}

		/**
		 * Publish via transporter
		 *
		 * @param {Packet} Packet
		 *
		 * @memberof Transit
		 */
		publish(packet) {
			if (this.subscribing) {
				return this.subscribing
					.then(() => {
						return this.tx.prepublish(packet);
					});
			}
			return this.tx.prepublish(packet);
		}

	}

	var transit = Transit;

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Base strategy class
	 *
	 * @class BaseStrategy
	 */
	class BaseStrategy {

		/**
		 * Constructor
		 *
		 * @param {ServiceRegistry} registry
		 * @param {ServiceBroker} broker
		 * @param {Object?} opts
		 */
		constructor(registry, broker, opts) {
			this.registry = registry;
			this.broker = broker;
			this.opts = opts || {};
		}

		/**
		 * Select an endpoint.
		 *
		 * @param {Array<Endpoint>} list
		 * @param {Context?} ctx
		 *
		 * @memberof BaseStrategy
		 */
		select(/*list, ctx*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

	}

	var base$2 = BaseStrategy;

	/**
	 * Round-robin strategy class
	 *
	 * @class RoundRobinStrategy
	 */
	class RoundRobinStrategy extends base$2 {

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

	const { random } = ___default['default'];


	/**
	 * Random strategy class
	 *
	 * @class RandomStrategy
	 */
	class RandomStrategy extends base$2 {
		select(list) {
			return list[random(0, list.length - 1)];
		}
	}

	var random_1 = RandomStrategy;

	const { random: random$1 } = ___default['default'];


	/**
	 * Lowest latency invocation strategy
	 *
	 * Since Strategy can be instantiated multiple times, therefore,
	 * we need to have a "master" instance to send ping, and each
	 * individual "slave" instance will update their list dynamically
	 *
	 * These options can be configured in broker registry options:
	 *
	 * const broker = new ServiceBroker({
	 * 	logger: true,
	 * 	registry: {
	 * 		strategy: "LatencyStrategy",
	 * 		strategyOptions: {
	 * 			sampleCount: 5,
	 * 			lowLatency: 10,
	 * 			collectCount: 5,
	 * 			pingInterval: 10
	 * 		}
	 * 	}
	 * });
	 *
	 * @class LatencyStrategy
	 */
	class LatencyStrategy extends base$2 {

		constructor(registry, broker, opts) {
			super(registry, broker, opts);

			this.opts = ___default['default'].defaultsDeep(opts, {
				sampleCount: 5,
				lowLatency: 10,
				collectCount: 5,
				pingInterval: 10
			});

			this.brokerStopped = false;

			this.hostAvgLatency = new Map();

			/* hostMap contains:
				hostname => {
					historicLatency: [],
					nodeList: []
				}
			*/
			this.hostMap = new Map();

			// short circuit
			if (!this.broker.transit) return;

			if (this.broker.localBus.listenerCount("$node.latencyMaster") === 0) {
				// claim as master
				this.broker.localBus.on("$node.latencyMaster", function() {});
				// respond to PONG
				this.broker.localBus.on("$node.pong", this.processPong.bind(this));
				// dynamically add new node
				this.broker.localBus.on("$node.connected", this.addNode.bind(this));
				// dynamically remove node
				this.broker.localBus.on("$node.disconnected", this.removeHostMap.bind(this));
				// try to discovery all nodes on start up
				this.broker.localBus.on("$broker.started", this.discovery.bind(this));
				// clean up ourselves
				this.broker.localBus.on("$broker.stopped", () => this.brokerStopped = true);
			} else {
				// remove node if we are told by master
				this.broker.localBus.on("$node.latencySlave.removeHost", this.removeHostLatency.bind(this));
			}

			this.broker.localBus.on("$node.latencySlave", this.updateLatency.bind(this));
		}

		// Master
		discovery() {
			return this.broker.transit.sendPing().then(() => {
				const timer = timersBrowserify.setTimeout(() => this.pingHosts(), 1000 * this.opts.pingInterval);
				timer.unref();
			});
		}

		// Master
		pingHosts() {

			/* istanbul ignore next */
			if (this.brokerStopped) return;
			/*
				Smart Ping: only ping the host, not the nodes (which may be many)

				Although, if that particular node on the host is overloaded,
				the measurement may be skewed.
			*/
			const hosts = Array.from(this.hostMap.values());

			return this.broker.Promise.all(hosts.map(host => { // TODO: missing concurency: 5, here was bluebird Promise.map
				// Select a nodeID randomly
				const nodeID = host.nodeList[random$1(0, host.nodeList.length - 1)];
				return this.broker.transit.sendPing(nodeID);
			})).then(() => {
				const timer = timersBrowserify.setTimeout(() => this.pingHosts(), 1000 * this.opts.pingInterval);
				timer.unref();
			});
		}

		// Master
		processPong(payload) {
			let node = this.registry.nodes.get(payload.nodeID);

			/* istanbul ignore next */
			if (!node) return;

			let info = this.getHostLatency(node);

			if (info.historicLatency.length > (this.opts.collectCount - 1))
				info.historicLatency.shift();

			info.historicLatency.push(payload.elapsedTime);

			const avgLatency = info.historicLatency.reduce((sum, latency) => sum + latency, 0) / info.historicLatency.length;

			this.broker.localBus.emit("$node.latencySlave", {
				hostname: node.hostname,
				avgLatency: avgLatency
			});
		}

		// Master
		getHostLatency(node) {
			let info = this.hostMap.get(node.hostname);
			if (typeof info === "undefined") {
				info = {
					historicLatency: [],
					nodeList: [ node.id ]
				};
				this.hostMap.set(node.hostname, info);
			}
			return info;
		}

		// Master
		addNode(payload) {
			let node = payload.node;

			// each host may have multiple nodes
			let info = this.getHostLatency(node);
			if (info.nodeList.indexOf(node.id) === -1) {
				info.nodeList.push(node.id);
			}
		}

		// Master
		removeHostMap(payload) {
			let node = payload.node;

			let info = this.hostMap.get(node.hostname);
			// This exists to make sure that we don't get an "undefined",
			// 	therefore the test coverage here is unnecessary.
			/* istanbul ignore next */
			if (typeof info === "undefined") return;

			info.nodeList = info.nodeList.filter(id => id !== node.id);

			if (info.nodeList.length == 0) {
				// only remove the host if the last node disconnected
				this.broker.localBus.emit("$node.latencySlave.removeHost", node.hostname);
				this.hostMap.delete(node.hostname);
			}
		}

		// Master + Slave
		updateLatency(payload) {
			this.hostAvgLatency.set(payload.hostname, payload.avgLatency);
		}

		// Slave
		removeHostLatency(hostname) {
			this.hostAvgLatency.delete(hostname);
		}

		/**
		 * Select an endpoint by network latency
		 *
		 * @param {Array<Endpoint>} list
		 * @returns {Endpoint}
		 * @memberof LatencyStrategy
		 */
		select(list) {
			let minEp = null;
			let minLatency = null;

			const sampleCount = this.opts.sampleCount;
			const count = sampleCount <= 0 || sampleCount > list.length ? list.length : sampleCount;
			for (let i = 0; i < count; i++) {
				let ep;
				// Get random endpoint
				if (count == list.length) {
					ep = list[i];
				} else {
					/* istanbul ignore next */
					ep = list[random$1(0, list.length - 1)];
				}
				const epLatency = this.hostAvgLatency.get(ep.node.hostname);

				// Check latency of endpoint
				if (typeof epLatency !== "undefined") {

					if (epLatency < this.opts.lowLatency)
						return ep;

					if (!minEp || !minLatency || epLatency < minLatency) {
						minLatency = epLatency;
						minEp = ep;
					}
				}
			}

			// Return the lowest latency
			if (minEp) {
				return minEp;
			}

			// Return a random item (no latency data)
			return list[random$1(0, list.length - 1)];
		}
	}

	var latency = LatencyStrategy;

	const { isFunction: isFunction$2 } = utils_1;

	/**
	 * Sharding invocation strategy
	 *
	 * Using consistent-hashing. More info: https://www.toptal.com/big-data/consistent-hashing
	 *
	 * @class ShardStrategy
	 */
	class ShardStrategy extends base$2 {

		constructor(registry, broker, opts) {
			super(registry, broker, opts);

			this.opts = ___default['default'].defaultsDeep(opts, {
				shardKey: null,
				vnodes: 10,
				ringSize: null,
				cacheSize: 1000
			});

			this.cache = new LRU__default['default']({
				max: this.opts.cacheSize,
				maxAge: null
			});

			this.needRebuild = true;
			this.ring = [];

			broker.localBus.on("$node.**", () => this.needRebuild = true);
		}

		/**
		 * Get key field value from Context.
		 *
		 * @param {Context} ctx
		 * @returns {any}
		 * @memberof ShardStrategy
		 */
		getKeyFromContext(ctx) {
			if (!this.opts.shardKey)  return null;

			if (isFunction$2(this.opts.shardKey))
				return this.opts.shardKey.call(this, ctx);

			if (this.opts.shardKey.startsWith("#"))
				return ___default['default'].get(ctx.meta, this.opts.shardKey.slice(1));

			return ___default['default'].get(ctx.params, this.opts.shardKey);
		}

		/**
		 * Select an endpoint by sharding.
		 *
		 * @param {Array<Endpoint>} list
		 * @param {Context} ctx
		 * @returns {Endpoint}
		 * @memberof ShardStrategy
		 */
		select(list, ctx) {
			let key = this.getKeyFromContext(ctx);
			if (key != null) {
				if (this.needRebuild)
					this.rebuild(list);

				const nodeID = this.getNodeIDByKey(key);
				if (nodeID)
					return list.find(ep => ep.id == nodeID);
			}

			// Return a random item (no key)
			return list[___default['default'].random(0, list.length - 1)];
		}

		/**
		 * Get nodeID by a hashed numeric key.
		 *
		 * @param {Number} key
		 * @returns {String}
		 * @memberof ShardStrategy
		 */
		getNodeIDByKey(key) {
			if (this.cache) {
				const cached = this.cache.get(key);
				if (cached) return cached;
			}

			const hashNum = this.getHash(key.toString());

			let found;
			const ringLen = this.ring.length;
			for(let i = 0; i < ringLen; i++) {
				if (hashNum <= this.ring[i].key) {
					found = this.ring[i];
					break;
				}
			}

			if (found) {
				if (this.cache)
					this.cache.set(key, found.nodeID);
				return found.nodeID;
			}
			return null;
		}

		/**
		 * Calculate 8 bit integer hash from string key based on MD5 hash.
		 *
		 * @param {String} key
		 * @returns {Number}
		 * @memberof ShardStrategy
		 */
		getHash(key) {
			const hash = crypto__default['default'].createHash("md5").update(key).digest("hex");
			const hashNum = parseInt(hash.substring(0,8), 16);
			return this.opts.ringSize ? hashNum % this.opts.ringSize : hashNum;
		}

		/**
		 * Rebuild the node hashring.
		 *
		 * @param {Array<Endpoint>} list
		 * @memberof ShardStrategy
		 */
		rebuild(list) {
			this.cache.reset();
			this.ring = [];

			const arr = list
				.map(ep => ep.id)
				.sort();

			const total = arr.length * this.opts.vnodes;
			const ringSize = this.opts.ringSize ? this.opts.ringSize : Math.pow(2, 32);
			const slice = ringSize / total;

			for (let j = 0; j < this.opts.vnodes; j++) {
				for (let i = 0; i < arr.length; i++) {
					const nodeID = arr[i];
					this.ring.push({
						key: Math.floor(slice * (this.ring.length + 1)),
						nodeID: nodeID
					});
				}
			}

			// Set the latest value to the last slice.
			this.ring[this.ring.length - 1].key = ringSize;

			this.needRebuild = false;
		}

	}

	var shard = ShardStrategy;

	const { isObject: isObject$1, isString: isString$3 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$2 } = errors;

	const Strategies = {
		Base: base$2,
		RoundRobin: roundRobin,
		Random: random_1,
		CpuUsage: getCpuUsage,
		Latency: latency,
		Shard: shard
	};

	function getByName$2(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Strategies).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Strategies[n];
	}

	/**
	 * Resolve strategy by name
	 *
	 * @param {object|string} opt
	 * @returns {Strategy}
	 * @memberof ServiceBroker
	 */
	function resolve$2(opt) {
		if (Object.prototype.isPrototypeOf.call(Strategies.Base, opt)) {
			return opt;
		} else if (isString$3(opt)) {
			let StrategyClass = getByName$2(opt);
			if (StrategyClass)
				return StrategyClass;
			else
				throw new BrokerOptionsError$2(`Invalid strategy type '${opt}'.`, { type: opt });

		} else if (isObject$1(opt)) {
			let StrategyClass = getByName$2(opt.type || "RoundRobin");
			if (StrategyClass)
				return StrategyClass;
			else
				throw new BrokerOptionsError$2(`Invalid strategy type '${opt.type}'.`, { type: opt.type });
		}

		return Strategies.RoundRobin;
	}


	function register$2(name, value) {
		Strategies[name] = value;
	}

	var strategies = Object.assign(Strategies, { resolve: resolve$2, register: register$2 });

	/**
	 * Abstract Discoverer class
	 *
	 * @class BaseDiscoverer
	 */
	class BaseDiscoverer {

		/**
		 * Creates an instance of Discoverer.
		 *
		 * @memberof BaseDiscoverer
		 */
		constructor(opts) {
			this.Promise = Promise; // while `init` is not called

			this.opts = ___default['default'].defaultsDeep({}, opts, {
				heartbeatInterval: null,
				heartbeatTimeout: null,

				disableHeartbeatChecks: false,
				disableOfflineNodeRemoving: false,
				cleanOfflineNodesTimeout: 10 * 60, // 10 minutes
			});

			// Timer variables
			this.heartbeatTimer = null;
			this.checkNodesTimer = null;
			this.offlineTimer = null;

			// Pointer for the local `Node` instance
			this.localNode = null;
		}

		/**
		 * Initialize Discoverer
		 *
		 * @param {ServiceRegistry} registry
		 */
		init(registry) {
			this.registry = registry;
			this.broker = registry.broker;
			this.Promise = this.broker.Promise;

			if (this.broker) {
				this.logger = this.broker.getLogger("Discovery");
				this.transit = this.broker.transit;

				// Get HB time settings from broker options. Backward compatibility
				if (this.opts.heartbeatInterval == null)
					this.opts.heartbeatInterval = this.broker.options.heartbeatInterval;
				if (this.opts.heartbeatTimeout == null)
					this.opts.heartbeatTimeout = this.broker.options.heartbeatTimeout;
			}

			if (this.transit) {
				this.broker.localBus.on("$transporter.connected", () => this.startHeartbeatTimers());
				this.broker.localBus.on("$transporter.disconnected", () => this.stopHeartbeatTimers());
			}

			this.localNode = this.registry.nodes.localNode;

			this.registerMoleculerMetrics();
		}

		/**
		 * Stop discoverer clients.
		 */
		stop() {
			this.stopHeartbeatTimers();
			return this.Promise.resolve();
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			// Not implemented
		}

		/**
		 * Start heartbeat timers
		 */
		startHeartbeatTimers() {
			this.stopHeartbeatTimers();

			if (this.opts.heartbeatInterval > 0) {
				// HB timer
				const time = this.opts.heartbeatInterval * 1000 + (Math.round(Math.random() * 1000) - 500); // random +/- 500ms
				this.heartbeatTimer = timersBrowserify.setInterval(() => this.beat(), time);
				this.heartbeatTimer.unref();

				// Check expired heartbeats of remote nodes timer
				this.checkNodesTimer = timersBrowserify.setInterval(() => this.checkRemoteNodes(), this.opts.heartbeatTimeout * 1000);
				this.checkNodesTimer.unref();

				// Clean offline nodes timer
				this.offlineTimer = timersBrowserify.setInterval(() => this.checkOfflineNodes(), 60 * 1000); // 1 min
				this.offlineTimer.unref();
			}
		}

		/**
		 * Stop heartbeat timers
		 */
		stopHeartbeatTimers() {
			if (this.heartbeatTimer) {
				clearInterval(this.heartbeatTimer);
				this.heartbeatTimer = null;
			}

			if (this.checkNodesTimer) {
				clearInterval(this.checkNodesTimer);
				this.checkNodesTimer = null;
			}

			if (this.offlineTimer) {
				clearInterval(this.offlineTimer);
				this.offlineTimer = null;
			}
		}

		/**
		 * Disable built-in Heartbeat logic. Used by TCP transporter
		 */
		disableHeartbeat() {
			this.opts.heartbeatInterval = 0;
			this.stopHeartbeatTimers();
		}

		/**
		 * Heartbeat method.
		 */
		beat() {
			// Update the local CPU usage before sending heartbeat.
			return this.localNode.updateLocalInfo(this.broker.getCpuUsage)
				.then(() => this.sendHeartbeat());
		}

		/**
		 * Check all registered remote nodes are available.
		 */
		checkRemoteNodes() {
			if (this.disableHeartbeatChecks) return;

			const now = Math.round(proc.uptime());
			this.registry.nodes.toArray().forEach(node => {
				if (node.local || !node.available) return;
				if (!node.lastHeartbeatTime) {
					// Még nem jött be az első heartbeat.
					node.lastHeartbeatTime = now;
					return;
				}

				if (now - node.lastHeartbeatTime > this.broker.options.heartbeatTimeout) {
					this.logger.warn(`Heartbeat is not received from '${node.id}' node.`);
					this.registry.nodes.disconnected(node.id, true);
				}
			});
		}

		/**
		 * Check offline nodes. Remove which is older than 10 minutes.
		 */
		checkOfflineNodes() {
			if (this.disableOfflineNodeRemoving || !this.opts.cleanOfflineNodesTimeout) return;

			const now = Math.round(proc.uptime());
			this.registry.nodes.toArray().forEach(node => {
				if (node.local || node.available) return;
				if (!node.lastHeartbeatTime) {
					// Még nem jött be az első heartbeat.
					node.lastHeartbeatTime = now;
					return;
				}

				if (now - node.lastHeartbeatTime > this.opts.cleanOfflineNodesTimeout) {
					this.logger.warn(`Removing offline '${node.id}' node from registry because it hasn't submitted heartbeat signal for 10 minutes.`);
					this.registry.nodes.delete(node.id);
				}
			});
		}

		/**
		 * Heartbeat received from a remote node.
		 *
		 * @param {String} nodeID
		 * @param {Object} payload
		 */
		heartbeatReceived(nodeID, payload) {
			const node = this.registry.nodes.get(nodeID);
			if (node) {
				if (!node.available) {
					// Reconnected node. Request a fresh INFO
					this.discoverNode(nodeID);
				} else {
					if (payload.seq != null && node.seq !== payload.seq) {
						// Some services changed on the remote node. Request a new INFO
						this.discoverNode(nodeID);
					} else if (payload.instanceID != null && !node.instanceID.startsWith(payload.instanceID)) {
						// The node has been restarted. Request a new INFO
						this.discoverNode(nodeID);
					} else {
						node.heartbeat(payload);
					}
				}
			} else {
				// Unknow node. Request an INFO
				this.discoverNode(nodeID);
			}
		}

		/**
		 * Received an INFO from a remote node.
		 *
		 * @param {String} nodeID
		 * @param {Object} payload
		 */
		processRemoteNodeInfo(nodeID, payload) {
			return this.broker.registry.processNodeInfo(payload);
		}

		/**
		 * Sending a local heartbeat to remote nodes.
		 */
		sendHeartbeat() {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.sendHeartbeat(this.localNode);
		}

		/**
		 * Discover a new or old node by nodeID
		 *
		 * @param {String} nodeID
		 */
		discoverNode() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Discover all nodes (after connected)
		 */
		discoverAllNodes() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Called when the local node is ready (transporter connected)
		 */
		localNodeReady() {
			// Local node has started all local services. We send a new INFO packet
			// which contains the local services because we are ready to accept incoming requests.
			return this.sendLocalNodeInfo();
		}

		/**
		 * Local service registry has been changed. We should notify remote nodes.
		 *
		 * @param {String} nodeID
		 */
		sendLocalNodeInfo() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Called when the local node disconnected.
		 * You can clean it from the remote registry.
		 */
		localNodeDisconnected() {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.sendDisconnectPacket();
		}

		/**
		 * Called when a remote node disconnected (received DISCONNECT packet)
		 * You can clean it from local registry.
		 *
		 * @param {String} nodeID
		 * @param {Boolean} isUnexpected
		 */
		remoteNodeDisconnected(nodeID, isUnexpected) {
			return this.registry.nodes.disconnected(nodeID, isUnexpected);
		}

	}

	var base$3 = BaseDiscoverer;

	/**
	 * Local (built-in) Discoverer class
	 *
	 * @class Discoverer
	 */
	class LocalDiscoverer extends base$3 {

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

	const { BrokerOptionsError: BrokerOptionsError$3 } = errors;
	const { isObject: isObject$2, isString: isString$4 } = utils_1;

	const Discoverers = {
		Base: base$3,
		Local: local,
		Etcd3: require$$19,
		Redis: require$$19
	};

	function getByName$3(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Discoverers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Discoverers[n];
	}

	/**
	 * Resolve discoverer by name
	 *
	 * @param {object|string} opt
	 * @returns {Discoverer}
	 * @memberof ServiceBroker
	 */
	function resolve$3(opt) {
		if (opt instanceof Discoverers.Base) {
			return opt;
		} else if (isString$4(opt)) {
			let DiscovererClass = getByName$3(opt);
			if (DiscovererClass)
				return new DiscovererClass();

			if (opt.startsWith("redis://"))
				return new Discoverers.Redis(opt);

			if (opt.startsWith("etcd3://"))
				return new Discoverers.Etcd3(opt);

			throw new BrokerOptionsError$3(`Invalid Discoverer type '${opt}'.`, { type: opt });

		} else if (isObject$2(opt)) {
			let DiscovererClass = getByName$3(opt.type || "Local");
			if (DiscovererClass)
				return new DiscovererClass(opt.options);
			else
				throw new BrokerOptionsError$3(`Invalid Discoverer type '${opt.type}'.`, { type: opt.type });
		}

		return new Discoverers.Local();
	}

	function register$3(name, value) {
		Discoverers[name] = value;
	}

	var discoverers = Object.assign(Discoverers, { resolve: resolve$3, register: register$3 });

	/**
	 * Node class
	 *
	 * @class Node
	 */
	class Node {
		/**
		 * Creates an instance of Node.
		 *
		 * @param {String} id
		 *
		 * @memberof Node
		 */
		constructor(id) {
			this.id = id;
			this.instanceID = null;
			this.available = true;
			this.local = false;
			this.lastHeartbeatTime = Math.round(proc.uptime());
			this.config = {};
			this.client = {};
			this.metadata = null;

			this.ipList = null;
			this.port = null;
			this.hostname = null;
			this.udpAddress = null;

			this.rawInfo = null;
			this.services = [];

			this.cpu = null;
			this.cpuSeq = null;

			this.seq = 0;
			this.offlineSince = null;
		}

		/**
		 * Update properties
		 *
		 * @param {object} payload
		 * @param {boolean} isReconnected
		 * @memberof Node
		 */
		update(payload, isReconnected) {
			// Update properties
			this.metadata = payload.metadata;
			this.ipList = payload.ipList;
			this.hostname = payload.hostname;
			this.port = payload.port;
			this.client = payload.client || {};
			this.config = payload.config || {};
			this.instanceID = payload.instanceID;

			// Process services & events
			this.services = payload.services;
			this.rawInfo = payload;

			const newSeq = payload.seq || 1;
			if (newSeq > this.seq || isReconnected) {
				this.seq = newSeq;
				return true;
			}
		}

		/**
		 * Update local properties.
		 *
		 * @memberof Node
		 * @param {Function} cpuUsage
		 */
		updateLocalInfo(cpuUsage) {
			return cpuUsage().then(res => {
				const newVal = Math.round(res.avg);
				if (this.cpu != newVal) {
					this.cpu = newVal;
					this.cpuSeq++;
				}
			}).catch(() => { /* silent */ });
		}

		/**
		 * Update heartbeat properties
		 *
		 * @param {any} payload
		 * @memberof Node
		 */
		heartbeat(payload) {
			if (!this.available) {
				this.available = true;
				this.offlineSince = null;
			}

			if (payload.cpu != null) {
				this.cpu = payload.cpu;
				this.cpuSeq = payload.cpuSeq || 1;
			}

			this.lastHeartbeatTime = Math.round(proc.uptime());
		}

		/**
		 * Node disconnected
		 *
		 * @memberof Node
		 */
		disconnected() {
			if (this.available) {
				this.offlineSince = Math.round(proc.uptime());
				this.seq++;
			}

			this.available = false;
		}
	}

	var node = Node;

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
					res.push(___default['default'].omit(node, ["rawInfo"]));
				else
					res.push(___default['default'].omit(node, ["services", "rawInfo"]));
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

	/*
	 * moleculer
	 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Service class
	 *
	 * @class ServiceItem
	 */
	class ServiceItem {

		/**
		 * Creates an instance of ServiceItem.
		 *
		 * @param {Node} node
		 * @param {Object} service
		 * @param {Boolean} local
		 * @memberof ServiceItem
		 */
		constructor(node, service, local) {
			this.node = node;
			this.name = service.name;
			this.fullName = service.fullName;
			this.version = service.version;
			this.settings = service.settings;
			this.metadata = service.metadata || {};

			this.local = !!local;

			this.actions = {};
			this.events = {};
		}

		/**
		 * Check the service equals params
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns
		 * @memberof ServiceItem
		 */
		equals(fullName, nodeID) {
			return this.fullName == fullName && (nodeID == null || this.node.id == nodeID);
		}

		/**
		 * Update service properties
		 *
		 * @param {any} svc
		 * @memberof ServiceItem
		 */
		update(svc) {
			this.fullName = svc.fullName;
			this.version = svc.version;
			this.settings = svc.settings;
			this.metadata = svc.metadata || {};
		}

		/**
		 * Add action to service
		 *
		 * @param {any} action
		 * @memberof ServiceItem
		 */
		addAction(action) {
			this.actions[action.name] = action;
		}

		/**
		 * Add event to service
		 *
		 * @param {any} event
		 * @memberof ServiceItem
		 */
		addEvent(event) {
			this.events[event.name] = event;
		}
	}

	var serviceItem = ServiceItem;

	const { removeFromArray } = utils_1;

	/**
	 * Catalog for services
	 *
	 * @class ServiceCatalog
	 */
	class ServiceCatalog {

		/**
		 * Creates an instance of ServiceCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @memberof ServiceCatalog
		 */
		constructor(registry, broker) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;

			this.services = [];
		}

		/**
		 * Add a new service
		 *
		 * @param {Node} node
		 * @param {Object} service
		 * @param {Boolean} local
		 *
		 * @returns {ServiceItem}
		 *
		 * @memberof ServiceCatalog
		 */
		add(node, service, local) {
			const item = new serviceItem(node, service, local);
			this.services.push(item);
			return item;
		}

		/**
		 * Check the service is exist
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns
		 * @memberof ServiceCatalog
		 */
		has(fullName, nodeID) {
			return this.services.find(svc => svc.equals(fullName, nodeID)) != null;
		}

		/**
		 * Get a service by fullName & nodeID
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns
		 * @memberof ServiceCatalog
		 */
		get(fullName, nodeID) {
			return this.services.find(svc => svc.equals(fullName, nodeID));
		}

		/**
		 * Get a filtered list of services with actions
		 *
		 * @param {Object} {onlyLocal = false,  onlyAvailable = false, skipInternal = false, withActions = false, withEvents = false, grouping = false}
		 * @returns {Array}
		 *
		 * @memberof Registry
		 */
		list({ onlyLocal = false, onlyAvailable = false, skipInternal = false, withActions = false, withEvents = false, grouping = false }) {
			let res = [];
			this.services.forEach(service => {
				if (skipInternal && /^\$/.test(service.name))
					return;

				if (onlyLocal && !service.local)
					return;

				if (onlyAvailable && !service.node.available)
					return;

				let item;
				if (grouping)
					item = res.find(svc => svc.fullName == service.fullName);

				if (!item) {
					let item = {
						name: service.name,
						version: service.version,
						fullName: service.fullName,
						settings: service.settings,
						metadata: service.metadata,

						local: service.local,
						available: service.node.available,
					};

					if (grouping)
						item.nodes = [service.node.id];
					else
						item.nodeID = service.node.id;

					if (withActions) {
						item.actions = {};

						___default['default'].forIn(service.actions, action => {
							if (action.protected) return;

							item.actions[action.name] = ___default['default'].omit(action, ["handler", "remoteHandler", "service"]);
						});
					}

					if (withEvents) {
						item.events = {};

						___default['default'].forIn(service.events, event => {
							// Skip internal event handlers
							if (/^\$/.test(event.name)) return;

							item.events[event.name] = ___default['default'].omit(event, ["handler", "remoteHandler", "service"]);
						});
					}

					res.push(item);

				} else {
					if (item.nodes.indexOf(service.node.id) === -1)
						item.nodes.push(service.node.id);
				}
			});

			return res;
		}

		/**
		 * Get local service list for INFO packet
		 *
		 * @returns {Object}
		 * @memberof ServiceCatalog
		 */
		getLocalNodeServices() {
			let res = [];
			this.services.forEach(service => {
				if (!service.local)
					return;

				let item = {
					name: service.name,
					version: service.version,
					fullName: service.fullName,
					settings: service.settings,
					metadata: service.metadata,
					dependencies: service.dependencies
				};

				item.actions = {};

				___default['default'].forIn(service.actions, action => {
					if (action.protected) return;

					item.actions[action.name] = ___default['default'].omit(action, ["handler", "remoteHandler", "service"]);
				});

				item.events = {};

				___default['default'].forIn(service.events, event => {
					// Leave internal event handlers, because it can be used for internal events.
					//if (/^\$/.test(event.name)) return;

					item.events[event.name] = ___default['default'].omit(event, ["handler", "remoteHandler", "service"]);
				});

				res.push(item);
			});

			return res;
		}

		/**
		 * Remove all endpoints by nodeID
		 *
		 * @param {String} nodeID
		 * @memberof ServiceCatalog
		 */
		removeAllByNodeID(nodeID) {
			___default['default'].remove(this.services, service => {
				if (service.node.id == nodeID) {
					this.registry.actions.removeByService(service);
					this.registry.events.removeByService(service);
					return true;
				}
			});
		}

		/**
		 * Remove endpoint by fullName & nodeID
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @memberof ServiceCatalog
		 */
		remove(fullName, nodeID) {
			let service = this.get(fullName, nodeID);
			if (service) {
				this.registry.actions.removeByService(service);
				this.registry.events.removeByService(service);

				removeFromArray(this.services, service);
			}
		}
	}

	var serviceCatalog = ServiceCatalog;

	const { MoleculerServerError } = errors;

	/**
	 * Endpoint list class
	 *
	 * @class EndpointList
	 */
	class EndpointList {

		/**
		 * Creates an instance of EndpointList.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {String} name
		 * @param {String} group
		 * @param {EndPointClass} EndPointFactory
		 * @param {StrategyClass} StrategyFactory
		 * @param {Object?} strategyOptions
		 * @memberof EndpointList
		 */
		constructor(registry, broker, name, group, EndPointFactory, StrategyFactory, strategyOptions) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			this.strategy = new StrategyFactory(registry, broker, strategyOptions);
			this.name = name;
			this.group = group;
			this.internal = name.startsWith("$");

			this.EndPointFactory = EndPointFactory;

			this.endpoints = [];

			this.localEndpoints = [];
		}

		/**
		 * Add a new endpoint
		 *
		 * @param {Node} node
		 * @param {Service} service
		 * @param {any} data
		 * @returns
		 * @memberof EndpointList
		 */
		add(node, service, data) {
			const found = this.endpoints.find(ep => ep.node == node && ep.service.name == service.name);
			if (found) {
				found.update(data);
				return found;
			}

			const ep = new this.EndPointFactory(this.registry, this.broker, node, service, data);
			this.endpoints.push(ep);

			this.setLocalEndpoints();

			return ep;
		}

		/**
		 * Get first endpoint
		 *
		 * @returns {Endpoint}
		 * @memberof EndpointList
		 */
		getFirst() {
			if (this.endpoints.length > 0)
				return this.endpoints[0];

			return null;
		}

		/**
		 * Select next endpoint with balancer strategy
		 *
		 * @param {Array<Endpoint>} list
		 * @param {Context} ctx
		 * @returns {Endpoint}
		 * @memberof EndpointList
		 */
		select(list, ctx) {
			const ret = this.strategy.select(list, ctx);
			if (!ret) {
				/* istanbul ignore next */
				throw new MoleculerServerError("Strategy returned an invalid endpoint.", 500, "INVALID_ENDPOINT", { strategy: typeof(this.strategy) });
			}
			return ret;
		}

		/**
		 * Get next endpoint
		 *
		 * @param {Context} ctx
		 * @returns
		 * @memberof EndpointList
		 */
		next(ctx) {
			// No items
			if (this.endpoints.length === 0) {
				return null;
			}

			// If internal (service), return the local always
			if (this.internal && this.hasLocal()) {
				return this.nextLocal();
			}

			// Only 1 item
			if (this.endpoints.length === 1) {
				// No need to select a node, return the only one
				const item = this.endpoints[0];
				if (item.isAvailable)
					return item;

				return null;
			}

			// Search local item
			if (this.registry.opts.preferLocal === true && this.hasLocal()) {
				const ep = this.nextLocal(ctx);
				if (ep && ep.isAvailable)
					return ep;
			}

			const epList = this.endpoints.filter(ep => ep.isAvailable);
			if (epList.length == 0)
				return null;

			return this.select(epList, ctx);
		}

		/**
		 * Get next local endpoint
		 *
		 * @param {Context} ctx
		 * @returns
		 * @memberof EndpointList
		 */
		nextLocal(ctx) {
			// No items
			if (this.localEndpoints.length === 0) {
				return null;
			}

			// Only 1 item
			if (this.localEndpoints.length === 1) {
				// No need to select a node, return the only one
				const item = this.localEndpoints[0];
				if (item.isAvailable)
					return item;

				return null;
			}

			const epList = this.localEndpoints.filter(ep => ep.isAvailable);
			if (epList.length == 0)
				return null;

			return this.select(epList, ctx);
		}

		/**
		 * Check there is available endpoint
		 *
		 * @returns
		 * @memberof EndpointList
		 */
		hasAvailable() {
			return this.endpoints.find(ep => ep.isAvailable) != null;
		}

		/**
		 * Check there is local endpoint
		 *
		 * @returns
		 * @memberof EndpointList
		 */
		hasLocal() {
			return this.localEndpoints.length > 0;
		}

		/**
		 * Set local endpoint
		 *
		 * @memberof EndpointList
		 */
		setLocalEndpoints() {
			this.localEndpoints = this.endpoints.filter(ep => ep.local);
		}

		/**
		 * Get count of endpoints
		 *
		 * @returns
		 * @memberof EndpointList
		 */
		count() {
			return this.endpoints.length;
		}

		/**
		 * Get endpoint on a specified node
		 *
		 * @param {String} nodeID
		 * @returns
		 * @memberof EndpointList
		 */
		getEndpointByNodeID(nodeID) {
			const ep = this.endpoints.find(ep => ep.id == nodeID);
			if (ep && ep.isAvailable)
				return ep;

			return null;
		}

		/**
		 * Check nodeID in the endpoint list
		 *
		 * @param {String} nodeID
		 * @returns
		 * @memberof EndpointList
		 */
		hasNodeID(nodeID) {
			return this.endpoints.find(ep => ep.id == nodeID) != null;
		}

		/**
		 * Remove all endpoints by service
		 *
		 * @param {ServiceItem} service
		 * @memberof EndpointList
		 */
		removeByService(service) {
			___default['default'].remove(this.endpoints, ep => {
				if (ep.service == service) {
					ep.destroy();
					return true;
				}
			});

			this.setLocalEndpoints();
		}

		/**
		 * Remove endpoints by node ID
		 *
		 * @param {String} nodeID
		 * @memberof EndpointList
		 */
		removeByNodeID(nodeID) {
			___default['default'].remove(this.endpoints, ep => {
				if (ep.id == nodeID) {
					ep.destroy();
					return true;
				}
			});

			this.setLocalEndpoints();
		}
	}

	var endpointList = EndpointList;

	/*
	 * moleculer
	 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Endpoint class
	 *
	 * @class Endpoint
	 */
	class Endpoint {
		/**
		 * Creates an instance of Endpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @memberof Endpoint
		 */
		constructor(registry, broker, node) {
			this.registry = registry;
			this.broker = broker;

			this.id = node.id;
			this.node = node;

			this.local = node.id === broker.nodeID;
			this.state = true;
		}

		destroy() {

		}

		/**
		 * Get availability
		 *
		 * @readonly
		 * @memberof Endpoint
		 */
		get isAvailable() {
			return this.state;
		}

		update() {

		}
	}

	var endpoint = Endpoint;

	/**
	 * Endpoint class for events
	 *
	 * @class EventEndpoint
	 * @extends {Endpoint}
	 */
	class EventEndpoint extends endpoint {

		/**
		 * Creates an instance of EventEndpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @param {Service} service
		 * @param {any} event
		 * @memberof EventEndpoint
		 */
		constructor(registry, broker, node, service, event) {
			super(registry, broker, node);

			this.service = service;
			this.event = event;
		}

		/**
		 * Update properties
		 *
		 * @param {any} event
		 * @memberof EventEndpoint
		 */
		update(event) {
			this.event = event;
		}
	}

	var endpointEvent = EventEndpoint;

	/**
	 * Catalog for events
	 *
	 * @class EventCatalog
	 */
	class EventCatalog {

		/**
		 * Creates an instance of EventCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {any} StrategyFactory
		 * @memberof EventCatalog
		 */
		constructor(registry, broker, StrategyFactory) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			this.StrategyFactory = StrategyFactory;

			this.events = [];

			this.EndpointFactory = endpointEvent;
		}

		/**
		 * Add a new event
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {any} event
		 * @returns
		 * @memberof EventCatalog
		 */
		add(node, service, event) {
			const eventName = event.name;
			const groupName = event.group || service.name;
			let list = this.get(eventName, groupName);
			if (!list) {
				const strategyFactory = event.strategy ? (strategies.resolve(event.strategy) || this.StrategyFactory) : this.StrategyFactory;
				const strategyOptions = event.strategyOptions ? event.strategyOptions : this.registry.opts.strategyOptions;
				// Create a new EndpointList
				list = new endpointList(this.registry, this.broker, eventName, groupName, this.EndpointFactory, strategyFactory, strategyOptions);
				this.events.push(list);
			}

			list.add(node, service, event);

			return list;
		}

		/**
		 * Get an event by name (and group name)
		 *
		 * @param {String} eventName
		 * @param {String} groupName
		 * @returns
		 * @memberof EventCatalog
		 */
		get(eventName, groupName) {
			return this.events.find(list => list.name == eventName && list.group == groupName);
		}

		/**
		 * Get balanced endpoint for event
		 *
		 * @param {String} eventName
		 * @param {String|Array?} groups
		 * @returns
		 * @memberof EventCatalog
		 */
		getBalancedEndpoints(eventName, groups) {
			const res = [];

			this.events.forEach(list => {
				if (!utils_1.match(eventName, list.name)) return;
				if (groups == null || groups.length == 0 || groups.indexOf(list.group) != -1) {
					// Use built-in balancer, get the next endpoint
					const ep = list.next();
					if (ep && ep.isAvailable)
						res.push([ep, list.group]);
				}
			});

			return res;
		}

		/**
		 * Get all groups for event
		 *
		 * @param {String} eventName
		 * @returns Array<String>
		 * @memberof EventCatalog
		 */
		getGroups(eventName) {
			return ___default['default'].uniq(this.events.filter(list => utils_1.match(eventName, list.name)).map(item => item.group));
		}

		/**
		 * Get all endpoints for event
		 *
		 * @param {String} eventName
		 * @param {Array<String>?} groupNames
		 * @returns
		 * @memberof EventCatalog
		 */
		getAllEndpoints(eventName, groupNames) {
			const res = [];
			this.events.forEach(list => {
				if (!utils_1.match(eventName, list.name)) return;
				if (groupNames == null || groupNames.length == 0 || groupNames.indexOf(list.group) !== -1) {
					list.endpoints.forEach(ep => {
						if (ep.isAvailable)
							res.push(ep);
					});
				}
			});

			return ___default['default'].uniqBy(res, "id");
		}

		/**
		 * Call local service handlers
		 *
		 * @param {String} eventName
		 * @param {any} payload
		 * @param {Array<String>?} groupNames
		 * @param {String} nodeID
		 * @param {boolean} broadcast
		 * @returns {Promise<any>}
		 *
		 * @memberof EventCatalog
		 */
		emitLocalServices(ctx) {
			const isBroadcast = ["broadcast", "broadcastLocal"].indexOf(ctx.eventType) !== -1;
			const sender = ctx.nodeID;

			const promises = [];

			this.events.forEach(list => {
				if (!utils_1.match(ctx.eventName, list.name)) return;
				if (ctx.eventGroups == null || ctx.eventGroups.length == 0 || ctx.eventGroups.indexOf(list.group) !== -1) {
					if (isBroadcast) {
						list.endpoints.forEach(ep => {
							if (ep.local && ep.event.handler) {
								const newCtx = ctx.copy(ep);
								newCtx.nodeID = sender;
								promises.push(this.callEventHandler(newCtx));
							}
						});
					} else {
						const ep = list.nextLocal();
						if (ep && ep.event.handler) {
							const newCtx = ctx.copy(ep);
							newCtx.nodeID = sender;
							promises.push(this.callEventHandler(newCtx));
						}
					}
				}
			});

			return this.broker.Promise.all(promises);
		}

		/**
		 * Call local event handler and handles unhandled promise rejections.
		 *
		 * @param {Context} ctx
		 *
		 * @memberof EventCatalog
		 */
		callEventHandler(ctx) {
			return ctx.endpoint.event.handler(ctx);
		}

		/**
		 * Remove endpoints by service
		 *
		 * @param {ServiceItem} service
		 * @memberof EventCatalog
		 */
		removeByService(service) {
			this.events.forEach(list => {
				list.removeByService(service);
			});
		}

		/**
		 * Remove endpoint by name & nodeId
		 *
		 * @param {String} eventName
		 * @param {String} nodeID
		 * @memberof EventCatalog
		 */
		remove(eventName, nodeID) {
			this.events.forEach(list => {
				if (list.name == eventName)
					list.removeByNodeID(nodeID);
			});
		}

		/**
		 * Get a filtered list of events
		 *
		 * @param {Object} {onlyLocal = false, onlyAvailable = false, skipInternal = false, withEndpoints = false}
		 * @returns {Array}
		 *
		 * @memberof EventCatalog
		 */
		list({ onlyLocal = false, onlyAvailable = false, skipInternal = false, withEndpoints = false }) {
			let res = [];

			this.events.forEach(list => {
				/* istanbul ignore next */
				if (skipInternal && /^\$/.test(list.name))
					return;

				if (onlyLocal && !list.hasLocal())
					return;

				if (onlyAvailable && !list.hasAvailable())
					return;

				let item = {
					name: list.name,
					group: list.group,
					count: list.count(),
					//service: list.service,
					hasLocal: list.hasLocal(),
					available: list.hasAvailable()
				};

				if (item.count > 0) {
					const ep = list.endpoints[0];
					if (ep)
						item.event = ___default['default'].omit(ep.event, ["handler", "remoteHandler", "service"]);
				}

				if (withEndpoints) {
					if (item.count > 0) {
						item.endpoints = list.endpoints.map(ep => {
							return {
								nodeID: ep.node.id,
								state: ep.state,
								available: ep.node.available,
							};
						});
					}
				}

				res.push(item);
			});

			return res;
		}
	}

	var eventCatalog = EventCatalog;

	/**
	 * Endpoint class for actions
	 *
	 * @class ActionEndpoint
	 * @extends {Endpoint}
	 */
	class ActionEndpoint extends endpoint {

		/**
		 * Creates an instance of ActionEndpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {any} action
		 * @memberof ActionEndpoint
		 */
		constructor(registry, broker, node, service, action) {
			super(registry, broker, node);

			this.service = service;
			this.action = action;

			this.name = `${this.id}:${this.action.name}`;
		}

		/**
		 * Update properties
		 *
		 * @param {any} action
		 * @memberof ActionEndpoint
		 */
		update(action) {
			this.action = action;
		}
	}

	var endpointAction = ActionEndpoint;

	/**
	 * Catalog class to store service actions
	 *
	 * @class ActionCatalog
	 */
	class ActionCatalog {

		/**
		 * Creates an instance of ActionCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Strategy} StrategyFactory
		 * @memberof ActionCatalog
		 */
		constructor(registry, broker, StrategyFactory) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			this.StrategyFactory = StrategyFactory;

			this.actions = new Map();

			this.EndpointFactory = endpointAction;
		}

		/**
		 * Add an action
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {Action} action
		 * @memberof ActionCatalog
		 */
		add(node, service, action) {
			let list = this.actions.get(action.name);
			if (!list) {
				const strategyFactory = action.strategy ? (strategies.resolve(action.strategy) || this.StrategyFactory) : this.StrategyFactory;
				const strategyOptions = action.strategyOptions ? action.strategyOptions : this.registry.opts.strategyOptions;
				// Create a new EndpointList
				list = new endpointList(this.registry, this.broker, action.name, null, this.EndpointFactory, strategyFactory, strategyOptions);
				this.actions.set(action.name, list);
			}

			list.add(node, service, action);

			return list;
		}

		/**
		 * Get action by name
		 *
		 * @param {String} actionName
		 * @returns
		 * @memberof ActionCatalog
		 */
		get(actionName) {
			return this.actions.get(actionName);
		}

		/**
		 * Check the action is available (there is live endpoint)
		 *
		 * @param {String} actionName
		 * @returns {Boolean}
		 * @memberof ActionCatalog
		 */
		isAvailable(actionName) {
			const list = this.actions.get(actionName);
			if (list)
				return list.hasAvailable();

			return false;
		}

		/**
		 * Remove all actions by service
		 *
		 * @param {ServiceItem} service
		 * @memberof ActionCatalog
		 */
		removeByService(service) {
			this.actions.forEach(list => {
				list.removeByService(service);
			});
		}

		/**
		 * Remove action by name & nodeID
		 *
		 * @param {String} actionName
		 * @param {String} nodeID
		 * @memberof ActionCatalog
		 */
		remove(actionName, nodeID) {
			const list = this.actions.get(actionName);
			if (list)
				list.removeByNodeID(nodeID);
		}

		/**
		 * Get a filtered list of actions
		 *
		 * @param {Object} {onlyLocal = false, onlyAvailable = false, skipInternal = false, withEndpoints = false}
		 * @returns {Array}
		 *
		 * @memberof ActionCatalog
		 */
		list({ onlyLocal = false, onlyAvailable = false, skipInternal = false, withEndpoints = false }) {
			let res = [];

			this.actions.forEach((list, key) => {
				if (skipInternal && /^\$/.test(key))
					return;

				if (onlyLocal && !list.hasLocal())
					return;

				if (onlyAvailable && !list.hasAvailable())
					return;

				let item = {
					name: key,
					count: list.count(),
					hasLocal: list.hasLocal(),
					available: list.hasAvailable()
				};

				if (item.count > 0) {
					const ep = list.endpoints[0];
					if (ep)
						item.action = ___default['default'].omit(ep.action, ["handler", "remoteHandler", "service"]);
				}
				if (item.action && item.action.protected === true) return;

				if (withEndpoints) {
					if (item.count > 0) {
						item.endpoints = list.endpoints.map(ep => {
							return {
								nodeID: ep.node.id,
								state: ep.state,
								available: ep.node.available,
							};
						});
					}
				}

				res.push(item);
			});

			return res;
		}
	}

	var actionCatalog = ActionCatalog;

	const { METRIC: METRIC$1 }		= metrics;

	/**
	 * Service Registry
	 *
	 * @class Registry
	 */
	class Registry {

		/**
		 * Creates an instance of Registry.
		 *
		 * @param {any} broker
		 * @memberof Registry
		 */
		constructor(broker) {
			this.broker = broker;
			this.metrics = broker.metrics;
			this.logger = broker.getLogger("registry");

			this.opts = Object.assign({}, broker.options.registry);

			this.StrategyFactory = strategies.resolve(this.opts.strategy);
			this.logger.info(`Strategy: ${this.StrategyFactory.name}`);

			this.discoverer = discoverers.resolve(this.opts.discoverer);
			this.logger.info(`Discoverer: ${this.broker.getConstructorName(this.discoverer)}`);

			this.nodes = new nodeCatalog(this, broker);
			this.services = new serviceCatalog(this, broker);
			this.actions = new actionCatalog(this, broker, this.StrategyFactory);
			this.events = new eventCatalog(this, broker, this.StrategyFactory);

			this.registerMoleculerMetrics();
			this.updateMetrics();
		}

		init(broker) {
			this.discoverer.init(this);
		}

		stop() {
			return this.discoverer.stop();
		}

		/**
		 * Register Moleculer Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_NODES_TOTAL, type: METRIC$1.TYPE_GAUGE, description: "Number of registered nodes" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_NODES_ONLINE_TOTAL, type: METRIC$1.TYPE_GAUGE, description: "Number of online nodes" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_SERVICES_TOTAL, type: METRIC$1.TYPE_GAUGE, description: "Number of registered services" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL, type: METRIC$1.TYPE_GAUGE, labelNames: ["service"], description: "Number of service endpoints" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_ACTIONS_TOTAL, type: METRIC$1.TYPE_GAUGE, description: "Number of registered actions" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL, type: METRIC$1.TYPE_GAUGE, labelNames: ["action"], description: "Number of action endpoints" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_EVENTS_TOTAL, type: METRIC$1.TYPE_GAUGE, description: "Number of registered events" });
			this.metrics.register({ name: METRIC$1.MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL, type: METRIC$1.TYPE_GAUGE, labelNames: ["event"], description: "Number of event endpoints" });
		}

		/**
		 * Update metrics.
		 */
		updateMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_NODES_TOTAL, this.nodes.count());
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_NODES_ONLINE_TOTAL, this.nodes.onlineCount());

			const services = this.services.list({ grouping: true, onlyLocal: false, onlyAvailable: false, skipInternal: false, withActions: false, withEvents: false });
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_SERVICES_TOTAL, services.length);
			services.forEach(svc => this.metrics.set(METRIC$1.MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL, svc.nodes ? svc.nodes.length : 0, { service: svc.fullName }));

			const actions = this.actions.list({ withEndpoints: true });
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_ACTIONS_TOTAL, actions.length);
			actions.forEach(item => this.metrics.set(METRIC$1.MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL, item.endpoints ? item.endpoints.length : 0, { action: item.name }));

			const events = this.events.list({ withEndpoints: true });
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_EVENTS_TOTAL, events.length);
			events.forEach(item => this.metrics.set(METRIC$1.MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL, item.endpoints ? item.endpoints.length : 0, { event: item.name }));
		}

		/**
		 * Register local service
		 *
		 * @param {Service} svc
		 * @memberof Registry
		 */
		registerLocalService(svc) {
			if (!this.services.has(svc.fullName, this.broker.nodeID)) {
				const service = this.services.add(this.nodes.localNode, svc, true);

				if (svc.actions)
					this.registerActions(this.nodes.localNode, service, svc.actions);

				if (svc.events)
					this.registerEvents(this.nodes.localNode, service, svc.events);

				this.nodes.localNode.services.push(service);

				this.regenerateLocalRawInfo(this.broker.started);

				this.logger.info(`'${svc.name}' service is registered.`);

				this.broker.servicesChanged(true);
				this.updateMetrics();
			}
		}

		/**
		 * Register remote services
		 *
		 * @param {Nodeany} node
		 * @param {Array} serviceList
		 * @memberof Registry
		 */
		registerServices(node, serviceList) {
			serviceList.forEach(svc => {
				if (!svc.fullName)
					svc.fullName = this.broker.ServiceFactory.getVersionedFullName(svc.name, svc.version);

				let prevActions, prevEvents;
				let service = this.services.get(svc.fullName, node.id);
				if (!service) {
					service = this.services.add(node, svc, false);
				} else {
					prevActions = Object.assign({}, service.actions);
					prevEvents = Object.assign({}, service.events);
					service.update(svc);
				}

				//Register actions
				if (svc.actions) {
					this.registerActions(node, service, svc.actions);
				}

				// remove old actions which is not exist
				if (prevActions) {
					___default['default'].forIn(prevActions, (action, name) => {
						if (!svc.actions || !svc.actions[name]) {
							this.unregisterAction(node, name);
						}
					});
				}

				//Register events
				if (svc.events) {
					this.registerEvents(node, service, svc.events);
				}

				// remove old events which is not exist
				if (prevEvents) {
					___default['default'].forIn(prevEvents, (event, name) => {
						if (!svc.events || !svc.events[name]) {
							this.unregisterEvent(node, name);
						}
					});
				}
			});

			// remove old services which is not exist in new serviceList
			// Please note! At first, copy the array because you can't remove items inside forEach
			const prevServices = Array.from(this.services.services);
			prevServices.forEach(service => {
				if (service.node != node) return;

				let exist = false;
				serviceList.forEach(svc => {
					if (service.equals(svc.fullName))
						exist = true;
				});

				// This service is removed on remote node!
				if (!exist) {
					this.unregisterService(service.fullName, node.id);
				}
			});

			this.broker.servicesChanged(false);
			this.updateMetrics();
		}

		/**
		 * Check the action visiblity.
		 *
		 * 	Available values:
		 * 		- "published" or `null`: public action and can be published via API Gateway
		 * 		- "public": public action, can be called remotely but not published via API GW
		 * 		- "protected": can be called from local services
		 * 		- "private": can be called from internally via `this.actions.xy()` inside Service
		 *
		 * @param {*} action
		 * @param {*} node
		 * @returns
		 * @memberof Registry
		 */
		checkActionVisibility(action, node) {
			if (action.visibility == null || action.visibility == "published" || action.visibility == "public")
				return true;

			if (action.visibility == "protected" && node.local)
				return true;

			return false;
		}

		/**
		 * Register service actions
		 *
		 * @param {Node} node
		 * @param {Service} service
		 * @param {Object} actions
		 * @memberof Registry
		 */
		registerActions(node, service, actions) {
			___default['default'].forIn(actions, action => {

				if (!this.checkActionVisibility(action, node))
					return;

				if (node.local) {
					action.handler = this.broker.middlewares.wrapHandler("localAction", action.handler, action);
				} else if (this.broker.transit) {
					action.handler = this.broker.middlewares.wrapHandler("remoteAction", this.broker.transit.request.bind(this.broker.transit), { ...action, service });
				}
				if (this.broker.options.disableBalancer && this.broker.transit)
					action.remoteHandler = this.broker.middlewares.wrapHandler("remoteAction", this.broker.transit.request.bind(this.broker.transit), { ...action, service });

				this.actions.add(node, service, action);
				service.addAction(action);
			});
		}

		/**
		 * Create a local Endpoint for private actions
		 *
		 * @param {Action} action
		 * @returns {ActionEndpoint}
		 * @memberof Registry
		 */
		createPrivateActionEndpoint(action) {
			return new endpointAction(this, this.broker, this.nodes.localNode, action.service, action);
		}

		/**
		 * Check the service is exist
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns {Boolean}
		 * @memberof Registry
		 */
		hasService(fullName, nodeID) {
			return this.services.has(fullName, nodeID);
		}

		/**
		 * Get endpoint list of action by name
		 *
		 * @param {String} actionName
		 * @returns {EndpointList}
		 * @memberof Registry
		 */
		getActionEndpoints(actionName) {
			return this.actions.get(actionName);
		}

		/**
		 * Get an endpoint of action on a specified node
		 *
		 * @param {String} actionName
		 * @param {String} nodeID
		 * @returns {Endpoint}
		 * @memberof Registry
		 */
		getActionEndpointByNodeId(actionName, nodeID) {
			const list = this.actions.get(actionName);
			if (list)
				return list.getEndpointByNodeID(nodeID);
		}

		/**
		 * Unregister service
		 *
		 * @param {String} fullName
		 * @param {String?} nodeID
		 * @memberof Registry
		 */
		unregisterService(fullName, nodeID) {
			this.services.remove(fullName, nodeID || this.broker.nodeID);

			if (!nodeID || nodeID == this.broker.nodeID) {
				this.regenerateLocalRawInfo(true);
			}
		}

		/**
		 * Unregister all services by nodeID
		 *
		 * @param {String} nodeID
		 * @memberof Registry
		 */
		unregisterServicesByNode(nodeID) {
			this.services.removeAllByNodeID(nodeID);
		}

		/**
		 * Unregister an action by node & name
		 *
		 * @param {Node} node
		 * @param {String} actionName
		 * @memberof Registry
		 */
		unregisterAction(node, actionName) {
			this.actions.remove(actionName, node.id);
		}

		/**
		 * Register service events
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {Object} events
		 * @memberof Registry
		 */
		registerEvents(node, service, events) {
			___default['default'].forIn(events, event => {

				if (node.local)
					event.handler = this.broker.middlewares.wrapHandler("localEvent", event.handler, event);

				this.events.add(node, service, event);
				service.addEvent(event);
			});
		}

		/**
		 * Unregister event by name & node
		 *
		 * @param {Node} node
		 * @param {String} eventName
		 * @memberof Registry
		 */
		unregisterEvent(node, eventName) {
			this.events.remove(eventName, node.id);
		}

		/**
		 * Generate local raw info for INFO packet
		 *
		 * @memberof Registry
		 */
		regenerateLocalRawInfo(incSeq) {
			let node = this.nodes.localNode;
			if (incSeq)
				node.seq++;

			const rawInfo = ___default['default'].pick(node, ["ipList", "hostname", "instanceID", "client", "config", "port", "seq", "metadata"]);
			if (this.broker.started)
				rawInfo.services = this.services.getLocalNodeServices();
			else
				rawInfo.services = [];

			// Make to be safety
			node.rawInfo = utils_1.safetyObject(rawInfo, this.broker.options);

			return node.rawInfo;
		}

		/**
		 * Generate local node info for INFO packets
		 *
		 * @returns
		 * @memberof Registry
		 */
		getLocalNodeInfo(force) {
			if (force || !this.nodes.localNode.rawInfo)
				return this.regenerateLocalRawInfo();

			return this.nodes.localNode.rawInfo;
		}

		/**
		 * Generate node info for INFO packets
		 *
		 * @returns
		 * @memberof Registry
		 */
		getNodeInfo(nodeID) {
			const node = this.nodes.get(nodeID);
			if (!node)
				return null;

			if (node.local)
				return this.getLocalNodeInfo();

			return node.rawInfo;
		}

		/**
		 * Process an incoming node INFO packet
		 *
		 * @param {any} payload
		 * @returns
		 * @memberof Registry
		 */
		processNodeInfo(payload) {
			return this.nodes.processNodeInfo(payload);
		}

		/**
		 * Get list of registered nodes
		 *
		 * @param {object} opts
		 * @returns
		 * @memberof Registry
		 */
		getNodeList(opts) {
			return this.nodes.list(opts);
		}

		/**
		 * Get list of registered services
		 *
		 * @param {object} opts
		 * @returns
		 * @memberof Registry
		 */
		getServiceList(opts) {
			return this.services.list(opts);
		}

		/**
		 * Get list of registered actions
		 *
		 * @param {object} opts
		 * @returns
		 * @memberof Registry
		 */
		getActionList(opts) {
			return this.actions.list(opts);
		}

		/**
		 * Get list of registered events
		 *
		 * @param {object} opts
		 * @returns
		 * @memberof Registry
		 */
		getEventList(opts) {
			return this.events.list(opts);
		}

		/**
		 * Get a raw info list from nodes
		 *
		 * @returns {Array<Object>}
		 * @memberof Registry
		 */
		getNodeRawList() {
			return this.nodes.toArray().map(node => node.rawInfo);
		}
	}

	var registry$1 = Registry;

	var registry$2 = registry$1;

	var Endpoint$1 = endpoint;
	registry$2.Endpoint = Endpoint$1;

	const { match: match$2, isObject: isObject$3, isString: isString$5 }	= utils_1;

	const LEVELS = ["fatal", "error", "warn", "info", "debug", "trace"];

	/**
	 * Logger base class.
	 *
	 * @class BaseLogger
	 */
	class BaseLogger {

		/**
		 * Creates an instance of BaseLogger.
		 *
		 * @param {Object} opts
		 * @memberof BaseLogger
		 */
		constructor(opts) {
			this.opts = ___default['default'].defaultsDeep(opts, {
				level: "info",
				createLogger: null
			});
			this.Promise = Promise; // default promise before logger is initialized
		}

		/**
		 * Initialize logger.
		 *
		 * @param {LoggerFactory} loggerFactory
		 */
		init(loggerFactory)  {
			this.loggerFactory = loggerFactory;
			this.broker = this.loggerFactory.broker;
			this.Promise = this.broker.Promise;
		}

		/**
		 * Stopping logger
		 */
		stop() {
			return this.Promise.resolve();
		}

		getLogLevel(mod) {
			mod = mod ? mod.toUpperCase() : "";

			const level = this.opts.level;
			if (isString$5(level))
				return level;

			if (isObject$3(level)) {
				if (level[mod])
					return level[mod];

				// Find with matching
				const key = Object.keys(level).find(m => match$2(mod, m) && m !== "**");
				if (key)
					return level[key];
				else if (level["**"]) {
					return level["**"];
				}
			}

			/* istanbul ignore next */
			return null;
		}

		getLogHandler(/*bindings*/) {
			return null;
		}
	}

	BaseLogger.LEVELS = LEVELS;

	var base$4 = BaseLogger;

	const { isObject: isObject$4, isFunction: isFunction$3 }	= utils_1;


	function getColor(type) {
		switch(type) {
			case "fatal": return kleur__default['default'].red().inverse;
			case "error": return kleur__default['default'].red;
			case "warn": return kleur__default['default'].yellow;
			case "debug": return kleur__default['default'].magenta;
			case "trace": return kleur__default['default'].gray;
			default: return kleur__default['default'].green;
		}
	}

	/**
	 * Formatted abstract logger for Moleculer
	 *
	 * @class FormattedLogger
	 * @extends {BaseLogger}
	 */
	class FormattedLogger extends base$4 {

		/**
		 * Creates an instance of FormattedLogger.
		 * @param {Object} opts
		 * @memberof FormattedLogger
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				colors: true,
				moduleColors: false,
				formatter: "full",
				objectPrinter: null,
				autoPadding: false
			});

			this.maxPrefixLength = 0;
		}

		init(loggerFactory) {
			super.init(loggerFactory);

			if (!this.opts.colors)
				kleur__default['default'].enabled = false;

			this.objectPrinter = this.opts.objectPrinter ? this.opts.objectPrinter : o => util__default['default'].inspect(o, { showHidden: false, depth: 2, colors: kleur__default['default'].enabled, breakLength: Number.POSITIVE_INFINITY });

			// Generate colorful log level names
			this.levelColorStr = base$4.LEVELS.reduce((a, level) => {
				a[level] = getColor(level)(___default['default'].padEnd(level.toUpperCase(), 5));
				return a;
			}, {});

			if (this.opts.colors && this.opts.moduleColors === true) {
				this.opts.moduleColors = [
					"yellow", "bold.yellow",
					"cyan", "bold.cyan",
					"green", "bold.green",
					"magenta", "bold.magenta",
					"blue", "bold.blue",
					/*"red",*/
					/*"grey",*/
					/*"white,"*/
				];
			}
		}

		/**
		 * Get a color for the module name.
		 */
		getNextColor(mod) {
			if (this.opts.colors && Array.isArray(this.opts.moduleColors)) {
				// Credits: "visionmedia/debug" https://github.com/visionmedia/debug/blob/master/src/common.js#L45
				let hash = 0;

				for (let i = 0; i < mod.length; i++) {
					hash = ((hash << 5) - hash) + mod.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return this.opts.moduleColors[Math.abs(hash) % this.opts.moduleColors.length];
			}

			return "grey";
		}

		padLeft(len) {
			if (this.opts.autoPadding)
				return " ".repeat(this.maxPrefixLength - len);

			return "";
		}

		/**
		 *
		 * @param {object} bindings
		 */
		getFormatter(bindings) {
			const formatter = this.opts.formatter;

			const mod = (bindings && bindings.mod) ? bindings.mod.toUpperCase() : "";
			const c = this.getNextColor(mod);
			const modColorName = c.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default'])(mod);
			const moduleColorName = bindings ? kleur__default['default'].grey(bindings.nodeID + "/") + modColorName : "";

			const printArgs = args => {
				return args.map(p => {
					if (isObject$4(p) || Array.isArray(p))
						return this.objectPrinter(p);
					return p;
				});
			};

			if (isFunction$3(formatter)) {
				return (type, args) => formatter.call(this, type, args, bindings, { printArgs });

			} else if (formatter == "json") {
				// {"ts":1581243299731,"level":"info","msg":"Moleculer v0.14.0-rc2 is starting...","nodeID":"console","ns":"","mod":"broker"}
				kleur__default['default'].enabled = false;
				return (type, args) => [JSON.stringify({ ts: Date.now(), level: type, msg: printArgs(args).join(" "), ...bindings })];
			} else if (formatter == "jsonext") {
				// {"time":"2020-02-09T10:44:35.285Z","level":"info","message":"Moleculer v0.14.0-rc2 is starting...","nodeID":"console","ns":"","mod":"broker"}
				kleur__default['default'].enabled = false;
				return (type, args) => {
					const res = {
						time: new Date().toISOString(),
						level: type,
						message: "",
						...bindings
					};
					if (args.length > 0) {
						if (typeof(args[0]) == "object"/* && !(args[0] instanceof Error)*/) {
							Object.assign(res, args[0]);
							res.message = printArgs(args.slice(1)).join(" ");
						} else {
							res.message = printArgs(args).join(" ");
						}
					}
					return [JSON.stringify(res)];
				};
			} else if (formatter == "simple") {
				// INFO  - Moleculer v0.14.0-beta3 is starting...
				return (type, args) => [this.levelColorStr[type], "-", ...printArgs(args)];
			} else if (formatter == "short") {
				// [08:42:12.973Z] INFO  BROKER: Moleculer v0.14.0-beta3 is starting...
				const prefixLen = 23 + bindings.mod.length;
				this.maxPrefixLength = Math.max(prefixLen, this.maxPrefixLength);
				return (type, args) => [kleur__default['default'].grey(`[${new Date().toISOString().substr(11)}]`), this.levelColorStr[type], modColorName + this.padLeft(prefixLen) + kleur__default['default'].grey(":"), ...printArgs(args)];
			} else if (formatter == "full") {
				// [2019-08-31T08:40:53.481Z] INFO  bobcsi-pc-7100/BROKER: Moleculer v0.14.0-beta3 is starting...
				const prefixLen = 35 + bindings.nodeID.length + bindings.mod.length;
				this.maxPrefixLength = Math.max(prefixLen, this.maxPrefixLength);
				return (type, args) => [kleur__default['default'].grey(`[${new Date().toISOString()}]`), this.levelColorStr[type], moduleColorName + this.padLeft(prefixLen) + kleur__default['default'].grey(":"), ...printArgs(args)];
			} else {
				// [{timestamp}] {level} {nodeID}/{mod}: {msg}

				return (type, args) => {
					const timestamp = new Date().toISOString();
					return [this.render(formatter, {
						timestamp: kleur__default['default'].grey(timestamp),
						time: kleur__default['default'].grey(timestamp.substr(11)),

						level: this.levelColorStr[type],
						nodeID: kleur__default['default'].grey(bindings.nodeID),
						mod: modColorName,
						msg: printArgs(args).join(" ")
					})];
				};
			}
		}

		/**
		 * Interpolate a text.
		 *
		 * @param {Strimg} str
		 * @param {Object} obj
		 * @returns {String}
		 */
		render(str, obj) {
			return str.replace(/\{\s?(\w+)\s?\}/g, (match, v) => obj[v] || "");
		}

	}

	var formatted = FormattedLogger;

	/**
	 * Console logger for Moleculer
	 *
	 * @class ConsoleLogger
	 * @extends {FormattedLogger}
	 */
	class ConsoleLogger extends formatted {

		/**
		 * Creates an instance of ConsoleLogger.
		 * @param {Object} opts
		 * @memberof ConsoleLogger
		 */
		constructor(opts) {
			super(opts);

			this.maxPrefixLength = 0;
		}

		init(loggerFactory) {
			super.init(loggerFactory);

			if (!this.opts.colors)
				kleur__default['default'].enabled = false;
		}

		/**
		 *
		 * @param {object} bindings
		 */
		getLogHandler(bindings) {
			const level = bindings ? this.getLogLevel(bindings.mod) : null;
			if (!level)
				return null;

			const levelIdx = formatted.LEVELS.indexOf(level);
			const formatter = this.getFormatter(bindings);

			return (type, args) => {
				const typeIdx = formatted.LEVELS.indexOf(type);
				if (typeIdx > levelIdx) return;

				const pargs = formatter(type, args);
				switch(type) {
					case "fatal":
					case "error": return console.error(...pargs);
					case "warn": return console.warn(...pargs);
					default: return console.log(...pargs);
				}
			};
		}

	}

	var console_1 = ConsoleLogger;

	const { isObject: isObject$5, isString: isString$6 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$4 } = errors;


	const Loggers = {
		Base: base$4,
		Formatted: formatted,

		Bunyan: require$$19,
		Console: console_1,
		Datadog: require$$19,
		Debug: require$$19,
		File: require$$19,
		Log4js: require$$19,
		Pino: require$$19,
		Winston: require$$19,

		LEVELS: base$4.LEVELS
	};

	function getByName$4(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Loggers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Loggers[n];
	}

	/**
	 * Resolve reporter by name
	 *
	 * @param {object|string} opt
	 * @returns {Reporter}
	 * @memberof ServiceBroker
	 */
	function resolve$4(opt) {
		if (opt instanceof Loggers.Base) {
			return opt;
		} else if (isString$6(opt)) {
			let LoggerClass = getByName$4(opt);
			if (LoggerClass)
				return new LoggerClass();

		} else if (isObject$5(opt)) {
			let LoggerClass = getByName$4(opt.type);
			if (LoggerClass)
				return new LoggerClass(opt.options);
			else
				throw new BrokerOptionsError$4(`Invalid logger configuration. Type: '${opt.type}'`, { type: opt.type });
		}

		throw new BrokerOptionsError$4(`Invalid logger configuration: '${opt}'`, { type: opt });
	}

	function register$4(name, value) {
		Loggers[name] = value;
	}

	var loggers = Object.assign(Loggers, { resolve: resolve$4, register: register$4 });

	const { isPlainObject: isPlainObject$2, isString: isString$7 } = utils_1;


	const noop = () => {};
	const cwd = proc.cwd();

	/**
	 * Log factory class.
	 *
	 * @class LoggerFactory
	 */
	class LoggerFactory {

		/**
		 * Constructor of LoggerFactory
		 */
		constructor(broker) {
			this.broker = broker;
			this.appenders = [];
			this.cache = new Map();
		}

		/**
		 * Initialize module.
		 */
		init(opts) {
			this.opts = opts;

			const globalLogLevel = this.broker.options.logLevel || "info";

			if (opts === false || opts == null) {
				// No logger
				this.appenders = [];

			} else if (opts === true || opts === console) {
				// Default console logger
				this.appenders = [loggers.resolve({
					type: "Console",
					options: {
						level: globalLogLevel
					}
				})];

			} else {
				if (!Array.isArray(opts)) {
					opts = [opts];
				}

				this.appenders = ___default['default'].compact(opts).map(o => {
					// Built-in shorthand
					if (isString$7(o))
						return loggers.resolve({ type: o, options: { level: globalLogLevel } });

					// Build-in with options
					if (isPlainObject$2(o))
						return loggers.resolve(___default['default'].defaultsDeep({}, o, { options: { level: globalLogLevel } }));

					// Custom logger instance
					return loggers.resolve(o);
				});
			}

			// Initialize appenders
			this.appenders.forEach(app => app.init(this));
		}

		/**
		 * Stopping all appenders
		 */
		stop() {
			return this.broker.Promise.all(this.appenders.map(appender => appender.stop()));
		}

		/**
		 * Get caller information from error stack trace.
		 */
		getCallerFromStack() {
			const _prepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = (_, stack) => stack;
			const stack = new Error().stack;
			Error.prepareStackTrace = _prepareStackTrace;

			if (stack.length > 2) {
				const site = stack[2];
				return {
					filename: site.getFileName().substring(cwd.length + 1),
					lineNumber: site.getLineNumber(),
					columnNumber: site.getColumnNumber(),
					methodName: site.getMethodName(),
					functionName: site.getFunctionName(),
				};
			}
		}

		/**
		 * Get a logger for a module (service, transporter, cacher, context...etc)
		 *
		 * @param {Object} bindings
		 * @returns {ModuleLogger}
		 *
		 * @memberof ServiceBroker
		 */
		getLogger(bindings) {
			let logger = this.cache.get(this.getBindingsKey(bindings));
			if (logger) return logger;

			logger = {};
			const broker = this.broker;
			const appenders = this.appenders;

			const logHandlers = ___default['default'].compact(appenders.map(app => app.getLogHandler(bindings)));

			loggers.LEVELS.forEach((type) => {
				if (logHandlers.length == 0)
					return logger[type] = noop;

				logger[type] = function(...args) {
					if (broker.middlewares && broker.middlewares.registeredHooks.newLogEntry)
						broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

					if (logHandlers.length == 0) return;

					for(let i = 0; i < logHandlers.length; i++)
						logHandlers[i](type, args);
				};
			});

			/*logger.log = function(type, ...args) {
				if (broker.middlewares)
					broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

				if (logHandlers.length == 0) return;

				logHandlers.forEach(fn => fn(type, args));
			};*/

			logger.appenders = appenders;


			this.cache.set(this.getBindingsKey(bindings), logger);

			return logger;
		}

		/**
		 * Create a key from bindings for logger caching.
		 *
		 * @param {object} bindings
		 * @returns {String}
		 */
		getBindingsKey(bindings) {
			if (!bindings) return "";

			return ["nodeID", "ns", "mod"]
				.map(key => bindings[key])
				.join("|");
		}

	}

	var loggerFactory = LoggerFactory;

	const { ValidationError } = errors;


	class BaseValidator {

		constructor(opts) {
			this.opts = ___default['default'].defaultsDeep(opts, {
				paramName: "params"
			});
		}

		init(broker) {
			this.broker = broker;
		}

		/**
		 * Compile a validation schema to a checker function.
		 * @param {any} schema
		 * @returns {Function}
		 */
		compile(/*schema*/) {
			throw new Error("Abstract method");
		}

		/**
		 * Validate params againt the schema
		 * @param {any} params
		 * @param {any} schema
		 * @returns {boolean}
		 */
		validate(/*params, schema*/) {
			throw new Error("Abstract method");
		}

		/**
		 * Convert the specific validation schema to
		 * the Moleculer (fastest-validator) validation schema format.
		 *
		 * @param {any} schema
		 * @returns {Object}
		 */
		convertSchemaToMoleculer(/*schema*/) {
			throw new Error("Abstract method");
		}

		/**
		 * Register validator as a middleware
		 *
		 * @memberof BaseValidator
		 */
		middleware(broker) {
			const self = this;
			const paramName = this.opts.paramName;

			return {
				name: "Validator",
				localAction: function validatorMiddleware(handler, action) {
					// Wrap a param validator
					if (action[paramName] && typeof action[paramName] === "object") {
						const check = self.compile(action[paramName]);
						return function validateContextParams(ctx) {
							let res = check(ctx.params != null ? ctx.params : {});
							if (res === true)
								return handler(ctx);
							else {
								res = res.map(data => Object.assign(data, { nodeID: ctx.nodeID, action: ctx.action.name }));
								return broker.Promise.reject(new ValidationError("Parameters validation error!", null, res));
							}
						};
					}
					return handler;
				},

				localEvent: function validatorMiddleware(handler, event) {
					// Wrap a param validator
					if (event[paramName] && typeof event[paramName] === "object") {
						const check = self.compile(event[paramName]);
						return function validateContextParams(ctx) {
							let res = check(ctx.params != null ? ctx.params : {});
							if (res === true)
								return handler(ctx);
							else {
								res = res.map(data => Object.assign(data, { nodeID: ctx.nodeID, event: ctx.event.name }));
								return broker.Promise.reject(new ValidationError("Parameters validation error!", null, res));
							}
						};
					}
					return handler;
				}
			};
		}
	}


	var base$5 = BaseValidator;

	const { ValidationError: ValidationError$1 } = errors;


	class FastestValidator  extends base$5{

		constructor(opts) {
			super(opts);
			this.validator = new Validator__default['default'](this.opts);
		}

		/**
		 * Compile a validation schema to a checker function.
		 * @param {any} schema
		 * @returns {Function}
		 */
		compile(schema) {
			return this.validator.compile(schema);
		}

		/**
		 * Validate params againt the schema
		 * @param {any} params
		 * @param {any} schema
		 * @returns {boolean}
		 */
		validate(params, schema) {
			const res = this.validator.validate(params, schema);
			if (res !== true)
				throw new ValidationError$1("Parameters validation error!", null, res);

			return true;
		}

		/**
		 * Convert the specific validation schema to
		 * the Moleculer (fastest-validator) validation schema format.
		 *
		 * @param {any} schema
		 * @returns {Object}
		 */
		convertSchemaToMoleculer(schema) {
			return schema;
		}
	}

	var fastest = FastestValidator;

	const { BrokerOptionsError: BrokerOptionsError$5 } = errors;
	const { isObject: isObject$6, isString: isString$8 } = utils_1;

	const Validators = {
		Base: base$5,
		Fastest: fastest
	};

	function getByName$5(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Validators).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Validators[n];
	}

	/**
	 * Resolve validator by name
	 *
	 * @param {object|string} opt
	 * @returns {Validator}
	 * @memberof ServiceBroker
	 */
	function resolve$5(opt) {
		if (opt instanceof Validators.Base) {
			return opt;
		} else if (isString$8(opt)) {
			let ValidatorClass = getByName$5(opt);
			if (ValidatorClass)
				return new ValidatorClass();

			throw new BrokerOptionsError$5(`Invalid Validator type '${opt}'.`, { type: opt });

		} else if (isObject$6(opt)) {
			let ValidatorClass = getByName$5(opt.type || "Fastest");
			if (ValidatorClass)
				return new ValidatorClass(opt.options);
			else
				throw new BrokerOptionsError$5(`Invalid Validator type '${opt.type}'.`, { type: opt.type });
		}

		return new Validators.Fastest();
	}

	function register$5(name, value) {
		Validators[name] = value;
	}

	var validators = Object.assign(Validators, { resolve: resolve$5, register: register$5 });

	const { METRIC: METRIC$2 }	= metrics;
	const { isObject: isObject$7, isFunction: isFunction$4 }	= utils_1;

	/**
	 * Abstract cacher class
	 *
	 * @class Cacher
	 */
	class Cacher {

		/**
		 * Creates an instance of Cacher.
		 *
		 * @param {object} opts
		 *
		 * @memberof Cacher
		 */
		constructor(opts) {
			this.opts = ___default['default'].defaultsDeep(opts, {
				ttl: null,
				keygen: null,
				maxParamsLength: null
			});
		}

		/**
		 * Initialize cacher
		 *
		 * @param {any} broker
		 *
		 * @memberof Cacher
		 */
		init(broker) {
			this.broker = broker;
			this.metrics = broker.metrics;

			if (this.broker) {
				this.logger = broker.getLogger("cacher");

				if (this.opts.prefix) {
					this.prefix = this.opts.prefix + "-";
				} else {
					this.prefix = "MOL-";
					if (this.broker.namespace)
						this.prefix += this.broker.namespace + "-";
				}

				this.registerMoleculerMetrics();
			}
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_GET_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });
			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_GET_TIME, type: METRIC$2.TYPE_HISTOGRAM, quantiles: true, unit: METRIC$2.UNIT_MILLISECONDS });

			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_FOUND_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });

			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_SET_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });
			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_SET_TIME, type: METRIC$2.TYPE_HISTOGRAM, quantiles: true, unit: METRIC$2.UNIT_MILLISECONDS });

			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_DEL_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });
			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_DEL_TIME, type: METRIC$2.TYPE_HISTOGRAM, quantiles: true, unit: METRIC$2.UNIT_MILLISECONDS });

			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_CLEAN_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });
			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_CLEAN_TIME, type: METRIC$2.TYPE_HISTOGRAM, quantiles: true, unit: METRIC$2.UNIT_MILLISECONDS });

			this.metrics.register({ name: METRIC$2.MOLECULER_CACHER_EXPIRED_TOTAL, type: METRIC$2.TYPE_COUNTER, rate: true });
		}

		/**
		 * Close cacher
		 *
		 * @memberof Cacher
		 */
		close() {
			/* istanbul ignore next */
			return Promise.resolve();
		}

		/**
		 * Get a cached content by key
		 *
		 * @param {any} key
		 *
		 * @memberof Cacher
		 */
		get(/*key*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Get a cached content and ttl by key
		 *
		 * @param {any} key
		 *
		 * @memberof Cacher
		 */
		getWithTTL(/*key*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Set a content by key to cache
		 *
		 * @param {any} key
		 * @param {any} data
		 * @param {Number?} ttl
		 *
		 * @memberof Cacher
		 */
		set(/*key, data, ttl*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Delete a content by key from cache
		 *
		 * @param {string|Array<string>} key
		 *
		 * @memberof Cacher
		 */
		del(/*key*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}


		/**
		 * Clean cache. Remove every key by match
		 * @param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise}
		 *
		 * @memberof Cacher
		 */
		clean(/*match = "**"*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Get a value from params or meta by `key`.
		 * If the key starts with `#` it reads from `meta`, otherwise from `params`.
		 *
		 * @param {String} key
		 * @param {Object} params
		 * @param {Object} meta
		 * @returns {any}
		 * @memberof Cacher
		 */
		getParamMetaValue(key, params, meta) {
			if (key.startsWith("#") && meta != null)
				return ___default['default'].get(meta, key.slice(1));
			else if (params != null)
				return ___default['default'].get(params, key);
		}

		/**
		 * Default cache key generator
		 *
		 * @param {String} actionName
		 * @param {Object|null} params
		 * @param {Object} meta
		 * @param {Array|null} keys
		 * @returns {String}
		 * @memberof Cacher
		 */
		defaultKeygen(actionName, params, meta, keys) {
			if (params || meta) {
				const keyPrefix = actionName + ":";
				if (keys) {
					if (keys.length == 1) {
						// Fast solution for ['id'] key
						const val = this.getParamMetaValue(keys[0], params, meta);
						return keyPrefix + this._hashedKey(isObject$7(val) ? this._hashedKey(this._generateKeyFromObject(val)) : val);
					}

					if (keys.length > 0) {
						return keyPrefix + this._hashedKey(keys.reduce((a, key, i) => {
							const val = this.getParamMetaValue(key, params, meta);
							return a + (i ? "|" : "") + (isObject$7(val) || Array.isArray(val) ? this._hashedKey(this._generateKeyFromObject(val)) : val);
						}, ""));
					}
				}
				else {
					return keyPrefix + this._hashedKey(this._generateKeyFromObject(params));
				}
			}
			return actionName;
		}

		_hashedKey(key) {
			const maxParamsLength = this.opts.maxParamsLength;
			if (!maxParamsLength || maxParamsLength < 44 || key.length <= maxParamsLength)
				return key;

			const prefixLength = maxParamsLength - 44;

			const base64Hash = crypto__default['default'].createHash("sha256").update(key).digest("base64");
			if (prefixLength < 1)
				return base64Hash;

			return key.substring(0, prefixLength) + base64Hash;
		}

		_generateKeyFromObject(obj) {
			if (Array.isArray(obj)) {
				return obj.map(o => this._generateKeyFromObject(o)).join("|");
			}
			else if (isObject$7(obj)) {
				return Object.keys(obj).map(key => [key, this._generateKeyFromObject(obj[key])].join("|")).join("|");
			}
			else if (obj != null) {
				return obj.toString();
			} else {
				return "null";
			}
		}

		/**
		 * Get a cache key by name and params.
		 * Concatenate the name and the hashed params object
		 *
		 * @param {String} name
		 * @param {Object} params
		 * @param {Object} meta
		 * @param {Array|null} keys
		 * @returns {String}
		 */
		getCacheKey(actionName, params, meta, keys) {
			if (isFunction$4(this.opts.keygen))
				return this.opts.keygen.call(this, actionName, params, meta, keys);
			else
				return this.defaultKeygen(actionName, params, meta, keys);
		}

		/**
		 * Register cacher as a middleware
		 *
		 * @memberof Cacher
		 */
		middleware() {
			return (handler, action) => {
				const opts = ___default['default'].defaultsDeep({}, isObject$7(action.cache) ? action.cache : { enabled: !!action.cache });
				opts.lock = ___default['default'].defaultsDeep({}, isObject$7(opts.lock) ? opts.lock : { enabled: !!opts.lock });
				if (opts.enabled !== false) {
					const isEnabledFunction = isFunction$4(opts.enabled);

					return function cacherMiddleware(ctx) {
						if (isEnabledFunction) {
							if (!opts.enabled.call(ctx.service, ctx)) {
								// Cache is disabled. Call the handler only.
								return handler(ctx);
							}
						}

						// Disable caching with `ctx.meta.$cache = false`
						if (ctx.meta["$cache"] === false)
							return handler(ctx);

						const cacheKey = this.getCacheKey(action.name, ctx.params, ctx.meta, opts.keys);
						// Using lock
						if(opts.lock.enabled !== false){
							let cachePromise;
							if(opts.lock.staleTime && this.getWithTTL){ // If enable cache refresh
								cachePromise = this.getWithTTL(cacheKey).then(({ data, ttl }) => {
									if (data != null) {
										if(opts.lock.staleTime && ttl && ttl < opts.lock.staleTime){
											// Cache is stale, try to refresh it.
											this.tryLock(cacheKey, opts.lock.ttl).then(unlock=>{
												return handler(ctx).then(result => {
													// Save the result to the cache and realse the lock.
													return this.set(cacheKey, result, opts.ttl).then(()=>unlock());
												}).catch((/*err*/) => {
													return this.del(cacheKey).then(()=>unlock());
												});
											}).catch((/*err*/)=>{
												// The cache is refreshing on somewhere else.
											});
										}
									}
									return data;
								});
							} else {
								cachePromise = this.get(cacheKey);
							}
							return cachePromise.then(data=>{
								if (data != null) {
									// Found in the cache! Don't call handler, return with the content
									ctx.cachedResult = true;
									return data;
								}
								// Not found in the cache! Acquire a lock
								return this.lock(cacheKey, opts.lock.ttl).then(unlock => {
									return this.get(cacheKey).then(content => {
										if (content != null) {
											// Cache found. Realse the lock and return the value.
											ctx.cachedResult = true;
											return unlock().then(() => {
												return content;
											});
										}
										// Call the handler
										return handler(ctx).then(result => {
											// Save the result to the cache and realse the lock.
											this.set(cacheKey, result, opts.ttl).then(()=>unlock());
											return result;
										}).catch(e => {
											return unlock().then(() => {
												return Promise.reject(e);
											});
										});
									});
								});
							});
						}
						// Not using lock
						return this.get(cacheKey).then(content => {
							if (content != null) {
								// Found in the cache! Don't call handler, return with the content
								ctx.cachedResult = true;
								return content;
							}

							// Call the handler
							return handler(ctx).then(result => {
								// Save the result to the cache
								this.set(cacheKey, result, opts.ttl);

								return result;
							});
						});
					}.bind(this);
				}

				return handler;
			};
		}

	}

	var base$6 = Cacher;

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	class Lock {
		constructor(){
			this.locked = new Map();
		}

		acquire(key /*, ttl*/) {
			let locked = this.locked.get(key);
			if (!locked) { // not locked
				locked = [];
				this.locked.set(key, locked);
				return Promise.resolve();
			} else {
				return new Promise(resolve => locked.push(resolve));
			}
		}

		isLocked(key) {
			return !!this.locked.get(key);
		}

		release(key){
			let locked = this.locked.get(key);
			if(locked) {
				if(locked.length > 0) {
					locked.shift()(); // Release the lock
				} else {
					this.locked.delete(key);
				}
			}
			return Promise.resolve();
		}
	}

	var lock = Lock;

	const { METRIC: METRIC$3 }	= metrics;


	/**
	 * Cacher factory for memory cache
	 *
	 * @class MemoryCacher
	 */
	class MemoryCacher extends base$6 {

		/**
		 * Creates an instance of MemoryCacher.
		 *
		 * @param {object} opts
		 *
		 * @memberof MemoryCacher
		 */
		constructor(opts) {
			super(opts);

			// Cache container
			this.cache = new Map();
			// Async lock
			this._lock = new lock();
			// Start TTL timer
			this.timer = timersBrowserify.setInterval(() => {
				/* istanbul ignore next */
				this.checkTTL();
			}, 30 * 1000);
			this.timer.unref();

			// Set cloning
			this.clone = this.opts.clone === true ? ___default['default'].cloneDeep : this.opts.clone;
		}

		/**
		 * Initialize cacher
		 *
		 * @param {any} broker
		 *
		 * @memberof MemoryCacher
		 */
		init(broker) {
			super.init(broker);

			broker.localBus.on("$transporter.connected", () => {
				// Clear all entries after transporter connected. Maybe we missed some "cache.clear" events.
				return this.clean();
			});
		}

		/**
		 * Close cacher
		 *
		 * @memberof MemoryCacher
		 */
		close() {
			clearInterval(this.timer);
			return Promise.resolve();
		}

		/**
		 * Get data from cache by key
		 *
		 * @param {any} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		get(key) {
			this.logger.debug(`GET ${key}`);
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_GET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_GET_TIME);

			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);
				this.metrics.increment(METRIC$3.MOLECULER_CACHER_FOUND_TOTAL);

				let item = this.cache.get(key);
				if (item.expire && item.expire < Date.now()) {
					this.logger.debug(`EXPIRED ${key}`);
					this.metrics.increment(METRIC$3.MOLECULER_CACHER_EXPIRED_TOTAL);
					this.cache.delete(key);
					timeEnd();
					return this.broker.Promise.resolve(null);
				}
				const res = this.clone ? this.clone(item.data) : item.data;
				timeEnd();

				return this.broker.Promise.resolve(res);
			} else {
				timeEnd();
			}
			return this.broker.Promise.resolve(null);
		}

		/**
		 * Save data to cache by key
		 *
		 * @param {String} key
		 * @param {any} data JSON object
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		set(key, data, ttl) {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_SET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_SET_TIME);

			if (ttl == null)
				ttl = this.opts.ttl;

			this.cache.set(key, {
				data,
				expire: ttl ? Date.now() + ttl * 1000 : null
			});

			timeEnd();
			this.logger.debug(`SET ${key}`);

			return this.broker.Promise.resolve(data);
		}

		/**
		 * Delete a key from cache
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		del(keys) {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_DEL_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_DEL_TIME);

			keys = Array.isArray(keys) ? keys : [keys];
			keys.forEach(key => {
				this.cache.delete(key);
				this.logger.debug(`REMOVE ${key}`);
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Clean cache. Remove every key by match
		 * @param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		clean(match = "**") {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_CLEAN_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_CLEAN_TIME);

			const matches = Array.isArray(match) ? match : [match];
			this.logger.debug(`CLEAN ${matches.join(", ")}`);

			this.cache.forEach((value, key) => {
				if (matches.some(match => utils_1.match(key, match))) {
					this.logger.debug(`REMOVE ${key}`);
					this.cache.delete(key);
				}
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Get data and ttl from cache by key.
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		getWithTTL(key){
			this.logger.debug(`GET ${key}`);
			let data = null;
			let ttl = null;
			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);

				let item = this.cache.get(key);
				let now = Date.now();
				ttl = (item.expire - now)/1000;
				ttl = ttl > 0 ? ttl : null;
				if (this.opts.ttl) {
					// Update expire time (hold in the cache if we are using it)
					item.expire = now + this.opts.ttl * 1000;
				}
				data = this.clone ? this.clone(item.data) : item.data;
			}
			return this.broker.Promise.resolve({ data, ttl });
		}

		/**
		 * Acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		lock(key, ttl) {
			return this._lock.acquire(key, ttl).then(()=> {
				return ()=>this._lock.release(key);
			});
		}

		/**
		 * Try to acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		tryLock(key, ttl) {
			if(this._lock.isLocked(key)){
				return this.broker.Promise.reject(new Error("Locked."));
			}
			return this._lock.acquire(key, ttl).then(()=> {
				return ()=>this._lock.release(key);
			});
		}

		/**
		 * Check & remove the expired cache items
		 *
		 * @memberof MemoryCacher
		 */
		checkTTL() {
			let now = Date.now();
			this.cache.forEach((value, key) => {
				let item = this.cache.get(key);

				if (item.expire && item.expire < now) {
					this.logger.debug(`EXPIRED ${key}`);
					this.metrics.increment(METRIC$3.MOLECULER_CACHER_EXPIRED_TOTAL);
					this.cache.delete(key);
				}
			});
		}
	}

	var memory = MemoryCacher;

	const { METRIC: METRIC$4 }	= metrics;


	/**
	 * Cacher factory for memory cache
	 *
	 * @class MemoryLRUCacher
	 */
	class MemoryLRUCacher extends base$6 {

		/**
		 * Creates an instance of MemoryLRUCacher.
		 *
		 * @param {object} opts
		 *
		 * @memberof MemoryLRUCacher
		 */
		constructor(opts) {
			super(opts);

			// Cache container
			this.cache = new LRU__default['default']({
				max: this.opts.max,
				maxAge: this.opts.ttl ? this.opts.ttl * 1000 : null,
				updateAgeOnGet: !!this.opts.ttl
			});
			// Async lock
			this._lock = new lock();
			// Start TTL timer
			this.timer = timersBrowserify.setInterval(() => {
				/* istanbul ignore next */
				this.checkTTL();
			}, 30 * 1000);
			this.timer.unref();

			// Set cloning
			this.clone = this.opts.clone === true ? ___default['default'].cloneDeep : this.opts.clone;
		}

		/**
		 * Initialize cacher
		 *
		 * @param {any} broker
		 *
		 * @memberof MemoryLRUCacher
		 */
		init(broker) {
			super.init(broker);

			broker.localBus.on("$transporter.connected", () => {
				// Clear all entries after transporter connected. Maybe we missed some "cache.clear" events.
				return this.clean();
			});
			if(this.opts.lock && this.opts.lock.enabled !== false && this.opts.lock.staleTime){
				/* istanbul ignore next */
				this.logger.warn("setting lock.staleTime with MemoryLRUCacher is not supported.");
			}
		}

		/**
		 * Close cacher
		 *
		 * @memberof MemoryLRUCacher
		 */
		close() {
			clearInterval(this.timer);
			return Promise.resolve();
		}

		/**
		 * Get data from cache by key
		 *
		 * @param {any} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		get(key) {
			this.logger.debug(`GET ${key}`);
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_GET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_GET_TIME);

			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);
				this.metrics.increment(METRIC$4.MOLECULER_CACHER_FOUND_TOTAL);

				let item = this.cache.get(key);
				const res = this.clone ? this.clone(item) : item;
				timeEnd();

				return this.broker.Promise.resolve(res);
			} else {
				timeEnd();
			}
			return this.broker.Promise.resolve(null);
		}

		/**
		 * Save data to cache by key
		 *
		 * @param {String} key
		 * @param {any} data JSON object
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		set(key, data, ttl) {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_SET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_SET_TIME);

			if (ttl == null)
				ttl = this.opts.ttl;

			this.cache.set(key, data, ttl ? ttl * 1000 : null);

			timeEnd();
			this.logger.debug(`SET ${key}`);

			return this.broker.Promise.resolve(data);
		}

		/**
		 * Delete a key from cache
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		del(keys) {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_DEL_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_DEL_TIME);

			keys = Array.isArray(keys) ? keys : [keys];
			keys.forEach(key => {
				this.cache.del(key);
				this.logger.debug(`REMOVE ${key}`);
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Clean cache. Remove every key by match
		 * @param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		clean(match = "**") {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_CLEAN_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_CLEAN_TIME);

			const matches = Array.isArray(match) ? match : [match];
			this.logger.debug(`CLEAN ${matches.join(", ")}`);

			this.cache.keys().forEach(key => {
				if (matches.some(match => utils_1.match(key, match))) {
					this.logger.debug(`REMOVE ${key}`);
					this.cache.del(key);
				}
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}
		/**
		 * Get data and ttl from cache by key.
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		getWithTTL(key){
			// There are no way to get the ttl of LRU cache :(
			return this.get(key).then(data=>{
				return { data, ttl: null };
			});
		}

		/**
		 * Acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */

		lock(key, ttl) {
			return this._lock.acquire(key, ttl).then(()=> {
				return ()=>this._lock.release(key);
			});
		}

		/**
		 * Try to acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		tryLock(key, ttl) {
			if(this._lock.isLocked(key)){
				return this.broker.Promise.reject(new Error("Locked."));
			}
			return this._lock.acquire(key, ttl).then(()=> {
				return ()=>this._lock.release(key);
			});
		}


		/**
		 * Check & remove the expired cache items
		 *
		 * @memberof MemoryLRUCacher
		 */
		checkTTL() {
			this.cache.prune();
		}
	}

	var memoryLru = MemoryLRUCacher;

	const { isObject: isObject$8, isString: isString$9 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$6 } = errors;

	const Cachers = {
		Base: base$6,
		Memory: memory,
		MemoryLRU: memoryLru,
		Redis: require$$19
	};

	function getByName$6(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Cachers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Cachers[n];
	}

	/**
	 * Resolve cacher by name
	 *
	 * @param {object|string} opt
	 * @returns {Cacher}
	 */
	function resolve$6(opt) {
		if (opt instanceof Cachers.Base) {
			return opt;
		} else if (opt === true) {
			return new Cachers.Memory();
		} else if (isString$9(opt)) {
			let CacherClass = getByName$6(opt);
			if (CacherClass)
				return new CacherClass();

			if (opt.startsWith("redis://"))
				CacherClass = Cachers.Redis;

			if (CacherClass)
				return new CacherClass(opt);
			else
				throw new BrokerOptionsError$6(`Invalid cacher type '${opt}'.`, { type: opt });

		} else if (isObject$8(opt)) {
			let CacherClass = getByName$6(opt.type || "Memory");
			if (CacherClass)
				return new CacherClass(opt.options);
			else
				throw new BrokerOptionsError$6(`Invalid cacher type '${opt.type}'.`, { type: opt.type });
		}

		return null;
	}

	function register$6(name, value) {
		Cachers[name] = value;
	}

	var cachers = Object.assign(Cachers, { resolve: resolve$6, register: register$6 });

	const { flatten } = utils_1;
	const { BrokerDisconnectedError } = errors;

	/**
	 * Base Transporter class
	 *
	 * @class BaseTransporter
	 */
	class BaseTransporter {

		/**
		 * Creates an instance of BaseTransporter.
		 *
		 * @param {any} opts
		 *
		 * @memberof BaseTransporter
		 */
		constructor(opts) {
			this.opts = opts;
			this.connected = false;
			this.hasBuiltInBalancer = false;
		}

		/**
		 * Init transporter
		 *
		 * @param {Transit} transit
		 * @param {Function} messageHandler
		 * @param {Function} afterConnect
		 *
		 * @memberof BaseTransporter
		 */
		init(transit, messageHandler, afterConnect) {
			if (transit) {
				this.transit = transit;
				this.broker = transit.broker;
				this.nodeID = transit.nodeID;
				this.logger = this.broker.getLogger("transporter");

				this.prefix = "MOL";
				if (this.broker.namespace)
					this.prefix += "-" + this.broker.namespace;

			}
			this.messageHandler = messageHandler;
			this.afterConnect = afterConnect;
		}

		/**
		 * Connect to the transporter server
		 *
		 * @memberof BaseTransporter
		 */
		connect() {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Event handler for connected.
		 *
		 * @param {any} wasReconnect
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		onConnected(wasReconnect) {
			this.connected = true;
			if (this.afterConnect) {
				return this.afterConnect(wasReconnect);
			}

			return this.broker.Promise.resolve();
		}

		/**
		 * Disconnect from the transporter server
		 *
		 * @memberof BaseTransporter
		 */
		disconnect() {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to all topics
		 *
		 * @param {Array<Object>} topics
		 *
		 * @memberof BaseTransporter
		 */
		makeSubscriptions(topics) {
			return this.broker.Promise.all(topics.map(({ cmd, nodeID }) => this.subscribe(cmd, nodeID)));
		}

		/**
		 * Process incoming messages
		 *
		 * @param {String} cmd
		 * @param {Buffer} msg
		 * @returns
		 * @memberof BaseTransporter
		 */
		incomingMessage(cmd, msg) {
			if (!msg) return;
			try {
				const packet = this.deserialize(cmd, msg);
				return this.messageHandler(cmd, packet);
			} catch(err) {
				this.logger.warn("Invalid incoming packet. Type:", cmd, err);
				this.logger.debug("Content:", msg.toString ? msg.toString() : msg);
			}
		}

		/**
		 * Received data. It's a wrapper for middlewares.
		 * @param {String} cmd
		 * @param {Buffer} data
		 */
		receive(cmd, data) {
			return this.incomingMessage(cmd, data);
		}

		/**
		 * Subscribe to a command
		 *
		 * @param {String} cmd
		 * @param {String} nodeID
		 *
		 * @memberof BaseTransporter
		 */
		subscribe(/*cmd, nodeID*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to balanced action commands
		 *
		 * @param {String} action
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedRequest(/*action*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to balanced event command
		 *
		 * @param {String} event
		 * @param {String} group
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedEvent(/*event, group*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Unsubscribe all balanced request and event commands
		 *
		 * @memberof BaseTransporter
		 */
		unsubscribeFromBalancedCommands() {
			/* istanbul ignore next */
			return this.broker.Promise.resolve();
		}

		/**
		 * Publish a normal not balanced packet
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publish(packet) {
			const topic = this.getTopicName(packet.type, packet.target);
			const data = this.serialize(packet);

			return this.send(topic, data, { packet });
		}

		/**
		 * Publish a balanced EVENT packet to a balanced queue
		 *
		 * @param {Packet} packet
		 * @param {String} group
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publishBalancedEvent(packet, group) {
			const topic = `${this.prefix}.${packets.PACKET_EVENT}B.${group}.${packet.payload.event}`;
			const data = this.serialize(packet);

			return this.send(topic, data, { packet, balanced: true });
		}

		/**
		 * Publish a balanced REQ packet to a balanced queue
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publishBalancedRequest(packet) {
			const topic = `${this.prefix}.${packets.PACKET_REQUEST}B.${packet.payload.action}`;
			const data = this.serialize(packet);

			return this.send(topic, data, { packet, balanced: true });
		}

		/**
		 * Send data buffer.
		 *
		 * @param {String} topic
		 * @param {Buffer} data
		 * @param {Object} meta
		 *
		 * @returns {Promise}
		 */
		send(/*topic, data, meta*/) {
			throw new Error("Not implemented!");
		}

		/**
		 * Get topic name from command & target nodeID
		 *
		 * @param {any} cmd
		 * @param {any} nodeID
		 *
		 * @memberof BaseTransporter
		 */
		getTopicName(cmd, nodeID) {
			return this.prefix + "." + cmd + (nodeID ? "." + nodeID : "");
		}

		/**
		 * Initialize queues for REQUEST & EVENT packets.
		 *
		 * @memberof AmqpTransporter
		 */
		makeBalancedSubscriptions() {
			if (!this.hasBuiltInBalancer) return this.broker.Promise.resolve();

			return this.unsubscribeFromBalancedCommands().then(() => {
				const services = this.broker.getLocalNodeInfo().services;
				return this.broker.Promise.all(services.map(service => {
					const p = [];

					// Service actions queues
					if (service.actions && typeof(service.actions) == "object") {
						p.push(Object.keys(service.actions).map(action => this.subscribeBalancedRequest(action)));
					}

					// Load-balanced/grouped events queues
					if (service.events && typeof(service.events) == "object") {
						p.push(Object.keys(service.events).map(event => {
							const group = service.events[event].group || service.name;
							this.subscribeBalancedEvent(event, group);
						}));
					}

					return this.broker.Promise.all(___default['default'].compact(flatten(p, true)));
				}));
			});
		}

		/**
		 * Prepublish a packet. Handle balancing.
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		prepublish(packet) {
			// Safely handle disconnected state
			if (!this.connected) {
				// For packets that are triggered intentionally by users, throw a retryable error.
				if ([packets.PACKET_REQUEST, packets.PACKET_EVENT, packets.PACKET_PING].includes(packet.type)) {
					return this.broker.Promise.reject(new BrokerDisconnectedError());
				}

				// For internal packets like INFO and HEARTBEATS, skip sending and don't throw
				else {
					return this.broker.Promise.resolve();
				}
			}

			if (packet.type === packets.PACKET_EVENT && packet.target == null && packet.payload.groups) {
				const groups = packet.payload.groups;
				// If the packet contains groups, we don't send the packet to
				// the targetted node, but we push them to the event group queues
				// and AMQP will load-balanced it.
				if (groups.length > 0) {
					groups.forEach(group => {
						// Change the groups to this group to avoid multi handling in consumers.
						packet.payload.groups = [group];
						this.publishBalancedEvent(packet, group);
					});
					return this.broker.Promise.resolve();
				}
				// If it's not contain, then it is a broadcasted event,
				// we sent it in the normal way (exchange)

			} else if (packet.type === packets.PACKET_REQUEST && packet.target == null) {
				return this.publishBalancedRequest(packet);
			}

			// Normal packet publishing...
			return this.publish(packet);
		}

		/**
		 * Serialize the Packet to Buffer
		 *
		 * @param {Packet} packet
		 * @returns {Buffer}
		 *
		 * @memberof Transit
		 */
		serialize(packet) {
			packet.payload.ver = this.broker.PROTOCOL_VERSION;
			packet.payload.sender = this.nodeID;
			return this.broker.serializer.serialize(packet.payload, packet.type);
		}

		/**
		 * Deserialize the incoming Buffer to Packet
		 *
		 * @param {String} type
		 * @param {Buffer} buf
		 * @returns {Packet}
		 *
		 * @memberof Transit
		 */
		deserialize(type, buf) {
			if (buf == null) return null;

			const msg = this.broker.serializer.deserialize(buf, type);
			return new packets.Packet(type, null, msg);

		}
	}

	var base$7 = BaseTransporter;

	const EventEmitter2 = EE__default['default'].EventEmitter2;

	// Put to global to transfer messages between brokers in the same process
	commonjsGlobal.bus = new EventEmitter2({
		wildcard: true,
		maxListeners: 100
	});

	/**
	 * Fake Transporter
	 *
	 * @class FakeTransporter
	 * @extends {Transporter}
	 */
	class FakeTransporter extends base$7 {

		/**
		 * Creates an instance of FakeTransporter.
		 *
		 * @param {any} opts
		 *
		 * @memberof FakeTransporter
		 */
		constructor(opts) {
			super(opts);

			// Local event bus
			this.bus = commonjsGlobal.bus;
			this.hasBuiltInBalancer = true;

			this.subscriptions = [];
		}

		/**
		 * Connect to a NATS server
		 *
		 * @memberof FakeTransporter
		 */
		connect() {
			return this.onConnected();
		}

		/**
		 * Disconnect from a NATS server
		 *
		 * @memberof FakeTransporter
		 */
		disconnect() {
			this.connected = false;
			this.subscriptions.forEach(({ topic, handler }) => this.bus.off(topic, handler));
			this.subscriptions = [];

			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to a command
		 *
		 * @param {String} cmd
		 * @param {String} nodeID
		 *
		 * @memberof FakeTransporter
		 */
		subscribe(cmd, nodeID) {
			const t = this.getTopicName(cmd, nodeID);
			const handler = msg => this.receive(cmd, msg);
			this.subscriptions.push({ topic: t, handler });

			this.bus.on(t, handler);
			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to balanced action commands
		 *
		 * @param {String} action
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedRequest(/*action*/) {
			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to balanced event command
		 *
		 * @param {String} event
		 * @param {String} group
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedEvent(/*event, group*/) {
			return this.broker.Promise.resolve();
		}

		/**
		 * Send data buffer.
		 *
		 * @param {String} topic
		 * @param {Buffer} data
		 * @param {Object} meta
		 *
		 * @returns {Promise}
		 */
		send(topic, data) {
			this.bus.emit(topic, data);
			return this.broker.Promise.resolve();
		}
	}

	var fake = FakeTransporter;

	const { isObject: isObject$9, isString: isString$a } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$7 } = errors;

	const Transporters = {
		Base: base$7,
		Fake: fake,
		NATS: require$$19,
		MQTT: require$$19,
		Redis: require$$19,
		AMQP: require$$19,
		AMQP10: require$$19,
		Kafka: require$$19,
		STAN: require$$19,
		TCP: require$$19
	};

	function getByName$7(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Transporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Transporters[n];
	}

	/**
	 * Resolve transporter by name
	 *
	 * @param {object|string} opt
	 * @returns {Transporter}
	 */
	function resolve$7(opt) {
		if (opt instanceof Transporters.Base) {
			return opt;
		} else if (isString$a(opt)) {
			let TransporterClass = getByName$7(opt);
			if (TransporterClass)
				return new TransporterClass();

			if (opt.startsWith("nats://"))
				TransporterClass = Transporters.NATS;
			else if (opt.startsWith("mqtt://") || opt.startsWith("mqtts://"))
				TransporterClass = Transporters.MQTT;
			else if (opt.startsWith("redis://") || opt.startsWith("rediss://"))
				TransporterClass = Transporters.Redis;
			else if (opt.startsWith("amqp://") || opt.startsWith("amqps://"))
				TransporterClass = Transporters.AMQP;
			else if (opt.startsWith("amqp10://"))
				TransporterClass = Transporters.AMQP10;
			else if (opt.startsWith("kafka://"))
				TransporterClass = Transporters.Kafka;
			else if (opt.startsWith("stan://"))
				TransporterClass = Transporters.STAN;
			else if (opt.startsWith("tcp://"))
				TransporterClass = Transporters.TCP;

			if (TransporterClass)
				return new TransporterClass(opt);
			else
				throw new BrokerOptionsError$7(`Invalid transporter type '${opt}'.`, { type: opt });

		} else if (isObject$9(opt)) {
			let TransporterClass = getByName$7(opt.type || "NATS");

			if (TransporterClass)
				return new TransporterClass(opt.options);
			else
				throw new BrokerOptionsError$7(`Invalid transporter type '${opt.type}'.`, { type: opt.type });
		}

		return null;
	}

	function register$7(name, value) {
		Transporters[name] = value;
	}


	var transporters = Object.assign(Transporters, { resolve: resolve$7, register: register$7 });

	/**
	 * Abstract serializer class
	 *
	 * @class Serializer
	 */
	class Serializer {

		/**
		 * Creates an instance of Serializer.
		 *
		 * @memberof Serializer
		 */
		constructor() {
		}

		/**
		 * Initialize Serializer
		 *
		 * @param {any} broker
		 *
		 * @memberof Serializer
		 */
		init(broker) {
			this.broker = broker;
			/*if (this.broker) {
				this.logger = broker.getLogger("serializer");
			}*/
		}

		/**
		 * Serializer a JS object to Buffer
		 *
		 * @param {Object} obj
		 * @param {String} type of packet
		 * @returns {Buffer}
		 *
		 * @memberof Serializer
		 */
		serialize(/*obj, type*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Deserialize Buffer to JS object
		 *
		 * @param {Buffer} buf
		 * @param {String} type of packet
		 * @returns {Object}
		 *
		 * @memberof Serializer
		 */
		deserialize(/*buf, type*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Serialize custom fields (stringify)
		 *
		 * @param {String} type
		 * @param {Packet} obj
		 * @returns {Packet}
		 * @memberof Serializer
		 */
		serializeCustomFields(type, obj) {
			switch (type) {
				case packets.PACKET_INFO: {
					obj.services = JSON.stringify(obj.services);
					if (obj.config)
						obj.config = JSON.stringify(obj.config);
					if (obj.metadata)
						obj.metadata = JSON.stringify(obj.metadata);
					break;
				}
				case packets.PACKET_EVENT: {
					this.convertDataToTransport(obj, "data", "dataType");
					obj.meta = JSON.stringify(obj.meta);
					break;
				}
				case packets.PACKET_REQUEST: {
					this.convertDataToTransport(obj, "params", "paramsType");
					obj.meta = JSON.stringify(obj.meta);
					break;
				}
				case packets.PACKET_RESPONSE: {
					this.convertDataToTransport(obj, "data", "dataType");
					obj.meta = JSON.stringify(obj.meta);
					if (obj.error)
						obj.error = JSON.stringify(obj.error);
					break;
				}
				case packets.PACKET_GOSSIP_REQ: {
					if (obj.online)
						obj.online = JSON.stringify(obj.online);
					if (obj.offline)
						obj.offline = JSON.stringify(obj.offline);
					break;
				}
				case packets.PACKET_GOSSIP_RES: {
					if (obj.online)
						obj.online = JSON.stringify(obj.online);
					if (obj.offline)
						obj.offline = JSON.stringify(obj.offline);
					break;
				}
			}

			return obj;
		}

		/**
		 * Deserialize custom fields
		 *
		 * @param {String} type
		 * @param {Packet} obj
		 * @returns {Packet}
		 * @memberof Serializer
		 */
		deserializeCustomFields(type, obj) {
			switch (type) {
				case packets.PACKET_INFO: {
					obj.services = JSON.parse(obj.services);
					if (obj.config)
						obj.config = JSON.parse(obj.config);
					if (obj.metadata)
						obj.metadata = JSON.parse(obj.metadata);
					break;
				}
				case packets.PACKET_EVENT: {
					this.convertDataFromTransport(obj, "data", "dataType");
					obj.meta = JSON.parse(obj.meta);
					break;
				}
				case packets.PACKET_REQUEST: {
					this.convertDataFromTransport(obj, "params", "paramsType");
					obj.meta = JSON.parse(obj.meta);
					break;
				}
				case packets.PACKET_RESPONSE: {
					this.convertDataFromTransport(obj, "data", "dataType");
					obj.meta = JSON.parse(obj.meta);
					if (obj.error)
						obj.error = JSON.parse(obj.error);
					break;
				}
				case packets.PACKET_GOSSIP_REQ: {
					if (obj.online)
						obj.online = JSON.parse(obj.online);
					if (obj.offline)
						obj.offline = JSON.parse(obj.offline);
					break;
				}
				case packets.PACKET_GOSSIP_RES: {
					if (obj.online)
						obj.online = JSON.parse(obj.online);
					if (obj.offline)
						obj.offline = JSON.parse(obj.offline);
					break;
				}
			}

			return obj;
		}

		convertDataToTransport(obj, field, fieldType) {
			if (obj[field] === undefined) {
				obj[fieldType] = packets.DATATYPE_UNDEFINED;
			} else if (obj[field] === null) {
				obj[fieldType] = packets.DATATYPE_NULL;
			} else if (buffer.Buffer.isBuffer(obj[field])) {
				obj[fieldType] = packets.DATATYPE_BUFFER;
			} else {
				// JSON
				obj[fieldType] = packets.DATATYPE_JSON;
				obj[field] = buffer.Buffer.from(JSON.stringify(obj[field]));
			}
		}

		convertDataFromTransport(obj, field, fieldType) {
			const type = obj[fieldType];
			switch(type) {
				case packets.DATATYPE_UNDEFINED: {
					obj[field] = undefined;
					break;
				}
				case packets.DATATYPE_NULL: {
					obj[field] = null;
					break;
				}
				case packets.DATATYPE_BUFFER: {
					if (!buffer.Buffer.isBuffer(obj[field]))
						obj[field] = buffer.Buffer.from(obj[field]);
					break;
				}
				default: {
					// JSON
					obj[field] = JSON.parse(obj[field]);
					break;
				}
			}

			delete obj[fieldType];
		}
	}

	var base$8 = Serializer;

	/**
	 * JSON serializer for Moleculer
	 *
	 * @class JSONSerializer
	 */
	class JSONSerializer extends base$8 {

		/**
		 * Creates an instance of JSONSerializer.
		 *
		 * @memberof JSONSerializer
		 */
		constructor() {
			super();
		}

		/**
		 * Serializer a JS object to Buffer
		 *
		 * @param {Object} obj
		 * @param {String} type of packet
		 * @returns {Buffer}
		 *
		 * @memberof Serializer
		 */
		serialize(obj) {
			return buffer.Buffer.from(JSON.stringify(obj));
		}

		/**
		 * Deserialize Buffer to JS object
		 *
		 * @param {Buffer} buf
		 * @param {String} type of packet
		 * @returns {Object}
		 *
		 * @memberof Serializer
		 */
		deserialize(buf) {
			return JSON.parse(buf);
		}
	}

	var json = JSONSerializer;

	const { isObject: isObject$a, isString: isString$b } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$8 } = errors;

	const Serializers = {
		Base: base$8,
		JSON: json,
		Avro: require$$19,
		MsgPack: require$$19,
		ProtoBuf: require$$19,
		Thrift: require$$19,
		Notepack: require$$19
	};

	function getByName$8(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Serializers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Serializers[n];
	}

	/**
	 * Resolve serializer by name
	 *
	 * @param {object|string} opt
	 * @returns {Serializer}
	 * @memberof ServiceBroker
	 */
	function resolve$8(opt) {
		if (opt instanceof Serializers.Base) {
			return opt;
		} else if (isString$b(opt)) {
			let SerializerClass = getByName$8(opt);
			if (SerializerClass)
				return new SerializerClass();
			else
				throw new BrokerOptionsError$8(`Invalid serializer type '${opt}'.`, { type: opt });

		} else if (isObject$a(opt)) {
			let SerializerClass = getByName$8(opt.type || "JSON");
			if (SerializerClass)
				return new SerializerClass(opt.options);
			else
				throw new BrokerOptionsError$8(`Invalid serializer type '${opt.type}'.`, { type: opt.type });
		}

		return new Serializers.JSON();
	}

	function register$8(name, value) {
		Serializers[name] = value;
	}

	var serializers = Object.assign(Serializers, { resolve: resolve$8, register: register$8 });

	var name = "moleculer";
	var version = "0.14.11";
	var description = "Fast & powerful microservices framework for Node.JS";
	var main = "index.js";
	var scripts = {
		bench: "node benchmark/index.js",
		ci: "jest --watch",
		coverall: "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
		demo: "node examples/index.js",
		deps: "npm-check -u",
		postdeps: "npm run lint:lock && npm test",
		dev: "nodemon dev/index.js",
		lint: "eslint --ext=.js src test/unit test/integration",
		"lint:lock": "lockfile-lint --path package-lock.json --type npm --validate-https --allowed-hosts npm",
		"lint:fix": "eslint --fix --ext=.js src test/unit test/integration",
		perf: "nodemon --allow-natives-syntax benchmark/perf-runner.js",
		pperf: "node --inspect --expose-gc benchmark/perf-runner.js",
		memleak: "node benchmark/memleak-test.js",
		proto: "pbjs -t static-module -w commonjs -o src/serializers/proto/packets.proto.js src/serializers/proto/packets.proto",
		thrift: "thrift -gen js:node -o src\\serializers\\thrift src\\serializers\\thrift\\packets.thrift",
		test: "node --max-old-space-size=4096 ./node_modules/jest-cli/bin/jest.js --coverage --all --forceExit --logHeapUsage",
		"test:travis": "npm test && npm run test:trans && npm run test:amqp && npm run test:nats && npm run test:ts",
		"test:unit": "jest --testMatch \"**/unit/**/*.spec.js\" --coverage",
		"test:int": "jest --testMatch \"**/integration/**/*.spec.js\" --coverage",
		"test:amqp": "jest --testMatch \"**/transporters/amqp/**spc.js\" --runInBand",
		"test:amqp10": "jest --testMatch \"**/transporters/amqp10/**spc.js\" --runInBand",
		"test:nats": "jest --testMatch \"**/transporters/nats/**spc.js\" --runInBand",
		"test:trans": "jest --testMatch \"**/transporters/index.spc.js\"",
		"test:project": "jest --testMatch \"**/project/**/*.spec.js\"",
		"test:ts": "tsd && tsc -p test/typescript/hello-world && ts-node -P test/typescript/hello-world/tsconfig.json test/typescript/hello-world/index.ts",
		release: "npm publish --access public && git push --tags",
		"release:beta": "npm publish --tag next --access public && git push --tags"
	};
	var keywords = [
		"microservice",
		"microservices",
		"framework",
		"backend",
		"messagebus",
		"rpc",
		"services",
		"micro",
		"pubsub",
		"scalable",
		"distributed"
	];
	var repository = {
		type: "git",
		url: "https://github.com/moleculerjs/moleculer.git"
	};
	var funding = "https://github.com/moleculerjs/moleculer?sponsor=1";
	var bin = {
		"moleculer-runner": "./bin/moleculer-runner.js"
	};
	var author = "Icebob";
	var license = "MIT";
	var devDependencies = {
		"@sinonjs/fake-timers": "^6.0.1",
		"@types/bunyan": "^1.8.6",
		"@types/ioredis": "^4.17.4",
		"@types/node": "^14.11.2",
		"@types/pino": "^6.3.1",
		amqplib: "^0.6.0",
		avsc: "^5.4.22",
		benchmarkify: "^2.1.2",
		bunyan: "^1.8.14",
		coveralls: "^3.1.0",
		"dd-trace": "^0.26.1",
		debug: "^4.2.0",
		dotenv: "^8.2.0",
		eslint: "^7.10.0",
		"eslint-plugin-node": "^11.1.0",
		"eslint-plugin-promise": "^4.2.1",
		"eslint-plugin-security": "^1.4.0",
		etcd3: "^1.0.2",
		"event-loop-stats": "^1.3.0",
		fakerator: "^0.3.1",
		"gc-stats": "^1.4.0",
		ioredis: "^4.17.3",
		"jaeger-client": "^3.18.1",
		jest: "^26.4.2",
		"jest-cli": "^26.4.2",
		joi: "^17.2.1",
		"kafka-node": "^5.0.0",
		"lockfile-lint": "^4.3.7",
		log4js: "^6.3.0",
		"moleculer-repl": "^0.6.4",
		mqtt: "^4.2.1",
		msgpack5: "^4.2.1",
		nats: "^1.4.12",
		"node-nats-streaming": "^0.0.51",
		nodemon: "^2.0.4",
		"notepack.io": "^2.3.0",
		"npm-check": "^5.9.2",
		pino: "^6.6.1",
		protobufjs: "^6.10.1",
		redlock: "^4.1.0",
		"rhea-promise": "^1.0.0",
		supertest: "^5.0.0",
		thrift: "^0.12.0",
		"ts-node": "^9.0.0",
		tsd: "^0.13.1",
		typescript: "^4.0.3",
		"v8-natives": "^1.2.0",
		winston: "^3.3.3",
		"winston-context": "^0.0.7"
	};
	var dependencies = {
		args: "^5.0.1",
		"es6-error": "^4.1.1",
		eventemitter2: "^6.4.3",
		"fastest-validator": "^1.7.0",
		"fn-args": "^5.0.0",
		glob: "^7.1.6",
		"ipaddr.js": "^2.0.0",
		kleur: "^4.1.2",
		lodash: "^4.17.20",
		"lru-cache": "^6.0.0",
		"node-fetch": "^2.6.1"
	};
	var engines = {
		node: ">= 10.x.x"
	};
	var types$1 = "./index.d.ts";
	var tsd = {
		directory: "test/typescript/tsd"
	};
	var jest = {
		coverageDirectory: "../coverage",
		coveragePathIgnorePatterns: [
			"/node_modules/",
			"/test/services/",
			"/test/typescript/",
			"/test/unit/utils.js",
			"/src/serializers/proto/",
			"/src/serializers/thrift/"
		],
		transform: {
		},
		testEnvironment: "node",
		rootDir: "./src",
		roots: [
			"../test"
		]
	};
	var require$$7 = {
		name: name,
		version: version,
		description: description,
		main: main,
		scripts: scripts,
		keywords: keywords,
		repository: repository,
		funding: funding,
		bin: bin,
		author: author,
		license: license,
		devDependencies: devDependencies,
		dependencies: dependencies,
		engines: engines,
		types: types$1,
		tsd: tsd,
		jest: jest
	};

	const { getIpList: getIpList$1 } = utils_1;
	const MOLECULER_VERSION = require$$7.version;

	const getClientInfo = () => {
		return {
			type: "browser",
			version: MOLECULER_VERSION,
			langVersion: proc.version
		};
	};

	const getCpuInfo = () => {
		const cpus = os.cpus();
		const load = os.loadavg();
		const cpu = {
			load1: load[0],
			load5: load[1],
			load15: load[2],
			cores: Array.isArray(cpus) ? os.cpus().length : null,
		};
		cpu.utilization = Math.min(Math.floor(load[0] * 100 / cpu.cores), 100);

		return cpu;
	};

	const getMemoryInfo = () => {
		const mem = {
			free: os.freemem(),
			total: os.totalmem()
		};
		mem.percent = (mem.free * 100 / mem.total);

		return mem;
	};

	const getUserInfo$1 = () => {
		try {
			return os.userInfo();
		} catch (e) {
			return {};
		}
	};

	const getOsInfo = () => {
		return {
			uptime: os.uptime(),
			type: os.type(),
			release: os.release(),
			hostname: os.hostname(),
			arch: os.arch(),
			platform: os.platform(),
			user: getUserInfo$1()
		};
	};

	const getProcessInfo = () => {
		return {
			pid: proc.pid,
			memory: proc.memoryUsage(),
			uptime: proc.uptime(),
			argv: proc.argv
		};
	};

	const getNetworkInterfacesInfo = () => {
		return {
			ip:  getIpList$1()
		};
	};

	const getDateTimeInfo = () => {
		return {
			now: Date.now(),
			iso: new Date().toISOString(),
			utc: new Date().toUTCString()
		};
	};

	const getHealthStatus = (/*broker*/) => {
		return {
			cpu: getCpuInfo(),
			mem: getMemoryInfo(),
			os: getOsInfo(),
			process: getProcessInfo(),
			client: getClientInfo(),
			net: getNetworkInterfacesInfo(),
			time: getDateTimeInfo()
		};
	};

	var health = {
		getHealthStatus,
		getCpuInfo,
		getMemoryInfo,
		getOsInfo,
		getProcessInfo,
		getClientInfo,
		getNetworkInterfacesInfo,
		getDateTimeInfo
	};

	const { isFunction: isFunction$5, isString: isString$c } = utils_1;

	var actionHook = function actionHookMiddleware(broker) {

		function callHook(hook, service, ctx, res) {
			if (isFunction$5(hook)) {
				return hook.call(service, ctx, res);
			} else if (Array.isArray(hook)) {
				return hook.reduce((p, fn) => p.then(res => fn.call(service, ctx, res)), broker.Promise.resolve(res));
			}
		}

		function callErrorHook(hook, service, ctx, err) {
			if (isFunction$5(hook)) {
				return hook.call(service, ctx, err);
			} else if (Array.isArray(hook)) {
				return hook.reduce((p, fn) => p.catch(err => fn.call(service, ctx, err)), broker.Promise.reject(err));
			}
		}

		/**
		 * Sanitize hooks. If the hook is a string, convert it to Service method calling.
		 *
		 * @param {Function|String|Array<any>} hooks
		 * @param {Service?} service
		 * @returns
		 */
		function sanitizeHooks(hooks, service) {
			if (isString$c(hooks))
				return service && isFunction$5(service[hooks]) ? service[hooks] : null;

			if (Array.isArray(hooks)) {
				return ___default['default'].compact(hooks.map(h => {
					if (isString$c(h))
						return service && isFunction$5(service[h]) ? service[h] : null;

					return h;
				}));
			}

			return hooks;
		}

		function wrapActionHookMiddleware(handler, action) {
			const name = action.rawName || action.name;
			const hooks = action.service && action.service.schema ? action.service.schema.hooks : null;
			if (hooks || action.hooks) {
				// Global hooks
				const beforeAllHook = hooks && hooks.before ? sanitizeHooks(hooks.before["*"], action.service) : null;
				const afterAllHook = hooks && hooks.after ? sanitizeHooks(hooks.after["*"], action.service) : null;
				const errorAllHook = hooks && hooks.error ? sanitizeHooks(hooks.error["*"], action.service) : null;

				// Hooks in service
				const beforeHook = hooks && hooks.before ? sanitizeHooks(hooks.before[name], action.service) : null;
				const afterHook = hooks && hooks.after ? sanitizeHooks(hooks.after[name], action.service) : null;
				const errorHook = hooks && hooks.error ? sanitizeHooks(hooks.error[name], action.service) : null;

				// Hooks in action definition
				const actionBeforeHook = action.hooks && action.hooks.before ? sanitizeHooks(action.hooks.before, action.service) : null;
				const actionAfterHook = action.hooks && action.hooks.after ? sanitizeHooks(action.hooks.after, action.service) : null;
				const actionErrorHook = action.hooks && action.hooks.error ? sanitizeHooks(action.hooks.error, action.service) : null;

				if (beforeAllHook || beforeHook || actionBeforeHook
					|| afterAllHook || afterHook || actionAfterHook
					|| errorAllHook || errorHook || actionErrorHook) {
					return function actionHookMiddleware(ctx) {
						let p = broker.Promise.resolve();

						// Before hook all
						if (beforeAllHook)
							p = p.then(() => callHook(beforeAllHook, ctx.service, ctx));

						// Before hook
						if (beforeHook)
							p = p.then(() => callHook(beforeHook, ctx.service, ctx));

						// Before hook in action definition
						if (actionBeforeHook)
							p = p.then(() => callHook(actionBeforeHook, ctx.service, ctx));

						// Action hook handler
						p = p.then(() => handler(ctx));

						// After hook in action definition
						if (actionAfterHook)
							p = p.then(res => callHook(actionAfterHook, ctx.service, ctx, res));

						// After hook
						if (afterHook)
							p = p.then(res => callHook(afterHook, ctx.service, ctx, res));

						// After hook all
						if (afterAllHook)
							p = p.then(res => callHook(afterAllHook, ctx.service, ctx, res));

						// Error hook in action definition
						if (actionErrorHook)
							p = p.catch(err => callErrorHook(actionErrorHook, ctx.service, ctx, err));

						// Error hook
						if (errorHook)
							p = p.catch(err => callErrorHook(errorHook, ctx.service, ctx, err));

						// Error hook all
						if (errorAllHook)
							p = p.catch(err => callErrorHook(errorAllHook, ctx.service, ctx, err));

						return p;
					};
				}
			}

			return handler;
		}

		return {
			name: "ActionHook",
			localAction: wrapActionHookMiddleware
		};
	};

	const { QueueIsFullError } = errors;
	const { METRIC: METRIC$5 }	= metrics;

	var bulkhead = function bulkheadMiddleware(broker) {

		function wrapActionBulkheadMiddleware(handler, action) {
			const service = action.service;

			const opts = Object.assign({}, this.options.bulkhead || {}, action.bulkhead || {});
			if (opts.enabled) {
				const queue = [];
				let currentInFlight = 0;

				// Call the next request from the queue
				const callNext = function callNext() {
				/* istanbul ignore next */
					if (queue.length == 0) return;

					/* istanbul ignore next */
					if (currentInFlight >= opts.concurrency) return;

					const item = queue.shift();

					currentInFlight++;
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });

					handler(item.ctx)
						.then(res => {
							currentInFlight--;
							broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
							broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });
							item.resolve(res);
							callNext();
						})
						.catch(err => {
							currentInFlight--;
							broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
							broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });
							item.reject(err);
							callNext();
						});
				};

				return function bulkheadMiddleware(ctx) {
				// Call handler without waiting
					if (currentInFlight < opts.concurrency) {
						currentInFlight++;
						broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
						broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });
						return handler(ctx)
							.then(res => {
								currentInFlight--;
								broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
								broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });
								callNext();
								return res;
							})
							.catch(err => {
								currentInFlight--;
								broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, { action: action.name, service: service.fullName });
								broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });
								callNext();
								return broker.Promise.reject(err);
							});
					}

					// Check whether the queue is full
					if (opts.maxQueueSize && queue.length >= opts.maxQueueSize) {
						return broker.Promise.reject(new QueueIsFullError({ action: ctx.action.name, nodeID: ctx.nodeID }));
					}

					// Store the request in the queue
					const p = new Promise((resolve, reject) => queue.push({ resolve, reject, ctx }));
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, { action: action.name, service: service.fullName });

					return p;

				}.bind(this);
			}

			return handler;
		}

		function wrapEventBulkheadMiddleware(handler, event) {
			const service = event.service;

			const opts = Object.assign({}, this.options.bulkhead || {}, event.bulkhead || {});
			if (opts.enabled) {
				const queue = [];
				let currentInFlight = 0;

				// Call the next request from the queue
				const callNext = function callNext() {
				/* istanbul ignore next */
					if (queue.length == 0) return;

					/* istanbul ignore next */
					if (currentInFlight >= opts.concurrency) return;

					const item = queue.shift();

					currentInFlight++;
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });

					handler(item.ctx)
						.then(res => {
							currentInFlight--;
							broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
							broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });
							item.resolve(res);
							callNext();
						})
						.catch(err => {
							currentInFlight--;
							broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
							broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });
							item.reject(err);
							callNext();
						});
				};

				return function bulkheadMiddleware(ctx) {
					// Call handler without waiting
					if (currentInFlight < opts.concurrency) {
						currentInFlight++;
						broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
						broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });
						return handler(ctx)
							.then(res => {
								currentInFlight--;
								broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
								broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });
								callNext();
								return res;
							})
							.catch(err => {
								currentInFlight--;
								broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, { event: event.name, service: service.fullName });
								broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });
								callNext();
								return broker.Promise.reject(err);
							});
					}

					// Check whether the queue is full
					if (opts.maxQueueSize && queue.length >= opts.maxQueueSize) {
						return broker.Promise.reject(new QueueIsFullError({ event: ctx.eventName, service: service.fullName, nodeID: ctx.nodeID }));
					}

					// Store the request in the queue
					const p = new Promise((resolve, reject) => queue.push({ resolve, reject, ctx }));
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, { event: event.name, service: service.fullName });

					return p;

				}.bind(this);
			}

			return handler;
		}


		return {
			name: "Bulkhead",

			created() {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({ name: METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, type: METRIC$5.TYPE_GAUGE, labelNames: ["action", "service"] });
					broker.metrics.register({ name: METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, type: METRIC$5.TYPE_GAUGE, labelNames: ["action", "service"] });

					broker.metrics.register({ name: METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, type: METRIC$5.TYPE_GAUGE, labelNames: ["event", "service"] });
					broker.metrics.register({ name: METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, type: METRIC$5.TYPE_GAUGE, labelNames: ["event", "service"] });
				}
			},

			localAction: wrapActionBulkheadMiddleware,
			localEvent: wrapEventBulkheadMiddleware
		};
	};

	const { GracefulStopTimeoutError } = errors;

	var contextTracker = function ContextTrackerMiddleware(broker) {

		function addContext(ctx) {
			if (ctx.service) {
			// Local request
				ctx.service._trackedContexts.push(ctx);
			} else {
			// Remote request
				ctx.broker._trackedContexts.push(ctx);
			}
		}

		function removeContext(ctx) {
			if (ctx.service) {
				const idx = ctx.service._trackedContexts.indexOf(ctx);
				if (idx !== -1)
					ctx.service._trackedContexts.splice(idx, 1);
			} else {
				const idx = ctx.broker._trackedContexts.indexOf(ctx);
				if (idx !== -1)
					ctx.broker._trackedContexts.splice(idx, 1);
			}
		}

		function wrapTrackerMiddleware(handler) {
			if (this.options.tracking && this.options.tracking.enabled) {

				return function ContextTrackerMiddleware(ctx) {

					const tracked = ctx.options.tracking != null ? ctx.options.tracking : this.options.tracking.enabled;

					// If no need to track
					if (!tracked)
						return handler(ctx);

					// Track the context
					addContext(ctx);

					// Call the handler
					let p = handler(ctx);

					p = p.then(res => {
						removeContext(ctx);
						return res;
					}).catch(err => {
						removeContext(ctx);
						throw err;
					});

					return p;
				}.bind(this);
			}

			return handler;
		}

		function waitingForActiveContexts(list, logger, time, service) {
			if (!list || list.length === 0)
				return broker.Promise.resolve();

			return new broker.Promise((resolve) => {
				let timedOut = false;
				const timeout = timersBrowserify.setTimeout(() => {
					timedOut = true;
					logger.error(new GracefulStopTimeoutError({ service }));
					list.length = 0; // Clear pointers
					resolve();
				}, time);

				let first = true;
				const checkForContexts = () => {
					if (list.length === 0) {
						clearTimeout(timeout);
						resolve();
					} else {
						if (first) {
							logger.warn(`Waiting for ${list.length} running context(s)...`);
							first = false;
						}
						if (!timedOut)
							timersBrowserify.setTimeout(checkForContexts, 100);
					}
				};
				setImmediate(checkForContexts);
			});
		}

		return {
			name: "ContextTracker",

			localAction: wrapTrackerMiddleware,
			remoteAction: wrapTrackerMiddleware,

			localEvent: wrapTrackerMiddleware,

			// After the broker created
			created(broker) {
				broker._trackedContexts = [];
			},

			// Before a local service started
			serviceStarting(service) {
				service._trackedContexts = [];
			},

			// Before a local service stopping
			serviceStopping(service) {
				return waitingForActiveContexts(service._trackedContexts, service.logger, service.settings.$shutdownTimeout || service.broker.options.tracking.shutdownTimeout, service);
			},

			// Before broker stopping
			stopping(broker) {
				return waitingForActiveContexts(broker._trackedContexts, broker.logger, broker.options.tracking.shutdownTimeout);
			},
		};
	};

	const { METRIC: METRIC$6 }	= metrics;

	var circuitBreaker = function circuitBreakerMiddleware(broker) {

		let windowTimer;
		const store = new Map();
		let logger;

		/**
		 * Create timer to clear endpoint store
		 *
		 * @param {Number} windowTime
		 */
		function createWindowTimer(windowTime) {
			if (!windowTimer) {
				windowTimer = timersBrowserify.setInterval(() => resetStore(), (windowTime || 60) * 1000);
				windowTimer.unref();
			}
		}

		/**
		 * Clear endpoint state store
		 */
		function resetStore() {
			if (!logger) return;

			logger.debug("Reset circuit-breaker endpoint states...");
			store.forEach((item, key) => {
				if (item.count == 0) {
					logger.debug(`Remove '${key}' endpoint state because it is not used`);
					store.delete(key);
					return;
				}

				logger.debug(`Clean '${key}' endpoint state.`);
				item.count = 0;
				item.failures = 0;
			});
		}

		/**
		 * Get Endpoint state from store. If not exists, create it.
		 *
		 * @param {Endpoint} ep
		 * @param {Service} service
		 * @param {Object} opts
		 * @returns {Object}
		 */
		function getEpState(ep, service, opts) {
			let item = store.get(ep.name);
			if (!item) {
				item = {
					ep,
					service,
					opts,
					count: 0,
					failures: 0,
					state: constants.CIRCUIT_CLOSE,
					cbTimer: null
				};
				store.set(ep.name, item);
			}
			return item;
		}

		/**
		 * Increment failure counter
		 *
		 * @param {Object} item
		 * @param {Error} err
		 * @param {Context} ctx
		 */
		function failure(item, err, ctx) {
			item.count++;
			item.failures++;

			checkThreshold(item);
		}

		/**
		 * Increment request counter and switch CB to CLOSE if it is on HALF_OPEN_WAIT.
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function success(item, ctx) {
			item.count++;

			if (item.state === constants.CIRCUIT_HALF_OPEN_WAIT)
				circuitClose(item);
			else
				checkThreshold(item);
		}

		/**
		 * Check circuit-breaker failure threshold of Endpoint
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function checkThreshold(item, ctx) {
			if (item.count >= item.opts.minRequestCount) {
				const rate = item.failures / item.count;
				if (rate >= item.opts.threshold)
					trip(item);
			}
		}

		/**
		 * Trip the circuit-breaker, change the status to open
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function trip(item, ctx) {
			if (item.state == constants.CIRCUIT_OPEN) return;

			item.state = constants.CIRCUIT_OPEN;
			item.ep.state = false;

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}

			item.cbTimer = timersBrowserify.setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
			item.cbTimer.unref();

			const action = item.ep.action;
			const service = item.service.fullName;

			const rate = item.count > 0 ? item.failures / item.count : 0;
			logger.debug(`Circuit breaker has been opened on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name, failures: item.failures, count: item.count, rate });
			broker.broadcast("$circuit-breaker.opened", { nodeID: item.ep.id, service, action: action.name, failures: item.failures, count: item.count, rate });

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 1, { affectedNodeID: item.ep.id, service, action: action.name });
			broker.metrics.increment(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL, { affectedNodeID: item.ep.id, service, action: action.name });
		}

		/**
		 * Change circuit-breaker status to half-open
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function halfOpen(item) {
			item.state = constants.CIRCUIT_HALF_OPEN;
			item.ep.state = true;

			const action = item.ep.action;
			const service = item.service.fullName;

			logger.debug(`Circuit breaker has been half-opened on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name });

			broker.broadcast("$circuit-breaker.half-opened", { nodeID: item.ep.id, service, action: action.name });

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });
			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 1, { affectedNodeID: item.ep.id, service, action: action.name });

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}
		}

		/**
		 * Change circuit-breaker status to half-open waiting. First request is invoked after half-open.
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		*/
		function halfOpenWait(item, ctx) {
			item.state = constants.CIRCUIT_HALF_OPEN_WAIT;
			item.ep.state = false;

			// Anti-stick protection
			item.cbTimer = timersBrowserify.setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
			item.cbTimer.unref();
		}

		/**
		 * Change circuit-breaker status to close
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function circuitClose(item) {
			item.state = constants.CIRCUIT_CLOSE;
			item.ep.state = true;
			item.failures = 0;
			item.count = 0;

			const action = item.ep.action;
			const service = item.service.fullName;

			logger.debug(`Circuit breaker has been closed on '${item.ep.name}' endpoint.`, { nodeID: item.ep.id, service, action: action.name });

			broker.broadcast("$circuit-breaker.closed", { nodeID: item.ep.id, service, action: action.name });

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });
			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 0, { affectedNodeID: item.ep.id, service, action: action.name });

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}
		}

		/**
		 * Middleware wrapper function
		 *
		 * @param {Function} handler
		 * @param {Action} action
		 * @returns {Function}
		 */
		function wrapCBMiddleware(handler, action) {
			const service = action.service;
			// Merge action option and broker options
			const opts = Object.assign({}, this.options.circuitBreaker || {}, action.circuitBreaker || {});
			if (opts.enabled) {
				return function circuitBreakerMiddleware(ctx) {
					// Get endpoint state item
					const ep = ctx.endpoint;
					const item = getEpState(ep, service, opts);

					// Handle half-open state in circuit breaker
					if (item.state == constants.CIRCUIT_HALF_OPEN) {
						halfOpenWait(item);
					}

					// Call the handler
					return handler(ctx).then(res => {
						const item = getEpState(ep, service, opts);
						success(item);

						return res;
					}).catch(err => {
						if (opts.check && opts.check(err)) {
							// Failure if error is created locally (not came from a 3rd node error)
							if (item && (!err.nodeID || err.nodeID == ctx.nodeID)) {
								const item = getEpState(ep, service, opts);
								failure(item);
							}
						}

						return this.Promise.reject(err);
					});
				}.bind(this);
			}

			return handler;
		}


		return {
			name: "CircuitBreaker",

			created(broker) {
				logger = broker.getLogger("circuit-breaker");

				// Expose the internal state store.
				broker.CircuitBreakerStore = store;

				const opts = broker.options.circuitBreaker;
				if (opts.enabled) {
					createWindowTimer(opts.windowTime);

					if (broker.isMetricsEnabled()) {
						broker.metrics.register({ name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, type: METRIC$6.TYPE_GAUGE, labelNames: ["affectedNodeID", "service", "action"], description: "Number of active opened circuit-breakers" });
						broker.metrics.register({ name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL, type: METRIC$6.TYPE_COUNTER, labelNames: ["affectedNodeID", "service", "action"], description: "Number of opened circuit-breakers" });
						broker.metrics.register({ name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, type: METRIC$6.TYPE_GAUGE, labelNames: ["affectedNodeID", "service", "action"], description: "Number of active half-opened circuit-breakers" });
					}
				}
			},

			localAction: wrapCBMiddleware,
			remoteAction: wrapCBMiddleware,

			stopped() {
				if (windowTimer) {
					clearInterval(windowTimer);
				}

				delete broker.CircuitBreakerStore;
			}
		};
	};

	const { RequestTimeoutError } = errors;
	const { METRIC: METRIC$7 }	= metrics;

	var timeout = function(broker) {

		function wrapTimeoutMiddleware(handler, action) {
			const actionTimeout = action.timeout;
			const actionName = action.name;
			const service = action.service ? action.service.fullName : null;

			return function timeoutMiddleware(ctx) {

				// Load opts with default values
				if (ctx.options.timeout == null) {
					if (actionTimeout != null)
						ctx.options.timeout = actionTimeout;
					else
						ctx.options.timeout = broker.options.requestTimeout;
				}

				if (ctx.options.timeout > 0 && !ctx.startHrTime) {
				// For distributed timeout calculation need to be set
					ctx.startHrTime = proc.hrtime();
				}

				// Call the handler
				const p = handler(ctx);
				if (ctx.options.timeout > 0 && p.timeout) {
					return p.timeout(ctx.options.timeout)
						.catch(err => {
							if (err instanceof broker.Promise.TimeoutError) {
								const nodeID = ctx.nodeID;
								this.logger.warn(`Request '${actionName}' is timed out.`, { requestID: ctx.requestID, nodeID, timeout: ctx.options.timeout });
								err = new RequestTimeoutError({ action: actionName, nodeID });

								broker.metrics.increment(METRIC$7.MOLECULER_REQUEST_TIMEOUT_TOTAL, { service, action: actionName });
							}
							throw err;
						});
				}

				return p;

			}.bind(this);
		}

		return {
			name: "Timeout",

			created(broker) {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({ name: METRIC$7.MOLECULER_REQUEST_TIMEOUT_TOTAL, type: METRIC$7.TYPE_COUNTER, labelNames: ["service", "action"], description: "Number of timed out requests", rate: true });
				}
			},

			localAction: wrapTimeoutMiddleware,
			remoteAction: wrapTimeoutMiddleware
		};
	};

	const { METRIC: METRIC$8 }	= metrics;

	var retry = function RetryMiddleware(broker) {

		function wrapRetryMiddleware(handler, action) {
			const actionName = action.name;
			const service = action.service ? action.service.fullName : null;
			// Merge action option and broker options
			const opts = Object.assign({}, this.options.retryPolicy, action.retryPolicy || {});
			if (opts.enabled) {
				return function retryMiddleware(ctx) {
					const attempts = typeof ctx.options.retries === "number" ? ctx.options.retries : opts.retries;
					if (ctx._retryAttempts == null)
						ctx._retryAttempts = 0;

					// Call the handler
					return handler(ctx).catch(err => {

						// Skip retry if it is a remote call. The retry logic will run on the caller node
						// because the Retry middleware wrap the `remoteAction` hook, as well.
						if (ctx.nodeID != broker.nodeID && ctx.endpoint.local)
							return Promise.reject(err);

						// Check the error's `retryable` property.
						if (opts.check(err)) {
							broker.metrics.increment(METRIC$8.MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL, { service, action: action.name });

							if (ctx._retryAttempts < attempts) {
								// Retry call
								ctx._retryAttempts++;

								// Correct tracing
								if (ctx.span) {
									ctx.span.setError(err);
									ctx.span.addTags({ retryAttempts: ctx._retryAttempts });
									ctx.finishSpan(ctx.span);
								}

								// Calculate next delay
								const delay = Math.min(opts.delay * Math.pow(opts.factor, ctx._retryAttempts - 1), opts.maxDelay);

								broker.logger.warn(`Retry to call '${actionName}' action after ${delay} ms...`, { requestID: ctx.requestID, attempts: ctx._retryAttempts });

								// Wait & recall
								return broker.Promise.delay(delay)
									.then(() => {
										const newCtx = ctx.copy();
										newCtx._retryAttempts = ctx._retryAttempts;

										if (action.visibility == "private")
											return ctx.service.actions[action.rawName](ctx.params, { ctx: newCtx });

										return broker.call(actionName, ctx.params, { ctx: newCtx });
									});
							}
						}

						// Throw error
						return Promise.reject(err);
					});
				}.bind(this);
			}

			return handler;
		}

		return {
			name: "Retry",

			created() {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({ name: METRIC$8.MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL, type: METRIC$8.TYPE_COUNTER, labelNames: ["service", "action"], description: "Number of retries", rate: true });
				}
			},

			localAction: wrapRetryMiddleware,
			remoteAction: wrapRetryMiddleware
		};
	};

	const { MoleculerError } = errors;
	const { METRIC: METRIC$9 }	= metrics;
	const { isFunction: isFunction$6, isString: isString$d } = utils_1;

	var fallback = function FallbackMiddleware(broker) {

		function handleContextFallback(ctx, err) {
			broker.logger.warn(`The '${ctx.action.name}' request is failed. Return fallback response.`, { requestID: ctx.requestID, err: err.message });
			broker.metrics.increment(METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL, { action: ctx.action.name });
			ctx.fallbackResult = true;

			if (isFunction$6(ctx.options.fallbackResponse))
				return ctx.options.fallbackResponse(ctx, err);
			else
				return Promise.resolve(ctx.options.fallbackResponse);
		}

		function wrapFallbackMiddleware(handler, action) {
			return function fallbackMiddleware(ctx) {
				// Call the handler
				return handler(ctx).catch(err => {

					// Handle fallback response from calling options
					if (ctx.options.fallbackResponse) {
						return handleContextFallback(ctx, err);
					}

					// Handle fallback from Action Definition (only locally)
					if (action.fallback && action.service) {
						const svc = action.service;

						const fallback = isString$d(action.fallback) ? svc[action.fallback] : action.fallback;
						if (!isFunction$6(fallback)) {
							/* istanbul ignore next */
							throw new MoleculerError(`The 'fallback' of '${action.name}' action is not a Function or valid method name: ${action.fallback}`);
						}

						svc.logger.warn(`The '${ctx.action.name}' request is failed. Return fallback response.`, { requestID: ctx.requestID, err: err.message });
						broker.metrics.increment(METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL, { service: svc.fullName, action: action.name });
						ctx.fallbackResult = true;

						return fallback.call(svc, ctx, err);
					}

					return Promise.reject(err);
				});
			}.bind(this);
		}

		return {
			name: "Fallback",

			created(broker) {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({ name: METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL, type: METRIC$9.TYPE_COUNTER, labelNames: ["service", "action"], description: "Number of fallbacked requests", rate: true });
				}
			},

			localAction: wrapFallbackMiddleware,
			remoteAction: wrapFallbackMiddleware,

			/*call(next) {
				return (actionName, params, opts) => {
					return next(actionName, params, opts).catch(err => {
						if (opts.fallbackResponse) {
							return handleContextFallback(null, err);
						}
						throw err;
					});
				};
			},*/
		};
	};

	const { MoleculerError: MoleculerError$1 } = errors;

	function wrapActionErrorHandler(handler) {
		return function errorHandlerMiddleware(ctx) {
			// Call the handler
			return handler(ctx)
				.catch(err => {
					if (!(err instanceof Error))
						err = new MoleculerError$1(err, 500);

					if (ctx.nodeID !== this.nodeID) {
						// Remove pending request (the request didn't reach the target service)
						if (this.transit)
							this.transit.removePendingRequest(ctx.id);
					}

					this.logger.debug(`The '${ctx.action.name}' request is rejected.`, { requestID: ctx.requestID }, err);

					Object.defineProperty(err, "ctx", {
						value: ctx,
						writable: true,
						enumerable: false
					});

					// Call global errorHandler
					return ctx.broker.errorHandler(err, {
						ctx,
						service: ctx.service,
						action: ctx.action
					});
				});

		}.bind(this);
	}

	function wrapEventErrorHandler(handler) {
		return function errorHandlerMiddleware(ctx) {
			// Call the handler
			return handler(ctx)
				.catch(err => {
					if (!(err instanceof Error))
						err = new MoleculerError$1(err, 500);

					this.logger.debug(`Error occured in the '${ctx.event.name}' event handler in the '${ctx.service.fullName}' service.`, { requestID: ctx.requestID }, err);

					Object.defineProperty(err, "ctx", {
						value: ctx,
						writable: true,
						enumerable: false
					});

					// Call global errorHandler
					return ctx.broker.errorHandler(err, {
						ctx,
						service: ctx.service,
						event: ctx.event
					});
				}).catch(err => {
					// No global error Handler, or thrown further, so we handle it because it's an event handler.
					ctx.broker.logger.error(err);
				});

		}.bind(this);
	}

	var errorHandler = function() {
		return {
			name: "ErrorHandler",

			localAction: wrapActionErrorHandler,
			remoteAction: wrapActionErrorHandler,

			localEvent: wrapEventErrorHandler
		};
	};

	const { METRIC: METRIC$a }	= metrics;

	var metrics$1 = function MetricsMiddleware(broker) {
		const metrics = broker.metrics;

		function getActionHandler(type, actionDef, next) {
			const action = actionDef.name;
			const service = actionDef.service ? actionDef.service.fullName : null;

			return function metricsMiddleware(ctx) {
				const caller = ctx.caller;

				metrics.increment(METRIC$a.MOLECULER_REQUEST_TOTAL, { service, action, caller, type });
				metrics.increment(METRIC$a.MOLECULER_REQUEST_ACTIVE, { service, action, caller, type });
				metrics.increment(METRIC$a.MOLECULER_REQUEST_LEVELS, { service, action, caller, level: ctx.level });
				const timeEnd = metrics.timer(METRIC$a.MOLECULER_REQUEST_TIME, { service, action, caller, type });

				// Call the next handler
				return next(ctx).then(res => {
					timeEnd();
					metrics.decrement(METRIC$a.MOLECULER_REQUEST_ACTIVE, { service, action, caller, type });
					return res;
				}).catch(err => {
					timeEnd();
					metrics.decrement(METRIC$a.MOLECULER_REQUEST_ACTIVE, { service, action, caller, type });
					metrics.increment(METRIC$a.MOLECULER_REQUEST_ERROR_TOTAL, {
						service,
						action,
						caller,
						type,
						errorName: err ? err.name : null,
						errorCode: err ? err.code : null,
						errorType: err ? err.type : null
					});
					throw err;
				});

			};
		}

		return {
			name: "Metrics",

			created() {
				if (broker.isMetricsEnabled()) {
					// --- MOLECULER REQUEST METRICS ---
					metrics.register({ name: METRIC$a.MOLECULER_REQUEST_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["service", "action", "type", "caller"], unit: METRIC$a.UNIT_REQUEST, description: "Number of requests", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_REQUEST_ACTIVE, type: METRIC$a.TYPE_GAUGE, labelNames: ["service", "action", "type", "caller"], unit: METRIC$a.UNIT_REQUEST, description: "Number of active requests" });
					metrics.register({ name: METRIC$a.MOLECULER_REQUEST_ERROR_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["service", "action", "type", "caller", "errorName", "errorCode", "errorType"], unit: METRIC$a.UNIT_REQUEST, description: "Number of request errors", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_REQUEST_TIME, type: METRIC$a.TYPE_HISTOGRAM, labelNames: ["service", "action", "type", "caller"], quantiles: true, buckets: true, unit: METRIC$a.UNIT_MILLISECONDS, description: "Request times in milliseconds", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_REQUEST_LEVELS, type: METRIC$a.TYPE_COUNTER, labelNames: ["level"], unit: METRIC$a.UNIT_REQUEST, description: "Number of requests by context level" });
					//metrics.register({ name: METRIC.MOLECULER_REQUEST_DIRECTCALL_TOTAL, type: METRIC.TYPE_COUNTER, labelNames: ["action"], unit: METRIC.UNIT_REQUEST, description: "Number of direct calls", rate: true });
					//metrics.register({ name: METRIC.MOLECULER_REQUEST_MULTICALL_TOTAL, type: METRIC.TYPE_COUNTER, unit: METRIC.UNIT_REQUEST, description: "Number of multicalls", rate: true });

					// --- MOLECULER EVENTS METRICS ---
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_EMIT_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["event", "groups"], unit: METRIC$a.UNIT_EVENT, description: "Number of emitted events", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_BROADCAST_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["event", "groups"], unit: METRIC$a.UNIT_EVENT, description: "Number of broadcast events", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_BROADCASTLOCAL_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["event", "groups"], unit: METRIC$a.UNIT_EVENT, description: "Number of local broadcast events", rate: true });

					metrics.register({ name: METRIC$a.MOLECULER_EVENT_RECEIVED_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["service", "group", "event", "caller"], unit: METRIC$a.UNIT_EVENT, description: "Number of received events", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, type: METRIC$a.TYPE_GAUGE, labelNames: ["service", "group", "event", "caller"], unit: METRIC$a.UNIT_REQUEST, description: "Number of active event executions" });
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_RECEIVED_ERROR_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["service", "group", "event", "caller", "errorName", "errorCode", "errorType"], unit: METRIC$a.UNIT_REQUEST, description: "Number of event execution errors", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_EVENT_RECEIVED_TIME, type: METRIC$a.TYPE_HISTOGRAM, labelNames: ["service", "group", "event", "caller"], quantiles: true, buckets: true, unit: METRIC$a.UNIT_MILLISECONDS, description: "Execution time of events in milliseconds", rate: true });

					// --- MOLECULER TRANSIT METRICS ---

					metrics.register({ name: METRIC$a.MOLECULER_TRANSIT_PUBLISH_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["type"], unit: METRIC$a.UNIT_PACKET, description: "Number of published packets", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_TRANSIT_RECEIVE_TOTAL, type: METRIC$a.TYPE_COUNTER, labelNames: ["type"], unit: METRIC$a.UNIT_PACKET, description: "Number of received packets", rate: true });

					metrics.register({ name: METRIC$a.MOLECULER_TRANSIT_REQUESTS_ACTIVE, type: METRIC$a.TYPE_GAUGE, unit: METRIC$a.UNIT_REQUEST, description: "Number of active requests" });
					metrics.register({ name: METRIC$a.MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE, type: METRIC$a.TYPE_GAUGE, unit: METRIC$a.UNIT_STREAM, description: "Number of active sent streams" });
					//metrics.register({ name: METRIC.MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE, type: METRIC.TYPE_GAUGE, description: "" });

					// --- MOLECULER TRANSPORTER METRICS ---

					metrics.register({ name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL, type: METRIC$a.TYPE_COUNTER, unit: METRIC$a.UNIT_PACKET, description: "Number of sent packets", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES, type: METRIC$a.TYPE_COUNTER, unit: METRIC$a.UNIT_BYTE, description: "Number of sent bytes", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL, type: METRIC$a.TYPE_COUNTER, unit: METRIC$a.UNIT_PACKET, description: "Number of received packets", rate: true });
					metrics.register({ name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES, type: METRIC$a.TYPE_COUNTER, unit: METRIC$a.UNIT_BYTE, description: "Number of received bytes", rate: true });
				}
			},

			localAction(next, action) {
				if (broker.isMetricsEnabled())
					return getActionHandler("local", action, next);

				return next;
			},

			remoteAction(next, action) {
				if (broker.isMetricsEnabled())
					return getActionHandler("remote", action, next);

				return next;
			},

			// Wrap local event handlers
			localEvent(next, event) {
				const service = event.service ? event.service.name : null;
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(ctx) {
						const group = event.group || service;
						metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_TOTAL, { service, event: ctx.eventName, group, caller: ctx.caller });
						metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, { service, event: ctx.eventName, group, caller: ctx.caller });
						const timeEnd = metrics.timer(METRIC$a.MOLECULER_EVENT_RECEIVED_TIME, { service, event: ctx.eventName, group, caller: ctx.caller });
						return next.apply(this, arguments).then(res => {
							timeEnd();
							metrics.decrement(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, { service, event: ctx.eventName, group, caller: ctx.caller });
							return res;
						}).catch(err => {
							timeEnd();
							metrics.decrement(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, { service, event: ctx.eventName, group, caller: ctx.caller });
							metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_ERROR_TOTAL, {
								service, event: ctx.eventName, group, caller: ctx.caller,
								errorName: err ? err.name : null,
								errorCode: err ? err.code : null,
								errorType: err ? err.type : null
							});
							throw err;
						});
					}.bind(this);
				}

				return next;
			},

			// Wrap broker.emit method
			emit(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_EMIT_TOTAL, { event: arguments[0] });
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// Wrap broker.broadcast method
			broadcast(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_BROADCAST_TOTAL, { event: arguments[0] });
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// Wrap broker.broadcastLocal method
			broadcastLocal(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_BROADCASTLOCAL_TOTAL, { event: arguments[0] });
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transit publishing a packet
			transitPublish(next) {
				const transit = this;
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* packet */) {
						metrics.increment(METRIC$a.MOLECULER_TRANSIT_PUBLISH_TOTAL, { type: arguments[0].type });

						const p = next.apply(this, arguments);

						metrics.increment(METRIC$a.MOLECULER_TRANSIT_REQUESTS_ACTIVE, null, transit.pendingRequests.size);
						//metrics.increment(METRIC.MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE, null, transit.);
						metrics.increment(METRIC$a.MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE, null, transit.pendingReqStreams.size + this.pendingResStreams.size);

						return p;
					};
				}
				return next;
			},

			// When transit receives & handles a packet
			transitMessageHandler(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* cmd, packet */) {
						metrics.increment(METRIC$a.MOLECULER_TRANSIT_RECEIVE_TOTAL, { type: arguments[0] });
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transporter send data
			transporterSend(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* topic, data, meta */) {
						const data = arguments[1];
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL);
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES, null, data && data.length ? data.length : 0);
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transporter received data
			transporterReceive(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* cmd, data, s */) {
						const data = arguments[1];
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL);
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES, null, data && data.length ? data.length : 0);
						return next.apply(this, arguments);
					};
				}
				return next;
			}

		};
	};

	const { isFunction: isFunction$7, isPlainObject: isPlainObject$3 } = utils_1;

	var tracing = function TracingMiddleware(broker) {

		const tracer = broker.tracer;

		function tracingLocalActionMiddleware(handler, action) {
			let opts = action.tracing;
			if (opts === true || opts === false)
				opts = { enabled: !!opts };
			opts = ___default['default'].defaultsDeep({}, opts, { enabled: true });

			if (opts.enabled) {
				return function tracingLocalActionMiddleware(ctx) {

					ctx.requestID = ctx.requestID || tracer.getCurrentTraceID();
					ctx.parentID = ctx.parentID || tracer.getActiveSpanID();

					const tags = {
						callingLevel: ctx.level,
						action: ctx.action ? {
							name: ctx.action.name,
							rawName: ctx.action.rawName
						} : null,
						remoteCall: ctx.nodeID !== ctx.broker.nodeID,
						callerNodeID: ctx.nodeID,
						nodeID: ctx.broker.nodeID,
						options: {
							timeout: ctx.options.timeout,
							retries: ctx.options.retries
						},
						requestID: ctx.requestID,
					};
					const globalActionTags = tracer.opts.tags.action;
					let actionTags;
					// local action tags take precedence
					if (isFunction$7(opts.tags)) {
						actionTags = opts.tags;
					} else if (!opts.tags && isFunction$7(globalActionTags)) {
						actionTags = globalActionTags;
					} else {
						// By default all params are captured. This can be overridden globally and locally
						actionTags = { ...{ params: true }, ...globalActionTags, ...opts.tags };
					}

					if (isFunction$7(actionTags)) {
						const res = actionTags.call(ctx.service, ctx);
						if (res)
							Object.assign(tags, res);

					} else if (isPlainObject$3(actionTags)) {
						if (actionTags.params === true)
							tags.params = ctx.params != null && isPlainObject$3(ctx.params) ? Object.assign({}, ctx.params) : ctx.params;
						else if (Array.isArray(actionTags.params))
							tags.params = ___default['default'].pick(ctx.params, actionTags.params);

						if (actionTags.meta === true)
							tags.meta = ctx.meta != null ? Object.assign({}, ctx.meta) : ctx.meta;
						else if (Array.isArray(actionTags.meta))
							tags.meta = ___default['default'].pick(ctx.meta, actionTags.meta);
					}

					let spanName = `action '${ctx.action.name}'`;
					if (opts.spanName) {
						switch(typeof opts.spanName) {
							case "string":
								spanName = opts.spanName;
								break;
							case "function":
								spanName = opts.spanName.call(ctx.service, ctx);
								break;
						}
					}

					const span = ctx.startSpan(spanName, {
						id: ctx.id,
						type: "action",
						traceID: ctx.requestID,
						parentID: ctx.parentID,
						service: ctx.service,
						sampled: ctx.tracing,
						tags
					});

					ctx.tracing = span.sampled;

					// Call the handler
					return handler(ctx).then(res => {
						const tags = {
							fromCache: ctx.cachedResult
						};

						if (isFunction$7(actionTags)) {
							const r = actionTags.call(ctx.service, ctx, res);
							if (r)
								Object.assign(tags, r);

						} else if (isPlainObject$3(actionTags)) {
							if (actionTags.response === true)
								tags.response = res != null && isPlainObject$3(res) ? Object.assign({}, res) : res;
							else if (Array.isArray(actionTags.response))
								tags.response = ___default['default'].pick(res, actionTags.response);
						}

						span.addTags(tags);
						ctx.finishSpan(span);

						//ctx.duration = span.duration;

						return res;
					}).catch(err => {
						span.setError(err);
						ctx.finishSpan(span);

						throw err;
					});

				}.bind(this);
			}

			return handler;
		}

		function tracingLocalEventMiddleware(handler, event) {
			const service = event.service;

			let opts = event.tracing;
			if (opts === true || opts === false)
				opts = { enabled: !!opts };
			opts = ___default['default'].defaultsDeep({}, opts, { enabled: true  });

			if (opts.enabled) {
				return function tracingLocalEventMiddleware(ctx) {

					ctx.requestID = ctx.requestID || tracer.getCurrentTraceID();
					ctx.parentID = ctx.parentID || tracer.getActiveSpanID();

					const tags = {
						event: {
							name: event.name,
							group: event.group
						},
						eventName: ctx.eventName,
						eventType: ctx.eventType,
						callerNodeID: ctx.nodeID,
						callingLevel: ctx.level,
						remoteCall: ctx.nodeID !== broker.nodeID,
						nodeID: broker.nodeID,
						requestID: ctx.requestID,
					};

					const globalEventTags = tracer.opts.tags.event;
					let eventTags;
					// local event tags take precedence
					if (isFunction$7(opts.tags)) {
						eventTags = opts.tags;
					} else if (!opts.tags && isFunction$7(globalEventTags)) {
						eventTags = globalEventTags;
					} else {
						// By default all params are captured. This can be overridden globally and locally
						eventTags = { ...{ params: true }, ...globalEventTags, ...opts.tags };
					}

					if (isFunction$7(eventTags)) {
						const res = eventTags.call(service, ctx);
						if (res)
							Object.assign(tags, res);

					} else if (isPlainObject$3(eventTags)) {
						if (eventTags.params === true)
							tags.params = ctx.params != null && isPlainObject$3(ctx.params) ? Object.assign({}, ctx.params) : ctx.params;
						else if (Array.isArray(eventTags.params))
							tags.params = ___default['default'].pick(ctx.params, eventTags.params);

						if (eventTags.meta === true)
							tags.meta = ctx.meta != null ? Object.assign({}, ctx.meta) : ctx.meta;
						else if (Array.isArray(eventTags.meta))
							tags.meta = ___default['default'].pick(ctx.meta, eventTags.meta);
					}

					let spanName = `event '${ctx.eventName}' in '${service.fullName}'`;
					if (opts.spanName) {
						switch(typeof opts.spanName) {
							case "string":
								spanName = opts.spanName;
								break;
							case "function":
								spanName = opts.spanName.call(service, ctx);
								break;
						}
					}

					const span = ctx.startSpan(spanName, {
						id: ctx.id,
						type: "event",
						traceID: ctx.requestID,
						parentID: ctx.parentID,
						service,
						sampled: ctx.tracing,
						tags
					});

					ctx.tracing = span.sampled;

					// Call the handler
					return handler.apply(service, arguments).then(() => {
						ctx.finishSpan(span);
					}).catch(err => {
						span.setError(err);
						ctx.finishSpan(span);
						throw err;
					});

				}.bind(this);
			}

			return handler;
		}

		/*
		function wrapRemoteTracingMiddleware(handler) {

			if (this.options.tracing) {
				return function tracingMiddleware(ctx) {
					if (ctx.tracing == null) {
						ctx.tracing = shouldTracing(ctx);
					}
					return handler(ctx);

				}.bind(this);
			}

			return handler;
		}*/
		return {
			name: "Tracing",

			localAction: broker.isTracingEnabled() && tracer.opts.actions ? tracingLocalActionMiddleware : null,
			localEvent: broker.isTracingEnabled() && tracer.opts.events ? tracingLocalEventMiddleware : null,
			//remoteAction: wrapRemoteTracingMiddleware
		};
	};

	var debounce = function debounceMiddleware(broker) {

		function wrapEventDebounceMiddleware(handler, event) {
			if (event.debounce > 0) {
				let timer;

				return function debounceMiddleware(ctx) {
					if (timer)
						clearTimeout(timer);

					timer = timersBrowserify.setTimeout(() => {
						timer = null;
						return handler(ctx);
					}, event.debounce);

					return broker.Promise.resolve();
				}.bind(this);
			}
			return handler;
		}

		return {
			name: "Debounce",

			localEvent: wrapEventDebounceMiddleware
		};
	};

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var throttle = function throttleMiddleware(broker) {

		function wrapEventThrottleMiddleware(handler, event) {
			if (event.throttle > 0) {
				let lastInvoke = 0;

				return function throttleMiddleware(ctx) {
					const now = Date.now();
					if (now - lastInvoke < event.throttle) {
						return broker.Promise.resolve();
					}
					lastInvoke = now;
					return handler(ctx);
				}.bind(this);
			}
			return handler;
		}

		return {
			name: "Throttle",

			localEvent: wrapEventThrottleMiddleware
		};
	};

	/**
	 * This is a AES encryption middleware to protect the whole
	 * Moleculer transporter communication with AES.
	 *
	 * @param {String|Buffer} password
	 * @param {String?} algorithm
	 * @param {String|Buffer?} iv
	 */
	var encryption = function EncryptionMiddleware(password, algorithm = "aes-256-cbc", iv) {
		if (!password || password.length == 0) {
			/* istanbul ignore next */
			throw new Error("Must be set a password for encryption");
		}

		return {
			name: "Encryption",

			created() {
				/* istanbul ignore next */
				this.logger.info(`The transmission is ENCRYPTED by '${algorithm}'.`);
			},

			transporterSend(next) {
				return (topic, data, meta) => {
					const encrypter = iv ? crypto__default['default'].createCipheriv(algorithm, password, iv) : crypto__default['default'].createCipher(algorithm, password);
					const res = buffer.Buffer.concat([encrypter.update(data), encrypter.final()]);
					return next(topic, res, meta);
				};
			},

			transporterReceive(next) {
				return (cmd, data, s) => {
					const decrypter = iv ? crypto__default['default'].createDecipheriv(algorithm, password, iv) : crypto__default['default'].createDecipher(algorithm, password);
					const res = buffer.Buffer.concat([decrypter.update(data), decrypter.final()]);
					return next(cmd, res, s);
				};
			}
		};
	};

	const deflateRaw = (...args) => fflate.deflateSync(...args);
	const inflateRaw = (...args) => fflate.inflateSync(...args);
	const gzip = (...args) => fflate.gzip(...args);
	const gunzip = (...args) => fflate.gunzip(...args);
	const deflate = (...args) => fflate.zlibSync(...args);
	const inflate = (...args) => fflate.unzlibSync(...args);

	var zlib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		deflateRaw: deflateRaw,
		inflateRaw: inflateRaw,
		gzip: gzip,
		gunzip: gunzip,
		deflate: deflate,
		inflate: inflate
	});

	const { defaultsDeep } = ___default['default'];
	const { parseByteString } = utils_1;

	const { promisify } = util__default['default'];

	/**
	 * This is a transmission compression middleware. It supports
	 * the `deflate`, `deflateRaw` & `gzip` compression methods.
	 *
	 * @param {String?} opts.method
	 * @param {String|Number} opts.threshold
	 */
	var compression = function CompressionMiddleware(opts) {
		opts = defaultsDeep(opts, { method: "deflate", threshold: "1kb" });

		let compress, decompress;
		const threshold = parseByteString(opts.threshold);

		switch(opts.method) {
			case "deflate":
				compress = promisify(zlib.deflate);
				decompress = promisify(zlib.inflate);
				break;
			case "deflateRaw":
				compress = promisify(zlib.deflateRaw);
				decompress = promisify(zlib.inflateRaw);
				break;
			case "gzip":
				compress = promisify(zlib.gzip);
				decompress = promisify(zlib.gunzip);
				break;
			default:
				/* istanbul ignore next */
				throw new Error("Unknow compression method: " + opts.method);
		}

		let logger;

		return {
			name: "Compression",

			created(broker) {
				logger = broker.getLogger("TX-COMPRESS");
				/* istanbul ignore next */
				logger.info(`The transmission is COMPRESSED by '${opts.method}'. Threshold: ${ threshold != null ? opts.threshold : "none"}`);
			},

			transporterSend(next) {
				return (topic, data, meta) => {
					if (threshold != null && data.length < threshold) {
						logger.debug(`Packet '${topic}' is small and not compressed. Size: ${data.length}`);
						return next(topic, buffer.Buffer.concat([buffer.Buffer.from([0x00]), data]), meta);
					}
					return compress(data)
						.then(res => {
							logger.debug(`Packet '${topic}' compressed. Saving: ${Number((1 - (res.length / data.length)) * 100).toFixed(0)}%`, data.length, res.length);
							return next(topic, buffer.Buffer.concat([buffer.Buffer.from([0x01]), res]), meta);
						});
				};
			},

			transporterReceive(next) {
				return (cmd, data, s) => {
					const isCompressed = data.readInt8(0);
					if (isCompressed == 0) {
						logger.debug(`Packet '${cmd}' is small and not compressed. Size: ${data.length}`);
						return next(cmd, data.slice(1), s);
					} else {
						return decompress(data.slice(1))
							.then(res => {
								logger.debug(`Packet '${cmd}' decompressed. Saving: ${Number((1 - (data.length / res.length)) * 100).toFixed(0)}%`, res.length, data.length);
								return next(cmd, res, s);
							});
					}
				};
			}
		};
	};

	const { makeDirs } = utils_1;

	var transitLogger = function TransitLoggerMiddleware(opts) {
		opts = ___default['default'].defaultsDeep(opts, {
			logger: null,
			logLevel: "info",
			logPacketData: false,

			folder: null,
			extension: ".json",

			colors: {
				receive: "grey",
				send: "grey"
			},

			packetFilter: ["HEARTBEAT"]
		});

		let logger;
		let nodeID;

		let targetFolder;

		function saveToFile(filename, payload) {
			const data = JSON.stringify(payload, payload instanceof Error ? Object.getOwnPropertyNames(payload) : null, 4);
			fs__default['default'].writeFile(path__default['default'].join(targetFolder, filename), data, () => { /* Silent error */ });
		}

		const coloringSend = opts.colors && opts.colors.send ? opts.colors.send.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default']) : s => s;
		const coloringReceive = opts.colors && opts.colors.receive ? opts.colors.receive.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default']) : s => s;

		let logFn;

		return {
			name: "TransitLogger",
			created(broker) {
				logger = opts.logger || broker.getLogger("debug");
				nodeID = broker.nodeID;

				if (opts.folder) {
					targetFolder = path__default['default'].join(opts.folder, nodeID);
					makeDirs(targetFolder);
				}

				logFn = opts.logLevel ? logger[opts.logLevel] : null;
			},

			transitPublish(next) {
				return packet => {
					// Packet filtering
					if (opts.packetFilter.includes(packet.type)) {
						return next(packet);
					}

					const payload = packet.payload;

					// Logging to logger
					if (logFn) {
						logFn(coloringSend(`=> Send ${packet.type} packet to '${packet.target || "<all nodes>"}'`));
						if (opts.logPacketData) {
							logFn("=>", payload);
						}
					}

					if (targetFolder) {
						saveToFile(`${Date.now()}-send-${packet.type}-to-${packet.target || "all"}${opts.extension}`, payload);
					}

					return next(packet);
				};
			},

			transitMessageHandler(next) {
				return (cmd, packet) => {
					// Packet filtering
					if (opts.packetFilter.includes(cmd)) {
						return next(cmd, packet);
					}

					const payload = packet.payload;

					if (logFn) {
						logFn(coloringReceive(`<= Receive ${cmd} packet from '${payload.sender}'`));
						if (opts.logPacketData) {
							logFn("<=", packet.payload);
						}
					}

					if (targetFolder) {
						saveToFile(`${Date.now()}-receive-${cmd}-from-${payload.sender}${opts.extension}`, payload);
					}

					return next(cmd, packet);
				};
			}
		};
	};

	const { makeDirs: makeDirs$1, match: match$3, isObject: isObject$b } = utils_1;

	var actionLogger = function ActionLoggerMiddleware(opts) {
		opts = ___default['default'].defaultsDeep(opts, {
			logger: null,
			logLevel: "info",
			logParams: false,
			logResponse: false,
			logMeta: false,

			folder: null,
			extension: ".json",

			colors: {
				request: "yellow",
				response: "cyan",
				error: "red"
			},
			whitelist: ["**"]
		});

		let logger;
		let nodeID;

		let targetFolder;

		function saveToFile(filename, payload) {
			const data = JSON.stringify(payload, payload instanceof Error ? Object.getOwnPropertyNames(payload) : null, 4);
			fs__default['default'].writeFile(path__default['default'].join(targetFolder, filename), data, () => { /* Silent error */ });
		}

		function isWhiteListed(actionName) {
			return !!opts.whitelist.find(pattern => match$3(actionName, pattern));
		}

		const coloringRequest = opts.colors && opts.colors.request ? opts.colors.request.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default']) : s => s;
		const coloringResponse = opts.colors && opts.colors.response ? opts.colors.response.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default']) : s => s;
		const coloringError = opts.colors && opts.colors.error ? opts.colors.error.split(".").reduce((a,b) => a[b] || a()[b], kleur__default['default']) : s => s;

		let logFn;

		return {
			name: "ActionLogger",
			created(broker) {
				logger = opts.logger || broker.getLogger("debug");
				nodeID = broker.nodeID;

				if (opts.folder) {
					targetFolder = path__default['default'].join(opts.folder, nodeID);
					makeDirs$1(targetFolder);
				}

				logFn = opts.logLevel ? logger[opts.logLevel] : null;
			},

			call(next) {
				return (actionName, params, callingOpts) => {
					// Whitelist filtering
					if (!isWhiteListed(isObject$b(actionName) ? actionName.action.name : actionName)) {
						return next(actionName, params, callingOpts);
					}

					// Logging to logger
					if (logFn) {
						const msg = coloringRequest(`Calling '${actionName}'` + (opts.logParams ? " with params:" : "."));
						opts.logParams ? logFn(msg, params) : logFn(msg);
						if (opts.logMeta && callingOpts && callingOpts.meta) {
							logFn("Meta:", callingOpts.meta);
						}
					}

					// Logging to file
					if (targetFolder) {
						if (opts.logParams) {
							saveToFile(`${Date.now()}-call-${actionName}-request${opts.extension}`, params);
						}

						if (opts.logMeta && callingOpts && callingOpts.meta) {
							saveToFile(`${Date.now()}-call-${actionName}-meta${opts.extension}`, callingOpts.meta);
						}
					}

					// Call the original method
					const p = next(actionName, params, callingOpts);

					const p2 = p
						.then(response => {

							// Log response to logger
							if (logFn) {
								const msg = coloringResponse(`Response for '${actionName}' is received` + (opts.logResponse ? ":" : "."));
								opts.logResponse ? logFn(msg, response) : logFn(msg);
							}

							// Log response to file
							if (targetFolder && opts.logResponse)
								saveToFile(`${Date.now()}-call-${actionName}-response${opts.extension}`, response);

							return response;
						})
						.catch(err => {

							// Log error to logger
							if (logFn) {
								logFn(coloringError(`Error for '${actionName}' is received:`), err);
							}

							// Logger error to file
							if (targetFolder && opts.logResponse)
								saveToFile(`${Date.now()}-call-${actionName}-error${opts.extension}`, err);

							throw err;
						});

					// Context issue workaround: https://github.com/moleculerjs/moleculer/issues/413
					p2.ctx = p.ctx;

					return p2;
				};
			}
		};
	};

	const Middlewares = {
		ActionHook: actionHook,
		Bulkhead: bulkhead,
		ContextTracker: contextTracker,
		CircuitBreaker: circuitBreaker,
		Timeout: timeout,
		Retry: retry,
		Fallback: fallback,
		ErrorHandler: errorHandler,
		Metrics: metrics$1,
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

	const { BrokerOptionsError: BrokerOptionsError$9 } = errors;
	const { isObject: isObject$c, isFunction: isFunction$8, isString: isString$e }	= utils_1;

	class MiddlewareHandler {

		constructor(broker) {
			this.broker = broker;

			this.list = [];

			this.registeredHooks = {};
		}

		add(mw) {
			if (!mw) return;

			if (isString$e(mw)) {
				const found = ___default['default'].get(middlewares, mw);
				if (!found)
					throw new BrokerOptionsError$9(`Invalid built-in middleware type '${mw}'.`, { type: mw });
				mw = found;
			}

			if (isFunction$8(mw))
				mw = mw.call(this.broker, this.broker);

			if (!isObject$c(mw))
				throw new BrokerOptionsError$9(`Invalid middleware type '${typeof mw}'. Accepted only Object of Function.`, { type: typeof mw });

			Object.keys(mw).forEach(key => {
				if (isFunction$8(mw[key])) {
					if (Array.isArray(this.registeredHooks[key]))
						this.registeredHooks[key].push(mw[key]);
					else
						this.registeredHooks[key] = [mw[key]];
				}
			});

			this.list.push(mw);
		}

		/**
		 * Wrap a handler
		 *
		 * @param {string} method
		 * @param {Function} handler
		 * @param {Object} def
		 * @returns {Function}
		 * @memberof MiddlewareHandler
		 */
		wrapHandler(method, handler, def) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				handler = this.registeredHooks[method].reduce((handler, fn) => {
					return fn.call(this.broker, handler, def);
				}, handler);
			}

			return handler;
		}

		/**
		 * Call a handler asynchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {Object} opts
		 * @returns {Promise}
		 * @memberof MiddlewareHandler
		 */
		callHandlers(method, args, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
				return list.reduce((p, fn) => p.then(() => fn.apply(this.broker, args)), this.broker.Promise.resolve());
			}

			return this.broker.Promise.resolve();
		}

		/**
		 * Call a handler synchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {Object} opts
		 * @returns {Array<any}
		 * @memberof MiddlewareHandler
		 */
		callSyncHandlers(method, args, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
				return list.map(fn => fn.apply(this.broker, args));
			}
			return;
		}

		/**
		 * Get count of registered middlewares
		 *
		 * @returns {Number}
		 * @memberof MiddlewareHandler
		 */
		count() {
			return this.list.length;
		}

		/**
		 * Wrap a method
		 *
		 * @param {string} method
		 * @param {Function} handler
		 * @param {any} bindTo
		 * @param {Object} opts
		 * @returns {Function}
		 * @memberof MiddlewareHandler
		 */
		wrapMethod(method, handler, bindTo = this.broker, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse ? Array.from(this.registeredHooks[method]).reverse() : this.registeredHooks[method];
				handler = list.reduce((next, fn) => fn.call(bindTo, next), handler.bind(bindTo));
			}

			return handler;
		}

	}

	var middleware = MiddlewareHandler;

	const { isObject: isObject$d } = utils_1;

	/**
	 * Abstract Trace Exporter
	 *
	 * @class BaseTraceExporter
	 */
	class BaseTraceExporter {

		/**
		 * Creates an instance of BaseTraceExporter.
		 * @param {Object?} opts
		 * @memberof BaseTraceExporter
		 */
		constructor(opts) {
			this.opts = opts || {};
			this.Promise = Promise; // default promise before logger is initialized
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof BaseTraceExporter
		 */
		init(tracer) {
			this.tracer = tracer;
			this.broker = tracer.broker;
			this.Promise = this.broker.Promise;
			this.logger = this.opts.logger || this.tracer.logger;
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			// Not implemented
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanStarted(/*span*/) {
			// Not implemented
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanFinished(/*span*/) {
			// Not implemented
		}

		/**
		 * Flattening tags to one-level object.
		 * E.g.
		 *  **From:**
		 * 	```js
		 * 	{
		 * 		error: {
		 * 			name: "MoleculerError"
		 * 		}
		 * 	}
		 *  ```
		 *
		 * 	**To:**
		 * 	```js
		 *  {
		 * 		"error.name": "MoleculerError"
		 *  }
		 *  ```
		 *
		 * @param {Object} obj
		 * @param {boolean} [convertToString=false]
		 * @param {string} [path=""]
		 * @returns {Object}
		 * @memberof BaseTraceExporter
		 */
		flattenTags(obj, convertToString = false, path = "") {
			if (!obj) return null;

			return Object.keys(obj).reduce((res, k) => {
				const o = obj[k];
				const pp = (path ? path + "." : "") + k;

				if (isObject$d(o))
					Object.assign(res, this.flattenTags(o, convertToString, pp));
				else if (o !== undefined) {
					res[pp] = convertToString ? String(o) : o;
				}

				return res;
			}, {});
		}

		/**
		 * Convert Error to POJO.
		 *
		 * @param {Error} err
		 * @returns {Object}
		 * @memberof BaseTraceExporter
		 */
		errorToObject(err) {
			if (!err) return null;

			return ___default['default'].pick(err, this.tracer.opts.errorFields);
		}
	}

	var base$9 = BaseTraceExporter;

	const r 						= ___default['default'].repeat;

	const { humanize, isFunction: isFunction$9 }  = utils_1;



	/**
	 * Console Trace Exporter only for debugging
	 *
	 * @class ConsoleTraceExporter
	 */
	class ConsoleTraceExporter extends base$9 {

		/**
		 * Creates an instance of ConsoleTraceExporter.
		 * @param {Object?} opts
		 * @memberof ConsoleTraceExporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				logger: null,
				colors: true,
				width: 100,
				gaugeWidth: 40
			});

			if (!this.opts.colors)
				kleur__default['default'].enabled = false;

			this.spans = {};
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof ConsoleTraceExporter
		 */
		init(tracer) {
			super.init(tracer);
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			this.spans = {};

			return this.broker.Promise.resolve();
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof ConsoleTraceExporter
		 */
		spanStarted(span) {
			this.spans[span.id] = {
				span,
				children: []
			};

			if (span.parentID) {
				const parentItem = this.spans[span.parentID];
				if (parentItem)
					parentItem.children.push(span.id);
			}
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof ConsoleTraceExporter
		 */
		spanFinished(span) {
			//this.log(span);
			if (!this.spans[span.parentID]) {
				this.printRequest(span.id);

				// remove old printed requests
				this.removeSpanWithChildren(span.id);
			}
		}

		/**
		 * Remove a finished span with children.
		 *
		 * @param {String} spanID
		 * @memberof ConsoleTraceExporter
		 */
		removeSpanWithChildren(spanID) {
			const span = this.spans[spanID];
			if (span) {
				if (span.children && span.children.length > 0) {
					span.children.forEach(child => this.removeSpanWithChildren(child));
				}
				delete this.spans[spanID];
			}
		}

		drawTableTop() {
			this.log(kleur__default['default'].grey("┌" + r("─", this.opts.width - 2) + "┐"));
		}

		drawHorizonalLine() {
			this.log(kleur__default['default'].grey("├" + r("─", this.opts.width - 2) + "┤"));
		}

		drawLine(text) {
			this.log(kleur__default['default'].grey("│ ") + text + kleur__default['default'].grey(" │"));
		}

		drawTableBottom() {
			this.log(kleur__default['default'].grey("└" + r("─", this.opts.width - 2) + "┘"));
		}

		getAlignedTexts(str, space) {
			const len = str.length;

			let left;
			if (len <= space)
				left = str + r(" ", space - len);
			else {
				left = str.slice(0, Math.max(space - 3, 0));
				left += r(".", Math.min(3, space));
			}

			return left;
		}

		drawGauge(gstart, gstop) {
			const gw = this.opts.gaugeWidth;
			const p1 = Math.floor(gw * gstart / 100);
			const p2 = Math.max(Math.floor(gw * gstop / 100) - p1, 1);
			const p3 = Math.max(gw - (p1 + p2), 0);

			return [
				kleur__default['default'].grey("["),
				kleur__default['default'].grey(r(".", p1)),
				r("■", p2),
				kleur__default['default'].grey(r(".", p3)),
				kleur__default['default'].grey("]")
			].join("");
		}

		getCaption(span) {
			let caption = span.name;

			if (span.tags.fromCache)
				caption += " *";
			if (span.tags.remoteCall)
				caption += " »";
			if (span.error)
				caption += " ×";

			return caption;
		}

		getColor(span) {
			let c = kleur__default['default'].bold;
			if (span.tags.fromCache)
				c = c().yellow;
			if (span.tags.remoteCall)
				c = c().cyan;
			if (span.duration == null)
				c = c().grey;
			if (span.error)
				c = c().red;

			return c;
		}

		getTraceInfo(main) {
			let depth = 0;
			let total = 0;
			let check = (item, level, parents) => {
				item.level = level;
				item.parents = parents || [];
				total++;
				if (level > depth)
					depth = level;

				if (item.children.length > 0) {
					item.children.forEach((spanID, idx) => {
						const span = this.spans[spanID];
						span.first = idx == 0;
						span.last = idx == item.children.length - 1;
						check(span, item.level + 1, [].concat(item.parents, [item]));
					});
				}
			};

			check(main, 1);

			return { depth, total };
		}

		getSpanIndent(spanItem) {
			if (spanItem.level > 1) {
				let s = spanItem.parents.map((item, idx) => {
					if (idx > 0)
						return item.last ? "  " : "│ ";

					return "";
				}).join("");

				s += spanItem.last ? "└─" : "├─";

				return s + (spanItem.children.length > 0 ? "┬─" : "──") + " ";
			}

			return "";
		}

		/**
		 * Print a span row
		 *
		 * @param {Object} span
		 * @param {Object} main
		 */
		printSpanTime(spanItem, mainItem, level) {
			const span = spanItem.span;
			const mainSpan = mainItem.span;
			const margin = 2 * 2;
			const w = (this.opts.width || 80) - margin;
			const gw = this.opts.gaugeWidth || 40;

			const time = span.duration == null ? "?" : humanize(span.duration);
			const indent = this.getSpanIndent(spanItem);
			const caption = this.getCaption(span);
			const info = kleur__default['default'].grey(indent) + this.getAlignedTexts(caption, w - gw - 3 - time.length - 1 - indent.length) + " " + time;

			const startTime = span.startTime || mainSpan.startTime;
			const finishTime = span.finishTime || mainSpan.finishTime;

			let gstart = (startTime - mainSpan.startTime) / (mainSpan.finishTime - mainSpan.startTime) * 100;
			let gstop = (finishTime - mainSpan.startTime) / (mainSpan.finishTime - mainSpan.startTime) * 100;

			if (Number.isNaN(gstart) && Number.isNaN(gstop)) {
				gstart = 0;
				gstop = 100;
			}
			if (gstop > 100)
				gstop = 100;

			const c = this.getColor(span);
			this.drawLine(c(info + " " + this.drawGauge(gstart, gstop)));

			if (spanItem.children.length > 0)
				spanItem.children.forEach((spanID, idx) =>
					this.printSpanTime(this.spans[spanID], mainItem, level + 1, spanItem, {
						first: idx == 0,
						last: idx == spanItem.children.length - 1
					})
				);
		}

		/**
		 * Print request traces
		 *
		 * @param {String} id
		 */
		printRequest(id) {
			const main = this.spans[id];
			if (!main) return ; // Async span

			const margin = 2 * 2;
			const w = this.opts.width - margin;

			this.drawTableTop();

			const { total, depth } = this.getTraceInfo(main);

			const truncatedID = this.getAlignedTexts(id, w - "ID: ".length - "Depth: ".length - (""+depth).length - "Total: ".length - (""+total).length - 2);
			const line = kleur__default['default'].grey("ID: ") + kleur__default['default'].bold(truncatedID) + " " + kleur__default['default'].grey("Depth: ") + kleur__default['default'].bold(depth) + " " + kleur__default['default'].grey("Total: ") + kleur__default['default'].bold(total);
			this.drawLine(line);

			this.drawHorizonalLine();

			this.printSpanTime(main, main, 1, null, {});

			this.drawTableBottom();
		}

		log(...args) {
			if (isFunction$9(this.opts.logger)) {
				return this.opts.logger(...args);
			} else {
				return this.logger.info(...args);
			}
		}
	}

	var console$2 = ConsoleTraceExporter;

	const { isFunction: isFunction$a } 		= utils_1;

	/**
	 * Event Trace Exporter.
	 *
	 * @class EventTraceExporter
	 */
	class EventTraceExporter extends base$9 {

		/**
		 * Creates an instance of EventTraceExporter.
		 * @param {Object?} opts
		 * @memberof EventTraceExporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				/** @type {String} Base URL for Zipkin server. */
				eventName: "$tracing.spans",

				sendStartSpan: false,
				sendFinishSpan: true,

				broadcast: false,

				groups: null,

				/** @type {Number} Batch send time interval. */
				interval: 5,

				spanConverter: null,

				/** @type {Object?} Default span tags */
				defaultTags: null
			});

			this.queue = [];
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof EventTraceExporter
		 */
		init(tracer) {
			super.init(tracer);

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.flush(), this.opts.interval * 1000);
				this.timer.unref();
			}

			this.defaultTags = isFunction$a(this.opts.defaultTags) ? this.opts.defaultTags.call(this, tracer) : this.opts.defaultTags;
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			return this.Promise.resolve();
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanStarted(span) {
			if (this.opts.sendStartSpan) {
				this.queue.push(span);
				if (!this.timer)
					this.flush();
			}
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof EventTraceExporter
		 */
		spanFinished(span) {
			if (this.opts.sendFinishSpan) {
				this.queue.push(span);
				if (!this.timer)
					this.flush();
			}
		}

		/**
		 * Flush tracing data to Datadog server
		 *
		 * @memberof EventTraceExporter
		 */
		flush() {
			if (this.queue.length == 0) return;

			const data = this.generateTracingData();
			this.queue.length = 0;

			if (this.opts.broadcast) {
				this.logger.debug(`Send tracing spans (${data.length} spans) broadcast events.`);
				this.broker.broadcast(this.opts.eventName, data, { groups: this.opts.groups });
			} else {
				this.logger.debug(`Send tracing spans (${data.length} spans) events.`);
				this.broker.emit(this.opts.eventName, data, { groups: this.opts.groups });
			}
		}

		/**
		 * Generate tracing data with custom converter
		 *
		 * @returns {Array<Object>}
		 * @memberof EventTraceExporter
		 */
		generateTracingData() {
			if (isFunction$a(this.opts.spanConverter))
				return this.queue.map(span => this.opts.spanConverter.call(this, span));

			return Array.from(this.queue).map(span => {
				const newSpan = Object.assign({}, span);
				if (newSpan.error)
					newSpan.error = this.errorToObject(span.error);

				return newSpan;
			});
		}

	}

	var event$1 = EventTraceExporter;

	const { isObject: isObject$e, isFunction: isFunction$b }	= utils_1;

	/**
	 * Event Trace Exporter. It sends same trace events as in Moleculer <= v0.13.
	 *
	 * @class EventLegacyTraceExporter
	 */
	class EventLegacyTraceExporter extends base$9 {

		/**
		 * Creates an instance of EventLegacyTraceExporter.
		 * @param {Object?} opts
		 * @memberof EventLegacyTraceExporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
			});
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof EventLegacyTraceExporter
		 */
		init(tracer) {
			super.init(tracer);
			this.broker = tracer.broker;
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanStarted(span) {
			const payload = this.generateMetricPayload(span);
			this.broker.emit("metrics.trace.span.start", payload);
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof EventLegacyTraceExporter
		 */
		spanFinished(span) {
			const payload = this.generateMetricPayload(span);
			this.broker.emit("metrics.trace.span.finish", payload);
		}

		/**
		 * Generate metrics payload
		 *
		 * @param {Context} ctx
		 * @returns {Object}
		 */
		generateMetricPayload(span) {
			let payload = {
				id: span.id,
				requestID: span.traceID,
				level: span.tags.callingLevel,
				startTime: span.startTime,
				remoteCall: span.tags.remoteCall
			};

			// Process extra metrics
			if (span.opts.ctx)
				this.processExtraMetrics(span.opts.ctx, payload);

			payload.action = span.tags.action;
			payload.service = span.service;

			if (span.parentID)
				payload.parent = span.parentID;

			payload.nodeID = this.broker.nodeID;
			if (payload.remoteCall)
				payload.callerNodeID = span.tags.callerNodeID;

			if (span.finishTime) {
				payload.endTime = span.finishTime;
				payload.duration = span.duration;
				payload.fromCache = span.tags.fromCache;

				if (span.error) {
					payload.error = this.errorToObject(span.error);
				}
			}

			return payload;
		}

		/**
		 * Assign extra metrics taking into account action definitions
		 *
		 * @param {Context} ctx
		 * @param {string} name Field of the context to be assigned.
		 * @param {any} payload Object for assignment.
		 *
		 * @private
		 */
		assignExtraMetrics(ctx, name, payload) {
			let def = ctx.action.metrics[name];
			// if metrics definitions is boolean do default, metrics=true
			if (def === true) {
				payload[name] = ctx[name];
			} else if (Array.isArray(def)) {
				payload[name] = ___default['default'].pick(ctx[name], def);
			} else if (isFunction$b(def)) {
				payload[name] = def(ctx[name]);
			}
		}

		/**
		 * Decide and process extra metrics taking into account action definitions
		 *
		 * @param {Context} ctx
		 * @param {any} payload Object for assignment.
		 *
		 * @private
		 */
		processExtraMetrics(ctx, payload) {
			// extra metrics (params and meta)
			if (isObject$e(ctx.action.metrics)) {
				// custom metrics def
				this.assignExtraMetrics(ctx, "params", payload);
				this.assignExtraMetrics(ctx, "meta", payload);
			}
		}


	}

	var eventLegacy = EventLegacyTraceExporter;

	/* global self */

	const scope = (typeof global !== 'undefined' && global) ||
	            (typeof self !== 'undefined' && self) ||
	            window;

	var fetch = (...args) => scope.fetch(...args);

	const { isFunction: isFunction$c } 		= utils_1;

	/**
	 * Trace Exporter for Zipkin.
	 *
	 * API v2: https://zipkin.io/zipkin-api/#/
	 * API v1: https://zipkin.io/pages/data_model.html
	 *
	 * Running Zipkin in Docker:
	 *
	 * 	 docker run -d -p 9411:9411 --name=zipkin openzipkin/zipkin
	 *
	 * @class ZipkinTraceExporter
	 */
	class ZipkinTraceExporter extends base$9 {

		/**
		 * Creates an instance of ZipkinTraceExporter.
		 * @param {Object?} opts
		 * @memberof ZipkinTraceExporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				/** @type {String} Base URL for Zipkin server. */
				baseURL: proc.env.ZIPKIN_URL || "http://localhost:9411",

				/** @type {String} Zipkin REST API version. */
				//version: "v2",

				/** @type {Number} Batch send time interval in seconds. */
				interval: 5,

				/** @type {Object} Additional payload options. */
				payloadOptions: {

					/** @type {Boolean} Set `debug` property in v2 payload. */
					debug: false,

					/** @type {Boolean} Set `shared` property in v2 payload. */
					shared: false
				},

				/** @type {Object?} Default span tags */
				defaultTags: null
			});

			this.queue = [];
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof ZipkinTraceExporter
		 */
		init(tracer) {
			super.init(tracer);

			fetch.Promise = this.broker.Promise;

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.flush(), this.opts.interval * 1000);
				this.timer.unref();
			}

			this.defaultTags = isFunction$c(this.opts.defaultTags) ? this.opts.defaultTags.call(this, tracer) : this.opts.defaultTags;
			if (this.defaultTags) {
				this.defaultTags = this.flattenTags(this.defaultTags, true);
			}
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			return this.broker.Promise.resolve();
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof ZipkinTraceExporter
		 */
		spanFinished(span) {
			this.queue.push(span);
		}

		/**
		 * Flush tracing data to Datadog server
		 *
		 * @memberof ZipkinTraceExporter
		 */
		flush() {
			if (this.queue.length == 0) return;

			const data = this.generateTracingData();
			this.queue.length = 0;

			fetch(`${this.opts.baseURL}/api/v2/spans`, {
				method: "post",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				}
			}).then(res => {
				if (res.status >= 400) {
					this.logger.warn(`Unable to upload tracing spans to Zipkin. Status: ${res.status} ${res.statusText}`);
				} else {
					this.logger.debug(`Tracing spans (${data.length} spans) are uploaded to Zipkin. Status: ${res.statusText}`);
				}
			}).catch(err => {
				this.logger.warn("Unable to upload tracing spans to Zipkin. Error:" + err.message, err);
			});
		}

		/**
		 * Generate tracing data for Zipkin
		 *
		 * @returns {Array<Object>}
		 * @memberof ZipkinTraceExporter
		 */
		generateTracingData() {
			return this.queue.map(span => this.makePayload(span));
		}

		/**
		 * Create Zipkin v2 payload from metric event
		 *
		 * @param {Span} span
		 * @returns {Object}
		 */
		makePayload(span) {
			const serviceName = span.service ? span.service.fullName : null;
			const payload = {
				name: span.name,
				kind: "SERVER",

				// Trace & span IDs
				traceId: this.convertID(span.traceID),
				id: this.convertID(span.id),
				parentId: this.convertID(span.parentID),

				localEndpoint: { serviceName },
				remoteEndpoint: { serviceName },

				annotations: [],

				timestamp: this.convertTime(span.startTime),
				duration: this.convertTime(span.duration),

				tags: {
					service: serviceName,
					"span.type": span.type,
				},

				debug: this.opts.payloadOptions.debug,
				shared: this.opts.payloadOptions.shared
			};

			if (span.error) {
				payload.tags["error"] = span.error.message;

				payload.annotations.push({
					value: "error",
					endpoint: { serviceName: serviceName, ipv4: "", port: 0 },
					timestamp: this.convertTime(span.finishTime)
				});
			}

			Object.assign(
				payload.tags,
				this.defaultTags || {},
				this.flattenTags(span.tags, true),
				this.flattenTags(this.errorToObject(span.error), true, "error") || {}
			);

			return payload;
		}

		/**
		 * Convert Context ID to Zipkin format
		 *
		 * @param {String} id
		 * @returns {String}
		 */
		convertID(id) {
			return id ? id.replace(/-/g, "").substring(0, 16) : null;
		}

		/**
		 * Convert JS timestamp to microseconds
		 *
		 * @param {Number} ts
		 * @returns {Number}
		 */
		convertTime(ts) {
			return ts != null ? Math.round(ts * 1000) : null;
		}

	}

	var zipkin = ZipkinTraceExporter;

	const { isFunction: isFunction$d } 		= utils_1;

	/**
	 * Trace Exporter for NewRelic using Zipkin data.
	 *
	 * NewRelic zipkin tracer: https://docs.newrelic.com/docs/understand-dependencies/distributed-tracing/trace-api/report-zipkin-format-traces-trace-api
	 * API v2: https://zipkin.io/zipkin-api/#/
	 *
	 * @class NewRelicTraceExporter
	 */
	class NewRelicTraceExporter extends base$9 {

		/**
		 * Creates an instance of NewRelicTraceExporter.
		 * @param {Object?} opts
		 * @memberof NewRelicTraceExporter
		 */
		constructor(opts) {
			super(opts);

			this.opts = ___default['default'].defaultsDeep(this.opts, {
				/** @type {String} Base URL for NewRelic server. */
				baseURL:
				proc.env.NEW_RELIC_TRACE_API_URL || "https://trace-api.newrelic.com",

			  /** @type {String} NewRelic Insert API Key */
			  insertKey: "",

			  /** @type {Number} Batch send time interval in seconds. */
			  interval: 5,

			  /** @type {Object} Additional payload options. */
			  payloadOptions: {
				/** @type {Boolean} Set `debug` property in v2 payload. */
					debug: false,

					/** @type {Boolean} Set `shared` property in v2 payload. */
					shared: false,
			  },

			  /** @type {Object?} Default span tags */
			  defaultTags: null,
			});

			this.queue = [];
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof NewRelicTraceExporter
		 */
		init(tracer) {
			super.init(tracer);

			fetch.Promise = this.broker.Promise;

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.flush(), this.opts.interval * 1000);
				this.timer.unref();
			}

			this.defaultTags = isFunction$d(this.opts.defaultTags) ? this.opts.defaultTags.call(this, tracer) : this.opts.defaultTags;
			if (this.defaultTags) {
				this.defaultTags = this.flattenTags(this.defaultTags, true);
			}
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			return this.broker.Promise.resolve();
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof NewRelicTraceExporter
		 */
		spanFinished(span) {
			this.queue.push(span);
		}

		/**
		 * Flush tracing data to NewRelic Zipkin api endpoint
		 *
		 * @memberof NewRelicTraceExporter
		 */
		flush() {
			if (this.queue.length == 0) return;

			const data = this.generateTracingData();
			this.queue.length = 0;

			fetch(`${this.opts.baseURL}/trace/v1`,
				{
					method: "post",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						"Api-Key": this.opts.insertKey,
	 				"Data-Format": "zipkin",
	 				"Data-Format-Version": "2"
					}
				}).then(res => {
				if (res.status >= 400) {
					this.logger.warn(`Unable to upload tracing spans to NewRelic. Status: ${res.status} ${res.statusText}`);
				} else {
					this.logger.debug(`Tracing spans (${data.length} spans) uploaded to NewRelic. Status: ${res.statusText}`);
				}
			}).catch(err => {
				this.logger.warn("Unable to upload tracing spans to NewRelic. Error:" + err.message, err);
			});
		}

		/**
		 * Generate tracing data for NewRelic
		 *
		 * @returns {Array<Object>}
		 * @memberof NewRelicTraceExporter
		 */
		generateTracingData() {
			return this.queue.map(span => this.makePayload(span));
		}

		/**
		 * Create Zipkin v2 payload from metric event
		 *
		 * @param {Span} span
		 * @returns {Object}
		 */
		makePayload(span) {
			const serviceName = span.service ? span.service.fullName : null;
			const payload = {
				name: span.name,
				kind: "CONSUMER",

				// Trace & span IDs
				traceId: this.convertID(span.traceID),
				id: this.convertID(span.id),
				parentId: this.convertID(span.parentID),

				localEndpoint: { serviceName },
				remoteEndpoint: { serviceName },

				annotations: [
					{ timestamp: this.convertTime(span.startTime), value: "sr" },
					{ timestamp: this.convertTime(span.finishTime), value: "ss" },
				],

				timestamp: this.convertTime(span.startTime),
				duration: this.convertTime(span.duration),

				tags: {
					service: serviceName,
					"span.type": span.type,
				},

				debug: this.opts.payloadOptions.debug,
				shared: this.opts.payloadOptions.shared
			};

			if (span.error) {
				payload.tags["error"] = span.error.message;

				payload.annotations.push({
					value: "error",
					endpoint: { serviceName: serviceName, ipv4: "", port: 0 },
					timestamp: this.convertTime(span.finishTime)
				});
			}

			Object.assign(
				payload.tags,
				this.defaultTags || {},
				this.flattenTags(span.tags, true),
				this.flattenTags(this.errorToObject(span.error), true, "error") || {}
			);

			return payload;
		}

		/**
		 * Convert Context ID to Zipkin format
		 *
		 * @param {String} id
		 * @returns {String}
		 */
		convertID(id) {
			return id ? id.replace(/-/g, "").substring(0, 16) : null;
		}

		/**
		 * Convert JS timestamp to microseconds
		 *
		 * @param {Number} ts
		 * @returns {Number}
		 */
		convertTime(ts) {
			return ts != null ? Math.round(ts * 1000) : null;
		}

	}

	var newrelic = NewRelicTraceExporter;

	const { isObject: isObject$f, isString: isString$f } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$a } = errors;

	const Exporters = {
		Base: base$9,
		Console: console$2,
		Datadog: require$$19,
		//DatadogSimple: require("./datadog-simple"),
		Event: event$1,
		EventLegacy: eventLegacy,
		Jaeger: require$$19,
		Zipkin: zipkin,
		NewRelic: newrelic
	};

	function getByName$9(name) {
		/* istanbul ignore next */
		if (!name)
			return null;

		let n = Object.keys(Exporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n)
			return Exporters[n];
	}

	/**
	 * Resolve exporter by name
	 *
	 * @param {object|string} opt
	 * @returns {Exporters.Base}
	 * @memberof ServiceBroker
	 */
	function resolve$9(opt) {
		if (opt instanceof Exporters.Base) {
			return opt;
		} else if (isString$f(opt)) {
			let ExporterClass = getByName$9(opt);
			if (ExporterClass)
				return new ExporterClass();
			else
				throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt}'.`, { type: opt });

		} else if (isObject$f(opt)) {
			let ExporterClass = getByName$9(opt.type);
			if (ExporterClass)
				return new ExporterClass(opt.options);
			else
				throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt.type}'.`, { type: opt.type });
		}

		throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt}'.`, { type: opt });
	}

	function register$9(name, value) {
		Exporters[name] = value;
	}

	var exporters = Object.assign(Exporters, { resolve: resolve$9, register: register$9 });

	/**
	 * Rate Limiter class for Tracing.
	 *
	 * Inspired by
	 * 	https://github.com/jaegertracing/jaeger-client-node/blob/master/src/rate_limiter.js
	 *
	 * @class RateLimiter
	 */
	class RateLimiter {
		constructor(opts) {
			this.opts = ___default['default'].defaultsDeep(opts, {
				tracesPerSecond: 1
			});

			this.lastTime = Date.now();
			this.balance = 0;
			this.maxBalance = this.opts.tracesPerSecond < 1 ? 1 : this.opts.tracesPerSecond;
		}

		check(cost = 1) {
			const now = Date.now();
			const elapsedTime = (now - this.lastTime) / 1000;
			this.lastTime = now;

			this.balance += elapsedTime * this.opts.tracesPerSecond;
			if (this.balance > this.maxBalance)
				this.balance = this.maxBalance;

			if (this.balance >= cost) {
				this.balance -= cost;
				return true;
			}

			return false;
		}
	}

	var rateLimiter = RateLimiter;

	const loadTime = getNanoSeconds();
	const nodeLoadTime = loadTime - proc.uptime() * 1e9;

	function getNanoSeconds() {
		const time = proc.hrtime();
		return time[0] * 1e9 + time[1];
	}

	function now() {
		return (getNanoSeconds() - nodeLoadTime) / 1e6;
	}

	const loadNs = now();
	const loadMs = Date.now();

	var now_1 = () => loadMs + now() - loadNs;

	function defProp(instance, propName, value, readOnly = false) {
		Object.defineProperty(instance, propName, {
			value,
			writable: !!readOnly,
			enumerable: false
		});
	}

	/**
	 * Trace Span class
	 *
	 * @class Span
	 */
	class Span {

		/**
		 * Creates an instance of Span.
		 * @param {Tracer} tracer
		 * @param {String} name
		 * @param {Object?} opts
		 *
		 * @memberof Span
		 */
		constructor(tracer, name, opts) {
			defProp(this, "tracer", tracer, true);
			defProp(this, "logger", this.tracer.logger, true);
			defProp(this, "opts", opts || {});
			defProp(this, "meta", {});

			this.name = name;
			this.type = this.opts.type || "custom";
			this.id = this.opts.id || this.tracer.broker.generateUid();
			this.traceID = this.opts.traceID || this.id;
			this.parentID = this.opts.parentID;

			if (this.opts.service) {
				if (typeof this.opts.service == "string") {
					this.service = {
						name: this.opts.service,
						fullName: this.opts.service,
					};
				} else {
					this.service = {
						name: this.opts.service.name,
						version: this.opts.service.version,
						fullName: this.opts.service.fullName,
					};
				}
			}

			this.priority = this.opts.priority != null ? this.opts.priority : 5;
			this.sampled = this.opts.sampled != null ? this.opts.sampled : this.tracer.shouldSample(this);

			this.startTime = null;
			this.finishTime = null;
			this.duration = null;

			this.error = null;

			this.logs = [];
			this.tags = {};

			if (this.opts.defaultTags)
				this.addTags(this.opts.defaultTags);

			if (this.opts.tags)
				this.addTags(this.opts.tags);
		}

		/**
		 * Start span.
		 *
		 * @param {Number?} time
		 * @returns {Span}
		 * @memberof Span
		 */
		start(time) {
			this.logger.debug(`[${this.id}] Span '${this.name}' is started.`);

			this.startTime = time || now_1();
			// console.log(`"${this.name}" start time: ${this.startTime}`);

			this.tracer.spanStarted(this);

			return this;
		}

		/**
		 * Add tags. It will be merged with previous tags.
		 *
		 * @param {Object} obj
		 * @returns {Span}
		 *
		 * @memberof Span
		 */
		addTags(obj) {
			Object.assign(this.tags, obj);

			return this;
		}

		/**
		 * Log a trace event.
		 *
		 * @param {String} name
		 * @param {Object?} fields
		 * @param {Number?} time
		 * @returns {Span}
		 * @memberof Span
		 */
		log(name, fields, time) {
			time = time || now_1();

			this.logs.push({
				name,
				fields: fields || {},
				time,
				elapsed: time - this.startTime
			});

			this.logger.debug(`[${this.id}] Span '${this.name}' has a new log event: ${name}.`);

			return this;
		}

		/**
		 * Set error span.
		 *
		 * @param {Error} err
		 * @memberof Span
		 */
		setError(err) {
			this.error = err != null ? err : true;

			return this;
		}

		/**
		 * Finish span.
		 *
		 * @param {Number?} time
		 * @returns {Span}
		 * @memberof Span
		 */
		finish(time) {
			this.finishTime = time ? time : now_1();
			this.duration = this.finishTime - this.startTime;

			// console.log(`"${this.name}" stop time: ${this.finishTime}  Duration: ${this.duration}`);

			this.logger.debug(`[${this.id}] Span '${this.name}' is finished. Duration: ${Number(this.duration).toFixed(3)} ms`, this.tags);

			this.tracer.spanFinished(this);

			return this;
		}

		/**
		 * Check the span is active or finished.
		 *
		 * @returns {boolean}
		 */
		isActive() {
			return this.finishTime == null;
		}

		/**
		 * Start a child span.
		 *
		 * @param {String} name
		 * @param {Object?} opts
		 * @returns {Span} Child span
		 * @memberof Span
		 */
		startSpan(name, opts) {
			const r = {
				traceID: this.traceID,
				parentID: this.id,
				sampled: this.sampled,
				service: this.service
			};
			return this.tracer.startSpan(name, opts ? Object.assign(r, opts) : r);
		}

	}

	var span = Span;

	//const AsyncStorage = require("../async-storage");


	const { isFunction: isFunction$e } = utils_1;

	/**
	 * Moleculer Tracer class
	 */
	class Tracer {

		/**
		 * Creates an instance of Tracer.
		 *
		 * @param {ServiceBroker} broker
		 * @param {Object} opts
		 * @memberof Tracer
		 */
		constructor(broker, opts) {
			this.broker = broker;
			this.logger = broker.getLogger("tracer");

			if (opts === true || opts === false)
				opts = { enabled: opts };

			this.opts = ___default['default'].defaultsDeep({}, opts, {
				enabled: true,

				exporter: null,

				sampling: {
					// Constants sampling
					rate: 1.0, // 0.0 - Never, 1.0 > x > 0.0 - Fix, 1.0 - Always

					// Ratelimiting sampling https://opencensus.io/tracing/sampling/ratelimited/
					tracesPerSecond: null, // 1: 1 trace / sec, 5: 5 traces / sec, 0.1: 1 trace / 10 secs

					minPriority: null
				},

				actions: true,
				events: false,

				errorFields: ["name", "message", "code", "type", "data"],
				stackTrace: false,

				defaultTags: null,

				tags: {
					action: null,
					event: null,
				}
			});

			if (this.opts.stackTrace && this.opts.errorFields.indexOf("stack") === -1)
				this.opts.errorFields.push("stack");

			this.sampleCounter = 0;

			if (this.opts.sampling.tracesPerSecond != null && this.opts.sampling.tracesPerSecond > 0) {
				this.rateLimiter = new rateLimiter({
					tracesPerSecond: this.opts.sampling.tracesPerSecond
				});
			}

			//this.scope = new AsyncStorage(this.broker);
			//this.scope.enable();
			//this._scopeEnabled = true;

			if (this.opts.enabled)
				this.logger.info("Tracing: Enabled");
		}

		/**
		 * Initialize Tracer.
		 */
		init() {
			if (this.opts.enabled) {

				this.defaultTags = isFunction$e(this.opts.defaultTags) ? this.opts.defaultTags.call(this, this) : this.opts.defaultTags;

				// Create Exporter instances
				if (this.opts.exporter) {
					const exporters$1 = Array.isArray(this.opts.exporter) ? this.opts.exporter : [this.opts.exporter];

					this.exporter = ___default['default'].compact(exporters$1).map(r => {
						const exporter = exporters.resolve(r);
						exporter.init(this);
						return exporter;
					});

					const exporterNames = this.exporter.map(exporter => this.broker.getConstructorName(exporter));
					this.logger.info(`Tracing exporter${exporterNames.length > 1 ? "s": ""}: ${exporterNames.join(", ")}`);
				}

			}
		}

		/**
		 * Stop Tracer.
		 */
		stop() {
			if (this.exporter) {
				return this.broker.Promise.all(this.exporter.map(r => r.stop()));
			}
			return this.broker.Promise.resolve();
		}

		/**
		 * Check tracing is enabled
		 *
		 * @returns {boolean}
		 * @memberof MetricRegistry
		 */
		isEnabled() {
			return this.opts.enabled;
		}

		/**
		 * Disable trace hooks and clear the store - noop if scope is already stopped
		 *
		 * @memberof Tracer
		 *
		stopAndClearScope() {
			if (this._scopeEnabled) {
				this.scope.stop();
				this._scopeEnabled = false;
			}
		}*/

		/**
		 * Renable the trace hooks - noop if scope is already enabled
		 *
		 * @memberof Tracer
		 *
		restartScope() {
			if (!this._scopeEnabled) {
				this.scope.enable();
				this._scopeEnabled = true;
			}
		}*/

		/**
		 * Decide that span should be sampled.
		 *
		 * @param {Span} span
		 * @returns {Boolean}
		 * @memberof Tracer
		 */
		shouldSample(span) {
			if (this.opts.sampling.minPriority != null) {
				if (span.priority < this.opts.sampling.minPriority)
					return false;
			}

			if (this.rateLimiter) {
				return this.rateLimiter.check();
			}

			if (this.opts.sampling.rate == 0)
				return false;

			if (this.opts.sampling.rate == 1)
				return true;

			if (++this.sampleCounter * this.opts.sampling.rate >= 1.0) {
				this.sampleCounter = 0;
				return true;
			}

			return false;
		}

		/**
		 * Start a new Span.
		 *
		 * @param {String} name
		 * @param {Object?} opts
		 * @returns {Span}
		 *
		 * @memberof Tracer
		 */
		startSpan(name, opts = {}) {
			let parentOpts = {};
			if (opts.parentSpan) {
				parentOpts.traceID = opts.parentSpan.traceID;
				parentOpts.parentID = opts.parentSpan.id;
				parentOpts.sampled = opts.parentSpan.sampled;
			}

			const span$1 = new span(this, name, Object.assign({
				type: "custom",
				defaultTags: this.defaultTags
			}, parentOpts, opts, { parentSpan: undefined }));

			span$1.start();

			return span$1;
		}

		/**
		 * Invoke Exporter method.
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @memberof Tracer
		 */
		invokeExporter(method, args) {
			if (this.exporter) {
				this.exporter.forEach(exporter => exporter[method].apply(exporter, args));
			}
		}

		/**
		 * Set the active span
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 *
		setCurrentSpan(span) {
			const state = this.scope.getSessionData() || {
				spans: []
			};

			state.spans.push(span);
			this.scope.setSessionData(state);

			span.meta.state = state;
		}*/

		/**
		 * Remove the active span (because async block destroyed)
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 *
		removeCurrentSpan(span) {
			const state = span.meta.state || this.scope.getSessionData();
			if (state && state.spans.length > 0) {
				const idx = state.spans.indexOf(span);
				if (idx >= 0)
					state.spans.splice(idx, 1);
			}
		}*/

		/**
		 * Get the current active span
		 *
		 * @returns {Span}
		 * @memberof Tracer
		 *
		getCurrentSpan() {
			const state = this.scope.getSessionData();
			return state ? state.spans[state.spans.length - 1] : null;
		}*/

		/**
		 * Get the current trace ID
		 *
		 * @returns
		 * @memberof Tracer
		 */
		getCurrentTraceID() {
			return null;
			//const span = this.getCurrentSpan();
			//return span ? span.traceID : null;
		}

		/**
		 * Get the active span ID (for the next span as parent ID)
		 *
		 * @returns
		 * @memberof Tracer
		 */
		getActiveSpanID() {
			return null;
			//const span = this.getCurrentSpan();
			//return span ? span.id : null;
		}

		/**
		 * Called when a span started. Call exporters.
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 */
		spanStarted(span) {
			//this.setCurrentSpan(span);

			if (span.sampled)
				this.invokeExporter("spanStarted", [span]);
		}

		/**
		 * Called when a span finished. Call exporters.
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 */
		spanFinished(span) {
			//this.removeCurrentSpan(span);

			if (span.sampled)
				this.invokeExporter("spanFinished", [span]);
		}
	}

	var tracer = Tracer;

	var tracing$1 = {
		Tracer: tracer,
		Span: span,
		Exporters: exporters,
	};

	const { ServiceSchemaError, MoleculerError: MoleculerError$2 } 	= errors;
	const { isObject: isObject$g, isFunction: isFunction$f, flatten: flatten$1 }	= utils_1;

	/**
	 * Wrap a handler Function to an object with a `handler` property.
	 *
	 * @param {Function|Object} o
	 * @returns {Object}
	 */
	function wrapToHander(o) {
		return isFunction$f(o) ? { handler: o } : o;
	}

	/**
	 * Wrap any value to an array.
	 * @param {any} o
	 * @returns {Array}
	 */
	function wrapToArray(o) {
		return Array.isArray(o) ? o : [o];
	}

	function isNewSignature(args) {
		return args.length > 0 && ["ctx", "context"].indexOf(args[0].toLowerCase()) !== -1;
	}


	/**
	 * Service class
	 *
	 * @class Service
	 */
	class Service {

		/**
		 * Creates an instance of Service by schema.
		 *
		 * @param {ServiceBroker} 	broker	broker of service
		 * @param {Object} 			schema	schema of service
		 *
		 * @memberof Service
		 */
		constructor(broker, schema) {
			if (!isObject$g(broker))
				throw new ServiceSchemaError("Must set a ServiceBroker instance!");

			this.broker = broker;

			if (broker)
				this.Promise = broker.Promise;

			if (schema)
				this.parseServiceSchema(schema);
		}

		/**
		 * Parse Service schema & register as local service
		 *
		 * @param {Object} schema of Service
		 */
		parseServiceSchema(schema) {
			if (!isObject$g(schema))
				throw new ServiceSchemaError("The service schema can't be null. Maybe is it not a service schema?");

			this.originalSchema = ___default['default'].cloneDeep(schema);

			if (schema.mixins) {
				schema = Service.applyMixins(schema);
			}

			if (isFunction$f(schema.merged)) {
				schema.merged.call(this, schema);
			} else if (Array.isArray(schema.merged)) {
				schema.merged.forEach(fn => fn.call(this, schema));
			}

			this.broker.callMiddlewareHookSync("serviceCreating", [this, schema]);

			if (!schema.name) {
				/* eslint-disable-next-line */
				console.error("Service name can't be empty! Maybe it is not a valid Service schema. Maybe is it not a service schema?", { schema });
				throw new ServiceSchemaError("Service name can't be empty! Maybe it is not a valid Service schema. Maybe is it not a service schema?", { schema });
			}

			this.name = schema.name;
			this.version = schema.version;
			this.settings = schema.settings || {};
			this.metadata = schema.metadata || {};
			this.schema = schema;

			this.fullName = Service.getVersionedFullName(this.name, this.settings.$noVersionPrefix !== true ? this.version : undefined);

			this.logger = this.broker.getLogger(this.fullName, {
				svc: this.name,
				ver: this.version
			});

			this.actions = {}; // external access to actions
			this.events = {}; // external access to event handlers.

			// Service item for Registry
			const serviceSpecification = {
				name: this.name,
				version: this.version,
				fullName: this.fullName,
				settings: this._getPublicSettings(this.settings),
				metadata: this.metadata,
				actions: {},
				events: {}
			};

			// Register methods
			if (isObject$g(schema.methods)) {

				___default['default'].forIn(schema.methods, (method, name) => {
					/* istanbul ignore next */
					if (["name", "version", "settings", "metadata", "dependencies", "schema", "broker", "actions", "logger", "created", "started", "stopped", "_start", "_stop", "_init"].indexOf(name) != -1) {
						throw new ServiceSchemaError(`Invalid method name '${name}' in '${this.name}' service!`);
					}

					this._createMethod(method, name);
				});
			}

			// Register actions
			if (isObject$g(schema.actions)) {
				___default['default'].forIn(schema.actions, (action, name) => {
					if (action === false)
						return;

					let innerAction = this._createAction(action, name);

					serviceSpecification.actions[innerAction.name] = innerAction;

					const wrappedHandler = this.broker.middlewares.wrapHandler("localAction", innerAction.handler, innerAction);

					// Expose to be callable as `this.actions.find({ ...params })`
					const ep = this.broker.registry.createPrivateActionEndpoint(innerAction);
					this.actions[name] = (params, opts) => {
						let ctx;
						if (opts && opts.ctx) {
							// Reused context (in case of retry)
							ctx = opts.ctx;
						} else {
							ctx = this.broker.ContextFactory.create(this.broker, ep, params, opts || {});
						}
						return wrappedHandler(ctx);
					};

				});
			}

			// Event subscriptions
			if (isObject$g(schema.events)) {
				___default['default'].forIn(schema.events, (event, name) => {
					const innerEvent = this._createEvent(event, name);
					serviceSpecification.events[innerEvent.name] = innerEvent;

					// Expose to be callable as `this.events[''](params, opts);
					this.events[innerEvent.name] = (params, opts) => {
						let ctx;
						if (opts && opts.ctx) {
							// Reused context (in case of retry)
							ctx = opts.ctx;
						} else {
							const ep = {
								id: this.broker.nodeID,
								event: innerEvent
							};
							ctx = this.broker.ContextFactory.create(this.broker, ep, params, opts || {});
						}
						ctx.eventName = name;
						ctx.eventType = "emit";
						ctx.eventGroups = [innerEvent.group || this.name];

						return innerEvent.handler(ctx);
					};
				});
			}

			this._serviceSpecification = serviceSpecification;

			// Initialize
			this._init();
		}

		/**
		 * Return a service settings without protected properties.
		 *
		 * @param {Object?} settings
		 */
		_getPublicSettings(settings) {
			if (settings && Array.isArray(settings.$secureSettings)) {
				return ___default['default'].omit(settings, [].concat(settings.$secureSettings, ["$secureSettings"]));
			}

			return settings;
		}

		/**
		 * Initialize service. It called `created` handler in schema
		 *
		 * @private
		 * @memberof Service
		 */
		_init() {
			this.logger.debug(`Service '${this.fullName}' is creating...`);
			if (isFunction$f(this.schema.created)) {
				this.schema.created.call(this);
			} else if (Array.isArray(this.schema.created)) {
				this.schema.created.forEach(fn => fn.call(this));
			}

			this.broker.addLocalService(this);

			this.broker.callMiddlewareHookSync("serviceCreated", [this]);

			this.logger.debug(`Service '${this.fullName}' created.`);
		}

		/**
		 * Start service
		 *
		 * @returns {Promise}
		 * @private
		 * @memberof Service
		 */
		_start() {
			this.logger.debug(`Service '${this.fullName}' is starting...`);
			return this.Promise.resolve()
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStarting", [this]);
				})
				.then(() => {
					// Wait for dependent services
					if (this.schema.dependencies)
						return this.waitForServices(this.schema.dependencies, this.settings.$dependencyTimeout || 0, this.settings.$dependencyInterval || this.broker.options.dependencyInterval);
				})
				.then(() => {
					if (isFunction$f(this.schema.started))
						return this.Promise.method(this.schema.started).call(this);

					if (Array.isArray(this.schema.started)) {
						return this.schema.started
							.map(fn => this.Promise.method(fn.bind(this)))
							.reduce((p, fn) => p.then(() => fn()), this.Promise.resolve());
					}
				})
				.then(() => {
					// Register service
					this.broker.registerLocalService(this._serviceSpecification);
					return null;
				})
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStarted", [this]);
				})
				.then(() => this.logger.info(`Service '${this.fullName}' started.`));
		}

		/**
		 * Stop service
		 *
		 * @returns {Promise}
		 * @private
		 * @memberof Service
		 */
		_stop() {
			this.logger.debug(`Service '${this.fullName}' is stopping...`);
			return this.Promise.resolve()
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStopping", [this], { reverse: true });
				})
				.then(() => {
					if (isFunction$f(this.schema.stopped))
						return this.Promise.method(this.schema.stopped).call(this);

					if (Array.isArray(this.schema.stopped)) {
						const arr = Array.from(this.schema.stopped).reverse();
						return arr
							.map(fn => this.Promise.method(fn.bind(this)))
							.reduce((p, fn) => p.then(() => fn()), this.Promise.resolve());
					}

					return this.Promise.resolve();
				})
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStopped", [this], { reverse: true });
				})
				.then(() => this.logger.info(`Service '${this.fullName}' stopped.`));
		}

		/**
		 * Create an external action handler for broker (internal command!)
		 *
		 * @param {Object|Function} actionDef
		 * @param {String} name
		 * @returns {Object}
		 *
		 * @private
		 * @memberof Service
		 */
		_createAction(actionDef, name) {
			let action;
			if (isFunction$f(actionDef)) {
				// Wrap to an object
				action = {
					handler: actionDef
				};
			} else if (isObject$g(actionDef)) {
				action = ___default['default'].cloneDeep(actionDef);
			} else {
				throw new ServiceSchemaError(`Invalid action definition in '${name}' action in '${this.fullName}' service!`);
			}

			let handler = action.handler;
			if (!isFunction$f(handler)) {
				throw new ServiceSchemaError(`Missing action handler on '${name}' action in '${this.fullName}' service!`);
			}

			action.rawName = action.name || name;
			if (this.settings.$noServiceNamePrefix !== true)
				action.name = this.fullName + "." + action.rawName;
			else
				action.name = action.rawName;

			if (action.cache === undefined && this.settings.$cache !== undefined) {
				action.cache = this.settings.$cache;
			}

			action.service = this;
			action.handler = this.Promise.method(handler.bind(this));

			return action;
		}

		/**
		 * Create an internal service method.
		 *
		 * @param {Object|Function} methodDef
		 * @param {String} name
		 * @returns {Object}
		 */
		_createMethod(methodDef, name) {
			let method;
			if (isFunction$f(methodDef)) {
				// Wrap to an object
				method = {
					handler: methodDef
				};
			} else if (isObject$g(methodDef)) {
				method = methodDef;
			} else {
				throw new ServiceSchemaError(`Invalid method definition in '${name}' method in '${this.fullName}' service!`);
			}

			if (!isFunction$f(method.handler)) {
				throw new ServiceSchemaError(`Missing method handler on '${name}' method in '${this.fullName}' service!`);
			}

			method.name = name;
			method.service = this;
			method.handler = method.handler.bind(this);

			this[name] = this.broker.middlewares.wrapHandler("localMethod", method.handler, method);

			return method;
		}

		/**
		 * Create an event subscription for broker
		 *
		 * @param {Object|Function} eventDef
		 * @param {String} name
		 * @returns {Object}
		 *
		 * @private
		 * @memberof Service
		 */
		_createEvent(eventDef, name) {
			let event;
			if (isFunction$f(eventDef) || Array.isArray(eventDef)) {
				event = {
					handler: eventDef
				};
			} else if (isObject$g(eventDef)) {
				event = ___default['default'].cloneDeep(eventDef);
			} else {
				throw new ServiceSchemaError(`Invalid event definition in '${name}' event in '${this.fullName}' service!`);
			}

			if (!isFunction$f(event.handler) && !Array.isArray(event.handler)) {
				throw new ServiceSchemaError(`Missing event handler on '${name}' event in '${this.fullName}' service!`);
			}

			// Detect new or legacy parameter list of event handler
			// Legacy: handler(payload, sender, eventName)
			// New: handler(ctx)
			let handler;
			if (isFunction$f(event.handler)) {
				const args = functionArguments__default['default'](event.handler);
				handler = this.Promise.method(event.handler);
				handler.__newSignature = event.context === true || isNewSignature(args);
			} else if (Array.isArray(event.handler)) {
				handler = event.handler.map(h => {
					const args = functionArguments__default['default'](h);
					h = this.Promise.method(h);
					h.__newSignature = event.context === true || isNewSignature(args);
					return h;
				});
			}

			if (!event.name)
				event.name = name;

			event.service = this;
			const self = this;
			if (isFunction$f(handler)) {
				// Call single handler
				event.handler = function(ctx) {
					return handler.apply(self, handler.__newSignature ? [ctx] : [ctx.params, ctx.nodeID, ctx.eventName, ctx]);
				};
			} else if (Array.isArray(handler)) {
				// Call multiple handler
				event.handler = function(ctx) {
					return self.Promise.all(handler.map(fn => fn.apply(self, fn.__newSignature ? [ctx] : [ctx.params, ctx.nodeID, ctx.eventName, ctx])));
				};
			}

			return event;
		}

		/**
		 * Call a local event handler. Useful for unit tests.
		 *
		 * @param {String} eventName
		 * @param {any?} params
		 * @param {Object?} opts
		 */
		emitLocalEventHandler(eventName, params, opts) {
			if (!this.events[eventName])
				return Promise.reject(new MoleculerError$2(`No '${eventName}' registered local event handler`, 500, "NOT_FOUND_EVENT", { eventName }));

			return this.events[eventName](params, opts);
		}

		/**
		 * Getter of current Context.
		 * @returns {Context?}
		 *
		 * @memberof Service
		 *
		get currentContext() {
			return this.broker.getCurrentContext();
		}*/

		/**
		 * Setter of current Context
		 *
		 * @memberof Service
		 *
		set currentContext(ctx) {
			this.broker.setCurrentContext(ctx);
		}*/

		/**
		 * Wait for other services
		 *
		 * @param {String|Array<String>} serviceNames
		 * @param {Number} timeout Timeout in milliseconds
		 * @param {Number} interval Check interval in milliseconds
		 * @returns {Promise}
		 * @memberof Service
		 */
		waitForServices(serviceNames, timeout, interval) {
			return this.broker.waitForServices(serviceNames, timeout, interval, this.logger);
		}

		/**
		 * Apply `mixins` list in schema. Merge the schema with mixins schemas. Returns with the mixed schema
		 *
		 * @static
		 * @param {Schema} schema
		 * @returns {Schema}
		 *
		 * @memberof Service
		 */
		static applyMixins(schema) {
			if (schema.mixins) {
				const mixins = Array.isArray(schema.mixins) ? schema.mixins : [schema.mixins];
				if (mixins.length > 0) {
					const mixedSchema = Array.from(mixins).reverse().reduce((s, mixin) => {
						if (mixin.mixins)
							mixin = Service.applyMixins(mixin);

						return s ? Service.mergeSchemas(s, mixin) : mixin;
					}, null);

					return Service.mergeSchemas(mixedSchema, schema);
				}
			}

			/* istanbul ignore next */
			return schema;
		}

		/**
		 * Merge two Service schema
		 *
		 * @static
		 * @param {Object} mixinSchema		Mixin schema
		 * @param {Object} svcSchema 		Service schema
		 * @returns {Object} Mixed schema
		 *
		 * @memberof Service
		 */
		static mergeSchemas(mixinSchema, svcSchema) {
			const res = ___default['default'].cloneDeep(mixinSchema);
			const mods = ___default['default'].cloneDeep(svcSchema);

			Object.keys(mods).forEach(key => {
				if (["name", "version"].indexOf(key) !== -1 && mods[key] !== undefined) {
					// Simple overwrite
					res[key] = mods[key];
				} else if (key == "settings") {
					// Merge with defaultsDeep
					res[key] = Service.mergeSchemaSettings(mods[key], res[key]);

				} else if (key == "metadata") {
					// Merge with defaultsDeep
					res[key] = Service.mergeSchemaMetadata(mods[key], res[key]);

				} else if (key == "hooks") {
					// Merge & concat
					res[key] = Service.mergeSchemaHooks(mods[key], res[key] || {});

				} else if (key == "actions") {
					// Merge with defaultsDeep
					res[key] = Service.mergeSchemaActions(mods[key], res[key] || {});

				} else if (key == "methods") {
					// Overwrite
					res[key] = Service.mergeSchemaMethods(mods[key], res[key]);

				} else if (key == "events") {
					// Merge & concat by groups
					res[key] = Service.mergeSchemaEvents(mods[key], res[key] || {});

				} else if (["merged", "created", "started", "stopped"].indexOf(key) !== -1) {
					// Concat lifecycle event handlers
					res[key] = Service.mergeSchemaLifecycleHandlers(mods[key], res[key]);

				} else if (key == "mixins") {
					// Concat mixins
					res[key] = Service.mergeSchemaUniqArray(mods[key], res[key]);

				} else if (key == "dependencies") {
					// Concat mixins
					res[key] = Service.mergeSchemaUniqArray(mods[key], res[key]);

				} else {
					const customFnName = "mergeSchema" + key.replace(/./, key[0].toUpperCase()); // capitalize first letter
					if (isFunction$f(Service[customFnName])) {
						res[key] = Service[customFnName](mods[key], res[key]);
					} else {
						res[key] = Service.mergeSchemaUnknown(mods[key], res[key]);
					}
				}
			});

			return res;
		}

		/**
		 * Merge `settings` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaSettings(src, target) {
			if ((target && target.$secureSettings) || (src && src.$secureSettings)) {
				const srcSS = src && src.$secureSettings ? src.$secureSettings : [];
				const targetSS = target && target.$secureSettings ? target.$secureSettings : [];
				if (!target) target = {};

				target.$secureSettings = ___default['default'].uniq([].concat(srcSS, targetSS));
			}

			return ___default['default'].defaultsDeep(src, target);
		}

		/**
		 * Merge `metadata` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaMetadata(src, target) {
			return ___default['default'].defaultsDeep(src, target);
		}

		/**
		 * Merge `mixins` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaUniqArray(src, target) {
			return ___default['default'].uniqWith(___default['default'].compact(flatten$1([src, target])), ___default['default'].isEqual);
		}

		/**
		 * Merge `dependencies` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaDependencies(src, target) {
			return Service.mergeSchemaUniqArray(src, target);
		}

		/**
		 * Merge `hooks` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaHooks(src, target) {
			Object.keys(src).forEach(k => {
				if (target[k] == null)
					target[k] = {};

				Object.keys(src[k]).forEach(k2 => {
					const modHook = wrapToArray(src[k][k2]);
					const resHook = wrapToArray(target[k][k2]);

					target[k][k2] = ___default['default'].compact(flatten$1(k == "before" ? [resHook, modHook] : [modHook, resHook]));
				});
			});

			return target;
		}

		/**
		 * Merge `actions` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property (real schema)
		 * @param {Object} target Target schema property (mixin schema)
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaActions(src, target) {
			Object.keys(src).forEach(k => {
				if (src[k] === false && target[k]) {
					delete target[k];
					return;
				}

				const srcAction = wrapToHander(src[k]);
				const targetAction = wrapToHander(target[k]);

				if (srcAction && srcAction.hooks && targetAction && targetAction.hooks) {
					Object.keys(srcAction.hooks).forEach(k => {
						const modHook = wrapToArray(srcAction.hooks[k]);
						const resHook = wrapToArray(targetAction.hooks[k]);

						srcAction.hooks[k] = ___default['default'].compact(flatten$1(k == "before" ? [resHook, modHook] : [modHook, resHook]));
					});
				}

				target[k] = ___default['default'].defaultsDeep(srcAction, targetAction);
			});

			return target;
		}

		/**
		 * Merge `methods` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaMethods(src, target) {
			return Object.assign(target || {}, src || {});
		}

		/**
		 * Merge `events` property in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaEvents(src, target) {
			Object.keys(src).forEach(k => {
				const modEvent = wrapToHander(src[k]);
				const resEvent = wrapToHander(target[k]);

				let handler = ___default['default'].compact(flatten$1([resEvent ? resEvent.handler : null, modEvent ? modEvent.handler : null]));
				if (handler.length == 1) handler = handler[0];

				target[k] = ___default['default'].defaultsDeep(modEvent, resEvent);
				target[k].handler = handler;
			});

			return target;
		}

		/**
		 * Merge `started`, `stopped`, `created` event handler properties in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaLifecycleHandlers(src, target) {
			return ___default['default'].compact(flatten$1([target, src]));
		}

		/**
		 * Merge unknown properties in schema
		 *
		 * @static
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		static mergeSchemaUnknown(src, target) {
			if (src !== undefined)
				return src;

			return target;
		}

		/**
		 * Return a versioned full service name.
		 * @param {String} name
		 * @param {String|Number?} version
		 */
		static getVersionedFullName(name, version) {
			if (version != null)
				return (typeof(version) == "number" ? "v" + version : version) + "." + name;

			return name;
		}

	}

	var service = Service;

	const { isString: isString$g } = utils_1;

	const { RequestSkippedError, MaxCallLevelError } = errors;

	/**
	 * Merge metadata
	 *
	 * @param {Object} newMeta
	 *
	 * @private
	 * @memberof Context
	 */
	function mergeMeta(ctx, newMeta) {
		if (newMeta)
			Object.assign(ctx.meta, newMeta);
		return ctx.meta;
	}

	/**
	 * Context class for action calls
	 *
	 * @property {String} id - Context ID
	 * @property {ServiceBroker} broker - Broker instance
	 * @property {Action} action - Action definition
	 * @property {String} [nodeID=null] - Node ID
	 * @property {String} parentID - Parent Context ID
	 * @property {Boolean} tracing - Enable tracing
	 * @property {Number} [level=1] - Level of context
	 *
	 * @class Context
	 */
	class Context {

		/**
		 * Creates an instance of Context.
		 *
		 * @param {ServiceBroker} broker - Broker instance
		 * @param {Endpoint} endpoint
		 *
		 * @memberof Context
		 */
		constructor(broker, endpoint) {

			this.broker = broker;
			if (this.broker) {
				this.nodeID = this.broker.nodeID;
				this.id = this.broker.generateUid();
			} else {
				this.nodeID = null;
			}

			if (endpoint) {
				this.setEndpoint(endpoint);
			} else {
				this.endpoint = null;
				this.service = null;
				this.action = null;
				this.event = null;
			}

			// The emitted event "user.created" because `ctx.event.name` can be "user.**"
			this.eventName = null;
			// Type of event ("emit" or "broadcast")
			this.eventType = null;
			// The groups of event
			this.eventGroups = null;

			this.options = {
				timeout: null,
				retries: null,
			};

			this.parentID = null;
			this.caller = null;

			this.level = 1;

			this.params = null;
			this.meta = {};
			this.locals = {};

			this.requestID = this.id;

			this.tracing = null;
			this.span = null;
			this._spanStack = [];

			this.needAck = null;
			this.ackID = null;

			//this.startTime = null;
			//his.startHrTime = null;
			//this.stopTime = null;
			//this.duration = null;

			//this.error = null;
			this.cachedResult = false;
		}

		/**
		 * Create a new Context instance
		 *
		 * @param {ServiceBroker} broker
		 * @param {Endpoint} endpoint
		 * @param {Object?} params
		 * @param {Object} opts
		 * @returns {Context}
		 *
		 * @static
		 * @memberof Context
		 */
		static create(broker, endpoint, params, opts = {}) {
			const ctx = new broker.ContextFactory(broker, endpoint);

			if (endpoint != null)
				ctx.setEndpoint(endpoint);

			if (params != null) {
				let cloning = broker ? broker.options.contextParamsCloning : false;
				if (opts.paramsCloning != null)
					cloning = opts.paramsCloning;
				ctx.setParams(params, cloning);
			}

			//Object.assign(ctx.options, opts);
			ctx.options = opts;

			// RequestID
			if (opts.requestID != null)
				ctx.requestID = opts.requestID;
			else if (opts.parentCtx != null && opts.parentCtx.requestID != null)
				ctx.requestID = opts.parentCtx.requestID;

			// Meta
			if (opts.parentCtx != null && opts.parentCtx.meta != null)
				ctx.meta = Object.assign({}, opts.parentCtx.meta || {}, opts.meta || {});
			else if (opts.meta != null)
				ctx.meta = opts.meta;

			// ParentID, Level, Caller, Tracing
			if (opts.parentCtx != null) {
				ctx.tracing = opts.parentCtx.tracing;
				ctx.level = opts.parentCtx.level + 1;

				if (opts.parentCtx.span)
					ctx.parentID = opts.parentCtx.span.id;
				else
					ctx.parentID = opts.parentCtx.id;

				if (opts.parentCtx.service)
					ctx.caller = opts.parentCtx.service.fullName;
			}

			// caller
			if (opts.caller) {
				ctx.caller = opts.caller;
			}

			// Parent span
			if (opts.parentSpan != null) {
				ctx.parentID = opts.parentSpan.id;
				ctx.requestID = opts.parentSpan.traceID;
				ctx.tracing = opts.parentSpan.sampled;
			}

			// Event acknowledgement
			if (opts.needAck) {
				ctx.needAck = opts.needAck;
			}

			return ctx;
		}

		/**
		 * Copy itself without ID.
		 * @param {Endpoint} ep
		 * @returns {Context}
		 */
		copy(ep) {
			const newCtx = new this.constructor(this.broker);

			newCtx.nodeID = this.nodeID;
			newCtx.setEndpoint(ep || this.endpoint);
			newCtx.options = this.options;
			newCtx.parentID = this.parentID;
			newCtx.caller = this.caller;
			newCtx.level = this.level;
			newCtx.params = this.params;
			newCtx.meta = this.meta;
			newCtx.locals = this.locals;
			newCtx.requestID = this.requestID;
			newCtx.tracing = this.tracing;
			newCtx.span = this.span;
			newCtx.needAck = this.needAck;
			newCtx.ackID = this.ackID;
			newCtx.eventName = this.eventName;
			newCtx.eventType = this.eventType;
			newCtx.eventGroups = this.eventGroups;

			newCtx.cachedResult = this.cachedResult;

			return newCtx;
		}

		/**
		 * Set endpoint of context
		 *
		 * @param {Endpoint} endpoint
		 * @memberof Context
		 */
		setEndpoint(endpoint) {
			this.endpoint = endpoint;
			if (endpoint) {
				this.nodeID = endpoint.id;
				if (endpoint.action) {
					this.action = endpoint.action;
					this.service = this.action.service;
					this.event = null;
				} else if (endpoint.event) {
					this.event =  endpoint.event;
					this.service = this.event.service;
					this.action = null;
				}
			}
		}

		/**
		 * Set params of context
		 *
		 * @param {Object} newParams
		 * @param {Boolean} cloning
		 *
		 * @memberof Context
		 */
		setParams(newParams, cloning = false) {
			if (cloning && newParams)
				this.params = Object.assign({}, newParams);
			else
				this.params = newParams;
		}

		/**
		 * Call an other action. It creates a sub-context.
		 *
		 * @param {String} actionName
		 * @param {Object?} params
		 * @param {Object?} opts
		 * @returns {Promise}
		 *
		 * @example <caption>Call an other service with params & options</caption>
		 * ctx.call("posts.get", { id: 12 }, { timeout: 1000 });
		 *
		 * @memberof Context
		 */
		call(actionName, params, _opts) {
			const opts = Object.assign({
				parentCtx: this
			}, _opts);

			if (this.options.timeout > 0 && this.startHrTime) {
				// Distributed timeout handling. Decrementing the timeout value with the elapsed time.
				// If the timeout below 0, skip the call.
				const diff = proc.hrtime(this.startHrTime);
				const duration = (diff[0] * 1e3) + (diff[1] / 1e6);
				const distTimeout = this.options.timeout - duration;

				if (distTimeout <= 0) {
					return this.broker.Promise.reject(new RequestSkippedError({ action: actionName, nodeID: this.broker.nodeID }));
				}

				if (!opts.timeout || distTimeout < opts.timeout)
					opts.timeout = distTimeout;
			}

			// Max calling level check to avoid calling loops
			if (this.broker.options.maxCallLevel > 0 && this.level >= this.broker.options.maxCallLevel) {
				return this.broker.Promise.reject(new MaxCallLevelError({ nodeID: this.broker.nodeID, level: this.level }));
			}

			let p = this.broker.call(actionName, params, opts);

			// Merge metadata with sub context metadata
			return p.then(res => {
				if (p.ctx)
					mergeMeta(this, p.ctx.meta);

				return res;
			}).catch(err => {
				if (p.ctx)
					mergeMeta(this, p.ctx.meta);

				return this.broker.Promise.reject(err);
			});
		}

		mcall(def, _opts) {
			const opts = Object.assign({
				parentCtx: this
			}, _opts);

			if (this.options.timeout > 0 && this.startHrTime) {
				// Distributed timeout handling. Decrementing the timeout value with the elapsed time.
				// If the timeout below 0, skip the call.
				const diff = proc.hrtime(this.startHrTime);
				const duration = (diff[0] * 1e3) + (diff[1] / 1e6);
				const distTimeout = this.options.timeout - duration;

				if (distTimeout <= 0) {
					const action = (Array.isArray(def) ? def : Object.values(def)).map(d => d.action).join(", ");
					return this.broker.Promise.reject(new RequestSkippedError({ action, nodeID: this.broker.nodeID }));
				}

				if (!opts.timeout || distTimeout < opts.timeout)
					opts.timeout = distTimeout;
			}

			// Max calling level check to avoid calling loops
			if (this.broker.options.maxCallLevel > 0 && this.level >= this.broker.options.maxCallLevel) {
				return this.broker.Promise.reject(new MaxCallLevelError({ nodeID: this.broker.nodeID, level: this.level }));
			}

			let p = this.broker.mcall(def, opts);

			// Merge metadata with sub context metadata
			return p.then(res => {
				if (Array.isArray(p.ctx) && p.ctx.length)
					p.ctx.forEach(ctx => mergeMeta(this, ctx.meta));

				return res;
			}).catch(err => {
				if (Array.isArray(p.ctx) && p.ctx.length)
					p.ctx.forEach(ctx => mergeMeta(this, ctx.meta));

				return this.broker.Promise.reject(err);
			});
		}

		/**
		 * Emit an event (grouped & balanced global event)
		 *
		 * @param {string} eventName
		 * @param {any?} payload
		 * @param {Object?} opts
		 * @returns {Promise}
		 *
		 * @example
		 * ctx.emit("user.created", { entity: user, creator: ctx.meta.user });
		 *
		 * @memberof Context
		 */
		emit(eventName, data, opts) {
			if (Array.isArray(opts) || isString$g(opts))
				opts = { groups: opts };
			else if (opts == null)
				opts = {};

			if (opts.groups && !Array.isArray(opts.groups))
				opts.groups = [opts.groups];

			opts.parentCtx = this;
			return this.broker.emit(eventName, data, opts);
		}

		/**
		 * Emit an event for all local & remote services
		 *
		 * @param {string} eventName
		 * @param {any?} payload
		 * @param {Object?} opts
		 * @returns {Promise}
		 *
		 * @example
		 * ctx.broadcast("user.created", { entity: user, creator: ctx.meta.user });
		 *
		 * @memberof Context
		 */
		broadcast(eventName, data, opts) {
			if (Array.isArray(opts) || isString$g(opts))
				opts = { groups: opts };
			else if (opts == null)
				opts = {};

			if (opts.groups && !Array.isArray(opts.groups))
				opts.groups = [opts.groups];

			opts.parentCtx = this;
			return this.broker.broadcast(eventName, data, opts);
		}

		/**
		 * Start a new child tracing span.
		 *
		 * @param {String} name
		 * @param {Object?} opts
		 * @returns {Span}
		 * @memberof Context
		 */
		startSpan(name, opts) {
			let span;
			if (this.span) {
				span = this.span.startSpan(name, Object.assign({ ctx: this }, opts));
			} else {
				span = this.broker.tracer.startSpan(name, Object.assign({ ctx: this }, opts));
			}

			this._spanStack.push(span);
			this.span = span;

			return span;
		}

		/**
		 * Finish an active span.
		 *
		 * @param {Span} span
		 * @param {Number?} time
		 */
		finishSpan(span, time) {
			if (!span.isActive()) return;

			span.finish(time);

			const idx = this._spanStack.findIndex(sp => sp == span);
			if (idx !== -1) {
				this._spanStack.splice(idx, 1);
				this.span = this._spanStack[this._spanStack.length - 1];
			} else {
				/* istanbul ignore next */
				this.service.logger.warn("This span is not assigned to this context", span);
			}
		}

		/**
		 * Convert Context to a printable POJO object.
		 */
		toJSON() {
			const res = ___default['default'].pick(this, [
				"id",
				"nodeID",
				"action.name",
				"event.name",
				"service.name",
				"service.version",
				"service.fullName",
				"options",
				"parentID",
				"caller",
				"level",
				"params",
				"meta",
				//"locals",
				"requestID",
				"tracing",
				"span",
				"needAck",
				"ackID",
				"eventName",
				"eventType",
				"eventGroups",
				"cachedResult"
			]);

			return res;
		}

		/* istanbul ignore next */
		[util__default['default'].inspect.custom](depth, options) {
			// https://nodejs.org/docs/latest-v8.x/api/util.html#util_custom_inspection_functions_on_objects
			if (depth < 0) {
				return options.stylize("[Context]", "special");
			}

			const inner = util__default['default'].inspect(this.toJSON(), options);
			return `${options.stylize("Context", "special")}< ${inner} >`;
		}
	}

	var context = Context;

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

	const EventEmitter2$1 		= EE__default['default'].EventEmitter2;










	//const AsyncStorage 			= require("./async-storage");








	const { MetricRegistry: MetricRegistry$1, METRIC: METRIC$b }	= metrics;
	const { Tracer: Tracer$1 }			= tracing$1;

	/**
	 * Default broker options
	 */
	const defaultOptions = {
		namespace: "",
		nodeID: null,

		logger: true,
		logLevel: null,

		transporter: null, //"TCP",

		requestTimeout: 0 * 1000,
		retryPolicy: {
			enabled: false,
			retries: 5,
			delay: 100,
			maxDelay: 1000,
			factor: 2,
			check: err => err && !!err.retryable
		},

		contextParamsCloning: false,
		maxCallLevel: 0,
		heartbeatInterval: 10,
		heartbeatTimeout: 30,

		tracking: {
			enabled: false,
			shutdownTimeout: 5000,
		},

		disableBalancer: false,

		registry: {
			strategy: "RoundRobin",
			preferLocal: true
		},

		circuitBreaker: {
			enabled: false,
			threshold: 0.5,
			windowTime: 60,
			minRequestCount: 20,
			halfOpenTime: 10 * 1000,
			check: err => err && err.code >= 500
		},

		bulkhead: {
			enabled: false,
			concurrency: 10,
			maxQueueSize: 100,
		},

		transit: {
			maxQueueSize: 50 * 1000, // 50k ~ 400MB,
			maxChunkSize: 256*1024, // 256KB
			disableReconnect: false,
			disableVersionCheck: false
		},

		uidGenerator: null,

		errorHandler: null,

		cacher: null,
		serializer: null,

		validator: true,

		metrics: false,
		tracing: false,

		internalServices: true,
		internalMiddlewares: true,
		dependencyInterval: 1000,

		hotReload: false,

		middlewares: null,

		replCommands: null,
		replDelimiter: null,

		metadata: {},

		skipProcessEventRegistration: false,

		/**
		 * Maximum size of objects that can be serialized
		 *
		 * On serialization process, check each object property size (based on length or size property value)
		 * and trim it, if object size bigger than maxSafeObjectSize value
		 *
		 * @type {(number|null)}
		 */
		maxSafeObjectSize: null,
		// ServiceFactory: null,
		// ContextFactory: null
		// Promise: null
	};

	/**
	 * Service broker class
	 *
	 * @class ServiceBroker
	 */
	class ServiceBroker {

		/**
		 * Creates an instance of ServiceBroker.
		 *
		 * @param {Object} options
		 *
		 * @memberof ServiceBroker
		 */
		constructor(options) {
			try {
				this.options = ___default['default'].defaultsDeep(options, defaultOptions);

				// Custom Promise lib
				if (this.options.Promise) {
					this.Promise = this.options.Promise;
				} else {
					// Use native Promise lib
					this.Promise = Promise;
				}
				utils_1.polyfillPromise(this.Promise);
				ServiceBroker.Promise = this.Promise;

				// Broker started flag
				this.started = false;

				// Class factories
				this.ServiceFactory = this.options.ServiceFactory || service;
				this.ContextFactory = this.options.ContextFactory || context;

				// Namespace
				this.namespace = this.options.namespace || "";

				// Metadata
				this.metadata = this.options.metadata || {};

				// Self nodeID
				this.nodeID = this.options.nodeID || utils_1.getNodeID();

				// Instance ID
				this.instanceID = utils_1.generateToken();

				// Internal maps
				this.services = [];

				// Internal event bus
				this.localBus = new EventEmitter2$1({
					wildcard: true,
					maxListeners: 100
				});

				// Log Factory
				this.loggerFactory = new loggerFactory(this);
				this.loggerFactory.init(this.options.logger);

				// Logger
				this.logger = this.getLogger("broker");

				this.logger.info(`Moleculer v${this.MOLECULER_VERSION} is starting...`);
				this.logger.info(`Namespace: ${this.namespace || "<not defined>"}`);
				this.logger.info(`Node ID: ${this.nodeID}`);

				// Async storage for Contexts
				//this.scope = new AsyncStorage(this);

				// Metrics Registry
				this.metrics = new MetricRegistry$1(this, this.options.metrics);
				this.metrics.init();
				this.registerMoleculerMetrics();

				// Middleware handler
				this.middlewares = new middleware(this);

				// Service registry
				this.registry = new registry$2(this);

				// Cacher
				this.cacher = cachers.resolve(this.options.cacher);
				if (this.cacher) {
					this.cacher.init(this);

					const name = this.getConstructorName(this.cacher);
					this.logger.info(`Cacher: ${name}`);
				}

				// Serializer
				this.serializer = serializers.resolve(this.options.serializer);
				this.serializer.init(this);

				const serializerName = this.getConstructorName(this.serializer);
				this.logger.info(`Serializer: ${serializerName}`);

				// Validator
				if (this.options.validator) {
					this.validator = validators.resolve(this.options.validator);
					if (this.validator) {
						const validatorName = this.getConstructorName(this.validator);
						this.logger.info(`Validator: ${validatorName}`);
						this.validator.init(this);
					}
				}

				// Tracing
				this.tracer = new Tracer$1(this, this.options.tracing);
				this.tracer.init();

				// Register middlewares
				this.registerMiddlewares(this.options.middlewares);

				// Transit & Transporter
				if (this.options.transporter) {
					const tx = transporters.resolve(this.options.transporter);
					this.transit = new transit(this, tx, this.options.transit);

					const txName = this.getConstructorName(tx);
					this.logger.info(`Transporter: ${txName}`);

					if (this.options.disableBalancer) {
						if (tx.hasBuiltInBalancer) {
							this.logger.info("The broker built-in balancer is DISABLED.");
						} else {
							this.logger.warn(`The ${txName} has no built-in balancer. Broker balancer is ENABLED.`);
							this.options.disableBalancer = false;
						}
					}
				}

				// Change the call method if balancer is disabled
				if (this.options.disableBalancer) {
					this.call = this.callWithoutBalancer;
				}

				this.registry.init(this);

				// Register internal actions
				if (this.options.internalServices)
					this.registerInternalServices(this.options.internalServices);

				// Call `created` event handler in middlewares
				this.callMiddlewareHookSync("created", [this]);

				// Call `created` event handler from options
				if (utils_1.isFunction(this.options.created))
					this.options.created(this);

				// Graceful exit
				this._closeFn = () => {
					/* istanbul ignore next */
					this.stop()
						.catch(err => this.logger.error(err))
						.then(() => proc.exit(0));
				};

				proc.setMaxListeners(0);
				if (this.options.skipProcessEventRegistration === false) {
					proc.on("beforeExit", this._closeFn);
					proc.on("exit", this._closeFn);
					proc.on("SIGINT", this._closeFn);
					proc.on("SIGTERM", this._closeFn);
				}

			} catch(err) {
				if (this.logger)
					this.fatal("Unable to create ServiceBroker.", err, true);
				else {
					/* eslint-disable-next-line no-console */
					console.error("Unable to create ServiceBroker.", err);
					proc.exit(1);
				}
			}
		}

		/**
		 * Register middlewares (user & internal)
		 *
		 * @memberof ServiceBroker
		 */
		registerMiddlewares(userMiddlewares) {
			// Register user middlewares
			if (Array.isArray(userMiddlewares) && userMiddlewares.length > 0) {
				___default['default'].compact(userMiddlewares).forEach(mw => this.middlewares.add(mw));

				this.logger.info(`Registered ${this.middlewares.count()} custom middleware(s).`);
			}

			if (this.options.internalMiddlewares) {
				// Register internal middlewares

				const prevCount = this.middlewares.count();

				// 0. ActionHook
				this.middlewares.add("ActionHook");

				// 1. Validator
				if (this.validator && utils_1.isFunction(this.validator.middleware)) {
					const mw = this.validator.middleware(this);
					if (utils_1.isPlainObject(mw))
						this.middlewares.add(mw);
					else
						this.middlewares.add({ localAction: mw });
				}

				// 2. Bulkhead
				this.middlewares.add("Bulkhead");

				// 3. Cacher
				if (this.cacher && utils_1.isFunction(this.cacher.middleware)) {
					const mw = this.cacher.middleware();
					if (utils_1.isPlainObject(mw))
						this.middlewares.add(mw);
					else
						this.middlewares.add({ localAction: mw });
				}

				// 4. Context tracker
				this.middlewares.add("ContextTracker");

				// 5. CircuitBreaker
				this.middlewares.add("CircuitBreaker");

				// 6. Timeout
				this.middlewares.add("Timeout");

				// 7. Retry
				this.middlewares.add("Retry");

				// 8. Fallback
				this.middlewares.add("Fallback");

				// 9. Error handler
				this.middlewares.add("ErrorHandler");

				// 10. Tracing
				this.middlewares.add("Tracing");

				// 11. Metrics
				this.middlewares.add("Metrics");

				// 12. Debounce
				this.middlewares.add("Debounce");

				// 13. Throttle
				this.middlewares.add("Throttle");

				if (this.options.hotReload) {
					// 14. Hot Reload
					this.middlewares.add("HotReload");
				}

				this.logger.info(`Registered ${this.middlewares.count() - prevCount} internal middleware(s).`);
			}

			this.createService = this.wrapMethod("createService", this.createService);
			this.registerLocalService = this.wrapMethod("registerLocalService", this.registerLocalService);
			this.destroyService = this.wrapMethod("destroyService", this.destroyService);
			this.call = this.wrapMethod("call", this.call);
			this.callWithoutBalancer = this.wrapMethod("call", this.callWithoutBalancer);
			this.mcall = this.wrapMethod("mcall", this.mcall);
			this.emit = this.wrapMethod("emit", this.emit);
			this.broadcast = this.wrapMethod("broadcast", this.broadcast);
			this.broadcastLocal = this.wrapMethod("broadcastLocal", this.broadcastLocal);

			this.metrics.set(METRIC$b.MOLECULER_BROKER_MIDDLEWARES_TOTAL,this.middlewares.count());
		}

		/**
		 * Register Moleculer Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.isMetricsEnabled()) return;

			// --- MOLECULER NODE METRICS ---

			this.metrics.register({ name: METRIC$b.MOLECULER_NODE_TYPE, type: METRIC$b.TYPE_INFO, description: "Moleculer implementation type" }).set("nodejs");
			this.metrics.register({ name: METRIC$b.MOLECULER_NODE_VERSIONS_MOLECULER, type: METRIC$b.TYPE_INFO, description: "Moleculer version number" }).set(ServiceBroker.MOLECULER_VERSION);
			this.metrics.register({ name: METRIC$b.MOLECULER_NODE_VERSIONS_PROTOCOL, type: METRIC$b.TYPE_INFO, description: "Moleculer protocol version" }).set(ServiceBroker.PROTOCOL_VERSION);

			// --- MOLECULER BROKER METRICS ---

			this.metrics.register({ name: METRIC$b.MOLECULER_BROKER_NAMESPACE, type: METRIC$b.TYPE_INFO, description: "Moleculer namespace" }).set(this.namespace);
			this.metrics.register({ name: METRIC$b.MOLECULER_BROKER_STARTED, type: METRIC$b.TYPE_GAUGE, description: "ServiceBroker started" }).set(0);
			this.metrics.register({ name: METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL, type: METRIC$b.TYPE_GAUGE, description: "Number of local services" }).set(0);
			this.metrics.register({ name: METRIC$b.MOLECULER_BROKER_MIDDLEWARES_TOTAL, type: METRIC$b.TYPE_GAUGE, description: "Number of local middlewares" }).set(0);
		}

		/**
		 * Start broker. If has transporter, transporter.connect will be called.
		 *
		 * @memberof ServiceBroker
		 */
		start() {
			const startTime = Date.now();

			return this.Promise.resolve()
				.then(() => {
					//this.tracer.restartScope();
					//this.scope.enable();
				})
				.then(() => {
					return this.callMiddlewareHook("starting", [this]);
				})
				.then(() => {
					if (this.transit)
						return this.transit.connect();
				})
				.then(() => {
					// Call service `started` handlers
					return this.Promise.all(this.services.map(svc => svc._start.call(svc)))
						.catch(err => {
							/* istanbul ignore next */
							this.logger.error("Unable to start all services.", err);
							throw err;
						});
				})
				.then(() => {
					this.started = true;
					this.metrics.set(METRIC$b.MOLECULER_BROKER_STARTED, 1);
					this.broadcastLocal("$broker.started");
					this.registry.regenerateLocalRawInfo(true);
				})
				.then(() => {
					if (this.transit)
						return this.transit.ready();
				})
				.then(() => {
					return this.callMiddlewareHook("started", [this]);
				})
				.then(() => {
					if (utils_1.isFunction(this.options.started))
						return this.options.started(this);
				})
				.then(() => {
					const duration = Date.now() - startTime;
					this.logger.info(`✔ ServiceBroker with ${this.services.length} service(s) is started successfully in ${utils_1.humanize(duration)}.`);
				});
		}

		/**
		 * Stop broker. If has transporter, transporter.disconnect will be called.
		 *
		 * @memberof ServiceBroker
		 */
		stop() {
			this.started = false;
			return this.Promise.resolve()
				.then(() => {
					if (this.transit) {
						this.registry.regenerateLocalRawInfo(true);
						// Send empty node info in order to block incoming requests
						return this.registry.discoverer.sendLocalNodeInfo();
					}
				})
				.then(() => {
					return this.callMiddlewareHook("stopping", [this], { reverse: true });
				})
				.then(() => {
					// Call service `stopped` handlers
					return this.Promise.all(this.services.map(svc => svc._stop.call(svc)))
						.catch(err => {
						/* istanbul ignore next */
							this.logger.error("Unable to stop all services.", err);
						});
				})
				.then(() => {
					if (this.transit) {
						return this.transit.disconnect();
					}
				})
				.then(() => {
					if (this.cacher) {
						return this.cacher.close();
					}
				})
				.then(() => {
					if (this.metrics) {
						return this.metrics.stop();
					}
				})
				.then(() => {
					if (this.tracer) {
						return this.tracer.stop();
					}
				})
				.then(() => {
					return this.registry.stop();
				})
				.then(() => {
					return this.callMiddlewareHook("stopped", [this], { reverse: true });
				})
				.then(() => {
					if (utils_1.isFunction(this.options.stopped))
						return this.options.stopped(this);
				})
				.catch(err => {
					/* istanbul ignore next */
					this.logger.error(err);
				})
				.then(() => {
					this.logger.info("ServiceBroker is stopped. Good bye.");
					this.metrics.set(METRIC$b.MOLECULER_BROKER_STARTED, 0);

					this.broadcastLocal("$broker.stopped");

					if (this.options.skipProcessEventRegistration === false) {
						proc.removeListener("beforeExit", this._closeFn);
						proc.removeListener("exit", this._closeFn);
						proc.removeListener("SIGINT", this._closeFn);
						proc.removeListener("SIGTERM", this._closeFn);
					}
				})
				.then(() => {
					return this.loggerFactory.stop();
				})
				.catch(() => {
					// Silent
				});
		}

		/**
		 * Switch the console to REPL mode.
		 *
		 * @example
		 * broker.start().then(() => broker.repl());
		 * @returns {object}
		 */
		repl() {
			let repl;
			try {
				repl = require$$19;
			}
			catch (error) {
				console.error("The 'moleculer-repl' package is missing. Please install it with 'npm install moleculer-repl' command."); // eslint-disable-line no-console
				this.logger.error("The 'moleculer-repl' package is missing. Please install it with 'npm install moleculer-repl' command.");
				this.logger.debug("ERROR", error);
				return;
			}

			if (repl)
			{
				let opts = null;
				const delimiter = this.options.replDelimiter;
				const customCommands = this.options.replCommands;
				delimiter && (opts = { delimiter });
				customCommands && (opts = { ...opts,customCommands });
				return repl(this, opts);
			}
		}

		/**
		 * Global error handler.
		 *
		 * @param {Error} err
		 * @param {object} info
		 * @returns
		 * @memberof ServiceBroker
		 */
		errorHandler(err, info) {
			if (this.options.errorHandler) {
				return this.options.errorHandler.call(this, err, info);
			}

			throw err;
		}

		/**
		 * Wrap a method with middlewares
		 *
		 * @param {string} method
		 * @param {Function} handler
		 * @param {any} bindTo
		 * @param {Object} opts
		 * @returns {Function}
		 *
		 * @memberof ServiceBroker
		 */
		wrapMethod(name, handler, bindTo, opts) {
			return this.middlewares.wrapMethod(name, handler, bindTo, opts);
		}

		/**
		 * Call a handler asynchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {Object} opts
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		callMiddlewareHook(name, args, opts) {
			return this.middlewares.callHandlers(name, args, opts);
		}

		/**
		 * Call a handler synchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {Object} opts
		 * @returns
		 *
		 * @memberof ServiceBroker
		 */
		callMiddlewareHookSync(name, args, opts) {
			return this.middlewares.callSyncHandlers(name, args, opts);
		}

		/**
		 * Check metrics are enabled.
		 *
		 * @returns {boolean}
		 * @memberof ServiceBroker
		 */
		isMetricsEnabled() {
			return this.metrics.isEnabled();
		}

		/**
		 * Check tracing is enabled.
		 *
		 * @returns {boolean}
		 * @memberof ServiceBroker
		 */
		isTracingEnabled() {
			return this.tracer.isEnabled();
		}

		/**
		 * Get a custom logger for sub-modules (service, transporter, cacher, context...etc)
		 *
		 * @param {String} mod	Name of module
		 * @param {Object} props	Module properties (service name, version, ...etc
		 * @returns {ModuleLogger}
		 *
		 * @memberof ServiceBroker
		 */
		getLogger(mod, props) {
			let bindings = Object.assign({
				nodeID: this.nodeID,
				ns: this.namespace,
				mod
			}, props);

			return this.loggerFactory.getLogger(bindings);
		}

		/**
		 * Fatal error. Print the message to console and exit the process (if need)
		 *
		 * @param {String} message
		 * @param {Error?} err
		 * @param {boolean} [needExit=true]
		 *
		 * @memberof ServiceBroker
		 */
		fatal(message, err, needExit = true) {
			if (this.logger)
				this.logger.fatal(message, err);
			else
				console.error(message, err); // eslint-disable-line no-console

			if (needExit)
				proc.exit(1);
		}

		/**
		 * Load services from a folder
		 *
		 * @param {string} [folder="./services"]		Folder of services
		 * @param {string} [fileMask="**\/*.service.js"]	Service filename mask
		 * @returns	{Number}							Number of found services
		 *
		 * @memberof ServiceBroker
		 */
		loadServices(folder = "./services", fileMask = "**/*.service.js") {
			this.logger.debug(`Search services in '${folder}/${fileMask}'...`);

			let serviceFiles;

			if (Array.isArray(fileMask))
				serviceFiles = fileMask.map(f => path__default['default'].join(folder, f));
			else
				serviceFiles = glob__default['default'].sync(path__default['default'].join(folder, fileMask));

			if (serviceFiles)
				serviceFiles.forEach(filename => this.loadService(filename));

			return serviceFiles.length;
		}

		/**
		 * Load a service from file
		 *
		 * @param {string} 		Path of service
		 * @returns	{Service}	Loaded service
		 *
		 * @memberof ServiceBroker
		 */
		loadService(filePath) {
			let fName, schema;

			try {
				fName = require.resolve(path__default['default'].resolve(filePath));
				this.logger.debug(`Load service '${path__default['default'].basename(fName)}'...`);

				const r = commonjsRequire(fName);
				schema = r.default != null ? r.default : r;

				let svc;
				schema = this.normalizeSchemaConstructor(schema);
				if (Object.prototype.isPrototypeOf.call(this.ServiceFactory, schema)) {
					// Service implementation
					svc = new schema(this);

					// If broker is started, call the started lifecycle event of service
					if (this.started)
						this._restartService(svc);

				} else if (utils_1.isFunction(schema)) {
					// Function
					svc = schema(this);
					if (!(svc instanceof this.ServiceFactory)) {
						svc = this.createService(svc);
					} else {
						// If broker is started, call the started lifecycle event of service
						if (this.started)
							this._restartService(svc);
					}

				} else if (schema) {
					// Schema object
					svc = this.createService(schema);
				}

				if (svc) {
					svc.__filename = fName;
				}

				return svc;

			} catch (e) {
				this.logger.error(`Failed to load service '${filePath}'`, e);
				throw e;
			}
		}

		/**
		 * Create a new service by schema
		 *
		 * @param {any} schema	Schema of service or a Service class
		 * @param {any=} schemaMods	Modified schema
		 * @returns {Service}
		 *
		 * @memberof ServiceBroker
		 */
		createService(schema, schemaMods) {
			let service;

			schema = this.normalizeSchemaConstructor(schema);
			if (Object.prototype.isPrototypeOf.call(this.ServiceFactory, schema)) {
				service = new schema(this, schemaMods);
			} else {
				let s = schema;
				if (schemaMods)
					s = this.ServiceFactory.mergeSchemas(schema, schemaMods);

				service = new this.ServiceFactory(this, s);
			}

			// If broker has started yet, call the started lifecycle event of service
			if (this.started)
				this._restartService(service);

			return service;
		}

		/**
		 * Restart a hot-reloaded service after creation.
		 *
		 * @param {Service} service
		 * @returns {Promise}
		 * @memberof ServiceBroker
		 * @private
		 */
		_restartService(service) {
			return service._start.call(service)
				.catch(err => this.logger.error("Unable to start service.", err));
		}

		/**
		 * Add a local service instance
		 *
		 * @param {Service} service
		 * @memberof ServiceBroker
		 */
		addLocalService(service) {
			this.services.push(service);
			this.metrics.set(METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL, this.services.length);
		}

		/**
		 * Register a local service to Service Registry
		 *
		 * @param {Object} registryItem
		 * @memberof ServiceBroker
		 */
		registerLocalService(registryItem) {
			this.registry.registerLocalService(registryItem);
		}

		/**
		 * Destroy a local service
		 *
		 * @param {Service|string|object} service
		 * @returns Promise<void>
		 * @memberof ServiceBroker
		 */
		destroyService(service) {
			let serviceName;
			let serviceVersion;
			if (utils_1.isString(service)) {
				serviceName = service;
				service = this.getLocalService(service);
			} else if (utils_1.isPlainObject(service)) {
				serviceName = service.name;
				serviceVersion  = service.version;
				service = this.getLocalService(service.name, service.version);
			}

			if (!service) {
				return this.Promise.reject(new errors.ServiceNotFoundError({ service: serviceName, version: serviceVersion }));
			}

			return this.Promise.resolve()
				.then(() => service._stop())
				.catch(err => {
					/* istanbul ignore next */
					this.logger.error(`Unable to stop '${service.fullName}' service.`, err);
				})
				.then(() => {
					utils_1.removeFromArray(this.services, service);
					this.registry.unregisterService(service.fullName, this.nodeID);

					this.logger.info(`Service '${service.fullName}' is stopped.`);
					this.servicesChanged(true);

					this.metrics.set(METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL, this.services.length);
				});
		}

		/**
		 * It will be called when a new local or remote service
		 * is registered or unregistered.
		 *
		 * @memberof ServiceBroker
		 */
		servicesChanged(localService = false) {
			this.broadcastLocal("$services.changed", { localService });

			// Should notify remote nodes, because our service list is changed.
			if (this.started && localService && this.transit) {
				this.registry.discoverer.sendLocalNodeInfo();
			}
		}

		/**
		 * Register internal services
		 * @param {Object?} opts
		 *
		 * @memberof ServiceBroker
		 */
		registerInternalServices(opts) {
			opts = utils_1.isObject(opts) ? opts : {};
			this.createService(internals(), opts["$node"]);
		}

		/**
		 * Get a local service by name
		 *
		 * Example:
		 * 	getLocalService("v2.posts");
		 * 	getLocalService({ name: "posts", version: 2 });
		 *
		 * @param {String|ServiceSearchObj} name
		 * @param {String|Number?} version
		 * @returns {Service}
		 *
		 * @memberof ServiceBroker
		 */
		getLocalService(name, version) {
			if (arguments.length == 1) {
				if (utils_1.isString(name))
					return this.services.find(service => service.fullName == name);
				else if (utils_1.isPlainObject(name))
					return this.services.find(service => service.name == name.name && service.version == name.version);
			}
			// Deprecated
			return this.services.find(service => service.name == name && service.version == version);
		}

		/**
		 * Wait for other services
		 *
		 * @param {String|Array<String>} serviceNames
		 * @param {Number} timeout Timeout in milliseconds
		 * @param {Number} interval Check interval in milliseconds
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		waitForServices(serviceNames, timeout, interval, logger = this.logger) {
			if (!Array.isArray(serviceNames))
				serviceNames = [serviceNames];

			serviceNames = ___default['default'].uniq(___default['default'].compact(serviceNames.map(x => {
				if (utils_1.isPlainObject(x) && x.name)
					return this.ServiceFactory.getVersionedFullName(x.name, x.version);

				if (utils_1.isString(x))
					return x;
			})));

			if (serviceNames.length == 0)
				return this.Promise.resolve();

			logger.info(`Waiting for service(s) '${serviceNames.join(", ")}'...`);

			const startTime = Date.now();
			return new this.Promise((resolve, reject) => {
				const check = () => {
					const count = serviceNames.filter(fullName => {
						return this.registry.hasService(fullName);
					});

					if (count.length == serviceNames.length) {
						logger.info(`Service(s) '${serviceNames.join(", ")}' are available.`);
						return resolve();
					}

					logger.debug(`${count.length} of ${serviceNames.length} services are available. Waiting further...`);

					if (timeout && Date.now() - startTime > timeout)
						return reject(new errors.MoleculerServerError("Services waiting is timed out.", 500, "WAITFOR_SERVICES", { services: serviceNames }));

					timersBrowserify.setTimeout(check, interval || this.options.dependencyInterval || 1000);
				};

				check();
			});
		}

		/**
		 * Find the next available endpoint for action
		 *
		 * @param {String} actionName
		 * @param {Object?} opts
		 * @param {Context?} ctx
		 * @returns {Endpoint|Error}
		 *
		 * @performance-critical
		 * @memberof ServiceBroker
		 */
		findNextActionEndpoint(actionName, opts, ctx) {
			if (typeof actionName !== "string") {
				return actionName;
			} else {
				if (opts && opts.nodeID) {
					const nodeID = opts.nodeID;
					// Direct call
					const endpoint = this.registry.getActionEndpointByNodeId(actionName, nodeID);
					if (!endpoint) {
						this.logger.warn(`Service '${actionName}' is not found on '${nodeID}' node.`);
						return new errors.ServiceNotFoundError({ action: actionName, nodeID });
					}
					return endpoint;

				} else {
					// Get endpoint list by action name
					const epList = this.registry.getActionEndpoints(actionName);
					if (!epList) {
						this.logger.warn(`Service '${actionName}' is not registered.`);
						return new errors.ServiceNotFoundError({ action: actionName });
					}

					// Get the next available endpoint
					const endpoint = epList.next(ctx);
					if (!endpoint) {
						const errMsg = `Service '${actionName}' is not available.`;
						this.logger.warn(errMsg);
						return new errors.ServiceNotAvailableError({ action: actionName });
					}
					return endpoint;
				}
			}
		}

		/**
		 * Call an action
		 *
		 * @param {String} actionName	name of action
		 * @param {Object?} params		params of action
		 * @param {Object?} opts		options of call (optional)
		 * @returns {Promise}
		 *
		 * @performance-critical
		 * @memberof ServiceBroker
		 */
		call(actionName, params, opts = {}) {
			if (params === undefined)
				params = {}; // Backward compatibility

			// Create context
			let ctx;
			if (opts.ctx != null) {

				const endpoint = this.findNextActionEndpoint(actionName, opts, opts.ctx);
				if (endpoint instanceof Error) {
					return this.Promise.reject(endpoint).catch(err => this.errorHandler(err, { actionName, params, opts }));
				}

				// Reused context
				ctx = opts.ctx;
				ctx.endpoint = endpoint;
				ctx.nodeID = endpoint.id;
				ctx.action = endpoint.action;
				ctx.service = endpoint.action.service;
			} else {
				// New root context
				ctx = this.ContextFactory.create(this, null, params, opts);

				const endpoint = this.findNextActionEndpoint(actionName, opts, ctx);
				if (endpoint instanceof Error) {
					return this.Promise.reject(endpoint).catch(err => this.errorHandler(err, { actionName, params, opts }));
				}

				ctx.setEndpoint(endpoint);
			}

			if (ctx.endpoint.local)
				this.logger.debug("Call action locally.", { action: ctx.action.name, requestID: ctx.requestID });
			else
				this.logger.debug("Call action on remote node.", { action: ctx.action.name, nodeID: ctx.nodeID, requestID: ctx.requestID });

			//this.setCurrentContext(ctx);

			let p = ctx.endpoint.action.handler(ctx);

			// Pointer to Context
			p.ctx = ctx;

			return p;
		}

		/**
		 * Call an action without built-in balancer.
		 * You don't call it directly. Broker will replace the
		 * original 'call' method to this if you disable the
		 * built-in balancer with the "disableBalancer" option.
		 *
		 * @param {String} actionName	name of action
		 * @param {Object?} params		params of action
		 * @param {Object?} opts 		options of call (optional)
		 * @returns {Promise}
		 *
		 * @private
		 * @memberof ServiceBroker
		 */
		callWithoutBalancer(actionName, params, opts = {}) {
			if (params === undefined)
				params = {}; // Backward compatibility

			let nodeID = null;
			let endpoint = null;
			if (typeof actionName !== "string") {
				endpoint = actionName;
				actionName = endpoint.action.name;
				nodeID = endpoint.id;
			} else {
				if (opts.nodeID) {
					nodeID = opts.nodeID;
					endpoint = this.registry.getActionEndpointByNodeId(actionName, nodeID);
					if (!endpoint) {
						this.logger.warn(`Service '${actionName}' is not found on '${nodeID}' node.`);
						return this.Promise.reject(new errors.ServiceNotFoundError({ action: actionName, nodeID })).catch(err => this.errorHandler(err, { nodeID, actionName, params, opts }));

					}
				} else {
					// Get endpoint list by action name
					const epList = this.registry.getActionEndpoints(actionName);
					if (epList == null) {
						this.logger.warn(`Service '${actionName}' is not registered.`);
						return this.Promise.reject(new errors.ServiceNotFoundError({ action: actionName })).catch(err => this.errorHandler(err, { actionName, params, opts }));

					}

					endpoint = epList.getFirst();
					if (endpoint == null) {
						const errMsg = `Service '${actionName}' is not available.`;
						this.logger.warn(errMsg);
						return this.Promise.reject(new errors.ServiceNotAvailableError({ action: actionName })).catch(err => this.errorHandler(err, { actionName, params, opts }));

					}
				}
			}

			// Create context
			let ctx;
			if (opts.ctx != null) {
				// Reused context
				ctx = opts.ctx;
				if (endpoint) {
					ctx.endpoint = endpoint;
					ctx.action = endpoint.action;
				}
			} else {
				// New root context
				ctx = this.ContextFactory.create(this, endpoint, params, opts);
			}
			ctx.nodeID = nodeID;

			this.logger.debug("Call action on a node.", { action: ctx.action.name, nodeID: ctx.nodeID, requestID: ctx.requestID });

			let p = endpoint.action.remoteHandler(ctx);

			// Pointer to Context
			p.ctx = ctx;

			return p;
		}

		_getLocalActionEndpoint(actionName, ctx) {
			// Find action by name
			let epList = this.registry.getActionEndpoints(actionName);
			if (epList == null || !epList.hasLocal()) {
				this.logger.warn(`Service '${actionName}' is not registered locally.`);
				throw new errors.ServiceNotFoundError({ action: actionName, nodeID: this.nodeID });
			}

			// Get local endpoint
			let endpoint = epList.nextLocal(ctx);
			if (!endpoint) {
				this.logger.warn(`Service '${actionName}' is not available locally.`);
				throw new errors.ServiceNotAvailableError({ action: actionName, nodeID: this.nodeID });
			}

			return endpoint;
		}

		/**
		 * Multiple action calls.
		 *
		 * @param {Array<Object>|Object} def Calling definitions.
		 * @returns {Promise<Array<Object>|Object>}
		 *
		 * @example
		 * Call `mcall` with an array:
		 * ```js
		 * broker.mcall([
		 * 	{ action: "posts.find", params: { limit: 5, offset: 0 } },
		 * 	{ action: "users.find", params: { limit: 5, sort: "username" }, opts: { timeout: 500 } }
		 * ]).then(results => {
		 * 	let posts = results[0];
		 * 	let users = results[1];
		 * })
		 * ```
		 *
		 * @example
		 * Call `mcall` with an Object:
		 * ```js
		 * broker.mcall({
		 * 	posts: { action: "posts.find", params: { limit: 5, offset: 0 } },
		 * 	users: { action: "users.find", params: { limit: 5, sort: "username" }, opts: { timeout: 500 } }
		 * }).then(results => {
		 * 	let posts = results.posts;
		 * 	let users = results.users;
		 * })
		 * ```
		 * @throws MoleculerServerError - If the `def` is not an `Array` and not an `Object`.
		 * @memberof ServiceBroker
		 */
		mcall(def, opts) {
			if (Array.isArray(def)) {
				return this.Promise.all(def.map(item => this.call(item.action, item.params, item.options || opts)));

			} else if (utils_1.isObject(def)) {
				let results = {};
				let promises = Object.keys(def).map(name => {
					const item = def[name];
					const options = item.options || opts;
					return this.call(item.action, item.params, options).then(res => results[name] = res);
				});

				let p = this.Promise.all(promises);

				// Pointer to Context
				p.ctx = promises.map(promise => promise.ctx);

				return p.then(() => results);
			} else {
				return this.Promise.reject(new errors.MoleculerServerError("Invalid calling definition.", 500, "INVALID_PARAMETERS"));
			}
		}


		/**
		 * Emit an event (grouped & balanced global event)
		 *
		 * @param {string} eventName
		 * @param {any?} payload
		 * @param {Object?} opts
		 * @returns {Promise<any>}
		 *
		 * @memberof ServiceBroker
		 */
		emit(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts))
				opts = { groups: opts };
			else if (opts == null)
				opts = {};

			if (opts.groups && !Array.isArray(opts.groups))
				opts.groups = [opts.groups];

			const promises = [];

			const ctx = this.ContextFactory.create(this, null, payload, opts);
			ctx.eventName = eventName;
			ctx.eventType = "emit";
			ctx.eventGroups = opts.groups;

			this.logger.debug(`Emit '${eventName}' event`+ (opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") + ".");

			// Call local/internal subscribers
			if (/^\$/.test(eventName))
				this.localBus.emit(eventName, payload);

			if (!this.options.disableBalancer) {

				const endpoints = this.registry.events.getBalancedEndpoints(eventName, opts.groups);

				// Grouping remote events (reduce the network traffic)
				const groupedEP = {};

				endpoints.forEach(([ep, group]) => {
					if (ep.id == this.nodeID) {
						// Local service, call handler
						const newCtx = ctx.copy(ep);
						promises.push(this.registry.events.callEventHandler(newCtx));
					} else {
						// Remote service
						const e = groupedEP[ep.id];
						if (e)
							e.groups.push(group);
						else
							groupedEP[ep.id] = {
								ep,
								groups: [group]
							};
					}
				});

				if (this.transit) {
					// Remote service
					___default['default'].forIn(groupedEP, item => {
						const newCtx = ctx.copy(item.ep);
						newCtx.eventGroups = item.groups;
						promises.push(this.transit.sendEvent(newCtx));
					});
				}

				return this.Promise.all(promises);

			} else if (this.transit) {
				// Disabled balancer case
				let groups = opts.groups;

				if (!groups || groups.length == 0) {
					// Apply to all groups
					groups = this.getEventGroups(eventName);
				}

				if (groups.length == 0)
					return this.Promise.resolve();

				ctx.eventGroups = groups;
				return this.transit.sendEvent(ctx);
			}
		}

		/**
		 * Broadcast an event for all local & remote services
		 *
		 * @param {string} eventName
		 * @param {any?} payload
		 * @param {Object?} opts
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		broadcast(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts))
				opts = { groups: opts };
			else if (opts == null)
				opts = {};

			if (opts.groups && !Array.isArray(opts.groups))
				opts.groups = [opts.groups];

			const promises = [];

			this.logger.debug(`Broadcast '${eventName}' event`+ (opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") + ".");

			if (this.transit) {
				const ctx = this.ContextFactory.create(this, null, payload, opts);
				ctx.eventName = eventName;
				ctx.eventType = "broadcast";
				ctx.eventGroups = opts.groups;

				if (!this.options.disableBalancer) {
					const endpoints = this.registry.events.getAllEndpoints(eventName, opts.groups);

					// Send to remote services
					endpoints.forEach(ep => {
						if (ep.id != this.nodeID) {
							const newCtx = ctx.copy(ep);
							promises.push(this.transit.sendEvent(newCtx));
						}
					});
				} else {
					// Disabled balancer case
					let groups = opts.groups;

					if (!groups || groups.length == 0) {
						// Apply to all groups
						groups = this.getEventGroups(eventName);
					}

					if (groups.length == 0)
						return; // Return here because balancer disabled, so we can't call the local services.

					const endpoints = this.registry.events.getAllEndpoints(eventName, groups);

					// Return here because balancer disabled, so we can't call the local services.
					return this.Promise.all(endpoints.map(ep => {
						const newCtx = ctx.copy(ep);
						newCtx.eventGroups = groups;
						return this.transit.sendEvent(newCtx);
					}));
				}
			}

			// Send to local services
			promises.push(this.broadcastLocal(eventName, payload, opts));

			return this.Promise.all(promises);
		}

		/**
		 * Broadcast an event for all local services
		 *
		 * @param {string} eventName
		 * @param {any?} payload
		 * @param {Object?} groups
		 * @returns
		 *
		 * @memberof ServiceBroker
		 */
		broadcastLocal(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts))
				opts = { groups: opts };
			else if (opts == null)
				opts = {};

			if (opts.groups && !Array.isArray(opts.groups))
				opts.groups = [opts.groups];

			this.logger.debug(`Broadcast '${eventName}' local event`+ (opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") + ".");

			// Call internal subscribers
			if (/^\$/.test(eventName))
				this.localBus.emit(eventName, payload);

			const ctx = this.ContextFactory.create(this, null, payload, opts);
			ctx.eventName = eventName;
			ctx.eventType = "broadcastLocal";
			ctx.eventGroups = opts.groups;

			return this.emitLocalServices(ctx);
		}

		/**
		 * Send ping to a node (or all nodes if nodeID is null)
		 *
		 * @param {String|Array<String>?} nodeID
		 * @param {Number?} timeout
		 * @returns {Promise}
		 * @memberof ServiceBroker
		 */
		ping(nodeID, timeout = 2000) {
			if (this.transit && this.transit.connected) {
				if (utils_1.isString(nodeID)) {
					// Ping a single node
					return new this.Promise(resolve => {

						const timer = timersBrowserify.setTimeout(() => {
							this.localBus.off("$node.pong", handler);
							resolve(null);
						}, timeout);

						const handler = pong => {
							if (pong.nodeID == nodeID) {
								clearTimeout(timer);
								this.localBus.off("$node.pong", handler);
								resolve(pong);
							}
						};

						this.localBus.on("$node.pong", handler);

						this.transit.sendPing(nodeID);
					});

				} else {
					const pongs = {};
					let nodes = nodeID;
					if (!nodes) {
						nodes = this.registry.getNodeList({ onlyAvailable: true })
							.filter(node => node.id != this.nodeID)
							.map(node => node.id);
					}

					nodes.forEach(id => pongs[id] = null);
					const processing = new Set(nodes);

					// Ping multiple nodes
					return new this.Promise(resolve => {

						const timer = timersBrowserify.setTimeout(() => {
							this.localBus.off("$node.pong", handler);
							resolve(pongs);
						}, timeout);

						const handler = pong => {
							pongs[pong.nodeID] = pong;
							processing.delete(pong.nodeID);

							if (processing.size == 0) {
								clearTimeout(timer);
								this.localBus.off("$node.pong", handler);
								resolve(pongs);
							}
						};

						this.localBus.on("$node.pong", handler);

						nodes.forEach(id => this.transit.sendPing(id));
					});
				}
			}

			return this.Promise.resolve(nodeID ? null : []);
		}

		/**
		 * Get local node health status
		 *
		 * @returns {Promise}
		 * @memberof ServiceBroker
		 */
		getHealthStatus() {
			return health.getHealthStatus(this);
		}

		/**
		 * Get local node info.
		 *
		 * @returns
		 * @memberof ServiceBroker
		 */
		getLocalNodeInfo() {
			return this.registry.getLocalNodeInfo();
		}

		/**
		 * Get event groups by event name
		 *
		 * @param {String} eventName
		 * @returns
		 * @memberof ServiceBroker
		 */
		getEventGroups(eventName) {
			return this.registry.events.getGroups(eventName);
		}

		/**
		 * Has registered event listener for an event name?
		 *
		 * @param {String} eventName
		 * @returns {boolean}
		 */
		hasEventListener(eventName) {
			return this.registry.events.getAllEndpoints(eventName).length > 0;
		}

		/**
		 * Get all registered event listener for an event name.
		 *
		 * @param {String} eventName
		 * @returns {Array<Object>}
		 */
		getEventListeners(eventName) {
			return this.registry.events.getAllEndpoints(eventName);
		}

		/**
		 * Emit event to local nodes. It is called from transit when a remote event received
		 * or from `broadcastLocal`
		 *
		 * @param {Context} ctx
		 * @returns
		 * @memberof ServiceBroker
		 */
		emitLocalServices(ctx) {
			return this.registry.events.emitLocalServices(ctx);
		}

		/**
		 * Set the current Context to the async storage.
		 *
		 * @param {Context} ctx
		 * @memberof ServiceBroker
		 *
		setCurrentContext(ctx) {
			this.scope.setSessionData(ctx);
		}*/

		/**
		 * Get the current Context from the async storage.
		 *
		 * @returns {Context?}
		 * @memberof ServiceBroker
		 *
		getCurrentContext() {
			return this.scope.getSessionData();
		}*/

		/**
		 * Get node overall CPU usage
		 *
		 * @returns {Promise<object>}
		 * @memberof ServiceBroker
		 */
		getCpuUsage() {
			return getCpuUsage();
		}

		/**
		 * Generate an UUID.
		 *
		 * @returns {String} uuid
		 */
		generateUid() {
			if (this.options.uidGenerator)
				return this.options.uidGenerator.call(this, this);

			return utils_1.generateToken();
		}


		/**
		 * Get the Constructor name of any object if it exists
		 * @param {any} obj
		 * @returns {string}
		 *
		 */
		getConstructorName(obj) {
			let target = obj.prototype;
			if (target && target.constructor && target.constructor.name){
				return target.constructor.name;
			}
			if (obj.constructor && obj.constructor.name){
				return obj.constructor.name;
			}
			return undefined;
		}

		/**
		 * Ensure the service schema will be prototype of ServiceFactory;
		 *
		 * @param {any} schema
		 * @returns {string}
		 *
		 */
		normalizeSchemaConstructor(schema) {
			if (Object.prototype.isPrototypeOf.call(this.ServiceFactory, schema)) {
				return schema;
			}
			// Sometimes the schame was loaded from another node_module or is a object copy.
			// Then we will check if the constructor name is the same, asume that is a derivate object
			// and adjust the prototype of the schema.
			let serviceName = this.getConstructorName(this.ServiceFactory);
			let target = this.getConstructorName(schema);
			if (serviceName === target){
				Object.setPrototypeOf(schema, this.ServiceFactory);
				return schema;
			}
			// Depending how the schema was create the correct constructor name (from base class) will be locate on __proto__.
			target = this.getConstructorName(schema.__proto__);
			if (serviceName === target){
				Object.setPrototypeOf(schema.__proto__, this.ServiceFactory);
				return schema;
			}
			// This is just to handle some idiosyncrasies from Jest.
			if (schema._isMockFunction){
				target = this.getConstructorName(schema.prototype.__proto__);
				if (serviceName === target){
					Object.setPrototypeOf(schema, this.ServiceFactory);
					return schema;
				}
			}
			return schema;
		}
	}

	/**
	 * Version of Moleculer
	 */
	ServiceBroker.MOLECULER_VERSION = require$$7.version;
	ServiceBroker.prototype.MOLECULER_VERSION = ServiceBroker.MOLECULER_VERSION;

	/**
	 * Version of Protocol
	 */
	ServiceBroker.PROTOCOL_VERSION = "4";
	ServiceBroker.prototype.PROTOCOL_VERSION = ServiceBroker.PROTOCOL_VERSION;

	/**
	 * Default configuration
	 */
	ServiceBroker.defaultOptions = defaultOptions;

	var serviceBroker = ServiceBroker;

	const {
		CIRCUIT_CLOSE,
		CIRCUIT_HALF_OPEN,
		CIRCUIT_HALF_OPEN_WAIT,
		CIRCUIT_OPEN
	} = constants;

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
		METRIC: constants$1,

		Registry: registry$2,
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

	const ServiceBroker$1 = moleculer.ServiceBroker;
	const Loggers$1 = moleculer.Loggers;
	const Service$1 = moleculer.Service;
	const Context$1 = moleculer.Context;
	const Cachers$1 = moleculer.Cachers;
	const Transporters$1 = moleculer.Transporters;
	const Serializers$1 = moleculer.Serializers;
	const Strategies$1 = moleculer.Strategies;
	const Validators$1 = moleculer.Validators;
	const TracerExporters = moleculer.TracerExporters;
	const MetricTypes = moleculer.MetricTypes;
	const MetricReporters = moleculer.MetricReporters;
	const METRIC$c = moleculer.METRIC;
	const Registry$1 = moleculer.Registry;
	const Discoverers$1 = moleculer.Discoverers;
	const Middlewares$1 = moleculer.Middlewares;
	const Errors = moleculer.Errors;
	const Runner = false;
	const Utils = moleculer.Utils;
	const CIRCUIT_CLOSE$1 = moleculer.CIRCUIT_CLOSE;
	const CIRCUIT_HALF_OPEN$1 = moleculer.CIRCUIT_HALF_OPEN;
	const CIRCUIT_HALF_OPEN_WAIT$1 = moleculer.CIRCUIT_HALF_OPEN_WAIT;
	const CIRCUIT_OPEN$1 = moleculer.CIRCUIT_OPEN;
	const MOLECULER_VERSION$1 = moleculer.MOLECULER_VERSION;
	const PROTOCOL_VERSION = moleculer.PROTOCOL_VERSION;

	exports.CIRCUIT_CLOSE = CIRCUIT_CLOSE$1;
	exports.CIRCUIT_HALF_OPEN = CIRCUIT_HALF_OPEN$1;
	exports.CIRCUIT_HALF_OPEN_WAIT = CIRCUIT_HALF_OPEN_WAIT$1;
	exports.CIRCUIT_OPEN = CIRCUIT_OPEN$1;
	exports.Cachers = Cachers$1;
	exports.Context = Context$1;
	exports.Discoverers = Discoverers$1;
	exports.Errors = Errors;
	exports.Loggers = Loggers$1;
	exports.METRIC = METRIC$c;
	exports.MOLECULER_VERSION = MOLECULER_VERSION$1;
	exports.MetricReporters = MetricReporters;
	exports.MetricTypes = MetricTypes;
	exports.Middlewares = Middlewares$1;
	exports.PROTOCOL_VERSION = PROTOCOL_VERSION;
	exports.Registry = Registry$1;
	exports.Runner = Runner;
	exports.Serializers = Serializers$1;
	exports.Service = Service$1;
	exports.ServiceBroker = ServiceBroker$1;
	exports.Strategies = Strategies$1;
	exports.TracerExporters = TracerExporters;
	exports.Transporters = Transporters$1;
	exports.Utils = Utils;
	exports.Validators = Validators$1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=moleculer.js.map
