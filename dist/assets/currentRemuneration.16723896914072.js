import{s as t}from"./index.1672389691407.js";async function a(a){return t({url:"/yifu-salary/method/tstatisticsremuneration/page",method:"GET",params:a})}async function e(a){return t({url:"/yifu-salary/method/tstatisticsremuneration/export",method:"POST",responseType:"blob",data:a})}async function r(a){return t({url:"/yifu-salary/method/tstatisticsremuneration/"+a,method:"delete"})}async function s(a){return t({url:"/yifu-salary/method/tstatisticsremuneration/batchDelete",method:"POST",params:a})}async function n(a){return t({url:"/yifu-salary/method/tstatisticsremuneration/refreshStatisticsRemuneration",method:"POST",params:a})}export{s as a,e as c,r as d,a as g,n as r};