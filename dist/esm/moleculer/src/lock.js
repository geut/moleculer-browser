var e=class{constructor(){this.locked=new Map}acquire(e){let t=this.locked.get(e);return t?new Promise((e=>t.push(e))):(t=[],this.locked.set(e,t),Promise.resolve())}isLocked(e){return!!this.locked.get(e)}release(e){let t=this.locked.get(e);return t&&(t.length>0?t.shift()():this.locked.delete(e)),Promise.resolve()}};export default e;
//# sourceMappingURL=lock.js.map
