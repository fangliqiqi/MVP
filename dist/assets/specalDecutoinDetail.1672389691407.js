import{a as e,b as l}from"./specialdeduction.1672389691407.js";import{_ as a,E as t,a as o}from"./index.1672389691407.js";import{d as r,f as s,$ as i,c as n,W as d,P as u,a3 as c,o as m,a as f,U as p}from"./vue.1672389691407.js";const g={"class":"archives-add-electronic-container"},h={"class":"dialog-footer"},w=p("取 消"),y=p("确 定"),v=r({name:"batchDelete"});var T=a(Object.assign(v,{emits:["ok"],setup(a,{expose:r,emit:p}){const v=s(null),T=i({isShowDialog:!1,id:null,title:"删除本月数据",ruleForm:{declareTitle:null},fileList:[],literatureTypesDataSource:{},options:[]}),_={declareTitle:[{required:!0,message:"请输入申报单位"}]},x=()=>{T.ruleForm={},T.isShowDialog=!1,v.value&&v.value.clearValidate()},b=()=>{x()},F=()=>{v.value&&v.value.validate((l=>{T.loading=!0,l&&e(T.ruleForm).then((e=>{e&&200==e.code?"0"!=e.data&&e.data?D(e.data):t.error("未查询到当月可删除数据"):t.error(e.msg||"未查询到当月可删除数据")}),(()=>{t.error("未查询到当月可删除数据")}))["finally"]((e=>{T.loading=!1}))}))},D=e=>{const a=e,r=`<p style="font-size:16px;font-weight:600">是否确定删除?<br/>\n        <span style="font-size:14px;font-weight:400"><strong>[${T.ruleForm.declareTitle}]</strong> 共计<strong> ${a} </strong>数据，确认是否全部删除？</span> <br/> \n\t\t\t\t<span style="color:red;font-size:14px;font-weight:400">删除后，专项扣除信息将从系统消失，请谨慎操作！</span></p>`;o.confirm(r,{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0}).then((async()=>{try{const e=await l(T.ruleForm);e&&200===e.code?(t.success("删除成功"),p("ok"),x()):t.error(e.msg||"删除失败")}catch(e){t.error(e&&e.msg||"删除失败")}}))["catch"]((()=>{}))};return r({openDialog:async e=>{T.title="删除本月数据",T.ruleForm={declareTitle:null},setTimeout((()=>{v.value&&v.value.clearValidate()}),100),T.isShowDialog=!0}}),(e,l)=>{const a=c("el-input"),t=c("el-form-item"),o=c("el-col"),r=c("el-row"),s=c("el-form"),i=c("el-button"),p=c("el-dialog");return m(),n("div",g,[d(p,{title:T.title,modelValue:T.isShowDialog,"onUpdate:modelValue":l[1]||(l[1]=e=>T.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:x},{footer:u((()=>[f("span",h,[d(i,{onClick:b,size:"default"},{"default":u((()=>[w])),_:1}),d(i,{type:"primary",onClick:F,size:"default"},{"default":u((()=>[y])),_:1})])])),"default":u((()=>[d(s,{ref_key:"formRef",ref:v,model:T.ruleForm,rules:_,size:"default","label-width":"140px"},{"default":u((()=>[d(r,null,{"default":u((()=>[d(o,{"class":"mb20"},{"default":u((()=>[d(t,{label:"申报单位",prop:"declareTitle"},{"default":u((()=>[d(a,{modelValue:T.ruleForm.declareTitle,"onUpdate:modelValue":l[0]||(l[0]=e=>T.ruleForm.declareTitle=e),placeholder:"请输入",autocomplete:"off"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-0919a919"]]);export{T as default};