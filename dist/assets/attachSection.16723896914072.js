import{d as e,f as a,j as t,k as i,$ as l,c as n,a as o,U as s,V as d,u as c,J as r,O as m,P as y,T as u,W as p,ay as b,az as f,a3 as k,o as h,F as I,a5 as g,_ as D}from"./vue.1672389691407.js";import{b as x,c as v,d as T,e as W,f as _,h as w}from"./staff.1672389691407.js";import{P as S}from"./ProTable.1672389691407.js";import{t as j}from"./index.16723896914075.js";import{_ as q,g as C,t as Y}from"./index.1672389691407.js";import"./index.16723896914073.js";import"./index.16723896914074.js";import"./city.1672389691407.js";import"./file.1672389691407.js";const N=e=>(b("data-v-c289a156"),e=e(),f(),e),E={"class":"attach-info section-container"},z={"class":"title"},L=N((()=>o("span",null,"附属信息",-1))),M=N((()=>o("div",null,"暂无数据",-1))),F=["onClick"],U=e({name:"attachSection"});var O=q(Object.assign(U,{props:{empIdcard:{type:String,"default":null}},setup(e){const b=e,f=a(null),q=a(null),N=async(e,a)=>{if(b.empIdcard)try{const e=await a(b.empIdcard);if(e&&200==e.code&&e.data){const a=e.data||[];return{current:1,total:a.length,data:a}}}catch(t){}return{current:1,total:0,data:[]}},U={dataIndex:"option",title:"操作",hideInSearch:!0,key:"option",width:100,fixed:"right",scopedSlots:{customRender:"option"}};t((async()=>{await O()}));const O=async()=>{try{const e=await C(P.dictKeys);if(e){const a=Object.assign({},e,P.DICTS);P.DICTS=a,A(a)}}catch(e){}},R=()=>{P.collapse=!P.collapse},V=(e,a)=>Y(e,a,P.DICTS),A=e=>{e&&P.config.forEach((a=>{switch(a.name){case"family":a.columns=a.columns.map((a=>{const t={...a};return"relationshipSelf"===a.dataIndex&&(t.valueEnum=e.family_relation),t}));break;case"job":a.columns=a.columns.map((a=>{const t={...a};return"workingType"===a.dataIndex&&(t.valueEnum=e.workinfo_type),t}));break;case"education":a.columns=a.columns.map((a=>{const t={...a};return"educationName"===a.dataIndex||"type"===a.dataIndex?t.valueEnum=e.education:"educationSystem"===a.dataIndex&&(t.valueEnum=e.education_system),t}));break;case"disability":a.columns=a.columns.map((a=>{const t={...a};return"disabilityLevel"===a.dataIndex&&(t.valueEnum=e.disability_grade),t}));break;case"professional":a.columns=a.columns.map((a=>{const t={...a};return"obtainType"===a.dataIndex?t.valueEnum=e.obtain_type:"qualificationType"===a.dataIndex?t.valueEnum=e.qualification_type:"qualificationLevel"===a.dataIndex&&(t.valueEnum=e.qualification_level),t}))}}))},J=i((()=>P.collapse?"收起":"展开")),P=l({collapse:!1,flagDict:{0:"是",1:"否"},config:[{name:"family",label:"家庭信息",columns:[{dataIndex:"familyName",title:"成员姓名",ellipsis:!0,minWidth:100},{dataIndex:"relationshipSelf",title:"与本人关系",minWidth:100},{dataIndex:"birthday",title:"出生日期",dateFormat:"YYYY-MM-DD",minWidth:120},{dataIndex:"workUnit",title:"工作单位",minWidth:180,ellipsis:!0},{dataIndex:"contractTel",title:"手机号码",minWidth:140},U],request:e=>N(0,x)},{name:"job",label:"工作记录",columns:[{dataIndex:"workUnit",title:"工作单位",ellipsis:!0,minWidth:140},{dataIndex:"workDepart",title:"工作部门",ellipsis:!0,minWidth:140},{dataIndex:"workJob",title:"工作岗位",ellipsis:!0,minWidth:160},{dataIndex:"workingType",title:"工作类型",ellipsis:!0,minWidth:120},{dataIndex:"workingStatus",title:"在职状态",ellipsis:!0,minWidth:120,valueEnum:{0:"在职",1:"离职"}},U],request:e=>N(0,v)},{name:"education",label:"学历信息",columns:[{dataIndex:"school",title:"学校",ellipsis:!0,minWidth:120},{dataIndex:"collageSystem",title:"院系名称",ellipsis:!0,minWidth:140},{dataIndex:"major",title:"专业",ellipsis:!0,minWidth:120},{dataIndex:"educationName",title:"学历",ellipsis:!0,minWidth:120},{dataIndex:"type",title:"学历类型",ellipsis:!0,minWidth:80},{dataIndex:"highIdentification",title:"最高学历",ellipsis:!0,minWidth:80,valueEnum:{0:"是",1:"否"}},{dataIndex:"educationSystem",title:"学制类型",ellipsis:!0,minWidth:100},U],request:e=>N(0,T)},{name:"disability",label:"伤残信息",columns:[{dataIndex:"disabilityName",title:"伤残病名称",ellipsis:!0,minWidth:120},{dataIndex:"occupationalDisease",title:"职业病名称",ellipsis:!0,minWidth:120},{dataIndex:"disabilityLevel",title:"伤残等级",ellipsis:!0,minWidth:120},{dataIndex:"startTime",title:"伤残开始时间",dateFormat:"YYYY-MM-DD",minWidth:120},{dataIndex:"endTime",title:"伤残结束时间",dateFormat:"YYYY-MM-DD",minWidth:120},{dataIndex:"injuryIdentification",title:"是否工伤",valueEnum:{0:"是",1:"否"},minWidth:80},U],request:e=>N(0,W)},{name:"professional",label:"职业资格",columns:[{dataIndex:"certificationNo",title:"证书编号",ellipsis:!0,minWidth:120},{dataIndex:"declareYear",title:"申报年度",minWidth:100},{dataIndex:"assessmentUnit",title:"评定机构",ellipsis:!0,minWidth:120},{dataIndex:"obtainType",title:"获取方式",minWidth:100},{dataIndex:"qualificationType",title:"资格类型",minWidth:120},{dataIndex:"qualificationLevel",title:"资格等级",minWidth:120},{dataIndex:"heightIdentification",title:"最高资格",minWidth:100,valueEnum:{0:"是",1:"否"}},U],request:e=>N(0,_)},{name:"bad",label:"不良记录",columns:[{dataIndex:"project",title:"产生项目",hideInSearch:!0,minWidth:200,tooltip:!0},{dataIndex:"happenTime",title:"发生时间",hideInSearch:!0,minWidth:120,dateFormat:"YYYY-MM-DD",ellipsis:!0},{dataIndex:"loseFee",title:"费用损失",hideInSearch:!0,minWidth:140},{dataIndex:"loseFeeOther",title:"其他损失",hideInSearch:!0,minWidth:140},{dataIndex:"createName",title:"创建人",minWidth:160},{dataIndex:"createTime",title:"创建时间",minWidth:180,searchIndex:"createTimes",valueType:"dateTimeRange"},U],request:e=>N(0,w)}],searchConfig:{pagination:!1},DICTS:{flagDict:{0:"是",1:"否"}},dictKeys:["family_relation","education","education_type","education_system","disability_grade","workinfo_type","obtain_type","qualification_type","qualification_level"],attachActiveTab:"family",familyDetailConfig:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"成员姓名",key:"familyName"},{label:"与本人关系",key:"relationshipSelf"},{label:"出生日期",key:"birthday"},{label:"工作单位",key:"workUnit"},{label:"手机号码",key:"contractTel"},{label:"创建时间",key:"createTime"}],educationDetailConf:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"学校",key:"school"},{label:"院系名称",key:"collageSystem"},{label:"专业",key:"major"},{label:"学历",key:"educationName"},{label:"学历类型",key:"type"},{label:"最高学历",key:"highIdentification"},{label:"入学时间",key:"entryDate"},{label:"毕业时间",key:"gradutionDate"},{label:"学制类型",key:"educationSystem"},{label:"证书名称",key:"certificationName"},{label:"备注",key:"remark",tooltip:"true",size:24},{label:"附件内容",key:"",file:"true",size:24}],disabilityDetailConf:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"伤残病名称",key:"disabilityName"},{label:"职业病名称",key:"occupationalDisease"},{label:"伤残等级",key:"disabilityLevel"},{label:"是否工伤",key:"injuryIdentification"},{label:"伤残开始日期",key:"startTime"},{label:"伤残结束日期",key:"endTime"},{label:"备注",key:"remark",tooltip:"true",size:24},{label:"附件内容",key:"",file:"true",size:24}],jobDetailConf:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"工作单位",key:"workUnit",tooltip:!0},{label:"工作部门",key:"workDepart",tooltip:!0},{label:"工作岗位",key:"workJob",tooltip:!0},{label:"工作类型",key:"workingType"},{label:"在职状态",key:"workingStatus"},{label:"开始工作日期",key:"startDate"},{label:"结束工作日期",key:"endDate"},{label:"创建人",key:"createName"},{label:"创建时间",key:"createTime"}],professionalDetailConf:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"证书编号",key:"certificationNo"},{label:"申报年度",key:"declareYear"},{label:"评定机构",key:"assessmentUnit"},{label:"获取方式",key:"obtainType"},{label:"资格类型",key:"qualificationType"},{label:"是否最高资格",key:"heightIdentification"},{label:"资格等级",key:"qualificationLevel",size:24},{label:"备注",key:"remark",tooltip:"true",size:24},{label:"附件内容",key:"",file:"true",size:24}],badDetailConf:[{label:"员工姓名",key:"empName"},{label:"身份证号",key:"empIdcard"},{label:"产生项目",key:"project",tooltip:!0},{label:"项目编码",key:"projectCode"},{label:"发生时间",key:"happenTime",date:"YYYY-MM-DD"},{label:"费用损失",key:"loseFee"},{label:"其他损失",key:"loseFeeOther"},{label:"创建人",key:"createName"},{label:"创建时间",key:"createTime"},{label:"不良记录描述",key:"remark",size:24,tooltip:!0},{label:"附件内容",key:"",file:"true",size:24}]});return(e,a)=>{const t=k("el-tab-pane"),i=k("el-tabs"),l=k("attach-detail-vue");return h(),n("div",E,[o("div",z,[L,o("div",{"class":"college-container",onClick:R,style:{color:"var(--el-color-primary)","font-weight":"600"}},[s(d(c(J)),1),o("em",{"class":r("iconfont icon-ic-arrow-down "+(P.collapse?"isCollapse":""))},null,2)])]),P.collapse?(h(),m(i,{key:0,modelValue:P.attachActiveTab,"onUpdate:modelValue":a[0]||(a[0]=e=>P.attachActiveTab=e),type:"card","class":"attach-tabs",style:{"margin-top":"16px"}},{"default":y((()=>[(h(!0),n(I,null,g(P.config,(e=>(h(),m(t,{key:`attach_tab_${e.name}`,label:e.label,name:e.name},{"default":y((()=>[p(S,{"row-key":"id",columns:e.columns,request:e.request,showHeader:!1,customEmpty:"",searchConfig:P.searchConfig},{empty:y((()=>[M])),option:y((a=>[o("span",null,[o("a",{onClick:D((t=>((e,a)=>{const t={...a};switch(e){case"family":t.relationshipSelf=V("family_relation",t.relationshipSelf),t.birthday=t.birthday?t.birthday.substring(0,10):"",f.value&&f.value.openDialog(t,P.familyDetailConfig,"家庭信息详情");break;case"education":t.startDate=t.startDate?t.startDate.substring(0,10):"",t.endDate=t.endDate?t.endDate.substring(0,10):"",t.educationName=V("education",t.educationName),t.type=V("education_type",t.type),t.highIdentification=V("flagDict",t.highIdentification),t.educationSystem=V("education_system",t.educationSystem),f.value&&f.value.openDialog(t,P.educationDetailConf,"学历信息详情",!0);break;case"job":t.workingType=V("workinfo_type",t.workingType),t.workingStatus=1==t.workingStatus?"离职":"在职",t.startDate=t.startDate?t.startDate.substring(0,10):"",t.endDate=t.endDate?t.endDate.substring(0,10):"",f.value&&f.value.openDialog(t,P.jobDetailConf,"工作记录详情");break;case"disability":t.startTime=t.startTime?t.startTime.substring(0,10):"",t.endTime=t.endTime?t.endTime.substring(0,10):"",t.disabilityLevel=V("disability_grade",t.disabilityLevel),t.injuryIdentification=V("flagDict",t.injuryIdentification),f.value&&f.value.openDialog(t,P.disabilityDetailConf,"伤残信息详情",!0);break;case"professional":t.obtainType=V("obtain_type",t.obtainType),t.qualificationType=V("qualification_type",t.qualificationType),t.qualificationLevel=V("qualification_level",t.qualificationLevel),t.heightIdentification=V("flagDict",t.heightIdentification),f.value&&f.value.openDialog(t,P.professionalDetailConf,"职业资格详情",!0);break;case"bad":q.value&&q.value.openDialog(t,P.badDetailConf,"不良记录详情",!0)}})(e.name,{...a})),["stop"])}," 详情",8,F)])])),_:2},1032,["columns","request","searchConfig"])])),_:2},1032,["label","name"])))),128))])),_:1},8,["modelValue"])):u("",!0),p(l,{ref_key:"attachDetailRef",ref:f},null,512),p(j,{ref_key:"tableDetailRef",ref:q},null,512)])}}}),[["__scopeId","data-v-c289a156"]]);export{O as default};