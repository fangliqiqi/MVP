import{c as e}from"./presendorder.1672389691407.js";import{E as l}from"./index.1672389691407.js";import{d as a,f as o,$ as r,c as i,W as s,P as t,a3 as d,o as n,a as m,U as u}from"./vue.1672389691407.js";const c={"class":"system-add-dic-container"},f={"class":"dialog-footer"},g=u("取 消"),p=u("确 定"),h=a({name:"editIspresend"}),w=Object.assign(h,{emits:["ok"],setup(a,{expose:u,emit:h}){const w=o(null),k=r({isShowDialog:!1,loading:!1,id:null,title:"取消派单",ruleForm:{id:"",dispatchFlag:"",cancelRemark:""}}),F={cancelRemark:[{required:!0,message:"请输入取消原因",trigger:"blur"}]},x=()=>{w.value.resetFields(),w.value.clearValidate(),k.ruleForm={},k.isShowDialog=!1,k.loading=!1},R=()=>{x()},_=()=>{w.value.validate((a=>{a&&(k.loading=!0,e(k.ruleForm).then((e=>{e&&200==e.code?(l.success("取消派单成功"),h("ok"),x()):l.error(e.msg||"取消派单失败")}),(()=>{l.error("取消派单失败")}))["finally"]((()=>{k.loading=!1})))}))};return u({openDialog:async e=>{e&&e.id&&(k.ruleForm.id=e.id,k.ruleForm.dispatchFlag="1",k.isShowDialog=!0)}}),(e,l)=>{const a=d("el-input"),o=d("el-form-item"),r=d("el-col"),u=d("el-row"),h=d("el-form"),y=d("el-button"),V=d("el-dialog");return n(),i("div",c,[s(V,{title:k.title,modelValue:k.isShowDialog,"onUpdate:modelValue":l[1]||(l[1]=e=>k.isShowDialog=e),width:"576px","close-on-click-modal":!1,onClose:x},{footer:t((()=>[m("span",f,[s(y,{onClick:R,size:"default"},{"default":t((()=>[g])),_:1}),s(y,{type:"primary",onClick:_,loading:k.loading,size:"default"},{"default":t((()=>[p])),_:1},8,["loading"])])])),"default":t((()=>[s(h,{ref_key:"formRef",ref:w,model:k.ruleForm,rules:F,size:"default","label-width":"110px"},{"default":t((()=>[s(u,null,{"default":t((()=>[s(r,{soan:24},{"default":t((()=>[s(o,{label:"取消原因",prop:"cancelRemark"},{"default":t((()=>[s(a,{type:"textarea",modelValue:k.ruleForm.cancelRemark,"onUpdate:modelValue":l[0]||(l[0]=e=>k.ruleForm.cancelRemark=e),autosize:{minRows:2,maxRows:4},placeholder:"请输入取消原因","show-word-limit":"",maxlength:"200",clearable:""},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{w as default};