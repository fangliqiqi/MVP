import{g as e}from"./file.1672389691407.js";import{_ as a}from"./index.16723896914078.js";import{s as l}from"./payimport.16723896914072.js";import{_ as r,E as i,V as t}from"./index.1672389691407.js";import{f as s,$ as o,k as m,c as u,W as p,P as d,a3 as f,o as n,a as h,F as k,a5 as c,O as g,u as v,U as y,V as R,T as w}from"./vue.1672389691407.js";const F={"class":"system-add-dic-container"},b={"class":"tips"},L={"class":"dialog-footer"},_=y("取 消"),S=y("确 定");var x=r({__name:"submitPay",emits:["ok"],setup(r,{expose:x,emit:z}){const V=s(null),j=s(null),D=o({isShowDialog:!1,title:"提交",ruleForm:{},fileList:{11:[],8:[],14:[],13:[],12:[]},dictKeys:[]}),U={haveRemark:[{required:!0,message:"请上传薪资原表",trigger:"change"}],haveSalaryRemark:[{required:!0,message:"请输入发放原因",trigger:"change"}],haveSpecialRemark:[{required:!0,message:"请输入发放原因",trigger:"change"}],ownRemark:[{required:!0,message:"请输入发放原因",trigger:"change"}],repeatRemark:[{required:!0,message:"请输入发放原因",trigger:"change"}]},q=m((()=>{const e=[];return[{filelabel:"附件",type:8,remark:"ownRemark",remarkLabel:"发放原因",show:"ownNums",fileList:[],title:"表单中包含自有员工，请补充描述相关信息！"},{filelabel:"附件",type:14,remark:"repeatRemark",remarkLabel:"发放原因",show:"isRepeat",fileList:[],title:"表单中包含重复金额数据，请补充描述相关信息！"},{filelabel:"附件",type:13,remark:"haveSpecialRemark",remarkLabel:"发放原因",show:"haveSpecialFlag",fileList:[],title:"表单中包含员工当月发薪特殊值 (3500或者5000)，请补充描述相关信息！"},{filelabel:"附件",type:12,remark:"haveSalaryRemark",remarkLabel:"发放原因",show:"haveSalaryFlag",fileList:[],title:"表单中包含发薪员工发放稿酬和劳务费情况，请补充描述相关信息！"}].forEach((a=>{D.ruleForm[a.show]>=1&&e.push(a)})),[{filelabel:"薪资原表",type:11,size:50,remark:"remark",show:"haveRemark",remarkLabel:"说明",fileList:[]},...e]})),C=async a=>{try{const l=await e(a);if(l&&200===l.code){const e=[];l.data.map((a=>{e.push({name:a.attaName,uid:a.id,url:a.attaUrl,type:Number(a.relationType)})})),e.length>0?D.fileList=e.reduce(((e,a)=>(e[a.type]?e[a.type].push(a):e[a.type]=[a],e)),{}):D.fileList={8:[],11:[],12:[],13:[],14:[]},D.ruleForm.haveRemark=D.fileList[11]?D.fileList[11]:[]}else D.fileList={11:[],12:[],13:[],8:[],14:[]},i.error(l.msg||"获取附件失败")}catch(l){N()}},N=()=>{V.value.resetFields(),D.ruleForm={ownNums:0,isRepeat:0,haveSpecialFlag:0,haveSalaryFlag:0,haveRemark:[],ownRemark:"",repeatRemark:"",haveSpecialRemark:"",haveSalaryRemark:""},D.fileList={11:[],12:[],13:[],8:[],14:[]},D.isShowDialog=!1},P=()=>{N()},E=s(!1),O=()=>{V.value.validate((e=>{if(e){E.value=!0;const e={id:D.ruleForm.id,remark:D.ruleForm.remark,haveSalaryRemark:D.ruleForm.haveSalaryRemark,haveSpecialRemark:D.ruleForm.haveSpecialRemark,ownRemark:D.ruleForm.ownRemark,repeatRemark:D.ruleForm.repeatRemark};l(e).then((e=>{e&&200==e.code?(i.success(e.msg||"提交成功"),z("ok"),N()):i.error(e.msg||"提交失败")}))["catch"]((e=>{i.error("提交失败")}))["finally"]((()=>{E.value=!1}))}}))};return x({openDialog:async e=>{e&&(D.ruleForm=Object.assign({},e),await C(e.id),D.isShowDialog=!0)}}),(e,l)=>{const r=f("el-input"),i=f("el-form-item"),s=f("el-col"),o=f("el-icon"),m=f("el-divider"),x=f("el-row"),z=f("el-form"),C=f("el-button"),T=f("el-dialog");return n(),u("div",F,[p(T,{title:D.title,modelValue:D.isShowDialog,"onUpdate:modelValue":l[0]||(l[0]=e=>D.isShowDialog=e),"close-on-click-modal":!1,width:"576px",onClose:N},{footer:d((()=>[h("span",L,[p(C,{onClick:P,size:"default"},{"default":d((()=>[_])),_:1}),p(C,{type:"primary",loading:E.value,onClick:O,size:"default"},{"default":d((()=>[S])),_:1},8,["loading"])])])),"default":d((()=>[p(z,{ref_key:"formRef",ref:V,model:D.ruleForm,rules:U,size:"default","label-width":"110px"},{"default":d((()=>[(n(!0),u(k,null,c(v(q),((e,l)=>(n(),g(x,{key:l},{"default":d((()=>[p(s,{span:24},{"default":d((()=>[p(i,{label:e.remarkLabel,prop:"remark"!=e.remark?e.remark:""},{"default":d((()=>[p(r,{type:"textarea",modelValue:D.ruleForm[e.remark],"onUpdate:modelValue":a=>D.ruleForm[e.remark]=a,autosize:{minRows:2,maxRows:4},placeholder:`请输入${e.remarkLabel}`,"show-word-limit":"",maxlength:"200",clearable:""},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop"])])),_:2},1024),p(s,{span:24,"class":"file"},{"default":d((()=>[p(i,{label:e.filelabel,prop:"haveRemark"==e.show?"haveRemark":""},{"default":d((()=>[p(a,{ref_for:!0,ref_key:"attachUploadRef",ref:j,"file-list":D.fileList[e.type],onRemovefile:a=>((e,a)=>{D.fileList[a.type]=e.value,"11"==a.type&&(D.ruleForm.haveRemark=e.value,V.value.validateField(["haveRemark"]))})(a,e),onChangefile:a=>((e,a)=>{D.fileList[a.type]=e.value,"11"==a.type&&(D.ruleForm.haveRemark=e.value,V.value.validateField(["haveRemark"]))})(a,e),type:e.type,size:e.size||5,filePath:"payservice",domain:D.ruleForm.id},null,8,["file-list","onRemovefile","onChangefile","type","size","domain"])])),_:2},1032,["label","prop"])])),_:2},1024),e.title?(n(),g(s,{key:0},{"default":d((()=>[p(i,null,{"default":d((()=>[h("span",b,[p(o,{size:14,style:{"margin-right":"5px"}},{"default":d((()=>[p(v(t))])),_:1}),y(R(e.title),1)])])),_:2},1024)])),_:2},1024)):w("",!0),1!=v(q).length?(n(),g(m,{key:1})):w("",!0)])),_:2},1024)))),128))])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}},[["__scopeId","data-v-784fc4ac"]]);export{x as default};