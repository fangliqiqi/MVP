<template>
	<div class="system-add-dic-container"> 
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false"  width="576px"   @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="审核意见"  prop="auditStatus">
								<el-radio-group v-model="state.ruleForm.auditStatus" @change="changeAuditStatus">
									<el-radio  label="2">通过</el-radio>
									<el-radio  label="3">不通过</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="原因" prop="remark" v-if="state.ruleForm.auditStatus=='3'">
								<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
									<el-option 
										v-for="(item, key) in state.refuseOptions" 
										:label="item" 
										:key="key" 
										:value="item"
									> {{ item }}</el-option>
								</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="说明" 
							prop="auditRemark"
						>
							<el-input 	type="textarea" v-model="state.ruleForm.auditRemark" placeholder="请输入审核意见，不超过150字" show-word-limit maxlength="150"></el-input>
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
			<!-- 批量删除反馈 -->
			<show-deletes-vue ref="showDeletesRef" @ok="refresh"/>
	</div>
</template>

<script setup name="contractCheckDilog">
import { getDictByItemTypes,} from '/@/utils/utils';

import { batchCheckContract } from '/@/api/contract';
import showDeletesVue from './showDeletes.vue';

import { ElMessage, ElSteps } from 'element-plus';
const formRef = ref(null);
const showDeletesRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading : false,
	title: '批量审核',
	ruleForm: {},
	refuseOptions:{},
	selectionChangeList:[],
	ids:[],
	dictKeys: [
		'emp_natrue', 
		'situation_type', 
		'personnel_state', 
		'employee_contract_type', 
		'working_hours', 
		'contract_business_type',
		'dispatch-audit-add-reason',
		'check_type'
	],
});


const rules = computed(() => {
	// state.ruleForm.remark 根据汉字判断是因为后端不想翻译，所以传给后端汉字！！！
	if (state.ruleForm.auditStatus == '3'&&state.ruleForm.remark != '其他') {
		formRef.value.clearValidate(['auditRemark']);
		return {
			auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
			remark: [{ required: true, message: '请选择原因', trigger: 'change' }],
		};
	}
	if(state.ruleForm.remark == '其他'){
		return {
			auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
			auditRemark: [{ required: true, message: '请填写说明', trigger: 'blur' }],
			remark: [{ required: true, message: '请选择原因', trigger: 'change' }],
		};
	}
	return {
		auditStatus: [{ required: true, message: '请选择审核意见', trigger: 'blur' }],
	};
});
// 打开弹窗
const openDialog = async (row) => {
	if(formRef.value) formRef.value.clearValidate();
  state.isShowDialog = true;
	state.loading = false;
	state.selectionChangeList =	JSON.parse(JSON.stringify(row))
	loadDicts(); // 加载字典
};

/**
 * 加载字典值
 */
 const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.refuseOptions = res['dispatch-audit-add-reason']
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

// 关闭弹窗
const closeDialog = () => {
	if(formRef.value) formRef.value.clearValidate();
	state.ruleForm = {};
	state.isShowDialog = false;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 切换tab，重置校验
const changeAuditStatus = ()=>{
	if(formRef.value) formRef.value.clearValidate();
}


const emits = defineEmits(['ok']);
// 新增
const onSubmit = () => {
	if (formRef.value){
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				state.loading = true;
				const auditRemark = state.ruleForm.auditRemark?':'+state.ruleForm.auditRemark:'';
				const data  = {
					auditStatus:state.ruleForm.auditStatus,
					auditRemark:state.ruleForm.auditStatus==2?
											state.ruleForm.auditRemark:
											state.ruleForm.remark+auditRemark,
				}
				const idsArr = []
				state.selectionChangeList.forEach(item=>{
					idsArr.push(item.id)
				})
				const newData = Object.assign({}, data, { ids: idsArr})
        batchCheckContract(newData).then(
          (res) => {
						if(res.code==200&&res.data&&res.data.length>0){
								res.data = res.data.map(e=>{
									e.mainName = e.name
									e.errorInfo = e.message
									e.result = e.color=='green'?1:2
									return e
								})
								showDeletesRef.value.openDialog(res.data,'批量审核结果反馈');
							} else if(res.code==200&&!res.data){
								ElMessage.success('批量操作成功');
							}else{
								ElMessage.error('批量操作失败');
							}
          },
          () => {
            ElMessage.error('批量操作失败');
          }
        ).finally(() => {
					emits('ok');
					closeDialog(); // 关闭弹窗
          state.loading = false;
        });
			}
		});
  }
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
