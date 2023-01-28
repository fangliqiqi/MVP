<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="550px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="上级字典" prop="parentItemType">
							<page-select
								:disabled="state.id"
								ref="pageSelectRef"
								v-model="state.ruleForm.parentItemType"
								:request="request"
								value-key="type"
								title="description"
								search="description"
								:options="state.options"
							>
							</page-select>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="字典名称" prop="description">
							<el-input v-model.trim="state.ruleForm.description" placeholder="请输入字典名称" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="字典编码" prop="type">
							<el-input :disabled="state.id" v-model.trim="state.ruleForm.type" placeholder="请输入字典编码" maxlength="30" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="备注信息" prop="remark">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入备注信息" maxlength="255"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" :loading="isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddDic">
import { getDictInfo, addDict, updateDict, getDictPage } from '/@/api/dict';
import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '新增字典',
	ruleForm: {
		systemFlag: '1', // 0 系统类型 1 业务类型
		description: null,
		parentItemType: null,
		type: null,
		remark: null,
	},
	options: [],
});

const rules = {
	description: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
	type: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
};

const request = async (params) => {
	try {
		const res = await getDictPage(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

// 打开弹窗
const openDialog = async (data) => {
	if (data && data.id) {
		// 编辑
		state.title = '编辑字典';
		state.id = data.id;
		await getDetail(data.id);
	} else {
		// 新增
		state.title = '新增字典';
		state.id = null;
		state.ruleForm = {
			systemFlag: '1',
			description: null,
			parentItemType: null,
			type: null,
			remark: null,
		};
	}
	// if (pageSelectRef.value) pageSelectRef.value.refresh();
	state.isShowDialog = true;
};

const getDetail = async (id) => {
	try {
		const res = await getDictInfo(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			// console.log('get detail:', detail);
			state.options = [{ type: detail.parentItemType, description: detail.parentItemName }];
			// state.options =  [detail]
			state.ruleForm = detail;
		} else {
			ElMessage.error(res.msg || '获取字典详情失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取字典详情失败');
	}
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
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
				isShowLoading.value= true
				// 校验通过
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateDict(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑字典成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '编辑字典失败');
							}
						},
						() => {
							ElMessage.error('编辑字典失败');
						}
					).finally(()=>{
						isShowLoading.value= false
					});
				} else {
					// 新增操作
					addDict(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增字典成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增字典失败');
							}
						},
						() => {
							ElMessage.error('新增字典失败');
						}
					).finally(()=>{
						isShowLoading.value= false
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
<style lang="scss" scoped src="./css/addDic.scss">

</style>
