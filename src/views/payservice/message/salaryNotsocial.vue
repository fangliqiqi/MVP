<template>
	<div class="cardinal-config-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			:searchConfig="state.searchConfig"
			@selectionChange="selectionChange"
			multi
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!-- 反馈 -->
		<feed-back-vue ref="feedbackVueRef" @ok="refresh"></feed-back-vue>
	</div>
</template>

<script setup name="有工资无社保">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import feedBackVue from './component/feedback.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getsalaryNotsocial,exportSalaryNotsocial} from '/@/api/payservice/message';


const proTableRef = ref(null);
const feedbackVueRef = ref(null);
const router = useRouter();
const route = useRoute();
const store = useStore();


const refresh = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};
const isShowLoading = ref(false)
// 批量导出
const handleBatchExport = () => {
	isShowLoading.value = true
	if(state.selectionChangeList.length>0){
		const ids = []
		state.selectionChangeList.map(item=>{
			ids.push(item.id)
		})
		state.params = {
			ids:ids.join(',')
		}
	}else{
		state.params = proTableRef.value.getParams()
		delete state.params.size
		delete state.params.current
	}
	exportSalaryNotsocial(state.params).then(res=>{
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


const state = reactive({
	searchConfig: {
		labelWidth: 120,
	},
	columns: [
		{
			dataIndex: 'customerName',
			title: '客户名称',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'settlementOrganName',
			title: '项目名称',
			minWidth: 180,
			hideInSearch: true,
			tooltip: true,
		},
		{
			dataIndex: 'employeeName',
			title: '员工姓名',
			minWidth: 140,
		},
		{
			dataIndex: 'employeeIdCard',
			title: '身份证号',
			minWidth: 200,
			tooltip: true,
		},
    {
      dataIndex:'month',
      title: '工资月份',
      valueType:'date',
      selectType:'month',
      format:'YYYYMM',
      valueFormat:'YYYYMM',
      minWidth: 160,
    },
		{
			dataIndex: 'customerName',
			title: '客户名称',
			minWidth: 220,
			hideInTable: true,
		},
		{
      dataIndex: 'relaySalary',
      title: '应发工资',
      hideInSearch: true,
      minWidth: 160,
    },
		{
      dataIndex: 'createName',
      title: '创建人',
      minWidth: 160,
    },
		{
      dataIndex: 'feedBack',
      title: '反馈原因',
      hideInSearch: true,
			tooltip: true,
      minWidth: 200,
    },
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 120,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	params: {},
	btn: [
		{
			label: '批量导出',
			onClick: handleBatchExport,
			loading:isShowLoading,
			permission: [],
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '反馈',
			prop: 'feedback', // 唯一标识
			permission: [],
			isGray:(row)=>{
				return row.feedBack||row.createBy != state.userInfos.id
			},
		},
	],
	selectionChangeList: [], // 列表多选选中的内容
	userInfos: {},
});

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};
const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'feedback':
			feedbackVueRef.value&&feedbackVueRef.value.openDialog(item,'notSocial');
			break;
	}
};


onMounted(() => {
	state.userInfos = store.state.userInfos.userInfos;
	console.log('state.userInfos',state.userInfos);
});


const request = async (params) => {
	try {
		const res = await getsalaryNotsocial(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
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
</script>

