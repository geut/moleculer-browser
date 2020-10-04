import errors from '../errors.js';
import base from './base.js';
import Validator from 'fastest-validator';

const { ValidationError } = errors;


class FastestValidator  extends base{

	constructor(opts) {
		super(opts);
		this.validator = new Validator(this.opts);
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
			throw new ValidationError("Parameters validation error!", null, res);

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

export default fastest;
//# sourceMappingURL=fastest.js.map
