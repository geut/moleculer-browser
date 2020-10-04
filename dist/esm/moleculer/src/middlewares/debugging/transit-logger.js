import _ from 'lodash';
import path from 'path';
import kleur from 'kleur';
import fs from 'fs';
import utils_1 from '../../utils.js';

const { makeDirs } = utils_1;

var transitLogger = function TransitLoggerMiddleware(opts) {
	opts = _.defaultsDeep(opts, {
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
		fs.writeFile(path.join(targetFolder, filename), data, () => { /* Silent error */ });
	}

	const coloringSend = opts.colors && opts.colors.send ? opts.colors.send.split(".").reduce((a,b) => a[b] || a()[b], kleur) : s => s;
	const coloringReceive = opts.colors && opts.colors.receive ? opts.colors.receive.split(".").reduce((a,b) => a[b] || a()[b], kleur) : s => s;

	let logFn;

	return {
		name: "TransitLogger",
		created(broker) {
			logger = opts.logger || broker.getLogger("debug");
			nodeID = broker.nodeID;

			if (opts.folder) {
				targetFolder = path.join(opts.folder, nodeID);
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

export default transitLogger;
//# sourceMappingURL=transit-logger.js.map
