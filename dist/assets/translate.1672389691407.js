import{e as t,h as r}from"./index.1672389691407.js";import{i as e}from"./city.1672389691407.js";function i(i,a,o){if(!i||!a||!o)return t;if(!i.dict){if(i.date)return a[i.key]?r(a[i.key]).format(i.date):t;if(i.address){const t=i.address;return e({province:a[t.pro],city:a[t.city],town:a[t.town]})}if("validity"==i.key){const e=a.validityStart,i=a.validityEnd;return e&&i?`${r(e).format("YYYY-MM-DD")} 至 ${"2999-12-31"==i?"长期":r(i).format("YYYY-MM-DD")}`:t}return i["default"]?i["default"]:i.formatter?i.formatter(a):i.dictValue?i.dictValue[a[i.key]]||t:a[i.key]||t}{const r=o[i.dict];if(r)return r[a[i.key]]||t}}export{i as t};