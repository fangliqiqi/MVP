import{a as e}from"./contractPermission.16723896914072.js";import{c as a,e as l}from"./socialHandlePermission.16723896914072.js";import{P as o}from"./index.16723896914073.js";import{E as t}from"./index.1672389691407.js";import{d as r,f as s,$ as n,c as i,W as d,P as u,a3 as m,o as c,a as p,U as f}from"./vue.1672389691407.js";const g={"class":"system-add-dic-container"},h={"class":"dialog-footer"},y=f("取 消"),k=f("确 定"),F=r({name:"addSocialHandlePermission"}),_=Object.assign(F,{emits:["ok"],setup(r,{expose:f,emit:F}){const _=s(null),N=s(null),V=n({isShowDialog:!1,id:null,loading:!1,title:"社保权限新增",ruleForm:{type:"",status:"0"},userOptions:[],houseOptions:[],houseNameType:"社保户"}),w={nickname:[{required:!0,message:"请输入员工姓名",trigger:"change"}],deptName:[{required:!0,message:"所在部门不能为空",trigger:"change"}],name:[{required:!0,message:"请输入户信息",trigger:"change"}]},b=async a=>{try{const l=await e(a);if(l&&200==l.code&&l.data)return{current:l.data.current,total:l.data.total,data:l.data.records};t.error(l.msg)}catch(l){}return{current:1,total:0,data:[]}},v=e=>{V.ruleForm.userId=e.userId,V.ruleForm.userName=e.nickname,V.ruleForm.userDeptName=e.deptName,V.ruleForm.deptName=e.deptName,V.userOptions=[e]},O=e=>{V.ruleForm.socialHousehold=e.name,V.houseOptions=[e]},j=async e=>{try{e=Object.assign({},{type:0},e);const l=await a(e);if(l&&200==l.code&&l.data)return{current:l.data.current,total:l.data.total,data:l.data.records};t.error(l.msg)}catch(l){}return{current:1,total:0,data:[]}},S=()=>{_.value&&_.value.resetFields(),V.ruleForm={},V.isShowDialog=!1,V.id=null,V.loading=!1},D=()=>{S()},x=()=>{_.value&&_.value.validate((e=>{if(e){V.loading=!0;let{deptName:e,flag:a,name:o,nickname:r,type:s,...n}=V.ruleForm,i={flag:0,houseNameType:0,authType:1},d=Object.assign({},i,n);l(d).then((e=>{e&&200==e.code?(t.success("新增社保办理权限成功"),F("ok"),S()):t.error(e.msg||"新增社保办理权限失败")}),(()=>{t.error("新增社保办理权限失败")}))["finally"]((()=>{V.loading=!1}))}}))};return f({openDialog:async e=>{V.isShowDialog=!0,V.loading=!1}}),(e,a)=>{const l=m("el-form-item"),t=m("el-col"),r=m("el-input"),s=m("el-row"),n=m("el-form"),f=m("el-button"),F=m("el-dialog");return c(),i("div",g,[d(F,{title:V.title,modelValue:V.isShowDialog,"onUpdate:modelValue":a[3]||(a[3]=e=>V.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:S},{footer:u((()=>[p("span",h,[d(f,{onClick:D,size:"default"},{"default":u((()=>[y])),_:1}),d(f,{type:"primary",onClick:x,loading:V.loading,size:"default"},{"default":u((()=>[k])),_:1},8,["loading"])])])),"default":u((()=>[d(n,{ref_key:"formRef",ref:_,model:V.ruleForm,rules:w,size:"default","label-width":"110px"},{"default":u((()=>[d(s,null,{"default":u((()=>[d(t,{span:24},{"default":u((()=>[d(l,{label:"员工姓名",prop:"nickname"},{"default":u((()=>[d(o,{ref_key:"pageSelectRef",ref:N,modelValue:V.ruleForm.nickname,"onUpdate:modelValue":a[0]||(a[0]=e=>V.ruleForm.nickname=e),request:b,"value-key":"nickname",title:"nickname",search:"nickname",placeholder:"请选择员工",options:V.userOptions,onChange:v},null,8,["modelValue","options"])])),_:1})])),_:1}),d(t,{span:24},{"default":u((()=>[d(l,{label:"所在部门",prop:"deptName"},{"default":u((()=>[d(r,{modelValue:V.ruleForm.deptName,"onUpdate:modelValue":a[1]||(a[1]=e=>V.ruleForm.deptName=e),placeholder:"所在部门",disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),d(t,{span:24},{"default":u((()=>[d(l,{label:"社保户",prop:"name"},{"default":u((()=>[d(o,{ref_key:"pageSelectRef",ref:N,modelValue:V.ruleForm.name,"onUpdate:modelValue":a[2]||(a[2]=e=>V.ruleForm.name=e),request:j,"value-key":"id",title:"name",search:"name",placeholder:"请选择户信息",options:V.houseOptions,onChange:O},null,8,["modelValue","options"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{_ as default};