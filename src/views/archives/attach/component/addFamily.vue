<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="员工姓名" prop="empName">
							<page-select
								:disabled="state.id?true:false"
								ref="pageSelectRef"
								v-model="state.ruleForm.empName"
								:request="request"
								value-key="empName"
								title="empName"
								search="empName"
								placeholder="请选择员工"
								:options="state.options"
								@change="onChangeEmp"
							/>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="身份证号" prop="empIdcard">
							<el-input v-model="state.ruleForm.empIdcard" placeholder="身份证号" disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="成员姓名" prop="familyName">
							<el-input  v-model="state.ruleForm.familyName" placeholder="请输入成员姓名" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="与本人关系" prop="relationshipSelf">
							<el-select v-model="state.ruleForm.relationshipSelf" 
								placeholder="请选择与本人的关系" 
								clearable
								filterable
								style="width: 100%;"
							>
								<el-option 
									v-for="item in state.relationList" 
									:key="item.value" 
									:label="item.label" 
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="出生日期" prop="birthday">
							<el-date-picker
								v-model="state.ruleForm.birthday"
								type="date"
								placeholder="请选择出生日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledDate"
								></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="工作单位" prop="workUnit">
							<el-input v-model="state.ruleForm.workUnit" placeholder="请输入工作单位" maxlength="100"></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="手机号码" prop="contractTel">
							<el-input v-model="state.ruleForm.contractTel" placeholder="请输入手机号码" maxlength="11"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddDic">
import {getStaffList} from '@/api/staff'
import {addFaily,updatedFaily,getFailyDetail} from '@/api/attach'

import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	loading: false,
	title: '新增家庭信息',
	ruleForm: {
		empId: '',
		empCode:'',
		empIdcard:'',
		empName: '',
		familyName: '',
		relationshipSelf: '',
		birthday: '',
		workUnit: '',
		contractTel: '',
	},
	options: [],
	relationList:[],
});

const rules = {
	empName: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	familyName: [
		{ required: true, message: '请输入成员姓名', trigger: 'blur' },
		{ min: 2, max: 20, message: '成员姓名长度在 2 到 20 个字符', trigger: 'blur' },
	],
	relationshipSelf: [
		{ required: true, message: '请选择与本人的关系', trigger: 'change' },
	],
	contractTel: [
		{ required: true, message: '请输入手机号码', trigger: 'blur' },
		{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
	],
};

// 打开弹窗
const openDialog = async (row,data) => {
	state.relationList = data
	state.loading = false;
	if (row && row.id) {
		// 编辑
		state.title = '编辑家庭信息';
		state.id = row.id;
		await getDetail(row.id);
	} else {
		// 新增
		state.title = '新增家庭信息';
		state.id = null;
		state.ruleForm = {
			empId: '',
			empCode:'',
			empIdcard: '',
			empName: '',
			familyName: '',
			relationshipSelf: '',
			birthday: '',
			workUnit: '',
			contractTel: '',
		};
		// console.log(pageSelectRef.value);
		state.isShowDialog = true;
	}
	
	
};

// 获取员工列表
const request = async (params) => {
	try {
		params.fileStatus=0
		const res = await getStaffList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}else{
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
const onChangeEmp = (val) =>{
	state.ruleForm.empCode = val.empCode;
	state.ruleForm.empId = val.id;
	state.ruleForm.empIdcard = val.empIdcard;
	state.options = [val]
}
// 出生日期禁用
const disabledDate = (date) => {
	return date.getTime() > Date.now();
};

// 编辑时获取详情
const getDetail = async (id) => {
	try {
		const res = await getFailyDetail(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.options = [{ empIdcard: detail.empIdcard, empName: detail.empName }];
			state.ruleForm = detail;
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取家庭信息详情失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取家庭信息详情失败');
	}
};

// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm = {
		empId: '',
		empCode:'',
		empIdcard:'',
		empName: '',
		familyName: '',
		relationshipSelf: '',
		birthday: '',
		workUnit: '',
		contractTel: '',
	};
	state.isShowDialog = false;
	state.id = null;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
const emits = defineEmits(['ok']);
// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updatedFaily(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑家庭信息成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '编辑家庭信息失败');
							}
						},
						() => {
							ElMessage.error('编辑家庭信息失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addFaily(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增家庭信息成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增家庭信息失败');
							}
						},
						() => {
							ElMessage.error('新增家庭信息失败');
						}
					).finally(() => {
						state.loading = false;
					});
				}
			}
		});
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
