import"./index.16723896914073.js";import{g as e,b as a}from"./city.1672389691407.js";import{c as l,u as r,e as t}from"./settings.1672389691407.js";import{_ as o,E as s}from"./index.1672389691407.js";import{d,f as i,$ as n,c as u,W as m,P as c,a3 as p,o as f,a as g,U as y}from"./vue.1672389691407.js";const h={"class":"archives-add-electronic-container"},v={"class":"dialog-footer"},F=y("取 消"),w=y("确 定"),_=d({name:"addMinSalaryConf"});var b=o(Object.assign(_,{emits:["ok"],setup(o,{expose:d,emit:y}){const _=i(null),b=n({areaProps:{label:"areaName"},areaJson:[],isShowDialog:!1,id:null,title:"新增配置",ruleForm:{},fileList:[],literatureTypesDataSource:{},options:[],loading:!1}),V={address:[{required:!0,message:"请选择所在地",validator:(e,l,r)=>{if(null==l||null==l)return r(new Error("请选择所在地")),!1;const t=a[l];if(!t||0==t.parentId)return r(new Error("请选择所在地,所在地需选到市或区级别")),!1;r()}}],date:[{required:!0,message:"请选择有效时间"}],status:[{required:!0,message:"请选择状态"}],salaryBase:[{required:!0,message:"请输入最低工资标准"}]},x=()=>{let e=b.ruleForm.salaryBase.replace(/[^0-9.]/g,"");""!=e&&"."!=e?(0===e.indexOf(".")&&(e=e.slice(1)),e.lastIndexOf(".")===e.length-1&&e.indexOf(".")!==e.lastIndexOf(".")&&(e=e.slice(0,e.length-1)),e.indexOf(".")>-1?b.ruleForm.salaryBase=e.slice(0,e.indexOf(".")+3):b.ruleForm.salaryBase=e):b.ruleForm.salaryBase=""},B=(e,a)=>{const l=[e.id];a.parent&&0!=a.parent.level&&(l.unshift(a.parent.data.id),a.parent.parent&&0!=a.parent.parent.level&&l.unshift(a.parent.parent.data.id));let r=null,t=null,o=null;r=l[0]||null,l.length>1&&(t=l[1]||null),l.length>2&&(o=l[2]||null),b.ruleForm.province=r,b.ruleForm.city=t,b.ruleForm.town=o},D=()=>{b.ruleForm.province=null,b.ruleForm.city=null,b.ruleForm.town=null},k=async e=>{try{const a=await l(e);if(a&&200===a.code&&a.data){const e=a.data;b.options=[{id:a.data.id,departName:a.data.deptName}],b.ruleForm={id:e.id,date:[e.startDate,e.endDate],address:e.town||e.city||e.province,salaryBase:e.salaryBase,town:e.town,city:e.city,province:e.province,status:e.status+""},b.isShowDialog=!0}else s.error(a.msg||"获取详情失败"),S()}catch(a){S(),s.error("获取详情失败")}},S=()=>{b.ruleForm={},b.isShowDialog=!1,_.value&&_.value.clearValidate()},C=()=>{S()},O=()=>{_.value&&_.value.validate((e=>{if(e){b.loading=!0;const e={...b.ruleForm};null!==b.id&&void 0!==b.id?r(e).then((e=>{e&&200==e.code?(s.success("编辑成功"),y("ok"),S()):s.error(e.msg||"编辑失败")}),(()=>{s.error("编辑电失败")}))["finally"]((e=>{b.loading=!1})):t(e).then((e=>{e&&200==e.code?(s.success("新增成功"),y("ok"),S()):s.error(e.msg||"新增失败")}),(()=>{s.error("新增失败")}))["finally"]((e=>{b.loading=!1}))}}))};return d({openDialog:async a=>{a&&a.id?(b.title="编辑配置",b.id=a.id,await k(a.id)):(b.title="新增配置",b.id=null,b.ruleForm={},setTimeout((()=>{_.value&&_.value.clearValidate()}),100)),b.areaJson&&0!==b.areaJson.length||(b.areaJson=e()),b.isShowDialog=!0}}),(e,a)=>{const l=p("el-tree-select"),r=p("el-form-item"),t=p("el-col"),o=p("el-input"),s=p("el-option"),d=p("el-select"),i=p("el-row"),n=p("el-form"),y=p("el-button"),k=p("el-dialog");return f(),u("div",h,[m(k,{title:b.title,modelValue:b.isShowDialog,"onUpdate:modelValue":a[3]||(a[3]=e=>b.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:S},{footer:c((()=>[g("span",v,[m(y,{onClick:C,size:"default"},{"default":c((()=>[F])),_:1}),m(y,{type:"primary",onClick:O,size:"default",loading:b.loading},{"default":c((()=>[w])),_:1},8,["loading"])])])),"default":c((()=>[m(n,{ref_key:"formRef",ref:_,model:b.ruleForm,rules:V,size:"default","label-width":"140px"},{"default":c((()=>[m(i,null,{"default":c((()=>[m(t,{"class":"mb20"},{"default":c((()=>[m(r,{label:"所在地",prop:"address"},{"default":c((()=>[m(l,{modelValue:b.ruleForm.address,"onUpdate:modelValue":a[0]||(a[0]=e=>b.ruleForm.address=e),data:b.areaJson,style:{width:"100%"},placeholder:"请选择",props:b.areaProps,onCurrentChange:B,onClear:D,"node-key":"id","check-strictly":"",clearable:""},null,8,["modelValue","data","props"])])),_:1})])),_:1}),m(t,{"class":"mb20"},{"default":c((()=>[m(r,{label:"最低工资标准(元)",prop:"salaryBase"},{"default":c((()=>[m(o,{modelValue:b.ruleForm.salaryBase,"onUpdate:modelValue":a[1]||(a[1]=e=>b.ruleForm.salaryBase=e),placeholder:"请输入",maxlength:"11",onKeyup:x},null,8,["modelValue"])])),_:1})])),_:1}),m(t,{"class":"mb20"},{"default":c((()=>[m(r,{label:"状态",prop:"status"},{"default":c((()=>[m(d,{modelValue:b.ruleForm.status,"onUpdate:modelValue":a[2]||(a[2]=e=>b.ruleForm.status=e),placeholder:"请选择",style:{width:"100%"}},{"default":c((()=>[m(s,{label:"启用",value:"1"}),m(s,{label:"停用",value:"2"})])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-098b20f6"]]);export{b as default};