import{ac as e,_ as l,a8 as t,ad as a,E as o,ae as n,af as r}from"./index.1672389691407.js";import{n as s,d as i,f as d,$ as c,k as u,j as f,h as m,a3 as p,o as h,c as g,W as b,P as y,O as I,J as V,X as v,Q as x,R as _,a as w,V as F,T as S,u as k,F as P,a5 as O,U as T}from"./vue.1672389691407.js";const D=()=>new Promise(((e,l)=>{s((()=>{const t=document.styleSheets;let a=[],o=[];for(let e=0;e<t.length;e++)t[e].href&&t[e].href.indexOf("iconfont.css")>-1&&a.push(t[e]);for(let e=0;e<a.length;e++)for(let l=0;l<a[e].cssRules.length;l++)a[e].cssRules[l].selectorText&&a[e].cssRules[l].selectorText.indexOf(".icon-")>-1&&o.push(`${a[e].cssRules[l].selectorText.substring(1,a[e].cssRules[l].selectorText.length).replace(/\:\:before/gi,"")}`);o.length>0?e(o):l("未获取到值，请刷新重试")}))})),R=()=>new Promise(((l,t)=>{s((()=>{const a=e,o=[];for(const e in a)o.push(`ele-${a[e].name}`);o.length>0?l(o):t("未获取到值，请刷新重试")}))})),C=()=>new Promise(((e,l)=>{s((()=>{const t=document.styleSheets;let a=[],o=[];for(let e=0;e<t.length;e++)t[e].href&&t[e].href.indexOf("netdna.bootstrapcdn.com")>-1&&a.push(t[e]);for(let e=0;e<a.length;e++)for(let l=0;l<a[e].cssRules.length;l++)a[e].cssRules[l].selectorText&&0===a[e].cssRules[l].selectorText.indexOf(".fa-")&&-1===a[e].cssRules[l].selectorText.indexOf(",")&&/::before/.test(a[e].cssRules[l].selectorText)&&o.push(`${a[e].cssRules[l].selectorText.substring(1,a[e].cssRules[l].selectorText.length).replace(/\:\:before/gi,"")}`);o.length>0?e(o.reverse()):l("未获取到值，请刷新重试")}))})),U={"class":"icon-selector"},L={"class":"icon-selector-warp"},z={"class":"icon-selector-warp-title flex"},$={"class":"flex-auto"},q={key:0,"class":"icon-selector-warp-title-tab"},B={"class":"icon-selector-warp-row"},W={"class":"flex-margin"},j={"class":"icon-selector-warp-item-value"},A=i({name:"iconSelector"}),E=Object.assign(A,{props:{prepend:{type:String,"default":()=>"ele-Pointer"},placeholder:{type:String,"default":()=>"请输入内容搜索图标或者选择图标"},size:{type:String,"default":()=>"default"},title:{type:String,"default":()=>"请选择图标"},type:{type:String,"default":()=>"ele"},disabled:{type:Boolean,"default":()=>!1},clearable:{type:Boolean,"default":()=>!0},emptyDescription:{type:String,"default":()=>"无相关图标"},modelValue:String},emits:["update:modelValue","get","clear","nextInput"],setup(e,{emit:l}){const t=e,a=d(),o=d(),n=c({fontIconPrefix:"",fontIconVisible:!1,fontIconWidth:0,fontIconSearch:"",fontIconSheetsList:[],fontIconPlaceholder:"请选择",fontIconType:"ali"}),r=()=>{},i=()=>{if(n.fontIconVisible=!n.fontIconVisible,n.fontIconVisible)setTimeout((()=>{n.fontIconSheetsList.filter((e=>e===n.fontIconSearch)).length<=0&&(n.fontIconSearch="")}),300);else{if(!t.modelValue)return!1;n.fontIconSearch=""}n.fontIconPlaceholder=t.modelValue},T=()=>{setTimeout((()=>{n.fontIconSheetsList.filter((e=>e===n.fontIconSearch)).length<=0&&(n.fontIconSearch=""),n.fontIconVisible=!1}),300)},A=()=>{if(""===t.modelValue)return!1;n.fontIconPlaceholder=t.modelValue,n.fontIconPrefix=t.modelValue},E=u((()=>{if(!n.fontIconSearch)return n.fontIconSheetsList;let e=n.fontIconSearch.trim().toLowerCase();return n.fontIconSheetsList.filter((l=>{if(-1!==l.toLowerCase().indexOf(e))return l}))})),J=()=>{s((()=>{n.fontIconWidth=a.value.$el.offsetWidth}))},M=e=>{n.fontIconType=e,(async e=>{n.fontIconSheetsList=[],"ali"===e?await D().then((e=>{n.fontIconSheetsList=e.map((e=>`iconfont ${e}`))})):"ele"===e?await R().then((e=>{n.fontIconSheetsList=e})):"awe"===e&&await C().then((e=>{n.fontIconSheetsList=e.map((e=>`fa ${e}`))})),n.fontIconPlaceholder=t.placeholder,A(),o.value.wrap$.scrollTop=0})(e),s((()=>{a.value&&a.value.blur()}))},Q=()=>{n.fontIconPrefix="",l("clear",n.fontIconPrefix),l("update:modelValue",n.fontIconPrefix)};return f((()=>{var e,l,a;"all"===t.type?(null==(e=t.modelValue)?void 0:e.indexOf("iconfont"))>-1?M("ali"):(null==(l=t.modelValue)?void 0:l.indexOf("element"))>-1?M("ele"):(null==(a=t.modelValue)?void 0:a.indexOf("fa"))>-1?M("awe"):M("ali"):M(t.type),window.addEventListener("resize",(()=>{J()})),J()})),m((()=>t.modelValue),(()=>{A()})),(t,s)=>{const d=p("SvgIcon"),c=p("el-input"),u=p("el-col"),f=p("el-row"),m=p("el-empty"),D=p("el-scrollbar"),R=p("el-popover");return h(),g("div",U,[b(R,{placement:"bottom",width:n.fontIconWidth,visible:n.fontIconVisible,"onUpdate:visible":s[4]||(s[4]=e=>n.fontIconVisible=e),"popper-class":"icon-selector-popper"},{reference:y((()=>[b(c,{modelValue:n.fontIconSearch,"onUpdate:modelValue":s[0]||(s[0]=e=>n.fontIconSearch=e),placeholder:n.fontIconPlaceholder||"请选择",clearable:e.clearable,disabled:e.disabled,size:e.size,ref_key:"inputWidthRef",ref:a,onClick:i,onClear:Q,onFocus:r,onBlur:T,readonly:!n.fontIconVisible},{prepend:y((()=>{var l,t;return[(""===n.fontIconPrefix?(null==(l=e.prepend)?void 0:l.indexOf("ele-"))>-1:(null==(t=n.fontIconPrefix)?void 0:t.indexOf("ele-"))>-1)?(h(),I(d,{key:0,name:""===n.fontIconPrefix?e.prepend:n.fontIconPrefix,"class":"font14"},null,8,["name"])):(h(),g("em",{key:1,"class":V([""===n.fontIconPrefix?e.prepend:n.fontIconPrefix,"font14"])},null,2))]})),_:1},8,["modelValue","placeholder","clearable","disabled","size","readonly"])])),"default":y((()=>[b(v,{name:"el-zoom-in-top"},{"default":y((()=>[x(w("div",L,[w("div",z,[w("div",$,F(e.title),1),"all"===e.type?(h(),g("div",q,[w("span",{"class":V([{"span-active":"ali"===n.fontIconType},"ml10"]),onClick:s[1]||(s[1]=e=>M("ali")),title:"iconfont 图标"},"ali",2),w("span",{"class":V([{"span-active":"ele"===n.fontIconType},"ml10"]),onClick:s[2]||(s[2]=e=>M("ele")),title:"elementPlus 图标"},"ele",2),w("span",{"class":V([{"span-active":"awe"===n.fontIconType},"ml10"]),onClick:s[3]||(s[3]=e=>M("awe")),title:"fontawesome 图标"},"awe",2)])):S("",!0)]),w("div",B,[b(D,{ref_key:"selectorScrollbarRef",ref:o},{"default":y((()=>[k(E).length>0?(h(),I(f,{key:0,gutter:10},{"default":y((()=>[(h(!0),g(P,null,O(k(E),((e,t)=>(h(),I(u,{xs:6,sm:4,md:4,lg:4,xl:4,onClick:t=>(e=>{n.fontIconPlaceholder=e,n.fontIconVisible=!1,n.fontIconPrefix=e,l("get",n.fontIconPrefix),l("update:modelValue",n.fontIconPrefix)})(e),key:t},{"default":y((()=>[w("div",{"class":V(["icon-selector-warp-item",{"icon-selector-active":n.fontIconPrefix===e}])},[w("div",W,[w("div",j,[b(d,{name:e},null,8,["name"])])])],2)])),_:2},1032,["onClick"])))),128))])),_:1})):S("",!0),k(E).length<=0?(h(),I(m,{key:1,"image-size":100,description:e.emptyDescription},null,8,["description"])):S("",!0)])),_:1},512)])],512),[[_,n.fontIconVisible]])])),_:1})])),_:1},8,["width","visible"])])}}});const J={"class":"system-add-menu-container"},M=T("菜单"),Q=T("按钮"),X=T(" 数据权限 "),G=T("是"),H=T("否"),K=T("是"),N=T("否"),Y={"class":"dialog-footer"},Z=T("取 消"),ee=T("确 定"),le=i({name:"systemAddMenu"});var te=l(Object.assign(le,{emits:["ok"],setup(e,{expose:l,emit:s}){const i=d(null),f=c({isShowDialog:!1,title:"新增菜单",id:null,ruleForm:{parentId:-1,type:0,icon:null,name:"",path:"",sortOrder:0,permission:"",flag:1,systemFlag:1},isBtn:!1,menuData:[]}),m=u((()=>"0"==f.ruleForm.type?"菜单":"按钮")),V=c({name:[{required:!0,validator:(e,l,t)=>{l?t():t(new Error(`请输入${m.value}名称`))},trigger:"blur"}],path:[{required:!0,message:"请输入路由地址",trigger:"blur"}],type:[{required:!0,message:"请选择类型",trigger:"blur"}],flag:[{required:!0,message:"请选择是否开启数据权限",trigger:"blur"}],sortOrder:[{required:!0,message:"请输入排序",trigger:"blur"}],systemFlag:[{required:!0,message:"请选择是否是系统菜单",trigger:"blur"}],parentId:[{required:!0,message:"请选择父级菜单",trigger:"blur"}]}),v=e=>{f.isBtn=1==e,f.ruleForm={type:e,icon:null,name:"",path:"",sortOrder:0,permission:"",flag:1,systemFlag:1},f.menuData=x(f.menuData),f.ruleForm.parentId=0===e?"-1":null,i.value&&i.value.clearValidate()},x=e=>e.map((e=>{const l={...e};return f.id&&e.id===f.id||!f.isBtn&&"0"==e.flag?l.disabled=!0:l.disabled=!1,e.children&&(l.children=x(e.children)),l})),_=e=>e.map((e=>{const l={...e};if(e.children){const t=_(e.children);l.children=t,t&&0!==t.length||delete l.children}return"1"===e.type?null:l})).filter((e=>e)),F=async()=>{try{const e=await t();if(e&&200==e.code){const l=[{id:"-1",keepAlive:"0",label:"根菜单",name:"根菜单",path:"/",permission:"",sortOrder:0,type:"0",weight:0}];l[0].children=_(e.data||[]),f.menuData=l}}catch(e){const l=[{id:"-1",keepAlive:"0",label:"根菜单",name:"根菜单",path:"/",permission:"",sortOrder:0,type:"0",weight:0}];l[0].children=[],f.menuData=l}},P=()=>{i.value&&i.value.clearValidate(),f.isShowDialog=!1},O=()=>{P()},T=d(!1),D=()=>{i.value&&i.value.validate((e=>{e&&(T.value=!0,null!==f.id&&void 0!==f.id?a(f.ruleForm).then((e=>{e&&200==e.code?(o.success("编辑菜单成功"),s("ok"),P()):o.error(e.msg||"编辑菜单失败")}),(()=>{o.error("编辑菜单失败")}))["finally"]((()=>{n(),T.value=!1})):r(f.ruleForm).then((e=>{e&&200==e.code?(o.success("新增菜单成功"),s("ok"),P()):o.error(e.msg||"新增菜单失败")}),(()=>{o.error("新增菜单失败")}))["finally"]((()=>{n(),T.value=!1})))}))};return l({openDialog:async e=>{await F(),e?(f.title="编辑菜单",f.id=e.menuId,f.ruleForm=e):(f.title="新增菜单",f.id=null,f.ruleForm={parentId:"-1",type:0,icon:null,name:"",path:"",sortOrder:0,permission:"",flag:1,systemFlag:1}),f.menuData=x(f.menuData),f.isShowDialog=!0}}),(e,l)=>{const t=p("el-radio-button"),a=p("el-radio-group"),o=p("el-form-item"),n=p("el-col"),r=p("el-tree-select"),s=p("el-input"),d=p("el-input-number"),c=p("svg-icon"),u=p("el-tooltip"),x=p("el-row"),_=p("el-form"),F=p("el-button"),R=p("el-dialog");return h(),g("div",J,[b(R,{title:f.title,modelValue:f.isShowDialog,"onUpdate:modelValue":l[9]||(l[9]=e=>f.isShowDialog=e),width:"600px",onClose:P,"close-on-click-modal":!1},{footer:y((()=>[w("span",Y,[b(F,{onClick:O,size:"default"},{"default":y((()=>[Z])),_:1}),b(F,{type:"primary",loading:T.value,onClick:D,size:"default"},{"default":y((()=>[ee])),_:1},8,["loading"])])])),"default":y((()=>[b(_,{ref_key:"formRef",ref:i,model:f.ruleForm,size:"default","label-width":"80px",rules:V},{"default":y((()=>[b(x,null,{"default":y((()=>[b(n,{span:12,"class":"mb20"},{"default":y((()=>[b(o,{prop:"type",label:"类型"},{"default":y((()=>[b(a,{modelValue:f.ruleForm.type,"onUpdate:modelValue":l[0]||(l[0]=e=>f.ruleForm.type=e),disabled:f.id,onChange:v},{"default":y((()=>[b(t,{label:0},{"default":y((()=>[M])),_:1}),b(t,{label:1},{"default":y((()=>[Q])),_:1})])),_:1},8,["modelValue","disabled"])])),_:1})])),_:1}),b(n,{span:12,"class":"mb20"},{"default":y((()=>[b(o,{label:"上级菜单",prop:"parentId"},{"default":y((()=>[b(r,{filterable:"",placeholder:"请选择上级菜单",modelValue:f.ruleForm.parentId,"onUpdate:modelValue":l[1]||(l[1]=e=>f.ruleForm.parentId=e),data:f.menuData,"node-key":"id","check-strictly":"0"==f.ruleForm.type},null,8,["modelValue","data","check-strictly"])])),_:1})])),_:1}),"0"==f.ruleForm.type?(h(),I(n,{key:0,span:24,"class":"mb20"},{"default":y((()=>[b(o,{label:"菜单图标",prop:"icon"},{"default":y((()=>[b(E,{style:{width:"100%"},placeholder:"请输入菜单图标",modelValue:f.ruleForm.icon,"onUpdate:modelValue":l[2]||(l[2]=e=>f.ruleForm.icon=e),type:"ali"},null,8,["modelValue"])])),_:1})])),_:1})):S("",!0),b(n,{"class":"mb20"},{"default":y((()=>[b(o,{label:"名称",prop:"name"},{"default":y((()=>[b(s,{modelValue:f.ruleForm.name,"onUpdate:modelValue":l[3]||(l[3]=e=>f.ruleForm.name=e),placeholder:`请输入${k(m)}名称`,maxlength:"20",clearable:""},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),"0"==f.ruleForm.type?(h(),I(n,{key:1,"class":"mb20"},{"default":y((()=>[b(o,{label:"路由地址",prop:"path"},{"default":y((()=>[b(s,{modelValue:f.ruleForm.path,"onUpdate:modelValue":l[4]||(l[4]=e=>f.ruleForm.path=e),placeholder:"请输入路由地址",maxlength:"128",clearable:""},null,8,["modelValue"])])),_:1})])),_:1})):S("",!0),"1"==f.ruleForm.type?(h(),I(n,{key:2,"class":"mb20"},{"default":y((()=>[b(o,{label:"权限标识",prop:"permission"},{"default":y((()=>[b(s,{modelValue:f.ruleForm.permission,"onUpdate:modelValue":l[5]||(l[5]=e=>f.ruleForm.permission=e),maxlength:"50",placeholder:"请输入权限标识",clearable:""},null,8,["modelValue"])])),_:1})])),_:1})):S("",!0),b(n,{span:11,"class":"mb20"},{"default":y((()=>[b(o,{label:"排序",prop:"sortOrder"},{"default":y((()=>[b(d,{modelValue:f.ruleForm.sortOrder,"onUpdate:modelValue":l[6]||(l[6]=e=>f.ruleForm.sortOrder=e),placeholder:"请输入排序","class":"w100",min:0},null,8,["modelValue"])])),_:1})])),_:1}),0==f.ruleForm.type?(h(),I(n,{key:3,span:11,offset:2,"class":"mb20"},{"default":y((()=>[b(o,{prop:"flag","class":"tips","label-width":"100px"},{label:y((()=>[w("div",null,[X,b(u,{"class":"item",effect:"dark",content:"该选项控制此菜单是否可配置数据权限",placement:"top"},{"default":y((()=>[b(c,{name:"iconfont icon-ic-more1"})])),_:1})])])),"default":y((()=>[b(a,{modelValue:f.ruleForm.flag,"onUpdate:modelValue":l[7]||(l[7]=e=>f.ruleForm.flag=e)},{"default":y((()=>[b(t,{label:0},{"default":y((()=>[G])),_:1}),b(t,{label:1},{"default":y((()=>[H])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1})):S("",!0),b(n,{span:11,offset:0==f.ruleForm.type?0:2,"class":"mb20"},{"default":y((()=>[b(o,{label:"系统菜单",prop:"systemFlag"},{"default":y((()=>[b(a,{modelValue:f.ruleForm.systemFlag,"onUpdate:modelValue":l[8]||(l[8]=e=>f.ruleForm.systemFlag=e),style:{width:"100%"},disabled:f.id},{"default":y((()=>[b(t,{label:0},{"default":y((()=>[K])),_:1}),b(t,{label:1},{"default":y((()=>[N])),_:1})])),_:1},8,["modelValue","disabled"])])),_:1})])),_:1},8,["offset"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])])}}}),[["__scopeId","data-v-258a76bc"]]);export{te as default};