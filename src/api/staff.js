import request from '@/utils/request';
/**
 * 获取人员档案列表
 * @param {*} params
 * @returns
 */
export async function getStaffList(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/page',
		method: 'get',
		params,
	});
}

/**
 * 离职库列表
 * @param {*} params
 * @returns
 */
export async function getWithDrawnList(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/getLeavePage',
		method: 'get',
		params,
	});
}

/**
 * 检查员工信息合法性
 * @param {empName:str,empIdCard :str} params
 * @returns
 */
export async function checkStaffInfo(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/checkIdCard',
		method: 'get',
		params,
	});
}

/**
 * 新增人员档案
 * @param {*} data
 */
export async function addStaffInfo(data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/addNewEmployee',
		method: 'post',
		data,
	});
}

/**
 * 编辑人员档案
 * @param {*} data
 */
export async function updateStaffInfo(data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/updateEmployee',
		method: 'post',
		data,
	});
}

/**
 * 获取人员档案详情
 * @param {*} data
 */
export async function getStaffInfo(id) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/' + id,
		method: 'get',
	});
}

/**
 * 删除人员档案
 * @param {*} data
 */
export async function delStaffInfo(id) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/deleteEmployee',
		method: 'get',
		params: { id },
	});
}

/**
 * 批量导入接口
 * @param {*} data
 * @returns
 */
export async function batchImport(data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/batchImportEmployee',
		method: 'post',
		data,
	});
}

/**
 * 获取所有项目名称
 * @returns
 */
export async function getAllDept() {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/getAllDept',
		method: 'get',
	});
}

/**
 * 获取家庭信息列表，不分页
 * @returns
 */
export async function getFamilyList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempfamily/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 获取工作记录，不分页
 * @returns
 */
export async function getJobRecordList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempworkrecording/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 学历信息，不分页
 * @returns
 */
export async function getEducationList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempeducation/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 员工伤残信息，不分页
 * @returns
 */
export async function getDisabilityList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempdisabilityinfo/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 职业资格，不分页
 * @returns
 */
export async function getProfessionalList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempprofessionalqualification/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 不良记录，不分页
 * @returns
 */
export async function getBadnessList(empIdcard) {
	return request({
		url: '/yifu-archives/method/tempbadrecord/noPage',
		method: 'post',
		data: {
			empIdcard,
		},
	});
}

/**
 * 通过ID进行减档
 * @param {id:string,leaveReason:string,leaveRemark:string} params
 * @returns
 */
export async function minusStaff(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/minusEmployee',
		method: 'get',
		params,
	});
}

/**
 * 档案复档
 * @param {id:string,projectIds:string} params projectIds通过,号分隔
 * @returns
 */
export async function restoreStaff(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/restoreEmployee',
		method: 'get',
		params,
	});
}

/**
 * 批量导出离职档案信息
 * 批量导出离职档案信息 hasPermission('employee_export_employee_leave')
 * @param {*} params
 */
export async function exportLeaveStaffList(params, data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/exportLeaveEmployee',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 * 批量导出人员档案信息
 * @param {*} params
 */
export async function exportStaffList(params, data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/exportEmployee',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
		timeout: 60000*30,
	});
}

/**
 * 批量更新人员档案 hasPermission('employee_batch_update')
 *
 */
export async function batchUpdateStaff() {
	return request({
		url: '/yifu-archives/method/temployeeinfo/batchUpdateEmployee',
		method: 'post',
		data,
	});
}

/**
 * 批量减档人员档案
 * @param { array } excelList
 *
 */
export async function batchMinusStaff(params) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/batchMinusEmployee',
		method: 'get',
		params,
	});
}

/**
 * 批量删除
 * @param {array(string)} idList
 */
export async function batchDeleteStaff(data) {
	return request({
		url: '/yifu-archives/method/temployeeinfo/batchDeleteEmployee',
		method: 'POST',
		data,
	});
}

/**
 * 获取员工信息修改日志
 * @param { empId:string} params
 */
export async function getStaffChangeLog(params) {
	return request({
		url: '/yifu-archives/method/temployeelog/getByEmpId',
		method: 'get',
		params,
	});
}

/**
 * 获取项目档案信息修改日志
 *  @param { projectId:string} params
 */
export async function getSubjectChangeLog(params) {
	return request({
		url: '/yifu-archives/method/temployeelog/getByProjectId',
		method: 'get',
		params,
	});
}

/**
 * 根据身份证查询用户名下购买的商险
 * @returns
 */
export async function getInsuranceListByIdCard(params) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceListByIdCard',
		method: 'get',
		params,
	});
}
