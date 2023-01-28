import request from '@/utils/request';

/**
 * 获取定时任务列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getTimerTaskList(params) {
	return request({
		url: '/yifu-job/method/sysschedulejob/page',
		method: 'GET',
		params,
	});
}


/**
 * 获取定时任务详情
 * @param {*} id  timertask id
 * @returns 
 */
export async function getTimerTask(id) {
	return request({
		url: '/yifu-job/method/sysschedulejob/'+id,
		method: 'GET',
	});
}


/**
 * 新增定时任务
 * @param {*} id  timertask id
 * @returns 
 */
 export async function addTimerTask(data) {
	return request({
		url: '/yifu-job/method/sysschedulejob/add',
		method: 'post',
        data,
	});
}


/**
 * 更新定时任务
 * @param {*} id  timertask id
 * @returns 
 */
 export async function updateTimerTask(data) {
	return request({
		url: '/yifu-job/method/sysschedulejob',
		method: 'put',
        data,
	});
}


/**
 * 唤醒定时任务
 * @param {jobIds:string} data 
 * @returns 
 */
export async function resumeTimerTask(params) {
	return request({
		url: '/yifu-job/method/sysschedulejob/resume',
		method: 'get',
        params,
	});
}


/**
 * 暂停定时任务
 * @param {jobIds:string} data 
 * @returns 
 */
export async function pauseTimerTask(params) {
	return request({
		url: '/yifu-job/method/sysschedulejob/pause',
		method: 'get',
        params,
	});
}




/**
 * 运行定时任务
 * @param {jobIds:string} data 
 * @returns 
 */
 export async function runTimerTask(params) {
	return request({
		url: '/yifu-job/method/sysschedulejob/run',
		method: 'get',
        params,
	});
}


