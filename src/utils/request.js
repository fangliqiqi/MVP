import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import { Local } from '/@/utils/storage';
import { store } from '/@/store/index';

// 配置新建一个 axios 实例
const service = axios.create({
	// baseURL: '/api/v1.0/invoke', // 代理使用
	// baseURL: '/api',
	timeout: 60000 * 60, // 请求超时时间
	headers: {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache',
	},
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		if (Local.get('access_token')) {
			config.headers['Authorization'] = `${Local.get('token_type')} ${Local.get('access_token')}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		console.log('--------error', error); // for debug
		return Promise.reject(error);
	}
);

/**
 * 需要统一处理，需要后台返回统一处理code
 *
 * token过期
 * ip拒绝访问等
 *
 * @param {*} err
 * @returns
 */
const errorHandle = async (err) => {
	const response = err.response;
	// console.log('get errorHandle response:',response,err)
	// 针对不同的状态码做出相应的提示
	switch (response.status) {
		case 401:
			ElNotification({
				message: response.data.msg,
				type: 'warning',
			});
			break;
		case 403:
			ElNotification({
				title: response.statusText,
				message: response.data.msg,
				type: 'error',
			});
			break;
		case 424:
			// token失效，需要退出重新登录
			ElMessage.warning('Token已失效，请重新登录');
			setTimeout(async () => {
				// 防止logout接口异常，重复调用
				await store.dispatch('userInfos/logout');
				ElMessage.success('安全退出成功！');
				window.location.reload();
			}, 100);
			break;
		case 500:
			ElNotification({
				title: response.data.error,
				message: response.data.message || response.data.msg,
				type: 'error',
			});
			break;
		default:
			break;
	}
	return Promise.reject(response.data == 'null' || (response.data == 'null' ? response : ''));
};

// 添加响应拦截器
service.interceptors.response.use((response) => {
	if (response.config.responseType === 'blob') {
		// 需要下载文件
		try {
			download(response);
		} catch (e) {
			return {
				code: 200,
				msg: '下载失败',
			};
		}
		return {
			code: 200,
			msg: '下载成功',
		};
	} else {
		// 对响应数据做点什么
		return response.data;
	}
}, errorHandle);

export const AUTH_PREFIX = ''; // 登录部分
export const SYSTEM_PREFIX = ''; // 系统管理部分
export const OPERATION_PREFIX = ''; // 业务部分

// 下载文件
function download(res) {
	let blob = new Blob([res.data], {
		type: res.data.type,
	}); //type是文件类，详情可以参阅blob文件类型
	// 创建新的URL并指向File对象或者Blob对象的地址
	const blobURL = window.URL.createObjectURL(blob);
	// 创建a标签，用于跳转至下载链接
	const tempLink = document.createElement('a');
	tempLink.style.display = 'none';
	tempLink.href = blobURL;
	tempLink.setAttribute('download', decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]));
	// 兼容：某些浏览器不支持HTML5的download属性
	if (typeof tempLink.download === 'undefined') {
		tempLink.setAttribute('target', '_blank');
	}
	// 挂载a标签
	document.body.appendChild(tempLink);
	tempLink.click();
	document.body.removeChild(tempLink);
	// 释放blob URL地址
	window.URL.revokeObjectURL(blobURL);
}

// 导出 axios 实例
export default service;
