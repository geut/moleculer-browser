import { Buffer } from 'buffer';
import crypto from 'crypto';

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
				const encrypter = iv ? crypto.createCipheriv(algorithm, password, iv) : crypto.createCipher(algorithm, password);
				const res = Buffer.concat([encrypter.update(data), encrypter.final()]);
				return next(topic, res, meta);
			};
		},

		transporterReceive(next) {
			return (cmd, data, s) => {
				const decrypter = iv ? crypto.createDecipheriv(algorithm, password, iv) : crypto.createDecipher(algorithm, password);
				const res = Buffer.concat([decrypter.update(data), decrypter.final()]);
				return next(cmd, res, s);
			};
		}
	};
};

export default encryption;
//# sourceMappingURL=encryption.js.map
