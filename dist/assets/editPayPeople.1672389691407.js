import{c as e,d as a}from"./city.1672389691407.js";import{E as l}from"./index.1672389691407.js";import{b as o,c as r}from"./paysearch.1672389691407.js";import{d as t,f as u,$ as n,k as d,j as i,c as m,W as s,P as b,a3 as p,o as c,a as f,F as k,a5 as g,O as h,u as F,U as v}from"./vue.1672389691407.js";const y={"class":"system-add-dic-container"},V={"class":"dialog-footer"},_=v("取 消"),N=v("确 定"),P=t({name:"editPayPeople"}),S=Object.assign(P,{emits:["ok"],setup(t,{expose:v,emit:P}){const S=u(null);u(null);const x=n({isShowDialog:!1,id:null,title:"编辑",ruleForm:{id:null,bankName:"",bankProvince:"",bankCity:"",bankSubName:"",bankNo:"",fileStatus:"",taxMonth:"",empPhone:""},proList:[]}),C={bankName:[{required:!0,message:"请输入开户行总行",trigger:"blur"}],bankProvince:[{required:!0,message:"请选择开户行省",trigger:"change"}],bankCity:[{required:!0,message:"请选择开户行市",trigger:"change"}],bankNo:[{required:!0,message:"请输入银行卡号",trigger:"blur"},{pattern:/^[0-9]*$/,message:"请输入正确的银行卡数字！",trigger:"blur"}],fileStatus:[{required:!0,message:"请选择在职状态",trigger:"change"}],taxMonth:[{required:!0,message:"请选择计税月份",trigger:"change"}],empPhone:[{required:!0,message:"请输入手机号码",trigger:"blur"}]},w=e=>{x.ruleForm.bankCity=""},M=d((()=>x.ruleForm.bankProvince?a(x.ruleForm.bankProvince):[])),U=()=>{setTimeout((()=>{S.value.resetFields()}),300),x.ruleForm={id:null,bankName:"",bankProvince:"",bankCity:"",bankSubName:"",bankNo:"",fileStatus:"",taxMonth:"",empPhone:""},x.isShowDialog=!1},Y=()=>{U()},q=u(!1),j=()=>{S.value.validate((e=>{e&&(q.value=!0,null!==x.id&&void 0!==x.id&&r(x.ruleForm).then((e=>{e&&200==e.code?(l.success("编辑成功"),P("ok"),U()):l.error(e.msg||"编辑失败")}),(()=>{l.error("编辑失败")}))["catch"]()["finally"]((()=>{q.value=!1})))}))};return i((()=>{x.proList=e()})),v({openDialog:async e=>{if(e&&e.id)try{const a=await o(e.id);200==a.code?(x.ruleForm=a.data,x.ruleForm.taxMonth=a.data.taxMonth||"",x.ruleForm.fileStatus=Number(a.data.fileStatus),x.ruleForm.bankProvince=a.data.bankProvince?Number(a.data.bankProvince):null,x.ruleForm.bankCity=a.data.bankCity?Number(a.data.bankCity):null,x.id=e.id,x.isShowDialog=!0):l.error(a.msg||"获取详情失败")}catch(a){l.error(a.msg||"获取详情失败")}}}),(e,a)=>{const l=p("el-input"),o=p("el-form-item"),r=p("el-col"),t=p("el-option"),u=p("el-select"),n=p("el-date-picker"),d=p("el-row"),i=p("el-form"),v=p("el-button"),P=p("el-dialog");return c(),m("div",y,[s(P,{title:x.title,modelValue:x.isShowDialog,"onUpdate:modelValue":a[8]||(a[8]=e=>x.isShowDialog=e),"close-on-click-modal":!1,width:"816px",onClose:U},{footer:b((()=>[f("span",V,[s(v,{onClick:Y,size:"default"},{"default":b((()=>[_])),_:1}),s(v,{type:"primary",loading:q.value,onClick:j,size:"default"},{"default":b((()=>[N])),_:1},8,["loading"])])])),"default":b((()=>[s(i,{ref_key:"formRef",ref:S,model:x.ruleForm,rules:C,size:"default","label-width":"110px"},{"default":b((()=>[s(d,null,{"default":b((()=>[s(r,{span:24},{"default":b((()=>[s(o,{label:"开户行总行",prop:"bankName"},{"default":b((()=>[s(l,{modelValue:x.ruleForm.bankName,"onUpdate:modelValue":a[0]||(a[0]=e=>x.ruleForm.bankName=e),placeholder:"请输入开户行总行",clearable:"",maxlength:"50"},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"开户行省",prop:"bankProvince"},{"default":b((()=>[s(u,{modelValue:x.ruleForm.bankProvince,"onUpdate:modelValue":a[1]||(a[1]=e=>x.ruleForm.bankProvince=e),"value-key":"id",placeholder:"请选择开户行省",clearable:"",filterable:"",style:{width:"100%"},onChange:w},{"default":b((()=>[(c(!0),m(k,null,g(x.proList,(e=>(c(),h(t,{key:e.id,label:e.areaName,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"开户行市",prop:"bankCity"},{"default":b((()=>[s(u,{modelValue:x.ruleForm.bankCity,"onUpdate:modelValue":a[2]||(a[2]=e=>x.ruleForm.bankCity=e),"value-key":"id",placeholder:"请选择开户行市",clearable:"",filterable:"",disabled:!x.ruleForm.bankProvince,style:{width:"100%"}},{"default":b((()=>[(c(!0),m(k,null,g(F(M),(e=>(c(),h(t,{key:e.id,label:e.areaName,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","disabled"])])),_:1})])),_:1}),s(r,{span:24},{"default":b((()=>[s(o,{label:"开户行支行",prop:"bankSubName"},{"default":b((()=>[s(l,{modelValue:x.ruleForm.bankSubName,"onUpdate:modelValue":a[3]||(a[3]=e=>x.ruleForm.bankSubName=e),placeholder:"请输入开户行支行",clearable:"",maxlength:"50"},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"银行卡号",prop:"bankNo"},{"default":b((()=>[s(l,{modelValue:x.ruleForm.bankNo,"onUpdate:modelValue":a[4]||(a[4]=e=>x.ruleForm.bankNo=e),placeholder:"请输入银行卡号",clearable:"",maxlength:"50"},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"在职状态",prop:"fileStatus"},{"default":b((()=>[s(u,{modelValue:x.ruleForm.fileStatus,"onUpdate:modelValue":a[5]||(a[5]=e=>x.ruleForm.fileStatus=e),placeholder:"请选择在职状态",style:{width:"100%"}},{"default":b((()=>[s(t,{label:"在职",value:0}),s(t,{label:"离职",value:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"计税月份",prop:"taxMonth"},{"default":b((()=>[s(n,{modelValue:x.ruleForm.taxMonth,"onUpdate:modelValue":a[6]||(a[6]=e=>x.ruleForm.taxMonth=e),style:{width:"100%"},"value-format":"YYYYMM",format:"YYYYMM",type:"month",placeholder:"请选择计税月份",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{span:12},{"default":b((()=>[s(o,{label:"手机号码",prop:"empPhone"},{"default":b((()=>[s(l,{modelValue:x.ruleForm.empPhone,"onUpdate:modelValue":a[7]||(a[7]=e=>x.ruleForm.empPhone=e),placeholder:"请输入手机号码",clearable:"",maxlength:"11"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{S as default};