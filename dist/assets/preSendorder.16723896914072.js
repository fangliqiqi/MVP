import{d as e,f as a,$ as t,a2 as r,E as s,j as i,c as d,W as n,P as o,u as c,ax as l,aD as p,aA as u,a3 as m,o as h,a as f,U as g,ay as _,az as y,i as x}from"./vue.1672389691407.js";import{P as b}from"./ProTable.1672389691407.js";import{P as w}from"./index.16723896914072.js";import{E as v}from"./index.16723896914076.js";import{B as k}from"./index.16723896914077.js";import I from"./editIspresend.1672389691407.js";import{_ as j,a as S,E,g as C,f as D}from"./index.1672389691407.js";import{r as W}from"./xlsx.1672389691407.js";import{aE as T,E as N,aF as P,aG as H,aH as O}from"./header.1672389691407.js";import{o as R,a as Y}from"./events.1672389691407.js";import{b as A,c as F,d as L,p as B,f as M,h as q,i as V,j as z,k as K,l as G,g as U,m as $,n as J}from"./presendorder.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./vuedraggable.umd.1672389691407.js";import"./excel.1672389691407.js";const Q=e=>(_("data-v-27ad5f8a"),e=e(),y(),e),X={"class":"system-dict-container"},Z={"class":"el-dropdown-link"},ee=g(" 模板下载 "),ae=Q((()=>f("a",{href:"/template/socialfund/易服批量派增预派单模板.xls",download:""}," 批量派增模板",-1))),te=Q((()=>f("a",{href:"/template/socialfund/易服批量派减预派单模板.xls",download:""}," 批量派减模板",-1))),re=Q((()=>f("a",{href:"/template/socialfund/易服批量更新预派单模板.xls",download:""}," 批量更新模板",-1))),se=Q((()=>f("div",null,[
f("span",null,[
g("存在不符合要求的数据，请修改后，重新导入！"),
f("br"),
g("已为您下载反馈结果！")])],-1))),ie=Q((()=>f("div",null,[
f("span",null,[
g("存在不符合要求的数据，请修改后，重新导入！"),
f("br"),
g("已为您下载反馈结果！")])],-1))),de=Q((()=>f("div",null,[
f("span",null,[
g("存在不符合要求的数据，请修改后，重新导入！"),
f("br"),
g("已为您下载反馈结果！")])],-1))),ne=e({name:"预派单"});var oe=j(Object.assign(ne,{setup(e){const g=l(),_=a(null),y=p(),j=u(),{proxy:Q}=x(),ne=a(null),oe=a(null),ce=a(null),le=a(null),pe=a(null),ue=a(!1),me=e=>{switch(e){case"add":oe.value&&oe.value.openDialog();break;case"reduce":ce.value&&ce.value.openDialog();break;case"update":le.value&&le.value.openDialog()}},he=(e,a)=>a.map((e=>{const a=e.message;return{line:e.lineNum,isError:a?"是":"否",error:a}})),fe=async(e,a)=>{const{file:t}=e;if("add"==a){const a={departId:e.departId,socialHouse:e.socialHouse,fundHouse:e.fundHouse?e.fundHouse:null};return await ge(t,e,B,a)}return"minus"==a?await ge(t,e,M):"update"==a?await ge(t,e,q):void 0},ge=async(e,a,t,r)=>{try{const a=[...(await W(e.raw))[0].data].map((e=>{const a=Object.keys(e),t={};return a.forEach((a=>{a.startsWith("__EMPTY")||(t[a]=e[a])})),t}));return new Promise((async(e,s)=>{try{const s=await t(JSON.stringify(a),r),i=s.message||s.msg||"导入失败";s&&s.data&&Array.isArray(s.data)&&s.data.length?e({code:1,msg:i,data:s.data}):s&&200===s.code?e({code:200,msg:"导入成功",data:null}):e({code:1,msg:i,data:null})}catch(i){s({code:1,msg:"导入失败"})}}))}catch(s){return{code:1,msg:"导入失败"}}},_e=t({batchExtParams:[{dataIndex:"departId",title:"项目名称",position:"header",type:"page-select",config:{request:e=>(async(e,a)=>{try{switch(a){case"getProjectName":const a=await U(e);if(200==a.code)return{current:a.data.current,total:a.data.total,data:a.data.records};E.error(a.msg);break;case"getSocialAccount":const t=await G(e);if(200==t.code)return{current:t.data.current,total:t.data.total,data:t.data.records};E.error(t.msg);break;case"getFundAccount":const r=await K(e);if(200==r.code)return{current:r.data.current,total:r.data.total,data:r.data.records};E.error(r.msg)}}catch(t){}return{current:1,total:0,data:[]}})(e,"getProjectName"),valueKey:"departNo",title:"departName",search:"departName",placeholder:"请选择项目名称",onChange:e=>{}}}],batchRules:{departId:[{required:!0,message:"请选择项目名称",trigger:"change"}],socialHouse:[{required:!0,message:"请选择社保户名",trigger:"change"}]},searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},columns:[{dataIndex:"id",title:"ID",minWidth:180,hideInSearch:!0},{dataIndex:"empName",title:"员工姓名",minWidth:120,tooltip:!0},{dataIndex:"empIdcard",title:"身份证号",minWidth:200},{dataIndex:"customerName",title:"客户名称",minWidth:220,tooltip:!0},{dataIndex:"payAddress",title:"缴费地",minWidth:200,hideInSearch:!0,tooltip:!0},{dataIndex:"type",title:"增减类型",minWidth:140,tag:{0:{type:"success"},1:{type:"danger"}}},{dataIndex:"preStatus",title:"单据状态",minWidth:140},{dataIndex:"dispatchFlag",title:"是否派单",minWidth:140,hideInSearch:!0,align:"center","switch":{activeValue:"0",inactiveValue:"1"}},{dataIndex:"dataSubStatus",title:"资料是否提交",minWidth:140,align:"center","switch":{activeValue:"0",inactiveValue:"1"}},{dataIndex:"remark",title:"备注",minWidth:200,tooltip:!0,hideInSearch:!0},{dataIndex:"createTime",title:"导入日期",minWidth:180,searchIndex:"startEndTime",startTime:"createTimeStart",endTime:"createTimeEnd",valueType:"dateTimeRange",valueFormat:"YYYY-MM-DD HH:mm:ss",format:"YYYY-MM-DD",selectType:"daterange"},{dataIndex:"option",title:"操作",key:"option",minWidth:240,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"批量派增",onClick:()=>me("add"),permission:["social_tpredispatchinfo_importAddList"],icon:"icon-ic_edit_add"},{label:"批量派减",onClick:()=>me("reduce"),permission:["social_tpredispatchinfo_importAddList"],icon:"icon-ic_edit_add",type:"normal"},{label:"批量更新",onClick:()=>me("update"),permission:["social:tpredispatchinfo_updateList"],type:"normal",icon:"icon-ic_edit_add"},{label:"导出",onClick:async()=>{let e=Object.assign({},_.value.getParams());delete e.size,delete e.current,delete e.startEndTime,ne.value&&ne.value.openDialog(((a,t)=>{const r={...e,exportFields:a.map((e=>e.dataIndex))},s=_e.selectionChangeList.map((e=>e.id));s&&s.length&&(r.idList=s);const i=g.state.userInfos.userInfos.id,d=Object.assign({},r,{createBy:i});V(d).then((e=>{e.code&&200!==e.code&&E.error(e.msg),t(!0)}))}))},permission:["social:tpredispatchinfo_doexportPreDispatch"],type:"normal",icon:"icon-ic_edit_export"},{label:"一键派单",onClick:()=>{ue.value=!0;const e=[];_e.selectionChangeList.map((a=>{e.push(a.id)})),S.confirm("是否确定一键派单？","提示",{type:"warning"}).then((()=>{z(e).then((e=>{200==e.code?(E.success(e.msg||"一键派单成功"),Ie()):E.error(e.msg||"一键派单失败")}))["finally"]((()=>{ue.value=!1}))}))["catch"]((()=>{ue.value=!1}))},permission:["social_tpredispatchinfo_dispatch"],loading:ue,type:"normal",icon:"icon-ic_edit_export"}],cellBtns:[{text:"详情",prop:"detail",permission:["social_tpredispatchinfo_get"]},{text:"修改",prop:"edit",permission:["social_tpredispatchinfo_get","social_tpredispatchinfo_edit"]},{text:"删除",prop:"delete",permission:["social_tpredispatchinfo_del"],isGray:e=>"2"==e.preStatus},{text:"派单",prop:"send",permission:["social_tpredispatchinfo_dispatch"]}],dictKeys:["send_order_type","pre_send_status","data_submit_status","is_send_order"],selectionChangeList:[],dictData:{}}),{columns:ye,cellBtns:xe,btn:be,searchConfig:we}=r(_e),ve=e=>{_e.selectionChangeList=e},ke=async e=>{try{const a=await A(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(a){}return{current:1,total:0,data:[]}},Ie=()=>{_.value.refresh()},je=(e,a,t)=>{switch(t){case"dispatchFlag":Se(e,a);break;case"dataSubStatus":Ee(e,a)}},Se=(e,a)=>{0==e?S.confirm("是否确定派单？","提示",{type:"warning"}).then((async()=>{try{const e=await F({id:a.id,dispatchFlag:0});e&&200===e.code?(E.success("派单成功"),Ie()):E.error(e.msg||"派单失败")}catch(e){E.error(e.sag||"派单失败")}}))["catch"]((()=>{})):pe.value&&pe.value.openDialog(a)},Ee=(e,a)=>{S.confirm(`是否确定${"0"==e?"提交":"取消提交"}资料？`,"提示",{type:"warning"}).then((async()=>{try{const t=await L({ids:a.id,status:e});t&&200===t.code?(E.success("0"==e?"提交成功":"取消成功"),Ie()):E.error(t.msg||"0"==e?"提交失败":"取消失败")}catch(t){E.error(t.sag||"0"==e?"提交失败":"取消失败")}}))["catch"]((()=>{}))},Ce=async(e,a)=>{switch(e){case"detail":y.push({name:"pre-order-detail",params:{id:a.id}});break;case"edit":y.push({name:"pre-order-edit",params:{id:a.id}});break;case"delete":S.confirm("是否确定删除？","提示",{type:"warning"}).then((async()=>{try{const e=await J(a.id);e&&200===e.code?(E.success("删除成功"),Ie()):E.error(e.msg||"删除失败")}catch(e){E.error(e.sag||"删除失败")}}))["catch"]((()=>{}));break;case"send":S.confirm("是否确定派单？","提示",{type:"warning"}).then((async()=>{try{const e=await $({id:a.id});e&&200===e.code?E.success("派单成功"):E.error(e.msg||"派单失败")}catch(e){E.error(e.sag||"派单失败")}}))["catch"]((()=>{}))["finally"]((()=>{Ie()}))}};return s((()=>{R(Q)})),i((()=>{(async()=>{try{const e=await C(_e.dictKeys);e&&_e.columns.map((a=>{switch(a.dataIndex){case"type":a.valueEnum=e.send_order_type;break;case"preStatus":a.valueEnum=e.pre_send_status;break;case"dispatchFlag":a.valueEnum=e.is_send_order;break;case"dataSubStatus":a.valueEnum=e.data_submit_status}return a}))}catch(e){}})(),Y(Q,j.path,(()=>{Ie()}))})),(e,a)=>{const t=m("el-icon"),r=m("el-button"),s=m("el-dropdown-item"),i=m("el-dropdown-menu"),l=m("el-dropdown");return h(),d("div",X,[n(b,{ref_key:"proTableRef",ref:_,"row-key":"id",columns:c(ye),request:ke,btn:c(be),multi:!0,searchConfig:c(we),onSelectionChange:ve,onSwitchChange:je},{extBtns:o((()=>[n(l,{"class":"arch-btn","popper-class":"module-download"},{dropdown:o((()=>[n(i,null,{"default":o((()=>[n(s,null,{"default":o((()=>[ae])),_:1}),n(s,null,{"default":o((()=>[te])),_:1}),n(s,null,{"default":o((()=>[re])),_:1})])),_:1})])),"default":o((()=>[f("span",Z,[n(r,{size:"default"},{"default":o((()=>[ee,n(t,{"class":"el-icon--right"},{"default":o((()=>[n(c(D))])),_:1})])),_:1})])])),_:1})])),option:o((e=>[n(w,{array:c(xe),model:e,onOnClick:Ce},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),n(k,{ref_key:"batchImportDialogRef",ref:oe,header:c(T),batchName:"pre-order-batch-import",errorHeader:c(N),errorData:he,upload:e=>fe(e,"add"),"ext-params":_e.batchExtParams,rules:_e.batchRules,customError:"",download:"",onOk:Ie},{error:o((()=>[se])),_:1},8,["header","errorHeader","upload","ext-params","rules"]),n(k,{ref_key:"batchReduceDialogRef",ref:ce,header:c(P),upload:e=>fe(e,"minus"),errName:"批量派减",title:"批量派减",download:!0,onOk:Ie},{error:o((()=>[ie])),_:1},8,["header","upload"]),n(k,{ref_key:"batchUpdateDialogRef",ref:le,header:c(H),upload:e=>fe(e,"update"),errName:"批量更新",title:"批量更新",download:!0,onOk:Ie},{error:o((()=>[de])),_:1},8,["header","upload"]),n(v,{ref_key:"exportExcelRef",ref:ne,heads:c(O),title:"预派单导出"},null,8,["heads"]),n(I,{ref_key:"ispresend",ref:pe,onOk:Ie},null,512)])}}}),[["__scopeId","data-v-27ad5f8a"]]);export{oe as default};