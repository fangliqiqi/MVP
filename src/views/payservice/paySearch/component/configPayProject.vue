<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" size="default" label-width="110px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="可见项选择">
							<el-checkbox-group class="checkgroup" v-model="state.ruleForm.detailList">
								<el-checkbox 
									v-for="item in state.salaryItem" 
									:key="item" 
									:label="item"
								>
									{{item}}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
          <el-divider />
					<el-col :span="24">
						<el-form-item label="已选可见项">
							 <draggable
							 	class="draggable"
								v-model="state.ruleForm.detailList"
								group="people" 
								@start="state.drag=true" 
								@end="state.drag=false" 
								item-key="id"
								chosen-class="chosen"
							>
								<template #item="{element}">
									 <el-tag class="eltag" type="info" closable @close="closeTag(element)">{{element}}</el-tag>
								</template>
							</draggable>
							<div class="draggable_bot">
								<el-checkbox  label="1" v-model="state.ruleForm.isZero">不显示空值或为0项</el-checkbox>
								<span>可拖动调整显示顺序</span>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onPre" size="default">预  览</el-button>
					<el-button type="primary" :loading="isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 预览 -->
		<el-dialog title="工资明细" v-model="state.preDialog" width="576px">
			<el-row class="pre_month">{{state.salaryMonth}}</el-row>
			<el-divider/>
			<el-row style="text-align:center;">
				<el-col :span="24" class="pre_momeny">0000.00</el-col>
				<el-col :span="24" class="pre_text">实发工资</el-col>
				<el-divider/>
				<el-col :span="24" v-if="preList.length>0" class="pre_detail">明细</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" v-for="(item,index) in preList" :key="index" class="pre_list">
					<h4>{{item}}</h4>
					<el-divider/>
				</el-col>
			</el-row>

		</el-dialog>
	</div>
</template>

<script setup name="configPagProject">
import pageArea from '/@/components/PageArea/index.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage,ElMessageBox} from 'element-plus';
import {getsalarySheetDetail,saveSalarySheet,delSalarySheet} from '/@/api/payservice/paysearch'; 
import draggable from 'vuedraggable'
import moment from 'moment'

const formRef = ref(null);
const pageAreaRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '工资条配置',
	ruleForm: {
		id: null,
		salaryId: null,
		deptId: null,
		detailList: [],
		isZero:null,
	},
	oldisZero:null,
	salaryItem: [],//配置选项
	salarySet: [],
	drag: false,
	preDialog: false,//预览
	salaryMonth: null,//工资月份
});

// 打开弹窗
const openDialog = async (row) => {
	if(row&&row.id){
		try {
			const res = await getsalarySheetDetail(row.id)
			if(res.code==200){
				state.salaryMonth = moment(row.salaryMonth).format('YYYY年MM月')
				state.isShowDialog = true
				state.salaryItem = sortChinese(res.data.salaryItem)
				state.ruleForm.salaryId = row.id
				state.ruleForm.deptId = row.deptId
				state.ruleForm.isZero = false
				state.oldisZero = false
				if(res.data.salarySet){
					state.salarySet = res.data.salarySet.detailList||[]
					state.ruleForm.id = res.data.salarySet.id
					state.ruleForm.isZero = res.data.salarySet.isZero=='1'?true:false
					state.oldisZero = res.data.salarySet.isZero=='1'?true:false
					const sortFields = res.data.salarySet.detailList.sort((a,b)=>{
						return a.orderLine-b.orderLine
					});
					const temp = []
					sortFields.forEach(item=>{
						const res = state.salaryItem.find(salary=>salary === item.cnName)
						if(res){
							temp.push(item.cnName)
						}
					})
					state.ruleForm.detailList = temp
				}else{
					state.ruleForm.detailList = []
				}
			}else{
				ElMessage.error(res.msg||'获取工资条配置失败')
			}
		} catch (error) {
			ElMessage.error(error.msg||'获取工资条配置失败');
		}	
	}
};

// 排序 根据中文名称排序
const sortChinese = (arr)=>{
	arr.sort(function (item1, item2) {
		return item1.localeCompare(item2, 'zh-CN');
	})
	return arr
};

//删除已选项
const closeTag = (ele)=>{
	state.ruleForm.detailList = state.ruleForm.detailList.filter(item=>String(item)!=String(ele))
}

const getFieldsList = ()=>{
	const arr = []
	state.ruleForm.detailList.map((field,index)=>{
		const res = state.salarySet.find(item=>item.cnName==field)
		if(res){
			arr.push({...res,...{orderLine:index}}) 
		}else{
			arr.push({cnName:field,orderLine:index}) 
		}
		
	})
	return arr
}


// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm= {
		id: null,
		salaryId: null,
		deptId: null,
		detailList: [],
		isZero:null,
	}
	state.salarySet = []
	state.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['ok']);

//预览
const onPre = ()=>{
	state.preDialog = true
}
const preList = computed(()=>{
	if(state.ruleForm.detailList.length>0){
		return state.ruleForm.detailList
	}else{
		return state.salaryItem
	}
})
const isShowLoading = ref(false)
// 保存
const onSubmit = () => {
	formRef.value.validate((valid) => {
		if (valid) {
			isShowLoading.value = true
			if(state.ruleForm.detailList.length==0&&!state.ruleForm.isZero){
				if(state.salarySet.length>0||state.oldisZero){
					const text = `<p style="font-size:16px;font-weight:600">是否清空配置?<br/>
					<span style="color:red;font-size:14px;font-weight:400">清空后,新建项目配置将默认获取本项目的上一个配置！</span></p>`;
					ElMessageBox.confirm(text, {
						type: 'warning',
						dangerouslyUseHTMLString: true,
					}).then( async()=>{
						let res = await delSalarySheet(state.ruleForm.id)
						if(res.code==200){
							ElMessage.success('配置成功')
							closeDialog()
						}else{
							ElMessage.error(res.msg||'配置失败')
							closeDialog()
						}
						isShowLoading.value = false
					}).catch((err)=>{
						isShowLoading.value = false
					})
				}else{
					isShowLoading.value = false
					ElMessage.success('配置成功')
					closeDialog()
				}
			}else{
				const data = {
					id:state.ruleForm.id,
					salaryId:state.ruleForm.salaryId,
					deptId:state.ruleForm.deptId,
					detailList:getFieldsList(),
					isZero:state.ruleForm.isZero?'1':'0'
				}
				saveSalarySheet(data).then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success(res.msg||'配置成功');
							emits('ok');
							closeDialog();
						} else {
							ElMessage.error(res.msg || '配置失败');
						}
					},
					() => {
						ElMessage.error('配置失败');
					}
				).catch().finally(()=>{
					isShowLoading.value = false
				});
			}
		}
	});
};


onMounted(()=>{
	
})

// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped src="./css/configPayProject.scss">


</style>
