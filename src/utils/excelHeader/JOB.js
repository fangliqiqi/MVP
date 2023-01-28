export default {
	JOB_HEADER: {
		// 批量导入工作经历
		empName: '员工姓名',
		empIdcard: '身份证号',
		workUnit: '工作单位',
		workDepart: '工作部门',
		workJob: '工作岗位',
		workingType: '工作类型',
		workingStatus: '在职状态',
		startDate: '开始工作日期',
		endDate: '结束工作日期',
	},

	JOB_HEADER_EXPORT: [
		// 批量导出工作经历
		{ header: '员工姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdcard', width: 20 },
		{ header: '工作单位', key: 'workUnit', width: 25 },
		{ header: '工作部门', key: 'workDepart', width: 20 },
		{ header: '工作岗位', key: 'workJob', width: 20 },
		{ header: '工作类型', key: 'workingType', width: 15 },
		{ header: '在职状态', key: 'workingStatus', width: 15 },
		{ header: '开始工作日期', key: 'startDate', width: 15 },
		{ header: '结束工作日期', key: 'endDate', width: 15 },

	],
};
