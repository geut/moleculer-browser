import e from"../constants.js";import r from"./gauge.js";var t=class extends r{constructor(r,t){super(r,t),this.type=e.TYPE_COUNTER}decrement(){throw new Error("Counter can't be decreased.")}};export default t;
//# sourceMappingURL=counter.js.map
