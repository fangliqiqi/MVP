export default {
	DEGREE_HEADER: {
		// 批量导入学历信息
		empName: '员工姓名',
		empIdcard: '身份证号',
		school: '学校',
		collageSystem: '院系名称',
		major: '专业',
		educationName: '学历',
		type: '学历类型',
		highIdentification: '最高学历',
		educationSystem: '学制类型',
		entryDate: '入学时间',
		gradutionDate: '毕业时间',
		certificationName: '证书名称',
		remark: '备注',
	},

	DEGREE_HEADER_EXPORT: [
		// 批量导出学历信息
		{header:'唯一标识',key:'id',width:20},
		{ header: '员工姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcard', width: 20 },
		{ header: '学校', key: 'school', width: 20 },
		{ header: '院系名称', key: 'collageSystem', width: 20 },
		{ header: '专业', key: 'major', width: 20 },
		{ header: '学历', key: 'educationName', width: 15},
		{ header: '学历类型', key: 'type', width: 15 },
		{ header: '最高学历', key: 'highIdentification', width: 15 },
		{ header: '学制类型', key: 'educationSystem', width: 15 },
		{ header: '入学时间', key: 'entryDate', width: 15 },
		{ header: '毕业时间', key: 'gradutionDate', width: 15 },
		{ header: '证书名称', key: 'certificationName', width: 20 },
		{ header: '备注', key: 'remark', width:25 },
	],

	DEGREE_HEADER_UPDATE: {
		// 批量更新学历信息
		id: '唯一标识',
		school: '学校',
		collageSystem: '院系名称',
		major: '专业',
		educationName: '学历',
		type: '学历类型',
		highIdentification: '最高学历',
		educationSystem: '学制类型',
		entryDate: '入学时间',
		gradutionDate: '毕业时间',
		certificationName: '证书名称',
		remark: '备注',
	},
};
