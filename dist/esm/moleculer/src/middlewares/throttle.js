export default function(t){return{name:"Throttle",localEvent:function(e,n){if(n.throttle>0){let r=0;return function(o){const l=Date.now();return l-r<n.throttle?t.Promise.resolve():(r=l,e(o))}.bind(this)}return e}}}
//# sourceMappingURL=throttle.js.map
