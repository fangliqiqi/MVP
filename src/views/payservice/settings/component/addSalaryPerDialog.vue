<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="项目名称" prop="id">
							<page-select
								ref="settleDomainRef"
								v-model="state.ruleForm.id"
								:request="request"
								value-key="id"
								title="departName"
								search="departName"
								placeholder="请选择项目名称"
								@change="change"
								:options="state.options"
								manual
						 :disabled="isModifyOrAddFlag"
							/>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="请输入项目编码" prop="deptNo">
							<el-input v-model="state.ruleForm.deptNo" placeholder="请输入项目编码" maxlength="20" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="是否允许查看工资" prop="canSee">
							<el-select v-model.trim="state.ruleForm.canSee" style="width: 100%" placeholder="请选择" filterable>
								<el-option value="0" label="是">是</el-option>
								<el-option value="1" label="否">否</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default" :loading="state.loading">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="addSalaryPerDialog">
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';
import { addDeptSee, updateDeptSee, getDeptSee } from '/@/api/payservice/settings';
import { getSettleDomainList } from '/@/api/socialfund/fee';

const formRef = ref(null);
const pageSelectRef = ref(null);
const isModifyOrAddFlag = ref(false)
const props = defineProps({
										isModifyOrAddFlag: {	
												type: Boolean,
												default: false,
											},
										})
const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '新增配置',
	ruleForm: {},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],
	loading: false,
});

const rules = {
	id: [{ required: true, message: '请选择项目名称' }],
	deptNo: [{ required: true, message: '请输入项目编码' }],
	canSee: [{ required: true, message: '请选择是否允许查看工资' }],
};

const change = (selected) => {
	state.ruleForm.id = selected.id;
	state.ruleForm.deptName = selected.departName;
	state.ruleForm.deptNo = selected.departNo;
};


watch(
	() => props.isModifyOrAddFlag,
	(newVal, oldVal) => {
		console.log("ddddd")
		console.log(newVal)
		isModifyOrAddFlag.value=newVal
	}
);

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
			id: null,
		};

		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	}


	state.isShowDialog = true;
};

const request = async (params) => {
	try {
		const res = await getSettleDomainList(Object.assign({}, params,{flag:'1'}));
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
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

const getDetail = async (id) => {
	try {
		const res = await getDeptSee(id);
		// eslint-disable-next-line no-empty
		if (res && res.code === 200 && res.data) {
			state.options = [{ id: res.data.id, departName: res.data.deptName }];
			state.ruleForm = res.data || {};
			state.ruleForm.canSee = res.data.canSee + '';
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

// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
		
			if (valid) {
					state.loading = true;
				// 校验通过
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateDeptSee(state.ruleForm)
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
								ElMessage.error('编辑电失败');
							}
						)
						.finally((res) => {
							state.loading = false;
						});
				} else {
					// 新增操作
					addDeptSee(state.ruleForm)
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
							state.loading = false;
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
