import r from"kleur";import e from"./formatted.js";var t=class extends e{constructor(r){super(r),this.maxPrefixLength=0}init(e){super.init(e),this.opts.colors||(r.enabled=!1)}getLogHandler(r){const t=r?this.getLogLevel(r.mod):null;if(!t)return null;const o=e.LEVELS.indexOf(t),n=this.getFormatter(r);return(r,t)=>{if(e.LEVELS.indexOf(r)>o)return;const s=n(r,t);switch(r){case"fatal":case"error":return console.error(...s);case"warn":return console.warn(...s);default:return console.log(...s)}}}};export default t;
//# sourceMappingURL=console.js.map
