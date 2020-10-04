import proc from '../../process.js';
import * as os from '../../os.js';
import utils_1 from './utils.js';
import require$$7 from '../package.json.js';

const { getIpList } = utils_1;
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

const getUserInfo = () => {
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
		user: getUserInfo()
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
		ip:  getIpList()
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

export default health;
//# sourceMappingURL=health.js.map
