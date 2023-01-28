import{P as e}from"./ProTable.1672389691407.js";import{P as a}from"./index.16723896914072.js";import{g as t,h as l,E as o}from"./index.1672389691407.js";import{P as i}from"./header.1672389691407.js";import{e as r}from"./excel.1672389691407.js";import{t as n}from"./index.16723896914075.js";import{g as d,e as p,a as s}from"./prove.1672389691407.js";import{d as m,f as c,$ as y,a2 as b,j as k,c as Y,W as f,P as u,u as h,o as x}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./file.1672389691407.js";const D={"class":"system-dict-container"},M=m({name:"证明开具记录"}),j=Object.assign(M,{setup(m){const M=c(null),j=c(null),T=e=>{N.selectOptions=e},N=y({searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},columns:[{dataIndex:"empName",title:"员工姓名",minWidth:180},{dataIndex:"empIdcard",title:"身份证号",minWidth:200},{dataIndex:"projectName",title:"所在项目名称",minWidth:160,tooltip:!0},{dataIndex:"projectCode",title:"所在项目编码",hideInSearch:!0,minWidth:140},{dataIndex:"type",title:"证明类型",minWidth:160,valueEnum:{0:"在职证明",1:"离职证明",2:"劳动合同终止（解除）证明书",3:"调档函",4:"代缴证明"},tooltip:!0},{dataIndex:"createName",title:"开具人",minWidth:140},{dataIndex:"createTime",title:"开具时间",minWidth:180,valueType:"dateTimeRange",searchIndex:"createTimes"},{dataIndex:"option",title:"操作",key:"option",minWidth:100,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"批量导出",permission:["prove_batch_export"],onClick:()=>{if(N.selectOptions.length>0){const e=[];N.selectOptions.map((a=>{e.push(a.id)})),N.params={idList:e}}else N.params=M.value.getParams(),delete N.params.size,delete N.params.current;N.btn.find((e=>"批量导出"===e.label)).loading=!0,p(N.params).then((e=>{200==e.code?(r(i,e.data.map((e=>({empName:e.empName,empIdcard:e.empIdcard,projectName:e.projectName,projectCode:e.projectCode,type:N.dict.prove_type[e.type]||"",opener:e.opener||e.createName,openTime:e.openTime.substring(0,10)||""}))),`证明开具记录批量导出${l().format("YYYYMMDD")}`),o.success("导出成功")):o.error(e.msg)}))["catch"]((e=>{o.error("导出失败")}))["finally"]((()=>{N.btn.find((e=>"批量导出"===e.label)).loading=!1}))},icon:"icon-ic_edit_export",loading:!1}],cellBtns:[{text:"详情",prop:"detail",permission:["demo_tcertrecord_get"]}],detailConf:{0:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"项目名称",key:"projectName",tooltip:!0},{label:"就职岗位",key:"post",tooltip:!0},{label:"合同开始时间",key:"firstContractTime",date:"YYYY-MM-DD"},{label:"合同结束时间",key:"contractEnd",date:"YYYY-MM-DD"},{label:"印章名称",key:"seal",tooltip:!0},{label:"开具证明当天时间",key:"openTime",date:"YYYY-MM-DD"},{label:"开具人",key:"createName"},{label:"开具时间",key:"createTime"}],1:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"项目名称",key:"projectName",tooltip:!0},{label:"就职岗位",key:"post",tooltip:!0},{label:"派减离职时间",key:"leaveTime",date:"YYYY-MM-DD"},{label:"派减离职原因",key:"leaveReason",tooltip:!0},{label:"印章名称",key:"seal",tooltip:!0},{label:"开具证明当天时间",key:"openTime",date:"YYYY-MM-DD"},{label:"开具人",key:"createName"},{label:"开具时间",key:"createTime"}],2:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"来我单位时间",key:"entryTime",date:"YYYY-MM-DD"},{label:"签订合同时间",key:"firstContractTime",date:"YYYY-MM-DD"},{label:"派单离职原因",key:"leaveReason",tooltip:!0},{label:"性别",key:"sex",dict:"prove_peo_sex"},{label:"印章名称",key:"seal",tooltip:!0},{label:"开具证明当天时间",key:"openTime",date:"YYYY-MM-DD"},{label:"开具人",key:"createName"},{label:"开具时间",key:"createTime"}],3:[{label:"介绍单位",key:"introductionUnit",size:24,tooltip:!0},{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"印章名称",key:"seal",tooltip:!0},{label:"开具证明当天时间",key:"openTime",date:"YYYY-MM-DD"},{label:"开具人",key:"createName"},{label:"开具时间",key:"createTime"}],4:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"参保开始时间",key:"socialTime",date:"YYYY-MM-DD"},{label:"项目名称",key:"projectName",tooltip:!0},{label:"印章名称",key:"seal",tooltip:!0},{label:"开具证明当天时间",key:"openTime",date:"YYYY-MM-DD"},{label:"开具人",key:"createName"},{label:"开具时间",key:"createTime"}]},selectOptions:[],params:{},dict:{prove_type:null,prove_peo_sex:null}}),{columns:g,cellBtns:I,btn:_,searchConfig:v}=b(N),C=async e=>{try{const a=await d(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records.map(((a,t)=>({...a,index:(e.current-1)*e.size+t+1})))}}catch(a){}return{current:1,total:0,data:[]}},W=async(e,a)=>{if("detail"===e){const e=await s(a.id);try{if(200==e.code){const a=e.data,t=N.dict.prove_type[a.type]+"详情";j.value.openDialog(a,N.detailConf[a.type],t)}else o.error(e.msg||"获取证明开具详情失败")}catch(t){o.error("获取证明开具详情失败")}}};return k((()=>{t(["prove_type","prove_peo_sex"]).then((e=>{N.dict=e}))})),(t,l)=>(x(),Y("div",D,[f(e,{ref_key:"proTableRef",ref:M,"row-key":"id",columns:h(g),request:C,btn:h(_),searchConfig:h(v),multi:!0,onSelectionChange:T},{option:u((e=>[f(a,{array:h(I),model:e,onOnClick:W},null,8,["array","model"])])),_:1},8,["columns","btn","searchConfig"]),f(n,{ref_key:"tableDetailRef",ref:j,labelWidth:"130px",dictData:N.dict},null,8,["dictData"])]))}});export{j as default};