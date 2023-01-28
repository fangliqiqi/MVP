<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="所在地" prop="address">
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
						<el-form-item label="最低工资标准(元)" prop="salaryBase">
							<el-input v-model="state.ruleForm.salaryBase" placeholder="请输入" maxlength="11" @keyup="oninput"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="状态" prop="status">
							<el-select v-model="state.ruleForm.status" placeholder="请选择" style="width: 100%">
								<el-option label="启用" value="1"></el-option>
								<el-option label="停用" value="2"></el-option>
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

<script setup name="addMinSalaryConf">
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';
import { getAreaJson, areaJson } from '/@/utils/city';
import { addMinSalary, updateMinSalary, getMinSalary } from '/@/api/payservice/settings';


const formRef = ref(null);

const state = reactive({
	areaProps: {
		label: 'areaName',
	},
	areaJson: [],
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
	address: [
		{
			required: true,
			message: '请选择所在地',
			validator: (rule, value, callback) => {
				if (value == null || value == undefined) {
					callback(new Error('请选择所在地'));
					return false;
				}

				const target = areaJson[value];
				if (!target || target.parentId == 0) {
					callback(new Error('请选择所在地,所在地需选到市或区级别'));
					return false;
				}

				callback();
			},
		},
	],
	date: [{ required: true, message: '请选择有效时间' }],
	status: [{ required: true, message: '请选择状态' }],
	salaryBase: [{ required: true, message: '请输入最低工资标准' }],
};

const oninput = () => {
	let value = state.ruleForm.salaryBase.replace(/[^0-9.]/g, '');
	if (value != '' && value != '.') {
		if (value.indexOf('.') === 0) {
			value = value.slice(1);
		}

		if (value.lastIndexOf('.') === value.length - 1 && value.indexOf('.') !== value.lastIndexOf('.')) {
			value = value.slice(0, value.length - 1);
		}
		if (value.indexOf('.') > -1) {
			state.ruleForm.salaryBase = value.slice(0, value.indexOf('.') + 3);
		} else {
			state.ruleForm.salaryBase = value;
		}
	} else {
		state.ruleForm.salaryBase = '';
	}
};

const changeFileAddress = (val, node) => {
	// 获取档案所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
		if (node.parent.parent && node.parent.parent.level != 0) {
			// 获取省
			values.unshift(node.parent.parent.data.id);
		}
	}
	let pro = null,
		city = null,
		town = null;

	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;
	if (values.length > 2) town = values[2] || null;

	state.ruleForm.province = pro;
	state.ruleForm.city = city;
	state.ruleForm.town = town;
};

const clearFileAddress = () => {
	state.ruleForm.province = null;
	state.ruleForm.city = null;
	state.ruleForm.town = null;
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
		state.ruleForm = {};

		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	}


	if (!state.areaJson || state.areaJson.length === 0) {
		state.areaJson = getAreaJson();
	}

	state.isShowDialog = true;
};

const getDetail = async (id) => {
	try {
		const res = await getMinSalary(id);
		// eslint-disable-next-line no-empty
		if (res && res.code === 200 && res.data) {
			const data = res.data;
			state.options = [{ id: res.data.id, departName: res.data.deptName }];

			state.ruleForm = {
				id: data.id,
				date: [data.startDate, data.endDate],
				address: data.town || data.city || data.province,
				salaryBase: data.salaryBase,
				town: data.town,
				city: data.city,
				province: data.province,
				status: data.status + '',
			};
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
				// 校验通过
				state.loading = true;
				const data = { ...state.ruleForm };
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateMinSalary(data)
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
					addMinSalary(data)
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
