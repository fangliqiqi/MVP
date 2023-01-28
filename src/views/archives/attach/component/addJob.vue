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
						<el-form-item label="身份证号" >
							<el-input disabled   v-model="state.ruleForm.empIdcard" placeholder="身份证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="工作单位" prop="workUnit">
							<el-input  v-model="state.ruleForm.workUnit" placeholder="请输入工作单位" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="工作部门" prop="workDepart">
							<el-input  v-model="state.ruleForm.workDepart" placeholder="请输入工作部门" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="工作岗位" prop="workJob">
							<el-input  v-model="state.ruleForm.workJob" placeholder="请输入工作岗位" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="工作类型" prop="workingType">
							<el-select v-model="state.ruleForm.workingType" 
								placeholder="请选择工作类型" 
								clearable
								filterable
								style="width: 100%;"
							>
								<el-option 
									v-for="item in state.workTypeList" 
									:key="item.value" 
									:label="item.label" 
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="在职状态" prop="workingStatus">
							<el-radio-group v-model="state.ruleForm.workingStatus">
								<el-radio  label="0">在职</el-radio>
								<el-radio  label="1">离职</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="开始工作日期" prop="startDate">
							<el-date-picker
								v-model="state.ruleForm.startDate"
								type="date"
								placeholder="请选择开始工作日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledstartDate"
								></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="结束工作日期" prop="endDate">
							<el-date-picker
								v-model="state.ruleForm.endDate"
								type="date"
								placeholder="请选择结束工作日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledendDate"
								></el-date-picker>
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
import {addJob,updateJob,getJobDetail} from '@/api/attach'

import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	id: null, // 编辑时存在
	title: '新增工作记录',
	ruleForm: {
		empId: '',
		empCode: '',
		empIdcard: '',
		empName: '',
		workUnit: '',
		workDepart: '',
		workJob: '',
		workingType: '',
		workingStatus:"1",
		startDate: '',
		endDate: '',
	},
	options: [],
	workTypeList:[],
});

const rules = {
	empName: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	workUnit: [
		{ required: true, message: '请输入工作单位', trigger: 'blur' },
	],
	workDepart: [
		{ required: true, message: '请输入工作部门', trigger: 'blur' },
	],
	workingStatus: [
		{ required: true, message: '请选择在职状态', trigger: 'blur' },
	],
	startDate: [
		{ required: true, message: '请选择开始工作日期', trigger: 'blur' },
	],
};

// 打开弹窗
const openDialog = async (row,data) => {
	state.workTypeList = data
	if (row && row.id) {
		// 编辑
		state.title = '编辑工作记录';
		state.id = row.id;
		await getDetail(row.id);
	} else {
		// 新增
		state.title = '新增工作记录';
		state.id = null;
		state.ruleForm = {
			empId: '',
			empCode: '',
			empIdcard: '',
			empName: '',
			workUnit: '',
			workDepart: '',
			workJob: '',
			workingType: '',
			workingStatus:"1",
			startDate: '',
			endDate: '',
		};
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
// 日期禁用
const disabledstartDate = (date) => {
	return date.getTime() > Date.now();
};
// 日期禁用
const disabledendDate = (date) => {
	if(state.ruleForm.startDate){
		return date.getTime() < Date.parse(state.ruleForm.startDate);
	}else{
		return true
	}
};


// 编辑时获取详情
const getDetail = async (id) => {
	try {
		const res = await getJobDetail(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.options = [{ empIdcard: detail.empIdcard, empName: detail.empName }];
			state.ruleForm = detail;
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取工作记录详情失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取工作记录详情失败');
	}
};

// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields()
	state.ruleForm = {
		empId: '',
		empCode: '',
		empIdcard: '',
		empName: '',
		workUnit: '',
		workDepart: '',
		workJob: '',
		workingType: '',
		workingStatus:"1",
		startDate: '',
		endDate: '',
	}
	state.isShowDialog = false;
	state.id = null;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
const emits = defineEmits(['ok']);

// 保存
const onSubmit = () => {
	
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateJob(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑工作记录成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '编辑工作记录失败');
							}
						},
						() => {
							ElMessage.error('编辑工作记录失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addJob(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增工作记录成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增工作记录失败');
							}
						},
						() => {
							ElMessage.error('新增工作记录失败');
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

