import{i as e}from"./staff.1672389691407.js";import{P as a}from"./ProTable.1672389691407.js";import{Y as t}from"./header.1672389691407.js";import{_ as o,g as s}from"./index.1672389691407.js";import{S as n,a as l}from"./dicts.1672389691407.js";import{g as i,a as r}from"./log.1672389691407.js";import{d as c,f as d,$ as u,j as p,c as f,W as m,P as g,n as S,a3 as h,o as _,a as j,U as y,V as I}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";const v={"class":"operate-log-container"},w={"class":"diff-content",style:{"margin-left":"50px"}},x={style:{"font-weight":"bold"}},D=["innerHTML"],T=c({name:"operateLog"});var b=o(Object.assign(T,{setup(o,{expose:c}){const T=d(null),b=u({dictKeys:["emp_natrue","emp_married","emp_national","emp_political","emp_registype","education","commercial_satte","social_ecurity_state","fund_status","personnel_state","EMP_SOURCE","social_reduce_reason","project_emp_source"],DICTS:{collegeDict:{0:"否",1:"是"},fileStatusEnmu:{0:"草稿",1:"已审核"},salaryStatusOption:n,sexOption:l},isShowDialog:!1,columns:[{dataIndex:"createName",title:"操作人",minWidth:160},{dataIndex:"updateTime",title:"操作时间",minWidth:160},{dataIndex:"differenceInfo",title:"操作内容",minWidth:160,tooltip:!0,formatter:e=>{if(e.differenceInfo)return O(e.differenceInfo)}}],logSource:[]}),O=e=>e.split(",").filter((e=>!t.includes(e))).map((e=>i(e,"staff"))).join(",").replace(/&emsp;/g,""),C=e=>{const a=e.differenceInfo,o=JSON.parse(e.newInfo),s=JSON.parse(e.oldInfo);return a.split(",").filter((e=>!t.includes(e))).map((e=>{let a="<div class='diff-item'>";const t=i(e,"staff");let n="",l="";return n=r(e,s,b.DICTS),""!=n&&null!=n&&null!=n||(n="[空值]"),l=r(e,o,b.DICTS),""!=l&&null!=l&&null!=l||(l="[空值]"),a+=`<span>修改了</span><span style="font-weight:bold;">${t}</span>：<span style="color:var(\t--hro-color-text-disabeld);" class='old-value'>${n}</span>  ->  <span class='new-val'>${l}</span>`,a+="</div>",a})).join("")},E=async a=>{try{if(b.logSource&&b.logSource.length){const{current:e,size:t}=a,o=(e-1)*t,s=e*t;return b.logSource.length>=o?{current:e,total:b.logSource.length,data:b.logSource.slice(o,s)}:{current:1,total:b.logSource.length,data:b.logSource.slice(0,t)}}const t=await e(Object.assign({},a,{empId:b.info.id}));if(t&&200==t.code&&t.data){const e=t.data;return b.logSource=e,{current:1,total:e.length,data:e.slice(0,a.size)}}}catch(t){}return{current:1,total:0,data:[]}};p((()=>{N()}));const N=async()=>{try{const e=await s(b.dictKeys);e&&(b.DICTS=Object.assign({},b.DICTS,e))}catch(e){}},P=()=>{b.isShowDialog=!1};return c({openDialog:async e=>{b.info=e,b.isShowDialog=!0,S((()=>{T.value&&T.value.refresh()}))}}),(e,t)=>{const o=h("el-dialog");return _(),f("div",v,[m(o,{title:"操作日志",modelValue:b.isShowDialog,"onUpdate:modelValue":t[0]||(t[0]=e=>b.isShowDialog=e),"close-on-click-modal":!1,width:"1216px",onClose:P},{"default":g((()=>[m(a,{ref_key:"proTableRef",ref:T,"row-key":"id",columns:b.columns,request:E,showHeader:!1,manualRequest:"",tableExpand:""},{expand:g((e=>[j("div",w,[j("div",null,[y(I(e.updateTime)+"由",1),j("span",x,I(e.createName),1)]),j("div",{innerHTML:C(e)},null,8,D)])])),_:1},8,["columns"])])),_:1},8,["modelValue"])])}}}),[["__scopeId","data-v-5239b24a"]]);export{b as default};