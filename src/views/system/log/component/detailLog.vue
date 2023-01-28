<template>
	<div class="system-add-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="769px" :close-on-click-modal="false">
			<el-form  :model="state.ruleForm"  size="default" label-width="120px">
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="类型">
              {{state.ruleForm.type==9?'异常':'正常'}}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="标题">
							<!-- {{state.ruleForm.title}} -->
							<el-tooltip placement="top" popper-class="tooltip_content" v-if="state.ruleForm.title">
								<template #content> {{state.ruleForm.title}}</template>
								<span class="tooltip">{{state.ruleForm.title}}</span>
							</el-tooltip>
							<span v-else> -- </span>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="IP地址">
							{{state.ruleForm.remoteAddr}}
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="请求方式">
							{{state.ruleForm.method}}
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="服务端">
							{{state.ruleForm.serviceId || '-'}}
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="请求时间">
							{{state.ruleForm.time}}
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="创建时间">
							{{state.ruleForm.createTime}}
						</el-form-item>
					</el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="异常日志">
							<el-tooltip placement="top" popper-class="tooltip_content" v-if="state.ruleForm.exception">
								<template #content> {{state.ruleForm.exception}}</template>
								<span class="tooltip">{{state.ruleForm.exception}}</span>
							</el-tooltip>
							<span v-else> -- </span>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
      <template #footer>
				<span class="dialog-footer">

				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemDetailLog">

const state = reactive({
	isShowDialog: false,
  title:'日志详情' ,
	ruleForm: {},
});


// 打开弹窗
const openDialog = (row) => {
	state.isShowDialog = true;
  state.ruleForm = row;
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>

<style lang="scss" scoped src="./detailLog.scss">
</style>
<style>
	.tooltip_content{
		max-width: 400px;
	}

</style>
