<template>
	<div class="system-dict-container">
		<pro-table 
      ref="proTableRef" 
      row-key="id" 
      :columns="columns" 
      :request="request" 
			:btn="btn" 
      :searchConfig="searchConfig" 
      :multi="true"
			@selectionChange="selectionChange"
			@onReset="onReset"
		>
		  <template v-slot:salaryMonth="item">
				<el-date-picker
					v-model="state.params.salaryMonth"
					ref="dataPickerRef"
					type="monthrange"
					:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
					start-placeholder="开始月份"
					end-placeholder="结束月份"
					value-format="YYYYMM"
					format="YYYYMM"
					style="width: 100%;"
					:unlink-panels="true"
					popper-class="month-picker"
					:clearable="false"
					:shortcuts="shortcuts"

				/>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

    <!--工资条配置-->
		<config-pay-project-vue ref="configPayProjectRef" @ok="refresh"></config-pay-project-vue>

		<!-- 工资条查询 -->
		<pay-search-vue ref="paySearchRef"></pay-search-vue>

	</div>
</template>

<script setup name='项目薪酬查询'>
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import configPayProjectVue from './component/configPayProject.vue';
import paySearchVue from './component/paySearch.vue';
import { exportExcel } from '/@/utils/xlsx';
import { ElMessageBox ,ElMessage} from 'element-plus';
import { getDictByItemTypes} from '/@/utils/utils'
import {getpayProjectList,exportpayProject} from '/@/api/payservice/paysearch';
import { idToArea } from '/@/utils/city';
import { useRouter,useRoute } from 'vue-router';
import moment from 'moment';


const proTableRef = ref(null);
const configPayProjectRef = ref(null)
const router = useRouter();
const route = useRoute();
const isShowLoading = ref(false)
const dataPickerRef = ref(null)
const paySearchRef = ref(null)


// 批量导出
const handleBatchExport = () => {
	isShowLoading.value = true
	let p = null
	if(state.selectOptions.length>0){
		const ids = []
		state.selectOptions.map(item=>{
			ids.push(item.id)
		})
		p = {
			ids:ids.join(',')
		}
	}else{
		 p = {
			salaryMonthStart:state.params.salaryMonth[0],
			salaryMonthEnd:state.params.salaryMonth[1],
			...proTableRef.value.getParams()
		}
		delete p.size
		delete p.current
		delete p.startEndTime_1
	}
	exportpayProject(p).then(res=>{
		if(res.code==200){
			ElMessage.success('导出成功');
		}else{
			ElMessage.error(res.msg||'导出失败');
		}							
	}).catch(err=>{
		ElMessage.error(err.msg||'导出失败');
	}).finally(()=>{
		isShowLoading.value = false
	})
	
};

// 工资条查询
const handlepaySearch = () => {
	paySearchRef.value&&paySearchRef.value.openDialog()
};



const shortcuts = computed(()=>{
	// 从今年一直到2010年
	const year = new Date().getFullYear()
	let arr = []
	for(let i=year;i>=2010;i--){
		arr.push({
			text: i+'年',
			value:[i+'01',i+'12']
		})
	}
	return arr
})

// 重置
const onReset = () => {
	state.params.salaryMonth =[moment().format('YYYYMM'),moment().format('YYYYMM')]
}



// 多选
const selectionChange = (res)=>{
	state.selectOptions = res;
}

const state = reactive({
		searchConfig: {
			labelWidth: 110,
			option: {
				extBtn: 'extBtns',
			},
		},
		columns: [
			{
				dataIndex: 'status',
				title: '薪酬状态',
				minWidth:160,
			},
      {
				dataIndex: 'sendMonth',
				title: '发放月份',
				minWidth:160,
				valueType:'date',
				selectType:'month',
				format:'YYYYMM',
				valueFormat:'YYYYMM',
			},
      {
				dataIndex: 'salaryMonth',
				title: '薪酬月份',
				hideInTable: true,
				valueType: 'custom',
				scopedSlots:{
					customRender:'salaryMonth'
				}
			},
			{
				dataIndex: 'deptName',
				title: '项目名称',
				minWidth: 160,
				tooltip: true,
			},
			{
				dataIndex: 'deptNo', 
				title: '项目编码',
				minWidth: 140,
			},
			{
				dataIndex: 'applyNo',
				title: '申请编码',
				minWidth: 160,
			},
      {
				dataIndex: 'settlementAmount', 
				title: '项目金额',
				hideInSearch: true,
				minWidth: 140,
			},
			{
				dataIndex: 'invoiceTitle',
				title: '封面抬头',
				minWidth: 200,
				tooltip:true
			},
      {
				dataIndex: 'salaryMonth',
				title: '薪酬月份',
				hideInSearch: true,
				minWidth: 160,
			},
      {
				dataIndex: 'formType',
				title: '表单类型',
				hideInSearch: true,
				minWidth: 160,
			},
			{
					width: 180,
					dataIndex: 'createTime',
					title: '创建时间',
					selectType: 'daterange',
					format: 'YYYY-MM-DD HH:mm:ss',
					valueFormat: 'YYYY-MM-DD HH:mm:ss',
					searchIndex: 'startEndTime_1',
					startTime: 'createTimeStart',
					endTime: 'createTimeEnd',
					valueType: 'dateTimeRange',
				},
      {
				dataIndex: 'createName',
				title: '创建人',
				hideInSearch: true,
				minWidth: 160,
			},
			{
				dataIndex: 'option',
				title: '操作',
				key: 'option',
				minWidth:180,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [			
			{
				label: '批量导出',
				permission: ['salary_tsalarystandard-export'],
				onClick: handleBatchExport,
				loading:isShowLoading,
				icon: 'icon-ic_edit_export',
			},
			{
				label: '工资条查询',
				permission: [],
				onClick: handlepaySearch,
				type:'normal',
				icon: 'icon-ic_edit_refresh',
			},
			
		],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: [], // 权限标识
			},
      {
				text: '工资条配置',
				prop: 'config', // 唯一标识
				permission: ['tsalarystandardset_add','tsalarystandardset_del'], // 权限标识
				isGray:(row)=>{
					return row.formType!='0'&&row.formType!='1'
				}
			},
		],
		selectOptions:[],//多选数据
		params:{
			salaryMonth:[moment().format('YYYYMM'),moment().format('YYYYMM')]
		},//导出请求数据
    dictKeys:[
			'salary_status',
			'form_type'
		]
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const p = {
				...params,
				salaryMonthStart: state.params.salaryMonth[0],
				salaryMonthEnd: state.params.salaryMonth[1],
			};
			
			const res = await getpayProjectList(p);
			if (res && res.code == 200 && res.data) {
				return {
					current: res.data.current,
					total: res.data.total,
					data: res.data.records.map((item, i) => {
						return {
							...item,
							index: (params.current - 1) * params.size + i + 1,
						};
					}),
				};
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
	// 页面刷新
	const refresh = ()=>{
		proTableRef.value.refresh();
	}

	const onCellClick = async (prop, item) => {
		if (prop === 'detail') {
			router.push({ 
				name: 'payservice-project-detail', 
				params: {
					id: item.id,
				},
			})
		}else if(prop === 'config'){
			configPayProjectRef.value&&configPayProjectRef.value.openDialog(item);
    }
	};

  // 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'status':
							item.valueEnum = res['salary_status']; 
							break;
						case 'formType':
							item.valueEnum = res['form_type']; 
							break;
					}
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};
	

	onMounted(() => {
		loadDicts();
	})
	

</script>
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
<style lang="scss">
 @import './css/payProjectSearch.scss'
</style>
