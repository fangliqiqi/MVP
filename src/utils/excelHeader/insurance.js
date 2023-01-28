export default {
	// 导入操作格式化日期标志
	DATE_FORMAT_KEY: {
		policyStart: 'YYYY-MM-DD',
		policyEnd: 'YYYY-MM-DD',
		policyStartNew: 'YYYY-MM-DD',
		policyEndNew: 'YYYY-MM-DD',
		settleMonth: 'YYYY-MM',
	},

	/**
	 * 新增投保导入头
	 */
	INSURE_ADD_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		deptNo: '项目编码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准（元）',
		insuranceProvinceName: '商险购买地省',
		insuranceCityName: '商险购买地市',
		settleMonth: '结算月份',
		post: '岗位',
		remark: '备注',
	},
	// 批增头
	INSURE_BATCH_HEADER: {
		deptNo: '项目编码',
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		post: '岗位',
		policyNo: '保单号',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		buyStandard: '购买标准（元）',
		insuranceProvinceName: '购买地省份',
		insuranceCityName: '购买地城市',
		settleMonth: '结算月份',
		remark: '备注',
	},

	// 替换
	INSURE_CHANGE_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		deptNo: '项目编码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准（元）',
		replaceEmpName: '替换员工姓名',
		replaceEmpIdcardNo: '替换员工身份证号',
		replaceDeptNo: '替换员工项目编码',
		post: '岗位',
	},

	// 减员
	INSURE_REDUCE_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		buyStandard: '购买标准（元）',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		remark: '备注',
	},

	//更新减员退费
	INSURE_REFUND_BACK_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		policyNo: '保单号',
		refundMoney: '退费金额（元）',
	},

	// 变更项目
	DEPT_CHANGE_HEADER: {
		empName: '员工姓名',
		empIdCardNo: '员工身份证号码',
		oldDeptNo: '原项目编码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准',
		newDeptNo: '替换项目编码',
	},

	// 变更结算月
	SETTLE_MONTH_CHANGE_HEADER: {
		empName: '员工姓名',
		empIdCardNo: '员工身份证号码',
		deptNo: '项目编码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准',
		settleMonth: '结算月份',
	},

	// 投保导出
	INSURE_HEADER_EXPORT: [
		{ header: 'id', key: 'id', width: 15 },
		{ header: '投保状态', key: 'buyHandleStatus', width: 15 },
		{ header: '投保类型', key: 'buyType', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证', key: 'empIdcardNo', width: 20 },
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '保单开始日期', key: 'policyStart', width: 15 },
		{ header: '保单结束日期', key: 'policyEnd', width: 15 },
		{ header: '购买月数', key: 'buyMonth', width: 15 },
		{ header: '保险公司名称', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '结算类型', key: 'settleType', width: 15 },
		{ header: '退回原因', key: 'remark', width: 20 },
	],

	// 已投保导出头
	INSURED_HEADER_EXPORT: [
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '投保类型', key: 'buyType', width: 15 },
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '保单开始日期', key: 'policyStart', width: 15 },
		{ header: '保单结束日期', key: 'policyEnd', width: 15 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 15 },
		{ header: '医保（万元）', key: 'medicalQuota', width: 15 },
		{ header: '身故或残疾（万元）', key: 'dieDisableQuota', width: 15 },
		{ header: '预估保费（元）', key: 'estimatePremium', width: 15 },
		{ header: '实际保费（元）', key: 'actualPremium', width: 15 },
		{ header: '保单号', key: 'policyNo', width: 20 },
		{ header: '发票号', key: 'invoiceNo', width: 20 },
		{ header: '保单生效日期', key: 'policyEffect', width: 15 },
		{ header: '商险购买地', key: 'insuranceAddress', width: 15 },
		{ header: '商险办理地', key: 'insuranceHandleAddress', width: 20 },
		{ header: '是否出险', key: 'isUse', width: 15 },
		{ header: '是否过期', key: 'isOverdue', width: 15 },
		{ header: '是否有效', key: 'isEffect', width: 15 },
		{ header: '派单日期', key: 'createTime', width: 15 },
		{ header: '派单人', key: 'createName', width: 15 },
		{ header: '封面抬头', key: 'invoiceTitle', width: 20 },
	],

	// 减员导出头
	INSURE_REDUCE_HEADER_EXPORT: [
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '项目编码', key: 'deptNo', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '投保类型', key: 'buyType', width: 15 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '商险购买地', key: 'insuranceAddress', width: 20 },
		{ header: '商险办理地', key: 'insuranceHandleAddress', width: 20 },
		{ header: '保单开始日期', key: 'policyStart', width: 15 },
		{ header: '保单结束日期', key: 'policyEnd', width: 15 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 15 },
		{ header: '医保（万元）', key: 'medicalQuota', width: 15 },
		{ header: '身故或残疾（万元）', key: 'dieDisableQuota', width: 20 },
		{ header: '减员派单日期', key: 'refundCreateTime', width: 15 },
		{ header: '保单号', key: 'policyNo', width: 15 },
		{ header: '实际保费', key: 'actualPremium', width: 15 },
	],

	//导出办理导出表头(新增批增)
	HANDLE_INSURE_HEADER: [
		{ header: '派单类型', key: 'buyType', width: 15 },
		{ header: '项目名称', key: 'projectName', width: 20 },
		{ header: '项目编码', key: 'deptNo', width: 15 },
		{ header: '结算类型', key: 'settleType', width: 15 },
		{ header: '商险购买地', key: 'insuranceAddress', width: 20 },
		{ header: '商险办理地', key: 'insuranceHandleAddress', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '保单开始日期', key: 'policyStart', width: 20 },
		{ header: '保单结束日期', key: 'policyEnd', width: 20 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 20 },
		{ header: '保单号', key: 'policyNo', width: 20 },
		{ header: '保费', key: 'actualPremium', width: 15 },
		{ header: '购买月数', key: 'buyMonth', width: 15 },
		{ header: '购买天数', key: 'buyDay', width: 15 },
		{ header: '医保（万元）', key: 'medicalQuota', width: 15 },
		{ header: '身故或残疾额度（万元）', key: 'dieDisableQuota', width: 25 },
		{ header: '派单人', key: 'createName', width: 15 },
		{ header: '结算月份', key: 'settleMonth', width: 15 },
		{ header: '封面抬头', key: 'invoiceTitle', width: 25 },
		{ header: '备注', key: 'remark', width: 30 },
	],

	//导出办理导出表头替换
	HANDLE_REPLACE_INSURE_HEADER: [
		{ header: '派单类型', key: 'buyType', width: 15 },
		{ header: '项目名称', key: 'projectName', width: 20 },
		{ header: '项目编码', key: 'deptNo', width: 15 },
		{ header: '结算类型', key: 'settleType', width: 15 },
		{ header: '商险购买地', key: 'insuranceAddress', width: 20 },
		{ header: '商险办理地', key: 'insuranceHandleAddress', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '保单开始日期', key: 'policyStart', width: 20 },
		{ header: '保单结束日期', key: 'policyEnd', width: 20 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 20 },
		{ header: '保单号', key: 'policyNo', width: 20 },
		{ header: '保费', key: 'actualPremium', width: 15 },
		{ header: '购买月数', key: 'buyMonth', width: 15 },
		{ header: '购买天数', key: 'buyDay', width: 15 },
		{ header: '医保（万元）', key: 'medicalQuota', width: 15 },
		{ header: '身故或残疾额度（万元）', key: 'dieDisableQuota', width: 25 },
		{ header: '派单人', key: 'createName', width: 15 },
		{ header: '结算月份', key: 'settleMonth', width: 15 },
		{ header: '封面抬头', key: 'invoiceTitle', width: 25 },
		{ header: '备注', key: 'remark', width: 30 },
	],
	// 减员办理成功报错
	HANDLE_REFUND_INSURANCE_HEADER: [
		{ header: '减员状态', key: 'reduceHandleStatus', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '保单起止时间', key: 'policeStartEnd', width: 20 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 15 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 15 },
		{ header: '错误信息', key: 'errorMessage', width: 30 },
	],

	//办理成功和退回的导出表头
	HANDLE_BACK_INSURANCE_HEADER: [
		{ header: '办理状态', key: 'buyHandleStatus', width: 15 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '投保类型', key: 'buyType', width: 15 },
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '岗位', key: 'post', width: 15 },
		{ header: '保单起止时间', key: 'policeStartEnd', width: 15 },
		{ header: '保险公司', key: 'insuranceCompanyName', width: 20 },
		{ header: '险种', key: 'insuranceTypeName', width: 15 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 20 },
		{ header: '错误信息', key: 'errorMessage', width: 30 },
	],

	INSURE_EXPORT_REFUND_BACK_HEADER: [
		{ title: '员工姓名', dataIndex: 'empName', width: 80 },
		{ title: '员工身份证号码', dataIndex: 'empIdcardNo', width: 80 },
		{ title: '保单号', dataIndex: 'policyNo', width: 80 },
		{ title: '退费金额（元）', dataIndex: 'refundMoney', width: 120 },
	],
	//登记保单保费
	INSURE_REG_HEADER_EXPORT: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		policyNo: '保单号',
		buyStandard: '购买标准',
		actualPremium: '保费',
		invoiceNo: '发票号',
	},

	//登记退保费用
	INSURE_REFUND_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准',
		refundMoney: '退费金额（元）',
	},
	//批量办理
	INSURE_MULITY_HEADER: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准（元）',
		handType: '办理结果',
		remark: '办理意见',
	},
	// 登记发票号 -- 2022-12-8 zr
	INSURE_INVOICE_HEADER_EXPORT: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准',
		invoiceNo: '发票号',
	},
	// 参保信息变更 -- 2022-12-8 zr
	INSURE_INFORMATION_CHANGE_HEADER_EXPORT: {
		empName: '员工姓名',
		empIdcardNo: '员工身份证号码',
		insuranceCompanyName: '保险公司名称',
		insuranceTypeName: '险种名称',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyStandard: '购买标准',
		policyStartNew: '变更后保单开始日期',
		policyEndNew: '变更后保单结束日期',
		buyTypeStr: '变更后投保类型',
		reason: '变更原因',
	},
	// 保单维护导出
	INSURE_POLICE_HEADER_EXPORT: [
		{ header: '保单号', key: 'policyNo', width: 25 },
		{ header: '保单开始日期', key: 'policyStart', width: 15 },
		{ header: '保单结束日期', key: 'policyEnd', width: 15 },
		{ header: '保险公司名称', key: 'insuranceCompanyName', width: 25 },
		{ header: '险种名称', key: 'insuranceTypeName', width: 15 },
		{ header: '是否启用', key: 'enableFlag', width: 15 },
	],

	// 退保登记列表导出头
	INSURE_REFUND_HEADER_EXPORT: [
		{ header: '投保类型', key: 'buyType', width: 15 },
		{ header: '项目', key: 'projectName', width: 20 },
		{ header: '姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcardNo', width: 20 },
		{ header: '保险公司名称', key: 'insuranceCompanyName', width: 25 },
		{ header: '险种名称', key: 'insuranceTypeName', width: 20 },
		{ header: '保单开始日期', key: 'policyStart', width: 15 },
		{ header: '保单结束日期', key: 'policyEnd', width: 15 },
		{ header: '购买标准（元）', key: 'buyStandard', width: 20 },
		{ header: '退费金额（元）', key: 'refundMoney', width: 20 },
		{ header: '退至人姓名', key: 'returnEmpName', width: 15 },
		{ header: '退至人身份证号', key: 'returnEmpIdcardNo', width: 20 },
		{ header: '退至项目', key: 'returnProjectName', width: 20 },
	],
};
