import{_ as e}from"./index.167238969140720.js";import{at as a}from"./header.1672389691407.js";import{d as t,f as l,$ as o,k as r,j as s,c as d,a as n,V as p,T as i,W as m,P as u,u as c,U as f,aA as y,aD as h,a3 as g,o as k,F as b,a5 as D,O as x,i as V}from"./vue.1672389691407.js";import{_ as v,E as w,g as _,c as Y}from"./index.1672389691407.js";import{e as U}from"./events.1672389691407.js";import{a as j,e as $}from"./presendorder.1672389691407.js";import"./index.16723896914073.js";const O={"class":"edit-staff-page"},M={"class":"content"},S={"class":"explain"},B=f("单据状态："),A={"class":"state"},T={key:0},q=f("异常说明："),C={"class":"text"},E={"class":"title"},R={"class":"operation-container"},z=f("关 闭"),L=f("保 存"),P=t({name:"editPre"});var F=v(Object.assign(P,{setup(t){const f=y(),v=h(),{proxy:P}=V(),F=l(null),I=o({span:6,maxlength:20,loading:!1,formData:{},explainStatus:"",dictOptions:{},rules:{}}),W=r((()=>I.formData&&0==I.formData.type?{...a,"基本信息":a["基本信息"].filter((e=>"minus"!=e.show&&"hide"!=e.show))}:I.formData&&1==I.formData.type?{...a,"基本信息":a["基本信息"].filter((e=>"add"!=e.show&&"hide"!=e.show))}:void 0)),G=r((()=>{const e={},t=["pensionBase","medicalBase","injuryBase","birthBase","unemploymentBase","fundBase"];for(let l in a)for(let o of a[l])o.prop&&!t.includes(o.key)&&"unit-input"!=o.type&&"contractTermAdd"!=o.prop&&(e[o.prop]=[{required:!0,message:`请输入${o.label}`,trigger:"blur"}]),t.includes(o.key)&&(e[o.key]=[{pattern:/^[0-9]{1,10}(\.[0-9]{1,2})?$/,message:"请输入正确数字(最多十位数字,两位小数)",trigger:"change"}]),"unit-input"==o.type&&(e[o.key]=[{pattern:/^(0|[1-9]\d{0,1}|100)(\.[0-9]{1,2})?$/,message:"请输入正确数字(0~100,两位小数)",trigger:"change"}]),"contractTermAdd"==o.key&&(e.contractTermAdd=[{pattern:/^[0-9]*$/,message:"请输入正确数字",trigger:"change"}]);return e})),H=()=>{v.push({path:"/socialfund/sendOrder/preSendorder",query:{}}),U(P,"/socialfund/sendOrder/preSendorder"),Y(f,P)},J=()=>{F.value.validate((async e=>{if(e){Object.values(a).forEach((e=>{e.forEach((e=>{"date"!=e.type&&"month"!=e.type||I.formData[e.key]||(I.formData[e.key]="")}))})),I.loading=!0;try{const e=await $(I.formData);200==e.code?(w.success(e.msg||"保存成功"),H(),I.loading=!1):1==e.code&&(w.error(e.msg||"保存失败"),I.loading=!1)}catch(t){w.error(t.msg||"保存失败"),I.loading=!1}}}))};return s((async()=>{if((async()=>{try{const e=["pre_send_status"];for(let l in a)for(let t of a[l])t.dict&&e.push(t.dict),t.prop&&(I.rules[t.prop]=[{required:!0,message:`请输入${t.label}`,trigger:"blur"}]);const t=await _(e);I.dictOptions=t}catch(e){}})(),f.params.id)try{const e=await j(f.params.id);200==e.code?(I.formData=e.data,I.explainStatus=I.dictOptions.pre_send_status[e.data.preStatus]):w.error(e.msg||"获取预派单详情数据失败")}catch(e){}})),(a,t)=>{const l=g("el-input"),o=g("el-option"),r=g("el-select"),s=g("el-date-picker"),f=g("el-form-item"),y=g("el-col"),h=g("el-row"),V=g("el-form"),v=g("el-button");return k(),d("div",O,[n("div",M,[n("div",S,[n("p",null,[B,n("span",A,p(I.explainStatus),1)]),"1"==I.formData.preStatus?(k(),d("p",T,[q,n("span",C,p(I.formData.exceptionContent),1)])):i("",!0)]),m(V,{ref_key:"formRef",ref:F,model:I.formData,rules:c(G),size:"default","label-width":"160px"},{"default":u((()=>[(k(!0),d(b,null,D(c(W),((a,t)=>(k(),d("div",{key:t},[n("div",E,[n("span",null,p(t),1)]),m(h,{style:{"margin-top":"20px"}},{"default":u((()=>[(k(!0),d(b,null,D(a,(a=>(k(),x(y,{key:a.key,span:a.span||I.span},{"default":u((()=>[m(f,{label:a.label,prop:a.prop},{"default":u((()=>["textarea"==a.type?(k(),x(l,{key:0,modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e,type:"textarea",rows:2,placeholder:`请输入${a.label}`,"show-word-limit":"",clearable:"",autosize:{minRows:2,maxRows:4},maxlength:a.maxLength||I.maxlength},null,8,["modelValue","onUpdate:modelValue","placeholder","maxlength"])):"unit-input"==a.type?(k(),x(e,{key:1,type:"unit-input",unit:"%",modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e},null,8,["modelValue","onUpdate:modelValue"])):"select"==a.type?(k(),x(r,{key:2,modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e,placeholder:`请选择${a.label}`,clearable:"",filterable:"",style:{width:"100%"}},{"default":u((()=>[(k(!0),d(b,null,D(a.options,((e,a)=>(k(),x(o,{key:a,label:e,value:e},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue","placeholder"])):a.dict?(k(),x(r,{key:3,modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e,placeholder:`请选择${a.label}`,clearable:"",filterable:"",style:{width:"100%"}},{"default":u((()=>[(k(!0),d(b,null,D(I.dictOptions[a.dict],((e,a)=>(k(),x(o,{key:a,label:e,value:a},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue","placeholder"])):"date"==a.type||"month"==a.type?(k(),x(s,{key:4,modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e,type:a.type,format:"month"==a.type?"YYYYMM":"YYYY-MM-DD","value-format":"month"==a.type?"YYYYMM":"YYYY-MM-DD",placeholder:`请选择${a.label}`,style:{width:"100%"}},null,8,["modelValue","onUpdate:modelValue","type","format","value-format","placeholder"])):(k(),x(l,{key:5,modelValue:I.formData[a.key],"onUpdate:modelValue":e=>I.formData[a.key]=e,placeholder:`请输入${a.label}`,maxlength:a.maxLength||I.maxlength,disabled:a.disabled},null,8,["modelValue","onUpdate:modelValue","placeholder","maxlength","disabled"]))])),_:2},1032,["label","prop"])])),_:2},1032,["span"])))),128))])),_:2},1024)])))),128))])),_:1},8,["model","rules"])]),n("div",R,[m(v,{onClick:H,style:{height:"100%"}},{"default":u((()=>[z])),_:1}),m(v,{type:"primary",onClick:J,loading:I.loading,style:{height:"100%"}},{"default":u((()=>[L])),_:1},8,["loading"])])])}}}),[["__scopeId","data-v-15a4b380"]]);export{F as default};