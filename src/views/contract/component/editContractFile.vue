<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="12" >
						<el-form-item label="申请编号" prop="applyNo">
							{{state.ruleForm.applyNo}}
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="员工姓名" prop="empName">
							{{state.ruleForm.empName}}
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="身份证号" prop="empIdcard">
							{{state.ruleForm.empIdcard}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目名称" prop="subjectDepart">
							{{state.ruleForm.subjectDepart}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="员工类型" prop="empNatrue">
							{{state.dicts['emp_natrue'][state.ruleForm.empNatrue]}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="合同类型" prop="contractName">
							{{state.ruleForm.contractName}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="审核类型" prop="type">
							{{state.dicts['check_type'][state.ruleForm.type]}}
						</el-form-item>
					</el-col>
          <el-divider />
					<el-col :span="12" >
						<el-form-item label="合同编码">
							<el-input  v-model="state.ruleForm.contractNo	" placeholder="请输入合同编码" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="档案柜号">
							<el-input  v-model="state.ruleForm.fileCabinetNo" placeholder="请输入档案柜号" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					
					<el-row :md="24" :lg="24"  :xl="24">
						<el-form-item label="附件">
							<upload-file 
								ref="attachUploadRef"
								:file-list="state.fileList"
								@removefile="removeFile"
								@changefile="chengeFile"
								:type="4"
								filePath="badnessFile"
								:domain="state.ruleForm.id"
							>
							</upload-file>
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

<script setup name="editContractFile">

import {getFile} from '/@/api/file';
import UploadFile from '/@/components/UploadFile/index.vue';
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage } from 'element-plus';
import {getContractDetail,editContractFile} from '/@/api/contract';

const formRef = ref(null);
const attachUploadRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	title: '合同归档',
	ruleForm: {
		id: '',
		contractNo: '',
		fileCabinetNo: '',
		attaList: '',
	},
	fileList:[], //附件
	dictKeys:[  //字典项
		'emp_natrue',//员工类型
		'check_type'
	],
	dicts:[],
});

const rules = {
	// contractNo: [
	// 	{ required: true, message: '请输入合同编号', trigger: 'blur' },
	// 	{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
	// ],
	// fileCabinetNo: [
	// 	{ required: true, message: '请输入档案柜号', trigger: 'blur' },
	// 	{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
	// ]
};

// 打开弹窗
const openDialog = async (row) => {
	if (row && row.id) {
		await getDetail(row.id);
	} 
};

const chengeFile = (list)=>{
	state.fileList = list.value
}
const removeFile = (list)=>{
	state.fileList = list.value
}
const loadDicts = async () => {
	const res = await getDictByItemTypes(state.dictKeys);
	state.dicts = res 
};

// 获取详情
const getDetail = async (id) => {
	try {
		loadDicts()
		const res = await getContractDetail(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.ruleForm = detail;
			state.isShowDialog = true;
		} else {
			ElMessage.error(res.msg || '获取合同详情失败');
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
	}
};

// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm= {
		id: '',
		contractNo: '',
		fileCabinetNo: '',
		attaList: '',
	};
	state.fileList = [];
	state.isShowDialog = false;
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
				const arr = []
				state.fileList.forEach(item=>{
					arr.push(item.uid);
				})
				state.ruleForm.attaList = arr;
				if(!state.ruleForm.contractNo&&!state.ruleForm.fileCabinetNo&&state.fileList.length==0){
					ElMessage.error('合同编码、档案柜号、附件不可同时为空！');
					return;
				}
				state.loading = true;
				if(state.ruleForm.id){
					editContractFile(state.ruleForm).then(res => {
						if (res && res.code == 200) {
							ElMessage.success('合同归档成功');
							emits('ok');
							closeDialog();
						} else {
							ElMessage.error(res.msg || '合同归档失败');
						}
					}).catch(e => {
						console.log('get exception:', e);
						ElMessage.error('合同归档失败');
					}).finally(() => {
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
@import './css/editContractFile.scss'
</style>