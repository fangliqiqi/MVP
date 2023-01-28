<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="系统标准数据项" prop="dbFiedName">
							<el-input v-model="state.ruleForm.dbFiedName"  maxlength="30" placeholder="系统标准数据项"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="原始数据对应项" prop="cnName">
							<el-input v-model="state.ruleForm.cnName" maxlength="30" placeholder="原始数据对应项"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="isShowLoading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="addSalarySetting">
import { getElectronic, addElectronic, updateElectronic } from '/@/api/electronic';
import {addSalaySetting,editeSalaySetting,deleteSalaySetting,findEditeSalaySetting} from '/@/api/payservice/settings'

import { ElMessage } from 'element-plus';
import { getStaffList } from '@/api/staff';

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '新增配置',
	ruleForm: {
		dbFiedName: null,
		cnName: null,
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],
});

const rules = {
	dbFiedName: [{ required: true, message: '系统标准数据项' }],
	cnName: [{ required: true, message: '原始数据对应项' }],
};
// 打开弹窗
const openDialog = async (data) => {
	if (data && data.id) {
		// 编辑
		state.title = '编辑配置';
		state.id = data.id;
		await getDetail(data.id);
	} else {
		// 新增
		state.title = '新增配置';
		state.id = null;
		state.ruleForm = {
			dbFiedName: null,
			cnName: null,
		};

		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	}
	state.isShowDialog = true;
};
const getDetail = async (id) => {
	try {
		const res = await findEditeSalaySetting(id);
		// eslint-disable-next-line no-empty
		if (res && res.code === 200) {
			state.options = [
				{
					...res.data,
				},
			];
			state.ruleForm = res.data || {};
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取详情失败');
			closeDialog();
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取详情失败');
	}
};

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
// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				isShowLoading.value = true;
				// 校验通过
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					editeSalaySetting(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('编辑成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '编辑失败');
								}
							},
							() => {
								ElMessage.error('编辑失败');
							}
						)
						.finally((res) => {
							isShowLoading.value = false;
						});
				} else {
					// 新增操作
					addSalaySetting(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('新增成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '新增失败');
								}
							},
							() => {
								ElMessage.error('新增失败');
							}
						)
						.finally((res) => {
							isShowLoading.value = false;
						});
				}
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
