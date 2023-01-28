<template>
	<div class="edit-staff-page">
		<div class="content">
			<!-- 合同信息 -->
			<div class="contract_left">				
				<el-form ref="formRef"  size="default" label-width="110px" >
					<div class="title">
						<span>当前合同</span>
					</div>
					<el-row style="margin-top: 24px">
						<el-col :span="item.span||state.span" v-for="(item,index) in formData" :key="index">
							<el-form-item :label="item.label">
								<el-tooltip
									placement="top"
									:popper-class="`tooltip_${item.span||6}`"
									v-if="item.tooltip"
								> 
									<template #content> {{contractData(item)}}</template>
									<span class="tooltip">{{contractData(item)}}</span>
								</el-tooltip>
								<div v-else-if="item.file&&state.fileList.length>0">
										<a 
											:href="file.url"  
											v-for="file in state.fileList" 
											:key="file.uid" 
											target="_blank"
											style="display:block">
											{{file.name}}
										</a>
								</div>
								<span v-else>{{contractData(item)}}</span>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			
			</div>
			<!-- 间隙 -->
			<div class="line"></div>
			<!-- 审核列表 -->
			<div class="check_right">
				<div class="title">
					<span>审核记录</span>
				</div>
				<el-timeline style="padding:20px;" v-if="state.checkList.length>0">
					<el-timeline-item
						v-for="(item, index) in state.checkList"
						:key="index"
						color="#58BD7D"
						size="large"
						:icon="Select"
					>
						<div class="check_content">
							<p>{{item.rootName}}</p>
							<el-form-item label="操作人：">
								{{item.createName}}
							</el-form-item>
							<el-form-item label="操作时间：">
								{{item.createTime}}
							</el-form-item>
							<el-form-item label="审核意见：" v-if="item.auditStatus">
								<el-tooltip
									placement="top"
									popper-class="tooltip_6"
								> 
									<template #content> {{item.auditStatus}}</template>
									<span class="remark">{{item.auditStatus}}</span>
								</el-tooltip>
							</el-form-item>
							<el-form-item label="备注：" v-if="item.remark" class="remark_100">
								<el-tooltip
									placement="top"
									popper-class="tooltip_6"
								> 
									<template #content> {{item.remark}}</template>
									<span class="remark">{{item.remark}}</span>
								</el-tooltip>
							</el-form-item>
						</div>
    			</el-timeline-item>
  			</el-timeline>
				<empty-view v-else></empty-view>
			</div>
		</div>
		<div class="operation-container">
			<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
		</div>
	</div>
</template>

<script setup name="editStaffPage">
import { useRoute, useRouter } from 'vue-router';
import { getDictByItemTypes, EMPTY_PLACEHOLDER ,closeCurrentTab } from '/@/utils/utils';
import { getContractDetail,getContractAuditList } from '/@/api/contract';
import EmptyView from '/@/components/EmptyView/index.vue';
import {getFile} from '/@/api/file';
import moment from 'moment';
import {  Select } from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';



const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const formRef = ref(null);
const state = reactive({
	formData:{},//数据
	span: 8,
	formArr:[   
		{label:'合同编码',value:'contractNo',span:24},
		{label:'员工姓名',value:'empName'},
		{label:'项目名称',value:'subjectDepart',tooltip:true},
		{label:'员工类型',value:'empNatrue',dict:'emp_natrue',},
		{label:'签订类型',value:'situation',},
		{label:'合同类型',value:'contractName'},
		{label:'业务细分',value:'contractSubName'},
		{label:'审核类型',value:'type',dict:'check_type'},
		{label:'原因说明',value:'reason',span:24,tooltip:true},
		{label:'客户名称',value:'subjectUnit',tooltip:true},
		{label:'合同甲方',value:'contractParty',tooltip:true},
		{label:'签订期限',value:'contractType',dict:'employee_contract_type',tooltip:true},
		{label:'起始日期',value:'contractStart',date:'YYYY-MM-DD'},
		{label:'截止日期',value:'contractEnd',date:'YYYY-MM-DD'},
		{label:'合同年限',value:'contractTerm'},
		{label:'合同岗位',value:'post',tooltip:true},
		{label:'工时制',value:'workingHours',dict:'working_hours'},
		{label:'档案柜号',value:'fileCabinetNo',tooltip:true},
		{label:'合同状态',value:'inUse',dict:'contract_status'},
		{label:'备注',value:'remark',span:24,tooltip:true},
		{label:'附件',value:'attaList',file:true,span:24},
	],//表单标题
	formAbolish:[
		{label:'合同编码',value:'contractNo',span:24},
		{label:'员工姓名',value:'empName'},
		{label:'项目名称',value:'subjectDepart',tooltip:true},
		{label:'员工类型',value:'empNatrue',dict:'emp_natrue',},
		{label:'签订类型',value:'situation',},
		{label:'合同类型',value:'contractName'},
		{label:'业务细分',value:'contractSubName'},
		{label:'审核类型',value:'type',dict:'check_type'},
		{label:'客户名称',value:'subjectUnit',tooltip:true},
		{label:'合同甲方',value:'contractParty',tooltip:true},
		{label:'签订期限',value:'contractType',dict:'employee_contract_type',tooltip:true},
		{label:'起始日期',value:'contractStart',date:'YYYY-MM-DD'},
		{label:'截止日期',value:'contractEnd',date:'YYYY-MM-DD'},
		{label:'合同状态',value:'inUse',dict:'contract_status'},
		{label:'原因说明',value:'reason',span:24,tooltip:true},
	],//废除表单
	DICTS:[],
	dictKeys:[  //字典项
    'emp_natrue',//员工类型
    'working_hours',//工时制
    'employee_contract_type',//签订期限
		'contract_status',//合同状态
		'check_type' //审核类型
  ],
	fileList:[],//附件列表
	checkList:[],//审核记录
	isAbolish:false,//是否是废除状态
});


const contractData = (item)=>{
	if(item.dict){
		const dicts =  state.DICTS[item.dict]
		if(dicts){
			return dicts[state.formData[item.value]]
		}
	}else if(item.date){
		return state.formData[item.value]?moment(state.formData[item.value]).format(item.date):'--'
	}else if(item.file){
		state.formData[item.value] = EMPTY_PLACEHOLDER
	}else{
		state.formData[item.value] = state.formData[item.value] || EMPTY_PLACEHOLDER
	}
	return state.formData[item.value]
}


/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

// 获取详情数据
const getContract = async (id)=>{
  try {
    const res = await getContractDetail(id)
    if(res.code==200){
			state.formData = res.data;
			if(res.data.situation=='作废'||res.data.situation == '终止'){
				state.isAbolish = true
			}else{
				state.isAbolish = false
			}
    }else{
      ElMessage.error(res.msg||'获取合同申请详情失败');
    }
    // 获取文件附件
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
		// 获取审核记录
		const audit = await getContractAuditList({linkId:id,linkType:1})
		if(audit&&audit.code == 200){
			state.checkList = audit.data
		}else{
			state.checkList = [];
			ElMessage.error(res.msg||'获取合同申请审核记录失败');
		}
  } catch (e) {
    console.log('get exception:', e);
  }
};

const formData = computed(()=>{
	if(state.formData&&state.formData.situation == '终止'){
		const stop = [
			{label:'离职日期',value:'leaveDate',date:'YYYY-MM-DD'},
			{label:'终止原因',value:'reduceReason',tooltip:true},
		]
		const arr =  [...state.formAbolish.slice(0,5),...stop,...state.formAbolish.slice(5,16)]
		return arr
	}
	if(state.isAbolish){
		return state.formAbolish
	}
	return state.formArr
})


// 关闭
const onCancel = () => {
	const name = route.name
	// console.log(route)
	// console.log(state.formData);
	switch(name){
		case 'contract-detail':
			router.push({
				path: "/contract/contractApply",
				query: {},
			});
			break;
		case 'contractSearch-detail':
			router.push({
				path: "/contract/contractSearch",
				query: {},
			}); 
			break;
		case 'onlineContract-detail':
			router.push({ 
				name: 'online-detail', 
				params: { id: state.formData.empId } 
			}); 
			break;
		case 'subjectContract-detail':
			router.push({ 
				name: 'subject-detail', 
				params: { id: route.query.projectId } 
			}); 
			break;
	}
	// if(route.name=='contractSearch-detail'){
	// 	router.push({
	// 		path: "/contract/contractSearch",
	// 		query: {},
	// 	}); 
	// 	closeCurrentTab(route, proxy); // 关闭当前页
	// 	return;
	// }
	// router.push({
  //   path: "/contract/contractApply",
  //   query: {},
  // }); 
	closeCurrentTab(route, proxy); // 关闭当前页
  
};


onMounted(async () => {
	loadDicts();
	if(route.query.id) {
    await getContract(route.query.id);
  }else{
		ElMessage.error('不合法的路由地址');
		onCancel();
	}
});
	
</script>

<style lang="scss" scoped src="./css/detailContract.scss">

</style>
<style>
@import './css/detailContract2.scss'
</style>
