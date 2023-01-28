<template>
	<div class="contract-audit-detail">
		<div class="content">
			<div class="basic-info section-container">
				<!--基本信息-->
				<div class="title" style="margin-bottom:12px">
					<span>基础信息</span>
				</div>

				<el-row>
					<el-col v-for="item in params" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
						<span class="desc-title" v-html="getAuditTitle(item)"> </span>
						<div class="desc-content">
							<template v-if="item === 'file'">
								<!---文件列表-->
								<template v-if="state.fileList && state.fileList.length">
									<el-tooltip v-for="file in state.fileList" :key="file.uid" placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
										<template #content>
											<div class="detail-tooltip-container">
												<span v-html="file.name"> </span>
											</div>
										</template>
										<div style="margin-bottom: 8px">
											<a :href="file.url" :download="file.name" target="_blank">{{ file.name }} </a>
										</div>
									</el-tooltip>
								</template>
								<template v-else>
									<span>{{ EMPTY_PLACEHOLDER }}</span>
								</template>
							</template>
							<template v-else>
								<el-tooltip placement="top-start" effect="dark" :content="getAuditValue(item)" popper-class="detail-tooltip-popper">
									<template #content>
										<div class="detail-tooltip-container">
											<span v-html="getAuditValue(item)"> </span>
										</div>
									</template>
									<span>{{ getAuditValue(item) }} </span>
								</el-tooltip>
							</template>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="audit-info section-container">
				<!--审核信息-->
				<div class="title" style="margin-bottom:18px">
					<span>审核信息</span>
				</div>

				<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="100px">
					<el-row>
						<el-col class="mb20">
							<el-form-item label="审核意见" prop="auditStatus">
								<el-radio-group v-model="state.ruleForm.auditStatus"   @change="changeAuditStatus">
									<el-radio label="2">通过</el-radio>
									<el-radio label="3">不通过</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col class="mb20">
							<el-form-item label="原因" prop="remark" v-if="state.ruleForm.auditStatus=='3'">
								<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
									<el-option 
										v-for="(item, key) in state.refuseOptions" 
										:label="item" 
										:key="key" 
										:value="item"
									> {{ item }}</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col class="mb20">
							<el-form-item label="说明" prop="auditRemark">
							<!-- 改成150字是因为后端要求传数据把原因和意见拼接传递，但是后端最长字数又限制了200 -->
								<el-input
									v-model="state.ruleForm.auditRemark"
									type="textarea"
									placeholder="请输入审核意见，不超过150字"
									maxlength="150"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>

		<div class="operation-container">
			<el-button @click="goBack" style="height: 100%">返 回</el-button>
			<el-button type="primary" @click="onSubmit" :loading="state.loading" style="height: 100%">保 存</el-button>
		</div>
	</div>
</template>
<script setup name="contractAuditDetail">
import { getDictByItemTypes, EMPTY_PLACEHOLDER, getDictValue as getValue, closeCurrentTab } from '/@/utils/utils';
import { getContractDetail, auditContract } from '/@/api/contract';
import { CONTRACT_AUDIT_PARAMS } from '/@/utils/header';
import { getFile } from '/@/api/file';
import { ElMessage } from 'element-plus';
import moment from 'moment';
import { emitRefresh } from '/@/utils/events';

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();

const formRef = ref(null);

const params = computed(() => {
	if(state.info.situation=='终止'){
		const stop = ['leaveDate','reduceReason'];
		const stopParams = [...state.abolishParams.slice(0,4),...stop,...state.abolishParams.slice(4,20)];
		return stopParams;
	}
	if (state.isAbolish) {
		// 作废终止
		return state.abolishParams;
	}
	return state.normalParams;
});


const changeAuditStatus = ()=>{
	if(formRef.value) formRef.value.clearValidate();
}

const rules = computed(() => {
	// state.ruleForm.remark 根据汉字判断是因为后端不想翻译，所以传给后端汉字！！！
	if (state.ruleForm.auditStatus == '3'&&state.ruleForm.remark != '其他') {
		formRef.value.clearValidate(['auditRemark']);
		return {
			auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
			remark: [{ required: true, message: '请选择原因', trigger: 'change' }],
		};
	}
	if(state.ruleForm.remark == '其他'){
		return {
			auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
			auditRemark: [{ required: true, message: '请填写说明', trigger: 'blur' }],
			remark: [{ required: true, message: '请选择原因', trigger: 'change' }],
		};
	}
	return {
		auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
	};
});

const onSubmit = () => {
	if (formRef.value) {
		formRef.value.validate(async (valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				const auditRemark = state.ruleForm.auditRemark?':'+state.ruleForm.auditRemark:'';
				const data  = {
					auditStatus: state.ruleForm.auditStatus,
					auditRemark:state.ruleForm.auditStatus==2?
											state.ruleForm.auditRemark:
											state.ruleForm.remark+auditRemark,
				}
				auditContract(Object.assign({}, data, { id: state.info.id })).then(
					(res) => {
						if (res && res.code === 200) {
							ElMessage.success('审核成功');
							goBack();
						} else {
							ElMessage.error(res.msg || '审核失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '审核失败');
					}
				).finally(() => {
					state.loading = false;
				});
			}
		});
	}
};

const loadDetail = async (id) => {
	loadDicts(); // 加载字典
	state.id = id;
	try {
		const res = await getContractDetail(id);
		if (res && res.code === 200) {
			const data = res.data;
			state.info = res.data;
			if (data.situation == '作废' || data.situation == '终止') {
				// 作废终止
				state.isAbolish = true;
			} else {
				state.isAbolish = false;
			}
		} else {
			ElMessage.error(res.msg || '获取合同详情失败');
			goBack();
		}

		const file = await getFile(id);

		if (file && file.code == 200) {
			state.fileList = file.data.map((item) => {
				item.name = item.attaName;
				item.uid = item.id;
				item.url = item.attaUrl;
				return item;
			});
		} else {
			state.fileList = [];
			ElMessage.error(res.msg || '获取合同申请附件失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error((e && e.msg) || '获取合同详情失败');
		goBack();
	}
};

const getAuditTitle = (item) => {
	return CONTRACT_AUDIT_PARAMS[item];
};

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.refuseOptions = res['dispatch-audit-add-reason']
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(async () => {
	if (route.params && route.params.id) {
		state.staffId = route.params.id;
		loadDetail(route.params.id);
	} else {
		ElMessage.error('不合法的路由地址');
		goBack();
	}
});

const goBack = () => {
	try {
		// 返回上一级
		router.push({
			path: '/contract/contractCheck',
		});
		closeCurrentTab(route, proxy); // 关闭当前页
		emitRefresh(proxy, '/contract/contractCheck');
	} catch (e) {
		console.log('get exception:', e);
	}
};

const getDictValue = (type, value) => {
	return getValue(type, value, state.DICTS);
};

const getAuditValue = (item) => {
	let val = state.info[item];
	switch (item) {
		case 'empNatrue':
			// 员工类型
			val = getDictValue('emp_natrue', state.info[item]);
			break;

		case 'workingHours':
			// 工时制
			val = getDictValue('working_hours', state.info[item]);
			break;

		case 'contractType':
			// 签订期限
			val = getDictValue('employee_contract_type', state.info[item]);
			break;

		case 'type':
			// 审核类型
			val = getDictValue('check_type', state.info[item]);
		break;

		case 'contractStart':
		case 'contractEnd':
			if (state.info[item]) val = moment(state.info[item]).format('YYYY-MM-DD');
			else val = EMPTY_PLACEHOLDER;
			break;

		default:
			if (val === null || val === undefined || val == '') {
				// 默认为空 '--'
				return EMPTY_PLACEHOLDER;
			}
			break;
	}

	return val;
};

const state = reactive({
	id: null,
	loading: false,
	info: {},
	DICTS: {},
	fileList: [],
	ruleForm: {},
	refuseOptions:{},
	dictKeys: [
		'emp_natrue', 
		'situation_type', 
		'personnel_state', 
		'employee_contract_type', 
		'working_hours', 
		'contract_business_type',
		'dispatch-audit-add-reason',
		'check_type'
	],
	isAbolish: false, // 是否是废除 终止
	abolishParams: [
		'empName',
		'subjectDepart',
		'empNatrue',
		'situation',
		'contractName',
		'contractSubName',
		'subjectUnit',
		'contractParty',
		'contractType',
		'type',
		'contractStart',
		'contractEnd',
		'reason',
	],
	normalParams: [
		'empName',
		'subjectDepart',
		'empNatrue',
		'situation',
		'contractName',
		'contractSubName',
		'type',
		'reason',
		'subjectUnit',
		'contractParty',
		'contractType',
		
		'contractStart',
		'contractEnd',
		'contractTerm',
		'post',
		'workingHours',
		'contractNo',
		'fileCabinetNo',
		'file',
		'remark',

	],
});

const getColNumber = (item) => {
	if (item === 'reason'||item === 'remark' || item === 'file'){
		return 24;
	}else if(item==='reduceReason'){
		return 18;
	}
	return 6;
};
</script>
<style lang="scss" scoped src="./css/contractAudit.scss">

</style>
