import proc from '../../../process.js';
import constants from './constants.js';
import * as os from '../../../os.js';
import require$$19 from '../../../no-impl.js';
import cpuUsage from '../cpu-usage.js';

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

	const item = this.register({ name: constants.PROCESS_ARGUMENTS, type: constants.TYPE_INFO, labelNames: ["index"], description: "Process arguments" });
	proc.argv.map((arg, index) => item.set(arg, { index }));

	this.register({ name: constants.PROCESS_PID, type: constants.TYPE_INFO, description: "Process PID" }).set(proc.pid);
	this.register({ name: constants.PROCESS_PPID, type: constants.TYPE_INFO, description: "Process parent PID" }).set(proc.ppid);

	this.register({ name: constants.PROCESS_MEMORY_HEAP_SIZE_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_SIZE_USED, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process used heap size" });
	this.register({ name: constants.PROCESS_MEMORY_RSS, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process RSS size" });
	this.register({ name: constants.PROCESS_MEMORY_EXTERNAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process external memory size" });

	this.register({ name: constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL, type: constants.TYPE_GAUGE, labelNames: ["space"], unit: constants.UNIT_BYTE, description: "Process total heap space size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED, type: constants.TYPE_GAUGE, labelNames: ["space"], unit: constants.UNIT_BYTE, description: "Process used heap space size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE, type: constants.TYPE_GAUGE, labelNames: ["space"], unit: constants.UNIT_BYTE, description: "Process available heap space size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL, type: constants.TYPE_GAUGE, labelNames: ["space"], unit: constants.UNIT_BYTE, description: "Process physical heap space size" });

	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat executable size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat physical size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat available size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat used size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat size limit" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Process heap stat mallocated size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "Peak of process heap stat mallocated size" });
	this.register({ name: constants.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE, type: constants.TYPE_GAUGE, description: "Process heap stat zap garbage" });

	this.register({ name: constants.PROCESS_UPTIME, type: constants.TYPE_GAUGE, unit: constants.UNIT_SECONDS, description: "Process uptime" });
	this.register({ name: constants.PROCESS_INTERNAL_ACTIVE_HANDLES, type: constants.TYPE_GAUGE, unit: constants.UNIT_HANDLE, description: "Number of active process handlers" });
	this.register({ name: constants.PROCESS_INTERNAL_ACTIVE_REQUESTS, type: constants.TYPE_GAUGE, unit: constants.UNIT_REQUEST, description: "Number of active process requests" });

	this.register({ name: constants.PROCESS_VERSIONS_NODE, type: constants.TYPE_INFO, description: "Node version" }).set(proc.versions.node);

	// --- OS METRICS ---

	this.register({ name: constants.OS_MEMORY_FREE, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "OS free memory size" });
	this.register({ name: constants.OS_MEMORY_USED, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "OS used memory size" });
	this.register({ name: constants.OS_MEMORY_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_BYTE, description: "OS total memory size" });
	this.register({ name: constants.OS_UPTIME, type: constants.TYPE_GAUGE, unit: constants.UNIT_SECONDS, description: "OS uptime" });
	this.register({ name: constants.OS_TYPE, type: constants.TYPE_INFO, description: "OS type" }).set(os.type());
	this.register({ name: constants.OS_RELEASE, type: constants.TYPE_INFO, description: "OS release" }).set(os.release());
	this.register({ name: constants.OS_HOSTNAME, type: constants.TYPE_INFO, description: "Hostname" }).set(os.hostname());
	this.register({ name: constants.OS_ARCH, type: constants.TYPE_INFO, description: "OS architecture" }).set(os.arch());
	this.register({ name: constants.OS_PLATFORM, type: constants.TYPE_INFO, description: "OS platform" }).set(os.platform());

	const userInfo = getUserInfo();
	this.register({ name: constants.OS_USER_UID, type: constants.TYPE_INFO, description: "UID" }).set(userInfo.uid);
	this.register({ name: constants.OS_USER_GID, type: constants.TYPE_INFO, description: "GID" }).set(userInfo.gid);
	this.register({ name: constants.OS_USER_USERNAME, type: constants.TYPE_INFO, description: "Username" }).set(userInfo.username);
	this.register({ name: constants.OS_USER_HOMEDIR, type: constants.TYPE_INFO, description: "User's home directory" }).set(userInfo.homedir);

	this.register({ name: constants.OS_NETWORK_ADDRESS, type: constants.TYPE_INFO, labelNames: ["interface", "family"], description: "Network address" });
	this.register({ name: constants.OS_NETWORK_MAC, type: constants.TYPE_INFO, labelNames: ["interface", "family"], description: "MAC address" });

	this.register({ name: constants.OS_DATETIME_UNIX, type: constants.TYPE_GAUGE, description: "Current datetime in Unix format" });
	this.register({ name: constants.OS_DATETIME_ISO, type: constants.TYPE_INFO, description: "Current datetime in ISO string" });
	this.register({ name: constants.OS_DATETIME_UTC, type: constants.TYPE_INFO, description: "Current UTC datetime" });
	this.register({ name: constants.OS_DATETIME_TZ_OFFSET, type: constants.TYPE_GAUGE, description: "Timezone offset" });

	this.register({ name: constants.OS_CPU_LOAD_1, type: constants.TYPE_GAUGE, description: "CPU load1" });
	this.register({ name: constants.OS_CPU_LOAD_5, type: constants.TYPE_GAUGE, description: "CPU load5" });
	this.register({ name: constants.OS_CPU_LOAD_15, type: constants.TYPE_GAUGE, description: "CPU load15" });
	this.register({ name: constants.OS_CPU_UTILIZATION, type: constants.TYPE_GAUGE, description: "CPU utilization" });

	this.register({ name: constants.OS_CPU_USER, type: constants.TYPE_GAUGE, description: "CPU user time" });
	this.register({ name: constants.OS_CPU_SYSTEM, type: constants.TYPE_GAUGE, description: "CPU system time" });

	this.register({ name: constants.OS_CPU_TOTAL, type: constants.TYPE_GAUGE, unit: constants.UNIT_CPU, description: "Number of CPUs" });
	this.register({ name: constants.OS_CPU_INFO_MODEL, type: constants.TYPE_INFO, labelNames: ["index"], description: "CPU model" });
	this.register({ name: constants.OS_CPU_INFO_SPEED, type: constants.TYPE_GAUGE, labelNames: ["index"], unit: constants.UNIT_GHZ, description: "CPU speed" });
	this.register({ name: constants.OS_CPU_INFO_TIMES_USER, type: constants.TYPE_GAUGE, labelNames: ["index"], description: "CPU user time" });
	this.register({ name: constants.OS_CPU_INFO_TIMES_SYS, type: constants.TYPE_GAUGE, labelNames: ["index"], description: "CPU system time" });

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

			this.register({ name: constants.PROCESS_GC_TIME, type: constants.TYPE_GAUGE, unit: constants.UNIT_NANOSECONDS, description: "GC time" });
			this.register({ name: constants.PROCESS_GC_TOTAL_TIME, type: constants.TYPE_GAUGE, unit: constants.UNIT_MILLISECONDS, description: "Total time of GC" });
			this.register({ name: constants.PROCESS_GC_EXECUTED_TOTAL, type: constants.TYPE_GAUGE, labelNames: ["type"], unit: null, description: "Number of executed GC" });

			gc.on("stats", stats => {
				this.set(constants.PROCESS_GC_TIME, stats.pause);
				this.increment(constants.PROCESS_GC_TOTAL_TIME, null, stats.pause / 1e6);
				if (stats.gctype == 1)
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "scavenge" });
				if (stats.gctype == 2)
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "marksweep" });
				if (stats.gctype == 4)
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "incremental" });
				if (stats.gctype == 8)
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "weakphantom" });
				if (stats.gctype == 15) {
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "scavenge" });
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "marksweep" });
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "incremental" });
					this.increment(constants.PROCESS_GC_EXECUTED_TOTAL, { type: "weakphantom" });
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
			this.register({ name: constants.PROCESS_EVENTLOOP_LAG_MIN, type: constants.TYPE_GAUGE, unit: constants.UNIT_MILLISECONDS, description: "Minimum of event loop lag" });
			this.register({ name: constants.PROCESS_EVENTLOOP_LAG_AVG, type: constants.TYPE_GAUGE, unit: constants.UNIT_MILLISECONDS, description: "Average of event loop lag" });
			this.register({ name: constants.PROCESS_EVENTLOOP_LAG_MAX, type: constants.TYPE_GAUGE, unit: constants.UNIT_MILLISECONDS, description: "Maximum of event loop lag" });
			this.register({ name: constants.PROCESS_EVENTLOOP_LAG_COUNT, type: constants.TYPE_GAUGE, description: "Number of event loop lag samples." });
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

	this.set(constants.PROCESS_MEMORY_HEAP_SIZE_TOTAL, procMem.heapTotal);
	this.set(constants.PROCESS_MEMORY_HEAP_SIZE_USED, procMem.heapUsed);
	this.set(constants.PROCESS_MEMORY_RSS, procMem.rss);
	this.set(constants.PROCESS_MEMORY_EXTERNAL, procMem.external);

	if (v8 && v8.getHeapSpaceStatistics) {
		const stat = v8.getHeapSpaceStatistics();
		stat.forEach(item => {
			const space = item.space_name;
			this.set(constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL, item.space_size, { space });
			this.set(constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED, item.space_used_size, { space });
			this.set(constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE, item.space_available_size, { space });
			this.set(constants.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL, item.physical_space_size, { space });
		});
	}

	if (v8 && v8.getHeapStatistics) {
		const stat = v8.getHeapStatistics();
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL, stat.total_heap_size);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL, stat.total_heap_size_executable);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL, stat.total_physical_size);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL, stat.total_available_size);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE, stat.used_heap_size);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT, stat.heap_size_limit);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY, stat.malloced_memory);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY, stat.peak_malloced_memory);
		this.set(constants.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE, stat.does_zap_garbage);
	}

	this.set(constants.PROCESS_UPTIME, proc.uptime());
	this.set(constants.PROCESS_INTERNAL_ACTIVE_HANDLES, proc._getActiveHandles().length);
	this.set(constants.PROCESS_INTERNAL_ACTIVE_REQUESTS, proc._getActiveRequests().length);

	// --- OS METRICS ---

	const freeMem = os.freemem();
	const totalMem = os.totalmem();
	const usedMem = totalMem - freeMem;
	this.set(constants.OS_MEMORY_FREE, freeMem);
	this.set(constants.OS_MEMORY_USED, usedMem);
	this.set(constants.OS_MEMORY_TOTAL, totalMem);
	this.set(constants.OS_UPTIME, os.uptime());
	this.set(constants.OS_TYPE, os.type());
	this.set(constants.OS_RELEASE, os.release());
	this.set(constants.OS_HOSTNAME, os.hostname());
	this.set(constants.OS_ARCH, os.arch());
	this.set(constants.OS_PLATFORM, os.platform());

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
		this.set(constants.OS_NETWORK_ADDRESS, f.address, { interface: iface, family: f.family });
		this.set(constants.OS_NETWORK_MAC, f.mac, { interface: iface, family: f.family });
	}

	const d = new Date();
	this.set(constants.OS_DATETIME_UNIX, d.valueOf());
	this.set(constants.OS_DATETIME_ISO, d.toISOString());
	this.set(constants.OS_DATETIME_UTC, d.toUTCString());
	this.set(constants.OS_DATETIME_TZ_OFFSET, d.getTimezoneOffset());

	const load = os.loadavg();
	this.set(constants.OS_CPU_LOAD_1, load[0]);
	this.set(constants.OS_CPU_LOAD_5, load[1]);
	this.set(constants.OS_CPU_LOAD_15, load[2]);

	if (eventLoop && eventLoop.sense) {
		const stat = eventLoop.sense();
		this.set(constants.PROCESS_EVENTLOOP_LAG_MIN, stat.min);
		this.set(constants.PROCESS_EVENTLOOP_LAG_AVG, stat.num ? stat.sum / stat.num : 0);
		this.set(constants.PROCESS_EVENTLOOP_LAG_MAX, stat.max);
		this.set(constants.PROCESS_EVENTLOOP_LAG_COUNT, stat.num);
	}

	// this.increment(METRIC.MOLECULER_METRICS_COMMON_COLLECT_TOTAL);
	const duration = end();

	return this.broker.Promise.resolve()
		.then(() => cpuUsage().then(res => {
			this.set(constants.OS_CPU_UTILIZATION, res.avg);

			try {
				const cpus = os.cpus();
				this.set(constants.OS_CPU_TOTAL, cpus.length);
				this.set(constants.OS_CPU_USER, cpus.reduce((a,b) => a + b.times.user, 0));
				this.set(constants.OS_CPU_SYSTEM, cpus.reduce((a,b) => a + b.times.sys, 0));

				cpus.forEach((cpu, index) => {
					this.set(constants.OS_CPU_INFO_MODEL, cpu.model, { index });
					this.set(constants.OS_CPU_INFO_SPEED, cpu.speed, { index });
					this.set(constants.OS_CPU_INFO_TIMES_USER, cpu.times.user, { index });
					this.set(constants.OS_CPU_INFO_TIMES_SYS, cpu.times.sys, { index });
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

export default commons;
//# sourceMappingURL=commons.js.map
