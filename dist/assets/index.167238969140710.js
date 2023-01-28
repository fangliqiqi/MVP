import{P as e}from"./ProTable.1672389691407.js";import"./index.16723896914072.js";import{s as t,E as a}from"./index.1672389691407.js";import{d as n,f as i,$ as d,a2 as r,c as o,W as s,u as l,o as c}from"./vue.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";const m={"class":"system-dict-container"},h=n({name:"收入明细"}),u=Object.assign(h,{setup(n){const h=i(null),u=i(!1),p=e=>{I.selectOptions=e},I=d({searchConfig:{labelWidth:110,option:{extBtn:"extBtns"}},columns:[{dataIndex:"empName",title:"员工姓名",hideInSearch:!1,minWidth:160,fixed:"left"},{dataIndex:"empIdcard",title:"身份证号",minWidth:200,hideInSearch:!1,tooltips:!0},{dataIndex:"deptName",title:"项目名称",hideInSearch:!1,minWidth:160,tooltip:!0},{dataIndex:"deptNo",title:"项目编码",hideInSearch:!1,minWidth:140},{dataIndex:"applyNo",title:"申请编码",minWidth:160},{dataIndex:"unitName",title:"客户名称",hideInSearch:!1,minWidth:180,tooltip:!0},{dataIndex:"feeType",title:"费用类型",hideInSearch:!1,minWidth:200,valueEnum:{1:"管理费",2:"风险费"}},{dataIndex:"feeMode",title:"收费方式",hideInSearch:!0,minWidth:200,valueEnum:{1:"按比例",2:"金额-人数",3:"金额-人次"}},{dataIndex:"charges",title:"收费标准",hideInSearch:!0,minWidth:150},{dataIndex:"sourceType",title:"收入来源",hideInSearch:!1,minWidth:140,valueEnum:{1:"社保",2:"公积金",3:"商险",4:"薪资"}},{dataIndex:"money",title:"金额",hideInSearch:!0,minWidth:200,tooltip:!0},{dataIndex:"createMonth",title:"生成月份",hideInSearch:!1,minWidth:200,valueType:"date",selectType:"month",format:"YYYYMM",valueFormat:"YYYYMM",clearable:!0},{dataIndex:"payMonth",title:"缴纳月份",hideInSearch:!1,minWidth:160,valueType:"date",selectType:"month",format:"YYYYMM",valueFormat:"YYYYMM",clearable:!0},{dataIndex:"dataCreateMonth",title:"数据生成时间",hideInSearch:!1,hideInTable:!0,minWidth:160,valueType:"date",selectType:"month",format:"YYYYMM",valueFormat:"YYYYMM",clearable:!0},{dataIndex:"createTime",title:"数据生成时间",hideInSearch:!0,minWidth:160},{dataIndex:"sendStatus",title:"推送状态",hideInSearch:!1,minWidth:100,fixed:"right",valueEnum:{0:"未推送",1:"已推送"}}],btn:[{label:"批量导出",loading:u,permission:["social_tincome-export"],onClick:()=>{const e=[];I.selectOptions.map((t=>{e.push(t.id)}));const n={ids:e.length>0?e.join(","):""};I.params=h.value.getParams(),delete I.params.size,delete I.params.current;const i=Object.assign({},I.params,n.ids?n:{});u.value=!0,async function(e){return t({url:"/yifu-social/method/tincome/export",method:"POST",responseType:"blob",data:e})}(i).then((e=>{200==e.code?a.success("导出成功"):a.error(e.msg||"导出失败")}))["catch"]((e=>{a.error(e.msg||"导出失败")}))["finally"]((()=>{u.value=!1}))},icon:"icon-ic_edit_export"}],cellBtns:[],selectOptions:[],params:{},dictKeys:[]}),{columns:x,cellBtns:f,btn:y,searchConfig:Y}=r(I),S=async e=>{try{const a=await async function(e){return t({url:"/yifu-social/method/tincome/page",method:"GET",params:e})}(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(a){}return{current:1,total:0,data:[]}};return(t,a)=>(c(),o("div",m,[s(e,{ref_key:"proTableRef",ref:h,"row-key":"id",columns:l(x),request:S,btn:l(y),searchConfig:l(Y),multi:!0,onSelectionChange:p},null,8,["columns","btn","searchConfig"])]))}});export{u as default};