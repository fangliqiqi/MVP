<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row v-for="(item,index) in subList" :key="index">
					<el-col :span="24">
						<el-form-item :label="item.remarkLabel" :prop="item.remark!='remark'?item.remark:''">
							<el-input  
                type="textarea" 
                v-model="state.ruleForm[item.remark]"
                :autosize="{ minRows: 2, maxRows: 4 }" 
                :placeholder="`请输入${item.remarkLabel}`"
                show-word-limit 
                maxlength="200" 
                clearable 
              ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" class="file">
						<el-form-item :label="item.filelabel" :prop="item.show=='haveRemark'?'haveRemark':''">
							<upload-file 
								ref="attachUploadRef"
								:file-list="state.fileList[item.type]"
								@removefile="(val)=>removeFile(val,item)"
								@changefile="(val)=>chengeFile(val,item)"
								:type="item.type"
								:size="item.size||5"
								filePath="payservice"
								:domain="state.ruleForm.id"
							>
							</upload-file>
						</el-form-item>
					</el-col>
          <el-col v-if="item.title">
            <el-form-item>
							<span class="tips"><el-icon :size="14" style="margin-right:5px"><Warning /></el-icon>{{item.title}}</span>
						</el-form-item>
          </el-col>
					<el-divider v-if="subList.length!=1"/>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary"  :loading="isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import {getFile} from '/@/api/file';
import UploadFile from '/@/components/UploadFile/index.vue';
import { ElMessage } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import {submitpayImport} from '/@/api/payservice/payimport'

const formRef = ref(null);
const attachUploadRef = ref(null);

const state = reactive({
	isShowDialog: false,
	title: '提交',
	ruleForm: {},
	fileList:{
		11:[], //薪资原表
		8:[], //自有员工
		14:[],  //重复数据
		13:[],  //特殊值
		12:[], //劳务费稿酬
	}, //附件
	dictKeys:[]//字典项
});

const rules = {
	haveRemark: [
		{ required: true, message: '请上传薪资原表', trigger: 'change' },
	],
	haveSalaryRemark:[
		{ required: true, message: '请输入发放原因', trigger: 'change' },
	],
	haveSpecialRemark:[
		{ required: true, message: '请输入发放原因', trigger: 'change' },
	],
	ownRemark:[
		{ required: true, message: '请输入发放原因', trigger: 'change' },
	],
	repeatRemark:[
		{ required: true, message: '请输入发放原因', trigger: 'change' },
	],

};

// 打开弹窗
const openDialog = async (row) => {
	if (row) {
		state.ruleForm = Object.assign({}, row);
		await getDetail(row.id)
		state.isShowDialog = true;
	} 
  
};

// 根据条件展示需要上传的数据
const subList = computed(()=>{
	/*
	*remark 薪资原表 11
	*haveSalaryFlag  haveSalaryRemark发薪 "劳务费、稿酬是否含有发薪0：否；1：是"  12
	*haveSpecialFlag  haveSpecialRemark 是否含有特殊金额0：否；1：是")   13
	*ownNums ownRemark 自有员工 默认0    8
	*isRepeat  repeatRemark 重复   14
	*/

	const oldPay = [
		{
			filelabel:'薪资原表',
			type:11,
			size:50,
			remark:'remark',
			show:'haveRemark',
			remarkLabel:'说明',
			fileList:[]
		}
	]
	const sub = [
		{
			filelabel:'附件',
			type:8,
			remark:'ownRemark',
			remarkLabel:'发放原因',
			show:'ownNums',
			fileList:[],
			title:'表单中包含自有员工，请补充描述相关信息！'
		},
		{
			filelabel:'附件',
			type:14,
			remark:'repeatRemark',
			remarkLabel:'发放原因',
			show:'isRepeat',
			fileList:[],
			title:'表单中包含重复金额数据，请补充描述相关信息！'
		},
		{
			filelabel:'附件',
			type:13,
			remark:'haveSpecialRemark',
			remarkLabel:'发放原因',
			show:'haveSpecialFlag',
			fileList:[],
			title:'表单中包含员工当月发薪特殊值 (3500或者5000)，请补充描述相关信息！'
		},
		{
			filelabel:'附件',
			type:12,
			remark:'haveSalaryRemark',
			remarkLabel:'发放原因',
			show:'haveSalaryFlag',
			fileList:[],
			title:'表单中包含发薪员工发放稿酬和劳务费情况，请补充描述相关信息！'
		},
	]
	const arr = [];
	sub.forEach(item=>{
		if(state.ruleForm[item.show] >= 1){
			arr.push(item);
		}
	})
	return [...oldPay,...arr];
});
	
const chengeFile = (list,item)=>{
	state.fileList[item.type] = list.value
	if(item.type=='11'){
		state.ruleForm.haveRemark = list.value;
		formRef.value.validateField(['haveRemark'])
	}
}
const removeFile = (list,item)=>{
	state.fileList[item.type] = list.value
	if(item.type=='11'){
		state.ruleForm.haveRemark = list.value;
		formRef.value.validateField(['haveRemark'])
	}
}

// 获取详情
const getDetail = async (id) => {
	try {
		const res1 = await getFile(id);
		if (res1 && res1.code === 200) {
			const arr = []
			res1.data.map(item=>{
				arr.push({
					name:item.attaName,
					uid:item.id,
					url:item.attaUrl,
					type:Number(item.relationType) 
				})
			})
			if(arr.length>0){
				state.fileList = arr.reduce((prev,cur)=>{
					if(prev[cur.type]){
						prev[cur.type].push(cur)
					}else{
						prev[cur.type] = [cur]
					}
					return prev
				},{})
			}else{
				state.fileList = {
					8:[],
					11:[],
					12:[],
					13:[],
					14:[]
				}
			}
			state.ruleForm.haveRemark = state.fileList['11'] ? state.fileList['11']: []
		}else{
			state.fileList = {
				11:[],
				12:[],
				13:[],
				8:[],
				14:[]
			};
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
		ownNums:0,
		isRepeat:0,
		haveSpecialFlag:0,
		haveSalaryFlag:0,
		haveRemark:[],
		ownRemark:'',
		repeatRemark:'',
		haveSpecialRemark:'',
		haveSalaryRemark:'',
	};
	state.fileList = {
		11:[],
		12:[],
		13:[],
		8:[],
		14:[]
	};
	state.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
const emits = defineEmits(['ok']);
const isShowLoading  = ref(false)
// 保存
const onSubmit = () => {
	formRef.value.validate((valid) => {
			if (valid) {
				isShowLoading.value=true
				// 校验通过
				const data = {
					id:state.ruleForm.id,
					remark:state.ruleForm.remark,
					haveSalaryRemark:state.ruleForm.haveSalaryRemark,
					haveSpecialRemark:state.ruleForm.haveSpecialRemark,
					ownRemark:state.ruleForm.ownRemark,
					repeatRemark:state.ruleForm.repeatRemark,
				}
				// console.log(data);
				submitpayImport(data).then(res => {
					if (res && res.code == 200) {
						ElMessage.success(res.msg||'提交成功');
						emits('ok');
						closeDialog();
					} else {
						ElMessage.error(res.msg || '提交失败');
					}
				}).catch(e => {
					console.log('get exception:', e);
					ElMessage.error('提交失败');
				}).finally(()=>{
					isShowLoading.value=false
				});
			}
		});
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped src="./css/submitPay.scss"></style>
<style>
	.uploadList .el-upload-list__item.is-success:focus:not(:hover){
  	display: none !important;
	}

</style>