import{d as e,aB as s,$ as a,k as t,H as i,n as l,E as u,h as n,c as o,W as m,P as r,i as f,aA as h,ax as c,a3 as p,o as d,X as w,u as v,a as y,O as g,S as x,K as V,T as N,aC as R}from"./vue.1672389691407.js";const A={"class":"h100"},K=e({name:"layoutParentView"}),L=Object.assign(K,{props:{minHeight:{type:String,"default":""}},setup(e){const K=e;s((e=>{if(e&&e.meta&&e.meta.isKeepAlive){const s=H.excludeNameList||[],a=e.name,t=s.indexOf(a);-1!==t&&(s.splice(t,1),H.excludeNameList=s)}}));const{proxy:L}=f(),k=h(),C=c(),H=a({refreshRouterViewKey:null,keepAliveNameList:[],excludeNameList:[],noCacheView:[]}),T=t((()=>C.state.themeConfig.themeConfig.animation)),B=t((()=>K.minHeight)),P=t((()=>C.state.keepAliveNames.keepAliveNames)),O=t((()=>C.state.themeConfig.themeConfig.limitTagNumber||20));return i((()=>{H.keepAliveNameList=P.value,L.mittBus.on("onTagsViewRefreshRouterView",(e=>{H.keepAliveNameList=P.value.filter((e=>k.path!==e)),H.refreshRouterViewKey=null,l((()=>{H.refreshRouterViewKey=e,H.keepAliveNameList=P.value}))})),L.mittBus.on("onTagsViewCloseRouterView",(e=>{const s=H.excludeNameList||[];s.push(...e),H.excludeNameList=s}))})),u((()=>{L.mittBus.off("onTagsViewRefreshRouterView")})),n((()=>k.fullPath),(()=>{H.refreshRouterViewKey=k.fullPath})),(e,s)=>{const a=p("router-view");return d(),o("div",A,[m(a,null,{"default":r((({Component:s})=>[m(w,{name:v(T),mode:"out-in"},{"default":r((()=>[y("div",null,[(d(),g(R,{exclude:H.excludeNameList,max:v(O)},[e.$route.meta.isKeepAlive?(d(),g(x(s),{key:H.refreshRouterViewKey,"class":"w100",style:V({minHeight:v(B)})},null,8,["style"])):N("",!0)],1032,["exclude","max"])),e.$route.meta.isKeepAlive?N("",!0):(d(),g(x(s),{key:H.refreshRouterViewKey,"class":"w100",style:V({minHeight:v(B)})},null,8,["style"]))])])),_:2},1032,["name"])])),_:1})])}}});export{L as default};