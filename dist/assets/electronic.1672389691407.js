import{a as e,g as t,b as a,d as i}from"./addElectronic.1672389691407.js";import{P as o}from"./ProTable.1672389691407.js";import{P as r}from"./index.16723896914072.js";import n from"./detailElectronic.1672389691407.js";import{_ as s,b as l,L as c,g as d,E as p,d as m,e as u,a as f}from"./index.1672389691407.js";import{i as h,f as y,$ as g,j as x,a2 as b,c as v,W as _,P as I,aA as C,a3 as T,o as j,U as k}from"./vue.1672389691407.js";import"./attachUpload.1672389691407.js";import"./file.1672389691407.js";import"./index.16723896914073.js";import"./staff.1672389691407.js";import"./index.16723896914074.js";import"./city.1672389691407.js";const z={name:"电子档案",components:{ProTable:o,ProButtons:r,detailElectronic:n,addElectronic:e,SvgIcon:l},setup(){var e;const o=null==(e=h())?void 0:e.appContext.config.globalProperties.$message,r=y(null),n=y(null),s=y(null);let l=null;const v=C(),_=()=>{r.value&&r.value.refresh()},I=e=>"0"===e.systemFlag,T=g({jumped:!1,zipFile:null,limitZipSize:50,headers:{Authorization:`${c.get("token_type")} ${c.get("access_token")}`},literatureTypesDataSource:{},literatureTypes:null,detailConf:{},searchConfig:{option:{extBtn:"extBtns"}},columns:[{dataIndex:"empNo",title:"员工编码",minWidth:140,ellipsis:!0},{dataIndex:"empName",title:"员工姓名",minWidth:110,ellipsis:!0},{dataIndex:"empIdcard",title:"身份证号",minWidth:180},{dataIndex:"unitName",title:"单位名称",minWidth:180,ellipsis:!0},{dataIndex:"deptName",title:"项目名称",minWidth:180,ellipsis:!0},{dataIndex:"deptNo",title:"项目编码",minWidth:110,ellipsis:!0},{dataIndex:"dataType",title:"资料类型",minWidth:140,ellipsis:!0},{dataIndex:"option",title:"操作",key:"option",width:200,hideInSearch:!0,fixed:"right",scopedSlots:{customRender:"option"}}],btn:[{label:"新增",onClick:()=>{n.value&&n.value.openDialog()},permission:["archives_telecemployeeinfo_add"],icon:"icon-ic_edit_add"}],cellBtns:[{text:"详情",prop:"detail",permission:["electronic_detail"],isGray:I},{text:"编辑",prop:"edit",permission:["archives_telecemployeeinfo_edit"],tooltip:"当前档案不可编辑",isGray:I},{text:"删除",prop:"delete",permission:["archives_telecemployeeinfo_del"],tooltip:"当前档案不可删除",isGray:I}],initParams:{empIdcard:v.query.empIdcard?v.query.empIdcard:""}});x((()=>{d("literature_types").then((e=>{T.literatureTypesDataSource=e,T.columns=T.columns.map((t=>{const a={...t};return"dataType"===t.dataIndex&&(a.valueEnum=e),a}))}))}));return{...b(T),request:async e=>{try{const a=await t(e);if(a&&200==a.code&&a.data)return{current:a.data.current,total:a.data.total,data:a.data.records.map(((t,a)=>({...t,index:(e.current-1)*e.size+a+1})))}}catch(a){}return{current:1,total:0,data:[]}},onCellClick:async(e,t)=>{"delete"===e?(e=>{f.confirm("是否确定删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{try{const t=await i(e.id);t&&200===t.code?(o.success("删除成功"),_()):o.error(t.msg||"删除失败")}catch(t){o.error("删除失败")}}))["catch"]((()=>{}))})(t):"edit"===e?n.value&&n.value.openDialog(t):"detail"===e&&a(t.id).then((e=>{if(e&&200===e.code){const t=e.data;t.dataType=T.literatureTypesDataSource[t.dataType]||u,s.value&&s.value.openDialog(e.data)}else p.error(e.msg||"获取电子档案详情失败")}),(e=>{p.error(e&&e.msg||"获取电子档案详情失败")}))},proTableRef:r,addElectronicRef:n,attachDetailRef:s,refreshList:_,getLabelFromDict:(e,t)=>{const a=t?t[e]:e;return a?a.label||"--":e||"--"},onFileChange:(e,t)=>{let a=e.name;if(!/\.(zip|ZIP)$/.test(a))return p.error("上传文件必须为zip格式压缩包"),T.zipFile=null,!1;T.zipFile=e},beforeUpload:e=>{if(!(e.size/1024/1024<T.limitZipSize))return p.erro(`上传文件大小不能超过 ${T.limitZipSize}MB!`),!1;l=m.service({lock:!0,text:"上传中...",background:"rgba(0, 0, 0, 0.7)","custom-class":"dept-global-loading"})},onSuccess:(e,t,a)=>{e&&200===e.code?(p.success("批量导入成功"),_()):p.error(e.msg||"批量导入失败"),l&&l.close()},onError:e=>{setTimeout((()=>{l&&l.close(),p.error("批量导入失败")}),200)},onReset:()=>{T.initParams={}}}}},P={"class":"system-dict-container"},R=k("批量导入");var S=s(z,[["render",function(e,t,a,i,o,r){const n=T("svg-icon"),s=T("el-button"),l=T("el-upload"),c=T("pro-buttons"),d=T("pro-table"),p=T("add-electronic"),m=T("detail-electronic");return j(),v("div",P,[_(d,{ref:"proTableRef","row-key":"id",columns:e.columns,request:i.request,btn:e.btn,searchConfig:e.searchConfig,initParams:e.initParams,onOnReset:i.onReset},{extBtns:I((()=>[_(l,{"class":"upload-demo",action:"/yifu-archives/method/telecemployeeinfo/importZip","on-change":i.onFileChange,"show-file-list":!1,headers:e.headers,accept:"application/zip","on-success":i.onSuccess,"on-error":i.onError,"before-upload":i.beforeUpload},{"default":I((()=>[_(s,{type:"default",size:"default"},{"default":I((()=>[_(n,{name:"iconfont employee_batch_import"}),R])),_:1})])),_:1},8,["on-change","headers","on-success","on-error","before-upload"])])),option:I((t=>[_(c,{array:e.cellBtns,model:t,onOnClick:i.onCellClick},null,8,["array","model","onOnClick"])])),_:1},8,["columns","request","btn","searchConfig","initParams","onOnReset"]),_(p,{ref:"addElectronicRef",onOk:i.refreshList},null,8,["onOk"]),_(m,{ref:"attachDetailRef"},null,512)])}],["__scopeId","data-v-1fe8f1c6"]]);export{S as default};