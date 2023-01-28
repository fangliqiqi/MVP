import{B as e}from"./index.16723896914077.js";import{g as a,E as l}from"./index.1672389691407.js";import{b as r}from"./order.1672389691407.js";import{a3 as o}from"./header.1672389691407.js";import{d as t,f as d,$ as u,k as s,j as m,c as i,W as n,P as c,u as f,a3 as p,o as g,a as h,O as k,F as S,a5 as F,U as b,V as y,T as _}from"./vue.1672389691407.js";import"./xlsx.1672389691407.js";import"./excel.1672389691407.js";import"./index.16723896914073.js";const v=b("办理成功"),x=b("办理失败"),V={"class":"dialog-footer"},w=b("取 消"),D=b("确 定"),R=h("div",null,[
h("div",{style:{color:"red","font-size":"24px","text-align":"center",margin:"10px 0 25px"}},"公积金批量办理失败！"),
h("span",null,[
b("存在公积金办理失败的派单信息！"),
h("br"),
b("已为您下载反馈结果！")])],-1),j=t({name:"fundConductDialog"}),C=Object.assign(j,{emits:["ok"],setup(t,{expose:j,emit:C}){const T=d(null),q=d(null),I=(e,a)=>a.map(((e,a)=>({line:e.lineNum||a,isError:"red"==e.color?"是":"否",error:e.message}))),U=u({isShowDialog:!1,loading:!1,ruleForm:{auditStatus:"0",auditRemark:null},data:null,dictKeys:["fund-conduct-add-reason"],DICTS:{}}),z=s((()=>"1"==U.ruleForm.handleStatus?{handleStatus:[{required:!0,message:"请选择办理结果"}]}:"2"==U.ruleForm.handleStatus?"999"==U.ruleForm.remark?{handleStatus:[{required:!0,message:"请选择办理结果"}],remark:[{required:!0,message:"请选择失败类型"}],auditRemark:[{required:!0,message:"请选择办理意见"}]}:{handleStatus:[{required:!0,message:"请选择办理结果"}],remark:[{required:!0,message:"请选择失败类型"}]}:void 0)),E=()=>{U.ruleForm.auditRemark=null,setTimeout((()=>{T.value&&T.value.clearValidate()}),100)},K=()=>{T.value&&T.value.validate((e=>{if(e){U.loading=!0;const e=U.data.map((e=>e.id));let a=U.ruleForm.auditRemark?U.ruleForm.remark+"-"+U.ruleForm.auditRemark:U.ruleForm.remark;const o={typeSub:"1",handleStatus:U.ruleForm.handleStatus,handleRemark:"1"==U.ruleForm.handleStatus?U.ruleForm.auditRemark:a,remark:U.ruleForm.remark};r(o,e).then((e=>{!e||200!=e.code||e.data&&0!==e.data.length?e.data?q.value&&q.value.openErrorDialog(e.data):l.error(e.msg||"批量办理失败"):(l.success("批量办理成功"),C("ok"),H())}),(e=>{l.error(e&&e.msg||"批量办理失败")}))["finally"]((e=>{U.loading=!1}))}}))},H=()=>{T.value&&T.value.clearValidate(),U.isShowDialog=!1,U.ruleForm={},U.loading=!1};m((()=>{N()}));const N=async()=>{if(U.dictKeys&&U.dictKeys.length){const e=await a(U.dictKeys);e&&(U.DICTS=e)}};return j({openDialog:async e=>{U.data=e,U.ruleForm={handleStatus:"1"},U.DICTS&&Object.keys(U.DICTS).length||N(),U.isShowDialog=!0}}),(a,l)=>{const r=p("el-radio"),t=p("el-radio-group"),d=p("el-form-item"),u=p("el-col"),s=p("el-option"),m=p("el-select"),j=p("el-input"),C=p("el-row"),N=p("el-form"),O=p("el-button"),B=p("el-dialog");return g(),i("div",null,[n(B,{title:"公积金批量办理",modelValue:U.isShowDialog,"onUpdate:modelValue":l[3]||(l[3]=e=>U.isShowDialog=e),width:"576px",onClose:H,"close-on-click-modal":!1},{footer:c((()=>[h("span",V,[n(O,{onClick:H,size:"default"},{"default":c((()=>[w])),_:1}),n(O,{type:"primary",onClick:K,loading:U.loading,size:"default"},{"default":c((()=>[D])),_:1},8,["loading"])])])),"default":c((()=>[n(N,{ref_key:"formRef",ref:T,model:U.ruleForm,rules:f(z),size:"default","label-width":"90px","validate-on-rule-change":!1},{"default":c((()=>[n(C,null,{"default":c((()=>[n(u,{"class":"mb20"},{"default":c((()=>[n(d,{label:"办理结果",prop:"handleStatus"},{"default":c((()=>[n(t,{modelValue:U.ruleForm.handleStatus,"onUpdate:modelValue":l[0]||(l[0]=e=>U.ruleForm.handleStatus=e),onChange:E},{"default":c((()=>[n(r,{label:"1"},{"default":c((()=>[v])),_:1}),n(r,{label:"2"},{"default":c((()=>[x])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),2==U.ruleForm.handleStatus?(g(),k(u,{key:0,"class":"mb20"},{"default":c((()=>[n(d,{label:"失败类型",prop:"remark"},{"default":c((()=>[n(m,{modelValue:U.ruleForm.remark,"onUpdate:modelValue":l[1]||(l[1]=e=>U.ruleForm.remark=e),placeholder:"请选择",style:{width:"100%"},filterable:"",clearable:""},{"default":c((()=>[(g(!0),i(S,null,F(U.DICTS["fund-conduct-add-reason"],((e,a)=>(g(),k(s,{label:e,key:a,value:e},{"default":c((()=>[b(y(e),1)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})):_("",!0),n(u,{"class":"mb20"},{"default":c((()=>[n(d,{label:"办理意见",prop:"auditRemark"},{"default":c((()=>[n(j,{modelValue:U.ruleForm.auditRemark,"onUpdate:modelValue":l[2]||(l[2]=e=>U.ruleForm.auditRemark=e),placeholder:"请输入",rows:3,type:"textarea",clearable:"",maxLength:150,"show-word-limit":""},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue"]),n(e,{title:"公积金批量办理",ref_key:"bathHandleRef",ref:q,type:1,errName:"公积金批量办理",batchName:"staff-batch-audit",errorHeader:f(o),errorData:I,customErrorContent:"",download:""},{error:c((()=>[R])),_:1},8,["errorHeader"])])}}});export{C as default};