<template>
	<div class="archives-online-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:multi="false"
			:searchConfig="searchConfig"
		>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

			<current-labor-cost ref="currentLaborCostRef"  @ok="refreshList"></current-labor-cost >  
			<current-labor-cost-fresh ref="currentLaborCostFreshRef"  @ok="refreshList"></current-labor-cost-fresh >  
	</div>

</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox,ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import currentLaborCost from './component/currentLaborCost.vue';

import currentLaborCostFresh from './component/currentLaborCostFresh.vue';
import batchDelete from './component/batchDelete.vue';

import { getCurrentLabortList,currentLabortyExport,deleteCurrentLaborty} from '/@/api/payservice/currentLaborCost';

import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRouter } from 'vue-router';

import {
	APPLY_DELETE_IMPORT_HEADER
} from '/@/utils/header';


export default {
	name: '本期劳务费申报',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		batchDelete,
		ExportExcelDialog,
		currentLaborCost,
		currentLaborCostFresh
	},
	setup() {
		const router = useRouter();
		const proTableRef = ref(null);
		const currentLaborCostRef  = ref(null);
		const isShowExportLoading=ref(false)
		const currentLaborCostFreshRef  = ref(null);
	

		// 导出
		const batchExport = () => {
				state.params = proTableRef.value.getParams()
				delete state.params.size
				delete state.params.current
				isShowExportLoading.value= true
					currentLabortyExport(state.params).then(res=>{
						ElMessage.success('导出成功');							
					}).catch().finally(()=>{
						isShowExportLoading.value= false
				})
		};

		//批量删除
		const handlDatchDeleteClick = () => {
			if (currentLaborCostRef.value) currentLaborCostRef.value.openDialog();
		};

			//手动刷新
		const handleRefreshClick = () => {
			if (currentLaborCostFreshRef.value) currentLaborCostFreshRef.value.openDialog();
		};
	

		const state = reactive({
			searchConfig: {
				labelWidth: 110,
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				
				{
					dataIndex: 'declareUnit',
					title: '申报单位',
					hideInSearch: true,
					minWidth: 160,
					fixed: 'left',
					tooltip: true,
				},
				 {
					dataIndex: 'declareMonth',
					title: '申报月份',
					valueType: 'date',
					minWidth: 160,
					hideInSearch: false,
					selectType: 'month',
						format:'YYYYMM',
					valueFormat: 'YYYYMM',
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					minWidth: 140,
					tooltip: true,
					hideInSearch: false,
				},
				{
					dataIndex: 'cardType',
					title: '证件类型',
					minWidth: 200,
					hideInSearch: true,
				},
				{
					dataIndex: 'empIdcard',
					title: '证件号码',
					minWidth: 200,
					tooltip: true,
				},
				{
					dataIndex: 'incomeItem',
					title: '所得项目',
					minWidth: 160,
						hideInSearch: true,
				},
				{
					dataIndex: 'income',
					title: '收入',
					minWidth: 160,
					hideInSearch: true,
				},
					{
					dataIndex: 'personalTax',
					title: '个税',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 100,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '导出',
					onClick: batchExport,
					type: 'default',
					loading:isShowExportLoading,
					permission: ['salary_tstatisticslabor-export'],
					icon: 'icon-ic_edit_export',
				},
				{
					label: '批量删除',
					type: 'default',
					onClick: handlDatchDeleteClick,
					permission: ['salary_tstatisticslabor_del'],
				},
					{
					label: '手动刷新',
					type: 'default',
					onClick: handleRefreshClick,
					permission: ['salary_tstatisticslabor_del'],
				},
			],
			cellBtns: [
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['salary_tstatisticslabor_del'], // 权限标识
					tooltip: '当前状态不可删除',
				},
			],
			DICTS: {},
			dictKeys: [
				'emp_natrue',
				'emp_married',
				'emp_national',
				'emp_political',
				'emp_registype',
				'education',
				'EMP_SOURCE',
				'social_ecurity_state',
				'commercial_satte',
				'personnel_state',
				'fund_status',
			],
			params: {},
			areaProps: {
				label: 'areaName',
				isLeaf: 'isLeaf',
				children: 'children',
			},
		});
		const request = async (params) => {
			try {
				const p = Object.assign({},params); // fileStatus: 0 正常 1 已减档
				const res = await getCurrentLabortList(p);
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
		const { columns, cellBtns,btn,searchConfig} = toRefs(state);
				// 刷新
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.onSearch();
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					router.push({ name: 'decution-detail', params: { id: item.id } });
					break;
				case 'delete':
					// 删除操作
					deleteCell(item)
					break;
			}
		};
		/**
 * 删除单条
 */
const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，该条信息将从系统消失，请谨慎操作！</span></p>`;
	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deleteCurrentLaborty(item.id);
				if (res && res.code === 200) {
					ElMessage.success('删除成功');
					refreshList();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error((e && e.msg) || '删除失败');
			}
		})
		.catch(() => {});
};
		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			refreshList,
			currentLaborCostRef ,
			APPLY_DELETE_IMPORT_HEADER,
			isShowExportLoading,
			currentLaborCostFreshRef,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/comm.scss">

</style>
