<template>
  <div class="job-detail-container">
    <el-dialog
      :title="state.fromdata.title+'---姓名:'+state.fromdata.name"
      v-model="state.fromdata.isShowDialog"
      width="900px"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form :model="state.ruleForm" size="default" label-width="160px">
        <el-row>
          <el-col
            v-for="(item, index) in state.fromdata.config"
            :key="index"
            :span='8'
          >
            <el-form-item v-if="item.tooltip" :label="item.label">
              <el-tooltip
                placement="top"
                :popper-class="item.size?`tooltip_conent_24`:`tooltip_conent_12`"
								v-if="state.fromdata.info[item.key]"
              > 
                <template #content> {{ state.fromdata.info[item.key] }}</template>
                <span class="tooltip">{{ state.fromdata.info[item.key] }}</span>
              </el-tooltip>
              <span v-else> -- </span>
            </el-form-item>
            <el-form-item :label="item.label" v-else>
              {{ state.fromdata.info[item.key] || "--" }}
            </el-form-item>

       
          </el-col>
        </el-row>
        
      </el-form>
      <template #footer>
        <span class="dialog-footer"> </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="attachDetailDialog">
import { ElMessage } from 'element-plus';
const state = reactive({
  fromdata: {
    title: "",
    isShowDialog: false,
    info: null,
    size: 12,
    config: [], // 展示的字段名
		fileList:[],//附件信息
    name:""
  },
});

// 关闭弹窗
const closeDialog = () => {
  state.fromdata.isShowDialog = false;
  state.fromdata.fileList = []
};

// 取消
const onCancel = () => {
  closeDialog();
};

const openDialog = async (item, title,file, config = []) => {
  // 打开弹窗
  state.fromdata.info = item;
  state.fromdata.config = config;
  state.fromdata.title = title;
  state.fromdata.isShowDialog = true;
  state.fromdata.name = item.name
};

// 暴露变量
defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped src="./css/attachDetail.scss"></style>

<style>
.tooltip_conent_24{
  max-width:640px;
}
.tooltip_conent_12{
  max-width:320px;
}
</style>
