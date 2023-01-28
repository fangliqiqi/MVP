import { hide } from '@popperjs/core';
import {EMPTY_PLACEHOLDER} from '/@/utils/utils';
export default {
	/**
	 * 预派单数据编辑和详情页面
	 */
	PREORDER_HEADER: {
		'基本信息':[
			{label:'ID',key:'id',show:'hide'},
			{label: '日期', key: 'date',type:'date',show:'all'},
			{label: '接单分公司', key: 'company',maxLength:50,tooltip:'6',show:'all',disabled:true}, //maxLength 字数限制50 没有特殊要求就是20
			{label: '缴费地',prop:'payAddress', key: 'payAddress',tooltip:'6',show:'all'},
			{label: '客户名称', key: 'customerName',maxLength:50,tooltip:'6',show:'all'},
			{label: '员工姓名',prop:'empName', key: 'empName',tooltip:'6',show:'all'},
			{label: '身份证号',prop:'empIdcard', key: 'empIdcard',show:'all',maxLength:20},

			{label: '离职日期',prop:'', key: 'leaveDate',type:'date',show:'minus',date:'YYYY-MM-DD'}, //minus派减的时候显示 add派增的时候显示
			{label: '离职原因',prop:'leaveReason',type:'textarea', key: 'leaveReason',show:'minus',tooltip:'24',maxLength:200,span:24},

			{label: '联系电话1',prop:'', key: 'telOne',maxLength:11,show:'all'},
			{label: '联系电话2',prop:'telTwo', key: 'telTwo',maxLength:11,show:'all'},
			{label: '入职时间',prop:'', key: 'entryDate',type:'date',show:'add',date:'YYYY-MM-DD'},
			{label: '正式工资',prop:'', key: 'formalSalary',show:'add'},
			{label: '派遣开始日期',prop:'', key: 'dispatchStart',type:'date',show:'add'},
			{label: '派遣结束日期',prop:'', key: 'dispatchEnd',type:'date',show:'add'},
			{label: '合同开始日期',prop:'', key: 'contractStart',type:'date',show:'add'},
			{label: '合同终止日期',prop:'', key: 'contractEnd',type:'date',show:'add'},
			{label: '试用开始日期',prop:'', key: 'trialStart',type:'date',show:'add'},
			{label: '试用结束日期',prop:'', key: 'trialEnd',type:'date',show:'add'},
			{label: '试用期工资',prop:'', key: 'trialSalary',show:'add',maxLength:20},
			{label: '工作制',prop:'', key: 'workingSystem',show:'add'},
			{label: '合同版本',prop:'', key: 'contractVersion',show:'add'},
			{label: '是否电话通知',prop:'', key: 'telNotice',type:'select',options:['是','否'],show:'add'},// 下拉框
			{label: '实际工作地',prop:'', key: 'workingAddress',show:'add',tooltip:'6'},

			{label: '备注说明1',prop:'', key: 'remarkOne',span:24,maxLength:200,type:'textarea',tooltip:'24',show:'all'},

			{label: '备注说明2',prop:'', key: 'remarkTwo',span:24,maxLength:200,type:'textarea',show:'add',tooltip:'24'},
			{label: '养老城市',prop:'', key: 'pensionAddress',show:'add',tooltip:'6'},
			{label: '养老基数',prop:'pensionBase', key: 'pensionBase',show:'add',},
			{label: '养老起缴月',prop:'', key: 'pensionStart',show:'add',type:'month'},
			{label: '医疗城市',prop:'', key: 'medicalAddress',show:'add',tooltip:'6'},
			{label: '医疗基数',prop:'medicalBase', key: 'medicalBase',show:'add',},
			{label: '医疗起缴月',prop:'', key: 'medicalStart',show:'add',type:'month'},
			{label: '工伤城市',prop:'', key: 'injuryAddress',show:'add',tooltip:'6'},
			{label: '工伤基数',prop:'injuryBase', key: 'injuryBase',show:'add',},
			{label: '工伤起缴月',prop:'', key: 'injuryStart',show:'add',type:'month'},
			{label: '生育城市',prop:'', key: 'birthAddress',show:'add',tooltip:'6'},
			{label: '生育基数',prop:'birthBase', key: 'birthBase',show:'add',},
			{label: '生育起缴月',prop:'', key: 'birthStart',show:'add',type:'month'},
			{label: '失业城市',prop:'', key: 'unemploymentAddress',show:'add',tooltip:'6'},
			{label: '失业基数',prop:'unemploymentBase', key: 'unemploymentBase',show:'add',},
			{label: '失业起缴月',prop:'', key: 'unemploymentStart',show:'add',type:'month'},
			{label: '公积金城市',prop:'', key: 'fundAddress',show:'add',tooltip:'6'},
			{label: '公积金基数',prop:'fundBase', key: 'fundBase',show:'add',},
			{label: '公积金个人比例',prop:'fundPersonalPer', key: 'fundPersonalPer',show:'add',type:'unit-input'},
			{label: '公积金企业比例',prop:'fundCompanyPer', key: 'fundCompanyPer',show:'add',type:'unit-input'},
			{label: '公积金起缴月',prop:'', key: 'fundStart',type:'month',show:'add'},

			{label: '养老截止城市',prop:'', key: 'pensionAddressReduce',show:'minus',tooltip:'6'},
			{label: '养老截止时间',prop:'', key: 'pensionEndReduce',type:'month',show:'minus',},
			{label: '医疗截止城市',prop:'', key: 'medicalAddressReduce',show:'minus',tooltip:'6'},
			{label: '医疗截止时间',prop:'', key: 'medicalEndReduce',type:'month',show:'minus',},
			{label: '工伤截止城市',prop:'', key: 'injuryAddressReduce',show:'minus',tooltip:'6'},
			{label: '工伤截止时间',prop:'', key: 'injuryEndReduce',type:'month',show:'minus',},
			{label: '生育截止城市',prop:'', key: 'birthAddressReduce',show:'minus',tooltip:'6'},
			{label: '生育截止时间',prop:'', key: 'birthEndReduce',type:'month',show:'minus',},
			{label: '失业截止城市',prop:'', key: 'unemploymentAddressReduce',show:'minus',tooltip:'6'},
			{label: '失业截止时间',prop:'', key: 'unemploymentEndReduce',type:'month',show:'minus',},
			{label: '公积金截止城市',prop:'', key: 'fundAddressReduce',show:'minus',tooltip:'6'},
			{label: '公积金截止时间',prop:'', key: 'fundEndReduce',type:'month',show:'minus',},

			{label: '派单分公司',prop:'', key: 'dispatchCompany',tooltip:'6',show:'all'},
			{label: '派单客服',prop:'', key: 'customerService',show:'all'},
			{label: '小合同名称',prop:'', key: 'contractMinorName',tooltip:'6',show:'all'},
			{label: '唯一号',prop:'', key: 'uniqueNumber',show:'add'},
			{label: '合同类型',prop:'', key: 'contractType',show:'all'},
			{label: '客户编号',prop:'', key: 'customerNumber',show:'add'},
			{label: '服务类别',prop:'', key: 'serviceType',show:'add'},

			{label: '导入时间',prop:'', key: 'createTime',show:'hide'},
			{label: '导入人',prop:'', key: 'createName',show:'hide'},
			{label: '资料是否提交',prop:'', key: 'dataSubStatus',dict:'data_submit_status',show:'add'},
			{label: '单据类型',prop:'', key: 'type',dict:'send_order_type',show:'hide'},
			{label: '单据状态',prop:'', key: 'preStatus',dict:'pre_send_status',show:'hide'},
			{label: '备注',prop:'', key: 'remark',type:'textarea',span:24,maxLength:200,tooltip:'24',show:'all'},
			{label: '取消原因',prop:'', key: 'cancelRemark',span:24,tooltip:'24',show:'hide'},
		],
		'合同信息':[
			{label: '合同类型', key: 'contractTypeAdd',dict:'employee_contract_type',show:'all'},
			{label: '合同名称', key: 'contractNameAdd',tooltip:'6',show:'all'},
			{label: '合同期限', key: 'contractTermAdd',maxLength:1,prop:'contractTermAdd',show:'all'},
			{label: '合同开始日期', key: 'contractStartAdd',type:'date',show:'all'},
			{label: '合同截止日期', key: 'contractEndAdd',type:'date',show:'all'},
		]
	},
	/**
	 * 预派单查询详情页面
	 */
	PREORDER_HEADER_QUERY: {
		'基本信息':[
			{label:'ID',key:'id',show:'hide'},
			{label: '日期', key: 'date',type:'date',show:'all'},
			{label: '接单分公司', key: 'company',maxLength:50,tooltip:'6',show:'all'}, //maxLength 字数限制50 没有特殊要求就是20
			{label: '缴费地',prop:'payAddress', key: 'payAddress',tooltip:'6',show:'all'},
			{label: '单位名称', key: 'customerName',maxLength:50,tooltip:'6',show:'all'},
			{label: '员工姓名',prop:'empName', key: 'empName',tooltip:'6',show:'all'},
			{label: '身份证号',prop:'empIdcard', key: 'empIdcard',show:'all',maxLength:20},

			{label: '离职日期',prop:'', key: 'leaveDate',type:'date',show:'minus',date:'YYYY-MM-DD'}, //minus派减的时候显示 add派增的时候显示
			{label: '离职原因',prop:'leaveReason',type:'textarea', key: 'leaveReason',show:'minus',tooltip:'24',maxLength:250,span:24},

			{label: '联系电话1',prop:'', key: 'telOne',maxLength:11,show:'all'},
			{label: '联系电话2',prop:'telTwo', key: 'telTwo',maxLength:11,show:'all'},
			{label: '入职时间',prop:'', key: 'entryDate',type:'date',show:'add',date:'YYYY-MM-DD'},
			{label: '正式工资',prop:'', key: 'formalSalary',show:'add'},
			{label: '派遣开始日期',prop:'', key: 'dispatchStart',type:'date',show:'add'},
			{label: '派遣结束日期',prop:'', key: 'dispatchEnd',type:'date',show:'add'},
			{label: '合同开始日期',prop:'', key: 'contractStart',type:'date',show:'add'},
			{label: '合同终止日期',prop:'', key: 'contractEnd',type:'date',show:'add'},
			{label: '试用开始日期',prop:'', key: 'trialStart',type:'date',show:'add'},
			{label: '试用结束日期',prop:'', key: 'trialEnd',type:'date',show:'add'},
			{label: '试用期工资',prop:'', key: 'trialSalary',show:'add',maxLength:20},
			{label: '工作制',prop:'', key: 'workingSystem',show:'add'},
			{label: '合同版本',prop:'', key: 'contractVersion',show:'add'},
			{label: '是否电话通知',prop:'', key: 'telNotice',type:'select',options:['是','否'],show:'add'},// 下拉框
			{label: '实际工作地',prop:'', key: 'workingAddress',show:'add',tooltip:'6'},

			{label: '备注说明1',prop:'', key: 'remarkOne',span:24,maxLength:250,type:'textarea',tooltip:'24',show:'all'},

			{label: '备注说明2',prop:'', key: 'remarkTwo',span:24,maxLength:250,type:'textarea',show:'add',tooltip:'24'},
			{label: '养老城市',prop:'', key: 'pensionAddress',show:'add',tooltip:'6'},
			{label: '养老基数',prop:'pensionBase', key: 'pensionBase',show:'add',},
			{label: '养老起缴月',prop:'', key: 'pensionStart',show:'add',type:'month'},
			{label: '医疗城市',prop:'', key: 'medicalAddress',show:'add',tooltip:'6'},
			{label: '医疗基数',prop:'medicalBase', key: 'medicalBase',show:'add',},
			{label: '医疗起缴月',prop:'', key: 'medicalStart',show:'add',type:'month'},
			{label: '工伤城市',prop:'', key: 'injuryAddress',show:'add',tooltip:'6'},
			{label: '工伤基数',prop:'injuryBase', key: 'injuryBase',show:'add',},
			{label: '工伤起缴月',prop:'', key: 'injuryStart',show:'add',type:'month'},
			{label: '生育城市',prop:'', key: 'birthAddress',show:'add',tooltip:'6'},
			{label: '生育基数',prop:'birthBase', key: 'birthBase',show:'add',},
			{label: '生育起缴月',prop:'', key: 'birthStart',show:'add',type:'month'},
			{label: '失业城市',prop:'', key: 'unemploymentAddress',show:'add',tooltip:'6'},
			{label: '失业基数',prop:'unemploymentBase', key: 'unemploymentBase',show:'add',},
			{label: '失业起缴月',prop:'', key: 'unemploymentStart',show:'add',type:'month'},
			{label: '公积金城市',prop:'', key: 'fundAddress',show:'add',tooltip:'6'},
			{label: '公积金基数',prop:'fundBase', key: 'fundBase',show:'add',},
			{label: '公积金个人比例',prop:'fundPersonalPer', key: 'fundPersonalPer',show:'add',type:'unit-input'},
			{label: '公积金企业比例',prop:'fundCompanyPer', key: 'fundCompanyPer',show:'add',type:'unit-input'},
			{label: '公积金起缴月',prop:'', key: 'fundStart',type:'month',show:'add'},

			{label: '养老截止城市',prop:'', key: 'pensionAddressReduce',show:'minus',tooltip:'6'},
			{label: '养老截止时间',prop:'', key: 'pensionEndReduce',type:'month',show:'minus',},
			{label: '医疗截止城市',prop:'', key: 'medicalAddressReduce',show:'minus',tooltip:'6'},
			{label: '医疗截止时间',prop:'', key: 'medicalEndReduce',type:'month',show:'minus',},
			{label: '工伤截止城市',prop:'', key: 'injuryAddressReduce',show:'minus',tooltip:'6'},
			{label: '工伤截止时间',prop:'', key: 'injuryEndReduce',type:'month',show:'minus',},
			{label: '生育截止城市',prop:'', key: 'birthAddressReduce',show:'minus',tooltip:'6'},
			{label: '生育截止时间',prop:'', key: 'birthEndReduce',type:'month',show:'minus',},
			{label: '失业截止城市',prop:'', key: 'unemploymentAddressReduce',show:'minus',tooltip:'6'},
			{label: '失业截止时间',prop:'', key: 'unemploymentEndReduce',type:'month',show:'minus',},
			{label: '公积金截止城市',prop:'', key: 'fundAddressReduce',show:'minus',tooltip:'6'},
			{label: '公积金截止时间',prop:'', key: 'fundEndReduce',type:'month',show:'minus',},

			{label: '派单分公司',prop:'', key: 'dispatchCompany',tooltip:'6',show:'all'},
			{label: '派单客服',prop:'', key: 'customerService',show:'all'},
			{label: '小合同名称',prop:'', key: 'contractMinorName',tooltip:'6',show:'all'},
			{label: '唯一号',prop:'', key: 'uniqueNumber',show:'add'},
			{label: '合同类型',prop:'', key: 'contractType',show:'all'},
			{label: '客户编号',prop:'', key: 'customerNumber',show:'add'},
			{label: '服务类别',prop:'', key: 'serviceType',show:'add'},

			{label: '导入时间',prop:'', key: 'createTime',show:'hide'},
			{label: '导入人',prop:'', key: 'createName',show:'hide'},
			{label: '资料是否提交',prop:'', key: 'dataSubStatus',dict:'data_submit_status',show:'add'},
			{label: '单据类型',prop:'', key: 'type',dict:'send_order_type',show:'hide'},
			{label: '单据状态',prop:'', key: 'preStatus',dict:'pre_send_status',show:'hide'},
			{label: '备注',prop:'', key: 'remark',type:'textarea',span:24,maxLength:250,tooltip:'24',show:'all'},
			{label: '取消原因',prop:'', key: 'cancelRemark',span:24,tooltip:'24',show:'hide'},
		],
		'合同信息':[
			{label: '合同类型', key: 'contractTypeAdd',dict:'employee_contract_type',show:'all'},
			{label: '合同名称', key: 'contractNameAdd',tooltip:'6',show:'all'},
			{label: '合同期限', key: 'contractTermAdd',maxLength:1,prop:'contractTermAdd',show:'all'},
			{label: '合同开始日期', key: 'contractStartAdd',type:'date',show:'all'},
			{label: '合同截止日期', key: 'contractEndAdd',type:'date',show:'all'},
		]
	},

	/**
	 * 预派单批量派增头部
	 */
	PREORDER_HEADER_ADD: [
		'日期','接单分公司','缴费地','客户名称','员工姓名','身份证号','联系电话1','联系电话2','入职日期','正式工资',
		'派遣开始日期','派遣结束日期','合同开始日期','合同终止日期','试用开始日期','试用结束日期','试用期工资','工作制','合同版本','是否电话通知',
		'实际工作地','备注说明1','备注说明2','养老城市','养老基数','养老起缴月','医疗城市','医疗基数','医疗起缴月','工伤城市',
		'工伤基数','工伤起缴月','生育城市','生育基数','生育起缴月','失业城市','失业基数','失业起缴月','公积金城市','公积金基数',
		'公积金个人比例','公积金企业比例','公积金起缴月','派单分公司','派单客服','小合同名称','唯一号','客户编号','服务类别','备注'
	],

	/*
	*预派单批量减少头部
	*/
	PREORDER_HEADER_MINUS:[
		'日期','接单分公司','缴费地','客户名称','员工姓名','身份证号','离职日期','离职原因','联系电话1','联系电话2',
		'备注说明1','养老城市','养老时间','医疗城市','医疗时间','工伤城市','工伤时间','生育城市','生育时间','失业城市',
		'失业时间','公积金城市','公积金时间','派单分公司','派单客服','小合同名称','合同类型','备注',
	],

	/**
 	* 预派单批量更新头部
	*/
	PREORDER_HEADER_UPDATE: [
		'主键', '派单类型', '日期', '接单分公司', '缴费地', '客户名称', '身份证号', '员工姓名', '联系电话1', '联系电话2', 
		'入职日期', '正式工资', '派遣开始日期', '派遣结束日期', '合同开始日期', '合同终止日期', '试用开始日期', '试用结束日期', '试用期工资', '工作制', 
		'合同版本', '是否电话通知', '实际工作地', '备注说明1', '备注说明2', '养老城市', '养老基数', '养老起缴月', '医疗城市', '医疗基数',
		'医疗起缴月', '工伤城市', '工伤基数', '工伤起缴月', '生育城市', '生育基数', '生育起缴月', '失业城市', '失业基数', '失业起缴月', 
		'公积金城市', '公积金基数', '公积金起缴月', '公积金个人比例', '公积金企业比例', '派单分公司', '派单客服', '小合同名称', '唯一号', '客户编号',
		'服务类别', '养老截止城市', '养老截止时间', '医疗截止城市', '医疗截止时间', '工伤截止城市', '工伤截止时间', '生育截止城市', '生育截止时间', 
		'失业截止城市', '失业截止时间', '公积金截止城市', '公积金截止时间', '离职日期', '离职原因', '合同类型', '所属单位名称', '所属结算主体名称', 
		'备案基数', '派单状态', '异常内容', '派单日期限制', '资料是否提交', '派单合同名称', '创建时间', '备注', '是否派单', '取消原因'
	],

	// 预派单 导出
	PREORDER_HEADER_EXPORT: [
		{ title: '员工姓名', dataIndex: 'empName', width: 120 },
		{ title: '联系电话1', dataIndex: 'telOne', width: 120 },
		{ title: '联系电话2', dataIndex: 'telTwo', width: 120 },
		{ title: '入职日期', dataIndex: 'entryDate', width: 120 },
		{ title: '正式工资', dataIndex: 'formalSalary', width: 120 },
		{ title: '派遣开始日期', dataIndex: 'dispatchStart', width: 120 },
		{ title: '派遣结束日期', dataIndex: 'dispatchEnd', width: 120 },
		{ title: '合同开始日期', dataIndex: 'contractStart', width: 120 },
		{ title: '合同终止日期', dataIndex: 'contractEnd', width: 120 },
		{ title: '试用开始日期', dataIndex: 'trialStart', width: 120 },
		{ title: '试用结束日期', dataIndex: 'trialEnd', width: 120 },
		{ title: '试用期工资', dataIndex: 'trialSalary', width: 120 },
		{ title: '工作制', dataIndex: 'workingSystem', width: 120 },
		{ title: '合同版本', dataIndex: 'contractVersion', width: 120 },
		{ title: '是否电话通知', dataIndex: 'telNotice', width: 120 },
		{ title: '实际工作地', dataIndex: 'workingAddress', width: 120 },
		{ title: '备注说明1', dataIndex: 'remarkOne', width: 120 },
		{ title: '备注说明2', dataIndex: 'remarkTwo', width: 120 },
		{ title: '养老城市', dataIndex: 'pensionAddress', width: 120 },
		{ title: '养老基数', dataIndex: 'pensionBase', width: 120 },
		{ title: '养老起缴月', dataIndex: 'pensionStart', width: 120 },
		{ title: '医疗城市', dataIndex: 'medicalAddress', width: 120 },
		{ title: '医疗基数', dataIndex: 'medicalBase', width: 120 },
		{ title: '医疗起缴月', dataIndex: 'medicalStart', width: 120 },
		{ title: '工伤城市', dataIndex: 'injuryAddress', width: 120 },
		{ title: '工伤基数', dataIndex: 'injuryBase', width: 120 },
		{ title: '工伤起缴月', dataIndex: 'injuryStart', width: 120 },
		{ title: '生育城市', dataIndex: 'birthAddress', width: 120 },
		{ title: '生育基数', dataIndex: 'birthBase', width: 120 },
		{ title: '生育起缴月', dataIndex: 'birthStart', width: 120 },
		{ title: '失业城市', dataIndex: 'unemploymentAddress', width: 120 },
		{ title: '失业基数', dataIndex: 'unemploymentBase', width: 120 },
		{ title: '失业起缴月', dataIndex: 'unemploymentStart', width: 120 },
		{ title: '公积金城市', dataIndex: 'fundAddress', width: 120 },
		{ title: '公积金基数', dataIndex: 'fundBase', width: 120 },
		{ title: '公积金起缴月', dataIndex: 'fundStart', width: 120 },
		{ title: '公积金个人比例', dataIndex: 'fundPersonalPer', width: 120 },
		{ title: '公积金企业比例', dataIndex: 'fundCompanyPer', width: 120 },
		{ title: '派单分公司', dataIndex: 'dispatchCompany', width: 120 },
		{ title: '派单客服', dataIndex: 'customerService', width: 120 },
		{ title: '小合同名称', dataIndex: 'contractMinorName', width: 120 },
		{ title: '唯一号', dataIndex: 'uniqueNumber', width: 120 },
		{ title: '客户编号', dataIndex: 'customerNumber', width: 120 },
		{ title: '服务类别', dataIndex: 'serviceType', width: 120 },
		{ title: '养老截止城市', dataIndex: 'pensionAddressReduce', width: 120 },
		{ title: '养老截止时间', dataIndex: 'pensionEndReduce', width: 120 },
		{ title: '医疗截止城市', dataIndex: 'medicalAddressReduce', width: 120 },
		{ title: '医疗截止时间', dataIndex: 'medicalEndReduce', width: 120 },
		{ title: '工伤截止城市', dataIndex: 'injuryAddressReduce', width: 120 },
		{ title: '工伤截止时间', dataIndex: 'injuryEndReduce', width: 120 },
		{ title: '生育截止城市', dataIndex: 'birthAddressReduce', width: 120 },
		{ title: '生育截止时间', dataIndex: 'birthEndReduce', width: 120 },
		{ title: '失业截止城市', dataIndex: 'unemploymentAddressReduce', width: 120 },
		{ title: '失业截止时间', dataIndex: 'unemploymentEndReduce', width: 120 },
		{ title: '公积金截止城市', dataIndex: 'fundAddressReduce', width: 120 },
		{ title: '公积金截止时间', dataIndex: 'fundEndReduce', width: 120 },
		{ title: '离职日期', dataIndex: 'leaveDate', width: 120 },
		{ title: '离职原因', dataIndex: 'leaveReason', width: 120 },
		{ title: '合同类型', dataIndex: 'contractType', width: 120 },
		{ title: '所属单位名称', dataIndex: 'unitNameAdd', width: 120 },
		{ title: '所属结算主体名称', dataIndex: 'departNameAdd', width: 120 },
		{ title: '备案基数', dataIndex: 'filingBaseAdd', width: 120 },
		{ title: '派单状态', dataIndex: 'preStatus', width: 120 },
		{ title: '异常内容', dataIndex: 'exceptionContent', width: 120 },
		{ title: '派单日期限制', dataIndex: 'dayLimit', width: 120 },
		{ title: '资料是否提交', dataIndex: 'dataSubStatus', width: 120 },
		{ title: '派单合同名称', dataIndex: 'contractNameAdd', width: 120 },
		{ title: '创建时间', dataIndex: 'createTime', width: 120 },
		{ title: '备注', dataIndex: 'remark', width: 120 },
		{ title: '是否派单', dataIndex: 'dispatchFlag', width: 120 },
		{ title: '取消原因', dataIndex: 'cancelRemark', width: 120 },
		{ title: '主键', dataIndex: 'id', width: 120 },
	]
	



};
