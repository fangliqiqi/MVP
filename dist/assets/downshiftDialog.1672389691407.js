import{s as e}from"./staff.1672389691407.js";import{d as a,f as l,$ as o,j as s,c as t,W as i,P as r,aD as d,a3 as n,o as u,a as m,u as c,F as f,a5 as p,O as g,U as v,ay as h,az as w}from"./vue.1672389691407.js";import{_,g as y,l as b,E as D}from"./index.1672389691407.js";const k=e=>(h("data-v-e0bc1f72"),e=e(),w(),e),x={"class":"downshift-archives-dialog"},F={"class":"tips"},R=v(),V=k((()=>m("span",{style:{"vertical-align":"text-bottom"}},"减档后，档案将流转到“离职库”",-1))),S={"class":"dialog-footer"},C=v("取 消"),j=v("确 定"),z=a({name:"downShiftDialog"});var I=_(Object.assign(z,{emits:["ok"],setup(a,{expose:v,emit:h}){d();const w=l(null),_=o({isShowDialog:!1,loading:!1,ruleForm:{},info:null,DICTS:{},dictKeys:["downshift_reason"]}),k=o({leaveReason:[{required:!0,message:"请选择减档原因",trigger:"change"}]});s((()=>{z()}));const z=async()=>{try{const e=await y(_.dictKeys);e&&(_.DICTS=e)}catch(e){}},I=()=>{_.ruleForm={},w.value&&w.value.clearValidate(),_.isShowDialog=!1},U=()=>{w.value&&w.value.validate((async a=>{if(a){_.loading=!0;try{const a=await e(_.ruleForm);a&&200===a.code?(D.success("减档成功"),h("ok"),I(),_.loading=!1):(D.error(a.msg||"减档失败，请联系管理员"),_.loading=!1)}catch(l){_.loading=!1,D.error("减档失败，请联系管理员")}}}))};return v({openDialog:async e=>{_.info=e,_.ruleForm={id:e.id},_.isShowDialog=!0}}),(e,a)=>{const l=n("el-icon"),o=n("el-option"),s=n("el-select"),d=n("el-form-item"),v=n("el-col"),h=n("el-input"),y=n("el-row"),D=n("el-form"),z=n("el-button"),T=n("el-dialog");return u(),t("div",x,[i(T,{title:"减档",modelValue:_.isShowDialog,"onUpdate:modelValue":a[2]||(a[2]=e=>_.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:I},{footer:r((()=>[m("span",S,[i(z,{onClick:I,size:"default"},{"default":r((()=>[C])),_:1}),i(z,{type:"primary",onClick:U,size:"default",loading:_.loading},{"default":r((()=>[j])),_:1},8,["loading"])])])),"default":r((()=>[m("div",F,[i(l,null,{"default":r((()=>[i(c(b))])),_:1}),R,V]),i(D,{ref_key:"formRef",ref:w,model:_.ruleForm,rules:k,size:"default","label-width":"90px"},{"default":r((()=>[i(y,{style:{"margin-top":"40px"}},{"default":r((()=>[i(v,{"class":"mb20"},{"default":r((()=>[i(d,{label:"减档原因",prop:"leaveReason"},{"default":r((()=>[i(s,{modelValue:_.ruleForm.leaveReason,"onUpdate:modelValue":a[0]||(a[0]=e=>_.ruleForm.leaveReason=e),placeholder:"请选择减档原因",style:{width:"100%"}},{"default":r((()=>[(u(!0),t(f,null,p(_.DICTS.downshift_reason,((e,a)=>(u(),g(o,{label:e,value:a,key:a},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),i(v,{"class":"mb20"},{"default":r((()=>[i(d,{label:"减档备注",prop:"leaveRemark"},{"default":r((()=>[i(h,{modelValue:_.ruleForm.leaveRemark,"onUpdate:modelValue":a[1]||(a[1]=e=>_.ruleForm.leaveRemark=e),type:"textarea",placeholder:"请输入减档备注",maxlength:"200",clearable:"",autosize:{minRows:2,maxRows:4},"show-word-limit":""},null,8,["modelValue"])])),_:1})])),_:1}),i(v,{"class":"mb20"},{"default":r((()=>[i(d)])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue"])])}}}),[["__scopeId","data-v-e0bc1f72"]]);export{I as default};