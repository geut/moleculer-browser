import e from"../../../process.js";import t from"lodash";import*as r from"../../../os.js";import s from"../utils.js";import o from"./node.js";const{getIpList:i}=s;var n=class{constructor(e,t){this.registry=e,this.broker=t,this.logger=e.logger,this.nodes=new Map,this.createLocalNode()}createLocalNode(){const t=new o(this.broker.nodeID);return t.local=!0,t.ipList=i(),t.instanceID=this.broker.instanceID,t.hostname=r.hostname(),t.client={type:"browser",version:this.broker.MOLECULER_VERSION,langVersion:e.version},t.metadata=this.broker.metadata,t.seq=1,this.add(t.id,t),this.localNode=t,t}add(e,t){this.nodes.set(e,t)}has(e){return this.nodes.has(e)}get(e){return this.nodes.get(e)}delete(e){return this.nodes.delete(e)}count(){return this.nodes.size}onlineCount(){let e=0;return this.nodes.forEach((t=>{t.available&&e++})),e}processNodeInfo(t){const r=t.sender;let s=this.get(r),i=!1,n=!1;s?s.available||(n=!0,s.lastHeartbeatTime=Math.round(e.uptime()),s.available=!0,s.offlineSince=null):(i=!0,s=new o(r),this.add(r,s));return s.update(t,n)&&s.services&&this.registry.registerServices(s,s.services),i?(this.broker.broadcastLocal("$node.connected",{node:s,reconnected:!1}),this.logger.info(`Node '${r}' connected.`),this.registry.updateMetrics()):n?(this.broker.broadcastLocal("$node.connected",{node:s,reconnected:!0}),this.logger.info(`Node '${r}' reconnected.`),this.registry.updateMetrics()):(this.broker.broadcastLocal("$node.updated",{node:s}),this.logger.debug(`Node '${r}' updated.`)),s}disconnected(e,t){let r=this.get(e);r&&r.available&&(r.disconnected(t),this.registry.unregisterServicesByNode(r.id),this.broker.broadcastLocal("$node.disconnected",{node:r,unexpected:!!t}),this.registry.updateMetrics(),this.logger.warn(`Node '${r.id}' disconnected${t?" unexpectedly":""}.`),this.broker.transit&&this.broker.transit.removePendingRequestByNodeID(e))}list({onlyAvailable:e=!1,withServices:r=!1}){let s=[];return this.nodes.forEach((o=>{e&&!o.available||(r?s.push(t.omit(o,["rawInfo"])):s.push(t.omit(o,["services","rawInfo"])))})),s}toArray(){return Array.from(this.nodes.values())}};export default n;
//# sourceMappingURL=node-catalog.js.map
