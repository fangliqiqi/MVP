import"./ProTable.1672389691407.js";import t from"./staffProject.16723896914072.js";import{_ as a}from"./index.1672389691407.js";import{d as e,k as s,j as o,h as c,$ as n,c as l,W as r,P as i,u as p,O as u,J as d,T as f,ay as j,az as m,a3 as b,o as v,F as T,a5 as g,a as h,V as S}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./header.1672389691407.js";import"./staff.1672389691407.js";import"./contract.1672389691407.js";import"./dicts.1672389691407.js";import"./log.1672389691407.js";const _={"class":"service-info section-container"},y=(t=>(j("data-v-76a50ae6"),t=t(),m(),t))((()=>h("div",{"class":"title"},[
h("span",null,"整体服务概览")],-1))),A=["innerHTML"],V={"class":"desc-content"},k={"class":"detail-tooltip-container"},x=["innerHTML"],F=e({name:"serviceSection"});var H=a(Object.assign(F,{props:{getStaffTitle:Function,getStaffValue:Function,getColNumber:Function,projects:Array},setup(a){const e=a,j=s((()=>{if(e.projects&&e.projects.length){const t=e.projects.find((t=>t.id===F.attachActiveTab));if(t&&1==t.projectStatus)return!0}return!1}));o((()=>{e.projects&&e.projects.length&&(F.attachActiveTab=e.projects[0].id)})),c((()=>e.projects),((t,a)=>{t&&t.length?F.attachActiveTab=e.projects[0].id:F.attachActiveTab=null}));const m=s((()=>!(!e.projects||!e.projects.length))),F=n({params:["contractStatus","socialStatus","fundStatus","insuranceStatus","salaryStatus"],attachActiveTab:null});return(s,o)=>{const c=b("el-tooltip"),n=b("el-col"),H=b("el-row"),L=b("el-tab-pane"),M=b("el-tabs");return v(),l("div",_,[y,r(H,null,{"default":i((()=>[(v(!0),l(T,null,g(F.params,(t=>(v(),u(n,{key:`basicInfo_${t}`,"class":"basic-info-item",span:a.getColNumber(t)},{"default":i((()=>[h("span",{"class":"desc-title",innerHTML:a.getStaffTitle(t)},null,8,A),h("div",V,[r(c,{placement:"top-start",effect:"dark","popper-class":"detail-tooltip-popper"},{content:i((()=>[h("div",k,[h("span",{innerHTML:a.getStaffValue(t)},null,8,x)])])),"default":i((()=>[h("span",null,S(a.getStaffValue(t)),1)])),_:2},1024)])])),_:2},1032,["span"])))),128))])),_:1}),p(m)?(v(),u(M,{key:0,modelValue:F.attachActiveTab,"onUpdate:modelValue":o[0]||(o[0]=t=>F.attachActiveTab=t),"class":d("project-tabs "+(p(j)?"reduce-tabs":"")),style:{"margin-top":"16px"}},{"default":i((()=>[(v(!0),l(T,null,g(e.projects,(a=>(v(),u(L,{key:`project_tab_${a.id}`,name:a.id},{label:i((()=>[h("div",{"class":d("pro-custom-tab "+(1==a.projectStatus?"is-reduce":""))},[h("span",null,S(a.deptName),1)],2)])),"default":i((()=>[r(t,{info:a},null,8,["info"])])),_:2},1032,["name"])))),128))])),_:1},8,["modelValue","class"])):f("",!0)])}}}),[["__scopeId","data-v-76a50ae6"]]);export{H as default};