<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="选择员工" prop="empName">
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
							<el-input  v-model="state.ruleForm.empIdcard" placeholder="身份证号" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="产生项目" prop="project">
							<el-select v-model="state.ruleForm.project" 
								placeholder="请选择项目" 
								clearable
								filterable
								style="width: 100%;"
								@change="onChangeProject"
								:disabled="(state.projectList.length==0||state.id)?true:false"
							>
								<el-option 
									v-for="item in state.projectList" 
									:key="item.value" 
									:label="item.label" 
									:value="item"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="项目编码" >
							<el-input  v-model="state.ruleForm.projectCode" placeholder="项目编码" disabled></el-input>
						</el-form-item>
					</el-col>
          <el-col :md="12" :lg="12"  :xl="12">
						<el-form-item label="发生时间" prop="happenTime">
							<el-date-picker
								v-model="state.ruleForm.happenTime"
								type="date"
								placeholder="请选择发生时间"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
								:disabled-date="disabledstartDate"
								></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="费用损失" 
							prop="loseFee"
							:rules="rulesloseFree"
						>
							<el-input  v-model="state.ruleForm.loseFee" placeholder="请输入费用损失" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="12" :lg="12"  :xl="12" >
						<el-form-item label="其他损失" 
							prop="loseFeeOther"
							:rules="rulesloseFreeOther"
							>
							<el-input  v-model="state.ruleForm.loseFeeOther" placeholder="请输入其他损失" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :md="24" :lg="24"  :xl="24">
						<el-form-item label="不良记录描述" prop="remark">
							<el-input type="textarea"  v-model="state.ruleForm.remark" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入不良记录" show-word-limit maxlength="200" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-row :md="24" :lg="24"  :xl="24">
						<el-form-item label="附件">
							<attach-upload-vue 
								ref="attachUploadRef"
								:file-list="state.fileList"
								@removefile="removeFile"
								@changefile="chengeFile"
								:type="3"
								filePath="badnessFile"
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

<script setup name="addBadness">
import {getStaffList} from '@/api/staff'
import {addBadness,getBadnessDetail,updateBadness,getProjectListByidCard} from '@/api/attach'
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
	title: '新增不良记录',
	ruleForm: {
		empId: '',
		empName: '',
		empIdcard: '',
		project: '',
		projectCode: '',
		happenTime: '',
		loseFee: '',
		loseFeeOther: '',
		remark: '',
		attaIds: '',
	},
	fileList:[], //附件
	options: [],
	projectList: [],//项目列表
});

const rules = {
	empName: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	project: [
		{ required: true, message: '请选择项目', trigger: 'change' },
	],
	happenTime: [
		{ required: true, message: '请选择发生时间', trigger: 'blur' },
	],
	remark: [
		{ required: true, message: '请输入不良记录', trigger: 'blur' },
	],
}


const rulesloseFree = computed(()=>{
	if(!state.ruleForm.loseFeeOther){
		return [
				{ required: true, message: '请输入费用损失', trigger: 'blur' },
				{ pattern: /^\d{1,20}(\.\d{1,2})?$/, message: '请输入正确的数字,最多两位小数', trigger: 'blur' },
			]
	}else{
		formRef.value&&formRef.value.clearValidate(['loseFee']);
		return [{ pattern: /^\d{1,20}(\.\d{1,2})?$/, message: '请输入正确的数字,最多两位小数', trigger: 'blur' },]
	}
})

const rulesloseFreeOther = computed(()=>{
	if(!state.ruleForm.loseFee){
		return [
				{ required: true, message: '请输入其他费用损失', trigger: 'blur' },
				{ pattern: /^\d{1,20}(\.\d{1,2})?$/, message: '请输入正确的数字,最多两位小数', trigger: 'blur' },
			]
	}else{
		formRef.value&&formRef.value.clearValidate(['loseFeeOther']);
		return [{ pattern: /^\d{1,20}(\.\d{1,2})?$/, message: '请输入正确的数字,最多两位小数', trigger: 'blur' },]
	}
})


// 打开弹窗
const openDialog = async (row) => {
	if (row && row.id) {
		// 编辑
		state.title = '编辑不良记录';
		state.id = row.id;
		await getDetail(row.id);
	} else {
		// 新增
		state.title = '新增不良记录';
		state.id = null;
		state.ruleForm = {
			empId: '',
			empName: '',
			empIdcard: '',
			project: '',
			projectCode: '',
			happenTime: '',
			loseFee: '',
			loseFeeOther: '',
			remark: '',
			attaIds: ''
		};
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
const onChangeEmp = async (val) =>{
	state.ruleForm.empId = val.id;
	state.ruleForm.empIdcard = val.empIdcard;
	state.projectList = []
	state.ruleForm.project = '';
	state.ruleForm.projectCode = '';
	state.options = [val];
	if(val.empIdcard){
		await getProjectList(val.empIdcard);
	}
	
}
// 获取项目列表
const getProjectList = (id)=>{
	getProjectListByidCard({empIdCard:id}).then(res=>{
		if(res.code == 200){
			for(let item in res.data){
				state.projectList.push({
					label:item,
					value:res.data[item]
				})
			}
			// console.log(state.projectList);
		}else{
			ElMessage.error(res.msg||'获取产生项目列表失败');
		}
	}).catch(err=>{
		ElMessage.error(err.msg||'获取产生项目列表失败');	
	})
}
const onChangeProject = (val)=>{
	// console.log(val);
	state.ruleForm.project = val.label;
	state.ruleForm.projectCode = val.value;
}
// 日期禁用
const disabledstartDate = (date) => {
	return date.getTime() > Date.now();
};


// 编辑时获取详情
const getDetail = async (id) => {
	try {
		const res = await getBadnessDetail(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.options = [{ empIdcard: detail.empIdcard, empName: detail.empName }];
			state.ruleForm = detail;
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取不良记录详情失败');
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
	formRef.value.clearValidate()
	state.ruleForm= {
		empId: '',
		empName: '',
		empIdcard: '',
		project: '',
		projectCode: '',
		happenTime: '',
		loseFee: '',
		loseFeeOther: '',
		remark: '',
		attaIds: '',
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
				if(!state.ruleForm.loseFee&&!state.ruleForm.loseFeeOther){
					ElMessage.warning('费用损失和其他损失不可同时为空');
					return 
				}
				// 校验通过
				state.loading = true;
				const arr = []
				state.fileList.forEach(item=>{
					arr.push(item.uid);
				})
				state.ruleForm.attaIds = arr.join(',');
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateBadness(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑不良记录成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑不良记录失败');
							}
						},
						() => {
							ElMessage.error('编辑不良记录失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addBadness(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增不良记录成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增不良记录失败');
							}
						},
						(e) => {
							// const msg = e.response.data.msg || '新增不良记录失败';
							const msg = (e && e.msg) ||'新增不良记录失败';
							ElMessage.error(msg);
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
<style>
	/* .uploadList .el-upload-list__item.is-success:focus:not(:hover){
  	display: none !important;
	} */
@import './css/comm.scss'
</style>