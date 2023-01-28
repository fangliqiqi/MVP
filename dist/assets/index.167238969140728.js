import e from"./InsureCompanySelect.1672389691407.js";import{i as a,a as t,g as n,b as r,c as i,d as o}from"./handle.1672389691407.js";import{_ as l,f as s,U as d,g as c,a as u,h as m}from"./index.1672389691407.js";import{P as p}from"./ProTable.1672389691407.js";import{P as h}from"./index.16723896914072.js";import{f,i as b,$ as g,j as S,a2 as y,c as _,W as E,P as I,aD as D,a3 as x,o as R,a as T,U as w,V as C,T as N,u as H,ay as v,az as k}from"./vue.1672389691407.js";import A from"./insureDetailDialog.1672389691407.js";import{B as j}from"./index.16723896914077.js";import{reduceHandleStatus as Y,buyType as M,settleType as z}from"./dict.1672389691407.js";import F from"./ProjectSelect.1672389691407.js";import B from"./downshiftDialog.16723896914072.js";import{$ as O,a0 as L,a1 as U,a2 as P,q as W,E as $,a3 as K,aJ as V,aK as q,aL as X,aM as J,D as G,aN as Q,aO as Z,aP as ee}from"./header.1672389691407.js";import{e as ae,a as te}from"./excel.1672389691407.js";import"./company.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./xlsx.1672389691407.js";import"./custserve.1672389691407.js";const ne={name:"退保办理",components:{ProTable:p,ProButtons:h,ArrowDown:s,insureDetailDialog:A,BatchImportDialog:j,ProjectSelect:F,CompanySelect:e,downShiftDialog:B},setup(){var e;const l=D(),s=f(null),p=null==(e=b())?void 0:e.appContext.config.globalProperties.$message,h=f(null),_=f(null),E=f(null),I=f(null),x=f(null),R=f(null),T=()=>{_.value&&_.value.refresh()},w=e=>{switch(k.downSizeState){case"1":return!!["downsize_export","downsize_back"].includes(e);case"2":return!!["downsize_sucess","downsize_back","downsize_mulity"].includes(e);case"4":return!!["downsize_refund"].includes(e)}},C=(e,a)=>e&&a?`${e}/${a}`:e?`${e}`:a?`${a}`:"",N=e=>{let a=null;if(k.selectionChangeList.length>0){a={idList:k.selectionChangeList.map((e=>e.id))}}else a=Object.assign(_.value.getParams(),k.params),delete a.size,delete a.current;return{...a,reduceHandleStatus:e}},v=(e,a)=>{const t=e.data&&e.data.map((e=>(e.insuranceAddress=C(e.insuranceProvinceName,e.insuranceCityName),e.insuranceHandleAddress=C(e.insuranceHandleProvinceName,e.insuranceHandleCityName),e.buyType="减员",e.settleType=z[e.settleType],e)));0!==t.length?te([ee],[t],["减员"],a||`商险减员导出办理人员名册${m().format("YYYYMMDDHHmmss")}`):p.error("减员办理数据为空！")},k=g({tabChangeing:!1,searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},columns:[{dataIndex:"reduceHandleStatus",title:"减员状态",minWidth:160,hideInSearch:!0,valueEnum:Y},{dataIndex:"projectName",title:"项目",hideInSearch:!0,minWidth:180,ellipsis:!0},{dataIndex:"projectName",title:"所在项目",hideInTable:!0,minWidth:140,valueType:"custom",scopedSlots:{customRender:"ProjectSelect"}},{dataIndex:"empName",title:"姓名",hideInSearch:!0,minWidth:200},{dataIndex:"empName",title:"员工姓名",hideInTable:!0},{dataIndex:"empIdcardNo",title:"身份证号",hideInSearch:!0,minWidth:180},{dataIndex:"empIdcardNo",title:"员工身份证号",hideInTable:!0},{dataIndex:"insuranceCompanyName",title:"保险公司",hideInSearch:!0,minWidth:120},{dataIndex:"insuranceCompanyName",title:"保险公司",hideInTable:!0,valueType:"custom",scopedSlots:{customRender:"CompanySelect"}},{dataIndex:"insuranceTypeName",title:"险种",minWidth:120},{dataIndex:"policyTime",title:"保单起止时间",hideInSearch:!0,minWidth:230,valueType:"custom",scopedSlots:{customRender:"BeginEndTime"}},{dataIndex:"buyStandard",title:"购买标准",hideInSearch:!0,minWidth:120},{dataIndex:"createName",title:"派单人",minWidth:120},{dataIndex:"createTime",title:"派单日期",width:100,hideInSearch:!0,dateFormat:"YYYY-MM-DD"},{dataIndex:"createTime",title:"派单日期",hideInTable:!0,searchIndex:"startEndTime",startTime:"startDate",endTime:"endDate",format:"YYYY-MM-DD",valueFormat:"YYYY-MM-DD",valueType:"dateTimeRange"},{dataIndex:"option",title:"操作",key:"option",width:140,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],columnsRefund:[{dataIndex:"buyType",title:"投保类型",minWidth:115,hideInSearch:!0,valueEnum:M},{dataIndex:"projectName",title:"项目",hideInSearch:!0,minWidth:180,ellipsis:!0},{dataIndex:"projectName",title:"所在项目",hideInTable:!0,valueType:"custom",scopedSlots:{customRender:"ProjectSelect"}},{dataIndex:"empName",title:"姓名",hideInSearch:!0,minWidth:100},{dataIndex:"empName",title:"员工姓名",hideInTable:!0},{dataIndex:"empIdcardNo",title:"身份证号",hideInSearch:!0,minWidth:170},{dataIndex:"empIdcardNo",title:"员工身份证号",hideInTable:!0},{dataIndex:"insuranceCompanyName",title:"保险公司",hideInSearch:!0,minWidth:130},{dataIndex:"insuranceCompanyName",title:"保险公司",hideInTable:!0,valueType:"custom",scopedSlots:{customRender:"CompanySelect"}},{dataIndex:"insuranceTypeName",title:"险种",minWidth:150},{dataIndex:"policyTime",title:"保单起止时间",hideInSearch:!0,minWidth:220,valueType:"custom",scopedSlots:{customRender:"BeginEndTime"}},{dataIndex:"buyStandard",title:"购买标准",hideInSearch:!0,minWidth:100},{dataIndex:"refundMoney",title:"退费金额（元）",minWidth:130,hideInSearch:!0},{dataIndex:"returnEmpName",title:"退至人姓名",minWidth:100,hideInSearch:!0},{dataIndex:"returnEmpIdcardNo",title:"退至人身份证号",minWidth:170,hideInSearch:!0},{dataIndex:"returnProjectName",title:"退至项目",minWidth:180,hideInSearch:!0,ellipsis:!0},{dataIndex:"createName",title:"派单人",minWidth:120,hideInTable:!0},{dataIndex:"createTime",title:"派单日期",hideInTable:!0,searchIndex:"startEndTime",startTime:"startDate",endTime:"endDate",format:"YYYY-MM-DD",valueFormat:"YYYY-MM-DD",valueType:"dateTimeRange"}],btn:[{label:"导出",type:"default",icon:"icon-ic_edit_upload",onClick:()=>{const e=Object.assign(_.value.getParams(),k.params);delete e.size,delete e.current,k.btn.find((e=>"导出"==e.label)).loading=!0,o(e).then((e=>{if(e&&200===e.code){const a=e.data&&e.data.map((e=>(e.buyType=M[e.buyType],e)));ae(Z,a,`商险减员退保登记记录${m().format("YYYYMMDDHHmmss")}`)}else p.error(e.msg||"操作失败")}))["finally"]((()=>{k.btn.find((e=>"导出"==e.label)).loading=!1}))},permission:["handle_down_export"],show:()=>-100===k.downSizeState},{label:"登记退保费用",type:"default",onClick:()=>{var e;null==(e=H(h))||e.openDialog()},permission:["insurance_custserve_reduction_money"],show:()=>-100===k.downSizeState},{label:"导出",type:"default",icon:"icon-ic_edit_upload",onClick:()=>{k.btn.find((e=>"导出"==e.label)).loading=!0,i(N(2)).then((e=>{e&&200===e.code?v(e,`商险减员导出减员中人员名册${m().format("YYYYMMDDHHmmss")}`):p.error(e.msg||"操作失败")}))["finally"]((()=>{k.btn.find((e=>"导出"==e.label)).loading=!1}))},permission:["handle_down_export"],show:()=>2==k.downSizeState},{label:"导出",type:"default",icon:"icon-ic_edit_upload",onClick:()=>{k.btn.find((e=>"导出"==e.label)).loading=!0,i(N(4)).then((e=>{e&&200===e.code?v(e,`商险减员导出减员成功人员名册${m().format("YYYYMMDDHHmmss")}`):p.error(e.msg||"操作失败")}))["finally"]((()=>{k.btn.find((e=>"导出"==e.label)).loading=!1}))},permission:["handle_down_export"],show:()=>4==k.downSizeState},{label:"批量办理",type:"default",icon:"icon-ic_edit_upload",onClick:()=>{R.value&&R.value.openDialog()},permission:["handle_down_batch"],show:()=>w("downsize_mulity")},{label:"导出办理",type:"default",icon:"icon-ic_edit_upload",onClick:()=>{u.confirm('<p style="font-size:16px;font-weight:600">办理成功<br/>\n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">确定这些记录导出办理吗？</span></p>',{type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const e=await i(N(1));e&&200===e.code?(v(e),T()):(p.error(e.msg||"操作失败"),T())}catch(e){p.error(e.msg||"操作失败")}}))["catch"]((()=>{}))},permission:["handle_down_export"],show:()=>w("downsize_export")},{label:"减员成功",type:"default",icon:"icon-ic_edit_refresh",onClick:()=>{k.selectionChangeList&&0!==k.selectionChangeList.length?x.value.openDialog(k.selectionChangeList):p.error("请勾选需要操作的记录")},permission:["handle_down_sucess"],show:()=>w("downsize_sucess"),disabled:()=>0===k.selectionChangeList.length},{label:"减员退回",type:"danger",icon:"icon-ic_edit_export",onClick:()=>{k.selectionChangeList&&0!==k.selectionChangeList.length?I.value.openDialog(k.selectionChangeList):p.error("请勾选需要操作的记录")},permission:["handle_down_back"],show:()=>w("downsize_back"),disabled:()=>0===k.selectionChangeList.length}],cellBtns:[{text:"查看",prop:"detail"}],DICTS:{},dictKeys:["insurance_buyHandleStatus","is_use","is_overdue"],params:{deptNo:"",insuranceCompanyName:""},areaProps:{label:"areaName",isLeaf:"isLeaf",children:"children"},selectionChangeList:[],downSizeState:"1"});return S((()=>{(async()=>{try{const e=await c(k.dictKeys);e&&(k.DICTS=e,k.columns=k.columns.map((a=>{const t={...a};switch(a.dataIndex){case"buyHandleStatus":t.valueEnum=e.insurance_buyHandleStatus;break;case"isUse":t.valueEnum=e.is_use;break;case"isOverdue":t.valueEnum=e.is_overdue}return t})))}catch(e){}})()})),{...y(k),request:async e=>{try{let a={};if(-100===k.downSizeState){const t=Object.assign({},e,k.params);a=await n(t)}else{const t=Object.assign({},e,k.params,{reduceHandleStatus:k.downSizeState});a=await r(t)}if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(a){}return{current:1,total:0,data:[]}},onCellClick:async(e,a)=>{if("detail"===e)s.value&&s.value.openDialog(a)},proTableRef:_,insureDetailRef:s,handleRefundRef:h,refreshList:T,STAFF_BATCH_UPDATE_HEADER:O,STAFF_IMPORT_HEADER:L,STAFF_EXPORT_HEADER:U,selectionChange:e=>{k.selectionChangeList=e},STAFF_DOWNSHIFT_HEADER:P,onReset:()=>{k.params={}},STAFF_IMPORT_ERROR_HEADER:W,ERROR_HEADER:$,STAFF_BATCH_DEL_ERROR_HEADER:K,INSURE_REFUND_BACK_HEADER:V,HANDLE_REFUND_INSURANCE_HEADER:q,INSURE_EXPORT_REFUND_BACK_HEADER:X,INSURE_REFUND_HEADER:J,toSubject:e=>{l.push({path:"/archives/subject",query:{projectIdCard:e.empIdcard}})},tabChange:()=>{T()},batchErrorData:(e,a)=>{let t=null;switch(e){case"staff-batch-delete":t=a.map((e=>(e.buyHandleStatus=Y[e.buyHandleStatus],e.policeStartEnd=`${e.policyStart}-${e.policyEnd}`,e)));break;case"staff-batch-refund-back":t=a.map((e=>(e.reduceHandleStatus=Y[e.reduceHandleStatus],e.policeStartEnd=`${e.policyStart}-${e.policyEnd}`,e)))}return t},formatRangeDateAndDiff:d,batchDeleteDialog:E,customErrorHeader:e=>{const a=[];return Object.keys(e).forEach((t=>{a.push({header:e[t],key:t,width:18})})),a.push({header:"错误原因",key:"errorMessage",width:30}),a},ProjectSelect:F,buttonDisableFlag:w,DATE_FORMAT_KEY:G,INSURE_MULITY_HEADER:Q,downShiftDialog:I,openBatchBack:()=>{batchBackDialog.value.openErrorDialog(res.data)},sucessBack:()=>{T()},openBatchInsureSucess:e=>{E.value.openErrorDialog(e)},sucessBackInsureSucess:()=>{T()},registeredPolicy:(e,t)=>a(t),insureSucessDialog:x,handleMulity:R,registeredSurrenderPolicy:(e,a)=>t(a)}}},re=e=>(v("data-v-74f8ee12"),e=e(),k(),e),ie={"class":"archives-online-container"},oe={"class":"el-dropdown-link"},le=w(" 模板下载 "),se=re((()=>T("a",{href:"/template/insurance/商险批量办理模板.xlsx",download:""},"商险批量办理模板",-1))),de=re((()=>T("a",{href:"/template/insurance/商险登记退保费用模板.xlsx",download:""},"商险登记退保费用模板",-1))),ce={key:0,style:{color:"red"}},ue=["onClick"],me=re((()=>T("div",null,[
T("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量办理失败！"),
T("span",null,[
w("存在不符合要求的数据，请修改后，重新导入！"),
T("br"),
w("已为您下载反馈结果！")])],-1))),pe=re((()=>T("div",null,[
T("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"减员成功失败！"),
T("span",null,"已为您下载反馈结果！")],-1))),he=re((()=>T("div",null,[
T("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"减员退回失败！"),
T("span",null,"已为您下载反馈结果！")],-1))),fe=re((()=>T("div",null,[
T("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量办理失败！"),
T("span",null,[
w("存在不符合要求的数据，请修改后，重新导入！"),
T("br"),
w("已为您下载反馈结果！")])],-1)));var be=l(ne,[["render",function(e,a,t,n,r,i){const o=x("el-tab-pane"),l=x("el-tabs"),s=x("arrow-down"),d=x("el-icon"),c=x("el-button"),u=x("el-dropdown-item"),m=x("el-dropdown-menu"),p=x("el-dropdown"),h=x("project-select"),f=x("company-select"),b=x("pro-buttons"),g=x("pro-table"),S=x("insure-detail-dialog"),y=x("batch-import-dialog"),D=x("down-shift-dialog");return R(),_("div",ie,[E(g,{ref:"proTableRef","row-key":"id",columns:-100===e.downSizeState?e.columnsRefund:e.columns,request:n.request,btn:e.btn,multi:-100!==e.downSizeState,searchConfig:e.searchConfig,onSelectionChange:n.selectionChange,onOnReset:n.onReset,onOnLoading:a[3]||(a[3]=a=>{e.tabChangeing=a})},{tabChange:I((()=>[E(l,{type:"card","class":"card",onTabChange:n.tabChange,modelValue:e.downSizeState,"onUpdate:modelValue":a[0]||(a[0]=a=>e.downSizeState=a)},{"default":I((()=>[E(o,{label:"待减员",name:"1",disabled:e.tabChangeing},null,8,["disabled"]),E(o,{label:"减员中",name:"2",disabled:e.tabChangeing},null,8,["disabled"]),E(o,{label:"减员成功",name:"4",disabled:e.tabChangeing},null,8,["disabled"]),E(o,{label:"退保登记",name:-100,disabled:e.tabChangeing},null,8,["disabled"])])),_:1},8,["onTabChange","modelValue"])])),extBtns:I((()=>[E(p,{"popper-class":"module-download",style:{"margin-left":"6px"}},{dropdown:I((()=>[E(m,null,{"default":I((()=>[E(u,null,{"default":I((()=>[se])),_:1}),E(u,null,{"default":I((()=>[de])),_:1})])),_:1})])),"default":I((()=>[T("span",oe,[E(c,{size:"default"},{"default":I((()=>[le,E(d,{"class":"el-icon--right"},{"default":I((()=>[E(s)])),_:1})])),_:1})])])),_:1})])),ProjectSelect:I((()=>[E(h,{modelValue:e.params.deptNo,"onUpdate:modelValue":a[1]||(a[1]=a=>e.params.deptNo=a),style:{width:"100%"}},null,8,["modelValue"])])),CompanySelect:I((()=>[E(f,{modelValue:e.params.insuranceCompanyName,"onUpdate:modelValue":a[2]||(a[2]=a=>e.params.insuranceCompanyName=a),style:{width:"100%"}},null,8,["modelValue"])])),BeginEndTime:I((e=>[w(C(n.formatRangeDateAndDiff(e.policyStart,e.policyEnd))+" ",1),e.buyMonth?(R(),_("span",ce,C(`${e.buyMonth}个月`),1)):N("",!0)])),projectNum:I((e=>[T("a",{href:"#",onClick:a=>n.toSubject(e)},C(e.projectNum),9,ue)])),option:I((a=>[E(b,{array:e.cellBtns,model:a,onOnClick:n.onCellClick},null,8,["array","model","onOnClick"])])),_:1},8,["columns","request","btn","multi","searchConfig","onSelectionChange","onOnReset"]),E(S,{ref:"insureDetailRef"},null,512),E(y,{title:"批量办理",ref:"handleMulity",header:n.INSURE_MULITY_HEADER,upload:n.registeredPolicy,onOk:n.refreshList,type:1,customError:"",errorHeader:n.customErrorHeader(n.INSURE_MULITY_HEADER),download:"",dateFormatKeys:n.DATE_FORMAT_KEY},{error:I((()=>[me])),_:1},8,["header","upload","onOk","errorHeader","dateFormatKeys"]),E(y,{title:"减员成功",ref:"batchDeleteDialog",type:1,onOk:n.refreshList,errName:"减员成功",batchName:"staff-batch-delete",errorHeader:n.HANDLE_REFUND_INSURANCE_HEADER,errorData:n.batchErrorData,customError:"",customErrorContent:"",download:""},{error:I((()=>[pe])),_:1},8,["onOk","errorHeader","errorData"]),E(y,{title:"减员退回",ref:"batchRefundBackDialog",type:1,onOk:n.refreshList,errName:"减员退回",batchName:"staff-batch-refund-back",errorHeader:n.HANDLE_REFUND_INSURANCE_HEADER,errorData:n.batchErrorData,customError:"",customErrorContent:"",download:""},{error:I((()=>[he])),_:1},8,["onOk","errorHeader","errorData"]),E(D,{ref:"downShiftDialog",title:"退回",type:3,required:!0,onErrorBack:n.openBatchBack,onSucess:n.sucessBack},null,8,["onErrorBack","onSucess"]),E(D,{ref:"insureSucessDialog",required:!1,title:"减员成功",type:4,onErrorBack:n.openBatchInsureSucess,onSucess:n.sucessBackInsureSucess},null,8,["onErrorBack","onSucess"]),E(y,{title:"登记退保费用",ref:"handleRefundRef",header:n.INSURE_REFUND_HEADER,upload:n.registeredSurrenderPolicy,onOk:n.refreshList,type:1,customError:"",errorHeader:n.customErrorHeader(n.INSURE_REFUND_HEADER),download:"",dateFormatKeys:n.DATE_FORMAT_KEY},{error:I((()=>[fe])),_:1},8,["header","upload","onOk","errorHeader","dateFormatKeys"])])}],["__scopeId","data-v-74f8ee12"]]);export{be as default};