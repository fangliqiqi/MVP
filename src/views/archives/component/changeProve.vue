<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<ul class="prove_ul">
				<li v-for="(item,index) in state.proveData" :key="index" :class="item.active?'li_active':''" @click="handleChange(item)">
					<img :src="icWord" :alt="item.label">
					<p>{{item.label}}</p>
				</li>
			</ul>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 弹窗 -->
		<prove-form-vue ref="proveformRef" @close="openDialog"/>
	</div>
</template>

<script setup name="changeProve">
import { ElMessage } from 'element-plus';
import icWord from '/@/assets/ic-word.svg';
import proveFormVue from './proveForm.vue';

const proveformRef = ref(null);

const state = reactive({
	isShowDialog: false,
	title: '证明开具',
	id: '',//列表id
	proveData:[    //0 在职 1 离职2劳动合同解除 3调档函4.代缴证明
		{label:'在职证明',value:'0',active:false},
		{label:'离职证明',value:'1',active:false},
		{label:'劳动合同终止（解除）证明',value:'2',active:false},
		{label:'调档函',value:'3',active:false},
		{label:'代缴证明',value:'4',active:false},
	],
	activeItem:{}
});

const handleChange = (item)=>{
	item.active = true;
	state.proveData.forEach(it=>{
		if(it.value!=item.value){
			it.active = false;
		}
	});
	state.activeItem = item;

}

// 打开弹窗
const openDialog = async (data) => {
	state.id=data.id;
	state.isShowDialog = true;	
};


// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.activeItem = {};
	state.proveData = [
		{label:'在职证明',value:'0',active:false},
		{label:'离职证明',value:'1',active:false},
		{label:'劳动合同终止（解除）证明',value:'2',active:false},
		{label:'调档函',value:'3',active:false},
		{label:'代缴证明',value:'4',active:false},
	]
	state.id='';
};

// 取消
const onCancel = () => {
	closeDialog();
};

// 新增
const onSubmit = () => {
	if(state.activeItem&&state.activeItem.value){
		const data = state.activeItem;
		data.id = state.id;
		proveformRef.value.openDialog(data);
		closeDialog();
	}else{
		ElMessage.error('请选择证明开具类型');
	}
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped src="./css/changeProve.scss">

</style>
