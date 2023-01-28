<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="身份证号" prop="empIdcard">
							<page-select
								:disabled="state.id ? true : false"
								ref="pageSelectRef"
								v-model="state.ruleForm.empIdcard"
								:request="request"
								value-key="empIdcard"
								title="empIdcard"
								search="empIdcard"
								placeholder="请输入身份证号查询"
								:options="state.options"
								@change="onChangeEmp"
							/>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="员工姓名" prop="empName">
							<el-input disabled v-model="state.ruleForm.empName" placeholder="请输入员工姓名" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="资料类型" prop="dataType">
							<el-select v-model.trim="state.ruleForm.dataType" style="width: 100%" placeholder="请选择" filterable>
								<el-option
									v-for="(label, value) in state.literatureTypesDataSource"
									:key="'archives_add_electronic_dataType_' + value"
									:label="label"
									:value="value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="附件" prop="attaInfo">
							<attach-upload-vue
								ref="attachUploadRef"
								:file-list="state.fileList"
								@removefile="removeFile"
								@changefile="chengeFile"
								:type="8"
								filePath="degreefileList"
								:domain="state.id"
							>
							</attach-upload-vue>
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

<script setup name="addElectronic">
import { getElectronic, addElectronic, updateElectronic } from '/@/api/electronic';
import { ElMessage } from 'element-plus';
import attachUploadVue from '../attach/component/attachUpload.vue';
import PageSelect from '/@/components/PageSelect/index.vue';
import { getFile } from '/@/api/file';
import { getDictByItemTypes } from '/@/utils/utils.js';
import { getStaffList } from '@/api/staff';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '新增电子档案',
	ruleForm: {
		empIdcard: null,
		empName: null,
		dataType: null,
		attaInfo: null,
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],
	loading: false,
});

const rules = {
	empIdcard: [{ required: true, message: '请选择身份证号' }],
	empName: [{ required: true, message: '请输入员工姓名' }],
	dataType: [{ required: true, message: '请选择资料类型' }],
};

const chengeFile = (list) => {
	state.fileList = list.value;
};
const removeFile = (list) => {
	state.fileList = list.value;
};

// 打开弹窗
const openDialog = async (data) => {
	state.loading = false;
	if (data && data.id) {
		// 编辑
		state.title = '编辑电子档案';
		state.fileList = [];
		state.id = data.id;
		await getDetail(data.id);
	} else {
		// 新增
		state.title = '新增电子档案';
		state.fileList = [];
		state.id = null;
		state.ruleForm = {
			empIdcard: null,
			empName: null,
			dataType: null,
			attaInfo: null,
		};

		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	}

	// if (pageSelectRef.value) {
	// 	pageSelectRef.value.refresh(); 
	// }

	getDictByItemTypes('literature_types').then((res) => {
		state.literatureTypesDataSource = res;
	});

	state.isShowDialog = true;
};

const request = async (params) => {
	try {
		const res = await getStaffList(Object.assign({}, params, { fileStatus: 0 }));
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

// 选择员工
const onChangeEmp = (val) => {
	state.ruleForm.empName = val.empName;
	state.ruleForm.empIdcard = val.empIdcard;
	state.options = [val]
};

const getDetail = async (id) => {
	try {
		const res = await getElectronic(id);
		// eslint-disable-next-line no-empty
		if (res && res.code === 200) {
			state.options = [
				{
					...res.data,
				},
			];
			state.ruleForm = res.data;
			// console.log('get options:', state.options, state.ruleForm);
			state.isShowDialog = true;
			// 获取附件信息
			const res1 = await getFile(id);
			if (res1 && res1.code === 200) {
				state.fileList = res1.data.map((item) => {
					item.name = item.attaName;
					item.uid = item.id;
					item.url = item.attaUrl;
					return item;
				});
			} else {
				state.fileList = [];
				ElMessage.error(res1.msg || '获取附件失败');
			}
		} else {
			ElMessage.error(res.msg || '获取电子档案详情失败');
			closeDialog();
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取电子档案详情失败');
	}
};

// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	state.loading = false;
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
				const arr = [];
				state.fileList.forEach((item) => {
					arr.push(item.uid);
				});
				state.ruleForm.attaIds = arr.join(',');

				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateElectronic(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('编辑电子档案成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '编辑电子档案失败');
								}
							},
							() => {
								ElMessage.error('编辑电子档案失败');
							}
						)
						.finally((res) => {
							state.loading = false;
						});
				} else {
					// 新增操作
					addElectronic(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('新增电子档案成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '新增电子档案失败');
								}
							},
							() => {
								ElMessage.error('新增电子档案失败');
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
<style lang="scss" scoped src="./css/addElectronic.scss"></style>
