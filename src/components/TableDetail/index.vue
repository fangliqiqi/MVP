<template>
  <div class="job-detail-container">
    <el-dialog
      :title="state.fromdata.title"
      v-model="state.fromdata.isShowDialog"
      width="816px"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form :model="state.ruleForm" size="default" :label-width="labelWidth">
        <el-row v-if="props.formType=='Array'" class="table_row">
          <el-col
            v-for="(item, index) in state.fromdata.info"
            :key="index"
            :span="item.size||12"
            class="table_detail"
          >
            <p class="label_text">
              <span> {{item.label}}</span>
            </p>
            <el-tooltip
              v-if="item.key!=null"
              placement="top"
              :popper-class="item.size?`tooltip_conent_24`:`tooltip_conent_12`"
            > 
              <template #content> {{ item.key}}</template>
              <span class="tooltip">{{ item.key}}</span>
            </el-tooltip>
            <span v-else>--</span>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col
            v-for="(item, index) in state.fromdata.config"
            :key="index"
            :span="item.size||12"
          >
            <!-- 是否需要tooltip显示 -->
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
            <!-- 附件展示 -->
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
            <!-- 时间展示 -->
            <div v-else-if="item.date">
              <el-form-item :label="item.label">
                {{moment(state.fromdata.info[item.key]).format(item.date)||'--'}}
              </el-form-item>
            </div>
            <!-- 字典展示 -->
            <div v-else-if="item.dict">
              <el-form-item :label="item.label">
              {{dictData[item.dict][state.fromdata.info[item.key]]||'--'}}
              </el-form-item> 
            </div>
            <!-- 地址展示 -->
            <div v-else-if="item.address">
              <el-form-item :label="item.label">
                {{idToArea({province:state.fromdata.info[item.address[0]],city:state.fromdata.info[item.address[1]],
                  town:state.fromdata.info[item.address[2]]})||'--'}}
              </el-form-item>
            </div>
            <!-- 函数处理展示 -->
            <div v-else-if="item.formatter">
              <el-form-item :label="item.label">
                {{item.formatter(state.fromdata.info)||'--'}}
              </el-form-item>
            </div>
            <!--其他展示-->
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
import moment from 'moment';
import { getFile } from '/@/api/file';
import {idToArea} from  '/@/utils/city';

const props = defineProps({
  labelWidth: {
    type: String,
    default: '120px'
  },
  // 字典类型
  dictData: {
    type: Object,
    default: () => ({}),
  },
  formType: {   // 表单数据类型
    type: String,
    default: 'Object',
  },
})
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

//item 数据详情 config 字段配置 title 弹窗标题 file 是否有附件
const openDialog = async (item, config = [], title,file=false) => {
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
  // console.log(state.fromdata);
  state.fromdata.title = title;
  state.fromdata.isShowDialog = true;
};

// 暴露变量
defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped src="./css/index.scss"></style><style>
.tooltip_conent_24{
  max-width:640px;
}
.tooltip_conent_12{
  max-width:320px;
}

</style>
