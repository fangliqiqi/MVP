<template>
  <div class="edit-staff-page">
    <div class="content">
      <el-form ref="formRef" :model="state.formData" :rules="state.rules"   size="default" label-width="160px">
        <div v-for="(data,key) in PREORDER_HEADER" :key="key">
          <div class="title">
            <span>{{key}}</span>
          </div>
          <el-row style="margin-top: 20px;">
            <el-col v-for="item in data" :key="item.key" 
              :span="(state.formData.type==0&&item.show=='minus'||state.formData.type==1&&item.show=='add')?
                0:item.span||state.span"
            >
              <el-form-item :label="item.label"  >
                <el-tooltip
                  placement="top"
                  :popper-class="`tooltip_${item.tooltip||6}`"
                  v-if="item.tooltip"
                > 
                  <template #content> {{state.formData[item.key]||EMPTY_PLACEHOLDER}}</template>
                  <span :class="`tooltip1_${item.tooltip||6}`">{{state.formData[item.key]||EMPTY_PLACEHOLDER}}</span>
                </el-tooltip>
                <span v-else-if="item.dict">{{translateData(item,state.formData,state.dictOptions)}}</span>
                <span v-else>{{translateData(item,state.formData,state.dictOptions)}}</span>
               
              </el-form-item>
            </el-col> 
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="operation-container">
			<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
		</div>
  </div>
</template>

<script setup name="editPre">

import{ PREORDER_HEADER }from'/@/utils/header';
import { useRoute, useRouter } from 'vue-router';
import { getDictByItemTypes ,closeCurrentTab,EMPTY_PLACEHOLDER} from '/@/utils/utils';
import {translateData} from '/@/utils/translate';
import {getpresendorderDetail,editPresendorder} from '/@/api/socialfund/presendorder';
import { ElMessage } from 'element-plus';


const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance();
const formRef = ref(null);


const state = reactive({
  span:6,
  maxlength:20,
  formData:{},
  dictOptions:{},
  rules:{},
})


// 字典
const loadDicts = async()=>{
  try {
    const dictKeys = []
    
    for(let p in PREORDER_HEADER){
      for(let i of PREORDER_HEADER[p]){
        if(i.dict){
          dictKeys.push(i.dict)
        }
        if(i.prop){
          state.rules[i.prop] = [
            { required: true, message: `请输入${i.label}`, trigger: 'blur' },
          ]
        }
      }
    }
    setTimeout(()=>{
      formRef.value.clearValidate();
    },20)
    

		const res = await getDictByItemTypes(dictKeys);
		state.dictOptions = res;
		} catch (e) {
			console.log('get exception:', e);
		}
}

// 关闭
const onCancel = ()=>{
  router.push({
    path: "/socialfund/sendOrder/presendorder",
    query: {},
  }); 
	closeCurrentTab(route, proxy); // 关闭当前页
}


onMounted( async()=>{
  loadDicts();

  if(route.params.id){
    try {
      const res = await getpresendorderDetail(route.params.id)
      if(res.code==200){
        state.formData = res.data;
      }else{
        ElMessage.error(res.msg||'获取预派单详情数据失败');
      }
    } catch (e) {
      console.log('get exception:', e);
    }
  }
})



</script>

<style lang="scss" scoped src="./css/detailPre.scss">
</style>
<style>
  .tooltip1_6{
    white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: inline-block
  }
  .tooltip_6{
    max-width: calc((100vw - 200px)/6);
  }
  .tooltip_12{
    max-width: calc((100vw - 200px)/3);
  }
  .tooltip_24{
    max-width: calc((100vw - 200px)/1.5);
  }

</style>