import{setInterval as t}from"timers-browserify";var s=class{constructor(s,i,e){this.metric=s,this.item=i,this.min=e,this.rate=0,this.lastValue=0,this.lastTickTime=Date.now(),this.value=null,this.timer=t((()=>this.tick()),5e3).unref()}update(t){this.value=t}tick(){const t=Date.now(),s=(t-this.lastTickTime)/1e3;this.lastTickTime=t;const i=this.value-this.lastValue;this.lastValue=this.value;const e=i/s*60;let a=this.rate+.5*(e-this.rate);Math.abs(a)<.05&&(a=0);const h=Math.abs(a-this.rate)>.01;this.rate=a,h&&this.metric.changed(this.item.value,this.item.labels,t)}reset(){this.lastValue=0,this.value=null,this.rate=0}};export default s;
//# sourceMappingURL=rates.js.map
