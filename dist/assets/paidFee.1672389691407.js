import{d as e,f as t,$ as a,E as o,j as i,c as n,W as r,P as l,u as s,aD as d,aA as c,a3 as p,o as m,a as u,U as h,ay as f,az as y,i as x}from"./vue.1672389691407.js";import{B as g}from"./index.16723896914077.js";import v from"./batchDeletePaidFee.1672389691407.js";import _ from"./paidFeeDetail.1672389691407.js";import{P as I}from"./ProTable.1672389691407.js";import{P as b}from"./index.16723896914072.js";import{f as S,h as T,m as C,i as k,j as w,k as P,l as Y}from"./fee.1672389691407.js";import{_ as j,h as M,W,e as E,L as D,Z as z,g as H,E as L,a as N,d as B,f as F}from"./index.1672389691407.js";import{E as O}from"./index.16723896914076.js";import{aw as R,ax as K,ay as A,az as Z,aA as U,aB as q,aC as $}from"./header.1672389691407.js";import{o as G,a as J}from"./events.1672389691407.js";import{c as Q}from"./socialHandlePermission.16723896914072.js";import"./xlsx.1672389691407.js";import"./excel.1672389691407.js";import"./index.16723896914073.js";import"./socialfundSet.1672389691407.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./vuedraggable.umd.1672389691407.js";const V=e=>(f("data-v-33e8ec26"),e=e(),y(),e),X={"class":"cardinal-config-container"},ee={"class":"el-dropdown-link"},te=h(" 模板下载 "),ae=V((()=>u("a",{href:"/template/socialfund/社保模板-合并版.xls",download:""}," 社保模板-合并版",-1))),oe=V((()=>u("a",{href:"/template/socialfund/养老三险模板.xls",download:""}," 养老三险模板",-1))),ie=V((()=>u("a",{href:"/template/socialfund/医保模板.xls",download:""}," 医保模板",-1))),ne=V((()=>u("a",{href:"/template/socialfund/公积金模板.xls",download:""}," 公积金模板",-1))),re=V((()=>u("div",null,[
u("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
u("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
u("br"),
h("已为您下载反馈结果！")])],-1))),le=V((()=>u("div",null,[
u("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
u("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
u("br"),
h("已为您下载反馈结果！")])],-1))),se=V((()=>u("div",null,[
u("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
u("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
u("br"),
h("已为您下载反馈结果！")])],-1))),de=V((()=>u("div",null,[
u("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"批量导入失败！"),
u("span",null,[
h("存在不符合要求的数据，请修改后，重新导入！"),
u("br"),
h("已为您下载反馈结果！")])],-1))),ce=e({name:"实缴费用"});var pe=j(Object.assign(ce,{setup(e){d();const h=c(),f=t(null),y=t(null),j=t(null),V=t(null),ce=t(null),pe=t(null),me=t(null),ue=t(null),he=t(null),{proxy:fe}=x(),ye=t(!1),xe=e=>{ue.value&&ue.value.refresh()},ge=(e,t)=>t.map((e=>({line:e.lineNum,isError:"0"==e.result?"是":"否",empName:e.empName,empIdCard:e.empIdCard,socialHousehold:e.socialHousehold,providentHousehold:e.providentHousehold,error:e.message}))).sort(((e,t)=>Number(e.line)-Number(t.line))),ve=async(e,t)=>{switch(e){case"detail":me.value&&me.value.openDialog(t);break;case"remove":ke(t)}},_e=()=>{P().then((e=>{e||e<100?(Ye.p=e,Ie()):Ye.p=0}))},Ie=()=>{setTimeout((()=>{Ye.process&&_e()}),3e3)},be=e=>{"uploading"===e.state?(Ye.process=!0,_e()):(Ye.process=!1,Ye.p=0)};let Se=null;const Te=t(!1),Ce=()=>{let e=Object.assign({},ue.value.getParams(),Ye.params);delete e.size,delete e.current,delete e.socialCreateMonth;const t={...e},a=Ye.selectionChangeList.map((e=>e.id));a&&a.length&&(t.idList=a),delete t.createTime,k(t).then((e=>{if(e.code&&200!==e.code)return L.error(e.msg||"操作失败");xe(),L.success("操作成功"),Te.value=!1}))["catch"]((e=>{L.error("操作失败")}))["finally"]((()=>{Te.value=!1}))},ke=e=>{N.confirm('<p style="font-size:16px;font-weight:600">是否确定删除?<br/>\n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">删除后，该记录将从系统消失，请谨慎操作！</span></p>',{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const t=await Y(e.id);t&&200===t.code?(L.success("删除成功"),xe()):L.error(t.msg||"删除失败")}catch(t){L.error(t&&t.msg||"删除失败")}}))["catch"]((()=>{}))},we=e=>{Ye.selectionChangeList=e},Pe=async e=>{try{e=Object.assign({},{type:0},e);const t=await Q(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records};L.error(t.msg)}catch(t){}return{current:1,total:0,data:[]}},Ye=a({selectionChangeList:[],uploadExt:{random:null,type:0},searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},process:!1,p:0,initParams:{socialCreateMonth:M().format("YYYYMM")},columns:[{dataIndex:"empNo",title:"员工编码",minWidth:220,tooltip:!0,hideInSearch:!0,fixed:"left"},{dataIndex:"empName",title:"员工姓名",minWidth:180},{dataIndex:"empIdcard",title:"身份证号",minWidth:200},{dataIndex:"socialSecurityNo",title:"社保编号",minWidth:200},{dataIndex:"unitName",title:"客户名称",minWidth:180,tooltip:!0},{dataIndex:"settleDomainName",title:"项目名称",minWidth:180,tooltip:!0},{dataIndex:"socialCreateMonth",title:"生成月份",minWidth:160,valueType:"date",selectType:"month",valueFormat:"YYYYMM",format:"YYYY年MM月",hideInTable:!0,clearable:!1},{dataIndex:"socialPayMonth",title:"缴纳月份",valueType:"date",selectType:"month",valueFormat:"YYYYMM",format:"YYYY年MM月",hideInTable:!0},{dataIndex:"socialHousehold",title:"社保户",minWidth:200,valueType:"PageSelect",request:Pe,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:0}},tooltip:!0},{dataIndex:"socialPayAddr",title:"社保缴纳地",minWidth:200,tooltip:!0,hideInSearch:!0},{dataIndex:"socialPayMonth",title:"社保缴纳月份",minWidth:160,hideInSearch:!0},{dataIndex:"socialCreateMonth",title:"社保生成月份",minWidth:160,hideInSearch:!0},{dataIndex:"socialSum",title:"社保合计",minWidth:200,hideInSearch:!0,formatter:e=>e.socialSum?W(e.socialSum)+"元":E},{dataIndex:"providentHousehold",title:"公积金户",minWidth:200,valueType:"PageSelect",request:Pe,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:1}},tooltip:!0},{dataIndex:"providentPayAddr",title:"公积金缴纳地",minWidth:200,tooltip:!0,hideInSearch:!0},{dataIndex:"providentPayMonth",title:"公积金缴纳月份",hideInSearch:!0,valueType:"date",selectType:"month",valueFormat:"YYYYMM",format:"YYYY年MM月",minWidth:160},{dataIndex:"providentCreateMonth",title:"公积金生成月份",hideInSearch:!0,minWidth:160},{dataIndex:"providentSum",title:"公积金合计",hideInSearch:!0,minWidth:160,formatter:e=>e.providentSum?W(e.providentSum)+"元":E},{dataIndex:"sumAll",title:"总合计",hideInSearch:!0,minWidth:180,formatter:e=>e.sumAll?W(e.sumAll)+"元":E},{dataIndex:"socialAddress",title:"缴纳地",minWidth:200,valueType:"addRess",tooltip:!0,hideInTable:!0,params:{pro:"socialProvince",city:"socialCity",town:"socialTown"}},{dataIndex:"createName",title:"导入人",hideInSearch:!1,minWidth:180},{dataIndex:"createTime",title:"导入时间",minWidth:180,valueType:"dateTimeRange",searchIndex:"createTime",startTime:"createTimeStart",endTime:"createTimeEnd"},{dataIndex:"lockStatus",title:"打标状态",minWidth:160,hideInSearch:!1,valueEnum:{0:"未打标",1:"已打标"}},{dataIndex:"pushStatus",title:"推送状态",hideInSearch:!0,minWidth:180,valueEnum:{0:"已推送",1:"未推送"}},{dataIndex:"option",title:"操作",key:"option",width:200,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"社保导入-合并版",onClick:()=>{const e=D.get("user_info").id+z();Ye.uploadExt={random:e},f.value&&(Ye.process=!1,Ye.p=0,f.value.openDialog())},permission:["social_tpaymentinfo_batchImport"],icon:"icon-ic_edit_upload"},{label:"养老三险导入",onClick:()=>{const e=D.get("user_info").id+z();Ye.uploadExt={random:e,type:0},y.value&&(Ye.process=!1,Ye.p=0,y.value.openDialog())},type:"default",permission:["social_tpaymentinfo_three_batchImport"],icon:"icon-ic_edit_upload"},{label:"医保导入",type:"default",permission:["social_tpaymentinfo_medical_batchImport"],onClick:()=>{const e=D.get("user_info").id+z();Ye.uploadExt={random:e,type:1},V.value&&(Ye.process=!1,Ye.p=0,V.value.openDialog())},icon:"icon-ic_edit_upload"},{label:"公积金导入",type:"default",permission:["social_tpaymentinfo_batchImport"],onClick:()=>{j.value&&j.value.openDialog()},icon:"icon-ic_edit_upload"},{label:"批量导出",type:"default",icon:"icon-ic_edit_upload",permission:["social_tpaymentinfo_export"],onClick:()=>{let e=Object.assign({},ue.value.getParams(),Ye.params);delete e.size,delete e.current,delete e.createTime,ce.value&&ce.value.openDialog(((t,a)=>{const o={...e,exportFields:t.map((e=>e.dataIndex))},i=Ye.selectionChangeList.map((e=>e.id));i&&i.length&&(o.idList=i),S({},o).then((e=>{e.code&&200!==e.code&&L.error(e.msg),a(!0)}))}))}},{label:"合并导出",type:"default",icon:"icon-ic_edit_upload",permission:["social_tpaymentinfo_export"],onClick:()=>{let e=Object.assign({},ue.value.getParams(),Ye.params);delete e.size,delete e.current,delete e.createTime,pe.value&&pe.value.openDialog(((t,a)=>{const o={...e,exportFields:t.map((e=>e.dataIndex))},i=Ye.selectionChangeList.map((e=>e.id));i&&i.length&&(o.idList=i),T({},o).then((e=>{e.code&&200!==e.code&&L.error(e.msg),a(!0)}))}))}},{label:"批量删除",type:"default",icon:"icon-ic_edit_delete",permission:["social_tpaymentinfo_batchDelete"],onClick:()=>{he.value&&he.value.openDialog()}},{label:"确认无误",type:"default",icon:"icon-ic_edit_refresh",permission:[],loading:Te,key:"push",onClick:()=>{N.confirm('<p style="font-size:16px;font-weight:600">是否已确认无误?<br/>\n\t\t\t\t<span style="display: inline-block;line-height: 18px;margin-top:4px;color:red;font-size:14px;font-weight:400">确认无误后，数据会定时推送至EKP，推送后将禁止修改，请谨慎操作！！！</span></p>',"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((()=>{Te.value=!0,Ce()}))["catch"]((()=>{Te.value=!1}))}},{label:"推送至EKP",type:"default",icon:"icon-ic_edit_refresh",permission:[],loading:ye,key:"push",onClick:()=>{ye.value=!0;N.confirm('<p style="font-size:16px;font-weight:600">是否立即推送至EKP系统？<br/>\n\t\t\t\t<span style="display: inline-block;line-height: 18px;margin-top:4px;color:red;font-size:14px;font-weight:400">推送后，数据将禁止修改，请谨慎操作！！！</span></p>',"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((()=>{Se=B.service({lock:!0,text:"正在推送中...",background:"rgba(0, 0, 0, 0.7)"});const e=Object.assign({},ue.value.getParams());delete e.socialCreateMonth,delete e.createTime,C(e).then((e=>{e&&200==e.code?(xe(),L.success({message:"已将选择范围内“本账号”导入且“已打标”的数据，成功推送至EKP",duration:5e3})):L.error(e.msg||"推送处理失败")}),(()=>{L.error("推送处理失败")}))["finally"]((()=>{ye.value=!1,Se&&Se.close()}))}))["catch"]((()=>{ye.value=!1}))}}],cellBtns:[{text:"详情",prop:"detail",permission:["social_tpaymentinfo_detail"]},{text:"删除",permission:["social_tpaymentinfo_del"],prop:"remove"}],dictKeys:[],DICTS:{}});o((()=>{G(fe)})),i((()=>{J(fe,h.path,(()=>{xe()})),je()}));const je=async()=>{if(Ye.dictKeys&&Ye.dictKeys.length){const e=await H(Ye.dictKeys);e&&(Ye.DICTS=e)}},Me=async e=>{try{e.createTime&&(e.createTime=null);const t=await w(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records}}catch(t){}return{current:1,total:0,data:[]}};return(e,t)=>{const a=p("el-icon"),o=p("el-button"),i=p("el-dropdown-item"),d=p("el-dropdown-menu"),c=p("el-dropdown"),h=p("el-progress");return m(),n("div",X,[r(I,{ref_key:"proTableRef",ref:ue,"row-key":"id",searchConfig:Ye.searchConfig,columns:Ye.columns,request:Me,btn:Ye.btn,onSelectionChange:we,multi:"",initParams:Ye.initParams},{extBtns:l((()=>[r(c,{"class":"arch-btn","popper-class":"module-download"},{dropdown:l((()=>[r(d,null,{"default":l((()=>[r(i,null,{"default":l((()=>[ae])),_:1}),r(i,null,{"default":l((()=>[oe])),_:1}),r(i,null,{"default":l((()=>[ie])),_:1}),r(i,null,{"default":l((()=>[ne])),_:1})])),_:1})])),"default":l((()=>[u("span",ee,[r(o,{size:"default"},{"default":l((()=>[te,r(a,{"class":"el-icon--right"},{"default":l((()=>[r(s(F))])),_:1})])),_:1})])])),_:1})])),option:l((e=>[r(b,{array:Ye.cellBtns,model:e,onOnClick:ve},null,8,["array","model"])])),_:1},8,["searchConfig","columns","btn","initParams"]),r(g,{title:"社保导入-合并版",ref_key:"socialImportRef",ref:f,type:1,header:s(R),url:"/yifu-social/method/tpaymentinfo/importListAdd",ext:Ye.uploadExt,onOk:xe,batchName:"social-all-import",errorHeader:s(K),errorData:ge,customError:"",onChangeStatus:be,customProcess:"",download:"",limitZipSize:50},{error:l((()=>[re])),loading:l((()=>[r(h,{type:"circle",percentage:Ye.p,color:"var(--el-color-primary)"},null,8,["percentage"])])),_:1},8,["header","ext","errorHeader"]),r(g,{title:"养老三险导入",ref_key:"otherImportRef",ref:y,type:1,header:s(A),url:"/yifu-social/method/tpaymentinfo/importListSocialHeFei",ext:Ye.uploadExt,onOk:xe,batchName:"social-three-import",errorHeader:s(K),errorData:ge,onChangeStatus:be,customProcess:"",customError:"",download:"",limitZipSize:50},{error:l((()=>[le])),loading:l((()=>[r(h,{type:"circle",percentage:Ye.p,color:"var(--el-color-primary)"},null,8,["percentage"])])),_:1},8,["header","ext","errorHeader"]),r(g,{title:"医保导入",ref_key:"medialImportRef",ref:V,type:1,header:s(Z),url:"/yifu-social/method/tpaymentinfo/importListSocialHeFei",ext:Ye.uploadExt,onOk:xe,batchName:"social-medical-import",errorHeader:s(K),errorData:ge,customError:"",onChangeStatus:be,customProcess:"",download:"",limitZipSize:50},{error:l((()=>[se])),loading:l((()=>[r(h,{type:"circle",percentage:Ye.p,color:"var(--el-color-primary)"},null,8,["percentage"])])),_:1},8,["header","ext","errorHeader"]),r(g,{title:"公积金导入",ref_key:"fundImportRef",ref:j,type:1,header:s(U),url:"/yifu-social/method/tpaymentinfo/batchImportPaymentFundInfo",onOk:xe,batchName:"fund-batch-import",errorHeader:s(K),errorData:ge,customError:"",customErrorContent:"",download:"",limitZipSize:50},{error:l((()=>[de])),_:1},8,["header","errorHeader"]),r(_,{ref_key:"paidFeeDetailRef",ref:me},null,512),r(O,{ref_key:"exportExcelRef",ref:ce,heads:s(q),title:"批量导出",useCode:"social_tpaymentinfo_export"},null,8,["heads"]),r(O,{ref_key:"exportMergeExcelRef",ref:pe,heads:s($),title:"合并导出",useCode:"social_tpaymentinfo_merge_export"},null,8,["heads"]),r(v,{ref_key:"batchDeletePaidFeeRef",ref:he,onOk:xe},null,512)])}}}),[["__scopeId","data-v-33e8ec26"]]);export{pe as default};