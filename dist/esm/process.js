import e from"eventemitter2";import r from"browser-process-hrtime";import t from"./global.js";const s=new class extends e{constructor(){super(),this.title="browser",this.browser=!0,this.env={},this.argv=[],this.version="",this.versions={http_parser:"0.0",node:"12.18.4",v8:"0.0",uv:"0.0",zlib:"0.0",ares:"0.0",icu:"0.0",modules:"0",openssl:"0.0"},this.hrtime=r,this.pid=0,this.exitCode=0,this.connected=!0,this._startTime=Date.now(),this._errorCallback=null}exit(e){throw this.exitCode=e,this.emit("exit",[e]),new Error("process.exit() called.")}setUncaughtExceptionCaptureCallback(e){this._errorCallback&&window.removeEventListener("error",this._errorCallback),this._errorCallback=e,e&&window.addEventListener("error",e)}hasUncaughtExceptionCaptureCallback(){return null!==this._errorCallback}cwd(){return"/"}uptime(){return Math.floor((Date.now()-this._startTime)/1e3)}memoryUsage(){if(!performance&&!performance.memory)return{rss:0,heapTotal:Number.MAX_SAFE_INTEGER,heapUsed:0,external:0};const{memory:e}=performance;return{rss:0,heapTotal:e.totalJSHeapSize,heapUsed:e.usedJSHeapSize,external:0}}nextTick(e,...r){queueMicrotask((()=>e(...r)))}_getActiveHandles(){return[]}_getActiveRequests(){return[]}},o=t&&t.process||process;if(o)for(const e in s)"function"!=typeof s[e]?o[e]=s[e]:o[e]=s[e].bind(s);export default s;
//# sourceMappingURL=process.js.map
