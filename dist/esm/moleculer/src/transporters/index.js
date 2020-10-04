import t from"../errors.js";import r from"../utils.js";import s from"../../../no-impl.js";import e from"./base.js";import i from"./fake.js";const{isObject:a,isString:n}=r,{BrokerOptionsError:o}=t,f={Base:e,Fake:i,NATS:s,MQTT:s,Redis:s,AMQP:s,AMQP10:s,Kafka:s,STAN:s,TCP:s};function p(t){if(!t)return null;let r=Object.keys(f).find((r=>r.toLowerCase()==t.toLowerCase()));return r?f[r]:void 0}var m=Object.assign(f,{resolve:function(t){if(t instanceof f.Base)return t;if(n(t)){let r=p(t);if(r)return new r;if(t.startsWith("nats://")?r=f.NATS:t.startsWith("mqtt://")||t.startsWith("mqtts://")?r=f.MQTT:t.startsWith("redis://")||t.startsWith("rediss://")?r=f.Redis:t.startsWith("amqp://")||t.startsWith("amqps://")?r=f.AMQP:t.startsWith("amqp10://")?r=f.AMQP10:t.startsWith("kafka://")?r=f.Kafka:t.startsWith("stan://")?r=f.STAN:t.startsWith("tcp://")&&(r=f.TCP),r)return new r(t);throw new o(`Invalid transporter type '${t}'.`,{type:t})}if(a(t)){let r=p(t.type||"NATS");if(r)return new r(t.options);throw new o(`Invalid transporter type '${t.type}'.`,{type:t.type})}return null},register:function(t,r){f[t]=r}});export default m;
//# sourceMappingURL=index.js.map
