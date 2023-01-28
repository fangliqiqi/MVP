export default {

	// 项目权限导出
  PERMISSION_HEADER_EXPORT: [
		{header:'员工姓名',key:'userNickName',width:15},
		{header:'登录账号',key:'userLoginName',width:15},
		{header:'所在部门',key:'userDeptName',width:15},
		{header:'项目名称',key:'settleDomainName',width:20},
		{header:'项目编码',key:'settleDomainNo',width:20},
		{header:'授权状态',key:'status',width:15},
	],
	// 社保公积金审核权限导出
	PERMISSION_SOCIALANDFUND_HEADER_EXPORT:[
		{header:'审核人',key:'userName',width:15},
		{header:'审核人所在部门',key:'userDeptName',width:15},
		{header:'户类型',key:'houseNameType',width:15},
		{header:'户名',key:'socialAndFund',width:20},
		{header:'授权状态',key:'status',width:15},
	],
		// 社保办理导出
	PERMISSION_SOCIAL_HEADER_EXPORT:[
		{header:'办理人人',key:'userName',width:15},
		{header:'办理人所在部门',key:'userDeptName',width:15},
		{header:'社保户',key:'socialHousehold',width:20},
		{header:'授权状态',key:'status',width:20},
	],
	// 公积金办理权限导出
	PERMISSION_FUND_HEADER_EXPORT: [
		{header:'办理人',key:'userName',width:15},
		{header:'办理人所在部门',key:'userDeptName',width:20},
		{header:'公积金户',key:'fundHousehold',width:25},
		{header:'授权状态',key:'status',width:15},
	],

	// 项目管理导出
	PROJECTMANAGE_HEADER_EXPORT:[
			{header:'项目名称',key:'departName',width:30},
			{header:'项目编码',key:'departNo',width:15},
			{header:'客户名称',key:'customerName',width:30},
			{header:'客户编码',key:'customerNo',width:15},
			{header:'是否为BPO项目',key:'bpoFlag',width:15},
			{header:'结算方式',key:'mrSettleType',width:15},
			{header:'收入组成',key:'incomeForm',width:15},
			{header:'是否可用',key:'stopFlag',width:15},
			{header:'商险封面抬头',key:'invoiceTitleInsurance',width:30},
			{header:'薪资封面抬头',key:'invoiceTitleSalary',width:30},
	]

};