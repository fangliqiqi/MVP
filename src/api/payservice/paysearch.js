import request from '@/utils/request';

/**
 * 薪酬人员查询-列表
 * @param {*} params 
 * @returns 
 */
export async function getpayPeopleList(params) {
	return request({
		url: '/yifu-salary/method/tsalaryemployee/page',
		method: 'GET',
		params,
	});
}

/**
 *薪酬人员查询-详情
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function getpayPeopleDetail(id) {
  return request({
    url: '/yifu-salary/method/tsalaryemployee/'+id,
    method: 'GET',
  });
}

/**
 *薪酬新人查询-编辑
 * @export
 * @param {*} 
 * @return {*} 
 */
export async function editpayPeople(data) {
  return request({
    url: '/yifu-salary/method/tsalaryemployee',
    method: 'PUT',
    data,
  });
}

/**
 *薪酬人员查询-导出
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function exportpayPeople(data) {
  return request({
    url: '/yifu-salary/method/tsalaryemployee/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}


// 薪酬人员查询批量更新
export async function batchUpdatePayPeople(data) {
  return request({
    url: '/yifu-salary/method/tsalaryemployee/batchUpdateSalaryEmployee',
    method: 'POST',
    data,
  });
}

/**
 *薪酬人员查询批量导入
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function batchImportPayPeople(data) {
  return request({
    url: '/yifu-salary/method/tsalaryemployee/importEmployee',
    method: 'POST',
    data,
  });
}

/**
 * 薪酬项目查询-列表
 * @param {*} params 
 * @returns 
 */
 export async function getpayProjectList(params) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/page',
		method: 'GET',
		params,
	});
}



/**
 *项目薪酬查询-导出
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function exportpayProject(data) {
  return request({
    url: '/yifu-salary/method/tsalarystandard/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}

/**
 * 薪酬项目-获取工资列明细以及配置
 * @param {*} params 
 * @returns 
 */
 export async function getsalarySheetDetail(id) {
	return request({
		url: '/yifu-salary/method/tsalaryaccountitem/getSalarySet?salaryId='+id,
		method: 'GET',
	});
}


/**
 *
 *薪酬项目-工资条配置
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function saveSalarySheet(data) {
  return request({
    url: '/yifu-salary/method/tsalarystandardset/saveOrUptateSet',
    method: 'POST',
    data,
  });
}

/**
 *薪酬项目 -清空工资条配置
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function delSalarySheet(id) {
  return request({
    url: '/yifu-salary/method/tsalarystandardset/'+id,
    method: 'DELETE',
  });
}

/**
 *员工报账查询-列表 
 * @export
 * @param {*} params
 * @return {*} 
 */
export async function getpeoBillList(params) {
  return request({
    url: '/yifu-salary/method/tsalaryaccount/page',
    method: 'GET',
    params,
  });
}

/**
 *员工报账查询-列表  订单专用 
 * @export
 * @param {*} params
 * @return {*} 
 */
 export async function getpeoBillListOrder(params) {
  return request({
    url: '/yifu-salary/method/tsalaryaccount/pageOrder',
    method: 'GET',
    params,
  });
}

// 员工报账查询-导出
export async function exportpeoBill(data) {
  return request({
    url: '/yifu-salary/method/tsalaryaccount/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}

//工资条查询
export async function getpaySearechList(params) {
  return request({
    url: '/yifu-salary/method/tsalaryaccount/getEmpAccount',
    method: 'GET',
    params,
  });
}