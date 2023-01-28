export default {
	/**
	 * 批量导入错误反馈
	 */
	STAFF_IMPORT_ERROR_HEADER: [
		{ header: '行号', key: 'line', width: 15 },
		{ header: '是否异常', key: 'isError', width: 15 },
		{ header: '反馈描述', key: 'error', width: 30 },

	],

	/**
	 * 批量删除错误反馈
	 */
	STAFF_BATCH_DEL_ERROR_HEADER: [
		{ header: '员工姓名', key: 'empName', width:15 },
		{ header: '身份证号', key: 'empIdCard', width:20 },
		{ header: '是否允许删除', key: 'result', width:15 },
		{ header: '反馈描述', key: 'error', width:30 },
	],

	/**
	 * 人员档案批量导入头
	 */
	STAFF_IMPORT_HEADER: {
		empNatrue: '员工类型',
		empName: '员工姓名',
		empIdcard: '身份证号',
		deptNo: '项目编码',
		post: '就职岗位',
		validityStart: '身份证开始日期',
		validityEnd: '身份证截止日期',
		empMarriStatus: '婚姻状况',
		empNational: '民族',
		politicalStatus: '政治面貌',
		empPhone: '手机号码',
		empEmail: '邮箱',
		idProvince: '户籍所在省',
		idCity: '户籍所在市',
		idTown: '户籍所在县',
		empRegisType: '户口性质',
		fileProvince: '档案所在省',
		fileCity: '档案所在市',
		fileTown: '档案所在县',
		isCollege: '是否大专及以上',
		hignEducation: '最高学历',
		school: '学校',
		major: '专业',
		admissionDate: '入学时间',
		gradutionDate: '毕业时间',
		contactAddress: '通信地址',
		remark: '备注',
	},

	/**
	 * 员工档案导出
	 */
	STAFF_EXPORT_HEADER: [
		{ title: '员工主码', dataIndex: 'empCode', width: 100 },
		{ title: '员工类型', dataIndex: 'empNatrue', width: 100 },
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '身份证开始日期', dataIndex: 'validityStart', width: 100 },
		{ title: '身份证截止日期', dataIndex: 'validityEnd', width: 100 },
		{ title: '年龄', dataIndex: 'empAge', width: 100 },
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
		{ title: '通信地址', dataIndex: 'contactAddress', width: 100 },
		{ title: '备注', dataIndex: 'remark', width: 100 },
		{ title: '人员档案来源', dataIndex: 'fileSource', width: 100 },
		{ title: '人员档案状态', dataIndex: 'status', width: 100 },
		{ title: '是否多项目', dataIndex: 'isProjects', width: 100 },
		{ title: '现存项目数', dataIndex: 'projectNum', width: 100 },
		{ title: '项目名称', dataIndex: 'deptName', width: 100 },
		{ title: '项目编码', dataIndex: 'deptNo', width: 100 },
		{ title: '合同状态', dataIndex: 'contractStatus', width: 100 },
		{ title: '商险状态', dataIndex: 'insuranceStatus', width: 100 },
		{ title: '社保状态', dataIndex: 'socialStatus', width: 100 },
		{ title: '公积金状态', dataIndex: 'fundStatus', width: 100 },
		{ title: '近3个月发薪', dataIndex: 'salaryStatus', width: 100 },
		{ title: '创建人', dataIndex: 'createName', width: 100 },
		{ title: '创建时间', dataIndex: 'createTime', width: 100 },
	],

	/**
	 * 人员档案批量更新
	 */
	STAFF_BATCH_UPDATE_HEADER: {
		empName: '员工姓名',
		empNatrue: '员工类型',
		empIdcard: '身份证号',
		validityStart: '身份证开始日期',
		validityEnd: '身份证截止日期',
		empMarriStatus: '婚姻状况',
		empNational: '民族',
		politicalStatus: '政治面貌',
		empPhone: '手机号码',
		empEmail: '邮箱',
		idProvince: '户籍所在省',
		idCity: '户籍所在市',
		idTown: '户籍所在县',
		empRegisType: '户口性质',
		fileProvince: '档案所在省',
		fileCity: '档案所在市',
		fileTown: '档案所在县',
		isCollege: '是否大专及以上',
		hignEducation: '最高学历',
		school: '学校',
		major: '专业',
		admissionDate: '入学时间',
		gradutionDate: '毕业时间',
		contactAddress: '通信地址',
		remark: '备注',
	},

	/**
	 * 详情页
	 */
	STAFF_INFO_DIC: {
		empCode: '员工主码',
		empNatrue: '员工类型',
		empName: '员工姓名',
		empIdcard: '身份证号',
		validity: '身份证有效期',
		empSex: '性&emsp;&emsp;别',
		empBirthday: '出生日期',
		empAge: '年&emsp;&emsp;龄',
		empMarriStatus: '婚姻状况',
		empNational: '民&emsp;&emsp;族',
		politicalStatus: '政治面貌',
		empPhone: '手机号码',
		empEmail: '邮&emsp;&emsp;箱',
		idAddress: '户籍所在地',
		empRegisType: '户口性质',
		fileAddress: '档案所在地',
		isCollege: '是否大专及以上',
		hignEducation: '最高学历',
		school: '学&emsp;&emsp;校',
		major: '专&emsp;&emsp;业',
		admissionDate: '入学时间',
		gradutionDate: '毕业时间',
		fileSource: '档案来源',
		status: '档案状态',
		contactAddress: '通信地址',
		remark: '备&emsp;&emsp;注',
		contractStatus: '合同状态',
		// socialStatus: '社保状态',
		// fundStatus: '公积金状态',
		insuranceStatus: '商险状态',
		salaryStatus: '近三个月发薪',
		empNo: '员工编码',
		unitName: '客户名称',
		deptName: '项目名称',
		deptNo: '项目编码',
		businessPrimaryType: '业务类型',
		contractType: '合同类型',
		workingHours: '工时制',
		post: '就职岗位',
		enjoinDate: '入职日期',
		tryPeriod: '试用期',
		projectSource: '档案来源',
		projectStatus: '档案状态',
		leaveReason: '减档原因',
		leaveTime: '减档时间',
		leaveRemark: '减档备注',
		bankName: '开户行',
		bankSubName: '支&emsp;&emsp;行',
		bankNo: '银行卡号',
		validityStart: '身份证开始日期',
		validityEnd: '身份证截止日期',
		idProvince: '户籍所在省',
		idCity: '户籍所在市',
		idTown: '户籍所在县',
		unitNo: '客户编码',
		projectNum: '现存项目数',
		leaveUserName: '减档人',
		fileStatus: '档案状态',
		fileProvince: '档案所在省',
		fileCity: '档案所在市',
		fileTown: '档案所在县',
		isLeaveEmployee: '是否同步减档',
		businessSecondType: '业务类型二级分类', // 业务类型2
		businessThirdType: '业务类型三级分类', // 业务类型3
		orderTYpe: '派单类型', 
		socialStatus: '社保状态', // 社保信息
		socialHouseholdName: '社保户',  
		socialAddress: '社保缴纳地',
		socialStartDate: '社保缴起缴日期',
		socialReduceDate: '社保停缴日期',
		fundStatus: '公积金状态',//公积金信息
		providentHouseholdName: '公积金户',
		fundAddress: '公积金缴纳地',
		providentStart: '公积金起缴日期',
		fundReduceDate: '公积金停缴日期',
		changeStartMonth: '划转起始月',
		unsettleDeal:'已产生未结算费用'
	},
	// 项目管理详情
	PROJECTMANAGE_INFO:{
		// 基础信息
		departName:'项目名称',
		departNo:'项目编码',
		customerName:'客户名称',
		customerNo:'客户编码',
		serviceTeam:'服务团队',
		bpoFlag:'是否为BPO项目',
		stopFlag:'是否可用',
// 封面抬头信息
		invoiceTitleInsurance:'商险封面抬头',
		invoiceTitleSalary:'薪资封面抬头',
// 收入生成规则
		incomFrom:'收入组成',
		mrSettleType:'结算方式',

// 管理费
manageServerItem:'收费项目',
		incomeStandManage:'收费标准',
		managementType:'收费方式',
		managementFee:'金额/比例',

// 风险金
riskServerItem:'收费项目',
		incomeRiskManage:'收费标准',
		riskFundType:'收费方式',
		riskFundFee:'金额/比例',





	},
	/**
	 * 批量导入人员档案必填字段
	 */
	STAFF_UPDATE_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
	},

	// 离职库批量导出
	STAFF_WITHDRAWN_EXPORT__HEADER: [
		{ title: '员工主码', dataIndex: 'empCode', width: 100 },
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '手机号码', dataIndex: 'empPhone', width: 100 },
		{ title: '档案所在省', dataIndex: 'fileProvince', width: 100 },
		{ title: '档案所在市', dataIndex: 'fileCity', width: 100 },
		{ title: '档案所在县', dataIndex: 'fileTown', width: 100 },
		{ title: '单位名称', dataIndex: 'unitName', width: 100 },
		{ title: '项目名称', dataIndex: 'deptName', width: 100 },
		{ title: '项目编码', dataIndex: 'deptNo', width: 100 },
		{ title: '员工类型', dataIndex: 'empNatrue', width: 100 },
		{ title: '减档时间', dataIndex: 'leaveTime', width: 100 },
		{ title: '减档人', dataIndex: 'leaveUserName', width: 100 },
	],

	/**
	 * 批量减档头
	 */
	STAFF_DOWNSHIFT_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		leaveReason: '减档原因',
		leaveRemark: '减档备注',
	},
};
