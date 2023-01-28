import request from '@/utils/request';
/**
 * 工资报表-列表
 * @param {*} params 
 * @returns 
 */
export async function getSalaySettingList(params) {
  return request({
    url: '/yifu-salary/method/tsalaryconfigstandard/page',
    method: 'GET',
    params,
  });
}

/**
 * 工资报表-新增
 * @param {*} params 
 * @returns 
 */
export async function addSalaySetting(data) {
  return request({
    url: '/yifu-salary/method/tsalaryconfigstandard',
    method: 'POST',
    data,
  });
}


/**
 * 工资报表-编辑
 * @param {*} params 
 * @returns 
 */
export async function editeSalaySetting(data) {
  return request({
    url: '/yifu-salary/method/tsalaryconfigstandard',
    method: 'PUT',
    data,
  });
}
/**
 * 工资报表-删除
 * @param {*} id 
 * @returns 
 */
export async function deleteSalaySetting(id) {
  return request({
    url: '/yifu-salary/method/tsalaryconfigstandard/' + id,
    method: 'delete',
  });
}
/**
 * 工资报表-编辑查询
 * @param {*} id 
 * @returns 
 */
export async function findEditeSalaySetting(id) {
  return request({
    url: '/yifu-salary/method//tsalaryconfigstandard/' + id,
    method: 'GET',
  });
}

/**
 * 项目薪酬查询权限
 * @param {*} params
 * @returns
 */
export async function getTdeptseeList(params) {
  return request({
    url: '/yifu-salary/method/tdeptsee/page',
    method: 'GET',
    params,
  });
}

/**
 * 删除项目薪资查询权限
 * @param {*} id
 * @returns
 */
export async function delDeptSee(id) {
  return request({
    url: '/yifu-salary/method/tdeptsee/' + id,
    method: 'delete',
  });
}

/**
 * 新增项目薪资查询权限  hasPermission('salary_tdeptsee_add')
 *
 * @param {*} data
 * @returns
 */
export async function addDeptSee(data) {
  return request({
    url: '/yifu-salary/method/tdeptsee',
    method: 'post',
    data,
  });
}

/**
 * 修改项目薪资查询权限  hasPermission('salary_tdeptsee_edit')
 *
 * @param {*} data
 * @returns
 */
export async function updateDeptSee(data) {
  return request({
    url: '/yifu-salary/method/tdeptsee',
    method: 'put',
    data,
  });
}

/**
 * 获取项目薪资查询权限
 *
 * @param {*} data
 * @returns
 */
export async function getDeptSee(id) {
  return request({
    url: '/yifu-salary/method/tdeptsee/' + id,
    method: 'get',
  });
}

/**
 * 获取项目基础薪资配置列表
 *
 * @param {*} params
 * @returns
 */
export async function getConfigSalaryList(params) {
  return request({
    url: '/yifu-salary/method/tconfigsalary/page',
    method: 'get',
    params,
  });
}

/**
 * 获取项目基础薪资配置详情
 * @param {*} id
 * @returns
 */
export async function getConfigSalary(id) {
  return request({
    url: '/yifu-salary/method/tconfigsalary/' + id,
    method: 'get',
  });
}

/**
 * 删除项目基础薪资配置  删除(wxhr:tconfigsalary_del)
 * @param {*} id
 * @returns
 */
export async function delConfigSalary(id) {
  return request({
    url: '/yifu-salary/method/tconfigsalary/' + id,
    method: 'delete',
  });
}

/**
 * 新增(wxhr:tconfigsalary_add)
 * @param {*} data
 * @returns
 */
export async function addConfigSalary(data) {
  return request({
    url: '/yifu-salary/method/tconfigsalary',
    method: 'post',
    data,
  });
}

/**
 * 修改(wxhr:tconfigsalary_edit)
 * @param {*} data
 * @returns
 */
export async function updateConfigSalary(data) {
  return request({
    url: '/yifu-salary/method/tconfigsalary',
    method: 'put',
    data,
  });
}

/**
 * 工资个税-分页查询
 * @returns
 */
export async function getSalaryPage(params) {
  return request({
    url: '/yifu-salary/method/tsalarytaxconfig/salaryPage',
    method: 'get',
    params,
  });
}

/**
 *
 * @param {*} params
 * @returns
 */
export async function getSalaryYearPage(params) {
  return request({
    url: '/yifu-salary/method/tsalarytaxconfig/yearPage',
    method: 'get',
    params,
  });
}

/**
 * 最低工资配置列表
 * @param {*} params
 */
export async function getMinSalaryList(params) {
  return request({
    url: '/yifu-salary/method/tminsalary/page',
    method: 'get',
    params,
  });
}

/**
 * 删除最低工资配置  wxhr:tminsalary_del
 * @param {*} param
 */
export async function delMinSalary(id) {
  return request({
    url: '/yifu-salary/method/tminsalary/' + id,
    method: 'delete',
  });
}

/**
 * 新增最低工资配置 wxhr:tminsalary_add
 * @param {*} data
 * @returns
 */
export async function addMinSalary(data) {
  return request({
    url: '/yifu-salary/method/tminsalary',
    method: 'post',
    data,
  });
}

/**
 * 获取最低工资配置
 * @param {*} id
 * @returns
 */
export async function getMinSalary(id) {
  return request({
    url: '/yifu-salary/method/tminsalary/' + id,
    method: 'get',
  });
}

/**
 * 最低工资配置更新  修改(wxhr:tminsalary_edit)
 * @param {*} data
 * @returns
 */
export async function updateMinSalary(data) {
  return request({
    url: '/yifu-salary/method/tminsalary',
    method: 'put',
    data,
  });
}