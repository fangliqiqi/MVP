<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20" :span="12">
						<el-form-item label="项目名称" prop="departId">
							<page-select
								ref="settleDomainRef"
								v-model="state.ruleForm.departId"
								:request="request"
								value-key="id"
								title="departName"
								search="departName"
								placeholder="请选择项目名称"
								@change="change"
								:options="state.options"
							
							/>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="配置方案名称" prop="name">
							<el-input v-model="state.ruleForm.name" placeholder="请输入配置方案名称" style="width: 100%" maxlength="50"></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="薪酬月份" prop="salaryMonth">
							<el-select v-model="state.ruleForm.salaryMonth" placeholder="请选择" style="width: 100%">
								<el-option v-for="item in state.DICTS.salaryMoth" :key="`salary_${item.val}`" :value="item.val" :label="item.text"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="社保月份" prop="socialMonth">
							<el-select v-model="state.ruleForm.socialMonth" placeholder="请选择" style="width: 100%">
								<el-option v-for="item in state.DICTS.salaryMoth" :key="`salary_${item.val}`" :value="item.val" :label="item.text"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="公积金月份" prop="fundMonth">
							<el-select v-model="state.ruleForm.fundMonth" placeholder="请选择" style="width: 100%">
								<el-option v-for="item in state.DICTS.salaryMoth" :key="`salary_${item.val}`" :value="item.val" :label="item.text"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="社保优先级" prop="socialPriority">
							<el-select v-model="state.ruleForm.socialPriority" placeholder="请选择" style="width: 100%">
								<el-option :value="0" label="生成"></el-option>
								<el-option :value="1" label="缴纳"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="公积金优先级" prop="fundPriority">
							<el-select v-model="state.ruleForm.fundPriority" placeholder="请选择" style="width: 100%">
								<el-option :value="0" label="生成"></el-option>
								<el-option :value="1" label="缴纳"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20" :span="12">
						<el-form-item label="发放方式" prop="grantType">
							<el-select v-model="state.ruleForm.grantType" placeholder="请选择" style="width: 100%">
								<el-option :value="0" label="现金"></el-option>
								<el-option :value="1" label="转账"></el-option>
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

<script setup name="addSalaryBasicConf">
import { getConfigSalary, addConfigSalary, updateConfigSalary } from '/@/api/payservice/settings';
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';
import { addDeptSee, updateDeptSee, getDeptSee } from '/@/api/payservice/settings';
import { getSettleDomainList } from '/@/api/socialfund/fee';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '新增配置',
	ruleForm: {},
	options: [],
	loading: false,
	DICTS: {
		salaryMoth: [
			{ text: '前6月', val: -6 },
			{ text: '前5月', val: -5 },
			{ text: '前4月', val: -4 },
			{ text: '前3月', val: -3 },
			{ text: '前2月', val: -2 },
			{ text: '上月', val: -1 },
			{ text: '本月', val: 0 },
			{ text: '下月', val: 1 },
		],
	},
});

const rules = {
	departId: [{ required: true, message: '请选择项目名称' }],
	name: [{ required: true, message: '请输入配置方案名称' }],
	salaryMonth: [{ required: true, message: '请选择薪酬月份' }],
	socialMonth: [{ required: true, message: '请选择社保月份' }],
	fundMonth: [{ required: true, message: '请选择社保月份' }],
	socialPriority: [{ required: true, message: '请选择社保月份' }],
	fundPriority: [{ required: true, message: '请选择社保月份' }],
	grantType: [{ required: true, message: '请选择发放方式' }],
};

const change = (selected) => {
	state.ruleForm.departId = selected.id;
	state.ruleForm.departName = selected.departName;
	state.ruleForm.departNo = selected.departNo;
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
			id: null,
			salaryMonth: -1,
			socialMonth: 0,
			fundMonth: 0,
			socialPriority: 0,
			fundPriority: 0,
			grantType: 1,
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
		const res = await getConfigSalary(id);
		// eslint-disable-next-line no-empty
		if (res && res.code === 200 && res.data) {
			state.options = [{ id: res.data.departId, departName: res.data.departName }];
			state.ruleForm = { ...res.data };
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
					updateConfigSalary(state.ruleForm)
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
					addConfigSalary(state.ruleForm)
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
