<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog"  :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="申报月份"  prop="yearMonth">
										<el-date-picker
											v-model="state.ruleForm.yearMonth"
											type="month"
											placeholder="请选择申报月份"
											style="width: 100%;"
											format="YYYYMM"
											value-format="YYYYMM"
											></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading ="isShowLoading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="recorddilog">

import { deleteBatchRecodeData} from '/@/api/payservice/recordData';

import { ElMessage } from 'element-plus';
const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '批量删除',
	ruleForm: {
		yearMonth:null
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],

});

const rules = {
	yearMonth: [{ required: true, message: '请选择月份' }],
};
// 打开弹窗
const openDialog = async (data) => {
		// 新增
		state.title = '批量删除';
		state.ruleForm = {
			yearMonth:null
		};
		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	  state.isShowDialog = true;
  }
// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	if (formRef.value) {
		formRef.value.clearValidate();
	}
};
// 取消
const onCancel = () => {
	closeDialog();
};
const isShowLoading = ref(false)

//确认刷新
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			state.loading = true;
			if (valid) {
				isShowLoading.value = true
					// 删除操作
					deleteBatchRecodeData(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									emits('ok');
									closeDialog(); // 关闭弹窗
									ElMessage.success(res.msg  || '操作成功');
								} else {
									ElMessage.error(res.msg || '删除失败');
								}
							},
							() => {
								ElMessage.error('删除失败');
							}
						)
						.finally((res) => {
							isShowLoading.value = false
						});

				}
		});
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped src="./css/comm.scss">

</style>
