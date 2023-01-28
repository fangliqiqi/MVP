import{_ as e,a4 as l,E as a,a3 as r,a5 as t,a6 as o}from"./index.1672389691407.js";import{P as d}from"./index.16723896914073.js";import{d as u,f as s,$ as m,c as i,W as n,P as p,a3 as c,o as f,a as b,O as g,T as y,U as V}from"./vue.1672389691407.js";const h={"class":"system-add-dic-item-container"},_={"class":"dialog-footer"},v=V("取 消"),F=V("确 定"),x=u({name:"systemAddDicItem"});var k=e(Object.assign(x,{emits:["ok"],setup(e,{expose:u,emit:V}){const x=s(null),k=s(null),I=m({isShowDialog:!1,id:null,item:null,title:"新增字典值",ruleForm:{type:"",value:"",label:"",remark:"",sortOrder:null,description:"",parentId:""},options:[],modal:null,ext:{}}),w={type:[{required:!0,message:"请输入字典编码",trigger:"blur"}],value:[{required:!0,message:"请输入数据值",trigger:"blur"}],label:[{required:!0,message:"请输入标签名",trigger:"blur"}],sortOrder:[{required:!0,message:"请输入排序",trigger:"blur"}],parentId:[{required:!0,message:"请选择父级字典值",trigger:"blur"}]},O=async e=>{try{const r=await l(e);r&&200===r.code?I.ruleForm={...r.data}:a.error(r.msg||"获取字典详情失败")}catch(r){D(),a.error("获取字典详情失败")}},U=async e=>{try{const l=Object.assign({},e,I.ext),a=await r(l);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records}}catch(l){}return{current:1,total:0,data:[]}},D=()=>{x.value&&x.value.clearValidate(),I.isShowDialog=!1},q=()=>{D()},S=s(!1),j=()=>{x.value&&x.value.validate((e=>{if(e){S.value=!0;const e={...I.ruleForm};delete e.parentLabelOfValue,null!==I.id&&void 0!==I.id?t(e).then((e=>{e&&200==e.code?(a.success("编辑字典成功"),V("ok"),D()):a.error(e.msg||"编辑字典失败")}),(()=>{a.error("编辑字典失败")}))["finally"]((()=>{S.value=!1})):o(e).then((e=>{e&&200==e.code?(a.success("新增字典成功"),V("ok"),D()):a.error(e.msg||"新增字典失败")}),(()=>{a.error("新增字典失败")}))["finally"]((()=>{S.value=!1}))}}))};return u({openDialog:async e=>{I.item=e.item,I.modal=e.modal,I.ext={type:e.modal.parentItemType},e.item&&e.item.id?(I.title="编辑字典",I.id=e.item.id,I.options=[{value:e.item.parentId,label:e.item.parentLabelOfValue}],await O(e.item.id)):(I.title="新增字典",I.id=null,I.ruleForm={type:e.item.type,dictId:e.item.dictId}),I.isShowDialog=!0}}),(e,l)=>{const a=c("el-input"),r=c("el-form-item"),t=c("el-col"),o=c("el-input-number"),u=c("el-row"),s=c("el-form"),m=c("el-button"),V=c("el-dialog");return f(),i("div",h,[n(V,{title:I.title,modelValue:I.isShowDialog,"onUpdate:modelValue":l[7]||(l[7]=e=>I.isShowDialog=e),"close-on-click-modal":!1,width:"550px",onClose:D},{footer:p((()=>[b("span",_,[n(m,{onClick:q,size:"default"},{"default":p((()=>[v])),_:1}),n(m,{type:"primary",loading:S.value,onClick:j,size:"default"},{"default":p((()=>[F])),_:1},8,["loading"])])])),"default":p((()=>[n(s,{ref_key:"formRef",ref:x,model:I.ruleForm,rules:w,size:"default","label-width":"100px"},{"default":p((()=>[n(u,null,{"default":p((()=>[n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"字典编码",prop:"type"},{"default":p((()=>[n(a,{modelValue:I.ruleForm.type,"onUpdate:modelValue":l[0]||(l[0]=e=>I.ruleForm.type=e),placeholder:"请输入字典编码",maxlength:"100",disabled:""},null,8,["modelValue"])])),_:1})])),_:1}),I.modal.parentItemType?(f(),g(t,{key:0,"class":"mb20"},{"default":p((()=>[n(r,{label:"父级字典值",prop:"parentId"},{"default":p((()=>[n(d,{ref_key:"pageSelectRef",ref:k,modelValue:I.ruleForm.parentId,"onUpdate:modelValue":l[1]||(l[1]=e=>I.ruleForm.parentId=e),placeholder:"请选择父级字典值",request:U,"value-key":"value",title:"label",search:"label",options:I.options},null,8,["modelValue","options"])])),_:1})])),_:1})):y("",!0),n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"数据值",prop:"value"},{"default":p((()=>[n(a,{modelValue:I.ruleForm.value,"onUpdate:modelValue":l[2]||(l[2]=e=>I.ruleForm.value=e),modelModifiers:{trim:!0},type:"number",placeholder:"请输入数据值",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"标签名",prop:"label"},{"default":p((()=>[n(a,{modelValue:I.ruleForm.label,"onUpdate:modelValue":l[3]||(l[3]=e=>I.ruleForm.label=e),placeholder:"请输入标签名",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"描述",prop:"description"},{"default":p((()=>[n(a,{modelValue:I.ruleForm.description,"onUpdate:modelValue":l[4]||(l[4]=e=>I.ruleForm.description=e),placeholder:"请输入描述",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"备注信息",prop:"remark"},{"default":p((()=>[n(a,{modelValue:I.ruleForm.remark,"onUpdate:modelValue":l[5]||(l[5]=e=>I.ruleForm.remark=e),type:"textarea",placeholder:"请输入备注信息",maxlength:"255"},null,8,["modelValue"])])),_:1})])),_:1}),n(t,{"class":"mb20"},{"default":p((()=>[n(r,{label:"排序",prop:"sortOrder"},{"default":p((()=>[n(o,{modelValue:I.ruleForm.sortOrder,"onUpdate:modelValue":l[6]||(l[6]=e=>I.ruleForm.sortOrder=e),placeholder:"请输入排序",clearable:"",min:0},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-3d3681a6"]]);export{k as default};