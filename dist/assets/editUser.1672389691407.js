import{E as e,ak as l}from"./index.1672389691407.js";import{c as a}from"./role.1672389691407.js";import{g as o}from"./dept.1672389691407.js";import{d as r,$ as u,f as s,j as t,c as d,W as m,P as p,a3 as i,o as n,a as c,F as f,a5 as g,O as b,U as F}from"./vue.1672389691407.js";const V={"class":"system-add-user-container"},_=F("有效"),h=F("锁定"),x={"class":"dialog-footer"},k=F("取 消"),v=F("确 定"),y=r({name:"systemEditUser"}),w=Object.assign(y,{emits:["ok"],setup(r,{expose:F,emit:y}){const w=u({isShowDialog:!1,title:"编辑用户",ruleForm:{username:"",deptId:"",phone:"",roleList:[],email:"",post:"",group:"",lockFlag:"1"},deptData:[],userGroupOptions:[],postTypeOptions:[],roleLists:[]}),L=s(null),U=u({userGroup:[{required:!0,message:"请选择用户组",trigger:"blur"}],roleList:[{required:!0,message:"请选择角色",trigger:"blur"}],lockFlag:[{required:!0,message:"请选择用户状态",trigger:"blur"}],post:[{required:!0,message:"请选择职务",trigger:"blur"}]}),D=()=>{w.isShowDialog=!1,w.ruleForm={},L.value.resetFields()},O=()=>{D()},G=s(!1),I=()=>{L.value.validate((a=>{if(a){G.value=!0;let a={};a=w.ruleForm,a.role=w.ruleForm.roleList.map((e=>e.roleId||e)),l(a).then((l=>{200===l.code?(D(),y("ok"),e.success("编辑用户成功")):e.error(l.msg)}))["catch"]()["finally"]((()=>{G.value=!1}))}}))},j=e=>{let l=[];return e.forEach((e=>{let a={};a.label=e.name,a.value=e.id,e.children&&(a.children=j(e.children)),l.push(a)})),l};return t((()=>{a().then((l=>{200===l.code?w.roleLists=l.data:(w.roleLists=[],e.error(l.msg))})),o().then((l=>{200===l.code?w.deptData=j(l.data):(w.deptData=[],e.error(l.msg))}))})),F({openDialog:(e,l)=>{w.ruleForm=e,w.ruleForm.roleList=w.ruleForm.roleList.map((e=>e.roleId||e)),w.userGroupOptions=l.userGroupOptions,w.postTypeOptions=l.postTypeOptions,w.isShowDialog=!0}}),(e,l)=>{const a=i("el-input"),o=i("el-form-item"),r=i("el-col"),u=i("el-tree-select"),s=i("el-option"),t=i("el-select"),F=i("el-radio"),y=i("el-radio-group"),D=i("el-row"),j=i("el-form"),S=i("el-button"),q=i("el-dialog");return n(),d("div",V,[m(q,{title:w.title,modelValue:w.isShowDialog,"onUpdate:modelValue":l[9]||(l[9]=e=>w.isShowDialog=e),width:"769px",onClose:O,"close-on-click-modal":!1},{footer:p((()=>[c("span",x,[m(S,{onClick:O,size:"default"},{"default":p((()=>[k])),_:1}),m(S,{type:"primary",loading:G.value,onClick:I,size:"default"},{"default":p((()=>[v])),_:1},8,["loading"])])])),"default":p((()=>[m(j,{model:w.ruleForm,ref_key:"ruleForm",ref:L,rules:U,size:"default","label-width":"90px"},{"default":p((()=>[m(D,{gutter:35},{"default":p((()=>[m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"姓名",prop:"nickname"},{"default":p((()=>[m(a,{modelValue:w.ruleForm.nickname,"onUpdate:modelValue":l[0]||(l[0]=e=>w.ruleForm.nickname=e),disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"用户名",prop:"username"},{"default":p((()=>[m(a,{modelValue:w.ruleForm.username,"onUpdate:modelValue":l[1]||(l[1]=e=>w.ruleForm.username=e),disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"所属部门",prop:"deptId"},{"default":p((()=>[m(u,{placeholder:"请选择所属部门",modelValue:w.ruleForm.deptId,"onUpdate:modelValue":l[2]||(l[2]=e=>w.ruleForm.deptId=e),data:w.deptData,disabled:"","check-strictly":"",clearable:"",filterable:"","class":"w100"},null,8,["modelValue","data"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"手机号",prop:"phone"},{"default":p((()=>[m(a,{modelValue:w.ruleForm.phone,"onUpdate:modelValue":l[3]||(l[3]=e=>w.ruleForm.phone=e),placeholder:"请输入手机号",disabled:"",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"邮箱",prop:"email"},{"default":p((()=>[m(a,{modelValue:w.ruleForm.email,"onUpdate:modelValue":l[4]||(l[4]=e=>w.ruleForm.email=e),placeholder:"请输入邮箱",disabled:"",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"角色",prop:"roleList"},{"default":p((()=>[m(t,{modelValue:w.ruleForm.roleList,"onUpdate:modelValue":l[5]||(l[5]=e=>w.ruleForm.roleList=e),placeholder:"请选择",multiple:"",clearable:"",filterable:"","collapse-tags":"","collapse-tags-tooltip":"","class":"w100"},{"default":p((()=>[(n(!0),d(f,null,g(w.roleLists,(e=>(n(),b(s,{key:e.roleId,label:e.roleName,value:e.roleId},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"职务",prop:"post"},{"default":p((()=>[m(t,{modelValue:w.ruleForm.post,"onUpdate:modelValue":l[6]||(l[6]=e=>w.ruleForm.post=e),placeholder:"请选择",clearable:"","class":"w100"},{"default":p((()=>[(n(!0),d(f,null,g(w.postTypeOptions,(e=>(n(),b(s,{key:e.id,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"用户组",prop:"userGroup"},{"default":p((()=>[m(t,{modelValue:w.ruleForm.userGroup,"onUpdate:modelValue":l[7]||(l[7]=e=>w.ruleForm.userGroup=e),placeholder:"请选择",clearable:"","class":"w100"},{"default":p((()=>[(n(!0),d(f,null,g(w.userGroupOptions,(e=>(n(),b(s,{key:e.id,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(r,{xs:24,sm:12,md:12,lg:12,xl:12},{"default":p((()=>[m(o,{label:"状态",prop:"lockFlag"},{"default":p((()=>[m(y,{modelValue:w.ruleForm.lockFlag,"onUpdate:modelValue":l[8]||(l[8]=e=>w.ruleForm.lockFlag=e)},{"default":p((()=>[m(F,{label:"0"},{"default":p((()=>[_])),_:1}),m(F,{label:"9"},{"default":p((()=>[h])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])])}}});export{w as default};