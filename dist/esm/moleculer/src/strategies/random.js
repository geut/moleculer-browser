import _ from 'lodash';
import base from './base.js';

const { random } = _;


/**
 * Random strategy class
 *
 * @class RandomStrategy
 */
class RandomStrategy extends base {
	select(list) {
		return list[random(0, list.length - 1)];
	}
}

var random_1 = RandomStrategy;

export default random_1;
//# sourceMappingURL=random.js.map
