<template>
  <div>
    <el-upload
      class="uploadList"
      v-model:file-list="fileList"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :limit='props.limit'
    >
      <el-button>点击上传</el-button>
    </el-upload>
  </div>

</template>

<script setup>
  import { uploadFile,deleteFile } from '/@/api/file';
  import {ElMessage} from 'element-plus';

  const props = defineProps({
    // 初始化文件列表
    fileList: {
      type: Array,
      default: () => [],
    },
    // 限制上传数量
    limit: {
      type: Number,
      default: 15,
    },
    // 限制的文件大小
    size: {
      type: Number,
      default: 5,
    },
    // 传给后台的类型
    type: {      
      type: Number,
      required: true,
    },
    // 传给后台的地址
    filePath: {
      type: String,
      default: '',
    },
    // 传给后台的id,在编辑的时候使用
    domain: {
      type: String,
      default: '',
    },
  });

  // 传给父组件的名字必须是小写的
  const emits = defineEmits(['changefile','removefile']);

  const beforeUpload = () => {
    return false
  };

  const fileList = computed(() => {
    return props.fileList||[]
  });

  const handleChange = (file) =>{
    if(file.raw.size > 1024*1024*props.size){
      ElMessage.error(`文件大小不能超过${props.size}M！`);
		  return 
    }

    const formData = new FormData();
    formData.append('file', file.raw);
    formData.append("type", props.type);
    formData.append("filePath", props.filePath);
    formData.append("domain", props.domain);
    uploadFile(formData).then(res=>{
      if(res.code == 200){
        fileList.value.push({
          name: res.data.name,
          url: res.data.url,
          uid: res.data.uid,
          status: 'success',	
        });
        emits('changefile',fileList)
        ElMessage.success('附件上传成功');
      }else{
        ElMessage.error(res.msg||'附件上传失败');
      }
    }).catch(err=>{
      ElMessage.error(err.msg||'附件上传失败');
    });
  }

  // 删除
  const handleRemove = (file) => {
    if(file.status=='success') {
      deleteFile(file.uid).then(res=>{
        if(res.code == 200){
          ElMessage.success('附件删除成功');
          emits('removefile',fileList)
        }else{
          ElMessage.error(res.msg||'附件删除失败');
        }
      }).catch(err=>{
        ElMessage.error('附件删除失败');
      });
    }
  }

  // 超限
  const handleExceed = ()=>{
    ElMessage.error( `文件数量最多上传${props.limit}个`);
  }

</script>
<style>
 .uploadList .el-upload-list__item.is-success:focus:not(:hover){
    display: none !important;
	} 
</style>