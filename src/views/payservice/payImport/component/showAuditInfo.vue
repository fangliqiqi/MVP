<template>
	<div class="system-add-dic-container"> 
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" size="default" label-width="130px">
				<el-row  v-for="(item,index) in state.remarkList" :key="index" class="remarkList">
					<el-col :span="24" v-if="state.ruleForm[item.show]>0||item.type=='11'">
						<div class="title">
							<span>{{item.title}}</span>
						</div>
							<el-form-item :label="el" v-for="(el,k) in item.showList" :key="k">
							<el-tooltip
								placement="top"
								popper-class="tooltip_remark"
							> 
								<template #content> {{state.ruleForm[k]}}</template>
								<span class="remark">{{state.ruleForm[k]}}</span>
							</el-tooltip>
							</el-form-item>
							<el-form-item label="附件:">
								<div>
									<a	
									v-for="(file,i) in item.fileList"
									:href="file.attaUrl"  
									:key="i" 
									target="_blank"
									style="display:block">
									{{file.attaName}}
									</a>
								</div>
							</el-form-item>
								
								 
								
							<!-- <el-divider/> -->
						
					</el-col>
					
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">审 核</el-button>
				</span>
			</template>
		</el-dialog>
		
	</div>
</template>

<script setup>
import {getFile} from '/@/api/file';
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';


const formRef = ref(null);
const auditPayRef = ref(null);

const state = reactive({
	isShowDialog: false,
	title: '审核',
	ruleForm: {},
	remarkList:[          										
		{
			title:'薪资原表',
			type:11,
			showList:{
				remark:"说明:",
			},
			fileList:[],
		},
		{
			title:'自有员工发放说明(工资表中存在自有员工)',
			showList:{
				ownNums:'自有员工数:',
				ownMoney:'应发金额合计:',
				ownRemark:'发放原因:',
			},
			show:'ownNums',
			type:8,
			fileList:[],
		},
		{
			title:'重复金额发放原因说明',
			showList:{
				repeatRemark:'发放原因:',
			},
			show:'isRepeat',
			type:14,
			fileList:[],
		},
		{
			title:'特殊值(3500/5000)发放说明',
			showList:{
				haveSpecialRemark:'发放原因:',
			},
			type:13,
			show:'haveSpecialFlag',
			fileList:[],
		},
		{
			title:'薪资员工发放稿费/劳务费说明',
			showList:{
				haveSalaryRemark:'发放原因:',
			},
			type:12,
			show:'haveSalaryFlag',
			fileList:[],
		},
		
		
	]
});

	
// 打开弹窗
const openDialog = async (row) => {
	if (row) {
		state.remarkList.map(item=>{
			item.fileList=[]
		})
		state.ruleForm = Object.assign({}, row);
		await getDetail(row.id)
		state.isShowDialog = true;
	} 
};
// 获取详情附件
const getDetail = async (id) => {
	try {
		const res1 = await getFile(id);
		if (res1 && res1.code === 200) {
			const arr = []
			res1.data.map(item=>{
				state.remarkList.map(re=>{
					if(re.type==item.relationType){
						re.fileList.push(item)
					}
				})
			})
		}else{
			state.fileList = {};
			ElMessage.error(res1.msg || '获取附件失败');
		}
	} catch (e) {
		ElMessage.error('获取附件失败');
		console.log('get exception:', e);
		// closeDialog();
	}
};

// 关闭弹窗
const closeDialog = () => {
	// state.ruleForm= {};
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['audit']);

// 审核
const onSubmit = () => {
	emits('audit',state.ruleForm);
	closeDialog();
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped src = './css/showAuditInfo.scss'>	

</style>
<style>
.tooltip_remark{
	max-width: 720px;
}
</style>