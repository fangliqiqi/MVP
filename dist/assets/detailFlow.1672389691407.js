import{ap as a,aq as s}from"./header.1672389691407.js";import{_ as t,P as l,X as e,Y as i,g as o}from"./index.1672389691407.js";import{E as c}from"./index.16723896914074.js";import{t as d}from"./translate.1672389691407.js";import{d as u,$ as n,k as r,j as p,c as f,W as m,P as y,a as k,U as h,V as b,u as _,J as w,O as H,T as v,ay as D,az as S,al as g,a3 as j,o as V,F as x,a5 as P}from"./vue.1672389691407.js";import"./city.1672389691407.js";const E=a=>(D("data-v-322b99de"),a=a(),S(),a),O={"class":"sociallist"},z={"class":"sociallist"},B={"class":"title"},L=E((()=>k("span",null,"进展明细",-1))),A={key:0,"class":"flowlist"},C={"class":"check_content"},I=E((()=>k("em",null,"操作人：",-1))),K=E((()=>k("em",null,"操作时间：",-1))),T=u({name:"detailArchives"});var U=t(Object.assign(T,{props:{formData:{type:Object,"default":()=>{}},dispatch:Object,flowList:{type:Array,"default":()=>[]},isDispatch:Boolean},setup(t){const u=t;n({select:l,closeBold:e,semiSelect:i});const D=r((()=>u.isDispatch)),S=n({dictValues:{},dictKeys:["social_handle_status","fund_handle_status","dispatch-audit-status","fund-conduct-status","social-conduct-status"],dispatchParams:{status:{label:"派单状态",key:"status",dict:"dispatch-audit-status"},socialHandleStatus:{label:"社保办理状态",key:"socialHandleStatus",dict:"social-conduct-status"},fundHandleStatus:{label:"公积金办理状态",key:"fundHandleStatus",dict:"fund-conduct-status"}},collapse:!0}),E=r((()=>{const a=[{label:"养老",key:"pensionHandle",status:"wait"},{label:"医疗",key:"medicalHandle",status:"wait"},{label:"失业",key:"unemployHandle",status:"wait"},{label:"工伤",key:"workInjuryHandle",status:"wait"},{label:"生育",key:"birthHandle",status:"wait"},{label:"大病",key:"bigailmentHandle",status:"wait"}];return u.isDispatch?a.map((a=>(a.status=1==u.dispatch[a.key]?"succee":2==u.formData[a.key]?"fail":"wait",a))):a.map((a=>(a.status=1==u.formData[a.key]?"succee":2==u.formData[a.key]?"fail":"wait",a))),a})),T=r((()=>(u.flowList.map((a=>(0==a.auditStatus||5==a.auditStatus?(a.color="#f18834",a.icon=g(i)):1==a.auditStatus||3==a.auditStatus||6==a.auditStatus?(a.color="#58BD7D",a.icon=g(l)):(a.color="#E84E4E",a.icon=g(e)),a))),u.flowList))),U=()=>{S.collapse=!S.collapse},q=r((()=>S.collapse?"收起":"展开"));return p((async()=>{(async()=>{const a=await o(S.dictKeys);S.dictValues=a||{}})()})),(t,l)=>{const e=j("el-form-item"),i=j("el-col"),o=j("el-row"),n=j("el-form"),r=j("el-timeline-item"),p=j("el-timeline");return V(),f("div",null,[m(n,{ref:"formRef",size:"default","label-width":"120px"},{"default":y((()=>[m(o,{style:{"margin-top":"20px"}},{"default":y((()=>[_(D)?(V(),f(x,{key:0},[null!=u.dispatch.status?(V(),H(i,{key:0,span:24},{"default":y((()=>[m(e,{label:"派单状态"},{"default":y((()=>[h(b(_(d)(S.dispatchParams.status,u.dispatch,S.dictValues)),1)])),_:1})])),_:1})):v("",!0),u.dispatch.socialHousehold?(V(),H(i,{key:1,span:24},{"default":y((()=>[m(e,{label:"社保办理状态"},{"default":y((()=>[h(b(_(d)(S.dispatchParams.socialHandleStatus,u.dispatch,S.dictValues)),1)])),_:1})])),_:1})):v("",!0),u.dispatch.socialHousehold?(V(),H(e,{key:2,label:""},{"default":y((()=>[k("div",O,[(V(!0),f(x,null,P(_(E),(a=>(V(),f("span",{key:a.key,"class":w(a.status)},b(a.label),3)))),128))])])),_:1})):v("",!0),u.dispatch.providentHousehold?(V(),H(i,{key:3,span:24},{"default":y((()=>[m(e,{label:"公积金办理状态"},{"default":y((()=>[h(b(_(d)(S.dispatchParams.fundHandleStatus,u.dispatch,S.dictValues)),1)])),_:1})])),_:1})):v("",!0)],64)):(V(),f(x,{key:1},[u.formData.socialHousehold?(V(),H(i,{key:0,span:24},{"default":y((()=>[m(e,{label:"社保状态"},{"default":y((()=>[h(b(_(d)(_(a)[0],u.formData,S.dictValues)),1)])),_:1})])),_:1})):v("",!0),u.formData.socialHousehold?(V(),H(e,{key:1,label:""},{"default":y((()=>[k("div",z,[(V(!0),f(x,null,P(_(E),(a=>(V(),f("span",{key:a.key,"class":w(a.status)},b(a.label),3)))),128))])])),_:1})):v("",!0),u.formData.providentHousehold?(V(),H(i,{key:2,span:24},{"default":y((()=>[m(e,{label:"公积金状态"},{"default":y((()=>[h(b(_(d)(_(s)[0],u.formData,S.dictValues)),1)])),_:1})])),_:1})):v("",!0)],64))])),_:1})])),_:1},512),k("div",B,[L,k("div",{"class":"college-container",onClick:U,style:{color:"var(--el-color-primary)","font-weight":"600"}},[h(b(_(q))+" ",1),k("em",{"class":w("iconfont icon-ic-arrow-down "+(S.collapse?"isCollapse":""))},null,2)])]),S.collapse?(V(),f("div",A,[_(T).length>0?(V(),H(p,{key:0,style:{"padding-left":"18px","margin-top":"20px"}},{"default":y((()=>[(V(!0),f(x,null,P(_(T),((a,s)=>(V(),H(r,{key:s,color:a.color,size:"large",icon:a.icon},{"default":y((()=>[k("div",C,[k("p",null,b(a.title),1),k("span",null,[I,h(b(a.auditUser)+" "+b(a.organName),1)]),k("span",null,[K,h(b(a.auditTime),1)])])])),_:2},1032,["color","icon"])))),128))])),_:1})):(V(),H(c,{key:1}))])):v("",!0)])}}}),[["__scopeId","data-v-322b99de"]]);export{U as default};