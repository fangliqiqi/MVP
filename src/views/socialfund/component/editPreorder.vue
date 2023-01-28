<template>
  <div class="edit-staff-page">
    <div class="content">
      <div class="explain">
        <p>单据状态：<span class="state">{{state.explainStatus}}</span></p>
        <p v-if="state.formData.preStatus=='1'">异常说明：<span class="text">{{state.formData.exceptionContent}}</span></p>
      </div>
      <el-form ref="formRef" :model="state.formData" :rules="rules"   size="default" label-width="160px">
        <div v-for="(data,key) in formParams" :key="key">
          <div class="title">
            <span>{{key}}</span>
          </div>
          <el-row style="margin-top: 20px;">
            <el-col v-for="item in data" :key="item.key" 
              :span="item.span||state.span"
            >
              <el-form-item :label="item.label" :prop="item.prop" >
                <!-- 文本框 -->
                <el-input
                  v-model="state.formData[item.key]"
                  v-if="item.type=='textarea'" 
                  type="textarea" 
                  :rows="2"  
                  :placeholder="`请输入${item.label}`" 
                  show-word-limit
                  clearable
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  :maxlength="item.maxLength||state.maxlength"
                ></el-input>
                <!-- 比例输入框 -->
                <form-component 
                  v-else-if="item.type=='unit-input'"
                 type="unit-input" 
                 unit="%" 
                 v-model="state.formData[item.key]" 
                >
                </form-component>
                <!-- 下拉框 -->
               <el-select
                  v-model="state.formData[item.key]"
                  v-else-if="item.type=='select'"
                  :placeholder="`请选择${item.label}`" 
                  clearable 
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="(op,index) in item.options"
                    :key="index"
                    :label="op"
                    :value="op"
                  ></el-option>
               </el-select>
               <!-- 字典下拉 -->
               <el-select
                  v-else-if="item.dict"
                  v-model="state.formData[item.key]"
                  :placeholder="`请选择${item.label}`" 
                  clearable 
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="(op,key) in state.dictOptions[item.dict]"
                    :key="key"
                    :label="op"
                    :value="key"
                  ></el-option>
               </el-select>
               <!-- 日期选择 -->
               <el-date-picker
                  v-else-if="item.type=='date'||item.type=='month'"
                  v-model="state.formData[item.key]"
                  :type="item.type"
                  :format="item.type=='month'?'YYYYMM':'YYYY-MM-DD'"
                  :value-format="item.type=='month'?'YYYYMM':'YYYY-MM-DD'"
                  :placeholder="`请选择${item.label}`"
                  style="width: 100%"
                />
                <!-- 输入框 -->
                <el-input 
                  v-else
                  v-model="state.formData[item.key]" 
                  :placeholder="`请输入${item.label}`" 
                  :maxlength="item.maxLength||state.maxlength"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="operation-container">
			<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
      <el-button type="primary" @click="onSubmit" :loading="state.loading"  style="height: 100%">保 存</el-button>
		</div>
  </div>
</template>

<script setup name="editPre">
import FormComponent from '/@/components/FormComponent/index.vue';
import{ PREORDER_HEADER }from'/@/utils/header';
import { useRoute, useRouter } from 'vue-router';
import { getDictByItemTypes ,closeCurrentTab} from '/@/utils/utils';
import { emitRefresh } from '/@/utils/events';
import {getpresendorderDetail,editPresendorder} from '/@/api/socialfund/presendorder';
import { ElMessage, ElMessageBox } from 'element-plus';
import { objectEntries } from '@antfu/utils';


const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance();
const formRef = ref(null);


const state = reactive({
  span:6,
  maxlength:20,
  loading:false,
  formData:{},
  explainStatus:"",
  dictOptions:{},
  rules:{},
})

const formParams = computed(()=>{
  // console.log('[  ] >', PREORDER_HEADER['基本信息']);
  // state.formData.type 0 派增 1 派减
  if(state.formData&&state.formData.type==0){
    return  {
      ...PREORDER_HEADER,
      '基本信息':PREORDER_HEADER['基本信息'].filter(item=>item.show!='minus'&&item.show!='hide')
    }
  }
  if(state.formData&&state.formData.type==1){
    return  {
      ...PREORDER_HEADER,
      '基本信息':PREORDER_HEADER['基本信息'].filter(item=>item.show!='add'&&item.show!='hide')
    }
  }
})


// 校验规则
const rules = computed(()=>{
  const rules = {}
  //养老基数、医疗基数、工伤基数、生育基数、失业基数、公积金基数
  const baseArr = ['pensionBase','medicalBase','injuryBase','birthBase','unemploymentBase','fundBase']
  for(let p in PREORDER_HEADER){
    for(let i of PREORDER_HEADER[p]){
      if(i.prop&&!baseArr.includes(i.key)&&i.type!='unit-input'&&i.prop!='contractTermAdd'){
        rules[i.prop] = [
          { required: true, message: `请输入${i.label}`, trigger: 'blur' },
        ]
      }
      // 基数输入限制
      if(baseArr.includes(i.key)){
        // 长度10位，数字，小数最多两位
        rules[i.key] = [
          { pattern: /^[0-9]{1,10}(\.[0-9]{1,2})?$/, message: `请输入正确数字(最多十位数字,两位小数)`, trigger: 'change' }
        ]
      }
      // 比例输入限制
      if(i.type=='unit-input'){
        // 0~100,包括0和100 的数字，小数最多两位
        rules[i.key]=[
          { pattern: /^(0|[1-9]\d{0,1}|100)(\.[0-9]{1,2})?$/, message: `请输入正确数字(0~100,两位小数)`, trigger: 'change' }
        ]
      }
      // 合同期限 contractTermAdd 限制
      if(i.key=='contractTermAdd'){
        //只能输入数字
        rules['contractTermAdd'] = [
          { pattern: /^[0-9]*$/, message: `请输入正确数字`, trigger: 'change' }
        ]
      }
    }
  }
  // console.log('[ rules ] >', rules)
  return rules
})

// 字典
const loadDicts = async()=>{
  try {
    const dictKeys = ['pre_send_status']
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
		const res = await getDictByItemTypes(dictKeys);
		state.dictOptions = res;
		} catch (e) {
			console.log('get exception:', e);
		}
}

// 关闭
const onCancel = ()=>{
  router.push({
    path: "/socialfund/sendOrder/preSendorder",
    query: {},
  }); 
  emitRefresh(proxy, '/socialfund/sendOrder/preSendorder');
	closeCurrentTab(route, proxy); // 关闭当前页
}


// 保存
const onSubmit = ()=>{
  formRef.value.validate(async (valid)=>{
    if(valid){
      // 所有日期格式的如果空值，转换为空字符串
      Object.values(PREORDER_HEADER).forEach(P=>{
        P.forEach(item=>{
          if((item.type=='date'||item.type=='month')&&!state.formData[item.key]){
            // console.log('[ 日期格式是空值] >', item.key)
            state.formData[item.key] = ''
          }
        })
      })
      state.loading = true;
      try {
        const res = await editPresendorder(state.formData);
        if(res.code == 200){
          ElMessage.success(res.msg||'保存成功');
          onCancel();
          state.loading = false;
        }else if(res.code==1){
          ElMessage.error(res.msg||'保存失败');
          state.loading = false;
        }
      } catch (e) {
        ElMessage.error(e.msg||'保存失败');
        console.log('get exception:', e);
        state.loading = false;
      }
    }
  })
}

onMounted( async()=>{
  loadDicts();
  if(route.params.id){
    try {
      const res = await getpresendorderDetail(route.params.id)
      if(res.code==200){
        state.formData = res.data;
        state.explainStatus = state.dictOptions.pre_send_status[res.data.preStatus];
      }else{
        ElMessage.error(res.msg||'获取预派单详情数据失败');
      }
    } catch (e) {
      console.log('get exception:', e);
    }
  }
})



</script>

<style lang="scss" scoped src="./css/editPreorder.scss">
</style>