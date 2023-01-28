import{_ as e}from"./index.1672389691407.js";import{d as t,i as a,f as l,$ as n,h as o,k as s,j as r,a2 as i,a3 as d,o as u,c,W as p,P as g,F as m,a5 as y,O as h,T as f,U as v,V as w,K as L}from"./vue.1672389691407.js";const b=t({name:"PageSelect",props:{placeholder:{type:String,"default":"",required:!1},clearable:{type:Boolean,"default":!0},disabled:{type:Boolean,"default":!1},valueKey:{type:String,"default":"value"},request:{type:Function,"default":()=>function(){},required:!0},search:{type:String,"default":"name"},title:{type:String,required:!0,"default":"title"},multiple:{type:Boolean,"default":!1},modelValue:{type:[String,Number,Array],"default":null},manual:{type:Boolean,"default":!1},ext:{type:Object,"default":()=>({})},options:{type:Array,"default":()=>[]},selectwidth:{type:String,"default":""}},emits:["change","clear","update:modelValue"],setup(e,t){var d;const u=null==(d=a())?void 0:d.appContext.config.globalProperties.$message,c=l(null),p=l(null),g=n({selectLoading:!1,searchKey:"",total:0,selected:null,optionList:[],isDisabled:!1,loadingText:"加载中",arrowStatus:"down",params:{current:1,size:10}});o((()=>e.modelValue),((e,t)=>{y(e)}));const m=s((()=>e.disabled)),y=t=>{if(t)if(null!=t){const a=g.optionList.concat(e.options);if(e.multiple&&Array.isArray(t))g.selected=t;else if(!e.multiple){const l=a.find((a=>a[e.valueKey]===t));l&&(g.selected=l)}}else g.selected=null;else g.selected=null},h=s((()=>{let t=null;return t=g.optionList&&g.optionList.length&&Array.isArray(g.optionList)&&Array.isArray(e.options)?e.options.filter((t=>!g.optionList.some((a=>a[e.valueKey]===t[e.valueKey])))):e.options,t})),f=e=>{g.params.current=e,v()},v=async()=>{g.optionList=[];g.loadingText="加载中",g.selectLoading=!0;try{const t=Object.assign({},g.params,e.ext||{});for(let e in t)null!==t[e]&&void 0!==t[e]&&""!==t[e]||delete t[e];const a=await e.request(t);setTimeout((()=>{a.data&&a.data.length?(g.selectLoading=!1,g.optionList=a.data,g.total=a.total):(g.selectLoading=!0,g.loadingText="暂无数据",g.total=0)}),200)}catch(t){g.optionList=[],g.params={current:1,size:10},g.selectLoading=!0,g.loadingText="暂无数据",g.total=0,u.warning("数据加载失败")}},w=()=>{g.searchKey="",g.params={current:1,size:10},f(1)};r((()=>{y(e.modelValue),e.manual||f(1)}));const L=g.params;return t.expose({loadData:v,refresh:w,params:L}),{...i(g),...i(e),selectRef:c,paginationRef:p,getArrowStatus:()=>"up"===g.arrowStatus?g.selected?"arrow-up select-value":"arrow-up":g.selected?"arrow-down select-value":"arrow-down",selectChanged:a=>{a||t.emit("update:modelValue",null),e.multiple?0===g.selected.length?t.emit("update:modelValue",null):t.emit("update:modelValue",g.selected||[]):t.emit("update:modelValue",g.selected[e.valueKey]||null),t.emit("change",g.selected),a||(g.searchKey="",g.params={current:1,size:10},f(1),g.selectLoading=!1)},clearData:()=>{t.emit("clear"),t.emit("update:modelValue",null)},hidden:e=>{e?(g.arrowStatus="up",document.addEventListener("mousedown",(function(e){("LI"===e.target.tagName||"I"==e.target.tagName&&"i"==e.target.localName)&&e.preventDefault()}),!1),g.optionList&&0!==g.optionList.length||(p.value&&(p.value.internalCurrentPage=1),f(1))):(g.arrowStatus="down",g.selectLoading=!1,g.loadingText="加载中",g.searchKey="",g.params={current:1,size:10},f(1),removeEventListener("mousedown",(function(){}),!1))},handleCurrentChange:f,remoteMethod:t=>{g.searchKey=t,g.selectLoading=!0,g.params={[e.search]:t,current:1,size:10},v()},defaultOptions:h,refresh:w,isDisabled:m}}}),C={"class":"page-select-container",style:{width:"100%"}},x={key:0,"class":"spare-line"};var V=e(b,[["render",function(e,t,a,l,n,o){const s=d("el-option"),r=d("el-pagination"),i=d("el-select");return u(),c("div",C,[p(i,{ref:"selectRef",style:L(e.selectwidth?e.selectwidth:"width:100%"),modelValue:e.selected,"onUpdate:modelValue":t[2]||(t[2]=t=>e.selected=t),"value-key":e.valueKey,filterable:"",multiple:e.multiple,clearable:e.clearable,remote:"","no-match-text":"暂无数据","no-data-text":"暂无数据",placeholder:e.placeholder,"remote-method":e.remoteMethod,loading:e.selectLoading,disabled:e.isDisabled,"loading-text":e.loadingText,"class":"page-select","popper-class":"page-select-popper",onClear:e.clearData,onChange:e.selectChanged,onVisibleChange:e.hidden},{"default":g((()=>[e.defaultOptions&&e.defaultOptions.length?(u(!0),c(m,{key:0},y(e.defaultOptions,(t=>(u(),h(s,{style:{display:"hidden"},key:t[e.valueKey]+"_hidden",label:t[e.title],value:t,"class":"el-option-hidden",title:t[e.title]},null,8,["label","value","title"])))),128)):f("",!0),(u(!0),c(m,null,y(e.optionList,(t=>(u(),h(s,{style:{width:"100%"},key:t[e.valueKey],label:t[e.title],value:t,title:t[e.title]},{"default":g((()=>[v(w(t[e.title]),1)])),_:2},1032,["label","value","title"])))),128)),e.total>10?(u(),c("div",{key:1,"class":"pagination-container",onMousedown:t[1]||(t[1]=e=>e.preventDefault())},[e.total>10?(u(),c("span",x)):f("",!0),e.total>10?(u(),h(r,{key:1,currentPage:e.params.current,"onUpdate:currentPage":t[0]||(t[0]=t=>e.params.current=t),ref:"paginationRef",background:"",small:"","pager-count":5,layout:"prev, pager, next",total:e.total,onCurrentChange:e.handleCurrentChange},null,8,["currentPage","total","onCurrentChange"])):f("",!0)],32)):f("",!0)])),_:1},8,["style","modelValue","value-key","multiple","clearable","placeholder","remote-method","loading","disabled","loading-text","onClear","onChange","onVisibleChange"])])}]]);export{V as P};