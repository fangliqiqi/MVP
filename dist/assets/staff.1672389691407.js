import{s as e}from"./index.1672389691407.js";async function t(t){return e({url:"/yifu-archives/method/temployeeinfo/page",method:"get",params:t})}async function a(t){return e({url:"/yifu-archives/method/temployeeinfo/getLeavePage",method:"get",params:t})}async function o(t){return e({url:"/yifu-archives/method/temployeeinfo/checkIdCard",method:"get",params:t})}async function r(t){return e({url:"/yifu-archives/method/temployeeinfo/addNewEmployee",method:"post",data:t})}async function n(t){return e({url:"/yifu-archives/method/temployeeinfo/updateEmployee",method:"post",data:t})}async function s(t){return e({url:"/yifu-archives/method/temployeeinfo/"+t,method:"get"})}async function i(t){return e({url:"/yifu-archives/method/temployeeinfo/deleteEmployee",method:"get",params:{id:t}})}async function m(){return e({url:"/yifu-archives/method/tempchangeinfo/getAllDept",method:"get"})}async function u(t){return e({url:"/yifu-archives/method/tempfamily/noPage",method:"post",data:{empIdcard:t}})}async function d(t){return e({url:"/yifu-archives/method/tempworkrecording/noPage",method:"post",data:{empIdcard:t}})}async function c(t){return e({url:"/yifu-archives/method/tempeducation/noPage",method:"post",data:{empIdcard:t}})}async function y(t){return e({url:"/yifu-archives/method/tempdisabilityinfo/noPage",method:"post",data:{empIdcard:t}})}async function h(t){return e({url:"/yifu-archives/method/tempprofessionalqualification/noPage",method:"post",data:{empIdcard:t}})}async function p(t){return e({url:"/yifu-archives/method/tempbadrecord/noPage",method:"post",data:{empIdcard:t}})}async function f(t){return e({url:"/yifu-archives/method/temployeeinfo/minusEmployee",method:"get",params:t})}async function l(t){return e({url:"/yifu-archives/method/temployeeinfo/restoreEmployee",method:"get",params:t})}async function g(t,a){return e({url:"/yifu-archives/method/temployeeinfo/exportLeaveEmployee",method:"POST",responseType:"blob",params:t,data:a})}async function v(t,a){return e({url:"/yifu-archives/method/temployeeinfo/exportEmployee",method:"POST",responseType:"blob",params:t,data:a,timeout:18e5})}async function I(t){return e({url:"/yifu-archives/method/temployeeinfo/batchDeleteEmployee",method:"POST",data:t})}async function P(t){return e({url:"/yifu-archives/method/temployeelog/getByEmpId",method:"get",params:t})}async function E(t){return e({url:"/yifu-archives/method/temployeelog/getByProjectId",method:"get",params:t})}async function b(t){return e({url:"/yifu-insurances/method/insuranceDetail/getInsuranceListByIdCard",method:"get",params:t})}export{s as a,u as b,d as c,c as d,y as e,h as f,t as g,p as h,P as i,b as j,E as k,m as l,r as m,I as n,v as o,i as p,o as q,l as r,f as s,a as t,n as u,g as v};