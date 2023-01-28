<template>
	<div class="downshift-archives-dialog">
		<el-dialog :title="title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="100px">
				<el-row style="margin-top: 10px">
					<el-col class="mb20">
						<el-form-item label="办理意见：" prop="remark">
							<el-input v-model.trim="state.ruleForm.remark" type="textarea" placeholder="请输入办理意见" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" v-debounce="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="downShiftDialog">
import { ElMessage } from 'element-plus';
import { minusStaff } from '/@/api/staff';
import { useRoute, useRouter } from 'vue-router';
import { InfoFilled } from '@element-plus/icons-vue';
import { getDictByItemTypes } from '/@/utils/utils';
import { rollBackInsurance, successfulInsurance, updateInsuranceRefund } from '/@/api/insurance/handle.js';
const router = useRouter();
const formRef = ref(null);
const props = defineProps({
	title: String,
	type: Number,
	required: Boolean,
});

const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {},
	info: null,
	DICTS: {},
	dictKeys: ['downshift_reason'], // 减档原因
	selectionChangeList: [],
});

const rules = reactive({
	remark: [{ required: props.required, message: '请输入办理意见', trigger: 'blur' }],
});
const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
// onMounted(() => {
// 	loadDicts();
// });

/**
 * 加载字典值
 */
// const loadDicts = async () => {
// 	try {
// 		const res = await getDictByItemTypes(state.dictKeys);
// 		if (res) {
// 			state.DICTS = res;
// 		}
// 	} catch (e) {
// 		console.log('get exception:', e);
// 	}
// };

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
		formRef.value.resetFields();
	}
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate(async (valid) => {
			if (valid) {
				// 表单校验通过
				state.loading = true;
				// emits('onLoading', state.loading); 这个组件涉及的页面比较多，此功能暂时去除遮罩层 --2022-11-25 老房
				// state.isShowDialog = false;
				try {
					const ids = state.selectionChangeList.map((item) => {
						return {
							id: item.id,
							remark: state.ruleForm.remark,
						};
					});
					const ids1 = state.selectionChangeList.map((item) => item.id);
					let res;
					if (props.type === 1) {
						res = await rollBackInsurance(ids);
					} else if (props.type === 2) {
						res = await successfulInsurance(ids);
					} else if (props.type === 3 || props.type === 4) {
						res = await updateInsuranceRefund({ refundType: props.type, insuranceDetailList: ids1, remark: state.ruleForm.remark });
					}
					if (res && res.code === 200 && res.data.length === 0) {
						message.success('操作成功');
						emits('sucess');
						closeDialog();
					} else {
						if (res.data && res.data.length > 0) {
							emits('errorBack', res.data);
							state.loading = false;
						}
					}
				} catch (e) {
					console.log('get exception:', e);
					state.loading = false;
					ElMessage.error('退回失败，请联系管理员');
				}
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	// console.log("---", data)

	state.selectionChangeList = data;
	state.isShowDialog = true;
};

const emits = defineEmits(['ok', 'onLoading', 'sucess', 'errorBack']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/downshiftDialog.scss"></style>
