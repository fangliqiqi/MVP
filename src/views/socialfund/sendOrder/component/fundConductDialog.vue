<template>
	<div>
		<el-dialog title="公积金批量办理" v-model="state.isShowDialog" width="576px" @close="closeDialog" :close-on-click-modal="false">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px" :validate-on-rule-change="false">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="办理结果" prop="handleStatus">
							<el-radio-group v-model="state.ruleForm.handleStatus" @change="changeStatus">
								<el-radio label="1">办理成功</el-radio>
								<el-radio label="2">办理失败</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col class="mb20" v-if="state.ruleForm.handleStatus == 2">
						<el-form-item label="失败类型" prop="remark">
							<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
								<el-option v-for="(item, key) in state.DICTS['fund-conduct-add-reason']" :label="item" :key="key" :value="item"> {{ item }}</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="办理意见" prop="auditRemark">
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
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!--批量办理弹框-->
		<batch-import-dialog
			title="公积金批量办理"
			ref="bathHandleRef"
			:type="1"
			errName="公积金批量办理"
			batchName="staff-batch-audit"
			:errorHeader="STAFF_BATCH_DEL_ERROR_HEADER"
			:errorData="batchErrorData"
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">公积金批量办理失败！</div>
					<!--反馈信息-->
					<span>存在公积金办理失败的派单信息！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script setup name="fundConductDialog">
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { getDictByItemTypes } from '/@/utils/utils';
import { addApplyHandle } from '/@/api/socialfund/order';
import { STAFF_BATCH_DEL_ERROR_HEADER } from '/@/utils/header';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const bathHandleRef = ref(null);

const batchErrorData = (prop, errorData) => {
	// return (data = errorData.map((item, index) => {
	return (errorData.map((item, index) => {
		return {
			line: item.lineNum || index,
			isError: item.color == 'red' ? '是' : '否',
			error: item.message,
		};
	}));
};

const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {
		auditStatus: '0', // 审核状态
		auditRemark: null, // 审核意见
	},
	data: null,
	dictKeys: ['fund-conduct-add-reason'],
	DICTS: {},
});

const rules = computed(() => {
	if (state.ruleForm.handleStatus == '1') {
		// 办理成功
		return {
			handleStatus: [{ required: true, message: '请选择办理结果' }],
		};
	} else if (state.ruleForm.handleStatus == '2') {
		if (state.ruleForm.remark == '999') {
			return {
				handleStatus: [{ required: true, message: '请选择办理结果' }],
				remark: [{ required: true, message: '请选择失败类型' }],
				auditRemark: [{ required: true, message: '请选择办理意见' }],
			};
		}

		return {
			handleStatus: [{ required: true, message: '请选择办理结果' }],
			remark: [{ required: true, message: '请选择失败类型' }],
		};
	}
});

const changeStatus = () => {
	state.ruleForm.auditRemark = null;
	setTimeout(() => {
		if (formRef.value) formRef.value.clearValidate();
	}, 100);
};

const onSubmit = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				const ids = state.data.map((item) => item.id)
				let handleRemark = state.ruleForm.auditRemark?state.ruleForm.remark+'-'+state.ruleForm.auditRemark:state.ruleForm.remark
				const params = {
					typeSub: '1',
					handleStatus: state.ruleForm.handleStatus,
					handleRemark:state.ruleForm.handleStatus=='1'?state.ruleForm.auditRemark:handleRemark,
					remark: state.ruleForm.remark,
				};
				addApplyHandle(params,ids)
					.then(
						(res) => {
							if (res && res.code == 200 && (!res.data || res.data.length === 0)) {
								ElMessage.success('批量办理成功');
								emits('ok');
								closeDialog();
							} else if (res.data) {
								if (bathHandleRef.value) bathHandleRef.value.openErrorDialog(res.data);
							} else {
								ElMessage.error(res.msg || '批量办理失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '批量办理失败');
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
	state.ruleForm = {};
	state.loading = false;
};

// 打开弹窗
const openDialog = async (data) => {
	state.data = data;
	state.ruleForm = {
		handleStatus: '1',
	};

	if (!state.DICTS || !Object.keys(state.DICTS).length) {
		loadDict();
	}

	state.isShowDialog = true;
};

onMounted(() => {
	loadDict();
});

const loadDict = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	}
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

