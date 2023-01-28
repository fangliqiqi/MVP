import{s as t,_ as e,a as s}from"./index.1672389691407.js";import{P as o}from"./ProTable.1672389691407.js";import{P as a}from"./index.16723896914072.js";import{d as r,$ as n,j as c,a2 as i,o as l,c as u,a as d,K as p,V as m,i as h,f as y,W as f,P as b,a3 as C,T as j}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";const x=r({name:"DotStatus",props:{color:{type:String,"default":null},title:{type:String,"default":null,required:!1},type:{type:String,"default":"info"},space:{type:Number,"default":12}},setup(t,e){const s={info:"#707881",warn:"#E6A23C",success:"#859BCD",error:"#F56C6C"},o=n({dotColor:null,radius:3});return c((()=>{t.color?o.dotColor=t.color:o.dotColor=s[t.type]})),{...i(o),...i(t)}}}),I={"class":"hro-status-container"};var g=e(x,[["render",function(t,e,s,o,a,r){return l(),u("div",I,[d("span",{"class":"dot",style:p(`height:${2*t.radius}px;width:${2*t.radius}px;background-color:${t.dotColor};margin-right:${t.space}px;margin-bottom:${(7-t.radius)/2}px`)},null,4),d("span",null,m(t.title),1)])}],["__scopeId","data-v-4afa6640"]]);const k={"class":"system-dict-container"},S={key:0,"class":"pro-btn"},v=["onClick"],w={key:1,"class":"pro-btn"},T=["onClick"];var P=e({name:"定时任务",components:{ProTable:o,ProButtons:a,DotStatus:g},setup(){var e;const o=null==(e=h())?void 0:e.appContext.config.globalProperties.$message,a=y(null),r=()=>{a.value&&a.value.refresh()},c=n({status:{0:"正常",1:"暂停"},statusColor:{0:"success",1:"error"},columns:[{dataIndex:"jobId",title:"任务ID",hideInSearch:!0,minWidth:80},{dataIndex:"beanName",title:"任务类名",hideInSearch:!0,minWidth:160,tooltip:!0},{dataIndex:"methodName",title:"任务执行方法",hideInSearch:!0,minWidth:140,tooltip:!0},{dataIndex:"cronExpression",title:"CRON表达式",minWidth:180,tooltip:!0},{dataIndex:"status",title:"状态",hideInSearch:!0,minWidth:180,scopedSlots:{customRender:"status"}},{dataIndex:"option",title:"操作",key:"option",width:260,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],cellBtns:[{text:"立即执行",prop:"run"}]}),l=e=>{s.confirm("是否确定执行？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{try{const s=await async function(e){return t({url:"/yifu-job/method/sysschedulejob/run",method:"get",params:e})}({jobIds:e.jobId});s&&200===s.code?(o.success("执行成功"),r()):o.error(s.msg||"执行失败")}catch(s){o.error("执行失败")}}))["catch"]((()=>{}))},u=async e=>{try{const s=await async function(e){return t({url:"/yifu-job/method/sysschedulejob/pause",method:"get",params:e})}({jobIds:e.jobId});s&&200===s.code?(o.success("暂停成功"),r()):o.error(s.msg||"状态更新失败")}catch(s){o.error("状态更新失败")}},d=async e=>{try{const s=await async function(e){return t({url:"/yifu-job/method/sysschedulejob/resume",method:"get",params:e})}({jobIds:e.jobId});s&&200===s.code?(o.success("启用成功"),r()):o.error(s.msg||"启用失败")}catch(s){o.error("启用失败")}};return{...i(c),request:async e=>{try{const s=await async function(e){return t({url:"/yifu-job/method/sysschedulejob/page",method:"GET",params:e})}(e);if(s&&200==s.code&&s.data)return{current:s.data.current,total:s.data.total,data:s.data.records}}catch(s){}return{current:1,total:0,data:[]}},onCellClick:async(t,e)=>{"run"===t?l(e):"pause"===t?u(e):"resume"===t&&d(e)},proTableRef:a,refreshList:r}}},[["render",function(t,e,s,o,a,r){const n=C("dot-status"),c=C("pro-buttons"),i=C("pro-table");return l(),u("div",k,[f(i,{ref:"proTableRef","row-key":"id",columns:t.columns,request:o.request,showHeader:!1},{status:b((e=>[f(n,{title:t.status[e.status],type:t.statusColor[e.status]},null,8,["title","type"])])),option:b((e=>[f(c,{array:t.cellBtns,model:e,onOnClick:o.onCellClick},{"default":b((()=>["0"==e.status?(l(),u("span",S,[d("a",{onClick:()=>o.onCellClick("pause",e)},"暂停",8,v)])):"1"==e.status?(l(),u("span",w,[d("a",{onClick:()=>o.onCellClick("resume",e)},"启用",8,T)])):j("",!0)])),_:2},1032,["array","model","onOnClick"])])),_:1},8,["columns","request"])])}],["__scopeId","data-v-60363390"]]);export{P as default};