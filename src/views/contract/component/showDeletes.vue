<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="740px" @close="closeDialog">
			<div style="padding:0 20px">
        <ul>
          <li v-for="(item,index) in state.data" :key="index">
            <p v-if="item.result==1" style="color:green">申请编号:{{item.mainName}}-成功</p>
            <p v-else style="color:red">申请编号:{{item.mainName}}-失败 <span>（原因：{{item.errorInfo}}）</span></p>
          </li>
        </ul>
      </div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="onCancel" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="showDeletes">

const state = reactive({
	isShowDialog: false,
	title: '批量删除结果反馈',
	data:[],//删除反馈数据
});

// 打开弹窗
const openDialog = async (row,type) => {
  state.data = row;
	state.isShowDialog = true;
	state.title = type || '批量删除结果反馈';
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
  state.data = [];
};
const emits = defineEmits(['ok']);
// 取消
const onCancel = () => {
	closeDialog();
  emits('ok');
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped>
 ul li{
  list-style-type: circle;
 }

</style>

