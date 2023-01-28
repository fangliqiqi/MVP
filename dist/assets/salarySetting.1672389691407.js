import{d as t,f as a,$ as e,E as n,j as s,c as o,W as r,P as i,aA as c,o as d,i as l}from"./vue.1672389691407.js";import{P as p}from"./ProTable.1672389691407.js";import{P as m}from"./index.16723896914072.js";import u from"./addSalarySetting.1672389691407.js";import{q as f,r as h}from"./settings.1672389691407.js";import{o as y,a as g}from"./events.1672389691407.js";import{_ as x,a as _,E as b}from"./index.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";const v={"class":"cardinal-config-container"},j=t({name:"工资报表配置"});var w=x(Object.assign(j,{setup(t){const x=a(null),j=c(),w=a(null),{proxy:S}=l(),k=()=>{w.value&&w.value.onSearch()},I=async(t,a)=>{switch(t){case"edit":x.value&&x.value.openDialog(a);break;case"remove":T(a)}},T=t=>{_.confirm('<p style="font-size:16px;font-weight:600">是否确定删除?<br/>\n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">删除后，配置将从系统消失，请谨慎操作！</span></p>',{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const a=await h(t.id);a&&200===a.code?(b.success("工资报表删除成功"),k()):b.error(a.msg||"工资报表删除失败")}catch(a){b.error(a&&a.msg||"工资报表删除失败")}}))["catch"]((()=>{}))},C=e({searchConfig:{labelWidth:120,option:{extBtn:"extBtns"}},columns:[{dataIndex:"dbFiedName",title:"系统标准数据项",minWidth:180,hideInSearch:!1,tooltip:!1},{dataIndex:"cnName",title:"原表对应数据项",minWidth:180,hideInSearch:!1,tooltip:!1},{dataIndex:"option",title:"操作",key:"option",width:120,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],params:{},btn:[{label:"新增",onClick:()=>{x.value&&x.value.openDialog()},permission:["wxhr:tsalaryconfigstandard_add"],icon:"icon-ic_edit_add"}],cellBtns:[{text:"编辑",permission:["wxhr:tsalaryconfigstandard_edit"],prop:"edit"},{text:"删除",permission:["wxhr:tsalaryconfigstandard_del"],prop:"remove"}],dictKeys:["emp_natrue","send_order_type","social-conduct-status","fund-conduct-status","dispatch-audit-status"],DICTS:{}});n((()=>{y(S)})),s((()=>{g(S,j.path,(()=>{k()}))}));const B=async t=>{try{t.createTime&&(t.createTime=null);const a=await f(t);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(a){}return{current:1,total:0,data:[]}};return(t,a)=>(d(),o("div",v,[r(p,{ref_key:"proTableRef",ref:w,"row-key":"id",columns:C.columns,request:B,btn:C.btn,searchConfig:C.searchConfig},{option:i((t=>[r(m,{array:C.cellBtns,model:t,onOnClick:I},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),r(u,{ref_key:"addSalarySettingRef",ref:x,onOk:k},null,512)]))}}),[["__scopeId","data-v-003b327f"]]);export{w as default};