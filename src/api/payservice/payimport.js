import request from '@/utils/request';

/**
 * 薪酬导入申请-列表
 * @param {*} params 
 * @returns 
 */
export async function getpayImportList(params) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/pageApply',
		method: 'GET',
		params,
	});
}

/**
 *薪酬导入申请-导入接口 
 *上传：jsonString：表格json；settleDepart：结算主体id；configId：工资配置结算月等信息的id；salaryType：工资类型
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function payImport(params,data) {
	return request({
		url: '/yifu-salary/method/salary/upload',
		method: 'POST',
		params,
		data
		
	});
}

/**
 *薪酬导入申请-获取配置名称 
 *获取结算主体下的配置列表
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function getConfigList(id) {
	return request({
		url: '/yifu-salary/method//tconfigsalary/getTConfigSalaryList?settleDepart=' + id,
		method: 'POST',
	});
}

/**
 *薪酬导入申请-删除 salary_tsalarystandard_del
 *
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function deletepayImport(id) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/' + id,
		method: 'DELETE',
	});
}



/**
 *薪酬导入- 获取详情 
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function getpayImportDetail(id) {
	return request({
		url: '/yifu-salary/method//salary/openBill?salaryFormId='+id ,
		method: 'POST',
	});
}

/**
 *薪酬导入-提交
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function submitpayImport(data) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/doSubmit',
		method: 'POST',
		data
	});
}

/**
 *年终奖导入测算
 *
 * @export
 * @param {*} params
 * @param {*} data
 * @return {*} 
 */
export async function annualBonusImport(params,data) {
	return request({
		url: '/yifu-salary/method/tstatisticsbonus/importListAdd',
		method: 'POST',
		responseType: 'blob',
		params,
		data
	});
}


/**
 *发送数字化平台
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function doSendEKP(id) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/doSend?id='+id,
		method: 'POST',
		timeout: 60000 * 30,//30分钟
	});
}

// 
/**
 *推送收入
 * @export
 * @param {*} params id
 * @return {*} 
 */
export async function doPushincome(id) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/salaryDoIncome?id='+id,
		method: 'GET',
		timeout: 60000 * 30,//30分钟
	});
}

/**
 * 薪酬导入审核-列表
 * @param {*} params 
 * @returns 
 */
 export async function getpayImportAuditList(params) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/auditPage',
		method: 'GET',
		params,
	});
}

// 薪酬导入审核-审核
export async function payImportAudit(params) {
	return request({
		url: '/yifu-salary/method/tsalarystandard/salaryStandardAudit',
		method: 'POST',
		params
	});
}