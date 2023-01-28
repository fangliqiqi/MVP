import{g as e}from"./staff.1672389691407.js";import{H as l,I as a,J as r}from"./attach.1672389691407.js";import{P as o}from"./index.16723896914073.js";import{E as t}from"./index.1672389691407.js";import{d,f as m,$ as u,c as i,W as s,P as n,a3 as p,o as g,a as c,F as f,a5 as w,O as k,U as b}from"./vue.1672389691407.js";const D={"class":"system-add-dic-container"},F=b("在职"),h=b("离职"),V={"class":"dialog-footer"},y=b("取 消"),_=b("确 定"),x=d({name:"systemAddDic"}),U=Object.assign(x,{emits:["ok"],setup(d,{expose:b,emit:x}){const U=m(null),S=m(null),I=u({isShowDialog:!1,loading:!1,id:null,title:"新增工作记录",ruleForm:{empId:"",empCode:"",empIdcard:"",empName:"",workUnit:"",workDepart:"",workJob:"",workingType:"",workingStatus:"1",startDate:"",endDate:""},options:[],workTypeList:[]}),v={empName:[{required:!0,message:"请选择员工",trigger:"change"}],workUnit:[{required:!0,message:"请输入工作单位",trigger:"blur"}],workDepart:[{required:!0,message:"请输入工作部门",trigger:"blur"}],workingStatus:[{required:!0,message:"请选择在职状态",trigger:"blur"}],startDate:[{required:!0,message:"请选择开始工作日期",trigger:"blur"}]},N=async l=>{try{l.fileStatus=0;const a=await e(l);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records};t.error(a.msg)}catch(a){}return{current:1,total:0,data:[]}},T=e=>{I.ruleForm.empCode=e.empCode,I.ruleForm.empId=e.id,I.ruleForm.empIdcard=e.empIdcard,I.options=[e]},C=e=>e.getTime()>Date.now(),Y=e=>!I.ruleForm.startDate||e.getTime()<Date.parse(I.ruleForm.startDate),J=async e=>{try{const a=await l(e);if(a&&200===a.code){const e={...a.data};I.options=[{empIdcard:e.empIdcard,empName:e.empName}],I.ruleForm=e,I.isShowDialog=!0}else t.error(a.msg||"获取工作记录详情失败")}catch(a){j(),t.error("获取工作记录详情失败")}},j=()=>{U.value.resetFields(),I.ruleForm={empId:"",empCode:"",empIdcard:"",empName:"",workUnit:"",workDepart:"",workJob:"",workingType:"",workingStatus:"1",startDate:"",endDate:""},I.isShowDialog=!1,I.id=null,I.loading=!1},q=()=>{j()},M=()=>{U.value.validate((e=>{e&&(I.loading=!0,null!==I.id&&void 0!==I.id?a(I.ruleForm).then((e=>{e&&200==e.code?(t.success("编辑工作记录成功"),x("ok"),j()):t.error(e.msg||"编辑工作记录失败")}),(()=>{t.error("编辑工作记录失败")}))["finally"]((()=>{I.loading=!1})):r(I.ruleForm).then((e=>{e&&200==e.code?(t.success("新增工作记录成功"),x("ok"),j()):t.error(e.msg||"新增工作记录失败")}),(()=>{t.error("新增工作记录失败")}))["finally"]((()=>{I.loading=!1})))}))};return b({openDialog:async(e,l)=>{I.workTypeList=l,e&&e.id?(I.title="编辑工作记录",I.id=e.id,await J(e.id)):(I.title="新增工作记录",I.id=null,I.ruleForm={empId:"",empCode:"",empIdcard:"",empName:"",workUnit:"",workDepart:"",workJob:"",workingType:"",workingStatus:"1",startDate:"",endDate:""},I.isShowDialog=!0)}}),(e,l)=>{const a=p("el-form-item"),r=p("el-col"),t=p("el-input"),d=p("el-option"),m=p("el-select"),u=p("el-radio"),b=p("el-radio-group"),x=p("el-date-picker"),J=p("el-row"),z=p("el-form"),L=p("el-button"),O=p("el-dialog");return g(),i("div",D,[s(O,{title:I.title,modelValue:I.isShowDialog,"onUpdate:modelValue":l[9]||(l[9]=e=>I.isShowDialog=e),"close-on-click-modal":!1,width:"816px",onClose:j},{footer:n((()=>[c("span",V,[s(L,{onClick:q,size:"default"},{"default":n((()=>[y])),_:1}),s(L,{type:"primary",onClick:M,loading:I.loading,size:"default"},{"default":n((()=>[_])),_:1},8,["loading"])])])),"default":n((()=>[s(z,{ref_key:"formRef",ref:U,model:I.ruleForm,rules:v,size:"default","label-width":"110px"},{"default":n((()=>[s(J,null,{"default":n((()=>[s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"员工姓名",prop:"empName"},{"default":n((()=>[s(o,{disabled:!!I.id,ref_key:"pageSelectRef",ref:S,modelValue:I.ruleForm.empName,"onUpdate:modelValue":l[0]||(l[0]=e=>I.ruleForm.empName=e),request:N,"value-key":"empName",title:"empName",search:"empName",placeholder:"请选择员工",options:I.options,onChange:T},null,8,["disabled","modelValue","options"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"身份证号"},{"default":n((()=>[s(t,{disabled:"",modelValue:I.ruleForm.empIdcard,"onUpdate:modelValue":l[1]||(l[1]=e=>I.ruleForm.empIdcard=e),placeholder:"身份证号"},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"工作单位",prop:"workUnit"},{"default":n((()=>[s(t,{modelValue:I.ruleForm.workUnit,"onUpdate:modelValue":l[2]||(l[2]=e=>I.ruleForm.workUnit=e),placeholder:"请输入工作单位",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"工作部门",prop:"workDepart"},{"default":n((()=>[s(t,{modelValue:I.ruleForm.workDepart,"onUpdate:modelValue":l[3]||(l[3]=e=>I.ruleForm.workDepart=e),placeholder:"请输入工作部门",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"工作岗位",prop:"workJob"},{"default":n((()=>[s(t,{modelValue:I.ruleForm.workJob,"onUpdate:modelValue":l[4]||(l[4]=e=>I.ruleForm.workJob=e),placeholder:"请输入工作岗位",maxlength:"100",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"工作类型",prop:"workingType"},{"default":n((()=>[s(m,{modelValue:I.ruleForm.workingType,"onUpdate:modelValue":l[5]||(l[5]=e=>I.ruleForm.workingType=e),placeholder:"请选择工作类型",clearable:"",filterable:"",style:{width:"100%"}},{"default":n((()=>[(g(!0),i(f,null,w(I.workTypeList,(e=>(g(),k(d,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"在职状态",prop:"workingStatus"},{"default":n((()=>[s(b,{modelValue:I.ruleForm.workingStatus,"onUpdate:modelValue":l[6]||(l[6]=e=>I.ruleForm.workingStatus=e)},{"default":n((()=>[s(u,{label:"0"},{"default":n((()=>[F])),_:1}),s(u,{label:"1"},{"default":n((()=>[h])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"开始工作日期",prop:"startDate"},{"default":n((()=>[s(x,{modelValue:I.ruleForm.startDate,"onUpdate:modelValue":l[7]||(l[7]=e=>I.ruleForm.startDate=e),type:"date",placeholder:"请选择开始工作日期",style:{width:"100%"},"value-format":"YYYY-MM-DD 00:00:00","disabled-date":C},null,8,["modelValue"])])),_:1})])),_:1}),s(r,{md:12,lg:12,xl:12},{"default":n((()=>[s(a,{label:"结束工作日期",prop:"endDate"},{"default":n((()=>[s(x,{modelValue:I.ruleForm.endDate,"onUpdate:modelValue":l[8]||(l[8]=e=>I.ruleForm.endDate=e),type:"date",placeholder:"请选择结束工作日期",style:{width:"100%"},"value-format":"YYYY-MM-DD 00:00:00","disabled-date":Y},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{U as default};