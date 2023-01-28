/*导入申请数据太多,为了后期方便单独放在js中*/

import { getProjectName } from '/@/api/socialfund/presendorder';
import { getConfigList, payImport, annualBonusImport } from '/@/api/payservice/payimport';
import { LABOR_APPLY_HEADER, BOOK_APPLY_HEADER, IDCARD_HEADER, DEFAULT_CARD_HEADER } from '/@/utils/header';
import { checkIdCard } from '/@/api/check.js';
import { readExcel, exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import moment from 'moment';
import { ElMessage } from 'element-plus';

export const payParams = reactive([
	{
		dataIndex: 'salaryType',
		title: '表单类型',
		defalutValue: '0',
		position: 'header',
		type: 'radio',
		radioData: {
			0: '薪资',
			3: '劳务费',
			4: '稿酬',
		},
		config: {
			onChange: (val) => {
				payParams[0].value = val;
				payParams[1].value = '';
				changePayParams(val);
			},
		},
	},
	{
		dataIndex: 'settleDepart',
		title: '项目名称',
		position: 'header',
		type: 'page-select',
		span: 12,
		config: {
			request: (params) => requestList(Object.assign({},params,{flag:'1'})   , 'getProjectName'),
			valueKey: 'id',
			title: 'departName',
			search: 'departName',
			placeholder: '请选择项目名称',
			onChange: async (val) => {
				if (val) {
					payParams[1].value = val.id;
					payParams[2].disabled = false;
					payParams[2].value = '';
					const res = await getConfigList(val.id);
					if (res.code == 200) {
						payParams[2].selectData = res.data;
					} else {
						ElMessage.error(res.msg);
					}
				} else {
					payParams[2].disabled = true;
					payParams[2].value = '';
					// changePayParams(0)
				}
			},
		},
	},
	{
		dataIndex: 'configId',
		title: '方案名称',
		position: 'header',
		type: 'select',
		span: 12,
		selectData: [],
		disabled: true,
		config: {
			value: 'id',
			label: 'name',
			onChange: (val) => {
				if (!val) {
					changePayParams(0);
				} else {
					payParams[2].value = val;
					const data = payParams[2].selectData.find((item) => item.id == val);
					payParams.map((item) => {
						if (item.dataIndex == 'salaryMonth') {
							item.value = data.salaryMonth.toString();
						} else if (item.dataIndex == 'socialMonth') {
							item.value = data.socialMonth.toString();
						} else if (item.dataIndex == 'fundMonth') {
							item.value = data.fundMonth.toString();
						} else if (item.dataIndex == 'socialPriority') {
							item.value = data.socialPriority.toString();
						} else if (item.dataIndex == 'fundPriority') {
							item.value = data.fundPriority.toString();
						} else if (item.dataIndex == 'grantType') {
							item.value = data.grantType.toString();
						}
					});
				}
			},
		},
	},
	{
		dataIndex: 'salaryMonth',
		title: '工资月份',
		position: 'header',
		type: 'select',
		disabled: true,
		selectData: {
			'-6': moment().subtract(6, 'month').format('YYYYMM'),
			'-5': moment().subtract(5, 'month').format('YYYYMM'),
			'-4': moment().subtract(4, 'month').format('YYYYMM'),
			'-3': moment().subtract(3, 'month').format('YYYYMM'),
			'-2': moment().subtract(2, 'month').format('YYYYMM'),
			'-1': moment().subtract(1, 'month').format('YYYYMM'),
			0: moment().format('YYYYMM'),
			1: moment().add(1, 'month').format('YYYYMM'),
		},
		span: 12,
		config: {
			onChange: (val) => {
				
			},
		},
	},
	{
		dataIndex: 'socialMonth',
		title: '社保月份',
		position: 'header',
		type: 'select',
		selectData: {
			'-6': moment().subtract(6, 'month').format('YYYYMM'),
			'-5': moment().subtract(5, 'month').format('YYYYMM'),
			'-4': moment().subtract(4, 'month').format('YYYYMM'),
			'-3': moment().subtract(3, 'month').format('YYYYMM'),
			'-2': moment().subtract(2, 'month').format('YYYYMM'),
			'-1': moment().subtract(1, 'month').format('YYYYMM'),
			0: moment().format('YYYYMM'),
			1: moment().add(1, 'month').format('YYYYMM'),
		},
		span: 12,
		disabled: true,
		config: {
			onChange: (val) => {
				
			},
		},
	},
	{
		dataIndex: 'fundMonth',
		title: '公积金月份',
		position: 'header',
		type: 'select',
		disabled: true,
		selectData: {
			'-6': moment().subtract(6, 'month').format('YYYYMM'),
			'-5': moment().subtract(5, 'month').format('YYYYMM'),
			'-4': moment().subtract(4, 'month').format('YYYYMM'),
			'-3': moment().subtract(3, 'month').format('YYYYMM'),
			'-2': moment().subtract(2, 'month').format('YYYYMM'),
			'-1': moment().subtract(1, 'month').format('YYYYMM'),
			0: moment().format('YYYYMM'),
			1: moment().add(1, 'month').format('YYYYMM'),
		},
		span: 12,
		config: {
			onChange: (val) => {
				
			},
		},
	},
	{
		dataIndex: 'socialPriority',
		title: '社保优先级',
		position: 'header',
		type: 'select',
		disabled: true,
		selectData: {
			0: '生成',
			1: '缴纳',
		},
		span: 12,
		config: {
			onChange: (val) => {
				
			},
		},
	},
	{
		dataIndex: 'fundPriority',
		title: '公积金优先级',
		position: 'header',
		type: 'select',
		disabled: true,
		selectData: {
			0: '生成',
			1: '缴纳',
		},
		span: 12,
		config: {
			onChange: (val) => {
				
			},
		},
	},
	{
		dataIndex: 'grantType',
		title: '发放方式',
		position: 'header',
		type: 'select',
		disabled: true,
		selectData: {
			0: '现金',
			1: '转账',
		},
		span: 12,
		config: {
			onChange: (val) => {
				
			},
		},
	},
]);

export const changePayParams = (val) => {
	const arr = ['', '', 'configId', 'salaryMonth', 'socialMonth', 'fundMonth', 'socialPriority', 'fundPriority', 'grantType'];
	payParams[2].value = '';
	if (val != 0) {
		arr.forEach((item, index) => {
			if (index > 1) {
				payParams[index].dataIndex = '';
			}
		});
	} else {
		arr.forEach((item, index) => {
			if (index > 1) {
				payParams[index].dataIndex = item;
				payParams[index].value = '';
			}
		});
	}
};

// 身份校验之前不允许上传新的表单

export const beforeFlag = ref(false);

export const cardCheck = ref(false);
// 导入表格身份证校验
export const changeFile = async (file) => {
	try {
		cardCheck.value = true;
		beforeFlag.value = true;
		const excelData = await readExcel(file.raw);
		const headers = excelData[0].headers;
		// console.log(headers);
		// console.log(DEFAULT_CARD_HEADER);
		let flag = false;
		DEFAULT_CARD_HEADER.map((item) => {
			if (!headers.includes(item)) {
				flag = true;
			}
		});
		// console.log(flag);
		if (flag) {
			ElMessage.error('请检查表头,身份证校验必须包括[员工姓名,身份证号]');
			beforeFlag.value = false;
		} else {
			importIdCard(excelData);
		}
	} catch (error) {
		beforeFlag.value = false;
		ElMessage.error(error.msg || '身份证号校验失败');
	}
};

// 导入身份证
const importIdCard = async (excelData) => {
	const exceldata = excelData[0].data;
	const idArr = [];
	exceldata.map((item) => {
		idArr.push({ name: item['员工姓名'], idCard: item['身份证号'] });
	});

	const result = await checkIdCard(idArr);
	if (result.code == 200) {
		ElMessage.success('身份证校验通过');
		cardCheck.value = false;
		beforeFlag.value = false;
	} else if (result.code == 1) {
		beforeFlag.value = false;
		ElMessage.error(result.msg || '身份证校验失败');
		let header = IDCARD_HEADER;
		let data = null;
		data = result.data.map((item) => {
			return {
				name: item.name,
				idCard: item.idCard,
				reason: item.isTrue ? '' : item.reason || '',
				isTrue: item.isTrue ? '是' : '否',
			};
		});
		exportExcelSheet(header, data, '身份证校验结果');
	}
};

//导入表头的检验
export const pay_header = computed(() => {
	const data = payParams.find((item) => item.dataIndex == 'salaryType');
	const val = data.value || data.defalutValue;
	switch (val) {
		case '3':
			return LABOR_APPLY_HEADER;
		case '4':
			return BOOK_APPLY_HEADER;
	}
});
// 表头检验type
export const importType = computed(() => {
	const data = payParams.find((item) => item.dataIndex == 'salaryType');
	const val = data.value || data.defalutValue;
	if (val == '0') {
		return 2;
	} else {
		return 0;
	}
});

// 规则校验
export const batchRules = {
	salaryType: [{ required: true, message: '请选择表单类型', trigger: 'change' }],
	settleDepart: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
	configId: [{ required: true, message: '请选择方案名称', trigger: 'change' }],
};

// 上传校验身份证号码是否正确
export const batchUploadFile = async (params) => {
	return await batchUploadFileExt(params);
};

// 处理带自定义参数的上传
export const batchUploadFileExt = async (params, ext) => {
	const { file } = params;
	const par = {
		settleDepart: params.settleDepart,
		configId: params.configId,
		salaryType: params.salaryType,
		repeatFlag: 1,
		...ext,
	};
	return await getExcelData(file, par);
};

// 去除值的空格
export const trimObj = (obj) => {
	for (const key in obj) {
		if (obj[key] && typeof obj[key] == 'string') {
			obj[key] = obj[key].trim();
		}
	}
	return obj;
};


// url 上传地址
const getExcelData = async (file, par) => {
	try {
		const excelData = await readExcel(file.raw);
		//遍历所有的sheet表
		let list = [...excelData[0].data];
		const content = list.map((item) => {
			const keys = Object.keys(item);
			const target = {};
			keys.forEach((key) => {
				if (!key.startsWith('__EMPTY')) {
					target[key] = item[key];
				}
			});
			
			return trimObj(target);
		});
		// console.log(content);
	
		return new Promise(async (resolve, reject) => {
			try {
				const res = await payImport(par, JSON.stringify(content));
				const msg = res.message || res.msg || '导入失败';
				if (res && res.data && res.data.length) {
					// 存在错误信息
					resolve({
						code: 1,
						msg,
						data: res.data,
					});
				} else if (res && res.code === 200) {
					resolve({
						code: 200,
						msg: '导入成功',
						data: null,
					});
				} else {
					resolve({
						code: 1,
						msg,
						data: null,
					});
				}
			} catch (exception) {
				console.log('get exception:', exception);
				reject({
					code: 1,
					msg: '导入失败',
				});
			}
		});
	} catch (exception) {
		return {
			code: 1,
			msg: '导入失败',
		};
	}
};

export const batchErrorData = (prop, errorData) => {
	return errorData.map((item) => {
		const errors = item.message;
		return {
			line: item.lineNum,
			isError: errors ? '是' : '否',
			error: errors,
		};
	});
};

// 年终奖测算
export const moneyParams = [
	{
		dataIndex: 'deptId',
		title: '项目名称',
		position: 'header',
		type: 'page-select',
		config: {
			request: (params) => requestList(Object.assign({},params,{flag:'1'}) , 'getProjectName'),
			valueKey: 'id',
			title: 'departName',
			search: 'departName',
			placeholder: '请选择项目名称',
			onChange: (val) => {
				
			},
		},
	},
];

// 年终奖导入
export const batchUploadyYearMoney = (params, data) => {
	const par = {
		deptId: params.deptId,
	};
	return annualBonusImport(par, data);
};

export const momeyRules = {
	deptId: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
};
// 请求项目名称
const requestList = async (params, method) => {
	try {
		const type = method;
		switch (type) {
			case 'getProjectName':
				const res = await getProjectName(params);
				if (res.code == 200) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records,
					};
				} else {
					ElMessage.error(res.msg);
				}
				break;
		}
	} catch (error) {
		console.log('数据请求', error);
	}

	return {
		current: 1,
		total: 0,
		data: [],
	};
};
