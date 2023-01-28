export default {
	/**
	 * 项目档案批量更新、导入错误反馈表
	 */
	SUBJECT_BATCH_COMMON_ERROR_HEADER: [
		{header:'行号',key:'line',width:15},
		{header:'是否异常',key:'isError',width:15},
		{header:'反馈描述',key:'error',width:30},
	],

	/**
	 * 项目档案批量删除错误反馈
	 */
	SUBJECT_BATCH_DEL_ERROR_HEADER: [
		{header:'员工姓名',key:'empName',width:15},
		{header:'身份证号',key:'empIdCard',width:20},
		{header:'项目编码',key:'deptNo',width:20},
		{header:'是否允许删除',key:'result',width:15},
		{header:'反馈描述',key:'error',width:30},
	],

	/**
	 * 项目档案批量减项错误反馈
	 */
	SUBJECT_BATCH_REDUCE_ERROR_HEADER: [
		{header:'行号',key:'line',width:15},
		{header:'是否异常',key:'isError',width:15},
		{header:'员工姓名',key:'empName',width:15},
		{header:'身份证号',key:'empIdCard',width:20},
		{header:'项目编码',key:'deptNo',width:20},
		{header:'减项原因',key:'leaveReason',width:20},
		{header:'减项备注',key:'leaveRemark',width:20},
		{header:'反馈描述',key:'error',width:30},
	],

	/**
	 * 项目档案导出头
	 */
	SUBJECT_EXPORT_HEADER: [
		{ title: '员工主码', dataIndex: 'empCode', width: 100 },
		{ title: '档案员工类型', dataIndex: 'proEmpNatrue', width: 100 },
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '身份证开始日期', dataIndex: 'validityStart', width: 100 },
		{ title: '身份证截止日期', dataIndex: 'validityEnd', width: 100 },
		{ title: '婚姻状况', dataIndex: 'empMarriStatus', width: 100 },
		{ title: '民族', dataIndex: 'empNational', width: 100 },
		{ title: '政治面貌', dataIndex: 'politicalStatus', width: 100 },
		{ title: '手机号码', dataIndex: 'empPhone', width: 100 },
		{ title: '邮箱', dataIndex: 'empEmail', width: 100 },
		{ title: '户籍所在省', dataIndex: 'idProvince', width: 100 },
		{ title: '户籍所在市', dataIndex: 'idCity', width: 100 },
		{ title: '户籍所在县', dataIndex: 'idTown', width: 100 },
		{ title: '户口性质', dataIndex: 'empRegisType', width: 100 },
		{ title: '档案所在省', dataIndex: 'fileProvince', width: 100 },
		{ title: '档案所在市', dataIndex: 'fileCity', width: 100 },
		{ title: '档案所在县', dataIndex: 'fileTown', width: 100 },
		{ title: '是否大专及以上', dataIndex: 'isCollege', width: 100 },
		{ title: '最高学历', dataIndex: 'hignEducation', width: 100 },
		{ title: '学校', dataIndex: 'school', width: 100 },
		{ title: '专业', dataIndex: 'major', width: 100 },
		{ title: '入学时间', dataIndex: 'admissionDate', width: 100 },
		{ title: '毕业时间', dataIndex: 'gradutionDate', width: 100 },
		{ title: '档案备注', dataIndex: 'remark', width: 100 },
		{ title: '人员档案来源', dataIndex: 'fileSource', width: 100 },
		{ title: '人员档案状态', dataIndex: 'proStatus', width: 100 },
		{ title: '人员档案创建人', dataIndex: 'proCreateName', width: 100 },
		{ title: '人员档案创建时间', dataIndex: 'proCreateTime', width: 100 },
		{ title: '员工编码', dataIndex: 'empNo', width: 100 },
		{ title: '项目员工类型', dataIndex: 'empNatrue', width: 100 },
		{ title: '客户名称', dataIndex: 'unitName', width: 100 },
		{ title: '客户编码', dataIndex: 'unitNo', width: 100 },
		{ title: '项目名称', dataIndex: 'deptName', width: 100 },
		{ title: '项目编码', dataIndex: 'deptNo', width: 100 },
		{ title: '业务类型', dataIndex: 'businessType', width: 100 },
		{ title: '合同类型', dataIndex: 'contractType', width: 100 },
		{ title: '工时制', dataIndex: 'workingHours', width: 100 },
		{ title: '入职日期', dataIndex: 'enjoinDate', width: 100 },
		{ title: '试用期', dataIndex: 'tryPeriod', width: 100 },
		{ title: '合同状态', dataIndex: 'contractStatus', width: 100 },
		{ title: '商险状态', dataIndex: 'insuranceStatus', width: 100 },
		{ title: '社保状态', dataIndex: 'socialStatus', width: 100 },
		{ title: '公积金状态', dataIndex: 'fundStatus', width: 100 },
		{ title: '近3个月发薪', dataIndex: 'salaryStatus', width: 100 },
		{ title: '就职岗位', dataIndex: 'post', width: 100 },
		// { title: '开户行', dataIndex: 'bankName', width: 100 },
		// { title: '支行', dataIndex: 'bankSubName', width: 100 },
		// { title: '银行卡号', dataIndex: 'bankNo', width: 100 },
		{ title: '项目档案来源', dataIndex: 'projectSource', width: 100 },
		{ title: '项目档案状态', dataIndex: 'projectStatus', width: 100 },
		{ title: '项目档案创建人', dataIndex: 'createName', width: 100 },
		{ title: '项目档案创建时间', dataIndex: 'createTime', width: 100 },
	],

	/**
	 * 批量导入项目档案
	 */
	SUBJECT_IMPORT_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		deptNo: '项目编码',
		proEmpNatrue: '员工类型',
		contractType: '合同类型',
		workingHours: '工时制',
		post: '就职岗位',
		enjoinDate: '入职日期',
		tryPeriod: '试用期',
		// bankName: '开户行',
		// bankSubName: '支行',
		// bankNo: '银行卡号',
	},

	/**
	 * 批量更新项目档案必填表头
	 */
	SUBJECT_UPDATE_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		deptNo: '项目编码',
	},

	/**
	 * 批量减项项目档案
	 */
	SUBJECT_REDUCE_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		deptNo: '项目编码',
		leaveReason: '减项原因',
		leaveRemark: '减项备注',
		// isLeaveEmployee: '是否同步减档',
	},

	/**
	 * 批量划转项目档案
	 */
	SUBJECT_CHANGE_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		deptNo: '原项目编码',
		leaveReason: '新项目编码',
		// changeStartMonth: '划转起始月',
		// unsettleDeal: '已产生未结算费用',
	},
};
