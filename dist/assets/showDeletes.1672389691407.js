import{_ as a}from"./index.1672389691407.js";import{d as e,$ as o,c as s,W as l,P as t,a3 as i,o as d,a as n,F as r,a5 as c,V as m,U as p}from"./vue.1672389691407.js";const u={"class":"system-add-dic-container"},g={style:{padding:"0 20px"}},y={key:0,style:{color:"green"}},f={key:1,style:{color:"red"}},h={"class":"dialog-footer"},k=p("关 闭"),w=e({name:"showDeletes"});var D=a(Object.assign(w,{emits:["ok"],setup(a,{expose:e,emit:w}){const D=o({isShowDialog:!1,title:"批量删除结果反馈",data:[]}),v=()=>{D.isShowDialog=!1,D.data=[]},x=()=>{v(),w("ok")};return e({openDialog:async(a,e)=>{D.data=a,D.isShowDialog=!0,D.title=e||"批量删除结果反馈"}}),(a,e)=>{const o=i("el-button"),w=i("el-dialog");return d(),s("div",u,[l(w,{title:D.title,modelValue:D.isShowDialog,"onUpdate:modelValue":e[0]||(e[0]=a=>D.isShowDialog=a),"close-on-click-modal":!1,width:"740px",onClose:v},{footer:t((()=>[n("span",h,[l(o,{type:"primary",onClick:x,size:"default"},{"default":t((()=>[k])),_:1})])])),"default":t((()=>[n("div",g,[n("ul",null,[(d(!0),s(r,null,c(D.data,((a,e)=>(d(),s("li",{key:e},[1==a.result?(d(),s("p",y,"申请编号:"+m(a.mainName)+"-成功",1)):(d(),s("p",f,[p("申请编号:"+m(a.mainName)+"-失败 ",1),n("span",null,"（原因："+m(a.errorInfo)+"）",1)]))])))),128))])])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-13049d40"]]);export{D as default};