export default {
	PROFESSION_HEADER: {
		// 批量导入职业资格
		empName: '员工姓名',
		empIdcard: '身份证号',
		certificationNo: '证书编号',
		declareYear: '申报年度',
		assessmentUnit: '评定机构',
		obtainType: '获取方式',
		qualificationType: '资格类型',
		qualificationLevel: '资格等级',
		heightIdentification: '是否最高资格',
		remark: '备注',
	},
	// 批量导出职业资格
	PROFESSION_HEADER_EXPORT: [
		{header:'员工姓名',key:'empName',width:15},
		{header:'身份证号',key:'empIdcard',width:20},
		{header:'证书编号',key:'certificationNo',width:20},
		{header:'申报年度',key:'declareYear',width:15},
		{header:'评定机构',key:'assessmentUnit',width:20},
		{header:'获取方式',key:'obtainType',width:15},
		{header:'资格类型',key:'qualificationType',width:20},
		{header:'资格等级',key:'qualificationLevel',width:15},
		{header:'是否最高资格',key:'heightIdentification',width:15},
		{header:'备注',key:'remark',width:25},
	],
};
