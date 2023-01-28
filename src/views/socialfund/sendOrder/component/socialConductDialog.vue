<template>
	<div>
		<el-dialog title="社保批量办理" v-model="state.isShowDialog" width="600px" @close="closeDialog"
			:before-close="beforeHandle" :close-on-click-modal="false">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px"
				:validate-on-rule-change="false">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="办理结果" prop="handleStatus">
							<el-radio-group v-model="state.ruleForm.handleStatus">
								<el-radio label="1">办理成功</el-radio>
								<el-radio label="2">办理失败</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="办理事项" prop="socialType">
							<el-checkbox v-model="state.checkAll" :indeterminate="state.isIndeterminate"
								@change="handleCheckAllChange" style="margin-right:30px" v-if="state.type == 0">全选</el-checkbox>
							<el-checkbox-group v-model="state.ruleForm.socialType" :disabled="state.type == 1"
								@change="handleCheckedCitiesChange">
								<el-checkbox v-for="(item, key) in state.options" :key="key" :label="key">
									{{ item }}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>

					<el-col v-if="state.ruleForm.handleStatus == 2" class="mb20">
						<el-form-item label="失败类型" prop="remark">
							<el-select v-model="state.ruleForm.remark" style="width: 100%">
								<el-option v-for="(item, key) in state.DICTS['social-conduct-add-reason']" :label="item" :key="key"
									:value="item">
									{{ item }}</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="办理意见" prop="auditRemark">
							<el-input v-model="state.ruleForm.auditRemark" placeholder="请输入" :rows="3" type="textarea" clearable
								:maxLength="150" show-word-limit></el-input>
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

		<!--批量办理弹框-->
		<batch-import-dialog title="社保批量办理" ref="bathHandleRef" :type="1" errName="社保批量办理" batchName="staff-batch-audit"
			:errorHeader="STAFF_BATCH_DEL_ERROR_HEADER" :errorData="batchErrorData" customErrorContent download>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">社保批量办理失败！</div>
					<!--反馈信息-->
					<span>存在社保办理失败的派单信息！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script setup name="socialConductDialog">
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
	type: null, // 派单类型 0 派增  1派减
	ruleForm: {
		ids: null,
		handleStatus: '1', // 1 办理成功 2 办理失败
		typeSub: '0', // 办理类型【0社保、1公积金、2离职】
	},
	options: {
		1: '养老',
		2: '医疗',
		3: '失业',
		4: '工伤',
		5: '生育',
		6: '大病',
	}, // 办理事项
	data: null,
	dictKeys: ['social-conduct-add-reason'],
	DICTS: {},
	loading: false,
	checkAll: false,
	isIndeterminate: false,
});

const rules = computed(() => {
	if (state.ruleForm.handleStatus == '1') {
		// 办理成功
		return {
			handleStatus: [{ required: true, message: '请选择办理结果' }],
			socialType: [{ required: true, message: '请选择办理事项' }],
		};
	} else if (state.ruleForm.remark == '999') {
		return {
			handleStatus: [{ required: true, message: '请选择办理结果' }],
			socialType: [{ required: true, message: '请选择办理事项' }],
			remark: [{ required: true, message: '请选择失败类型' }],
			auditRemark: [{ required: true, message: '请选择办理意见' }],
		};
	} else if (state.ruleForm.handleStatus == '2') {
		return {
			handleStatus: [{ required: true, message: '请选择办理结果' }],
			socialType: [{ required: true, message: '请选择办理事项' }],
			remark: [{ required: true, message: '请选择失败类型' }],
		};
	}
});

// 全选
const handleCheckAllChange = (val) => {
	state.checkAll = val;
	if (val) {
		state.ruleForm.socialType = Object.keys(state.options)
	} else {
		state.ruleForm.socialType = []
	}
	state.isIndeterminate = false;
};

// 单选
const handleCheckedCitiesChange = () => {
	state.isIndeterminate = state.ruleForm.socialType.length > 0 && state.ruleForm.socialType.length < Object.keys(state.options).length;
	state.checkAll = state.ruleForm.socialType.length === Object.keys(state.options).length;
}

const onSubmit = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				const ids = state.data.map((item) => item.id);
				let handleRemark = state.ruleForm.auditRemark ? state.ruleForm.remark + '-' + state.ruleForm.auditRemark : state.ruleForm.remark
				const params = {
					// ids,
					typeSub: '0',
					handleStatus: state.ruleForm.handleStatus,
					// auditRemark: state.ruleForm.auditRemark,
					handleRemark: state.ruleForm.handleStatus == '1' ? state.ruleForm.auditRemark : handleRemark,
					remark: state.ruleForm.remark,
					socialType: state.ruleForm.socialType.join(','),
				};
				addApplyHandle(params,ids)
					.then(
						(res) => {
							if (res && res.code == 200 && (!res.data || res.data.length === 0)) {
								ElMessage.success('批量办理成功');
								emits('ok');
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
						closeDialog();
					});
			}
		});
	}
};

//叉号关闭弹窗签的判断
const beforeHandle = (done) => {
	if (state.loading) {
		ElMessage.error('正在请求中，请勿关闭！！！');
	} else {
		done()
		if (formRef.value) {
			formRef.value.clearValidate();
		}
		state.isShowDialog = false;
		state.loading = false;
		state.ruleForm = {};
	}
}
// 关闭弹窗
const closeDialog = () => {
	if (state.loading) {
		ElMessage.error('正在请求中，请勿关闭！！！');
	} else {
		if (formRef.value) {
			formRef.value.clearValidate();
		}
		state.isShowDialog = false;
		state.loading = false;
		state.ruleForm = {};
	}
};



// 打开弹窗
const openDialog = async (data, type) => {
	state.data = data;
	state.type = type;
	if (type == 1) {
		// 派减的话办理事项全选且不可修改
		state.ruleForm = {
			socialType: ['1', '2', '3', '4', '5', '6'],
			handleStatus: '1',
			typeSub: '0',
		};
	} else {
		state.ruleForm = {
			handleStatus: '1',
			socialType: ['1', '2', '3', '4', '5', '6'],
			typeSub: '0',
		};
		state.checkAll = true
	}

	if (!state.DICTS || !Object.keys(state.DICTS).length) {
		loadDict();
	}

	state.isShowDialog = true;

	setTimeout(() => {
		if (formRef.value) {
			formRef.value.clearValidate();
		}
	}, 100);
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

