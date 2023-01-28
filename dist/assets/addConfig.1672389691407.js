import{d as e,f as l,$ as a,c as o,W as r,P as t,ax as u,a3 as m,o as d,a as s,O as p,T as n,U as i}from"./vue.1672389691407.js";import c from"./PreviewDialog.1672389691407.js";import{s as f,_ as b,E as y}from"./index.1672389691407.js";async function g(e){return f({url:"/yifu-codegen/method/generator/page",method:"GET",params:e})}async function F(){return f({url:"/yifu-codegen/method/dsconf/list",method:"GET"})}const _={"class":"system-add-config-container"},h=i("原生ELEMENT"),V=i("数据驱动AVUE"),N={"class":"dialog-footer"},E=i("取 消"),x=i("生 成"),U=i("预 览"),w=e({name:"systemAddConfig"});var k=b(Object.assign(w,{setup(e,{expose:i}){const b=l(null);u();const g=a({isShowDialog:!1,title:"生成配置",type:0,ruleForm:{$style:"数据驱动AVUE",tableName:"",packageName:"",author:"",moduleName:"",tablePrefix:"",comments:"",style:0},ext:{}}),F=()=>{g.isShowDialog=!1},w=()=>{g.ruleForm.$style=0==g.ruleForm.style?"数据驱动AVUE":"原生ELEMENT",async function(e){return f({url:"/yifu-codegen/method/generator/preview",method:"GET",params:e})}(Object.assign({},g.ruleForm,g.ext)).then((e=>{e&&200==e.code?b.value.openDialog(e.data):y.error(e.msg||"预览生成失败")}),(()=>{y.error("预览生成失败")}))},k=()=>{g.ruleForm.$style=0==g.ruleForm.style?"数据驱动AVUE":"原生ELEMENT",async function(e){return f({url:"/yifu-codegen/method/generator/code",method:"POST",data:e,responseType:"blob"})}(Object.assign({},g.ruleForm,g.ext)).then((e=>{e&&200==e.code?y.success("生成代码成功"):y.error(e.msg||"生成代码失败")}),(()=>{y.error("生成代码失败")}))};return i({openDialog:(e,l,a)=>{g.type=l,g.ext=a,g.ruleForm={$style:"数据驱动AVUE",tableName:e.tableName,packageName:"",author:"",moduleName:"",tablePrefix:"",comments:"",style:0},g.isShowDialog=!0}}),(e,l)=>{const a=m("el-input"),u=m("el-form-item"),i=m("el-col"),f=m("el-radio-button"),y=m("el-radio-group"),T=m("el-row"),v=m("el-form"),D=m("el-button"),P=m("el-dialog");return d(),o("div",_,[r(P,{title:g.title,modelValue:g.isShowDialog,"onUpdate:modelValue":l[7]||(l[7]=e=>g.isShowDialog=e),width:"880px"},{footer:t((()=>[s("span",N,[r(D,{onClick:F,size:"default"},{"default":t((()=>[E])),_:1}),r(D,{type:"primary",onClick:k,size:"default"},{"default":t((()=>[x])),_:1}),0===g.type?(d(),p(D,{key:0,type:"primary",onClick:w,size:"default"},{"default":t((()=>[U])),_:1})):n("",!0)])])),"default":t((()=>[r(v,{model:g.ruleForm,size:"default","label-width":"80px"},{"default":t((()=>[r(T,null,{"default":t((()=>[r(i,{span:0===e.type?12:24,"class":"mb20"},{"default":t((()=>[r(u,{prop:g.ruleForm.tableName,label:"表名称"},{"default":t((()=>[r(a,{modelValue:g.ruleForm.tableName,"onUpdate:modelValue":l[0]||(l[0]=e=>g.ruleForm.tableName=e),placeholder:"请输入表名称",disabled:""},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1},8,["span"]),r(i,{span:12,"class":"mb20"},{"default":t((()=>[r(u,{label:"包名",prop:g.ruleForm.packageName},{"default":t((()=>[r(a,{modelValue:g.ruleForm.packageName,"onUpdate:modelValue":l[1]||(l[1]=e=>g.ruleForm.packageName=e),placeholder:"可以为空，加载系统默认配置"},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1}),r(i,{span:12,"class":"mb20"},{"default":t((()=>[r(u,{label:"作者",prop:g.ruleForm.author},{"default":t((()=>[r(a,{modelValue:g.ruleForm.author,"onUpdate:modelValue":l[2]||(l[2]=e=>g.ruleForm.author=e),placeholder:"可以为空，加载系统默认配置"},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1}),r(i,{span:12,"class":"mb20"},{"default":t((()=>[r(u,{label:"模块",prop:g.ruleForm.moduleName},{"default":t((()=>[r(a,{modelValue:g.ruleForm.moduleName,"onUpdate:modelValue":l[3]||(l[3]=e=>g.ruleForm.moduleName=e),placeholder:"可以为空，加载系统默认配置",clearable:""},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1}),0===g.type?(d(),p(i,{key:0,span:12,"class":"mb20"},{"default":t((()=>[r(u,{label:"表前缀",prop:g.ruleForm.tablePrefix},{"default":t((()=>[r(a,{modelValue:g.ruleForm.tablePrefix,"onUpdate:modelValue":l[4]||(l[4]=e=>g.ruleForm.tablePrefix=e),placeholder:"可以为空，加载系统默认配置",clearable:""},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1})):n("",!0),r(i,{span:12,"class":"mb20"},{"default":t((()=>[r(u,{label:"注释",prop:g.ruleForm.comments},{"default":t((()=>[r(a,{modelValue:g.ruleForm.comments,"onUpdate:modelValue":l[5]||(l[5]=e=>g.ruleForm.comments=e),placeholder:"可以为空，加载系统默认配置",clearable:""},null,8,["modelValue"])])),_:1},8,["prop"])])),_:1}),r(u,{label:"前端风格",prop:g.ruleForm.style},{"default":t((()=>[r(y,{modelValue:g.ruleForm.style,"onUpdate:modelValue":l[6]||(l[6]=e=>g.ruleForm.style=e),style:{width:"100%"}},{"default":t((()=>[r(f,{label:1},{"default":t((()=>[h])),_:1}),r(f,{label:0},{"default":t((()=>[V])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["prop"])])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"]),r(c,{ref_key:"previewDialog",ref:b},null,512)])}}}),[["__scopeId","data-v-59014299"]]),T=Object.freeze(Object.defineProperty({__proto__:null,"default":k},Symbol.toStringTag,{value:"Module"}));export{k as a,g as b,T as c,F as g};