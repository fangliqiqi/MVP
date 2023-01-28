// 项目档案相关接口
import request from '@/utils/request';


/**
 * 分页查询
 */
 export async function getProjectPage(params) {
	return request({
		url: '/yifu-archives/method/temployeeproject/page',
		method: 'GET',
		params,
	});
}

/**
 * 删除档案
 * @returns
 */
 export async function delProject(id) {
	return request({
		url: '/yifu-archives/method/temployeeproject/' + id,
		method: 'DELETE',
	});
}

/**
 * 通过id批量删除档案
 * @returns
 */
 export async function delArrProject(data) {
	return request({
		url: '/yifu-archives/method/temployeeproject/deletebyIds',
		method: 'POST',
		data
	});
}

/**
 * 新增项目档案校验
 */
 export async function checkProject(data) {
	return request({
		url: '/yifu-archives/method/temployeeproject/check',
		method: 'POST',
		data
	});
}

/**
 * 根据员工身份证和项目编号查询信息
 */
 export async function getItemInfo(params) {
	return request({
		url: '/yifu-archives/method/temployeeproject/getItemInfo',
		method: 'POST',
		params
	});
}

/**
 * 新增项目档案
 */
export async function addProject(data) {
	return request({
		url: '/yifu-archives/method/temployeeproject',
		method: 'POST',
		data
	});
}

/**
 * 查询项目档案信息
 */
 export async function getProjectInfo(id) {
	return request({
		url: '/yifu-archives/method/temployeeproject/'+ id,
		method: 'GET',
	});
}

/**
 * 更新项目档案
 */
export async function updateProject(data) {
	return request({
		url: '/yifu-archives/method/temployeeproject',
		method: 'PUT',
		data
	});
}

/**
 * 获取项目详情
 * @param {*} id 
 */
export async function getSubjectInfo(id) { 
	return request({
		url: '/yifu-archives/method/temployeeproject/'+id,
		method: 'get',
	});

 }

/**
 * 根据人员档案id获取项目list
 * @param {*} empId  人员档案ID  projectStatus：1或不传，则查全部；0，查在项。
 * @returns 
 */
export async function getProjectListByStaffId(params) { 
	return request({
		url: '/yifu-archives/method/temployeeproject/getListByEmpId',
		method: 'get',
		params
	});
}

/**
 * 减项
 */
export async function deleteEmpProject(data) {
	return request({
		url: '/yifu-archives/method/temployeeproject/deleteEmpPro',
		method: 'POST',
		data
	});
}

/**
 * 导出
 */
 export async function exportEmpProject(params,data) {
	return request({
		url: '/yifu-archives/method/temployeeproject/export',
		method: 'POST',
		responseType:'blob',
		params,
		data,
		timeout: 60000*30,
	});
}


/**
 * 复档复项相关
 * @param {empId:str,empProId:str} data // empId  复档  empProId 复项 
 */
export async function reEmpInfo(data){
	return request({
		url:'/yifu-archives/method/temployeeproject/reEmpInfo',
		method: 'POST',
		data,
	})
	
}