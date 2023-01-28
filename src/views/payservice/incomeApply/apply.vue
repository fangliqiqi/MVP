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
			@onReset="onReset"
		>
			<template #extBtns>
				<el-dropdown class="arch-btn" popper-class="module-download">
					<span class="el-dropdown-link">
						<el-button size="default">
							模板下载
							<el-icon class="el-icon--right">
								<arrow-down />
							</el-icon>
						</el-button>
					</span>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<a href="/template/申报对象批量删除模板.xls" download> 申报对象批量删除模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
		
		
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--申报调整删除导入模板-->
		<batch-import-dialog
			ref="applyImportDialogRef"
			:type="1"
			:header="APPLY_DELETE_IMPORT_HEADER"
			url="/yifu-salary/method//tstatisticsdeclarer/importListDelete"
			@ok="refreshList"
			download
			title="申报调整"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	
		
		<batch-delete ref="applyDeleteRef"  @ok="refreshList"></batch-delete>  
	</div>

</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { } from '/@/utils/xlsx';

import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';

import batchDelete from './component/batchDelete.vue';

import { getApplyList, applyExport} from '/@/api/payservice/apply';

import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';

import {
	APPLY_DELETE_IMPORT_HEADER
} from '/@/utils/header';


export default {
	name: '申报对象',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		BatchImportDialog,
		batchDelete,
		ExportExcelDialog,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const proTableRef = ref(null);
		const isShowExportLoading=ref(false)
		

		const applyDeleteRef  = ref(null);
	
		const applyImportDialogRef = ref(null);

		const { proxy } = getCurrentInstance();
	
		// 刷新
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.onSearch();
		};
		// 导出
		const batchExport = () => {
			state.params = proTableRef.value.getParams()
			delete state.params.size
			delete state.params.current
			isShowExportLoading.value= true
			applyExport(state.params).then(res=>{
						ElMessage.success('导出成功');		
			}).catch().finally(()=>{
					isShowExportLoading.value= false
			})
		};

		//申报调整
		const handleReportClick = () => {
			if (applyImportDialogRef.value) applyImportDialogRef.value.openDialog();
		};
		const state = reactive({
			searchConfig: {
				labelWidth: 110,
				option: {
					extBtn: 'extBtns',
				},
			},
			fn:null,//导出的回调函数
			columns: [
				
				{
					dataIndex: 'declareUnit',
					title: '申报单位',
					hideInSearch: false,
					minWidth: 160,
					fixed: 'left',
					tooltip: true,
				},
				
				 {
					dataIndex: 'declareMonth',
					title: '申报月份',
					valueType: 'date',
					minWidth: 160,
					selectType: 'month',
					format:'YYYYMM',
					valueFormat: 'YYYYMM',
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					minWidth: 140,
					tooltip: true,
				
				},
				{
					dataIndex: 'empIdcard',
					title: '身份证号',
					minWidth: 200,
				},
			
				{
					dataIndex: 'empPhone',
					title: '手机号码',
					minWidth: 160,
					hideInSearch: true,
				},

					{
					dataIndex: 'empStatus',
					title: '人员状态',
					minWidth: 160,
					hideInSearch: true,
					hideInTable: true,
						valueEnum: {
						0: '在职',
						1: '离职',
					}
				},
				{
					dataIndex: 'occupationType',
					title: '任职受雇从业类型',
					hideInSearch: true,
					minWidth: 160,
					tooltip: false,
							valueEnum: {
						0: '雇员',
						1: '其他',
					}
				},
					{
					dataIndex: 'isDeclare',
					title: '本期是否申报',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
					valueEnum: {
						0: '是',
						1: '否',
					}
				},
				{
					dataIndex: 'isZeroDeclare',
					title: '是否0申报人员',
					minWidth: 160,
					valueEnum: {
						0: '是',
						1: '否',
					}
				},
					{
					dataIndex: 'undeclareReason',
					title: '不申报原因',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
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
					permission: ['salary_tstatisticsdeclarer-export'],
					icon: 'icon-ic_edit_export',
				},
				{
					label: '申报调整',
					type: 'default',
					onClick: handleReportClick,
					permission: ['salary_tstatisticsdeclarer-batch-delete'],
				},
			],
			cellBtns: [
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['salary_tstatisticsdeclarer_del'], // 权限标识
					tooltip: '当前状态不可删除',
						// if (applyDeleteRef.value) applyDeleteRef.value.openDialog();
					// isGray: (item) => {
					// 	return item.status != '0';
					// },
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

		const onReset = () => {
			state.params = {};
		};

	

		const request = async (params) => {
			try {
				const p = Object.assign({},params); // fileStatus: 0 正常 1 已减档
				const res = await getApplyList(p);
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
		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					router.push({ name: 'decution-detail', params: { id: item.id } });
					break;
				case 'delete':
					// 删除操作
				if (applyDeleteRef.value) applyDeleteRef.value.openDialog(item);
					break;
			}
		};
	
		const listener = () => {
			onRefresh(proxy, route.path, () => {
				refreshList();
			});
		};

		onMounted(() => {
			listener();
		});

		onUnmounted(() => {
			offRefresh(proxy);
		});
		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			applyDeleteRef,
			refreshList,
			applyImportDialogRef,
			APPLY_DELETE_IMPORT_HEADER,
			onReset,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/comm.scss">

</style>
