import{a as e}from"./city.1672389691407.js";import{_ as l,g as a,E as o}from"./index.1672389691407.js";import{l as r,u as t}from"./eleContract.16723896914072.js";import{d as s,k as d,j as u,f as n,$ as i,c as m,W as p,P as c,u as g,a3 as f,o as y,a as F,F as _,a5 as b,O as h,U as v}from"./vue.1672389691407.js";const V={"class":"edit-ele-contract-template-dialog"},C={"class":"dialog-footer"},k=v("取 消"),w=v("确 定"),D=s({name:"editEleContractTemplateDialog"});var S=l(Object.assign(D,{props:{type:String},emits:["ok"],setup(l,{expose:s,emit:v}){const D=l,S=d((()=>"add"==D.type?"新增合同模板":"编辑合同模板"));u((()=>{I(),N.areaJson=e()}));const j=(e,l)=>{const a=[e.id];l.parent&&0!=l.parent.level&&a.unshift(l.parent.data.id);let o=null,r=null;o=a[0]||null,a.length>1&&(r=a[1]||null),N.ruleForm.province=o,N.ruleForm.city=r},x=()=>{N.ruleForm.province=null,N.ruleForm.city=null},I=async()=>{try{const e=await a(N.dictKeys);e&&(N.DICTS=e)}catch(e){}},J=n(null),N=i({areaProps:{label:"areaName"},areaJson:[],isShowDialog:!1,loading:!1,dictKeys:["personnel_type"],DICTS:{},ruleForm:{localName:null,address:null,overtimeWageFlag:null,type:null},info:null}),T=i({localName:[{required:!0,message:"请输入模板名称",trigger:"blur"}],address:[{required:!0,message:"请选择地区",trigger:"blur"}],type:[{required:!0,message:"请选择合同类型",trigger:"blur"}],overtimeWageFlag:[{required:!0,message:"请选择有无加班工资",trigger:"blur"}]}),U=()=>{J.value&&J.value.clearValidate(),N.isShowDialog=!1,N.loading=!1},W=()=>{J.value&&J.value.validate((e=>{e&&(N.loading=!0,"add"===D.type?r(N.ruleForm).then((e=>{e&&200===e.code?(o.success("新增合同模板成功"),v("ok"),U()):o.error(e.msg||"新增合同模板失败")}),(e=>{o.error(e&&e.msg||"新增合同模板失败")}))["finally"]((()=>{N.loading=!1})):"edit"===D.type&&t(N.ruleForm).then((e=>{e&&200===e.code?(o.success("编辑合同模板成功"),v("ok"),U()):o.error(e.msg||"编辑合同模板失败")}),(e=>{o.error(e&&e.msg||"编辑合同模板失败")}))["finally"]((()=>{N.loading=!1})))}))};return s({openDialog:async l=>{"edit"===D.type?(N.info=l,N.ruleForm=l,N.ruleForm.address=l.city||l.province):(N.ruleForm={},N.info=null),N.isShowDialog=!0,N.DICTS.personnel_type&&Object.keys(N.DICTS.personnel_type).length||I(),N.areaJson&&0!==N.areaJson.length||(N.areaJson=e())}}),(e,l)=>{const a=f("el-input"),o=f("el-form-item"),r=f("el-col"),t=f("el-tree-select"),s=f("el-option"),d=f("el-select"),u=f("el-row"),n=f("el-form"),i=f("el-button"),v=f("el-dialog");return y(),m("div",V,[p(v,{title:g(S),modelValue:N.isShowDialog,"onUpdate:modelValue":l[4]||(l[4]=e=>N.isShowDialog=e),width:"576px","close-on-click-modal":!1,onClose:U},{footer:c((()=>[F("span",C,[p(i,{onClick:U,size:"default"},{"default":c((()=>[k])),_:1}),p(i,{type:"primary",onClick:W,loading:N.loading,size:"default"},{"default":c((()=>[w])),_:1},8,["loading"])])])),"default":c((()=>[p(n,{ref_key:"formRef",ref:J,model:N.ruleForm,rules:T,size:"default","label-width":"120px"},{"default":c((()=>[p(u,null,{"default":c((()=>[p(r,{"class":"mb20"},{"default":c((()=>[p(o,{label:"模板名称",prop:"localName"},{"default":c((()=>[p(a,{modelValue:N.ruleForm.localName,"onUpdate:modelValue":l[0]||(l[0]=e=>N.ruleForm.localName=e),placeholder:"请输入模板名称",maxlength:"50",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),p(r,{"class":"mb20"},{"default":c((()=>[p(o,{label:"地区",prop:"address"},{"default":c((()=>[p(t,{modelValue:N.ruleForm.address,"onUpdate:modelValue":l[1]||(l[1]=e=>N.ruleForm.address=e),data:N.areaJson,style:{width:"100%"},placeholder:"请选择",props:N.areaProps,onCurrentChange:j,onClear:x,"node-key":"id","check-strictly":"",clearable:""},null,8,["modelValue","data","props"])])),_:1})])),_:1}),p(r,{"class":"mb20"},{"default":c((()=>[p(o,{label:"合同类型",prop:"type"},{"default":c((()=>[p(d,{modelValue:N.ruleForm.type,"onUpdate:modelValue":l[2]||(l[2]=e=>N.ruleForm.type=e),style:{width:"100%"}},{"default":c((()=>[(y(!0),m(_,null,b(N.DICTS.personnel_type,((e,l)=>(y(),h(s,{label:e,value:l,key:`${e}_${l}`},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),p(r,{"class":"mb20"},{"default":c((()=>[p(o,{label:"有无加班工资",prop:"overtimeWageFlag"},{"default":c((()=>[p(d,{modelValue:N.ruleForm.overtimeWageFlag,"onUpdate:modelValue":l[3]||(l[3]=e=>N.ruleForm.overtimeWageFlag=e),style:{width:"100%"}},{"default":c((()=>[p(s,{label:"无",value:"0"}),p(s,{label:"有",value:"1"})])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-c33f9a60"]]);export{S as default};