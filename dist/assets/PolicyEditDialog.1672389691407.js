import{b as e}from"./policy.1672389691407.js";import{i as a,a as l}from"./company.1672389691407.js";import{_ as o,h as r}from"./index.1672389691407.js";import{d as t,i,f as n,$ as s,k as u,O as d,P as m,a3 as p,ai as c,o as g,a as y,W as f,Q as v,u as b,U as F,V as h,c as _,a5 as V,F as N}from"./vue.1672389691407.js";const Y={"class":"dialog-footer"},D=F("取 消"),S=F("确 定"),w=t({name:"PolicyEditDialog"});var C=o(Object.assign(w,{emits:["ok"],setup(o,{expose:t,emit:w}){var C;const L=null==(C=i())?void 0:C.appContext.config.globalProperties.$message,k=n(null),E=s({isShowDialog:!1,loading:!1,submiting:!1,ruleForm:{},companyList:[],typeList:[]}),M=()=>{E.isShowDialog=!1,E.companyList=[],E.typeList=[],k.value&&k.value.clearValidate()},T=()=>{k.value&&k.value.validate((async a=>{if(a){const a=E.ruleForm;E.submiting=!0;try{const l=await e(a);l&&200===l.code?(L.success("操作成功"),w("ok"),setTimeout((()=>{M()}),500)):L.error(l.msg||"操作失败")}catch(l){L.error(l.msg||"操作失败")}E.submiting=!1}}))},U=e=>{const a=(E.companyList||[]).find((a=>a.companyName===e));return a&&a.id},x=u((()=>({enableFlag:[{required:!0,message:"请选择是否启用",trigger:"change"}],insuranceCompanyName:[{required:!0,message:"请选择保险公司",trigger:"change"}],insuranceTypeName:[{required:!0,message:"请选择险种",trigger:"change"}],policyStart:[{required:!0,message:"请选择开始日期",trigger:"change"},{validator:(e,a,l)=>{r(a).isSameOrAfter(E.ruleForm.policyEnd)?l(new Error("开始日期应该在结束日期之前")):l()},trigger:"change"}],policyEnd:[{required:!0,message:"请选择结束日期",trigger:"change"},{validator:(e,a,l)=>{r(a).isSameOrBefore(E.ruleForm.policyStart)?l(new Error("结束日期应该在开始日期之后")):l()},trigger:"change"}]}))),O=async e=>{try{const a=U(e),o=await l({insuranceCompanyId:a});200===o.code?E.typeList=o.data||[]:E.typeList=[]}catch{}E.ruleForm.insuranceTypeName=null,E.ruleForm.insuranceTypeId=null};return t({openDialog:async e=>{E.isShowDialog=!0,E.ruleForm=JSON.parse(JSON.stringify(e));const o=await a();200===o.code&&(E.companyList=o.data||[]);const r=U(e.insuranceCompanyName);if(r){const e=await l({insuranceCompanyId:r});200===e.code&&(E.typeList=e.data||[])}}}),(e,a)=>{const l=p("el-form-item"),o=p("el-col"),r=p("el-option"),t=p("el-select"),i=p("el-date-picker"),n=p("el-row"),s=p("el-form"),u=p("el-button"),w=p("el-dialog"),C=c("loading");return g(),d(w,{modelValue:E.isShowDialog,"onUpdate:modelValue":a[7]||(a[7]=e=>E.isShowDialog=e),width:"750px","close-on-click-modal":!1,onClose:M,"custom-class":"policy-edit-dialog",title:"保单编辑"},{footer:m((()=>[y("span",Y,[f(u,{onClick:M,size:"default"},{"default":m((()=>[D])),_:1}),f(u,{type:"primary",onClick:T,size:"default",loading:E.submiting},{"default":m((()=>[S])),_:1},8,["loading"])])])),"default":m((()=>[v((g(),d(s,{size:"default","label-width":"120px",rules:b(x),ref_key:"formRef",ref:k,model:E.ruleForm},{"default":m((()=>[f(n,{gutter:40},{"default":m((()=>[f(o,{span:12},{"default":m((()=>[f(l,{label:"保单号",prop:"policyNo"},{"default":m((()=>[F(h(E.ruleForm.policyNo),1)])),_:1})])),_:1}),f(o,{span:12},{"default":m((()=>[f(l,{label:"是否启用",prop:"enableFlag"},{"default":m((()=>[f(t,{placeholder:"请选择是否启用","class":"input",modelValue:E.ruleForm.enableFlag,"onUpdate:modelValue":a[0]||(a[0]=e=>E.ruleForm.enableFlag=e)},{"default":m((()=>[f(r,{label:"启用",value:0}),f(r,{label:"禁用",value:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),f(o,{span:12},{"default":m((()=>[f(l,{label:"保险公司",prop:"insuranceCompanyName"},{"default":m((()=>[f(t,{placeholder:"请选择保险公司","class":"input",modelValue:E.ruleForm.insuranceCompanyName,"onUpdate:modelValue":a[1]||(a[1]=e=>E.ruleForm.insuranceCompanyName=e),filterable:"",onChange:O},{"default":m((()=>[(g(!0),_(N,null,V(E.companyList,(e=>(g(),d(r,{key:e.id,label:e.companyName,value:e.companyName},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),f(o,{span:12},{"default":m((()=>[f(l,{label:"险种",prop:"insuranceTypeName"},{"default":m((()=>[f(t,{placeholder:"请选择险种","class":"input",modelValue:E.ruleForm.insuranceTypeName,"onUpdate:modelValue":a[2]||(a[2]=e=>E.ruleForm.insuranceTypeName=e)},{"default":m((()=>[(g(!0),_(N,null,V(E.typeList,(e=>(g(),d(r,{key:e.id,label:e.name,value:e.name},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),f(o,{span:12},{"default":m((()=>[f(l,{label:"保单开始日期",prop:"policyStart"},{"default":m((()=>[f(i,{type:"date",placeholder:"请选择保单开始日期","class":"input",modelValue:E.ruleForm.policyStart,"onUpdate:modelValue":a[3]||(a[3]=e=>E.ruleForm.policyStart=e),format:"YYYY-MM-DD","value-format":"YYYY-MM-DD",onChange:a[4]||(a[4]=e=>{var a;return null==(a=k.value)?void 0:a.validateField(["policyEnd"])})},null,8,["modelValue"])])),_:1})])),_:1}),f(o,{span:12},{"default":m((()=>[f(l,{label:"保单结束日期",prop:"policyEnd"},{"default":m((()=>[f(i,{type:"date",placeholder:"请选择保单结束日期","class":"input",modelValue:E.ruleForm.policyEnd,"onUpdate:modelValue":a[5]||(a[5]=e=>E.ruleForm.policyEnd=e),format:"YYYY-MM-DD","value-format":"YYYY-MM-DD",onChange:a[6]||(a[6]=e=>{var a;return null==(a=k.value)?void 0:a.validateField(["policyStart"])})},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["rules","model"])),[[C,E.loading]])])),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-8cba7910"]]);export{C as default};