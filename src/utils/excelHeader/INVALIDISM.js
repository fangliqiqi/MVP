export default {
	INVALIDISM_HEADER: {
		// 批量导入伤残信息
		empName: '员工姓名',
		empIdcard: '身份证号',
		disabilityName: '伤残病名称',
		occupationalDisease: '职业病名称',
		disabilityLevel: '伤残等级',
		startTime: '伤残开始日期',
		endTime: '伤残结束日期',
		injuryIdentification: '是否工伤',
		remark: '备注',
	},

	INVALIDISM_HEADER_EXPORT: [
		// 批量导出伤残信息
		{header:'员工姓名',key:'empName',width:15},
		{header:'身份证号',key:'empIdcard',width:20},
		{header:'伤残病名称',key:'disabilityName',width:20},
		{header:'职业病名称',key:'occupationalDisease',width:20},
		{header:'伤残等级',key:'disabilityLevel',width:15},
		{header:'伤残开始日期',key:'startTime',width:15},
		{header:'伤残结束日期',key:'endTime',width:15},
		{header:'是否工伤',key:'injuryIdentification',width:10},
		{header:'备注',key:'remark',width:25},
	],
};
