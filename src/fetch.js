/* global self */

const scope = (typeof global !== 'undefined' && global) ||
            (typeof self !== 'undefined' && self) ||
            window

export default (...args) => scope.fetch(...args)
