export default {
	// 批量导入不良记录
	BADNESS_HEADER: {
		empName: '员工姓名',
		empIdcard: '身份证号',
		projectCode: '产生项目编码',
		happenTime: '发生时间',
		loseFee: '费用损失',
		loseFeeOther: '其他损失',
		remark: '不良记录描述',
	},

	/**
	 * 下载错误反馈
	 */
	ERROR_HEADER: [
		{header:'行号',key:'line',width:15},
		{header:'反馈描述',key:'error',width:50},
	],

		// 身份证校验
	IDCARD_HEADER:[
		{header:'员工名称',key:'name',width:15},
		{header:'身份证号',key:'idCard',width:20},
		{header:'是否一致',key:'isTrue',width:15},
		{header:'原因',key:'reason',width:30},
	],
	/*
	证明开具记录批量导出
 */
	PROVE_HEADER_EXPORT: [
		{header:'员工姓名',key:'empName',width:15},
		{header:'身份证号',key:'empIdcard',width:20},
		{header:'所在项目名称',key:'projectName',width:20},
		{header:'所在项目编码',key:'projectCode',width:20},
		{header:'证明类型',key:'type',width:20},
		{header:'开具人',key:'opener',width:15},
		{header:'开具日期',key:'openTime',width:15},
	],

	/**
	 * 过滤日志修改字段
	 */
	FILTER_LOG_PARAMS: ['createName', 'createBy', 'createTime', 'updateBy', 'updateTime', 'deleteFlag', 'deptId', 'unitId', 'leaveUser'],
};
