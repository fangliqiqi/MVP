import request from '@/utils/request';

/**
 * 获取菜单
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getCodeList(params) {
	return request({
		url: '/yifu-codegen/method/generator/page',
		method: 'GET',
		params,
	});
}

/**
 * 生成预览
 * @param {*} params
 */
export async function generatorPreview(params) {
	return request({
		url: '/yifu-codegen/method/generator/preview',
		method: 'GET',
		params,
	});
}


/**
 * 生成代码zip包
 * @param {*} params 
 * @returns 
 */
export async function generatorCode(data) {
	return request({
		url: '/yifu-codegen/method/generator/code',
		method: 'POST',
		data,
		responseType: 'blob' //返回是个文件
	});
}

/**
 * 获取dns列表
 * @returns 
 */
export async function  getDsNameList(){
	return request({
		url:'/yifu-codegen/method/dsconf/list',
		method: 'GET',
	})
}