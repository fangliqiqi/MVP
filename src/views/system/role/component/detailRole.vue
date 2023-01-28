<template>
	<div class="system-add-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="550px" :close-on-click-modal="false">
			<el-form  :model="state.ruleForm"  size="default" label-width="120px">
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="24" >
						<el-form-item label="角色名称">
							<el-tooltip placement="top" popper-class="tooltip_roleName" v-if="state.ruleForm.roleName">
								<template #content> {{state.ruleForm.roleName}}</template>
								<span class="tooltip">{{state.ruleForm.roleName}}</span>
							</el-tooltip>
							<span v-else> -- </span>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="24" >
						<el-form-item label="角色标识">
							<el-tooltip placement="top" popper-class="tooltip_roleName" v-if="state.ruleForm.roleCode">
								<template #content> {{state.ruleForm.roleCode}}</template>
								<span class="tooltip">{{state.ruleForm.roleCode}}</span>
							</el-tooltip>
							<span v-else> -- </span>
						</el-form-item>
					</el-col>
          <el-col  :xl="24" >
						<el-form-item label="角色描述">
							<el-tooltip placement="top" popper-class="tooltip_role" v-if="state.ruleForm.roleDesc">
								<template #content> {{state.ruleForm.roleDesc}}</template>
								<span class="tooltip">{{state.ruleForm.roleDesc}}</span>
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

<script setup name="systemDetailRole">

const state = reactive({
	isShowDialog: false,
  title:'角色详情' ,
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

<style lang="scss" scoped src="./css/detailRole.scss">

</style>
<style>
	.tooltip_role{
		max-width: 400px;
	}
	.tooltip_roleName{
		max-width: 400px;
	}
</style>
