import{b as e}from"./city.1672389691407.js";import{X as a}from"./header.1672389691407.js";import{t as s}from"./index.1672389691407.js";function t(e,a,t){return s(e,a,t,"[空值]")}function r(a,s,r){let c=s[a];switch(c&&c.length>10&&c.indexOf("00:00:00")>-1&&(c=c.substring(0,10)),a){case"empNatrue":c=t("emp_natrue",c,r);break;case"empSex":c=t("sexOption",c,r);break;case"empMarriStatus":c=t("emp_married",c,r);break;case"empNational":c=t("emp_national",c,r);break;case"politicalStatus":c=t("emp_political",c,r);break;case"empRegisType":c=t("emp_registype",c,r);break;case"hignEducation":c=t("education",c,r);break;case"isCollege":c=t("collegeDict",c,r);break;case"contractStatus":c=t("personnel_state",c,r);break;case"socialStatus":c=t("social_ecurity_state",c,r);break;case"fundStatus":c=t("fund_status",c,r);break;case"insuranceStatus":c=t("commercial_satte",c,r);break;case"salaryStatus":c=t("salaryStatusOption",c,r);break;case"fileSource":c=t("EMP_SOURCE",c,r);break;case"contractType":c=t("personnel_type",c,r);break;case"status":case"fileStatus":c=1==s.fileStatus?"已减档":t("fileStatusEnmu",c,r);break;case"workingHours":c=t("work_type",c,r);break;case"leaveReason":c=t("social_reduce_reason",c,r);break;case"projectSource":c=t("project_emp_source",c,r);break;case"projectStatus":c=1==s.projectStatus?"已减项":0==s.projectStatus&&0==s.status?"草稿":0==s.projectStatus&&1==s.status?"已审核":"[空值]";break;case"idProvince":case"idCity":case"idTown":case"fileProvince":case"fileCity":case"fileTown":if(c){const a=e[c];c=a?a.areaName:"[空值]"}else c="[空值]";break;case"isLeaveEmployee":c=0==c?"否":1==c?"是":"[空值]";break;case"businessPrimaryType":c=t("customer_business_parent",c,r);break;case"businessSecondType":c=t("customer_business_type",c,r);break;case"businessThirdType":c=t("customer_business_sub_type",c,r);break;case"validityEnd":c="2999-12-31"==c?"长期":c;break;default:if(null==c)return"[空值]"}return c}function c(e,s){let t=null;switch(e){case"leaveTime":t="staff"===s?"减档时间":" 减项时间";break;case"leaveReason":t="staff"===s?"减档原因":" 减项原因";break;case"leaveRemark":t="staff"===s?"减档备注":" 减项备注";break;case"businessPrimaryType":t="业务类型一级分类";break;default:t=a[e]||e||"--"}return t.replace(/&emsp;/g,"")}function i(e,a){if(!e)return"少字段值";if(!a)return"少翻译数据";let s=null;return a.map((a=>{a.dataIndex==e&&(s=a.title)})),s}function n(e,a,s){if(!e)return"少字段值";if(!a)return"少新旧值的数据";if(!s)return"少翻译数据";const t=a[e];let r="";return s.map((a=>{a.dataIndex==e&&a.dictValue&&(r=a.dictValue[t])})),r||t}export{r as a,i as b,n as c,c as g};