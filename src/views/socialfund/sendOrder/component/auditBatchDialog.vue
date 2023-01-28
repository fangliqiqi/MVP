<template>
	<div>
		<el-dialog title="审核确认" v-model="state.isShowDialog" width="576px" @close="closeDialog" :close-on-click-modal="false">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px" :validate-on-rule-change="false">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="审核状态" prop="auditStatus">
							<el-radio-group v-model="state.ruleForm.auditStatus" @change="changeStatus">
								<el-radio label="1">通过</el-radio>
								<el-radio label="2">退回</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col class="mb20" v-if="state.ruleForm.auditStatus == '2'">
						<el-form-item label="退回原因" prop="remark">
							<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
								<el-option v-for="(item, key) in state.refuseOptions" :label="item" :key="key" :value="item"> {{ item }}</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="审核意见" prop="auditRemark">
							<el-input
								v-model="state.ruleForm.auditRemark"
								placeholder="请输入"
								:rows="3"
								type="textarea"
								clearable
								:maxLength="150"
								show-word-limit
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default" :loading="state.loading">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!--批量审核弹框-->
		<batch-import-dialog
			title="批量审核"
			ref="bathAuditRef"
			:type="1"
			errName="派单批量审核"
			batchName="staff-batch-audit"
			:errorHeader="STAFF_BATCH_DEL_ERROR_HEADER"
			:errorData="batchErrorData"
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量审核失败！</div>
					<!--反馈信息-->
					<span>存在审核失败的派单信息！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script setup name="bathAuditDialog">
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { ElMessage } from 'element-plus';
import { addApplyAudit } from '/@/api/socialfund/order';
import { getDictByItemTypes } from '/@/utils/utils.js';
import { STAFF_BATCH_DEL_ERROR_HEADER } from '/@/utils/header';
const formRef = ref(null);
const bathAuditRef = ref(null); // 批量审核错误弹框

const state = reactive({
	isShowDialog: false,
	ruleForm: {
		auditStatus: '1', // 审核状态
		auditRemark: null, // 审核意见
	},
	data: null,
	refuseOptions: {},
	loading: false,
	dictKeys: ['dispatch-audit-add-reason'],
	DICTS: {},
});

const changeStatus = () => {
	state.ruleForm.auditRemark = null;
	setTimeout(() => {
		if (formRef.value) formRef.value.clearValidate();
	}, 100);
};

const isPass = computed(() => {
	// 审核通过
	return state.ruleForm.auditStatus == '1'; //  auditStatus:1审核通过 2审核不通过
});

const rules = computed(() => {
	if (state.ruleForm.auditStatus == '1') {
		// 审核通过
		return {
			auditStatus: [{ required: true, message: '请选择审核状态' }],
		};
	} else if (state.ruleForm.auditStatus == '2') {
		if (state.ruleForm.remark == '999') {
			return {
				auditStatus: [{ required: true, message: '请选择审核状态' }],
				remark: [{ required: true, message: '请选择退回原因' }],
				auditRemark: [{ required: true, message: '请输入审核意见' }],
			};
		} else {
			return {
				auditStatus: [{ required: true, message: '请选择审核状态' }],
				remark: [{ required: true, message: '请选择退回原因' }],
			};
		}
	}
});

const batchErrorData = (prop, errorData) => {
	consloe.log('get prop:', prop, ',and errorData:', errorData);
	// return (data = errorData.map((item, index) => { 如果因为这里报错就把这行放开
	return (errorData.map((item, index) => {
		return {
			line: item.lineNum || index,
			isError: item.color == 'red' ? '是' : '否',
			error: item.message,
		};
	}));
};

onMounted(() => {
	loadDict();
});

const loadDict = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.refuseOptions = res['dispatch-audit-add-reason'];
		}
	}
};
const onSubmit = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				// 校验通过
				// const ids = state.data.map((item) => item.id).join(',');
				const ids = state.data.map((item) => item.id);
				let auditRemark = state.ruleForm.auditRemark?state.ruleForm.remark + '-'+state.ruleForm.auditRemark:state.ruleForm.remark;
				let data = Object.assign({},state.ruleForm)
				data.auditRemark = state.ruleForm.auditStatus==1?state.ruleForm.auditRemark:auditRemark
				if(state.ruleForm.auditStatus==1){
					delete data.remark
				}
				addApplyAudit(data, ids)
					.then(
						(res) => {
							if (res && res.code == 200 && (!res.data || res.data.length === 0)) {
								ElMessage.success('批量审核成功');
								emits('ok');
								closeDialog();
							} else if (res.data) {
								if (bathAuditRef.value) bathAuditRef.value.openErrorDialog(res.data);
							} else {
								ElMessage.error(res.msg || '批量审核失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '批量审核失败');
						}
					)
					.finally((res) => {
						state.loading = false;
					});
			}
		});
	}
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.loading = false;
	state.ruleForm = {};
};

// 打开弹窗
const openDialog = async (data) => {
	state.data = data;
	state.ruleForm = {
		auditStatus: '1',
	};
	if (!state.refuseOptions || Object.keys(state.refuseOptions).length === 0) {
		loadDict();
	}
	state.isShowDialog = true;
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

