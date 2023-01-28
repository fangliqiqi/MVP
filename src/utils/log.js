import { areaJson } from '/@/utils/city';
import { STAFF_INFO_DIC } from '/@/utils/header';
import { getDictValue as getValue } from '/@/utils/utils';

const EMPTY_PLACEHOLDER = '[空值]';

/**
 * 仅仅使用于日志部分
 * @param {*} type
 * @param {*} dict
 * @returns
 */
function getDictValue(type, value, dict) {
	return getValue(type, value, dict, EMPTY_PLACEHOLDER);
}

/**
 * 获取操作日志的字典值
 * @param {*} item
 * @param {*} record
 * @param {*} dicts
 */
export function getLogDictValue(item, record, dicts) {
	let val = record[item];
	// 如果带00:00:00，去掉
	if (val && val.length > 10 && val.indexOf('00:00:00') > -1) {
		val = val.substring(0, 10);
	}

	switch (item) {
		case 'empNatrue':
			// 员工类型
			val = getDictValue('emp_natrue', val, dicts);
			break;

		case 'empSex':
			// 性别
			val = getDictValue('sexOption', val, dicts);
			break;

		case 'empMarriStatus':
			// 婚姻状况
			val = getDictValue('emp_married', val, dicts);
			break;

		case 'empNational':
			// 民族
			val = getDictValue('emp_national', val, dicts);
			break;

		case 'politicalStatus':
			//  政治面貌
			val = getDictValue('emp_political', val, dicts);
			break;
		case 'empRegisType':
			val = getDictValue('emp_registype', val, dicts);
			break;

		case 'hignEducation':
			// 最高学历
			val = getDictValue('education', val, dicts);
			break;

		case 'isCollege':
			val = getDictValue('collegeDict', val, dicts);
			break;

		case 'contractStatus':
			val = getDictValue('personnel_state', val, dicts);
			break;
		case 'socialStatus':
			val = getDictValue('social_ecurity_state', val, dicts);
			break;
		case 'fundStatus':
			val = getDictValue('fund_status', val, dicts);
			break;
		case 'insuranceStatus':
			val = getDictValue('commercial_satte', val, dicts);
			break;
		case 'salaryStatus':
			val = getDictValue('salaryStatusOption', val, dicts);
			break;

		case 'fileSource':
			val = getDictValue('EMP_SOURCE', val, dicts);
			break;

		case 'contractType':
			val = getDictValue('personnel_type', val, dicts);
			break;

		case 'status':
		case 'fileStatus':
			if (record.fileStatus == 1) {
				val = '已减档';
			} else {
				val = getDictValue('fileStatusEnmu', val, dicts);
			}
			break;

		case 'workingHours':
			val = getDictValue('work_type', val, dicts);
			break;

		case 'leaveReason':
			val = getDictValue('social_reduce_reason', val, dicts);
			break;
		case 'projectSource':
			val = getDictValue('project_emp_source', val, dicts);
			break;
		case 'projectStatus':
			val =
				record.projectStatus == 1
					? '已减项'
					: record.projectStatus == 0 && record.status == 0
					? '草稿'
					: record.projectStatus == 0 && record.status == 1
					? '已审核'
					: EMPTY_PLACEHOLDER;
			break;

		case 'idProvince':
		case 'idCity':
		case 'idTown':
		case 'fileProvince':
		case 'fileCity':
		case 'fileTown':
			// 省市区信息
			if (!val) {
				val = EMPTY_PLACEHOLDER;
			} else {
				const target = areaJson[val];
				if (target) {
					val = target.areaName;
				} else {
					val = EMPTY_PLACEHOLDER;
				}
			}
			break;

		case 'isLeaveEmployee':
			if (val == 0) {
				val = '否';
			} else if (val == 1) {
				val = '是';
			} else {
				val = EMPTY_PLACEHOLDER;
			}

			break;
		case 'businessPrimaryType':
			val = getDictValue('customer_business_parent', val, dicts);
			break;
		case 'businessSecondType':
			val = getDictValue('customer_business_type', val, dicts);
			break;
		case 'businessThirdType':
			val = getDictValue('customer_business_sub_type', val, dicts);
			break;
		case 'validityEnd':
			val = val=='2999-12-31'?'长期':val;
			break;
		default:
			if (val === null || val === undefined) {
				// 默认为空 '--'
				return '[空值]';
			}
			break;
	}
	return val;
}

/**
 * 按类型，存在不同类型日志有重复字段但意义不同的
 * @param {*} item
 * @param {*} type staff:人员 subject:项目
 */
export function getLogDictLabel(item, type) {
	let val = null;

	switch (item) {
		case 'leaveTime':
			if (type === 'staff') {
				val = '减档时间';
			} else {
				val = ' 减项时间';
			}
			break;
		case 'leaveReason':
			if (type === 'staff') {
				val = '减档原因';
			} else {
				val = ' 减项原因';
			}
			break;
		case 'leaveRemark':
			if (type === 'staff') {
				val = '减档备注';
			} else {
				val = ' 减项备注';
			}
			break;
		case 'businessPrimaryType':
			val = '业务类型一级分类';
			break;
		default:
			val = STAFF_INFO_DIC[item] || item || '--';
			break;
	}

	return val.replace(/&emsp;/g, '');
}


/**
 *社保公积金查询-详情-调基记录翻译 字段显示
 *
 * @export
 * @param {*} item 字段值
 * @param {*} data	翻译数据（目前是写实的）
 * @return {*} 
 */
export function getRecordLabel(item, data) {
	if(!item) return '少字段值';
	if(!data) return '少翻译数据';
	let val = null;
	data.map(d=>{
		if(d.dataIndex==item){
			val = d.title;
		}
	})
	return val;
}

/**
 *社保公积金查询-详情-调基记录翻译 新值旧值的显示
 *
 * @export
 * @param {*} item 字段值
 * @param {*} info 改变值的数据
 * @param {*} data 翻译的数据
 * @return {*} 
 */
export function getRecordValue(item,info,data) {
	if(!item) return '少字段值';
	if(!info) return '少新旧值的数据';
	if(!data) return '少翻译数据';
	const val = info[item];
	let value = '';
	data.map(d=>{
		if(d.dataIndex==item&&d.dictValue){
			value = d.dictValue[val];
		}
	})
	return value||val;
}