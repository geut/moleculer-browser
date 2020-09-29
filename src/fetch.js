/* global self */

const scope = (typeof global !== 'undefined' && global) ||
            (typeof self !== 'undefined' && self) ||
            window

module.exports = (...args) => scope.fetch(...args)
