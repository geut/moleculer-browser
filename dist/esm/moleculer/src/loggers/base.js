import r from"lodash";import e from"../utils.js";const{match:t,isObject:o,isString:s}=e;class i{constructor(e){this.opts=r.defaultsDeep(e,{level:"info",createLogger:null}),this.Promise=Promise}init(r){this.loggerFactory=r,this.broker=this.loggerFactory.broker,this.Promise=this.broker.Promise}stop(){return this.Promise.resolve()}getLogLevel(r){r=r?r.toUpperCase():"";const e=this.opts.level;if(s(e))return e;if(o(e)){if(e[r])return e[r];const o=Object.keys(e).find((e=>t(r,e)&&"**"!==e));if(o)return e[o];if(e["**"])return e["**"]}return null}getLogHandler(){return null}}i.LEVELS=["fatal","error","warn","info","debug","trace"];var l=i;export default l;
//# sourceMappingURL=base.js.map
