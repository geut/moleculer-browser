var t=class{constructor(t,s,e){this.node=t,this.name=s.name,this.fullName=s.fullName,this.version=s.version,this.settings=s.settings,this.metadata=s.metadata||{},this.local=!!e,this.actions={},this.events={}}equals(t,s){return this.fullName==t&&(null==s||this.node.id==s)}update(t){this.fullName=t.fullName,this.version=t.version,this.settings=t.settings,this.metadata=t.metadata||{}}addAction(t){this.actions[t.name]=t}addEvent(t){this.events[t.name]=t}};export default t;
//# sourceMappingURL=service-item.js.map
