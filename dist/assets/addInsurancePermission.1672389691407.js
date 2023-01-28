import{P as e}from"./index.16723896914073.js";import{_ as a}from"./index.167238969140713.js";import{a as r}from"./contractPermission.16723896914072.js";import{s as l,E as o}from"./index.1672389691407.js";import{d as n,f as s,$ as t,c as u,W as i,P as d,a3 as m,o as c,a as p,U as f}from"./vue.1672389691407.js";async function g(e){return l({url:"/yifu-insurances/method/tinsuranceareares/page",method:"GET",params:e})}async function y(e){return l({url:"/yifu-insurances/method/tinsuranceareares/export",method:"POST",responseType:"blob",data:e})}async function h(e){return l({url:"/yifu-insurances/method/tinsuranceareares/"+e,method:"DELETE"})}async function _(e){return l({url:"/yifu-insurances/method/tinsuranceareares/updateStatus",method:"PUT",params:e})}const v={"class":"system-add-dic-container"},F={"class":"dialog-footer"},b=f("取 消"),k=f("确 定"),S=n({name:"addInsurancePermission"}),w=Object.assign(S,{emits:["ok"],setup(n,{expose:f,emit:g}){const y=s(null),h=s(null),_=s(null),S=t({isShowDialog:!1,id:null,loading:!1,title:"商险办理权限新增",address:null,options:[],ruleForm:{userId:null,userName:null,organName:null,province:null,city:null,status:0}}),w={userId:[{required:!0,message:"请选择员工",trigger:"change"}],organName:[{required:!0,message:"请选择所在部门",trigger:"change"}],province:[{required:!0,message:"请选择办理地",trigger:"change"}]},N=async e=>{try{e.fileStatus=0;const a=await r(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records};o.error(a.msg)}catch(a){}return{current:1,total:0,data:[]}},V=e=>{S.ruleForm.organName=e.deptName,S.ruleForm.userName=e.nickname,S.options=[e]},j=e=>{S.ruleForm.province=e.pro,S.ruleForm.city=e.city,S.address=e.city||e.pro},x=e=>{S.ruleForm.province=null,S.ruleForm.city=null,S.address=null},I=()=>{y.value&&y.value.resetFields(),S.ruleForm={userId:null,userName:null,organName:null,province:null,city:null,status:0},S.address=null,S.isShowDialog=!1,S.id=null,S.loading=!1},P=()=>{I()},T=()=>{y.value&&y.value.validate((e=>{e&&(S.loading=!0,async function(e){return l({url:"/yifu-insurances/method/tinsuranceareares",method:"POST",data:e})}(S.ruleForm).then((e=>{e&&200==e.code?(o.success("新增商险办理权限成功"),g("ok"),I()):o.error(e.msg||"新增商险办理权限失败")}),(()=>{o.error("新增商险办理权限失败")}))["finally"]((()=>{S.loading=!1})))}))};return f({openDialog:async e=>{S.isShowDialog=!0,S.loading=!1}}),(r,l)=>{const o=m("el-form-item"),n=m("el-col"),s=m("el-input"),t=m("el-row"),f=m("el-form"),g=m("el-button"),C=m("el-dialog");return c(),u("div",v,[i(C,{title:S.title,modelValue:S.isShowDialog,"onUpdate:modelValue":l[2]||(l[2]=e=>S.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:I},{footer:d((()=>[p("span",F,[i(g,{onClick:P,size:"default"},{"default":d((()=>[b])),_:1}),i(g,{type:"primary",onClick:T,loading:S.loading,size:"default"},{"default":d((()=>[k])),_:1},8,["loading"])])])),"default":d((()=>[i(f,{ref_key:"formRef",ref:y,model:S.ruleForm,rules:w,size:"default","label-width":"110px"},{"default":d((()=>[i(t,null,{"default":d((()=>[i(n,{span:24},{"default":d((()=>[i(o,{label:"员工姓名",prop:"userId"},{"default":d((()=>[i(e,{ref_key:"pageSelectRef",ref:h,modelValue:S.ruleForm.userId,"onUpdate:modelValue":l[0]||(l[0]=e=>S.ruleForm.userId=e),request:N,"value-key":"userId",title:"nickname",search:"nickname",placeholder:"请选择员工",options:S.options,onChange:V},null,8,["modelValue","options"])])),_:1})])),_:1}),i(n,{span:24},{"default":d((()=>[i(o,{label:"所在部门",prop:"organName"},{"default":d((()=>[i(s,{modelValue:S.ruleForm.organName,"onUpdate:modelValue":l[1]||(l[1]=e=>S.ruleForm.organName=e),placeholder:"所在部门",disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),i(n,{span:24},{"default":d((()=>[i(o,{label:"办理地",prop:"province"},{"default":d((()=>[i(a,{ref_key:"pageAreaRef",ref:_,address:S.address,onCurrentChange:j,onClear:x,hasTown:!1,style:{width:"100%"}},null,8,["address"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});var N=Object.freeze(Object.defineProperty({__proto__:null,"default":w},Symbol.toStringTag,{value:"Module"}));export{w as _,N as a,h as d,y as e,g,_ as u};