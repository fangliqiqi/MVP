import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
export default {
	/**
	 * 社保公积金基本信息详情
	 */
	SOCIAIFUND_BASIC_INFO: [
		{ label: '员工类型', key: 'empNatrue', dict: 'emp_natrue' },
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '身份证有效期', key: 'validity', tooltip: true },
		{ label: '性\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0别', key: 'empSex', dict: 'prove_peo_sex' },
		{ label: '出生日期', key: 'empBirthday', date: '	YYYY-MM-DD' },
		{ label: '年\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0龄', key: 'empAge' },
		{ label: '婚姻状况', key: 'empMarriStatus', dict: 'emp_married' },
		{ label: '民\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0族', key: 'empNational', dict: 'emp_national' },
		{ label: '政治面貌', key: 'politicalStatus', dict: 'emp_political' },
		{ label: '手机号码', key: 'empPhone' },
		{ label: '邮\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0箱', key: 'empEmail', tooltip: true },
		{ label: '户籍所在地', key: 'idAddress', address: { pro: 'idProvince', city: 'idCity', town: 'idTown' }, tooltip: true },
		{ label: '户口性质', key: 'empRegisType', dict: 'emp_registype' },
		{ label: '档案所在地', key: 'fileAddress', address: { pro: 'fileProvince', city: 'fileCity', town: 'fileTown' }, tooltip: true },
		{ label: '是否大专及以上', key: 'isCollege', dict: 'is_college' },
		{ label: '最高学历', key: 'educationName' }, // 测试于2022/8/16确认修改，参见禅道bug #10840,直接返回文字，去除 dict: 'education'
		{ label: '学\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0校', key: 'school', tooltip: true },
		{ label: '专\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0业', key: 'major', tooltip: true },
		{ label: '入学时间', key: 'admissionDate', date: 'YYYY-MM-DD' },
		{ label: '毕业时间', key: 'gradutionDate', date: 'YYYY-MM-DD' },
		{ label: '通信地址', key: 'contactAddress', tooltip: true },
		{ label: '备\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0注', key: 'remark', tooltip: true },
	],

	/**
	 * 社保公积金项目信息
	 */
	SOCIAIFUND_PROJECT_INFO: [
		{ label: '客户名称', key: 'unitName', tooltip: true },
		{ label: '项目名称', key: 'deptName', tooltip: true },
		{ label: '就职岗位', key: 'post', tooltip: true },
	],
	/**
	 * 社保公积金合同信息
	 * */
	SOCIAIFUND_CONTRACT_INFO: [
		{ label: '合同类型', key: 'contractName' },
		{ label: '业务细分', key: 'contractSubName' },
		{ label: '签订期限', key: 'contractType', dict: 'employee_contract_type' },
		{ label: '合同起始日期', key: 'contractStart', date: 'YYYY-MM-DD' },
		{ label: '合同截止日期', key: 'contractEnd', date: 'YYYY-MM-DD' },
		{ label: '合同年限', key: 'contractTerm' },
		{ label: '工时制', key: 'workingHours', dict: 'working_hours' },
	],

	/**
	 * 社保公积金社保信息
	 */
	SOCIAIFUND_SOCIAL_INFO: [
		{ label: '社保办理状态', key: 'socialStatus', dict: 'social_handle_status' },
		{ label: '社保停缴日期', key: 'socialReduceDate', date: 'YYYY-MM-DD' },
		{ label: '社保户', key: 'socialHouseholdName', tooltip: true },
		{ label: '社保缴纳地', key: 'address', address: { pro: 'socialProvince', city: 'socialCity', town: 'socialTown' }, tooltip: true },
		{ label: '首次购买月份', key: 'firstBuyMonthSocial', date: 'YYYY-MM' },
		{ label: '社保基数下限', key: 'lowerLimit' },
		{ label: '社保基数上限', key: 'upperLimit' },
		{
			label: '补缴期限',
			key: 'overpayNumber',
			dictValue: {
				1: '一个月',
				2: '两个月',
				3: '三个月',
				4: '四个月',
				5: '五个月',
				6: '六个月',
				7: '七个月',
				8: '八个月',
				9: '九个月',
				10: '十个月',
				11: '十一个月',
				12: '十二个月',
			},
		},
		{ label: '是否含当月', key: 'haveThisMonth', dictValue: { 0: '是', 1: '否' } }, //是否含当月 0：是，1：否
		{ label: '补缴采用最新基数', key: 'latestCardinality', dictValue: { 0: '是', 1: '否' } }, //补缴是否采用最新基数0是1否
		{
			label: '补缴险种',
			checkbox: [
				{ label: '养老', key: 'insurancePension' },
				{ label: '医疗', key: 'insuranceMedical' },
				{ label: '失业', key: 'insuranceUnemployment' },
				{ label: '工伤', key: 'insuranceInjury' },
				{ label: '生育', key: 'insuranceBirth' },
				{ label: '大病', key: 'insuranceBigailment' },
			],
			span: 18,
		},
		{ label: '社保补缴政策', key: 'payPolicy', span: 24, tooltip: true },
		{ label: '大病是否收费', key: 'isIllness', dictValue: { 0: '是', 1: '否' } }, //大病是否收费：0是 1 否
		{ label: '大病缴纳周期', key: 'collectType', dictValue: { 0: '年', 1: '月' } }, //0按年1按月
		{ label: '缴纳方式', key: 'valueType', dict: 'collect_pay_way' }, // 大病取值方式1 按比例 0按定值
		{ label: '缴纳类型', key: 'paymentType', dict: 'collect_pay_type' }, //缴纳类型（0最低缴纳、1自定义缴纳、2最高缴纳）
		{ label: '备案基数', key: 'recordBase' },
		{ label: '委托备注', key: 'trustRemark', span: 24, tooltip: true },
	],

	/**
	 * 社保公积金社保表格信息
	 */
	SOCIAIFUND_SOCIAL_TABLE: {
		tho: [
			{ label: '险种', rowspan: 2 },
			{ label: '整体', colspan: 3 },
			{ label: '单位', colspan: 3 },
			{ label: '个人', colspan: 3 },
			{ label: '汇总金额', rowspan: 2 },
		],
		tht: [
			{ label: '状态' },
			{ label: '起缴月份' },
			{ label: '起缴周期' },
			{ label: '基数' },
			{ label: '比例' },
			{ label: '金额' },
			{ label: '基数' },
			{ label: '比例' },
			{ label: '金额' },
		],
		yliao: [
			{ label: '医疗' },
			{ label: '', key: 'medicalHandle', dict: 'coverage_status' }, //医疗办理状态：0待办理1办理成功2办理失败3已派减
			{ label: '', key: 'medicalStart', date: 'YYYY-MM' },
			{ label: '月', key: '' },
			{ label: '', key: 'unitMedicalCardinal' },
			{ label: '', key: 'unitMedicalPer' },
			{ label: '', key: 'unitMedicalMoney' },
			{ label: '', key: 'personalMedicalCardinal' },
			{ label: '', key: 'personalMedicalPer' },
			{ label: '', key: 'personalMedicalMoney' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitMedicalMoney = row.unitMedicalMoney || 0;
					const personalMedicalMoney = row.personalMedicalMoney || 0;
					return unitMedicalMoney + personalMedicalMoney ? (unitMedicalMoney + personalMedicalMoney).toFixed(2) : 0;
				},
			},
		],
		ylao: [
			{ label: '养老' },
			{ label: '', key: 'pensionHandle', dict: 'coverage_status' },
			{ label: '', key: 'pensionStart', date: 'YYYY-MM' },
			{ label: '月', key: '' },
			{ label: '', key: 'unitPensionCardinal' },
			{ label: '', key: 'unitPensionPer' },
			{ label: '', key: 'unitPersionMoney' },
			{ label: '', key: 'personalPensionCardinal' },
			{ label: '', key: 'personalPensionPer' },
			{ label: '', key: 'personalPersionMoney' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitPersionMoney = row.unitPersionMoney || 0;
					const personalPersionMoney = row.personalPersionMoney || 0;
					return unitPersionMoney + personalPersionMoney ? (unitPersionMoney + personalPersionMoney).toFixed(2) : 0;
				},
			},
		],
		sye: [
			{ label: '失业' },
			{ label: '', key: 'unemployHandle', dict: 'coverage_status' },
			{ label: '', key: 'unemployStart', date: 'YYYY-MM' },
			{ label: '月', key: '' },
			{ label: '', key: 'unitUnemploymentCardinal' },
			{ label: '', key: 'unitUnemploymentPer' },
			{ label: '', key: 'unitUnemploymentMoney' },
			{ label: '', key: 'personalUnemploymentCardinal' },
			{ label: '', key: 'personalUnemploymentPer' },
			{ label: '', key: 'personalUnemploymentMoney' },
			{
				label: '',
				key: '计算',
				formatter: function (row) {
					// return (row.unitUnemploymentMoney + row.personalUnemploymentMoney).toFixed(2);
					const unitUnemploymentMoney = row.unitUnemploymentMoney || 0;
					const personalUnemploymentMoney = row.personalUnemploymentMoney || 0;
					return unitUnemploymentMoney + personalUnemploymentMoney ? (unitUnemploymentMoney + personalUnemploymentMoney).toFixed(2) : 0;
				},
			},
		],
		gshang: [
			{ label: '工伤' },
			{ label: '', key: 'workInjuryHandle', dict: 'coverage_status' },
			{ label: '', key: 'workInjuryStart', date: 'YYYY-MM' },
			{ label: '月', key: '' },
			{ label: '', key: 'unitWorkInjuryCardinal' },
			{ label: '', key: 'unitWorkUnjuryPer' },
			{ label: '', key: 'unitInjuryMoney' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: '', key: 'unitInjuryMoney' },
		],
		syu: [
			{ label: '生育' },
			{ label: '', key: 'birthHandle', dict: 'coverage_status' },
			{ label: '', key: 'birthStart', date: 'YYYY-MM' },
			{ label: '月', key: '' },
			{ label: '', key: 'unitBirthCardinal' },
			{ label: '', key: 'unitBirthPer' },
			{ label: '', key: 'unitBirthMoney' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: EMPTY_PLACEHOLDER, key: '' },
			{ label: '', key: 'unitBirthMoney' },
		],
		dbing: [
			{ label: '大病' },
			{ label: '', key: 'bigailmentHandle', dict: 'coverage_status' },
			{ label: '', key: 'bigailmentStart', date: 'YYYY-MM' },
			{ label: '', key: 'collectType', dictValue: { 0: '年', 1: '月' } }, //大病缴纳周期：0按年1按月
			{ label: '', key: 'unitBigailmentCardinal' },
			{ label: '', key: 'unitBigailmentPer' },
			{ label: '', key: 'unitBigailmentMoney' },
			{ label: '', key: 'personalBigailmentCardinal' },
			{ label: '', key: 'personalBigailmentPer' },
			{ label: '', key: 'personalBigailmentMoney' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					// return (row.unitBigailmentMoney + row.personalBigailmentMoney).toFixed(2);
					const unitBigailmentMoney = row.unitBigailmentMoney || 0;
					const personalBigailmentMoney = row.personalBigailmentMoney || 0;
					return unitBigailmentMoney + personalBigailmentMoney ? (unitBigailmentMoney + personalBigailmentMoney).toFixed(2) : 0;
				},
			},
		],
		add: [
			{ label: '汇总' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'unitSocialSum' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'personalSocialSum' },
			{
				label: '',
				key: '6',
				formatter: function (row) {
					// return (row.unitSocialSum + row.personalSocialSum).toFixed(2);
					const unitSocialSum = row.unitSocialSum || 0;
					const personalSocialSum = row.personalSocialSum || 0;
					return unitSocialSum + personalSocialSum ? (unitSocialSum + personalSocialSum).toFixed(2) : 0;
				},
			},
		],
	},

	/**
	 * 社保公积金公积金信息
	 */
	SOCIAIFUND_FUND_INFO: [
		{ label: '公积金办理状态', key: 'fundStatus', dict: 'fund_handle_status' },
		{ label: '公积金停缴日期', key: 'fundReduceDate', date: 'YYYY-MM-DD' },
		{ label: '公积金户', key: 'providentHouseholdName', tooltip: true },
		{ label: '公积金缴纳地', key: '', address: { pro: 'fundProvince', city: 'fundCity', town: 'fundTown' }, tooltip: true },
		{ label: '公积金起缴日期', key: 'providentStart', date: 'YYYY-MM-DD' },
		{ label: '首次购买月份', key: 'firstBuyMothFund', date: 'YYYY-MM' },
		{ label: '公积金基数下限', key: 'lowerLimitFund' },
		{ label: '公积金基数上限', key: 'upperLimitFund' },
		{
			label: '公积金单边小数点',
			key: 'fundPayPoint',
			dictValue: {
				1: '四舍五入取整',
				2: '元以下舍去',
				3: '见角进元',
				4: '保留两位小数',
				5: '保留一位小数',
			},
		},
		{
			label: '补缴期限',
			key: 'overpayNumberFund',
			dictValue: {
				1: '一个月',
				2: '两个月',
				3: '三个月',
				4: '四个月',
				5: '五个月',
				6: '六个月',
				7: '七个月',
				8: '八个月',
				9: '九个月',
				10: '十个月',
				11: '十一个月',
				12: '十二个月',
			},
		},
		{ label: '是否含当月', key: 'haveThisMonthFund', dictValue: { 0: '是', 1: '否' } }, //是否含当月 0：是，1：否(公积金)
		{ label: '补缴采用最新基数', key: 'latestCardinalityFund', dictValue: { 0: '是', 1: '否' } }, //补缴采用最新基数 0：是，1：否(公积金)
		{ label: '公积金补缴政策', key: 'payPolicyFund', span: 24, tooltip: true },
		{ label: '委托备注', key: 'trustRemarkFund', span: 24, tooltip: true },
	],

	/**
	 * 派单管理-派减时社保公积金详情
	 */
	DISPATCH_REDUCE_SOCIALFUND_INFO: [
		{ label: '派单类型', key: 'dispatchType', default: '派减' },
		{ label: '员工类型', key: 'empType', dict: 'emp_natrue' },
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '客户名称', key: 'belongUnitName', tooltip: true },
		{ label: '项目名称', key: 'settleDomainName', tooltip: true },
		{ label: '就职岗位', key: 'post', tooltip: true },
		{ label: '社保停缴日期', key: 'socialReduceDate', date: 'YYYY-MM-DD' },
		{ label: '公积金停缴日期', key: 'fundReduceDate', date: 'YYYY-MM-DD' },
		{ label: '离职日期', key: 'leaveDate', date: 'YYYY-MM-DD' },
		{ label: '减少原因', key: 'reduceReason', dict: 'social_reduce_reason' },
		{ label: '派减备注', key: 'trustRemark', span: 24 },
	],

	/**
	 * 社保公积金公积金表格信息
	 */
	SOCIAIFUND_FUND_TABLE: {
		tho: [
			{ label: '险种', rowspan: 2 },
			{ label: '单位', colspan: 3 },
			{ label: '个人', colspan: 3 },
			{ label: '汇总金额', rowspan: 2 },
		],
		tht: [{ label: '基数' }, { label: '比例' }, { label: '金额' }, { label: '基数' }, { label: '比例' }, { label: '金额' }],
		gjijin: [
			{ label: '公积金' },
			{ label: '', key: 'unitProvidengCardinal' },
			{ label: '', key: 'unitProvidentPer' },
			{ label: '', key: 'unitProvidentFee' },
			{ label: '', key: 'personalProvidentCardinal' },
			{ label: '', key: 'personalProvidentPer'},
			{ label: '', key: 'personalProvidentFee' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitFundSum = row.unitProvidentFee ? row.unitProvidentFee : 0;
					const personalFundSum = row.personalProvidentFee ? row.personalProvidentFee : 0;
					return unitFundSum + personalFundSum > 0 ? (unitFundSum + personalFundSum).toFixed(2) : 0;
				},
			},
		],
		add: [
			{ label: '汇总' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'unitProvidentFee' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'personalProvidentFee' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitFundSum = row.unitProvidentFee ? row.unitProvidentFee : 0;
					const personalFundSum = row.personalProvidentFee ? row.personalProvidentFee : 0;
					return unitFundSum + personalFundSum > 0 ? (unitFundSum + personalFundSum).toFixed(2) : 0;
				},
			},
		],
	},

	/**
	 * 社保公积金查询信息导出
	 */
	SOCIAIFUND_EXPORT_HEARED: [
		{ title: '员工姓名', dataIndex: 'empName', width: 160 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 160 },
		{ title: '员工类型', dataIndex: 'empType', width: 160 },
		{ title: '手机号码', dataIndex: 'empMobile', width: 160 },
		{ title: '客户名称', dataIndex: 'unitName', width: 160 },
		{ title: '项目名称', dataIndex: 'settleDomainName', width: 160 },
		{ title: '身份证省', dataIndex: 'idCardProvince', width: 160 },
		{ title: '身份证市', dataIndex: 'idCardCity', width: 160 },
		{ title: '身份证县', dataIndex: 'idCardTown', width: 160 },
		{ title: '身份证所在地', dataIndex: 'idCardAddress', width: 160 },
		{ title: '档案-省', dataIndex: 'fileProvince', width: 160 },
		{ title: '档案-市', dataIndex: 'fileCity', width: 160 },
		{ title: '档案-县', dataIndex: 'fileTown', width: 160 },
		{ title: '岗位', dataIndex: 'post', width: 160 },
		{ title: '试用期', dataIndex: 'tryPeriod', width: 160 },
		{ title: '工时制', dataIndex: 'workingHours', width: 160 },
		{ title: '民族', dataIndex: 'empNational', width: 160 },
		{ title: '户口性质', dataIndex: 'empRegisType', width: 160 },
		{ title: '合同类型', dataIndex: 'contractName', width: 160 },
		{ title: '业务细分', dataIndex: 'contractSubName', width: 160 },
		{ title: '合同甲方', dataIndex: 'contractParty', width: 160 },
		{ title: '签订期限', dataIndex: 'contractType', width: 160 },
		{ title: '合同起始时间', dataIndex: 'contractStart', width: 160 },
		{ title: '合同到期时间', dataIndex: 'contractEnd', width: 160 },
		{ title: '合同期限', dataIndex: 'contractTerm', width: 160 },
		{ title: '学历', dataIndex: 'educationName', width: 160 },
		{ title: '备案基数', dataIndex: 'recordBase', width: 160 },
		{ title: '社保状态', dataIndex: 'socialStatus', width: 160 },
		{ title: '公积金状态', dataIndex: 'fundStatus', width: 160 },
		{ title: '社保起缴日期', dataIndex: 'socialStartDate', width: 160 },
		{ title: '公积金起缴日期', dataIndex: 'providentStart', width: 160 },
		{ title: '社保停缴日期', dataIndex: 'socialReduceDate', width: 160 },
		{ title: '公积金停缴日期', dataIndex: 'fundReduceDate', width: 160 },
		{ title: '单位社保合计', dataIndex: 'unitSocialSum', width: 160 },
		{ title: '个人社保合计', dataIndex: 'personalSocialSum', width: 160 },
		{ title: '单位公积金', dataIndex: 'unitFundSum', width: 160 },
		{ title: '个人公积金', dataIndex: 'personalFundSum', width: 160 },
		{ title: '总缴纳合计', dataIndex: 'allSum', width: 160 },
		{ title: '社保户', dataIndex: 'socialHouseholdName', width: 160 },
		{ title: '社保缴纳地-省', dataIndex: 'socialProvince', width: 160 },
		{ title: '社保缴纳地-市', dataIndex: 'socialCity', width: 160 },
		{ title: '社保缴纳地-县', dataIndex: 'socialTown', width: 160 },
		{ title: '养老起缴日期', dataIndex: 'pensionStart', width: 160 },
		{ title: '医疗起缴日期', dataIndex: 'medicalStart', width: 160 },
		{ title: '失业起缴日期', dataIndex: 'unemployStart', width: 160 },
		{ title: '工伤起缴日期', dataIndex: 'workInjuryStart', width: 160 },
		{ title: '生育起缴日期', dataIndex: 'birthStart', width: 160 },
		{ title: '大病起缴日期', dataIndex: 'bigailmentStart', width: 160 },
		{ title: '缴纳类型', dataIndex: 'paymentType', width: 160 },
		{ title: '养老基数', dataIndex: 'unitPensionCardinal', width: 160 },
		{ title: '单位养老比例', dataIndex: 'unitPensionPer', width: 160 },
		{ title: '个人养老比例', dataIndex: 'personalPensionPer', width: 160 },
		{ title: '单位养老金额', dataIndex: 'unitPersionMoney', width: 160 },
		{ title: '个人养老金额', dataIndex: 'personalPersionMoney', width: 160 },
		{ title: '养老金额合计', dataIndex: 'persionMoney', width: 160 },
		{ title: '医疗基数', dataIndex: 'unitMedicalCardinal', width: 160 },
		{ title: '单位医疗比列', dataIndex: 'unitMedicalPer', width: 160 },
		{ title: '个人医疗比例', dataIndex: 'personalMedicalPer', width: 160 },
		{ title: '单位医疗金额', dataIndex: 'unitMedicalMoney', width: 160 },
		{ title: '个人医疗金额', dataIndex: 'personalMedicalMoney', width: 160 },
		{ title: '医疗金额合计', dataIndex: 'medicalMoney', width: 160 },
		{ title: '失业基数', dataIndex: 'unitUnemploymentCardinal', width: 160 },
		{ title: '单位失业比列', dataIndex: 'unitUnemploymentPer', width: 160 },
		{ title: '个人失业比例', dataIndex: 'personalUnemploymentPer', width: 160 },
		{ title: '单位失业金额', dataIndex: 'unitUnemploymentMoney', width: 160 },
		{ title: '个人失业金额', dataIndex: 'personalUnemploymentMoney', width: 160 },
		{ title: '失业金额合计', dataIndex: 'unemploymentMoney', width: 160 },
		{ title: '工伤基数', dataIndex: 'unitWorkInjuryCardinal', width: 160 },
		{ title: '单位工伤比例', dataIndex: 'unitWorkUnjuryPer', width: 160 },
		{ title: '单位工伤金额', dataIndex: 'unitInjuryMoney', width: 160 },
		{ title: '生育基数', dataIndex: 'unitBirthCardinal', width: 160 },
		{ title: '单位生育比列', dataIndex: 'unitBirthPer', width: 160 },
		{ title: '单位生育金额', dataIndex: 'unitBirthMoney', width: 160 },
		{ title: '大病基数', dataIndex: 'unitBigailmentCardinal', width: 160 },
		{ title: '单位大病比列', dataIndex: 'unitBigailmentPer', width: 160 },
		{ title: '个人大病比例', dataIndex: 'personalBigailmentPer', width: 160 },
		{ title: '单位大病金额', dataIndex: 'unitBigailmentMoney', width: 160 },
		{ title: '个人大病金额', dataIndex: 'personalBigailmentMoney', width: 160 },
		{ title: '大病金额合计', dataIndex: 'bigailmentMoney', width: 160 },
		{ title: '公积金户', dataIndex: 'providentHouseholdName', width: 160 },
		{ title: '公积金缴纳地-省', dataIndex: 'fundProvince', width: 160 },
		{ title: '公积金缴纳地-市', dataIndex: 'fundCity', width: 160 },
		{ title: '公积金缴纳地-县', dataIndex: 'fundTown', width: 160 },
		{ title: '公积金基数', dataIndex: 'unitProvidengCardinal', width: 160 },
		{ title: '单位公积金比例', dataIndex: 'unitProvidentPer', width: 160 },
		{ title: '个人公积金比例', dataIndex: 'personalProvidentPer', width: 160 },
		{ title: '单位公积金金额', dataIndex: 'unitFundSum2', width: 160 },
		{ title: '个人公积金金额', dataIndex: 'personalFundSum2', width: 160 },
		{ title: '公积金金额合计', dataIndex: 'fundSum', width: 160 },
		{ title: '养老状态', dataIndex: 'pensionHandle', width: 160 },
		{ title: '医疗状态', dataIndex: 'medicalHandle', width: 160 },
		{ title: '失业状态', dataIndex: 'unemployHandle', width: 160 },
		{ title: '工伤状态', dataIndex: 'workInjuryHandle', width: 160 },
		{ title: '生育状态', dataIndex: 'birthHandle', width: 160 },
		{ title: '大病状态', dataIndex: 'bigailmentHandle', width: 160 },
		{ title: '委托备注', dataIndex: 'trustRemark', width: 160 },
	],

	/**
	 * 社保公积金批量调基
	 */
	SOCIAIFUND_BATCH_BASE: [
		'项目编码',
		'员工姓名',
		'身份证号',
		'缴纳类型',
		'养老基数',
		'医疗基数',
		'失业基数',
		'工伤基数',
		'生育基数',
		'单位大病救助金额',
		'个人大病救助金额',
		'单位公积金基数',
		'单位公积金比例（公积金单边比例）',
		'个人公积金基数',
		'个人公积金比例',
	],

	/**
	 * 社保公积金调基翻译字段
	 * 这里没有写id之类的字段,dictValue 字典值写死
	 */

	SOCIAIFUND_BASIC_TRANSLATE: [
		{ title: '员工编码', dataIndex: 'empNo' },
		{ title: '员工姓名', dataIndex: 'empName' },
		{ title: '身份证号', dataIndex: 'idCard' },
		{ title: '员工类型', dataIndex: 'empType' },
		{ title: '项目名称', dataIndex: 'settleDomainName' },
		{ titel: '项目编码', dataIndex: 'settleDomainCode' },
		{ title: '社保单位名称', dataIndex: 'unitName' },
		{ title: 'settleDomainNameFund', dataIndex: '公积金项目名称' },
		{ title: '公积金项目编码', dataIndex: 'settleDomainCodeFund' },
		{ title: '公积金单位名称', dataIndex: 'unitNameFund' },
		{ title: '社保户', dataIndex: 'socialHouseholdName' },
		{ title: '缴纳地-省', dataIndex: 'socialProvince' },
		{ title: '缴纳地-市', dataIndex: 'socialCity' },
		{ title: '缴纳地-县', dataIndex: 'socialTown' },
		{ title: '公积金户', dataIndex: 'providentHouseholdName' },
		{ title: '公积金缴纳地-省', dataIndex: 'fundProvince' },
		{ title: '公积金缴纳地-市', dataIndex: 'fundCity' },
		{ title: '公积金缴纳地-县', dataIndex: 'fundTown' },
		{
			title: '社保派增状态',
			dataIndex: 'socialAddStatus',
			dictValue: { 0: '待审核', 1: '待办理', 2: '办理成功', 3: '部分办理失败', 4: '办理失败', 5: '审核不通过', 6: '办理中' },
		},
		{ title: '公积金派增状态', dataIndex: 'fundAddStatus', dictValue: { 0: '待审核', 1: '待办理', 2: '办理成功', 3: '办理失败', 4: '审核不通过' } },
		{
			title: '社保派减状态',
			dataIndex: 'socialReduceStatus',
			dictValue: { 0: '待审核', 1: '待办理', 2: '办理成功', 3: '办理失败', 4: '审核不通过' },
		},
		{ title: '公积金派减状态', dataIndex: 'fundReduceStatus', dictValue: { 0: '待审核', 1: '待办理', 2: '办理成功', 3: '办理失败' } },
		{ title: '首次购买时间', dataIndex: 'firstBuyMonthSocial' },
		{ title: '单位养老基数', dataIndex: 'unitPensionCardinal' },
		{ title: '单位医疗基数', dataIndex: 'unitMedicalCardinal' },
		{ title: '单位失业基数', dataIndex: 'unitUnemploymentCardinal' },
		{ title: '单位大病救助基数', dataIndex: 'unitBigailmentCardinal' },
		{ title: '单位工伤基数', dataIndex: 'unitWorkInjuryCardinal' },
		{ title: '单位生育基数', dataIndex: 'unitBirthCardinal' },
		{ title: '个人养老基数', dataIndex: 'personalPensionCardinal' },
		{ title: '个人医疗基数', dataIndex: 'personalMedicalCardinal' },
		{ title: '个人大病救助基数', dataIndex: 'personalBigailmentCardinal' },
		{ title: '个人失业基数', dataIndex: 'personalUnemploymentCardinal' },
		{ title: '单位工伤基数', dataIndex: 'personalWorkInjuryCardinal' },
		{ title: '单位养老比例', dataIndex: 'unitPensionPer' },
		{ title: '单位医疗比例', dataIndex: 'unitMedicalPer' },
		{ title: '单位失业比例', dataIndex: 'unitUnemploymentPer' },
		{ title: '单位工伤比例', dataIndex: 'unitWorkUnjuryPer' },
		{ title: '单位生育比例', dataIndex: 'unitBirthPer' },
		{ title: '个人养老比例', dataIndex: 'personalPensionPer' },
		{ title: '个人医疗比例', dataIndex: 'personalMedicalPer' },
		{ title: '个人失业比例', dataIndex: 'personalUnemploymentPer' },
		{ title: '办理状态', dataIndex: 'handleStatus' },
		{ title: '个人大病比例', dataIndex: 'personalBigailmentPer' },
		{ title: '单位大病救助比例', dataIndex: 'unitBigailmentPer' },
		{ title: '社保停缴日期', dataIndex: 'socialReduceDate' },
		{ title: '是否可补缴 ', dataIndex: 'canOverpay', dictValue: { 0: '是', 1: '否' } },
		{ title: '补缴政策', dataIndex: 'payPolicy' },
		{
			title: '补缴期限',
			dataIndex: 'overpayNumber',
			dictValue: {
				1: '一个月',
				2: '两个月',
				3: '三个月',
				4: '四个月',
				5: '五个月',
				6: '六个月',
				7: '七个月',
				8: '八个月',
				9: '九个月',
				10: '十个月',
				11: '十一个月',
				12: '十二个月',
			},
		},
		{ title: '是否含当月', dataIndex: 'haveThisMonth', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴养老', dataIndex: 'insurancePension', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴医疗', dataIndex: 'insuranceMedical', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴失业', dataIndex: 'insuranceUnemployment', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴工伤', dataIndex: 'insuranceInjury', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴生育', dataIndex: 'insuranceBirth', dictValue: { 0: '是', 1: '否' } },
		{ title: '是否能补缴大病', dataIndex: 'insuranceBigailment', dictValue: { 0: '是', 1: '否' } },
		{ title: '补缴是否采用最新基数', dataIndex: 'latestCardinality', dictValue: { 0: '是', 1: '否' } },
		{ title: '大病是否收费', dataIndex: 'isIllness', dictValue: { 0: '是', 1: '否' } },
		{ title: '大病缴纳周期', dataIndex: 'collectType', dictValue: { 0: '按年', 1: '按月' } },
		{ title: '大病取值方式', dataIndex: 'valueType', dictValue: { 0: '按比例', 1: '按定值' } },
		{ title: '大病按年收收取月份', dataIndex: 'collectMoth' },
		{ title: '收费方式', dataIndex: 'isChargePersonal', dictValue: { 0: '立即收', 1: '次年收' } },
		{ title: '备案基数', dataIndex: 'recordBase' },
		{ title: '委托备注', dataIndex: 'trustRemark' },
		{ title: '缴纳类型', dataIndex: 'paymentType', dictValue: { 0: '最低缴纳', 1: '自定义缴纳', 2: '最高缴纳' } },
		{ title: '基数上限', dataIndex: 'upperLimit' },
		{ title: '基数下限', dataIndex: 'lowerLimit' },
		{ title: '养老起缴日期', dataIndex: 'pensionStart' },
		{ title: '医疗起缴日期', dataIndex: 'medicalStart' },
		{ title: '失业起缴日期', dataIndex: 'unemployStart' },
		{ title: '工伤起缴日期', dataIndex: 'workInjuryStart' },
		{ title: '生育起缴日期', dataIndex: 'birthStart' },
		{ title: '大病起缴日期', dataIndex: 'bigailmentStart' },
		{ title: '养老办理状态', dataIndex: 'pensionHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '医疗办理状态', dataIndex: 'medicalHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '失业办理状态', dataIndex: 'unemployHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '工伤办理状态', dataIndex: 'workInjuryHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '生育办理状态', dataIndex: 'birthHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '大病办理状态', dataIndex: 'bigailmentHandle', dictValue: { 0: '待办理', 1: '办理成功', 2: '办理失败', 3: '已派减' } },
		{ title: '单位养老金额', dataIndex: 'unitPersionMoney' },
		{ title: '单位医疗金额', dataIndex: 'unitMedicalMoney' },
		{ title: '单位失业金额', dataIndex: 'unitUnemploymentMoney' },
		{ title: '单位工伤金额', dataIndex: 'unitInjuryMoney' },
		{ title: '单位生育金额', dataIndex: 'unitBirthMoney' },
		{ title: '单位大病金额', dataIndex: 'unitBigailmentMoney' },
		{ title: '个人养老金额', dataIndex: 'personalPersionMoney' },
		{ title: '个人医疗金额', dataIndex: 'personalMedicalMoney' },
		{ title: '个人失业金额', dataIndex: 'personalUnemploymentMoney' },
		{ title: '个人大病金额', dataIndex: 'personalBigailmentMoney' },
		{ title: '单位公积金缴纳基数', dataIndex: 'unitProvidengCardinal' },
		{ title: '个人公积金缴纳基数', dataIndex: 'personalProvidentCardinal' },
		{ title: '社保起缴日期', dataIndex: 'socialStartDate' },
		{ title: '单位公积金缴纳比例', dataIndex: 'unitProvidentPer' },
		{ title: '个人公积金缴纳比例', dataIndex: 'personalProvidentPer' },
		{ title: '公积金起缴日期', dataIndex: 'providentStart' },
		{ title: '公积金初次购买月份', dataIndex: 'firstBuyMothFund' },
		{ title: '基数上限(公积金)', dataIndex: 'upperLimitFund' },
		{ title: '基数下限(公积金)', dataIndex: 'lowerLimitFund' },
		{ title: '单边小数点', dataIndex: 'fundPayPoint' },
		{ title: '是否可补缴(公积金)', dataIndex: 'canOverpayFund', dictValue: { 0: '是', 1: '否' } },
		{
			title: '补缴期限(公积金)',
			dataIndex: 'overpayNumberFund',
			dictValue: {
				1: '一个月',
				2: '两个月',
				3: '三个月',
				4: '四个月',
				5: '五个月',
				6: '六个月',
				7: '七个月',
				8: '八个月',
				9: '九个月',
				10: '十个月',
				11: '十一个月',
				12: '十二个月',
			},
		},
		{ title: '补缴政策(公积金)', dataIndex: 'payPolicyFund' },
		{ title: '委托备注(公积金)', dataIndex: 'trustRemarkFund' },
		{ title: '是否含当月(公积金)', dataIndex: 'haveThisMonthFund', dictValue: { 0: '是', 1: '否' } },
		{ title: '补缴是否采用最新基数(公积金)', dataIndex: 'latestCardinalityFund', dictValue: { 0: '是', 1: '否' } },
		{ title: '公积金停缴日期', dataIndex: 'fundReduceDate' },
		{ title: '单位补缴利息', dataIndex: 'unitInterestFee' },
		{ title: '个人补缴利息', dataIndex: 'personalInterestFee' },
		{ title: '单位社保合计', dataIndex: 'unitSocialSum' },
		{ title: '个人社保合计', dataIndex: 'personalSocialSum' },
		{ title: '单位公积金金额', dataIndex: 'unitFundSum' },
		{ title: '个人公积金金额', dataIndex: 'personalFundSum' },
		{
			title: '社保状态',
			dataIndex: 'socialStatus',
			dictValue: {
				0: '派增-待审核',
				1: '派增-待办理',
				2: '派增-办理中',
				3: '派增-办理成功',
				4: '派增-部分办理失败',
				5: '派增-办理失败',
				10: '派增-审核不通过',
				6: '派减-待审核',
				7: '派减-待办理',
				8: '派减-办理成功',
				9: '派减-办理失败',
			},
		},
		{
			title: '公积金状态',
			dataIndex: 'fundStatus',
			dictValue: {
				0: '派增-待审核',
				1: '派增-待办理',
				3: '派增-办理成功',
				4: '派增-部分办理失败',
				9: '派增-审核不通过',
				5: '派减-待审核',
				6: '派减-待办理',
				7: '派减-办理成功',
				8: '派减-办理失败',
			},
		},
		{ title: '派单ID', dataIndex: 'dispatchId' },
	],

	/**
	 * 派单查询导出头
	 */
	ORDER_SEARCH_HEADER: [
		{ title: '派单类型', dataIndex: 'type', width: 100 },
		{ title: '创建时间', dataIndex: 'createTime', width: 100 },
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '员工身份证', dataIndex: 'empIdcard', width: 100 },
		{ title: '客户名称', dataIndex: 'belongUnitName', width: 100 },
		{ title: '项目名称', dataIndex: 'settleDomainName', width: 100 },
		{ title: '员工类型', dataIndex: 'empType', width: 100 },
		{ title: '合同类型', dataIndex: 'contractType', width: 100 },
		{ title: '业务细分', dataIndex: 'contractSubName', width: 100 },
		{ title: '合同期限', dataIndex: 'contractTerm', width: 100 },
		{ title: '合同起始时间', dataIndex: 'contractStart', width: 100 },
		{ title: '合同到期时间', dataIndex: 'contractEnd', width: 100 },
		{ title: '备案基数', dataIndex: 'recordBase', width: 100 },
		{ title: '社保户', dataIndex: 'socialHouseholdName', width: 100 },
		{ title: '公积金户', dataIndex: 'providentHouseholdName', width: 100 },
		{ title: '社保起缴日期', dataIndex: 'socialStartDate', width: 100 },
		{ title: '社保停缴日期', dataIndex: 'socialReduceDate', width: 100 },
		{ title: '公积金起缴日期', dataIndex: 'providentStart', width: 100 },
		{ title: '公积金停缴日期', dataIndex: 'fundReduceDate', width: 100 },
		{ title: '社保审核状态', dataIndex: 'auditStatus', width: 100 },
		{ title: '社保审核人', dataIndex: 'auditUserName', width: 100 },
		{ title: '审核意见', dataIndex: 'auditRemark', width: 100 },
		{ title: '社保办理人', dataIndex: 'handleUser', width: 100 },
		{ title: '社保办理时间', dataIndex: 'handleTime', width: 100 },
		{ title: '公积金审核状态', dataIndex: 'fundAuditStatus', width: 100 },
		{ title: '公积金审核人', dataIndex: 'fundAuditUser', width: 100 },
		{ title: '公积金办理状态', dataIndex: 'fundHandleStatus', width: 100 },
		{ title: '公积金办理人', dataIndex: 'fundHandleUser', width: 100 },
		{ title: '公积金办理时间', dataIndex: 'fundHandleTime', width: 100 },
		{ title: '养老基数', dataIndex: 'unitPensionCardinal', width: 100 },
		{ title: '医疗基数', dataIndex: 'unitMedicalCardinal', width: 100 },
		{ title: '失业基数', dataIndex: 'unitUnemploymentCardinal', width: 100 },
		{ title: '工伤基数', dataIndex: 'unitWorkInjuryCardinal', width: 100 },
		{ title: '生育基数', dataIndex: 'unitBirthCardinal', width: 100 },
		{ title: '大病基数', dataIndex: 'unitBigailmentCardinal', width: 100 },
		{ title: '委托备注', dataIndex: 'trustRemark', width: 100 },
		{ title: '离职日期', dataIndex: 'leaveDate', width: 100 },
		{ title: '减少原因', dataIndex: 'reduceReason', width: 100 },
		{ title: '创建人姓名', dataIndex: 'createName', width: 100 },
		{ title: '派单人所属部门', dataIndex: 'organName', width: 100 },
		{ title: '派单状态', dataIndex: 'status', width: 100 },
		{ title: '社保办理状态', dataIndex: 'socialHandleStatus', width: 100 },
		{ title: '养老办理状态', dataIndex: 'pensionHandle', width: 100 },
		{ title: '医疗办理状态', dataIndex: 'medicalHandle', width: 100 },
		{ title: '失业办理状态', dataIndex: 'unemployHandle', width: 100 },
		{ title: '工伤办理状态', dataIndex: 'workInjuryHandle', width: 100 },
		{ title: '生育办理状态', dataIndex: 'birthHandle', width: 100 },
		{ title: '大病办理状态', dataIndex: 'bigailmentHandle', width: 100 },
		{ title: '派单审核人', dataIndex: 'auditUser', width: 100 },
		{ title: '派单审核时间', dataIndex: 'auditTime', width: 100 },
		{ title: '社保办理备注', dataIndex: 'socialHandleRemark', width: 100 },
		{ title: '公积金办理备注', dataIndex: 'fundHandleRemark', width: 100 },
	],
	/**
	 * 社保导出花名册
	 */
	SOCIAL_CONDUCT_ROSTER: [
		{ title: '派单类型', dataIndex: 'type', width: 100 },
		{ title: '社保办理状态', dataIndex: 'socialHandleStatus', width: 100 },
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '员工类型', dataIndex: 'empType', width: 100 },
		{ title: '手机号码', dataIndex: 'empMobile', width: 100 },
		{ title: '项目名称', dataIndex: 'deptName', width: 100 },
		{ title: '项目编码', dataIndex: 'deptId', width: 100 },
		{ title: '身份证省', dataIndex: 'idProvince', width: 100 },
		{ title: '身份证市', dataIndex: 'idCity', width: 100 },
		{ title: '身份证县', dataIndex: 'idTown', width: 100 },
		{ title: '身份证所在地', dataIndex: 'address', width: 100 }, // 不知道要不要,mvp不存在这个字段
		{ title: '档案-省', dataIndex: 'fileProvince', width: 100 },
		{ title: '档案-市', dataIndex: 'fileCity', width: 100 },
		{ title: '档案-县', dataIndex: 'fileTown', width: 100 },
		{ title: '岗位', dataIndex: 'post', width: 100 },
		{ title: '试用期', dataIndex: 'tryPeriod', width: 100 },
		{ title: '工时制', dataIndex: 'workingSystem', width: 100 },
		{ title: '民族', dataIndex: 'empNational', width: 100 },
		{ title: '户口性质', dataIndex: 'empRegisType', width: 100 },
		{ title: '合同类型', dataIndex: 'contractName', width: 100 },
		{ title: '业务细分', dataIndex: 'contractSubName', width: 100 },
		{ title: '合同甲方', dataIndex: 'contractParty', width: 100 },
		{ title: '签订期限', dataIndex: 'contractType', width: 100 },
		{ title: '合同起始日期', dataIndex: 'contractStart', width: 100 },
		{ title: '合同截止日期', dataIndex: 'contractEnd', width: 100 },
		{ title: '合同期限', dataIndex: 'contractTerm', width: 100 }, // 需要合同那里带出计算，等待调试

		{ title: '学历', dataIndex: '', width: 100 },
		{ title: '备案基数', dataIndex: '', width: 100 }, // 社保状态和办理状态重复，去除
		{ title: '社保起缴日期', dataIndex: 'socialStartDate', width: 100 },
		{ title: '社保停缴日期', dataIndex: 'socialReduceDate', width: 100 },
		{ title: '单位社保小计', dataIndex: '', width: 100 },
		{ title: '个人社保小计', dataIndex: '', width: 100 },
		{ title: '总缴纳合计', dataIndex: '', width: 100 },
		{ title: '社保户', dataIndex: 'socialHousehold', width: 100 },
		// { title: '社保缴纳地-省', dataIndex: 'socialProvince', width: 100 }, // 暂不确定是整合还是拆分还是两者都要
		// { title: '社保缴纳地-市', dataIndex: 'socialCity', width: 100 },
		// { title: '社保缴纳地-县', dataIndex: 'socialTown', width: 100 },

		{ title: '养老起缴日期', dataIndex: '', width: 100 },
		{ title: '医疗起缴日期', dataIndex: '', width: 100 },
		{ title: '失业起缴日期', dataIndex: '', width: 100 },
		{ title: '工伤起缴日期', dataIndex: '', width: 100 },
		{ title: '生育起缴日期', dataIndex: '', width: 100 },
		{ title: '大病起缴日期', dataIndex: '', width: 100 },
		{ title: '缴纳类型', dataIndex: 'paymentType', width: 100 },

		{ title: '养老基数', dataIndex: '', width: 100 },
		{ title: '单位养老比例', dataIndex: 'unitPensionPer', width: 100 },
		{ title: '单位养老金额', dataIndex: 'unitPersionMoney', width: 100 },
		{ title: '个人养老比例', dataIndex: 'personalPensionPer', width: 100 },
		{ title: '个人养老金额', dataIndex: 'personalPersionMoney', width: 100 },
		{ title: '养老金额合计', dataIndex: '', width: 100 },

		{ title: '医疗基数', dataIndex: '', width: 100 },
		{ title: '单位医疗比例', dataIndex: 'unitMedicalPer', width: 100 },
		{ title: '单位医疗金额', dataIndex: 'unitMedicalMoney', width: 100 },
		{ title: '个人医疗比例', dataIndex: 'personalMedicalPer', width: 100 },
		{ title: '个人医疗金额', dataIndex: 'personalMedicalMoney', width: 100 },
		{ title: '医疗金额合计', dataIndex: '', width: 100 },
		{ title: '失业基数', dataIndex: '', width: 100 },
		{ title: '单位失业比例', dataIndex: 'unitUnemploymentPer', width: 100 },
		{ title: '单位失业金额', dataIndex: 'unitUnemploymentMoney', width: 100 },
		{ title: '个人失业比例', dataIndex: 'personalUnemploymentPer', width: 100 },
		{ title: '个人失业金额', dataIndex: 'personalUnemploymentMoney', width: 100 },
		{ title: '失业金额合计', dataIndex: '', width: 100 },

		{ title: '工伤基数', dataIndex: '', width: 100 },
		{ title: '单位工伤金额', dataIndex: 'unitInjuryMoney', width: 100 },

		{ title: '工伤金额合计', dataIndex: '', width: 100 },
		{ title: '生育基数', dataIndex: '', width: 100 },
		{ title: '单位生育比例', dataIndex: 'unitBigailmentMoney', width: 100 },
		{ title: '个人生育比例', dataIndex: 'personalBigailmentMoney', width: 100 },
		{ title: '单位生育金额', dataIndex: 'unitBigailmentMoney', width: 100 },
		{ title: '个人生育金额', dataIndex: 'personalBigailmentMoney', width: 100 },
		{ title: '生育金额合计', dataIndex: '', width: 100 },
		{ title: '大病基数', dataIndex: '', width: 100 },
		{ title: '单位大病比例', dataIndex: 'unitBigailmentMoney', width: 100 },
		{ title: '个人大病比例', dataIndex: 'personalBigailmentMoney', width: 100 },
		{ title: '单位大病金额', dataIndex: 'unitBigailmentMoney', width: 100 },
		{ title: '个人大病金额', dataIndex: 'personalBigailmentMoney', width: 100 },
		{ title: '大病金额合计', dataIndex: '', width: 100 },
		{ title: '委托备注', dataIndex: 'trustRemark', width: 100 },
	],

	/**
	 * 公积金导出变更花名册
	 */
	FUND_CONDUCT_CHANGE_ROSTER: [],

	/**
	 * 派单申请批量派增
	 */
	DISPATCH_BATCH_ADD_HEADER: [
		'员工姓名',
		'身份证号',
		'员工类型',
		'手机号码',
		'项目编码',
		'身份证省',
		'身份证市',
		'身份证县',
		'身份证所在地',
		'档案-省',
		'档案-市',
		'档案-县',
		'岗位',
		'班组',
		'试用期',
		'工时制',
		'民族',
		'户口性质',
		'合同类型',
		'业务细分',
		'签订期限',
		'合同起始时间',
		'合同到期时间',
		'合同期限',
		'学历',
		'备案基数',
		'社保户',
		'养老起缴日期',
		'医疗起缴日期',
		'失业起缴日期',
		'工伤起缴日期',
		'生育起缴日期',
		'大病起缴日期',
		'缴纳类型',
		'养老基数',
		'医疗基数',
		'失业基数',
		'工伤基数',
		'生育基数',
		'大病基数',
		'公积金户',
		'公积金起缴日期',
		'公积金基数',
		'公积金比例',
		'委托备注',
	],

	/**
	 * 派单申请批量派减
	 */
	DISPATCH_BATH_REDUCE_HEADER: ['项目编码', '员工姓名', '身份证号', '社保停缴日期', '公积金停缴日期', '离职日期', '减少原因', '委托备注'],
};