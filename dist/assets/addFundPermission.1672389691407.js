import{P as e}from"./index.16723896914073.js";import{a}from"./contractPermission.16723896914072.js";import{g as l}from"./socialfundSet.1672389691407.js";import{c as o}from"./socialAndFundCheckPermission.1672389691407.js";import{E as t}from"./index.1672389691407.js";import{d as r,f as u,$ as s,c as d,W as n,P as i,a3 as m,o as p,a as c,U as f}from"./vue.1672389691407.js";const g={"class":"system-add-dic-container"},h={"class":"dialog-footer"},y=f("取 消"),N=f("确 定"),F=r({name:"addFundPermission"}),k=Object.assign(F,{emits:["ok"],setup(r,{expose:f,emit:F}){const k=u(null),_=u(null),V=s({isShowDialog:!1,id:null,loading:!1,title:"公积金办理权限新增",userOptions:[],fundHouseholdOptions:[],ruleForm:{userId:null,userName:null,userDeptName:null,deptName:null,fundHousehold:null,flag:1,houseNameType:1,status:0,authType:1}}),w={userId:[{required:!0,message:"请选择员工",trigger:"change"}],deptName:[{required:!0,message:"请选择",trigger:"change"}],fundHousehold:[{required:!0,message:"请选择公积金户",trigger:"change"}]},v=async e=>{try{e.fileStatus=0;const l=await a(e);if(l&&200==l.code&&l.data)return{current:l.data.current,total:l.data.total,data:l.data.records};t.error(l.msg)}catch(l){}return{current:1,total:0,data:[]}},D=async e=>{try{const a=await l(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records};t.error(a.msg)}catch(a){}return{current:1,total:0,data:[]}},H=e=>{V.ruleForm.userName=e.nickname,V.ruleForm.userDeptName=e.deptName,V.ruleForm.deptName=e.deptName,V.userOptions=[e]},S=e=>{V.fundHouseholdOptions=[e]},b=()=>{k.value&&k.value.resetFields(),V.ruleForm={userId:null,userName:null,userDeptName:null,deptName:null,fundHousehold:null,flag:1,houseNameType:1,status:0,authType:1},V.isShowDialog=!1,V.id=null,V.loading=!1},j=()=>{b()},x=()=>{k.value&&k.value.validate((e=>{e&&(V.loading=!0,o(V.ruleForm).then((e=>{e&&200==e.code?(t.success("新增公积金办理权限成功"),F("ok"),b()):t.error(e.msg||"新增公积金办理权限失败")}),(()=>{t.error("新增公积金办理权限失败")}))["finally"]((()=>{V.loading=!1})))}))};return f({openDialog:async e=>{V.isShowDialog=!0,V.loading=!1}}),(a,l)=>{const o=m("el-form-item"),t=m("el-col"),r=m("el-input"),u=m("el-row"),s=m("el-form"),f=m("el-button"),F=m("el-dialog");return p(),d("div",g,[n(F,{title:V.title,modelValue:V.isShowDialog,"onUpdate:modelValue":l[3]||(l[3]=e=>V.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:b},{footer:i((()=>[c("span",h,[n(f,{onClick:j,size:"default"},{"default":i((()=>[y])),_:1}),n(f,{type:"primary",onClick:x,loading:V.loading,size:"default"},{"default":i((()=>[N])),_:1},8,["loading"])])])),"default":i((()=>[n(s,{ref_key:"formRef",ref:k,model:V.ruleForm,rules:w,size:"default","label-width":"110px"},{"default":i((()=>[n(u,null,{"default":i((()=>[n(t,{span:24},{"default":i((()=>[n(o,{label:"员工姓名",prop:"userId"},{"default":i((()=>[n(e,{ref_key:"pageSelectRef",ref:_,modelValue:V.ruleForm.userId,"onUpdate:modelValue":l[0]||(l[0]=e=>V.ruleForm.userId=e),request:v,"value-key":"userId",title:"nickname",search:"nickname",placeholder:"请选择员工",options:V.userOptions,onChange:H},null,8,["modelValue","options"])])),_:1})])),_:1}),n(t,{span:24},{"default":i((()=>[n(o,{label:"所在部门",prop:"deptName"},{"default":i((()=>[n(r,{modelValue:V.ruleForm.deptName,"onUpdate:modelValue":l[1]||(l[1]=e=>V.ruleForm.deptName=e),placeholder:"所在部门",disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),n(t,{span:24},{"default":i((()=>[n(o,{label:"公积金户",prop:"fundHousehold"},{"default":i((()=>[n(e,{ref_key:"pageSelectRef",ref:_,modelValue:V.ruleForm.fundHousehold,"onUpdate:modelValue":l[2]||(l[2]=e=>V.ruleForm.fundHousehold=e),request:D,"value-key":"name",title:"name",search:"name",ext:{type:1},placeholder:"请选择公积金户",options:V.fundHouseholdOptions,onChange:S},null,8,["modelValue","options"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{k as default};