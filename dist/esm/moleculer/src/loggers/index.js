import o from"../errors.js";import e from"../utils.js";import r from"../../../no-impl.js";import t from"./base.js";import n from"./formatted.js";import i from"./console.js";const{isObject:s,isString:f}=e,{BrokerOptionsError:a}=o,l={Base:t,Formatted:n,Bunyan:r,Console:i,Datadog:r,Debug:r,File:r,Log4js:r,Pino:r,Winston:r,LEVELS:t.LEVELS};function p(o){if(!o)return null;let e=Object.keys(l).find((e=>e.toLowerCase()==o.toLowerCase()));return e?l[e]:void 0}var m=Object.assign(l,{resolve:function(o){if(o instanceof l.Base)return o;if(f(o)){let e=p(o);if(e)return new e}else if(s(o)){let e=p(o.type);if(e)return new e(o.options);throw new a(`Invalid logger configuration. Type: '${o.type}'`,{type:o.type})}throw new a(`Invalid logger configuration: '${o}'`,{type:o})},register:function(o,e){l[o]=e}});export default m;
//# sourceMappingURL=index.js.map
