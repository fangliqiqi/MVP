import{P as e}from"./ProTable.1672389691407.js";import{P as t}from"./index.16723896914072.js";import{a,g as s,d as n,b as o}from"./allYearBonusReport.16723896914072.js";import{b as r}from"./batchDelete.1672389691407.js";import{E as i}from"./index.16723896914076.js";import{f as l,$ as c,j as d,E as p,a2 as m,c as u,W as h,P as f,aD as x,aA as b,a3 as y,o as _,i as g}from"./vue.1672389691407.js";import{o as I,a as j}from"./events.1672389691407.js";import{ae as v}from"./header.1672389691407.js";import{_ as R,f as C,a as E,E as T}from"./index.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./xlsx.1672389691407.js";import"./vuedraggable.umd.1672389691407.js";const Y={"class":"archives-online-container"};var B=R({name:"全年一次性奖金",components:{ProTable:e,ProButtons:t,ArrowDown:C,batchDelete:r,ExportExcelDialog:i,allYearBonusReport:a},setup(){const e=x(),t=b(),a=l(null),r=l(null),i=l(!1),{proxy:u}=g(),h=()=>{a.value&&a.value.refresh()},f=c({searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},fn:null,columns:[{dataIndex:"declareUnit",title:"申报单位",hideInSearch:!1,minWidth:160,fixed:"left",tooltip:!0},{dataIndex:"declareMonth",title:"申报月份",valueType:"date",minWidth:160,hideInSearch:!1,selectType:"month",format:"YYYYMM",valueFormat:"YYYYMM"},{dataIndex:"empName",title:"姓名",minWidth:140,tooltip:!0,hideInSearch:!0},{dataIndex:"empIdcard",title:"身份证号码",minWidth:200,hideInSearch:!0},{dataIndex:"annualBonus",title:"年终奖（元）",minWidth:160,hideInSearch:!0},{dataIndex:"bonusTax",title:"年终奖单独扣税",minWidth:160,hideInSearch:!0},{dataIndex:"option",title:"操作",key:"option",width:100,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"导出",onClick:()=>{f.params=a.value.getParams(),delete f.params.size,delete f.params.current,i.value=!0,o(f.params).then((e=>{T.success("导出成功")}))["catch"]()["finally"]((()=>{i.value=!1}))},type:"default",loading:i,permission:["salary_tstatisticsbonus-export"],icon:"icon-ic_edit_export"},{label:"批量删除",type:"default",onClick:()=>{r.value&&r.value.openDialog()},permission:["salary_tstatisticsbonus_del"]}],cellBtns:[{text:"删除",prop:"delete",permission:["salary_tstatisticsbonus_del"],tooltip:"当前状态不可删除"}],DICTS:{},dictKeys:["emp_natrue","emp_married","emp_national","emp_political","emp_registype","education","EMP_SOURCE","social_ecurity_state","commercial_satte","personnel_state","fund_status"],params:{},areaProps:{label:"areaName",isLeaf:"isLeaf",children:"children"}}),y=e=>{E.confirm('<p style="font-size:16px;font-weight:600">是否确定删除?<br/>\n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">删除后，该条信息将从系统消失，请谨慎操作！</span></p>',{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const t=await n(e.id);t&&200===t.code?(T.success("删除成功"),h()):T.error(t.msg||"删除失败")}catch(t){T.error(t&&t.msg||"删除失败")}}))["catch"]((()=>{}))};return d((()=>{j(u,t.path,(()=>{h()}))})),p((()=>{I(u)})),{...m(f),request:async e=>{try{const t=Object.assign({},e),a=await s(t);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(t){}return{current:1,total:0,data:[]}},onCellClick:async(t,a)=>{switch(t){case"detail":e.push({name:"decution-detail",params:{id:a.id}});break;case"delete":y(a)}},proTableRef:a,refreshList:h,allYearBonusReportRef:r,APPLY_DELETE_IMPORT_HEADER:v,onReset:()=>{f.params={}},isShowExportLoading:i}}},[["render",function(e,t,a,s,n,o){const r=y("pro-buttons"),i=y("pro-table"),l=y("all-year-bonus-report",!0);return _(),u("div",Y,[h(i,{ref:"proTableRef","row-key":"id",columns:e.columns,request:s.request,btn:e.btn,multi:!1,searchConfig:e.searchConfig,onOnReset:s.onReset},{option:f((t=>[h(r,{array:e.cellBtns,model:t,onOnClick:s.onCellClick},null,8,["array","model","onOnClick"])])),_:1},8,["columns","request","btn","searchConfig","onOnReset"]),h(l,{ref:"allYearBonusReportRef",onOk:s.refreshList},null,8,["onOk"])])}],["__scopeId","data-v-58c6d57f"]]);export{B as default};