import{am as a,an as t,ao as s}from"./header.1672389691407.js";import{_ as e,g as l}from"./index.1672389691407.js";import{t as p}from"./translate.1672389691407.js";import{d as o,k as n,$ as c,j as i,c as r,W as d,P as u,a3 as f,o as m,F as y,a5 as _,O as b,U as j,V as k,u as D,a as V,J as v,T as h,ay as x,az as $}from"./vue.1672389691407.js";import"./city.1672389691407.js";const g=a=>(x("data-v-1c1e469a"),a=a(),$(),a),O=g((()=>V("div",{"class":"title"},[
V("span",null,"基本信息")],-1))),w={key:1},z={key:0,"class":"title",style:{"margin-top":"20px"}},A=[g((()=>V("span",null,"项目信息",-1)))],B={key:1},E={key:2,"class":"title"},F=[g((()=>V("span",null,"合同信息",-1)))],I={key:1},J=o({name:"detailArchives"});var N=e(Object.assign(J,{props:{formData:{type:Object,"default":()=>({})},span:{type:Number,"default":6},projectData:Object,contractData:Object,isDispatch:Boolean},setup(e){const o=e,x=n((()=>o.isDispatch)),$=c({dictValues:{}});return i((async()=>{(async()=>{const e=[];[...a,...t,...s].forEach((a=>{a.dict&&e.push(a.dict)}));const p=await l(e);$.dictValues=p||{}})()})),(l,n)=>{const c=f("el-tooltip"),i=f("el-form-item"),g=f("el-col"),J=f("el-row"),N=f("el-form");return m(),r("div",null,[d(N,{ref:"formRef",size:"default","label-width":"160px"},{"default":u((()=>[O,d(J,{style:{"margin-top":"20px"}},{"default":u((()=>[(m(!0),r(y,null,_(D(a),((a,t)=>(m(),b(g,{span:a.span||o.span,key:t},{"default":u((()=>[d(i,{label:a.label},{"default":u((()=>[a.tooltip?(m(),b(c,{key:0,placement:"top","popper-class":`tooltip_${a.span||6}`},{content:u((()=>[j(k(D(p)(a,o.formData,$.dictValues)),1)])),"default":u((()=>[V("span",{"class":v(`tooltip1_${a.span||6}`)},k(D(p)(a,o.formData,$.dictValues)),3)])),_:2},1032,["popper-class"])):(m(),r("span",w,k(D(p)(a,o.formData,$.dictValues)),1))])),_:2},1032,["label"])])),_:2},1032,["span"])))),128))])),_:1}),D(x)?(m(),r("div",z,A)):h("",!0),D(x)?(m(),b(J,{key:1,style:{"margin-top":"20px"}},{"default":u((()=>[(m(!0),r(y,null,_(D(t),((a,t)=>(m(),b(g,{span:a.span||e.span,key:t},{"default":u((()=>[d(i,{label:a.label},{"default":u((()=>[a.tooltip?(m(),b(c,{key:0,placement:"top","popper-class":`tooltip_${a.span||6}`},{content:u((()=>[j(k(D(p)(a,e.projectData,$.dictValues)),1)])),"default":u((()=>[V("span",{"class":v(`tooltip1_${a.span||6}`)},k(D(p)(a,e.projectData,$.dictValues)),3)])),_:2},1032,["popper-class"])):(m(),r("span",B,k(D(p)(a,e.projectData,$.dictValues)),1))])),_:2},1032,["label"])])),_:2},1032,["span"])))),128))])),_:1})):h("",!0),D(x)?(m(),r("div",E,F)):h("",!0),D(x)?(m(),b(J,{key:3,style:{"margin-top":"20px"}},{"default":u((()=>[(m(!0),r(y,null,_(D(s),((a,t)=>(m(),b(g,{span:a.span||e.span,key:t},{"default":u((()=>[d(i,{label:a.label},{"default":u((()=>[a.tooltip?(m(),b(c,{key:0,placement:"top","popper-class":`tooltip_${a.span||6}`},{content:u((()=>[j(k(D(p)(a,e.contractData,$.dictValues)),1)])),"default":u((()=>[V("span",{"class":v(`tooltip1_${a.span||6}`)},k(D(p)(a,e.contractData,$.dictValues)),3)])),_:2},1032,["popper-class"])):(m(),r("span",I,k(D(p)(a,e.contractData,$.dictValues)),1))])),_:2},1032,["label"])])),_:2},1032,["span"])))),128))])),_:1})):h("",!0)])),_:1},512)])}}}),[["__scopeId","data-v-1c1e469a"]]);export{N as default};