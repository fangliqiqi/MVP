import e from"./AreaUnionSelect.1672389691407.js";import{g as a,e as l}from"./custserve.1672389691407.js";import{b as r}from"./city.1672389691407.js";import{i as n,a as d,b as s}from"./company.1672389691407.js";import{_ as u}from"./index.1672389691407.js";import{d as i,i as o,f as t,$ as m,k as c,O as p,P as y,a3 as g,ai as b,o as f,a as v,V as F,c as N,T as V,W as _,Q as h,u as C,a5 as H,F as S,U as q}from"./vue.1672389691407.js";const A={"class":"dialog-header"},L={"class":"header-title"},w={"class":"name"},Y={key:0,"class":"id"},D={"class":"dialog-footer"},I=q("取 消"),P=q("确 定"),T=i({name:"insureEditDialog"});var U=u(Object.assign(T,{emits:["ok"],setup(u,{expose:i,emit:q}){var T;const U=null==(T=o())?void 0:T.appContext.config.globalProperties.$message,k=t(null),M=(e,a,l)=>{0===a.length?l(new Error("地区不能为空")):1===a.length?l(new Error("请选择城市")):l()},x=m({isShowDialog:!1,loading:!1,submiting:!1,ruleForm:{policyStart:null,policyEnd:null,post:null,insuranceTypeName:null,insuranceTypeId:null,insuranceCompanyName:null,buyStandard:null,insuranceAddress:null,insuranceHandleAddress:null,insuranceProvince:null,insuranceCity:null,insuranceHandleProvince:null,insuranceHandleCity:null},companyList:[],typeList:[],standardList:[]}),E=()=>{x.isShowDialog=!1,x.companyList=[],x.typeList=[],x.standardList=[],k.value&&k.value.clearValidate()},j=()=>{k.value&&k.value.validate((async e=>{var a,n,d,s;if(e){const e=x.ruleForm;e.insuranceProvince=e.insuranceAddress[0],e.insuranceCity=e.insuranceAddress[1],e.insuranceHandleProvince=e.insuranceHandleAddress[0],e.insuranceHandleCity=e.insuranceHandleAddress[1],e.insuranceProvinceName=null==(a=r[e.insuranceProvince])?void 0:a.areaName,e.insuranceCityName=null==(n=r[e.insuranceCity])?void 0:n.areaName,e.insuranceHandleProvinceName=null==(d=r[e.insuranceHandleProvince])?void 0:d.areaName,e.insuranceHandleCityName=null==(s=r[e.insuranceHandleCity])?void 0:s.areaName,x.submiting=!0;try{const a=await l(e);a&&200===a.code?(U.success("操作成功"),q("ok"),setTimeout((()=>{E()}),500)):U.error(a.msg||"操作失败")}catch(u){U.error(u.msg||"操作失败")}x.submiting=!1}}))},z=e=>{const a=(x.companyList||[]).find((a=>a.companyName===e));return a&&a.id},O=c((()=>{var e;return 4==(null==(e=null==x?void 0:x.ruleForm)?void 0:e.buyType)})),$=c((()=>{var e;return 3==(null==(e=null==x?void 0:x.ruleForm)?void 0:e.buyType)})),Q=c((()=>O.value?{empName:[{required:!0,message:"请输入姓名",trigger:"blur"}],empIdcardNo:[{required:!0,message:"请输入身份证号",trigger:"blur"}],post:[{required:!0,message:"请输入岗位名称",trigger:"blur"}]}:$.value?{empName:[{required:!0,message:"请输入姓名",trigger:"blur"}],empIdcardNo:[{required:!0,message:"请输入身份证号",trigger:"blur"}],post:[{required:!0,message:"请输入岗位名称",trigger:"blur"}],buyStandard:[{required:!0,message:"请选择购买标准",trigger:"blur"}],insuranceAddress:[{required:!0,message:"请选择商险购买地"},{validator:M}],insuranceHandleAddress:[{required:!0,message:"请选择商险办理地"},{validator:M}]}:{empName:[{required:!0,message:"请输入姓名",trigger:"blur"}],empIdcardNo:[{required:!0,message:"请输入身份证号",trigger:"blur"}],policyStart:[{required:!0,message:"请选择保单开始日期",trigger:"blur"}],policyEnd:[{required:!0,message:"请选择保单结束日期",trigger:"blur"}],post:[{required:!0,message:"请输入岗位名称",trigger:"blur"}],insuranceTypeName:[{required:!0,message:"请选择险种",trigger:"blur"}],insuranceCompanyName:[{required:!0,message:"请选择保险公司",trigger:"blur"}],buyStandard:[{required:!0,message:"请选择购买标准",trigger:"blur"}],insuranceAddress:[{required:!0,message:"请选择商险购买地"},{validator:M}],insuranceHandleAddress:[{required:!0,message:"请选择商险办理地"},{validator:M}]})),R=async e=>{try{const a=z(e),l=await d({insuranceCompanyId:a});200===l.code?x.typeList=l.data||[]:x.typeList=[]}catch{}x.ruleForm.insuranceTypeName=null,x.ruleForm.insuranceTypeId=null,x.ruleForm.buyStandard=null,x.standardList=[]},W=async e=>{let a=null;try{a=(x.typeList||[]).find((a=>a.name===e));const l=await s(a&&a.id);200===l.code?x.standardList=l.data||[]:x.standardList=[]}catch{}x.ruleForm.insuranceTypeId=a&&a.id,x.ruleForm.buyStandard=null};return i({openDialog:async e=>{x.ruleForm=e,x.loading=!0,x.isShowDialog=!0;try{const l=await a(e.id);if(200===l.code){const e=l.data||{};x.ruleForm=e;const a=await n();200===a.code&&(x.companyList=a.data||[]);const r=z(e.insuranceCompanyName);if(r){const e=await d({insuranceCompanyId:r});200===e.code&&(x.typeList=e.data||[])}const u=await s(e.insuranceTypeId);200===u.code&&(x.standardList=u.data||[]),e.insuranceProvince&&e.insuranceCity&&(x.ruleForm.insuranceAddress=[e.insuranceProvince,e.insuranceCity]),e.insuranceHandleProvince&&e.insuranceHandleCity&&(x.ruleForm.insuranceHandleAddress=[e.insuranceHandleProvince,e.insuranceHandleCity])}}finally{x.loading=!1}}}),(a,l)=>{const r=g("el-input"),n=g("el-form-item"),d=g("el-col"),s=g("el-date-picker"),u=g("el-option"),i=g("el-select"),o=g("el-row"),t=g("el-form"),m=g("el-button"),c=g("el-dialog"),q=b("loading");return f(),p(c,{modelValue:x.isShowDialog,"onUpdate:modelValue":l[10]||(l[10]=e=>x.isShowDialog=e),width:"750px","close-on-click-modal":!1,onClose:E,"custom-class":"insure-edit-dialog"},{header:y((()=>[v("div",A,[v("div",L,[v("span",w,F(x.ruleForm.empName||"--"),1),x.ruleForm.empIdcardNo?(f(),N("span",Y,"("+F(x.ruleForm.empIdcardNo)+")",1)):V("",!0)])])])),footer:y((()=>[v("span",D,[_(m,{onClick:E,size:"default"},{"default":y((()=>[I])),_:1}),_(m,{type:"primary",onClick:j,size:"default",loading:x.submiting},{"default":y((()=>[P])),_:1},8,["loading"])])])),"default":y((()=>[h((f(),p(t,{size:"default","label-width":"120px",rules:C(Q),ref_key:"formRef",ref:k,model:x.ruleForm,"validate-on-rule-change":!1},{"default":y((()=>[_(o,{gutter:40},{"default":y((()=>[_(d,{span:12},{"default":y((()=>[_(n,{label:"姓名",prop:"empName"},{"default":y((()=>[_(r,{placeholder:"请输入姓名","class":"input",modelValue:x.ruleForm.empName,"onUpdate:modelValue":l[0]||(l[0]=e=>x.ruleForm.empName=e),modelModifiers:{trim:!0},maxlength:20},null,8,["modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"身份证号",prop:"empIdcardNo"},{"default":y((()=>[_(r,{placeholder:"请输入身份证号","class":"input",modelValue:x.ruleForm.empIdcardNo,"onUpdate:modelValue":l[1]||(l[1]=e=>x.ruleForm.empIdcardNo=e),modelModifiers:{trim:!0},maxlength:18},null,8,["modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"保单开始日期",prop:"policyStart"},{"default":y((()=>[_(s,{disabled:C(O)||C($),type:"date",placeholder:"请选择保单开始日期","class":"input",modelValue:x.ruleForm.policyStart,"onUpdate:modelValue":l[2]||(l[2]=e=>x.ruleForm.policyStart=e),format:"YYYY-MM-DD","value-format":"YYYY-MM-DD"},null,8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"保单结束日期",prop:"policyEnd"},{"default":y((()=>[_(s,{disabled:C(O)||C($),type:"date",placeholder:"请选择保单结束日期","class":"input",modelValue:x.ruleForm.policyEnd,"onUpdate:modelValue":l[3]||(l[3]=e=>x.ruleForm.policyEnd=e),format:"YYYY-MM-DD","value-format":"YYYY-MM-DD"},null,8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"岗位",prop:"post"},{"default":y((()=>[_(r,{placeholder:"请输入岗位名称","class":"input",modelValue:x.ruleForm.post,"onUpdate:modelValue":l[4]||(l[4]=e=>x.ruleForm.post=e),modelModifiers:{trim:!0},maxlength:32},null,8,["modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"保险公司",prop:"insuranceCompanyName"},{"default":y((()=>[_(i,{disabled:C(O)||C($),placeholder:"请选择保险公司","class":"input",modelValue:x.ruleForm.insuranceCompanyName,"onUpdate:modelValue":l[5]||(l[5]=e=>x.ruleForm.insuranceCompanyName=e),filterable:"",onChange:R},{"default":y((()=>[(f(!0),N(S,null,H(x.companyList,(e=>(f(),p(u,{key:e.id,label:e.companyName,value:e.companyName},null,8,["label","value"])))),128))])),_:1},8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"险种",prop:"insuranceTypeName"},{"default":y((()=>[_(i,{disabled:C(O)||C($),placeholder:"请选择险种","class":"input",modelValue:x.ruleForm.insuranceTypeName,"onUpdate:modelValue":l[6]||(l[6]=e=>x.ruleForm.insuranceTypeName=e),onChange:W},{"default":y((()=>[(f(!0),N(S,null,H(x.typeList,(e=>(f(),p(u,{key:e.id,label:e.name,value:e.name},null,8,["label","value"])))),128))])),_:1},8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:12},{"default":y((()=>[_(n,{label:"购买标准（元）",prop:"buyStandard","class":"cn_"},{"default":y((()=>[_(i,{disabled:C(O),placeholder:"请选择购买标准","class":"input",modelValue:x.ruleForm.buyStandard,"onUpdate:modelValue":l[7]||(l[7]=e=>x.ruleForm.buyStandard=e)},{"default":y((()=>[(f(!0),N(S,null,H(x.standardList,(e=>(f(),p(u,{key:e.id,label:e.buyStandard,value:e.buyStandard},null,8,["label","value"])))),128))])),_:1},8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:18},{"default":y((()=>[_(n,{label:"商险购买地","class":"union",prop:"insuranceAddress"},{"default":y((()=>[_(e,{disabled:C(O),modelValue:x.ruleForm.insuranceAddress,"onUpdate:modelValue":l[8]||(l[8]=e=>x.ruleForm.insuranceAddress=e)},null,8,["disabled","modelValue"])])),_:1})])),_:1}),_(d,{span:18},{"default":y((()=>[_(n,{label:"商险办理地","class":"union",prop:"insuranceHandleAddress"},{"default":y((()=>[_(e,{disabled:C(O),modelValue:x.ruleForm.insuranceHandleAddress,"onUpdate:modelValue":l[9]||(l[9]=e=>x.ruleForm.insuranceHandleAddress=e)},null,8,["disabled","modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["rules","model"])),[[q,x.loading]])])),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-192e31d8"]]);export{U as default};