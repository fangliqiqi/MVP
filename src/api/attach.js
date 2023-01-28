import request from '@/utils/request';

/**
 * 获取家庭信息列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getFailyList(params) {
	return request({
		url: '/yifu-archives/method/tempfamily/page',
		method: 'GET',
		params,
	});
}

/**
 *获取家庭信息详情
 * @export
 * @param {*} params
 */
export async function getFailyDetail(id) {
	return request({
		url: '/yifu-archives/method/tempfamily/' + id,
		method: 'GET',
	});
}

/**
 *新增家庭信息
 * @export
 * @param {*} params
 */
export async function addFaily(data) {
	return request({
		url: '/yifu-archives/method/tempfamily',
		method: 'POST',
		data,
	});
}

/**
 *修改家庭信息
 * @export
 * @param {*} params
 */
export async function updatedFaily(data) {
	return request({
		url: '/yifu-archives/method/tempfamily',
		method: 'PUT',
		data,
	});
}

/**
 *删除家庭信息
 * @export
 * @param {*} params
 */
export async function deleteFaily(id) {
	return request({
		url: '/yifu-archives/method/tempfamily/' + id,
		method: 'DELETE',
	});
}

/**
 *批量删除家庭信息
 * @export
 * @param {*} params
 */
export async function deleteFailyByIds(data) {
	return request({
		url: '/yifu-archives/method/tempfamily/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
 * 导出家庭信息列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportFailyList(data) {
	return request({
		url: '/yifu-archives/method/tempfamily/noPage',
		method: 'POST',
		data,
	});
}

/**
 * 工作经历列表接口
 * @param {*} params
 * @returns
 */
export async function getJobRecordList(params) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/page',
		method: 'GET',
		params,
	});
}

/**
 *新增工作经历
 * @export
 * @param {*} params
 */
export async function addJob(data) {
	return request({
		url: '/yifu-archives/method/tempworkrecording',
		method: 'POST',
		data,
	});
}
/**
 *修改工作经历
 * @export
 * @param {*} params
 */
export async function updateJob(data) {
	return request({
		url: '/yifu-archives/method/tempworkrecording',
		method: 'PUT',
		data,
	});
}

/**
 *获取工作经历详情
 * @export
 * @param {*} params
 */
export async function getJobDetail(id) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/' + id,
		method: 'GET',
	});
}

/**
 *删除工作经历
 * @export
 * @param {*} params
 */
export async function deteleJob(id) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/' + id,
		method: 'DELETE',
	});
}

/**
 * 导出工作记录列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportJobList(data) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/noPage',
		method: 'POST',
		data,
	});
}

/**
 *批量删除工作经历
 * @export
 * @param {*} params
 */
export async function deleteJobByIds(data) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
 * 学历信息列表接口
 * @param {*} params
 * @returns
 */
export async function getdegreeList(params) {
	return request({
		url: '/yifu-archives/method/tempeducation/page',
		method: 'GET',
		params,
	});
}

/**
 *新增学历信息
 * @export
 * @param {*} params
 */
export async function addDegree(data) {
	return request({
		url: '/yifu-archives/method/tempeducation',
		method: 'POST',
		data,
	});
}
/**
 *修改学历信息
 * @export
 * @param {*} params
 */
export async function updateDegree(data) {
	return request({
		url: '/yifu-archives/method/tempeducation',
		method: 'PUT',
		data,
	});
}

/**
 *获取详情学历信息
 * @export
 * @param {*} params
 */
export async function getDegreeDetail(id) {
	return request({
		url: '/yifu-archives/method/tempeducation/' + id,
		method: 'GET',
	});
}

/**
 *删除学历信息
 * @export
 * @param {*} params
 */
export async function deteleDegree(id) {
	return request({
		url: '/yifu-archives/method/tempeducation/' + id,
		method: 'DELETE',
	});
}

/**
 * 导出学历信息列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportDegreeList(data) {
	return request({
		url: '/yifu-archives/method/tempeducation/exportEmpEducation',
		method: 'POST',
		responseType: 'blob',
		data,
	});
}

/**
 *批量删除学历信息
 * @export
 * @param {*} params
 */
export async function deleteDegreeByIds(data) {
	return request({
		url: '/yifu-archives/method/tempeducation/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
 * 伤残信息列表接口
 * @param {*} params
 * @returns
 */
export async function getInvalidismList(params) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/page',
		method: 'GET',
		params,
	});
}

/**
 *新增伤残信息
 * @export
 * @param {*} params
 */
export async function addInvalidism(data) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo',
		method: 'POST',
		data,
	});
}
/**
 *修改伤残信息
 * @export
 * @param {*} params
 */
export async function updateInvalidism(data) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo',
		method: 'PUT',
		data,
	});
}

/**
 *获取详情伤残信息
 * @export
 * @param {*} params
 */
export async function getInvalidismDetail(id) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/' + id,
		method: 'GET',
	});
}

/**
 *删除伤残信息
 * @export
 * @param {*} params
 */
export async function deleteInvalidism(id) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/' + id,
		method: 'DELETE',
	});
}

/**
 * 导出伤残信息列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportInvalidismList(data) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/noPage',
		method: 'POST',
		data,
	});
}

/**
 *批量删除伤残信息
 * @export
 * @param {*} params
 */
export async function deleteInvalidismByIds(data) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
 * 职业资格列表
 * @param {*} params
 * @returns
 */
export async function getProfessionList(params) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/page',
		method: 'GET',
		params,
	});
}

/**
 *新增职业资格
 * @export
 * @param {*} params
 */
export async function addProfession(data) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification',
		method: 'POST',
		data,
	});
}
/**
 *修改职业资格
 * @export
 * @param {*} params
 */
export async function updateProfession(data) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification',
		method: 'PUT',
		data,
	});
}

/**
 *获取职业资格详情
 * @export
 * @param {*} params
 */
export async function getProfessionDetail(id) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/' + id,
		method: 'GET',
	});
}

/**
 *删除职业资格
 * @export
 * @param {*} params
 */
export async function deleteProfession(id) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/' + id,
		method: 'DELETE',
	});
}

/**
 * 导出职业资格列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportProfessionList(data) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/noPage',
		method: 'POST',
		data,
	});
}

/**
 *批量删除职业资格
 * @export
 * @param {*} params
 */
export async function deleteProfessionByIds(data) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
 * 不良记录列表
 * @param {*} params
 * @returns
 */
export async function getBadnessList(params) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/page',
		method: 'GET',
		params,
	});
}

/**
 *新增不良记录
 * @export
 * @param {*} params
 */
export async function addBadness(data) {
	return request({
		url: '/yifu-archives/method/tempbadrecord',
		method: 'POST',
		data,
	});
}
/**
 *修改不良记录
 * @export
 * @param {*} params
 */
export async function updateBadness(data) {
	return request({
		url: '/yifu-archives/method/tempbadrecord',
		method: 'PUT',
		data,
	});
}

/**
 *获取不良记录详情
 * @export
 * @param {*} params
 */
export async function getBadnessDetail(id) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/' + id,
		method: 'GET',
	});
}

/**
 *删除不良记录
 * @export
 * @param {*} params
 */
export async function deleteBadness(id) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/' + id,
		method: 'DELETE',
	});
}

/**
 * 导出不良记录列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function exportBadnessList(data) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/export',
		method: 'POST',
		responseType: 'blob',

		data,
	});
}

/**
 *批量删除不良记录
 * @export
 * @param {*} params
 */
export async function deleteBadnessByIds(data) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/removeByIds',
		method: 'DELETE',
		data,
	});
}

/**
	通过身份证获取项目列表
*/
export async function getProjectListByidCard(params) {
	return request({
		url: '/yifu-archives/method/temployeeproject/getProjectByIdCard',
		method: 'GET',
		params,
	});
}
