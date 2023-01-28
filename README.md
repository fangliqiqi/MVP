# HRO MVP版本后台管理系统


### 框架介绍

- [关于](ABOUT.md)

https://qas-mvp-1.worfu.com/login

### 请求方式

```js 
// 推荐使用方法,/api代理已放在/@/utils/request文件内封装
import request from '/@/utils/request';


/**
 * 获取菜单
 * @param {*} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
async function getMenuList(params) {
	return request({
		url: '/admin/menu/vue',
		method: 'GET',
        params,
	});
}

```


### 项目相关文档

- [组件文档](doc/README.md)



### 其他问题

1. DatePicker首次进入选择上月数据存在显示错误的问题:https://github.com/element-plus/element-plus/issues/8802
