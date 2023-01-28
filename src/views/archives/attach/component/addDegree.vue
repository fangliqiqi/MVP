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
						<el-form-item label="身份证号">
							<el-input disabled v-model="state.ruleForm.empIdcard" placeholder="身份证号" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="学校" prop="school">
							<el-input  v-model="state.ruleForm.school" placeholder="请输入学校" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="院系名称" prop="collageSystem">
							<el-input  v-model="state.ruleForm.collageSystem" placeholder="请输入院系名称" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="专业" prop="major">
							<el-input  v-model="state.ruleForm.major" placeholder="请输入专业" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="学历" prop="educationName">
							<el-select v-model="state.ruleForm.educationName" 
								placeholder="请选择学历" 
								clearable
								filterable
								style="width: 100%;"
							>
								<el-option 
									v-for="item in state.educationList" 
									:key="item.value" 
									:label="item.label" 
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="学历类型" prop="type">
							<el-select v-model="state.ruleForm.type" 
								placeholder="请选择学历类型" 
								clearable
								filterable
								style="width: 100%;"
							>
								<el-option 
									v-for="item in state.educationTypeList" 
									:key="item.value" 
									:label="item.label" 
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="最高学历" prop="highIdentification">
							<el-radio-group v-model="state.ruleForm.highIdentification">
								<el-radio  label="0">是</el-radio>
								<el-radio  label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="入学时间" prop="entryDate">
							<el-date-picker
								v-model="state.ruleForm.entryDate"
								type="date"
								placeholder="请选择入学日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledstartDate"
								></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="毕业时间" prop="gradutionDate">
							<el-date-picker
								v-model="state.ruleForm.gradutionDate"
								type="date"
								placeholder="请选择毕业日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledendDate"
								></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="学制类型" prop="educationSystem">
							<el-select v-model="state.ruleForm.educationSystem" 
								placeholder="请选择学制类型" 
								clearable
								filterable
								style="width: 100%;"
							>
								<el-option 
									v-for="item in state.educationSystemList" 
									:key="item.value" 
									:label="item.label" 
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="证书名称" prop="certificationName">
							<el-input  v-model="state.ruleForm.certificationName" placeholder="请输入证书名称" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="24" :lg="24"  :xl="24">
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea"  v-model="state.ruleForm.remark" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入备注" show-word-limit maxlength="200" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-row :md="12" :lg="12"  :xl="12">
						<el-form-item label="附件">
							<attach-upload-vue 
								ref="attachUploadRef"
								:file-list="state.fileList"
								@removefile="removeFile"
								@changefile="chengeFile"
								:type="0"
								filePath="degreefileList"
								:domain="state.id"
							>
							</attach-upload-vue>
						</el-form-item>
					</el-row>
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
import {addDegree,updateDegree,getDegreeDetail} from '@/api/attach'

import {getFile} from '/@/api/file';
import PageSelect from '/@/components/PageSelect/index.vue';
import attachUploadVue from './attachUpload.vue';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const pageSelectRef = ref(null);
const attachUploadRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	id: null, // 编辑时存在
	title: '新增学历信息',
	ruleForm: {
		empId: '',
		empCode: '',
		empName: '',
		empIdcard: '',
		school: '',
		collageSystem: '',
		major: '',
		educationName: '',
		type: '',
		highIdentification: '0',
		entryDate: '',
		gradutionDate: '',
		educationSystem: '',
		certificationName: '',
		attaIds: '',
		remark: '',
	},
	fileList:[], //附件
	options: [],
	educationList: [],
	educationTypeList: [],
	educationSystemList: [],
});

const rules = {
	empName: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	school: [
		{ required: true, message: '请输入学校', trigger: 'blur' },
		{max: 50, message: '学校长度不能超过50个字符', trigger: 'blur'},
	],
	major: [
		{ required: true, message: '请输入专业', trigger: 'blur' },
		{max: 50, message: '专业长度不能超过50个字符', trigger: 'blur'},
	],
	educationName: [
		{ required: true, message: '请选择学历', trigger: 'change' },
	],
	highIdentification: [
		{ required: true, message: '请选择是否最高学历', trigger: 'blur' },
	],
	entryDate: [
		{ required: true, message: '请选择入学日期', trigger: 'blur' },
	],
	gradutionDate: [
		{ required: true, message: '请选择毕业日期', trigger: 'blur' },
	],
};

// 打开弹窗
const openDialog = async (row,data) => {
	state.educationList = data.educationList;
	state.educationTypeList = data.educationTypeList;
	state.educationSystemList = data.educationSystemList;

	if (row && row.id) {
		// 编辑
		state.title = '编辑学历信息';
		state.id = row.id;
		await getDetail(row.id);
	} else {
		// 新增
		state.title = '新增学历信息';
		state.id = null;
		state.ruleForm = {
			empId: '',
			empCode: '',
			empName: '',
			empIdcard: '',
			school: '',
			collageSystem: '',
			major: '',
			educationName: '',
			type: '',
			highIdentification: '0',
			entryDate: '',
			gradutionDate: '',
			educationSystem: '',
			certificationName: '',
			attaIds: '',
			remark: '',
		};
		// if (pageSelectRef.value) {
		// 	pageSelectRef.value.refresh();
		// }
		state.fileList = [];
		state.isShowDialog = true;
	}
	
};

const chengeFile = (list)=>{
	state.fileList = list.value
}
const removeFile = (list)=>{
	state.fileList = list.value
}


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
	state.ruleForm.empIdcard = val.empIdcard;
	state.ruleForm.empId = val.id;
	state.options = [val];
}
// 日期禁用
const disabledstartDate = (date) => {
	return date.getTime() > Date.now();
};
// 日期禁用
const disabledendDate = (date) => {
	if(state.ruleForm.entryDate){
		return date.getTime() < Date.parse(state.ruleForm.entryDate);
	}else{
		return true
	}
};

// 编辑时获取详情
const getDetail = async (id) => {
	try {
		const res = await getDegreeDetail(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.options = [{ empIdcard: detail.empIdcard, empName: detail.empName }];
			state.ruleForm = detail;
			// console.log(state.options);
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取工作记录详情失败');
		}

		const res1 = await getFile(id);
		if (res1 && res1.code === 200) {
			state.fileList = res1.data.map(item=>{
				item.name= item.attaName
				item.uid = item.id
				item.url = item.attaUrl
				return item
			})
		}else{
			state.fileList = [];
			ElMessage.error(res1.msg || '获取附件失败');
		}

	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		// ElMessage.error('获取工作记录详情失败');
	}
};

// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm = {
		empId: '',
		empCode: '',
		empName: '',
		empIdcard: '',
		school: '',
		collageSystem: '',
		major: '',
		educationName: '',
		type: '',
		highIdentification: '0',
		entryDate: '',
		gradutionDate: '',
		educationSystem: '',
		certificationName: '',
		attaIds: '',
		remark: '',
	}
	state.isShowDialog = false;
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
				const arr = []
				state.fileList.forEach(item=>{
					arr.push(item.uid);
				})
				state.ruleForm.attaIds = arr.join(',');
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateDegree(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑学历信息成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑学历信息失败');
							}
						},
						() => {
							ElMessage.error('编辑学历信息失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addDegree(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增学历信息成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增学历信息失败');
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
<style lang="scss" scoped>
	::v-deep .el-dialog__body{
		max-height: 520px !important;
	}

</style>
<style>
	/* .uploadList .el-upload-list__item.is-success:focus:not(:hover){
  	display: none !important;
	} */
	@import './css/comm.scss'
</style>