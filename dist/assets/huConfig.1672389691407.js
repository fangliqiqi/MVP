import{P as e}from"./ProTable.1672389691407.js";import{P as t}from"./index.16723896914072.js";import{t as a}from"./index.16723896914075.js";import i from"./addHuconfig.1672389691407.js";import{_ as o,g as n,a as s,E as l}from"./index.1672389691407.js";import{g as d,i as r}from"./socialfundSet.1672389691407.js";import{d as c,f as p,$ as m,a2 as u,j as y,c as f,W as h,P as g,u as _,o as b}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./file.1672389691407.js";import"./index.167238969140713.js";import"./contractPermission.16723896914072.js";const x={"class":"system-dict-container"},k=c({name:"户配置"});var v=o(Object.assign(k,{setup(o){const c=p(null),k=p(null),v=p(null),j=m({searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},columns:[{dataIndex:"name",title:"户名",minWidth:240,tooltip:!0},{dataIndex:"type",title:"账户性质",minWidth:160},{dataIndex:"archivesLocation",title:"缴纳地",minWidth:200,valueType:"addRess",params:{pro:"province",city:"city",town:"town"}},{dataIndex:"organId",title:"所属机构",minWidth:200,tooltip:!0},{dataIndex:"delFlag",title:"状态",minWidth:200},{dataIndex:"option",title:"操作",key:"option",minWidth:200,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"新增",onClick:()=>{k.value&&k.value.openDialog()},permission:["demo_syshouseholdinfo_add"],icon:"icon-ic_edit_add"}],cellBtns:[{text:"详情",prop:"detail",permission:["demo_syshouseholdinfo_get"]},{text:"编辑",prop:"edit",permission:["demo_syshouseholdinfo_edit"]},{text:"禁用",prop:"stop",permission:["demo_syshouseholdinfo_edit"],isGray:e=>1==e.delFlag,tooltip:"目前禁用状态不可操作"},{text:"启用",prop:"start",permission:["demo_syshouseholdinfo_edit"],isGray:e=>0==e.delFlag,tooltip:"目前启用状态不可操作"}],dictKeys:["hu_config_type","nature_account","dept_config_type"],dictData:{},detailConfig:[{label:"户名",key:"name",tooltip:!0},{label:"账户性质",key:"type",dict:"nature_account"},{label:"缴纳地",key:"archivesLocation",address:["province","city","town"]},{label:"所属机构",key:"organId",dict:"dept_config_type"},{label:"状态",key:"delFlag",dict:"hu_config_type"},{label:"创建时间",key:"createTime"},{label:"审核人",key:"auditUserName"},{label:"办理人",key:"handleUserName"},{label:"备注",key:"rmark",tooltip:!0,size:24}]}),{columns:I,cellBtns:w,btn:D,searchConfig:W}=u(j),C=async e=>{try{const t=await d(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records}}catch(t){}return{current:1,total:0,data:[]}},F=()=>{c.value.refresh()},P=async(e,t)=>{if("stop"==e)s.confirm("是否确定禁用？","提示",{type:"warning"}).then((async()=>{try{const e=await r({id:t.id,delFlag:1});e&&200==e.code?(l.success("禁用成功"),F()):l.error(e.msg)}catch(e){}}));else if("start"==e)s.confirm("是否确定启用？","提示",{type:"warning"}).then((async()=>{try{const e=await r({id:t.id,delFlag:0});e&&200==e.code?(l.success("启用成功"),F()):l.error(e.msg)}catch(e){}}));else if("edit"===e){let e=Object.assign({},t);k.value&&k.value.openDialog(e)}else"detail"===e&&v.value&&v.value.openDialog(t,j.detailConfig,"户配置详情")};return y((async()=>{(async()=>{try{const e=await n(j.dictKeys);j.dictData=e,e&&j.columns.map((t=>{switch(t.dataIndex){case"type":t.valueEnum=e.nature_account;break;case"organId":t.valueEnum=e.dept_config_type;break;case"delFlag":t.valueEnum=e.hu_config_type}return t}))}catch(e){}})()})),(o,n)=>(b(),f("div",x,[h(e,{ref_key:"proTableRef",ref:c,"row-key":"id",columns:_(I),request:C,btn:_(D),searchConfig:_(W)},{option:g((e=>[h(t,{array:_(w),model:e,onOnClick:P},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),h(i,{ref_key:"addHuconfigRef",ref:k,onOk:F},null,512),h(a,{ref_key:"tableDetailRef",ref:v,labelWidth:"130px",dictData:j.dictData},null,8,["dictData"])]))}}),[["__scopeId","data-v-1f363844"]]);export{v as default};