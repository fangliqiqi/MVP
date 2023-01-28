import{d as e,f as t,$ as a,E as n,j as i,c as d,W as r,P as s,u as o,aD as l,aA as c,a3 as u,o as m,a as p,U as h,ay as f,az as x,i as y}from"./vue.1672389691407.js";import{P as I}from"./ProTable.1672389691407.js";import{P as b}from"./index.16723896914072.js";import{i as g,r as v}from"./order.1672389691407.js";import{_,g as T,f as w,a as S,E as W}from"./index.1672389691407.js";import{p as H,q as j,r as k}from"./header.1672389691407.js";import{o as N,a as D}from"./events.1672389691407.js";import{B as C}from"./index.16723896914077.js";import{c as E}from"./socialHandlePermission.16723896914072.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./xlsx.1672389691407.js";import"./excel.1672389691407.js";const P=e=>(f("data-v-ee4a9254"),e=e(),x(),e),R={"class":"cardinal-config-container"},B={"class":"el-dropdown-link"},Y=h(" 模板下载 "),z=P((()=>p("a",{href:"/template/socialfund/社保、公积金批量派增模板.xlsx",download:""}," 批量派增模板",-1))),K=P((()=>p("a",{href:"/template/socialfund/派单申请批量派减模板.xls",download:""}," 批量派减模板",-1))),A=P((()=>p("div",null,[
p("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
p("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
p("br"),
h("已为您下载反馈结果！")])],-1))),M=P((()=>p("div",null,[
p("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
p("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
p("br"),
h("已为您下载反馈结果！")])],-1))),O=e({name:"派单申请"});var q=_(Object.assign(O,{setup(e){const h=t(null),f=t(null),x=t(null),_=l(),P=c(),{proxy:O}=y(),q=()=>{h.value&&h.value.onSearch()},L=(e,t)=>{let a=null;return"socialfund-batch-dispath-add"!==e&&"socialfund-batch-dispath-reduce"!==e||(a=t.map((e=>{const t="red"===e.color?"是":"否";return{line:e.lineNum,isError:t,error:e.message}})).sort(((e,t)=>Number(e.line)-Number(t.line)))),a},U=async(e,t)=>{switch(e){case"detail":_.push({name:"socialfund-order-apply-detail",params:{id:t.id}});break;case"remove":F(t)}},F=e=>{S.confirm('<p style="font-size:16px;font-weight:600">是否确定删除?<br/>\n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">删除后，派单信息将从系统消失，请谨慎操作！</span></p>',{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const t=await v(e.id);t&&200===t.code?(W.success("派单信息删除成功"),q()):W.error(t.msg||"派单信息删除失败")}catch(t){W.error(t&&t.msg||"派单信息删除失败")}}))["catch"]((()=>{}))},G=async e=>{try{e=Object.assign({},{type:0},e);const t=await E(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records};W.error(t.msg)}catch(t){}return{current:1,total:0,data:[]}},$=a({searchConfig:{labelWidth:120,option:{extBtn:"extBtns"}},columns:[{dataIndex:"type",title:"派单类型",hideInSearch:!0,minWidth:180,tag:{0:{type:"success"},1:{type:"danger"}},fixed:"left"},{dataIndex:"applyNo",title:"申请编码",minWidth:220,tooltip:!0,hideInSearch:!0},{dataIndex:"empNo",title:"员工编码",minWidth:180,hideInSearch:!0,ellipsis:!0},{dataIndex:"empName",title:"员工姓名",minWidth:180,ellipsis:!0},{dataIndex:"empIdcard",title:"身份证号",minWidth:220,tooltip:!0},{dataIndex:"empType",title:"员工类型",hideInSearch:!0,minWidth:180},{dataIndex:"belongUnitName",title:"客户名称",hideInSearch:!0,minWidth:180,tooltip:!0},{dataIndex:"settleDomainName",title:"项目名称",minWidth:180,tooltip:!0},{dataIndex:"settleDomainCode",title:"项目编码",minWidth:180},{dataIndex:"dispatchItem",title:"派单项",hideInSearch:!0,minWidth:180,tooltip:!0},{dataIndex:"status",title:"派单状态",hideInTable:!0},{dataIndex:"socialHouseholdName",title:"社保户",minWidth:200,valueType:"PageSelect",request:G,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:0}},tooltip:!0},{dataIndex:"socialAddress",title:"社保缴纳地",hideInTable:!0,valueType:"addRess",params:{pro:"socialProvince",city:"socialCity",town:"socialTown"}},{dataIndex:"socialHandleStatus",title:"社保办理状态",hideInTable:!0},{dataIndex:"providentHouseholdName",title:"公积金户",minWidth:200,valueType:"PageSelect",request:G,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:1}},tooltip:!0},{dataIndex:"funAddress",title:"公积金缴纳地",hideInTable:!0,valueType:"addRess",params:{pro:"fundProvince",city:"fundCity",town:"fundTown"}},{dataIndex:"status",title:"派单状态",hideInSearch:!0,minWidth:180},{dataIndex:"socialHandleStatus",title:"社保办理状态",hideInSearch:!0,minWidth:180},{dataIndex:"fundHandleStatus",title:"公积金办理状态",minWidth:180},{dataIndex:"createName",title:"申请人",minWidth:180},{dataIndex:"organName",title:"申请人所在部门",minWidth:180,hideInSearch:!0,tooltip:!0},{dataIndex:"createTime",title:"申请时间",valueType:"dateTimeRange",searchIndex:"createTime",startTime:"createTimeStart",endTime:"createTimeEnd",minWidth:160,valueFormat:"YYYY-MM-DD HH:mm:ss",format:"YYYY-MM-DD",selectType:"daterange"},{dataIndex:"option",title:"操作",key:"option",width:120,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],params:{},btn:[{label:"批量派增",onClick:()=>{f.value&&f.value.openDialog()},permission:["demo_tdispatchinfo-batch-import"],icon:"icon-ic_edit_export"},{label:"批量派减",onClick:()=>{x.value&&x.value.openDialog()},type:"default",permission:["demo_tdispatchinfo-batch-reduce"],icon:"icon-ic_edit_export"}],cellBtns:[{text:"详情",prop:"detail",permission:["demo_tdispatchinfo_get"]},{text:"删除",prop:"remove",permission:["demo_tdispatchinfo_del"],isGray:e=>{if(3==e.status)return!1;if(4==e.status){let t=!0;return e.socialHouseholdName&&(t&=2==e.socialHandleStatus),e.providentHouseholdName&&(t&=2==e.fundHandleStatus),!t}return!0}}],dictKeys:["emp_natrue","send_order_type","social-conduct-status","fund-conduct-status","dispatch-audit-status"],DICTS:{}});n((()=>{N(O)})),i((()=>{D(O,P.path,(()=>{q()})),J()}));const J=async()=>{if($.dictKeys&&$.dictKeys.length){const e=await T($.dictKeys);e&&($.DICTS=e,$.columns=$.columns.map((t=>{const a={...t};switch(t.dataIndex){case"empType":a.valueEnum=e.emp_natrue;break;case"type":a.valueEnum=e.send_order_type;break;case"socialHandleStatus":a.valueEnum=e["social-conduct-status"];break;case"fundHandleStatus":a.valueEnum=e["fund-conduct-status"];break;case"status":a.valueEnum=e["dispatch-audit-status"]}return a})))}},Q=async e=>{try{e.createTime&&(e.createTime=null);const t=await g(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records}}catch(t){}return{current:1,total:0,data:[]}};return(e,t)=>{const a=u("el-icon"),n=u("el-button"),i=u("el-dropdown-item"),l=u("el-dropdown-menu"),c=u("el-dropdown");return m(),d("div",R,[r(I,{ref_key:"proTableRef",ref:h,"row-key":"id",columns:$.columns,request:Q,btn:$.btn,searchConfig:$.searchConfig},{extBtns:s((()=>[r(c,{"class":"arch-btn","popper-class":"module-download"},{dropdown:s((()=>[r(l,null,{"default":s((()=>[r(i,null,{"default":s((()=>[z])),_:1}),r(i,null,{"default":s((()=>[K])),_:1})])),_:1})])),"default":s((()=>[p("span",B,[r(n,{size:"default"},{"default":s((()=>[Y,r(a,{"class":"el-icon--right"},{"default":s((()=>[r(o(w))])),_:1})])),_:1})])])),_:1})])),option:s((e=>[r(b,{array:$.cellBtns,model:e,onOnClick:U},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),r(C,{title:"批量派增",ref_key:"batchDispatchAddRef",ref:f,type:1,header:o(H),url:"/yifu-social/method/tdispatchinfo/importListAdd",onOk:q,batchName:"socialfund-batch-dispath-add",errorHeader:o(j),errorData:L,customError:"",customErrorContent:"",download:""},{error:s((()=>[A])),_:1},8,["header","errorHeader"]),r(C,{title:"批量派减",ref_key:"batchDispatchReduceRef",ref:x,type:1,header:o(k),url:"/yifu-social/method/tdispatchinfo/importListReduce",onOk:q,batchName:"socialfund-batch-dispath-reduce",errorHeader:o(j),errorData:L,customError:"",customErrorContent:"",download:""},{error:s((()=>[M])),_:1},8,["header","errorHeader"])])}}}),[["__scopeId","data-v-ee4a9254"]]);export{q as default};