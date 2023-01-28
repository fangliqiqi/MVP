<template>
	<div class="edit-ele-contract-template-dialog">
		<el-dialog :title="title" v-model="state.isShowDialog" width="576px"  :close-on-click-modal="false" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="120px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="模板名称" prop="localName">
							<el-input v-model="state.ruleForm.localName" placeholder="请输入模板名称" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="地区" prop="address">
							<el-tree-select
								v-model="state.ruleForm.address"
								:data="state.areaJson"
								style="width: 100%"
								placeholder="请选择"
								:props="state.areaProps"
								@current-change="changeFileAddress"
								@clear="clearFileAddress"
								node-key="id"
								check-strictly
								clearable
							/>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="合同类型" prop="type">
							<el-select v-model="state.ruleForm.type" style="width: 100%">
								<el-option v-for="(label, value) in state.DICTS['personnel_type']" :label="label" :value="value" :key="`${label}_${value}`">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="有无加班工资" prop="overtimeWageFlag">
							<el-select v-model="state.ruleForm.overtimeWageFlag" style="width: 100%">
								<el-option label="无" value="0"></el-option>
								<el-option label="有" value="1"></el-option>
							</el-select>
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
	</div>
</template>

<script setup name="editEleContractTemplateDialog">
import { getCityLevelJson } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils';
import { addContractTemplate, updateContractTemplate } from '/@/api/eleContract';
import { ElMessage } from 'element-plus';

const props = defineProps({
	type: String, // add 新增 edit 编辑
});

const title = computed(() => {
	return props.type =='add' ? '新增合同模板' : '编辑合同模板';
});

onMounted(() => {
	// console.log('get onMounted')
	loadDicts();
	state.areaJson = getCityLevelJson();
});

const changeFileAddress = (val, node) => {
	// 获取档案所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
	}
	let pro = null,
		city = null;

	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;

	state.ruleForm.province = pro;
	state.ruleForm.city = city;
};

const clearFileAddress = () => {
	state.ruleForm.province = null;
	state.ruleForm.city = null;
};

const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const formRef = ref(null);
const state = reactive({
	areaProps: {
		label: 'areaName',
	},
	areaJson: [],
	isShowDialog: false,
	loading: false,
	dictKeys: ['personnel_type'],
	DICTS: {},
	ruleForm: {
		localName: null, // 模板名称
		address: null, // 地区
		overtimeWageFlag: null, // 是否有加班工资
		type: null, // 合同类型
	},
	info: null,
});

const rules = reactive({
	localName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
	address: [{ required: true, message: '请选择地区', trigger: 'blur' }],
	type: [{ required: true, message: '请选择合同类型', trigger: 'blur' }],
	overtimeWageFlag: [{ required: true, message: '请选择有无加班工资', trigger: 'blur' }],
});

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				if (props.type === 'add') {
					// 新增
					addContractTemplate(state.ruleForm).then(
						(res) => {
							if (res && res.code === 200) {
								ElMessage.success('新增合同模板成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '新增合同模板失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '新增合同模板失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else if (props.type === 'edit') {
					// 编辑
					updateContractTemplate(state.ruleForm).then(
						(res) => {
							if (res && res.code === 200) {
								ElMessage.success('编辑合同模板成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑合同模板失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '编辑合同模板失败');
						}
					).finally(() => {
						state.loading = false;
					});
				}
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	if (props.type === 'edit') {
		state.info = data;
		state.ruleForm = data;
		state.ruleForm.address = data.city || data.province;
	} else {
		state.ruleForm = {};
		state.info = null;
	}

	state.isShowDialog = true;
	if (!state.DICTS['personnel_type'] || !Object.keys(state.DICTS['personnel_type']).length) {
		loadDicts();
	}

	if (!state.areaJson || state.areaJson.length === 0) {
		state.areaJson = getCityLevelJson();
	}
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/editEleContractTemplate.scss">

</style>
