<template>
	<div class="system-dict-container">
		<pro-table 
      ref="proTableRef" 
      row-key="id" 
      :columns="columns" 
      :request="request" 
			:btn="btn" 
      :searchConfig="searchConfig" 
		>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item"  @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>	

		<!-- 审核展示 -->
		<show-audit-info ref="showAuditInfoRef" @audit="onAudit"/>
		<!-- 审核弹窗-->
		<audit-pay-vue ref="auditPayRef" @ok="refresh"/>

	</div>
</template>

<script setup name="薪酬导入审核">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import showAuditInfo from './component/showAuditInfo.vue';
import auditPayVue from './component/auditPay.vue';
import { getDictByItemTypes } from '/@/utils/utils';
import { useRouter,useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';
import {getpayImportAuditList} from '/@/api/payservice/payimport'

const proTableRef = ref(null);
const showAuditInfoRef = ref(null);
const auditPayRef = ref(null);
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();


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
				title: '审核状态',
				hideInSearch: true,
				minWidth: 160,
				valueEnum:{
          1:'待审核',
          2:'审核通过',
          5:'审核不通过'
        }
			},
			{
				dataIndex: 'deptName',
				title: '项目名称',
				minWidth: 200,
				tooltip: true,
			},
			{
				dataIndex: 'deptNo',
				title: '项目编码',
				minWidth: 160,
			},
					// 新增的字段 applyNo
			{
				dataIndex: 'applyNo',
				title: '申请编码',
				minWidth: 160,
			},
      {
				dataIndex: 'status',
				title: '审核状态',
				hideInTable: true,
				minWidth: 160,
        valueEnum:{
          1:'待审核',
          2:'审核通过',
          5:'审核不通过'
        }
			},
			{
				dataIndex: 'settlementAmount',
				title: '项目金额',
				minWidth:160,
        hideInSearch: true,
			},
			{
				dataIndex: 'invoiceTitle',
				title: '封面抬头',
				hideInSearch: true,
				minWidth: 200,
				tooltip:true
			},
			{
				dataIndex: 'salaryMonth',
				title: '薪酬月份',
				minWidth: 160,
				valueType: 'date',
				selectType:'month',
				valueFormat:'YYYYMM',
				format:'YYYYMM',
			},
			{
				dataIndex: 'formType',
				title: '表单类型',
				minWidth: 160,
        hideInSearch: true,
			},
			{
				dataIndex: 'createTime',
				title: '创建时间',
				minWidth: 180,
				hideInSearch: true,
			},
      {
				dataIndex: 'createName',
				title: '创建人',
				minWidth: 180,
				hideInSearch: true,
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
			
		btn: [],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: [], // 权限标识
			},
			{
				text: '审核',
				prop: 'audit', // 唯一标识
				permission: [], // 权限标识
				isGray: (row) => {
					return row.status !== 1;
				},
			},
		],
		selectOptions:[],//多选数据
		params:{},//导出请求数据
		dictKeys:[  //字典项
    'form_type',//表单类型
		'salary_status',//薪酬状态
  ],
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getpayImportAuditList(params);
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
				name: 'payservice-audit-detail', 
				params: {
					id: item.id,
				},
			})
		}else if(prop == 'audit'){
			showAuditInfoRef.value&&showAuditInfoRef.value.openDialog(item);
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
						case 'formType':
							item.valueEnum = res['form_type']; // 表单类型
							break;
					}
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};

	// 审核
	const onAudit = (data)=>{
		auditPayRef.value&&auditPayRef.value.openDialog(data);
	}

	const listener = () => {
		onRefresh(proxy, route.path, () => {
			refresh();
		});
	};

	onMounted(() => {
		loadDicts();
		listener();
	});

	onUnmounted(() => {
		offRefresh(proxy);
	});

	

</script>
<style lang="scss" scoped src="./css/comm.scss">
</style>
