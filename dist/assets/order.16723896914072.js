import{d as e,f as t,$ as a,E as i,j as d,c as n,W as s,P as r,u as o,aD as l,aA as c,o as m,i as u}from"./vue.1672389691407.js";import{P as p}from"./ProTable.1672389691407.js";import{P as h}from"./index.16723896914072.js";import{f as x,h as I}from"./order.1672389691407.js";import{g as y,a as f,E as T}from"./index.1672389691407.js";import{aD as g}from"./header.1672389691407.js";import{E as v}from"./index.16723896914076.js";import{o as S,a as W}from"./events.1672389691407.js";import{c as b}from"./socialHandlePermission.16723896914072.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./xlsx.1672389691407.js";import"./vuedraggable.umd.1672389691407.js";const j={"class":"cardinal-config-container"},Y=e({name:"派单查询"}),C=Object.assign(Y,{setup(e){const Y=t(null),C=t(null),D=l(),E=c(),{proxy:H}=u(),P=async(e,t)=>{if("detail"===e)D.push({name:"socialfund-order-detail",params:{id:t.id}})},_=async e=>{try{e=Object.assign({},{type:0},e);const t=await b(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records};T.error(t.msg)}catch(t){}return{current:1,total:0,data:[]}},k=a({searchConfig:{labelWidth:120},dictKeys:["emp_natrue","send_order_type","social-conduct-status","fund-conduct-status","dispatch-audit-status"],DICTS:{},columns:[{dataIndex:"type",title:"派单类型",minWidth:180,tag:{0:{type:"success"},1:{type:"danger"}},fixed:"left"},{dataIndex:"applyNo",title:"申请编码",minWidth:220,tooltip:!0,hideInSearch:!0},{dataIndex:"empNo",title:"员工编码",minWidth:180,hideInSearch:!0,ellipsis:!0},{dataIndex:"empName",title:"员工姓名",minWidth:180,ellipsis:!0},{dataIndex:"empIdcard",title:"身份证号",minWidth:220,tooltip:!0},{dataIndex:"empType",title:"员工类型",hideInSearch:!0,minWidth:180},{dataIndex:"belongUnitName",title:"客户名称",hideInSearch:!0,minWidth:180,tooltip:!0},{dataIndex:"settleDomainName",title:"项目名称",minWidth:180,tooltip:!0},{dataIndex:"settleDomainCode",title:"项目编码",minWidth:180},{dataIndex:"dispatchItem",title:"派单项",hideInSearch:!0,minWidth:180,tooltip:!0},{dataIndex:"status",title:"派单状态",hideInTable:!0},{dataIndex:"socialHouseholdName",title:"社保户",minWidth:200,valueType:"PageSelect",request:_,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:0}},tooltip:!0},{dataIndex:"socialAddress",title:"社保缴纳地",hideInTable:!0,valueType:"addRess",params:{pro:"socialProvince",city:"socialCity",town:"socialTown"}},{dataIndex:"socialHandleStatus",title:"社保办理状态",hideInTable:!0},{dataIndex:"providentHouseholdName",title:"公积金户",minWidth:200,valueType:"PageSelect",request:_,pageProps:{valueKey:"name",title:"name",search:"name",parmas:{type:1}},tooltip:!0},{dataIndex:"funAddress",title:"公积金缴纳地",hideInTable:!0,valueType:"addRess",params:{pro:"fundProvince",city:"fundCity",town:"fundTown"}},{dataIndex:"status",title:"审核状态",hideInSearch:!0,minWidth:180},{dataIndex:"socialHandleStatus",title:"社保办理状态",hideInSearch:!0,minWidth:180},{dataIndex:"fundHandleStatus",title:"公积金办理状态",minWidth:180},{dataIndex:"createName",title:"申请人",minWidth:180},{dataIndex:"organName",title:"申请人所在部门",minWidth:180,tooltip:!0,hideInSearch:!0},{dataIndex:"createTime",title:"申请时间",valueType:"dateTimeRange",searchIndex:"createTime",startTime:"createTimeStart",endTime:"createTimeEnd",minWidth:160,valueFormat:"YYYY-MM-DD HH:mm:ss",format:"YYYY-MM-DD",selectType:"daterange"},{dataIndex:"auditUserName",title:"审核人",minWidth:180},{dataIndex:"auditTime",title:"审核时间",valueType:"dateTimeRange",searchIndex:"startEndTime",startTime:"auditTimeStart",endTime:"auditTimeEnd",minWidth:160,valueFormat:"YYYY-MM-DD HH:mm:ss",format:"YYYY-MM-DD",selectType:"daterange"},{dataIndex:"option",title:"操作",key:"option",width:120,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],params:{},btn:[{label:"批量导出",onClick:()=>{let e=Object.assign({},Y.value.getParams(),k.params);delete e.size,delete e.current,delete e.startEndTime,C.value&&C.value.openDialog(((t,a)=>{const i={...e,exportFields:t.map((e=>e.dataIndex))},d=k.selectionChangeList.map((e=>e.id));d&&d.length&&(i.idList=d),delete i.createTime,I({},i).then((e=>{e.code&&200!==e.code&&f.error(e.msg),a(!0)}),(e=>{T.error(e&&e.msg||"导出失败"),a(!0)}))}))},permission:["tdispatchinfo-export"],icon:"icon-ic_edit_export"}],cellBtns:[{text:"详情",prop:"detail",permission:["mvp-order-search-detail"]}],selectionChangeList:[]}),w=e=>{k.selectionChangeList=e},N=()=>{W(H,E.path,(()=>{Y.value&&Y.value.onSearch()}))};i((()=>{S(H)})),d((()=>{N(),M()}));const M=async()=>{if(k.dictKeys&&k.dictKeys.length){const e=await y(k.dictKeys);e&&(k.DICTS=e,k.columns=k.columns.map((t=>{const a={...t};switch(t.dataIndex){case"empType":a.valueEnum=e.emp_natrue;break;case"type":a.valueEnum=e.send_order_type;break;case"socialHandleStatus":a.valueEnum=e["social-conduct-status"];break;case"fundHandleStatus":a.valueEnum=e["fund-conduct-status"];break;case"status":a.valueEnum=e["dispatch-audit-status"]}return a})))}},R=async e=>{try{e.createTime&&(e.createTime=null);const t=await x(e);if(t&&200==t.code&&t.data)return{current:t.data.current,total:t.data.total,data:t.data.records}}catch(t){}return{current:1,total:0,data:[]}};return(e,t)=>(m(),n("div",j,[s(p,{ref_key:"proTableRef",ref:Y,"row-key":"id",columns:k.columns,request:R,btn:k.btn,searchConfig:k.searchConfig,onSelectionChange:w,multi:""},{option:r((e=>[s(h,{array:k.cellBtns,model:e,onOnClick:P},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),s(v,{ref_key:"exportExcelRef",ref:C,heads:o(g),title:"派单查询导出"},null,8,["heads"])]))}});export{C as default};