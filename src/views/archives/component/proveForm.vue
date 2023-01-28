<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form :model="state.ruleForm" ref="formRef" :rules="rules" label-width="130px" :inline="false" size="default">
					<!-- 在职证明信息 -->
				<el-row v-if="state.type==0">
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcard" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="projectName">
							<el-input v-model="state.ruleForm.projectName"  placeholder="输入单位名称" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="就职岗位" prop="post">
							<el-input v-model="state.ruleForm.post" placeholder="输入就职岗位" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="合同开始时间" prop="firstContractTime">
							<el-date-picker 
								v-model="state.ruleForm.firstContractTime" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择合同开始时间"
								style="width: 100%;"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="合同结束时间" prop="contractEnd">
							<el-date-picker 
								v-model="state.ruleForm.contractEnd" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择合同结束时间"
								style="width: 100%;"
								:disabled-date="disabledcontractEnd"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="印章名称" prop="seal">
							<el-input v-model.trim="state.ruleForm.seal" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开具证明当天时间">
							<el-input v-model="state.ruleForm.openTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 离职证明信息 -->
				<el-row v-if="state.type == 1">
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcard" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="projectName">
							<el-input v-model="state.ruleForm.projectName" placeholder="输入单位名称" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="就职岗位" prop="post" >
							<el-input v-model="state.ruleForm.post" maxlength="50" placeholder="输入就职岗位 "></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="派减离职时间" prop="leaveTime">
							<el-date-picker 
								v-model="state.ruleForm.leaveTime" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择派减离职时间"
								style="width: 100%;"
							>
							</el-date-picker>	
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="派减离职原因" prop="leaveReason">
							<el-input v-model="state.ruleForm.leaveReason" maxlength="50" placeholder="输入派减离职原因"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="印章名称" prop="seal">
							<el-input v-model.trim="state.ruleForm.seal"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开具证明当天时间">
							<el-input v-model="state.ruleForm.openTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!--劳动合同终止(解除)信息-->
				<el-row v-if="state.type==2">
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcard" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="来我单位时间" prop="entryTime">
							<el-date-picker 
								v-model="state.ruleForm.entryTime" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择来我单位时间"
								style="width: 100%;"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="签订合同时间" prop="firstContractTime">
							<el-date-picker 
								v-model="state.ruleForm.firstContractTime" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择签订合同时间"
								style="width: 100%;"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="派单离职原因" prop="leaveReason">
							<el-input v-model="state.ruleForm.leaveReason" maxlength="50" placeholder="输入派单离职原因"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" >
							<el-input v-model="state.dict.prove_peo_sex[state.ruleForm.sex]" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="印章名称" prop="seal">
							<el-input v-model.trim="state.ruleForm.seal" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开具证明当天时间">
							<el-input v-model="state.ruleForm.openTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 调档函信息 -->
				<el-row v-if="state.type==3">
					<el-col :span="24">
						<el-form-item label="介绍单位">
							<el-input v-model.trim="state.ruleForm.introductionUnit" maxlength="50" placeholder="输入介绍单位"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcard" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="印章名称" prop="seal">
							<el-input v-model.trim="state.ruleForm.seal"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开具证明当天时间">
							<el-input v-model="state.ruleForm.openTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 代缴证明信息 -->
				<el-row v-if="state.type==4">
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcard" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="参保开始时间" prop="socialTime">
							<el-date-picker 
								v-model="state.ruleForm.socialTime" 
								type="date" 
								value-format="YYYY-MM-DD 00:00:00" 
								placeholder="选择参保开始时间"
								style="width: 100%;"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="projectName">
							<el-input v-model="state.ruleForm.projectName" maxlength="50" placeholder="输入单位名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="印章名称" prop="seal">
							<el-input v-model.trim="state.ruleForm.seal"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开具证明当天时间" >
							<el-input v-model="state.ruleForm.openTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">生成证明</el-button>
				</span>
			</template>
		</el-dialog>

		<prove-pdf-vue ref='provePdfRef'/>

	</div>
</template>

<script setup name="changeProve">

import { ElMessage } from 'element-plus';
import moment	from 'moment';
import {getProveByid,addProve} from '@/api/prove';
import {getDictByItemTypes} from '/@/utils/utils.js';
import provePdfVue from './provePdf.vue';



const formRef = ref(null)
const provePdfRef = ref(null)


const state = reactive({
	isShowDialog: false,
	loading: false,
	title: '',
	type: '',
	id:'',
	ruleForm:{
		empName:'',
		empIdcard:'',
		empId:'',
		empCode:'',
		projectName:'',
		post:'',
		contractStart:'',
		contractEnd:'',
		seal:'安徽皖信人力资源管理有限公司（章）',
		openTime:moment().format('YYYY-MM-DD HH:mm:ss'),
		leaveTime:'',
		leaveReason:'',
		entryTime:'',
		firstContractTime:'',
		sex:'',
		introductionUnit:'',
		socialTime:'',
		type:''
	},
	dict:{
		prove_peo_sex:null
	}
});

// 规则校验
const rules = {
	projectName:[
		{ required: true, message: '请输入单位名称', trigger: 'blur' }
	],
	post:[
		{ required: true, message: '请输入就职岗位', trigger: 'blur' }
	],
	firstContractTime:[
		{ required: true, message: '请选择合同开始时间', trigger: 'change' }
	],
	contractEnd:[
		{ required: true, message: '请输入合同结束时间', trigger: 'blur' }
	],
	leaveTime:[
		{ required: true, message: '请输入派减离职时间', trigger: 'blur' }
	],
	leaveReason:[
		{ required: true, message: '请输入离职原因', trigger: 'blur' }
	],
	entryTime:[
		{ required: true, message: '请输入来我单位时间', trigger: 'blur' }
	],
	firstContractTime:[
		{ required: true, message: '请输入签订合同时间', trigger: 'blur' }
	],
	introductionUnit:[
		{ required: true, message: '请输入介绍单位', trigger: 'blur' }
	],
	socialTime:[
		{ required: true, message: '请输入参保开始时间', trigger: 'blur' }
	],
	seal:[
		{ required: true, message: '请输入印章名称', trigger: 'blur' }
	]

}

// 打开弹窗
const openDialog = async (data) => {
	state.title = data.label+'信息'
	state.type = data.value
	state.id = data.id
	await getData(data.id)
	
};
// 获取数据信息
const getData = async (id) => {
	getProveByid({id:id}).then(res => {
		if(res.code==200){
			if(res.code==200){
			state.ruleForm = res.data
			// 时间特殊，如果不这样写有可能在第二次点击时不进行校验
			state.ruleForm.contractStart=res.data.contractStart||''
			state.ruleForm.contractEnd=res.data.contractEnd||''
			state.ruleForm.leaveTime=res.data.leaveTime||''
			state.ruleForm.entryTime=res.data.entryTime||''
			state.ruleForm.firstContractTime=res.data.firstContractTime||''
			state.ruleForm.socialTime=res.data.socialTime||''
			state.ruleForm.openTime = moment().format('YYYY-MM-DD HH:mm:ss')
			state.ruleForm.seal = '安徽皖信人力资源管理有限公司（章）'
			state.isShowDialog = true;
		}else{
			state.ruleForm = {}
			ElMessage.error(res.msg||'获取项目档案详情失败');
		}
		}else{
			state.ruleForm = {}
			ElMessage.error(res.msg||'获取项目档案详情失败');
		}
	})
};
const disabledcontractEnd = (date)=>{
	if(state.ruleForm.firstContractTime){
		return date.getTime() < Date.parse(state.ruleForm.firstContractTime);
	}else{
		return true
	}
}

const emits = defineEmits(['close'])
// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	formRef.value.clearValidate();
	state.ruleForm = {
		empName:'',
		empIdcard:'',
		empId:'',
		empCode:'',
		projectName:'',
		post:'',
		contractStart:'',
		contractEnd:'',
		seal:'安徽皖信人力资源管理有限公司（章）',
		openTime:moment().format('YYYY-MM-DD HH:mm:ss'),
		leaveTime:'',
		leaveReason:'',
		entryTime:'',
		firstContractTime:'',
		sex:'',
		introductionUnit:'',
		socialTime:'',
		type:''
	}
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
	const obj = {id:state.id}
	emits('close',obj)
};


// 新增
const onSubmit = () => {
	formRef.value.validate(async (vaild)=>{
		if(vaild){
			// state.loading = true;
			state.ruleForm.type=state.type
			// state.ruleForm.openTime = state.ruleForm.openTime.includes('00:00:00')?
			const data = JSON.parse(JSON.stringify(state.ruleForm))
			addProve(state.ruleForm).then(res => {
				if(res.code==200){
					ElMessage.success('生成证明成功');
					setTimeout(()=>{
						provePdfRef.value.openDialog(data)
					},500)
					closeDialog();
				}else{
					ElMessage.error(res.msg||'生成证明失败');
				}
			}).catch(() => {
				ElMessage.error('生成证明失败');
			}).finally(() => {
				state.loading = false;
			});
		}
	})
};

onMounted(() => {   
	// 请求字典数据
	getDictByItemTypes(['prove_peo_sex']).then((res) => {
		state.dict = res;
		// console.log(state.dict);
	});
});

// 暴露变量
defineExpose({
	openDialog,
});

</script>

