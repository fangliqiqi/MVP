import{a as e}from"./contractPermission.16723896914072.js";import{e as a,c as l}from"./socialAndFundCheckPermission.1672389691407.js";import{E as o}from"./index.1672389691407.js";import{P as r}from"./index.16723896914073.js";import{d as t,f as u,$ as s,c as n,W as d,P as m,a3 as i,o as c,a as p,U as f}from"./vue.1672389691407.js";const g={"class":"system-add-dic-container"},h=f("社保户"),F=f("公积金户"),y={"class":"dialog-footer"},k=f("取 消"),_=f("确 定"),N=t({name:"addSocialAndFundCheckPermission"}),V=Object.assign(N,{emits:["ok"],setup(t,{expose:f,emit:N}){const V=u(null),v=u(null),b=s({isShowDialog:!1,id:null,loading:!1,title:"社保公积金审核权限新增",ruleForm:{type:"",status:"0",flag:"0"},userOptions:[],houseOptions:[],houseNameType:"社保户"}),w={nickname:[{required:!0,message:"请输入员工姓名",trigger:"change"}],deptName:[{required:!0,message:"所在部门不能为空",trigger:"change"}],flag:[{required:!0,message:"请选择户类型",trigger:"change"}],name:[{required:!0,message:"请输入户信息",trigger:"change"}]},O=async a=>{try{const l=await e(a);if(l&&200==l.code&&l.data)return{current:l.data.current,total:l.data.total,data:l.data.records};o.error(l.msg)}catch(l){}return{current:1,total:0,data:[]}},j=e=>{b.ruleForm.userId=e.userId,b.ruleForm.userName=e.nickname,b.ruleForm.userDeptName=e.deptName,b.ruleForm.deptName=e.deptName,b.userOptions=[e]},C=e=>{"0"==b.ruleForm.flag?(b.ruleForm.socialHousehold=e.name,b.ruleForm.fundHousehold=""):(b.ruleForm.socialHousehold="",b.ruleForm.fundHousehold=e.name),b.houseOptions=[e]},D=async e=>{try{e=Object.assign({},{type:b.ruleForm.flag},e);const l=await a(e);if(l&&200==l.code&&l.data)return{current:l.data.current,total:l.data.total,data:l.data.records};o.error(l.msg)}catch(l){}return{current:1,total:0,data:[]}},S=()=>{V.value&&V.value.resetFields(),b.ruleForm={},b.isShowDialog=!1,b.id=null,b.loading=!1,b.houseNameType="社保户"},T=()=>{S()},q=()=>{V.value&&V.value.validate((e=>{if(e){b.loading=!0;let{deptName:e,flag:a,name:r,nickname:t,type:u,...s}=b.ruleForm,n={houseNameType:b.ruleForm.flag,authType:0,flag:b.ruleForm.flag},d=Object.assign({},n,s);l(d).then((e=>{e&&200==e.code?(o.success("新增审核权限成功"),N("ok"),S()):o.error(e.msg||"新增审核权限失败")}),(()=>{o.error("新增审核权限失败")}))["finally"]((()=>{b.loading=!1,b.houseNameType="社保户"}))}}))};return f({openDialog:async e=>{b.isShowDialog=!0,b.loading=!1,b.ruleForm.flag="0"}}),(e,a)=>{const l=i("el-form-item"),o=i("el-col"),t=i("el-input"),u=i("el-option"),s=i("el-select"),f=i("el-row"),N=i("el-form"),x=i("el-button"),U=i("el-dialog");return c(),n("div",g,[d(U,{title:b.title,modelValue:b.isShowDialog,"onUpdate:modelValue":a[5]||(a[5]=e=>b.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:S},{footer:m((()=>[p("span",y,[d(x,{onClick:T,size:"default"},{"default":m((()=>[k])),_:1}),d(x,{type:"primary",onClick:q,loading:b.loading,size:"default"},{"default":m((()=>[_])),_:1},8,["loading"])])])),"default":m((()=>[d(N,{ref_key:"formRef",ref:V,model:b.ruleForm,rules:w,size:"default","label-width":"110px"},{"default":m((()=>[d(f,null,{"default":m((()=>[d(o,{span:24},{"default":m((()=>[d(l,{label:"员工姓名",prop:"nickname"},{"default":m((()=>[d(r,{ref:"pageSelectRef",modelValue:b.ruleForm.nickname,"onUpdate:modelValue":a[0]||(a[0]=e=>b.ruleForm.nickname=e),request:O,"value-key":"nickname",title:"nickname",search:"nickname",placeholder:"请选择员工",options:b.userOptions,onChange:j},null,8,["modelValue","options"])])),_:1})])),_:1}),d(o,{span:24},{"default":m((()=>[d(l,{label:"所在部门",prop:"deptName"},{"default":m((()=>[d(t,{modelValue:b.ruleForm.deptName,"onUpdate:modelValue":a[1]||(a[1]=e=>b.ruleForm.deptName=e),placeholder:"所在部门",disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),d(o,{span:24},{"default":m((()=>[d(l,{label:"户类型",prop:"flag"},{"default":m((()=>[d(s,{modelValue:b.ruleForm.flag,"onUpdate:modelValue":a[2]||(a[2]=e=>b.ruleForm.flag=e),style:{width:"100%"},placeholder:"请选择户类型",onChange:a[3]||(a[3]=e=>{return a=e,b.ruleForm.flag=a,b.houseNameType=1==a?"公积金户":"社保户",b.ruleForm.name="",void v.value.loadData();var a})},{"default":m((()=>[d(u,{value:"0",label:"社保户"},{"default":m((()=>[h])),_:1}),d(u,{value:"1",label:"公积金户"},{"default":m((()=>[F])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),d(o,{span:24},{"default":m((()=>[d(l,{label:b.houseNameType,prop:"name"},{"default":m((()=>[d(r,{ref_key:"pageSelectRef1",ref:v,modelValue:b.ruleForm.name,"onUpdate:modelValue":a[4]||(a[4]=e=>b.ruleForm.name=e),request:D,"value-key":"id",title:"name",search:"name",placeholder:"请选择户信息",options:b.houseOptions,onChange:C},null,8,["modelValue","options"])])),_:1},8,["label"])])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{V as default};