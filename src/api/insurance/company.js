import request from '@/utils/request';

/**
 * 保险公司查询
 * @param
 * @returns
 */
export async function insuranceCompany(params) {
    return request({
        url: '/yifu-insurances/method/insuranceCompany/page',
        method: 'GET',
        params,
    });
}

/**
 * 保险公司查询(不分页)
 * @param
 * @returns
 */
export async function insuranceCompanyList(params) {
    return request({
        url: '/yifu-insurances/method/insuranceCompany/list',
        method: 'GET',
        params,
    });
}

/**
 * 保险公司新增
 * @param
 * @returns
 */
export async function saveInsuranceCompany(data) {
    return request({
        url: '/yifu-insurances/method/insuranceCompany/save',
        method: 'POST',
        data,
    });
}

/**
 * 保险公司修改
 * @param
 * @returns
 */
export async function updateInsuranceCompany(data) {
    return request({
        url: '/yifu-insurances/method/insuranceCompany/update',
        method: 'POST',
        data,
    });
}

/**
 * 险种查询
 * @param
 * @returns
 */
export async function insuranceType(params) {
    return request({
        url: '/yifu-insurances/method/insuranceType/page',
        method: 'get',
        params,
    });
}

/**
 * 险种查询，不分页
 * @param
 * @returns
 */
export async function insuranceTypeList(data) {
    return request({
        url: '/yifu-insurances/method/insuranceType/list',
        method: 'POST',
        data,
    });
}

/**
 * 险种新增
 * @param
 * @returns
 */
export async function addInsuranceType(data) {
    return request({
        url: '/yifu-insurances/method/insuranceType/save',
        method: 'POST',
        data,
    });
}

/**
 * 险种编辑
 * @param
 * @returns
 */
export async function editInsuranceType(data) {
    return request({
        url: '/yifu-insurances/method/insuranceType/update',
        method: 'POST',
        data,
    });
}

/**
 * 险种详情
 * @param
 * @returns
 */
export async function insuranceTypeDetail(id) {
    return request({
        url: `/yifu-insurances/method/insuranceType/${id}`,
        method: 'GET',
    });
}

/**
 * 新增购买标准
 * @param
 * @returns
 */
export async function saveInsuranceTypeStandard(data) {
    return request({
        url: '/yifu-insurances/method/insuranceTypeStandard/save',
        method: 'POST',
        data,
    });
}

/**
 * 删除购买标准
 * @param
 * @returns
 */
export async function delInsuranceTypeStandard(id) {
    return request({
        url: `/yifu-insurances/method/insuranceTypeStandard/${id}`,
        method: 'DELETE',
    });
}

/**
 * 购买标准列表
 * @param {id} 保险id
 * @returns
 */
export async function insuranceTypeStandardList(id) {
    return request({
        url: `/yifu-insurances/method/insuranceTypeStandard/list`,
        method: 'GET',
        params: { id },
    });
}

/**
 * 新增费率
 * @param
 * @returns
 */
export async function saveInsuranceTypeRate(data) {
    return request({
        url: '/yifu-insurances/method/insuranceTypeRate/save',
        method: 'POST',
        data,
    });
}

/**
 * 删除购买标准
 * @param
 * @returns
 */
export async function delInsuranceTypeRate(id) {
    return request({
        url: `/yifu-insurances/method/insuranceTypeRate/${id}`,
        method: 'DELETE',
    });
}

/**
 * 根据险种查询保单明细
 * @param
 * @returns
 */
export async function selectInDetail(params) {
    return request({
        url: `/yifu-insurances/method/insuranceDetail/selectByTypeId`,
        method: 'GET',
        params,
    });
}

/**
 * 根据保险公司查询保单明细
 * @param
 * @returns
 */
export async function selectComDetail(params) {
    return request({
        url: `/yifu-insurances/method/insuranceDetail/selectByCompanyName`,
        method: 'GET',
        params,
    });
}
