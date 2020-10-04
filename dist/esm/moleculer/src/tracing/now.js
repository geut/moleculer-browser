import proc from '../../../process.js';

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

export default now_1;
//# sourceMappingURL=now.js.map
