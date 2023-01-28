export default {
	/**
	 * 批量导出预估费用列表
	 */
	EXPORT_ESTIMATE_FEE_PARAMS: [
		// { title: '员工编码', dataIndex: 'empNo', width: 100 }, #bug 10652
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },

		{ title: '客户名称', dataIndex: 'unitName', width: 100 },
		{ title: '项目名称', dataIndex: 'deptName', width: 100 },
		{ title: '项目编码', dataIndex: 'deptNo', width: 100 },
		{ title: '单位养老费用', dataIndex: 'unitPensionFee', width: 100 },
		{ title: '单位医疗费用', dataIndex: 'unitMedicalFee', width: 100 },
		{ title: '单位失业费用', dataIndex: 'unitUnemploymentFee', width: 100 },
		{ title: '单位工伤费用', dataIndex: 'unitWorkInjuryFee', width: 100 },
		{ title: '单位生育费用', dataIndex: 'unitBirthFee', width: 100 },

		{ title: '单位大病救助', dataIndex: 'unitBitailmentFee', width: 100 },
		{ title: '个人养老费用', dataIndex: 'personalPensionFee', width: 100 },
		{ title: '个人医疗费用', dataIndex: 'personalMedicalFee', width: 100 },
		{ title: '个人失业费用', dataIndex: 'personalUnemploymentFee', width: 100 },
		{ title: '个人大病费用', dataIndex: 'personalBigailmentFee', width: 100 },
		{ title: '社保缴纳月份', dataIndex: 'socialPayMonth', width: 100 },
		{ title: '社保生成月份', dataIndex: 'socialCreateMonth', width: 100 },

		{ title: '公积金缴纳月份', dataIndex: 'providentPayMonth', width: 100 },
		{ title: '公积金生成月份', dataIndex: 'providentCreateMonth', width: 100 },
		{ title: '单位社保合计', dataIndex: 'unitSocialSum', width: 100 },
		{ title: '单位公积金合计', dataIndex: 'unitFundSum', width: 100 },
		{ title: '个人社保合计', dataIndex: 'personalSocialSum', width: 100 },
		{ title: '个人公积金合计', dataIndex: 'personalFundSum', width: 100 },
		{ title: '费用合计', dataIndex: 'sumAll', width: 100 },
		{ title: '公积金缴纳地-省', dataIndex: 'fundProvince', width: 100 },
		{ title: '公积金缴纳地-市', dataIndex: 'fundCity', width: 100 },
		{ title: '公积金缴纳地-县', dataIndex: 'fundTown', width: 100 },
		{ title: '社保缴纳地-省', dataIndex: 'socialProvince', width: 100 },
		{ title: '社保缴纳地-市', dataIndex: 'socialCity', width: 100 },
		{ title: '社保缴纳地-县', dataIndex: 'socialTown', width: 100 },
		{ title: '单位养老基数', dataIndex: 'unitPensionBase', width: 100 },
		{ title: '单位医疗基数', dataIndex: 'unitMedicalBase', width: 100 },
		{ title: '单位失业基数', dataIndex: 'unitUnemploymentBase', width: 100 },
		{ title: '单位工伤基数', dataIndex: 'unitInjuryBase', width: 100 },
		{ title: '单位生育基数', dataIndex: 'unitBirthBase', width: 100 },
		{ title: '个人养老基数', dataIndex: 'personalPensionBase', width: 100 },
		{ title: '个人医疗基数', dataIndex: 'personalMedicalBase', width: 100 },
		{ title: '个人失业基数', dataIndex: 'personalUnemploymentBase', width: 100 },
		{ title: '个人大病缴纳基数', dataIndex: 'personalBigailmentBase', width: 100 },
		{ title: '单位大病缴纳基数', dataIndex: 'unitBigailmentBase', width: 100 },

		{ title: '单位养老比例', dataIndex: 'unitPersionPro', width: 100 },
		{ title: '单位医疗比例', dataIndex: 'unitMedicalPro', width: 100 },
		{ title: '单位失业比例', dataIndex: 'unitUnemploymentPro', width: 100 },
		{ title: '单位工伤比例', dataIndex: 'unitInjuryPro', width: 100 },
		{ title: '单位生育比例', dataIndex: 'unitBirthPro', width: 100 },

		{ title: '个人养老比例', dataIndex: 'personalPersionPro', width: 100 },
		{ title: '个人医疗比例', dataIndex: 'personalMedicalPro', width: 100 },
		{ title: '个人失业比例', dataIndex: 'personalUnemploymentPro', width: 100 },
		{ title: '个人大病比例', dataIndex: 'personalBigailmentPro', width: 100 },
		{ title: '单位大病比例', dataIndex: 'unitBigailmentPro', width: 100 },
		{ title: '单位公积金基数', dataIndex: 'unitFundBase', width: 100 },

		{ title: '个人公积金基数', dataIndex: 'personalFundBase', width: 100 },
		{ title: '单位公积金比例', dataIndex: 'unitFundProp', width: 100 },
		{ title: '个人公积金比例', dataIndex: 'personalFundProp', width: 100 },

		{ title: '同步状态', dataIndex: 'dataPush', width: 100 },
		{ title: '数据生成时间', dataIndex: 'createTime', width: 100 },
		{ title: '数据类型', dataIndex: 'diffType', width: 100 },
	],

	/**
	 * 批量导出实缴费用列表
	 *
	 */
	EXPORT_PAID_FEE_PARAMS: [
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '员工编码', dataIndex: 'empNo', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '客户名称', dataIndex: 'unitName', width: 100 },
		{ title: '项目名称', dataIndex: 'settleDomainName', width: 100 },
		{ title: '就职班组', dataIndex: 'inauguralTeam', width: 100 },
		{ title: '社保户', dataIndex: 'socialHousehold', width: 100 },
		{ title: '社保编号', dataIndex: 'socialSecurityNo', width: 100 },
		{ title: '社保缴纳地', dataIndex: 'socialPayAddr', width: 100 },
		// { title: '社保缴纳地-省', dataIndex: 'socialProvince', width: 100 },
		// { title: '社保缴纳地-市', dataIndex: 'socialCity', width: 100 },
		// { title: '社保缴纳地-县', dataIndex: 'socialTown', width: 100 },
		{ title: '社保缴纳月份', dataIndex: 'socialPayMonth', width: 100 },
		{ title: '社保生成月份', dataIndex: 'socialCreateMonth', width: 100 },
		{ title: '单位养老基数', dataIndex: 'unitPensionSet', width: 100 },
		{ title: '单位医疗基数', dataIndex: 'unitMedicalSet', width: 100 },
		{ title: '单位失业基数', dataIndex: 'unitUnemploymentSet', width: 100 },
		{ title: '单位工伤基数', dataIndex: 'unitInjurySet', width: 100 },
		{ title: '单位生育基数', dataIndex: 'unitBirthSet', width: 100 },
		{ title: '单位养老缴费', dataIndex: 'unitPensionMoney', width: 100 },
		{ title: '单位医疗缴费', dataIndex: 'unitMedicalMoney', width: 100 },
		{ title: '单位失业缴费', dataIndex: 'unitUnemploymentMoney', width: 100 },
		{ title: '单位工伤缴费', dataIndex: 'unitInjuryMoney', width: 100 },
		{ title: '单位生育缴费', dataIndex: 'unitBirthMoney', width: 100 },
		{ title: '单位大病缴费', dataIndex: 'unitBigmailmentMoney', width: 100 },
		{ title: '个人养老缴费', dataIndex: 'personalPensionMoney', width: 100 },
		{ title: '个人医疗缴费', dataIndex: 'personalMedicalMoney', width: 100 },
		{ title: '个人失业缴费', dataIndex: 'personalUnemploymentMoney', width: 100 },
		{ title: '个人大病缴费', dataIndex: 'personalBigmailmentMoney', width: 100 },
		{ title: '社保合计', dataIndex: 'socialSum', width: 100 },
		{ title: '单位社保合计', dataIndex: 'unitSocialSum', width: 100 },
		{ title: '个人社保合计', dataIndex: 'socialSecurityPersonalSum', width: 100 },
		{ title: '单位社保补缴利息', dataIndex: 'companyAccrual', width: 100 },
		{ title: '个人社保补缴利息', dataIndex: 'personalAccrual', width: 100 },
		{ title: '公积金缴纳月份', dataIndex: 'providentPayMonth', width: 100 },
		{ title: '公积金生成月份', dataIndex: 'providentCreateMonth', width: 100 },
		{ title: '公积金户', dataIndex: 'providentHousehold', width: 100 },
		{ title: '公积金缴纳地', dataIndex: 'providentPayAddr', width: 100 },
		// { title: '公积金缴纳地-省', dataIndex: 'fundProvince', width: 100 },
		// { title: '公积金缴纳地-市', dataIndex: 'fundCity', width: 100 },
		// { title: '公积金缴纳地-县', dataIndex: 'fundTown', width: 100 },
		{ title: '公积金编号', dataIndex: 'providentNo', width: 100 },
		{ title: '单位公积金基数', dataIndex: 'unitProvidentSet', width: 100 },
		{ title: '单位公积金比例', dataIndex: 'providentPercent', width: 100 },
		{ title: '单位公积金缴费', dataIndex: 'unitProvidentSum', width: 100 },
		{ title: '个人公积金基数', dataIndex: 'personalProidentSet', width: 100 },
		{ title: '个人公积金缴费', dataIndex: 'personalProvidentSum', width: 100 },
		{ title: '公积金总合计', dataIndex: 'providentSum', width: 100 },
		{ title: '费用合计', dataIndex: 'sumAll', width: 100 },
		
		{ title: '导入人', dataIndex: 'createName', width: 100 },
		{ title: '导入时间', dataIndex: 'createTime', width: 100 },
		{ title: '打标状态', dataIndex: 'lockStatus', width: 100 },
		{ title: '推送状态', dataIndex: 'pushStatus', width: 100 },
	],
	// 合并导出
	EXPORT_PAID_FEE_PARAMS_MERGE: [
		{ title: '员工姓名', dataIndex: 'empName', width: 100 },
		{ title: '员工编码', dataIndex: 'empNo', width: 100 },
		{ title: '身份证号', dataIndex: 'empIdcard', width: 100 },
		{ title: '客户名称', dataIndex: 'unitName', width: 100 },
		{ title: '项目名称', dataIndex: 'settleDomainName', width: 100 },
		{ title: '项目编码', dataIndex: 'settleDomainCode', width: 100 },
		{ title: '就职班组', dataIndex: 'inauguralTeam', width: 100 },
		{ title: '社保户', dataIndex: 'socialHousehold', width: 100 },
		{ title: '社保编号', dataIndex: 'socialSecurityNo', width: 100 },
		{ title: '社保缴纳地', dataIndex: 'socialPayAddr', width: 100 },
		// { title: '社保缴纳地-省', dataIndex: 'socialProvince', width: 100 },
		// { title: '社保缴纳地-市', dataIndex: 'socialCity', width: 100 },
		// { title: '社保缴纳地-县', dataIndex: 'socialTown', width: 100 },
		{ title: '社保缴纳月份', dataIndex: 'socialPayMonth', width: 100 },
		{ title: '社保生成月份', dataIndex: 'socialCreateMonth', width: 100 },
		{ title: '单位养老基数', dataIndex: 'unitPensionSet', width: 100 },
		{ title: '单位医疗基数', dataIndex: 'unitMedicalSet', width: 100 },
		{ title: '单位失业基数', dataIndex: 'unitUnemploymentSet', width: 100 },
		{ title: '单位工伤基数', dataIndex: 'unitInjurySet', width: 100 },
		{ title: '单位生育基数', dataIndex: 'unitBirthSet', width: 100 },
		{ title: '单位养老金额', dataIndex: 'unitPensionMoney', width: 100 },
		{ title: '单位医疗金额', dataIndex: 'unitMedicalMoney', width: 100 },
		{ title: '单位失业金额', dataIndex: 'unitUnemploymentMoney', width: 100 },
		{ title: '单位工伤金额', dataIndex: 'unitInjuryMoney', width: 100 },
		{ title: '单位生育金额', dataIndex: 'unitBirthMoney', width: 100 },
		{ title: '单位大病金额', dataIndex: 'unitBigmailmentMoney', width: 100 },
		{ title: '个人养老金额', dataIndex: 'personalPensionMoney', width: 100 },
		{ title: '个人医疗金额', dataIndex: 'personalMedicalMoney', width: 100 },
		{ title: '个人失业金额', dataIndex: 'personalUnemploymentMoney', width: 100 },
		{ title: '个人大病金额', dataIndex: 'personalBigmailmentMoney', width: 100 },
		{ title: '社保合计', dataIndex: 'socialSum', width: 100 },
		{ title: '单位社保合计', dataIndex: 'unitSocialSum', width: 100 },
		{ title: '个人社保合计', dataIndex: 'socialSecurityPersonalSum', width: 100 },
		{ title: '单位社保补缴利息', dataIndex: 'companyAccrual', width: 100 },
		{ title: '个人社保补缴利息', dataIndex: 'personalAccrual', width: 100 },
		{ title: '公积金缴纳月份', dataIndex: 'providentPayMonth', width: 100 },
		{ title: '公积金生成月份', dataIndex: 'providentCreateMonth', width: 100 },
		{ title: '公积金户', dataIndex: 'providentHousehold', width: 100 },
		{ title: '公积金缴纳地', dataIndex: 'providentPayAddr', width: 100 },
		// { title: '公积金缴纳地-省', dataIndex: 'fundProvince', width: 100 },
		// { title: '公积金缴纳地-市', dataIndex: 'fundCity', width: 100 },
		// { title: '公积金缴纳地-县', dataIndex: 'fundTown', width: 100 },
		{ title: '公积金编号', dataIndex: 'providentNo', width: 100 },
		{ title: '单位公积金基数', dataIndex: 'unitProvidentSet', width: 100 },
		{ title: '单位公积金比例', dataIndex: 'providentPercent', width: 100 },
		{ title: '单位公积金费用', dataIndex: 'unitProvidentSum', width: 100 },
		{ title: '个人公积金基数', dataIndex: 'personalProidentSet', width: 100 },
		{ title: '个人公积金费用', dataIndex: 'personalProvidentSum', width: 100 },
		{ title: '公积金总合计', dataIndex: 'providentSum', width: 100 },
		{ title: '总合计', dataIndex: 'sumAll', width: 100 },
		{ title: '社保创建人姓名', dataIndex: 'socialCreateName', width: 100 },
		{ title: '社保创建时间', dataIndex: 'socialCreateTime', width: 100 },
		{ title: '公积金创建人姓名', dataIndex: 'fundCreateName', width: 100 },
		{ title: '公积金创建时间', dataIndex: 'fundCreateTime', width: 100 },
	],

	/**
	 * 实缴库-批量导入社保模块合并版
	 */
	EXPORT_PAID_SOCIAL_HEADER: [
		'社保缴纳地',
		'员工姓名',
		'身份证号',
		'社保编号',
		'社保缴纳月份',
		'社保生成月份',
		'养老基数',
		'养老单位缴费',
		'养老个人缴费',
		'个人补缴利息',
		'单位补缴利息',
		'失业基数',
		'失业单位缴费',
		'失业个人缴费',
		'医保基数',
		'医保单位缴费',
		'医保个人缴费',
		'单位医疗救助金',
		'工伤基数',
		'工伤缴费',
		'生育基数',
		'生育缴费',
		'个人医疗救助金',
		'总金额',
	],

	/**
	 * 养老其他三险
	 */
	EXPORT_PAID_OTHER_HEADER: [
		'社保缴纳地',
		'员工姓名',
		'身份证号',
		'社保缴纳月份',
		'社保生成月份',
		'参保险种',
		'个人缴费基数',
		'单位缴费基数',
		'单位缴费额',
		'个人缴费额',
	],

	/**
	 * 医保模板
	 */
	EXPORT_PAID_MEDIAL_HEADER: [
		'社保缴纳地',
		'员工姓名',
		'身份证号',
		'社保缴纳月份',
		'社保生成月份',
		'医保基数',
		'医保单位缴费',
		'医保个人缴费',
		'单位医疗救助金',
		'个人医疗救助金',
		'社保编号',
	],
	/**
	 * 公积金模板
	 */
	EXPORT_PAID_FUND_HEADER: [
		'公积金缴纳地',
		'员工姓名',
		'身份证号',
		'公积金缴纳月份',
		'公积金生成月份',
		'公积金单边金额',
		'公积金单边基数',
		'公积金单边比例',
		'公积金编号',
	],

	/**
	 * 实缴费用导出反馈
	 */
	EXPORT_PAID_SOCIAL_FEEDBACK_HEADER: [
		{ header: '行号', key: 'line', width: 15 },
		{ header: '是否异常', key: 'isError', width: 15 },
		{ header: '员工姓名', key: 'empName', width: 15 },
		{ header: '身份证号', key: 'empIdCard', width: 20 },
		{ header: '社保户', key: 'socialHousehold', width: 30 },
		{ header: '公积金户', key: 'providentHousehold', width: 30 },
		{ header: '反馈信息', key: 'error', width: 50 },
	]
	 
};
