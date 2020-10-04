/* global self */

const scope = (typeof global !== 'undefined' && global) ||
            (typeof self !== 'undefined' && self) ||
            window;

var fetch = (...args) => scope.fetch(...args);

export default fetch;
//# sourceMappingURL=fetch.js.map
