import{_ as e,E as l,C as a}from"./index.1672389691407.js";import{d as o,$ as s,O as t,P as i,a3 as r,o as d,a as n,W as f,V as u,c,a5 as m,F as p,U as g}from"./vue.1672389691407.js";const h={"class":"text"},w=["onClick"],_=g("--"),k={"class":"dialog-footer"},b=g("关 闭"),y=o({name:"ReplyFileDetail"});var D=e(Object.assign(y,{setup(e,{expose:o}){const g=s({isShowDialog:!1,fileList:[],remark:""});return o({openDialog:async e=>{g.isShowDialog=!0,g.fileList=e.orderReplyEnclosure,g.remark=e.replyContent}}),(e,o)=>{const s=r("el-form-item"),y=r("el-col"),D=r("el-row"),v=r("el-form"),x=r("el-button"),C=r("el-dialog");return d(),t(C,{title:"详情",modelValue:g.isShowDialog,"onUpdate:modelValue":o[1]||(o[1]=e=>g.isShowDialog=e),"close-on-click-modal":!1,width:"538px",onClose:o[2]||(o[2]=e=>g.isShowDialog=!1)},{footer:i((()=>[n("span",k,[f(x,{onClick:o[0]||(o[0]=e=>g.isShowDialog=!1),size:"default"},{"default":i((()=>[b])),_:1})])])),"default":i((()=>[f(v,{ref:"formRef",model:g.ruleForm,rules:e.rules,size:"default","label-width":"70px"},{"default":i((()=>[f(D,null,{"default":i((()=>[f(y,{"class":"mb20"},{"default":i((()=>[f(s,{label:"回复内容","class":"reply"},{"default":i((()=>[n("div",h,u(g.remark||"--"),1)])),_:1})])),_:1}),f(y,{"class":"mb20"},{"default":i((()=>[f(s,{label:"附件","class":"file"},{"default":i((()=>[g.fileList&&g.fileList.length?(d(!0),c(p,{key:0},m(g.fileList,(e=>(d(),c("p",{key:e.id},[n("a",{onClick:o=>{return s=e,l.warning("正在下载"),void a(s.id).then((e=>{const l=(e.data||"").replace(/(http:|https:)/,location.protocol);window.open(l,"_blank")}));var s}},u(e.enclosureName),9,w)])))),128)):(d(),c(p,{key:1},[_],64))])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-1aeb32f1"]]);export{D as default};