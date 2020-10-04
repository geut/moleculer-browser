import{setTimeout as t}from"timers-browserify";import e from"../errors.js";const{GracefulStopTimeoutError:n}=e;export default function(e){function r(t){if(t.service){const e=t.service._trackedContexts.indexOf(t);-1!==e&&t.service._trackedContexts.splice(e,1)}else{const e=t.broker._trackedContexts.indexOf(t);-1!==e&&t.broker._trackedContexts.splice(e,1)}}function o(t){return this.options.tracking&&this.options.tracking.enabled?function(e){if(!(null!=e.options.tracking?e.options.tracking:this.options.tracking.enabled))return t(e);!function(t){t.service?t.service._trackedContexts.push(t):t.broker._trackedContexts.push(t)}(e);let n=t(e);return n=n.then((t=>(r(e),t))).catch((t=>{throw r(e),t})),n}.bind(this):t}function i(r,o,i,s){return r&&0!==r.length?new e.Promise((e=>{let c=!1;const a=t((()=>{c=!0,o.error(new n({service:s})),r.length=0,e()}),i);let u=!0;const l=()=>{0===r.length?(clearTimeout(a),e()):(u&&(o.warn(`Waiting for ${r.length} running context(s)...`),u=!1),c||t(l,100))};setImmediate(l)})):e.Promise.resolve()}return{name:"ContextTracker",localAction:o,remoteAction:o,localEvent:o,created(t){t._trackedContexts=[]},serviceStarting(t){t._trackedContexts=[]},serviceStopping:t=>i(t._trackedContexts,t.logger,t.settings.$shutdownTimeout||t.broker.options.tracking.shutdownTimeout,t),stopping:t=>i(t._trackedContexts,t.logger,t.options.tracking.shutdownTimeout)}}
//# sourceMappingURL=context-tracker.js.map
