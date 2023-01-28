<template>
  <div class="job-detail-container">
    <el-dialog
      :title="state.fromdata.title"
      v-model="state.fromdata.isShowDialog"
      width="816px"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-form :model="state.ruleForm" size="default" label-width="120px">
        <el-row>
          <el-col
            v-for="(item, index) in state.fromdata.config"
            :key="index"
						:md="item.size||12"
            :lg="item.size||12"
            :xl="item.size||12"
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

            <div v-else-if="item.file" class="file">
                <div class="file_title">附件</div>
                <div class="file_content" v-if="state.fromdata.fileList.length>0"> 
                  <a 
                    :href="file.url"  
                    v-for="file in state.fromdata.fileList" 
                    :key="file.uid" 
                    target="_blank"
                    style="display:block">
								    {{file.name}}
							    </a>
                </div>
                <span v-else class="file_content2">--</span>
                
            </div>
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
import { getFile } from '/@/api/file';
const state = reactive({
  fromdata: {
    title: "",
    isShowDialog: false,
    info: null,
    size: 12,
    config: [], // 展示的字段名
		fileList:[],//附件信息
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

const openDialog = async (item, config = [], title,file) => {
	// 如果详情有文件
	if(file){
		let res = await getFile(item.id)
		if(res.code==200){
			state.fromdata.fileList = res.data.map(item=>{
				item.name= item.attaName
				item.uid = item.id
				item.url = item.attaUrl
				item.type = item
				return item
			})
		}else{
      ElMessage.error(res.mag||'获取附件失败')
    }
	}
  // 打开弹窗
  state.fromdata.info = item;
  state.fromdata.config = config;
  state.fromdata.title = title;
  state.fromdata.isShowDialog = true;
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
