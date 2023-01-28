<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="600px" @close="closeDialog" :close-on-click-modal="false">
      <el-form :model="state.saveFilterForm" ref="saveFilterForm" label-width="100px" :rules="state.saveFilterRules">
        <el-form-item label="名称" prop="name">
          <el-input 
            v-model="state.saveFilterForm.name"
            maxlength="10"
            placeholder="请拟定一个筛选器名称">
          </el-input>
        </el-form-item>
      </el-form>
			<template #footer>
				<span class="dialog-footer">
					<div>
						<el-button @click="closeDialog" size="default">取 消</el-button>
						<el-button 
							type="primary" 
							@click="handleSave" 
							size="default" 
							:disabled="!state.saveFilterForm.name" 
							:loading="state.saveLoading"
						>确  定</el-button>
					</div>
				</span>
			</template>
		</el-dialog>
		
	</div>
</template>

<script setup>

	const state = reactive({
    isShowDialog: false,
    title:'保存导出筛选',
    saveFilterForm: {
      name: '',
    },
    saveFilterRules: {
      name: [
        { required: true, message: '请输入筛选名称', trigger: 'blur' }
      ],
    },
    saveLoading: false,
  })

  const saveFilterForm = ref(null)

	// 打开弹窗
  const openDialog = () => {
    state.isShowDialog = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    saveFilterForm.value.resetFields()
    state.isShowDialog = false
    state.saveFilterForm.name = ''
    closeLoading()
  }

  // 关闭loading
  const closeLoading = () => {
    state.saveLoading = false
  }


  // 传递给父组件的参数
  const emits = defineEmits(['save'])

  // 保存
  const handleSave = async () => {
    state.saveLoading = true
    const name = state.saveFilterForm.name
    emits('save', name)
    
  }

  //暴露出去
  defineExpose({
    openDialog,
    closeDialog,
    closeLoading,
  })

</script>
<style lang="scss" scoped src="./css/save.scss"></style>
