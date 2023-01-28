import request from '@/utils/request';

/**
 * 获取客服账号列表
 * @param {*} params
 * @returns
 */
export async function getCustomerList(params) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount/page',
		method: 'get',
		params,
	});
}


/**
 * 获取公司列表
 * @param {*} params
 * @returns
 */
 export async function getCompanyInfoList(params) {
	return request({
		url: '/yifu-archives/method/fddcompanyinfo/page',
		method: 'get',
		params,
	});
}



/**
 * 获取员工加入过的列表
 * @param {*} params
 * @returns
 */
 export async function getAllDepart(params) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount/getAllDepart',
		method: 'post',
		params,
	});
}



/**
 * 新增实名认证
 * @param {*} data
 * @returns
 */
export async function addCertification(data) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount',
		method: 'post',
		data,
	});
}

/**
 * 主动发送员工进行法大大实名
 * @param {id:str} params
 * @returns
 */
export async function sendAuthMessage(params) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount/sendAuthMessage',
		method: 'post',
		params,
	});
}

/**
 * 邀请客服进行法大大实名
 * @param {"moblie": "string", "name": "string","idCard": "string",} data 
 * @returns 
 */
export async function inviteReal(data) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount/saneSend',
		method: 'post',
		data,
	});
}

/**
 * 邀请客服加入组织
 * @param {*} data 
 * @returns 
 */
export async function inviteGroup(data) {
	return request({
		url: '/yifu-archives/method/fddpersonaccount/getAddEmployeeUrl',
		method: 'post',
		data,
	});
}

/**
 * 移除员工
 * @param {id:str,companyUnionIds:array(str),unionIds:str} data 
 * @returns 
 */
export async function removeEmp(params) {  
	return request({
		url: '/yifu-archives/method/fddpersonaccount/delEmployee',
		method: 'post',
		params,
	});
}

/**
 * 通过员工id查询所拥有的印章权限
 * @param {*} params 
 * @returns 
 */
export async function getSealId(params) {
	return request({
		url:'/yifu-archives/method/fddsealpersonauth/getSealId',
		method: 'post',
		params,
	})
}


/**
 * 获取所有印章列表
 * @param {*} params 
 * @returns 
 */
export async  function getSealList(params) {
	return request({
		url:'/yifu-archives/method/fddsealinfo/page',
		method:'get',
		params,
	})
}


/**
 * 印章授权
 * @param {id:str,fddPersonAccountId:str} params 
 * @returns 
 */
export async function sealAuth(params){
	return request({
		url:'/yifu-archives/method/fddsealinfo/sealAuth',
		method:'post',
		params,
	})
}


/**
 * 印章取消授权
 * @param {id:str,fddPersonAccountId:str} params 
 * @returns 
 */
 export async function cancelSealAuth(params){
	return request({
		url:'/yifu-archives/method/fddsealinfo/cancelSealAuth',
		method:'post',
		params,
	})
}




/**
 * 获取电子合同模板列表
 * @param {*} params
 * @returns
 */
export async function getEleContractTemplateList(params) {
	return request({
		url: '/yifu-archives/method/fddcontracttemplate/page',
		method: 'get',
		params,
	});
}



/**
 * 新增电子合同模板
 * @param {*} data 
 * @returns 
 */
export async function addContractTemplate(data){
	return request({
		url: '/yifu-archives/method/fddcontracttemplate',
		method: 'post',
		data,
	});
}



/**
 * 修改电子合同模板
 * @param {*} data 
 * @returns 
 */
 export async function updateContractTemplate(data){
	return request({
		url: '/yifu-archives/method/fddcontracttemplate',
		method: 'put',
		data,
	});
}


/**
 * 获取电子合同模板
 * @param {*} id  合同模板id 
 * @returns 
 */
 export async function getContractTemplate(id){
	return request({
		url: '/yifu-archives/method/fddcontracttemplate/' + id,
		method: 'get',
	});
}


/**
 * 删除电子合同模板
 * @param {*} id 合同模板id 
 * @returns 
 */
 export async function delContractTemplate(id){
	return request({
		url: '/yifu-archives/method/fddcontracttemplate/' +id,
		method: 'delete',
	});
}




/**
 * 获取预览模板url
 * @param {id:str} params 
 * @returns 
 */
export async function getCompanyTemplatePreviewUrl(params) {
	return request({
		url: '/yifu-archives/method/fddcontracttemplate/getCompanyTemplatePreviewUrl',
		method: 'get',
		params,
	});
}



/**
 * 获取模板维护url
 * @param {id:str} params 
 * @returns 
 */
 export async function getTemplateMainUrl(params) {
	return request({
		url: '/yifu-archives/method/fddcontracttemplate/getTemplateMainUrl',
		method: 'get',
		params,
	});
}




/**
 * 获取电子合同列表
 * @param {*} params
 * @returns
 */
export async function getEleContractList(params) {
	return request({
		url: '/yifu-archives/method/fddcontractattachinfo/page',
		method: 'get',
		params,
	});
}


/**
 * 
 * 发送合同[电子合同定稿任务]
 * @param {str} id 
 * 
 */
export async function  sendEleContract(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/send?id='+id,
		method:'post',
	})
}


/**
 * 
 * 发送签署[引用模板创建签署任务]
 * @param {str} id 
 * 
 */
 export async function  sendSign(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/createTaskByDraftId?id='+id,
		method:'post',
	})
}


/**
 * 
 * 盖章
 * @param {str} id 
 * 
 */
 export async function  getSeal(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/getSignUrl?id='+id,
		method:'post',
	})
}


/**
 * 
 * 作废重签
 * @param {str} id 
 * 
 */
 export async function  resign(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/invalidAndsend?id='+id,
		method:'post',
	})
}


/**
 * 
 * 签署文件预览
 * @param {str} id 
 * 
 */
 export async function  signPreview(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/getSignPreviewUrl?id='+id,
		method:'post',
	})
}


/**
 * 
 * 签署文件下载
 * @param {str} id 
 * 
 */
 export async function  signDownload(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/getBySignFileId?id='+id,
		method:'post',
	})
}


/**
 * 
 *签署文件转移为合同附件
 * @param {str} id 
 * 
 */
 export async function  tansferEleContract(id){
	return request({
		url:'/yifu-archives/method/fddcontractinfo/moveFileToEmpConcat?id='+id,
		method:'post',
	})
}


/**
 * 批量导入电子合同信息
 * @param {*} data 
 */
export async function batchAddFddEmpInfo(data) {
	return request({
		url:'/yifu-archives/method/fddcontractattachinfo/batchAddFddEmpInfo',
		method:'post',
		data,
		timeout:600000,
	})

}


/**
 * 批量更新电子合同信息
 * @param {*} data 
 */
 export async function batchUpdateFddEmpInfo(data) {
	return request({
		url:'/yifu-archives/method/fddcontractattachinfo/batchUpdateFddEmpInfo',
		method:'post',
		data,
		timeout:600000,
	})

}


/**
 * 电子合同批量导入->确认导入
 * @param {*} data 
 * @returns 
 */
export async function sendTask(data){
	return request({
		url:'/yifu-archives/method/fddcontractattachinfo/sendTask',
		method:'post',
		data,
	})
}