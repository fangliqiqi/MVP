import{a as e}from"./currentRemuneration.16723896914072.js";import{_ as l,E as a}from"./index.1672389691407.js";import{d as o,f as t,$ as r,c as i,W as s,P as u,a3 as d,o as n,a as m,U as c}from"./vue.1672389691407.js";const f={"class":"archives-add-electronic-container"},p={"class":"dialog-footer"},h=c("取 消"),v=c("确 定"),g=o({name:"currentremunerationdilog"});var _=l(Object.assign(g,{emits:["ok"],setup(l,{expose:o,emit:c}){const g=t(null),_=r({isShowDialog:!1,id:null,title:"批量删除",ruleForm:{declareMonth:null},fileList:[],literatureTypesDataSource:{},options:[]}),M={declareMonth:[{required:!0,message:"请选择月份"}]},w=()=>{_.ruleForm={},_.isShowDialog=!1,g.value&&g.value.clearValidate()},y=()=>{w()},V=t(!1),Y=()=>{g.value&&g.value.validate((l=>{l&&(V.value=!0,e(_.ruleForm).then((e=>{e&&200==e.code?(c("ok"),w(),a.success("删除成功")):a.error(e.msg||"删除失败")}),(()=>{a.error("删除失败")}))["finally"]((e=>{V.value=!1})))}))};return o({openDialog:async e=>{_.title="批量删除",_.ruleForm={declareMonth:null},setTimeout((()=>{g.value&&g.value.clearValidate()}),100),_.isShowDialog=!0}}),(e,l)=>{const a=d("el-date-picker"),o=d("el-form-item"),t=d("el-col"),r=d("el-row"),c=d("el-form"),k=d("el-button"),D=d("el-dialog");return n(),i("div",f,[s(D,{title:_.title,modelValue:_.isShowDialog,"onUpdate:modelValue":l[1]||(l[1]=e=>_.isShowDialog=e),width:"576px","close-on-click-modal":!1,onClose:w},{footer:u((()=>[m("span",p,[s(k,{onClick:y,size:"default"},{"default":u((()=>[h])),_:1}),s(k,{type:"primary",onClick:Y,loading:V.value,size:"default"},{"default":u((()=>[v])),_:1},8,["loading"])])])),"default":u((()=>[s(c,{ref_key:"formRef",ref:g,model:_.ruleForm,rules:M,size:"default","label-width":"140px"},{"default":u((()=>[s(r,null,{"default":u((()=>[s(t,{"class":"mb20"},{"default":u((()=>[s(o,{label:"申报月份",prop:"declareMonth"},{"default":u((()=>[s(a,{modelValue:_.ruleForm.declareMonth,"onUpdate:modelValue":l[0]||(l[0]=e=>_.ruleForm.declareMonth=e),type:"month",placeholder:"请选择申报月份",style:{width:"100%"},format:"YYYYMM","value-format":"YYYYMM"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-15111545"]]);export{_ as default};