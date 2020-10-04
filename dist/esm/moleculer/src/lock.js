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

export default lock;
//# sourceMappingURL=lock.js.map
