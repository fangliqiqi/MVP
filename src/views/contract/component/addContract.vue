<template>
	<div class="edit-staff-page">
		<div class="content">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<!-- <div class="title">
					<span></span>
				</div> -->
				<el-row style="margin-top: 24px">
					<el-col :span="state.span">
						<el-form-item label="员工姓名" prop="empName">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.empName"
								:request="request"
								value-key="empName"
                clearable
								title="empName"
								search="nameOrIdcard"
								placeholder="请选择员工"
								:options="state.options"
								@change="onChangeEmp"
                :disabled="state.id?true:false"
							/>
						</el-form-item>
					</el-col>
          <el-col :span="state.span">
            <el-form-item label="项目名称" prop="subjectDepartObj">
              <el-select 
                v-model="state.ruleForm.subjectDepartObj"
                placeholder="请选择项目名称" 
                clearable 
                filterable 
                style="width:100%"
                value-key="deptId"
                @change="onChangeSubjectDepart"
                :disabled="state.projectList.length === 0||state.id?true:false"
              >
                <el-option v-for="item in state.projectList"
                :key="item.id"
                :label="item.deptName"
                :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="员工类型" prop="empNatrue">
              <el-select
                v-model="state.ruleForm.empNatrue"
                placeholder="请选择员工类型"
                style="width: 100%;"
                clearable
                disabled
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.emp_natrue"
                  :key="key"
                  :label="item"
                  :value="key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="签订类型" prop="situation">
              <el-select
                v-model="state.ruleForm.situation"
                placeholder="请选择签订类型"
                style="width: 100%;"
                clearable
                :disabled="state.isRenew?state.isRenew:state.id?true:(state.ruleForm.empId&&state.ruleForm.settleDomain)?false:true"
                @change="onChangeSituation"
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.situation_type"
                  :key="key"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 离职时间 -->
          <el-col :span="state.span" v-if='isStop'>
            <el-form-item label="离职时间" prop="leaveDate">
              <el-date-picker
                v-model="state.ruleForm.leaveDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择离职时间"
                style="width: 100%;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 终止原因 -->
          <el-col :span="state.span" v-if='isStop'>
            <el-form-item label="终止原因" prop="reduceReason">
              <el-select
                v-model="state.ruleForm.reduceReason"
                placeholder="请选择终止原因"
                style="width: 100%;"
                clearable
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.social_reduce_reason"
                  :key="key"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="合同类型" prop="contractName">
              <el-select
                v-model="state.ruleForm.contractName"
                placeholder="请选择合同类型"
                style="width: 100%;"
                clearable
                :disabled="isAbolish"
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.personnel_type"
                  :key="key"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="业务细分" 
              prop='contractSubName'
              :rules="contractSubNameRule"
            >
              <el-select
                v-model="state.ruleForm.contractSubName"
                placeholder="请选择业务细分"
                style="width: 100%;"
                clearable
                :disabled="isAbolish"
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.contract_business_type"
                  :key="key"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!isAbolish">
            <el-form-item label="原因说明" prop="reason" :rules="reasonRules">
              <el-input 
                type="textarea"  
                v-model="state.ruleForm.reason" 
                placeholder="请输入原因说明"
                :autosize="{ minRows:2, maxRows: 2 }" 
                show-word-limit 
                maxlength="200" 
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="客户名称" prop="subjectUnit">
              <el-input v-model="state.ruleForm.subjectUnit" placeholder="请输入客户名称" disabled maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="合同甲方" prop="contractParty">
              <el-input v-model="state.ruleForm.contractParty" :disabled="isAbolish" placeholder="请输入合同甲方" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="签订期限" prop="contractType">
              <el-select
                v-model="state.ruleForm.contractType"
                placeholder="请选择签订期限"
                style="width: 100%;"
                clearable
                @change="onChangeContractType"
                :disabled="isAbolish"
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.employee_contract_type"
                  :key="key"
                  :label="item"
                  :value="key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span">
            <el-form-item label="起始日期" prop="contractStart">
              <el-date-picker
								v-model="state.ruleForm.contractStart"
								type="date"
								placeholder="请选择起始日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
                @change="onChangeContractStart"
                :disabled="isAbolish"
								></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="state.ruleForm.contractType!=2&&state.ruleForm.contractType!=0">
            <el-form-item label="截止日期" prop="contractEnd">
              <el-date-picker
								v-model="state.ruleForm.contractEnd"
								type="date"
								placeholder="请选择截止日期"
								style="width: 100%;"
								value-format="YYYY-MM-DD 00:00:00"
                @change="onChangeContractEnd"
                :disabled-date="disabledContractEnd"
                :disabled="isAbolish"
								></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="!isAbolish">
            <el-form-item label="合同年限" prop="contractTerm">
              <el-input v-model="state.ruleForm.contractTerm" placeholder="请输入合同年限" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="!isAbolish">
            <el-form-item label="合同岗位" prop="post">
              <el-input v-model="state.ruleForm.post" placeholder="请输入合同岗位" maxlength="20" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="!isAbolish">
            <el-form-item label="工时制" prop="workingHours">
              <el-select
                v-model="state.ruleForm.workingHours"
                placeholder="请选择工时制"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item,key) in state.dictOptions.working_hours"
                  :key="key"
                  :label="item"
                  :value="key"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="!isAbolish">
            <el-form-item label="合同编码" prop="contractNo">
              <el-input v-model="state.ruleForm.contractNo" placeholder="请输入合同编码" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="state.span" v-if="!isAbolish">
            <el-form-item label="档案柜号" prop="fileCabinetNo">
              <el-input v-model="state.ruleForm.fileCabinetNo" placeholder="请输入档案柜号" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isAbolish">
            <el-form-item label="原因说明" prop="reason" :rules="reasonRules">
              <el-input 
                type="textarea"  
                v-model="state.ruleForm.reason" 
                placeholder="请输入原因说明"
                :autosize="{ minRows:2, maxRows: 2 }" 
                show-word-limit 
                maxlength="200" 
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!isAbolish">
            <el-form-item label="备注" prop="remark">
              <el-input 
                type="textarea"  
                v-model="state.ruleForm.remark" 
                placeholder="请输入备注"
                :autosize="{ minRows:2, maxRows: 2 }" 
                show-word-limit 
                maxlength="200" 
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!isAbolish">
						<el-form-item label="附件">
							<upload-file 
								ref="uploadFileRef"
								:file-list="state.fileList"
								@removefile="removeFile"
								@changefile="chengeFile"
								:type="4"
								filePath="contractApplyFile"
								:domain="state.id"
							>
							</upload-file>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<div class="operation-container">
			<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
			<el-button type="primary" @click="onSubmit(0)" :loading="state.loading" style="height: 100%">保 存</el-button>
      <el-button type="primary" @click="onSubmit(1)" :loading="state.loading" style="height: 100%">提 交</el-button>
		</div>
	</div>
</template>



<script setup name="editStaffPage">
import { useRoute, useRouter } from 'vue-router';
import PageSelect from '/@/components/PageSelect/index.vue';
import UploadFile from '/@/components/UploadFile/index.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {getStaffList} from '@/api/staff'
import {addContractApply,getContractDetail,updateContractApply,getContractBySit} from '@/api/contract'
import {getFile} from '/@/api/file';
import { getDictByItemTypes ,closeCurrentTab} from '/@/utils/utils';
import { getProjectListByStaffId } from '/@/api/subject';
import  { emitRefresh } from '/@/utils/events'
import moment from 'moment';


const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance()
const formRef = ref(null);
const uploadFileRef = ref(null);


const state = reactive({
  id:'',
  loading: false,
	ruleForm: {
		empName: '',
    empIdCard: '',
    empId:'',
    subjectDepart: '',
    settleDomain: '',
    subjectUnit: '',
    customerId: '',
    unitNo: '',
    deptNo:'',
    empNatrue: '',
    situation: '',
    contractName: '',
    contractSubName: '',
    reason: '',
    contractParty: '',
    contractType: '',
    contractStart: '',
    contractEnd: '',
    contractTerm: '',
    post: '',
    workingHours: '',
    contractNo: '',
    fileCabinetNo: '',
    auditStatus: '',
    remark: '',
    attaList: [],
	},
  subjectData:{
    empNatrue:'',
    settleDomain:'',
    subjectUnit:'',
    customerId:'',
    unitNo:'',
    deptNo:'',
  },//选择项目时需要存起来的数据
  options:[],
	span: 6,
  projectList: [], // 项目列表
	dictKeys:[  //字典项
    'emp_natrue',//员工类型
    'situation_type',//签订类型
    'personnel_type',//合同类型
    'contract_business_type',//业务细分
    'working_hours',//工时制
    'employee_contract_type',//签订期限
    'social_reduce_reason',//终止原因
  ],
  dictOptions: {    //字典项数据
    emp_natrue:{},//员工类型
    situation_type:{},//签订类型
    personnel_type:{},//合同类型
    contract_business_type:{},//业务细分
    working_hours:{},//工时制
    employee_contract_type:{},//签订期限
    social_reduce_reason:{},//终止原因
  },
  fileList: [], // 附件列表
  isAbolish:false,// 是否是废除 终止
  isRenew:false,//是否续签
});




// 获取员工列表
const request = async (params) => {
	try {
    params.fileStatus=0
		const res = await getStaffList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}else{
			ElMessage.error(res.msg);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

// 合同截止时间必须小于开始时间
const disabledContractEnd = (date)=>{
  if(state.ruleForm.contractStart){
    return date.getTime() < Date.parse(state.ruleForm.contractStart);
  }else{
    return true;
  }
}
// 附件列表
const chengeFile = (list)=>{
	state.fileList = list.value
}
const removeFile = (list)=>{
	state.fileList = list.value
}

// 员工选择
const onChangeEmp = async (val) => {
  state.ruleForm.subjectDepartObj = {};
  state.ruleForm.empIdCard = val.empIdcard;
  state.ruleForm.empId	 = val.id;
  state.ruleForm.situation = '';
  state.options = [val];
  if(val){
    await getProjectList(val.id);
  }else{
    state.projectList = [];
    state.ruleForm.subjectDepartObj = {};
  }
};

// 项目选择
const onChangeSubjectDepart =(val) => {
  if(val){
    state.ruleForm.empNatrue = val.empNatrue; //员工类型
    state.ruleForm.subjectDepart = val.deptName; //项目名称
    state.ruleForm.subjectUnit = val.unitName;
    state.ruleForm.settleDomain = val.deptId;
    state.ruleForm.unitNo = val.unitNo;
    state.ruleForm.deptNo = val.deptNo;
    state.ruleForm.customerId = val.unitId;
    state.ruleForm.situation = '';
    // 储存数据,在签订类型切换时使用
    state.subjectData = {
      empNatrue:val.empNatrue,
      subjectUnit:val.unitName,
      settleDomain:val.deptId,
      unitNo:val.unitNo,
      deptNo:val.deptNo,
      customerId :val.unitId,
    }
  }
  // else{
  //   state.ruleForm.empNatrue = '';
  //   state.ruleForm.subjectDepart = '';
  //   state.ruleForm.subjectUnit = '';
  //   state.ruleForm.settleDomain = '';
  //   state.ruleForm.unitNo = '';
  //   state.ruleForm.deptNo = '';
  //   state.ruleForm.customerId = '';
  //   state.ruleForm.situation = '';
  //   state.subjectData = {
  //     empNatrue:'',
  //     subjectUnit:'',
  //     settleDomain:'',
  //     unitNo:'',
  //     deptNo:'',
  //     customerId :'',
  //   }
  // } 
};

// 如果state.ruleForm.subjectDepartObj 没有值或者是个空对象
watchEffect(()=>{
  if(!state.ruleForm.subjectDepartObj || !Object.keys(state.ruleForm.subjectDepartObj).length){
    state.ruleForm.empNatrue = '';
    state.ruleForm.subjectDepart = '';
    state.ruleForm.subjectUnit = '';
    state.ruleForm.settleDomain = '';
    state.ruleForm.unitNo = '';
    state.ruleForm.deptNo = '';
    state.ruleForm.customerId = '';
    state.ruleForm.situation = '';
    state.subjectData = {
      empNatrue:'',
      subjectUnit:'',
      settleDomain:'',
      unitNo:'',
      deptNo:'',
      customerId :'',
    }
  }
})


// 签订类型选择
const onChangeSituation =(val) => {
  const text = `<p style="font-size:16px;font-weight:600">是否确定切换签订类型?<br/>
				<span style="font-size:14px;font-weight:200">切换后，原填写信息将被清空</span></p>`
  if(val=='作废'||val=='终止'){
    ElMessageBox.confirm(text, '提示', {
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }).then(() => {
      abolishList(val)
      
    }).catch(() => {
      state.ruleForm.situation = '';
    });
  }else{
    formRef.value.clearValidate(['subjectUnit']);
    state.ruleForm.situation =val;
    state.ruleForm.empNatrue = state.subjectData.empNatrue; //员工类型
    state.ruleForm.subjectUnit = state.subjectData.subjectUnit;
    state.ruleForm.settleDomain = state.subjectData.settleDomain;
    state.ruleForm.unitNo = state.subjectData.unitNo;
    state.ruleForm.deptNo = state.subjectData.deptNo;
    state.ruleForm.customerId = state.subjectData.customerId;
    // 某些值去掉
    state.ruleForm.contractName = '';
    state.ruleForm.contractSubName = '';
    state.ruleForm.reason = '';
    state.ruleForm.contractParty = '';
    state.ruleForm.contractType = '';
    state.ruleForm.contractStart = '';
    state.ruleForm.contractEnd = '';
    state.ruleForm.contractTerm = '';
    state.ruleForm.post = '';
    state.ruleForm.workingHours = '';
    state.ruleForm.contractNo = '';
    state.ruleForm.fileCabinetNo = '';
    state.ruleForm.remark = '';
  }
};
// 是否是终止
const isStop = computed(()=>{
  return state.ruleForm.situation == '终止'
})


const isAbolish = computed(()=>{
  return !!(state.ruleForm.situation=='作废'||state.ruleForm.situation=='终止');
})

// 请求获取废除合同列表
const abolishList = (val)=>{
  // state.isAbolish = true;
    // 获取合同列表 取合同列表的第一个
    const data = {
      empId:state.ruleForm.empId,
      settleDomain:state.ruleForm.settleDomain,
      auditStatus:2,
      inUse:0,
    }
  
    getContractBySit(data).then(res=>{
      if(res.code==200&&res.data.length>0){
        const data = res.data[0]
        state.ruleForm = {...data}
        state.ruleForm.subjectDepartObj = {deptName:data.subjectDepart,deptId:data.settleDomain}
        state.ruleForm.situation = val;
        state.ruleForm.id = null;  //清空id 新增无需传id
        state.ruleForm.oldContractId = data.id; //记录原合同id
        state.ruleForm.reason = '';
        delete state.ruleForm.applyNo; //清空申请编号
        delete state.ruleForm.createTime;
        delete state.ruleForm.createName;
      }else{
        state.ruleForm.contractName = '';
        state.ruleForm.subjectUnit = '';
        state.ruleForm.contractParty = '';
        state.ruleForm.contractStart = '';
        state.ruleForm.contractEnd = '';
        state.ruleForm.contractType = '';
        state.ruleForm.reason = '';
        ElMessage.error(res.msg||'暂无可操作合同');
      }
    }).catch(err=>{
      ElMessage.error(err.msg||'暂无可操作合同');
    })
}


// 签订期限
const onChangeContractType = (val) => {
  if(val == '2'){
    state.ruleForm.contractTerm = '无期限';
  }
}
// 合同开始日期
const onChangeContractStart = ()=>{
  state.ruleForm.contractEnd = '';
}
// 合同结束日期
const onChangeContractEnd = (val)=>{
  state.ruleForm.contractEnd = val;
  if(val){  
    const start  = moment(state.ruleForm.contractStart);
    const end = moment(val);
    const duration = end.diff(start, 'months');
    state.ruleForm.contractTerm = (duration/12).toFixed(1)=='0.0'?'0':(duration/12).toFixed(1)
  }
}

const contractSubNameRule = computed(()=>{
 setTimeout(()=>{
    formRef.value.clearValidate(['contractSubName'])
 },20)
 if(state.ruleForm.contractName=='其他'){
    return  rules.contractSubName = [{required: true, message: '请选择业务细分', trigger: 'change'}]
 }else{
   return  rules.contractSubName = []
 }
})

const reasonRules = computed(()=>{
  setTimeout(()=>{
    formRef.value.clearValidate(['reason'])
  },20)
  if(state.ruleForm.reduceReason=='其他'){
    return  rules.reason = [{required: true, message: '请填写原因说明', trigger: 'blur'}]
  }else{
    return  rules.reason = []
  }
})

const rules = computed(()=>{
  const r = {
    empName: [
      { required: true, message: '请选择员工', trigger: 'change' },
    ],
    subjectDepartObj: [
      { required: true, message: '请选择项目名称', trigger: 'change' },
    ],
    empNatrue: [
      { required: true, message: '请选择员工类型', trigger: 'change' },
    ],
    situation: [
      { required: true, message: '请选择签订状态', trigger: 'change' },
    ],
    contractName: [
      { required: true, message: '请选择合同类型', trigger: 'change' },
    ],
    leaveDate: [
      { required: true, message: '请选择离职日期', trigger: 'change' },
    ],
    reduceReason: [
      { required: true, message: '请选择终止原因', trigger: 'change' },
    ],
    subjectUnit: [
      { required: true, message: '请输入客户名称', trigger: 'blur' },
    ],
    contractParty: [
      { required: true, message: '请输入合同甲方', trigger: 'blur' },
    ],
    contractType: [
      { required: true, message: '请选择签订期限', trigger: 'change' },
    ],
    contractStart: [
      { required: true, message: '请选择合同开始时间', trigger: 'change' },
    ],
    contractEnd: [
      { required: true, message: '请选择合同截止时间', trigger: 'change' },
    ],
    post: [
      { required: true, message: '请输入合同岗位', trigger: 'blur' },
    ],
    workingHours: [
      { required: true, message: '请选择工时制', trigger: 'change' },
    ],
    contractSubName:[]
    }

    const z = {
      contractName: [],
      subjectUnit: [],
      contractParty: [],
      contractType: [],
      contractStart: [],
      contractEnd: [],
      post: [],
      workingHours: [],
      contractSubName:[]
    }
    setTimeout(()=>{
      formRef.value.clearValidate()
    },20)
    
    if(state.ruleForm.situation=='作废'||state.ruleForm.situation=='终止'){
      return {...r, ...z}
    }
    return r
})




// 获取projectList
const getProjectList = async (id) => {
  try {
    const res = await getProjectListByStaffId({empId:id,projectStatus:0});
    if (res && res.code == 200) {
      state.projectList = res.data;
    }
  } catch (e) {
    console.log('get exception:', e);
  }
};

// 取消
const onCancel = () => {
  ElMessageBox.confirm('关闭后，本次编辑信息将被清空，是否确认?', '提示', {
    type: 'warning',
  }).then(() => {
    goBack();
  }).catch(() => {
    console.log('取消');
  });
}

const goBack = ()=>{
  const p = state.isRenew?"/contract/contractRenew":"/contract/contractApply"
  router.push({
    path: p,
    query: {},
  });
  emitRefresh(proxy,p)
	closeCurrentTab(route, proxy);
  state.loading = false;
}

// 保存、提交
const onSubmit = (status)=>{
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 附件id
      state.ruleForm.attaList = []
      state.fileList.forEach(item=>{
        state.ruleForm.attaList.push(item.uid);
      })
      state.ruleForm.auditStatus = status;
      let sucMsg = status==1?'合同申请提交成功':'合同申请保存成功';
      let errMsg = status==1?'合同申请提交失败':'合同申请保存失败';
      // console.log(state.ruleForm);
      state.loading = true;
      if(state.id&&state.ruleForm.id){
        try {
          const res = await updateContractApply(state.ruleForm);
          if(res&&res.code == 200){
            ElMessage.success(sucMsg);
            goBack();
          }else{
            state.loading = false;
            ElMessage.error(res.msg||errMsg);
          }
        } catch (error) {
          state.loading = false;
          console.log(error);
        }
      }else{
        try {
          const res = await addContractApply(state.ruleForm);
          if (res && res.code == 200) {
            ElMessage.success(sucMsg);
            goBack();
          }else{
            state.loading = false;
            ElMessage.error(res.msg||sucMsg);
          }
        } catch (e) {
          state.loading = false;
          console.log('get exception:', e);
        }
      }
    } else {
      console.log('error submit!');
      return false;
    }
  })
}

// 字典获取
const loadDicts = async () => {
    try {
      const res = await getDictByItemTypes(state.dictKeys);
      if (res) {
        state.dictOptions = res;
      }
    } catch (e) {
      console.log('get exception:', e);
    }
};
// 获取编辑数据/续签数据
const getContract = async (id)=>{
  try {
    const res = await getContractDetail(id)
    if(res.code==200){
      state.ruleForm = {...res.data}
      state.options = [{empName: res.data.empName, empIdCard: res.data.empIdCard}];
      state.projectList = [{deptName:res.data.subjectDepart,deptId:res.data.settleDomain}]
      state.ruleForm.subjectDepartObj = {deptName:res.data.subjectDepart,deptId:res.data.settleDomain}
      state.ruleForm.id = state.isRenew?null:res.data.id;
      state.ruleForm.createTime = state.isRenew?null:res.data.createTime;
      state.ruleForm.createName = state.isRenew?null:res.data.createName;
      state.ruleForm.applyNo = state.isRenew?null:res.data.applyNo;
    }else{
      ElMessage.error(res.msg||'获取合同申请详情失败');
    }
    
    const file =await getFile(id)

    if(file&&file.code == 200){
      state.fileList = file.data.map(item=>{
				item.name= item.attaName
				item.uid = item.id
				item.url = item.attaUrl
				return item
			})
    }else{
      state.fileList = [];
      ElMessage.error(res.msg||'获取合同申请附件失败');
    }
  } catch (e) {
    console.log('get exception:', e);
  }
};

onMounted(async () => {
  // 判断是否是续签
  if (route.query.id){
    state.id = route.query.id;
    state.isRenew = route.name=='contract-renew'?true:false;
    await getContract(state.id);
  }
  loadDicts();
});


</script>

<style lang="scss" scoped src="./css/addContract.scss">
</style>
