import{setTimeout as e}from"timers-browserify";export default function(n){return{name:"Debounce",localEvent:function(r,t){if(t.debounce>0){let o;return function(u){return o&&clearTimeout(o),o=e((()=>(o=null,r(u))),t.debounce),n.Promise.resolve()}.bind(this)}return r}}}
//# sourceMappingURL=debounce.js.map
