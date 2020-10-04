import kleur from 'kleur';
import formatted from './formatted.js';

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
			kleur.enabled = false;
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

export default console_1;
//# sourceMappingURL=console.js.map
