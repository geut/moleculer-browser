import t from"../../../process.js";const e=n()-1e9*t.uptime();function n(){const e=t.hrtime();return 1e9*e[0]+e[1]}function o(){return(n()-e)/1e6}const r=o(),c=Date.now();export default()=>c+o()-r;
//# sourceMappingURL=now.js.map
