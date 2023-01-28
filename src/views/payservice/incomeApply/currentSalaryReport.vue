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
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<current-salary-report-Dilog ref="currentSalaryReportDilogRef"  @ok="refreshList"></current-salary-report-Dilog>  
	</div>

</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox,ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import currentSalaryReportDilog from './component/currentSalaryReportDilog.vue';

import { getCurrentSalaryReportList,currentSalaryReportExport,deleteCuerrentSalary} from '/@/api/payservice/currentSalaryReport';

import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';

import {
	APPLY_DELETE_IMPORT_HEADER
} from '/@/utils/header';
import moment from 'moment';


export default {
	name: '本期薪资申报',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		currentSalaryReportDilog,
		ExportExcelDialog,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const proTableRef = ref(null);
		const currentSalaryReportDilogRef  = ref(null);
		const isShowExportLoading=ref(false)
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
					isShowExportLoading.value = true
			
					const parData = Object.assign({},state.params)
					const exportColums = Object.assign({},state.exportColums)
					const exportFields=[]
					for (const key in exportColums) {
							const element = exportColums[key];
							exportFields.push(element)
					}
					currentSalaryReportExport({	...parData,exportFields}).then(res=>{
						ElMessage.success('导出成功');							
					}).catch().finally(()=>{
						isShowExportLoading.value = false
					})
		};

		//手动刷新
		const handleRefreshClick = () => {
			if (currentSalaryReportDilogRef.value) currentSalaryReportDilogRef.value.openDialog();
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
					dataIndex: 'invoiceTitle',
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
					hideInSearch: false,
					selectType: 'month',
					format:'YYYYMM',
					valueFormat: 'YYYYMM',
					clearable:false,
					isShowDefaultDate:{
						defaultValue:moment(new Date()).format('YYYYMM'),
						type:'declareMonth'
					}
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					minWidth: 140,
					tooltip: true,
					hideInSearch: true,
				},
				{
					dataIndex: 'empIdcard',
					title: '身份证号码',
					minWidth: 200,
						hideInSearch: true,
				},
			
				{
					dataIndex: 'realSalary',
					title: '本期收入',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'salaryTax',
					title: '本期应纳税额',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'personalPensionMoney',
					title: '本期基本养老保险',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'personalMedicalMoney',
					title: '本期基本医疗保险',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'personalUnemploymentMoney',
					title: '本期失业保险',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'personalProvidentFee',
					title: '本期住房公积金',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'enterpriseAnnuity',
					title: '本期企业年金',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'costReduction',
					title: '累计减除费用',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'taxable',
					title: '累计应纳税所得额',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'childEduinfoMoney',
					title: '累计子女教育',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'continuingEducationExpenseMoney',
					title: '累计继续教育',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'housingLoanInterestExpenseMoney',
					title: '累计住房贷款',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'housingRentalinfoMoney',
					title: '累计住房租金',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'supportElderlyExpenseMoney',
					title: '累计赡养老人',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'sumBabyMoney',
					title: '累计3岁以下婴幼儿照护',
					minWidth: 200,
					hideInSearch: true,
				},
				{
					dataIndex: 'sumPrivatePension',
					title: '累计个人养老金',
					minWidth: 200,
					hideInSearch: true,
				},

					{
					dataIndex: 'isNewEmployee',
					title: '是否当月新增人员',
					minWidth: 160,
					hideInSearch: true,
						valueEnum: {
						0: '否',
						1: '是',
					}
				},
					{
					dataIndex: 'createMonth',
					title: '入职年月',
					minWidth: 160,
					hideInSearch: true,
				},
					{
					dataIndex: 'empPhone',
					title: '手机号码',
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
					permission: ['salary_tstatisticscurrentreport-export'],
					icon: 'icon-ic_edit_export',
					loading:isShowExportLoading
				},
				{
					label: '手动刷新',
					type: 'default',
					onClick: handleRefreshClick,
					permission: ['salary_tstatisticstaxsalary_refresh'],
				},
			],
			cellBtns: [
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['salary_tstatisticscurrentreport_del'], // 权限标识
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
			exportColums:[
				'invoiceTitle',
				'declareMonth',
				'empName',
				'empIdcard',
				'realSalary',
				'salaryTax',
				'personalPensionMoney',
				'personalMedicalMoney',
				'personalUnemploymentMoney',
				'personalProvidentFee',
				'enterpriseAnnuity',
				'costReduction',
				'taxable',
				'childEduinfoMoney',
				'continuingEducationExpenseMoney',
				'housingLoanInterestExpenseMoney',
				'housingRentalinfoMoney',
				'supportElderlyExpenseMoney',
				'sumBabyMoney',
				'sumPrivatePension',
				'isNewEmployee',
				'createMonth',
				'empPhone',
				
			]
		});

		const onReset = () => {
			state.params = {};
		};

	

		const request = async (params) => {
			try {
						let dataObj={}
						if(!!params.declareMonth){
								dataObj=params
						}else{
						const  {declareMonth,...otherKey} = params
						dataObj = {...otherKey,declareMonth:moment(new Date()).format('YYYYMM')}
						}
				const p = Object.assign({},dataObj); 
				// const p = Object.assign({},params); 
				const res = await getCurrentSalaryReportList(p);
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
				deleteCell(item)
					break;
			}
		};
	/**
 * 删除单条报表
 */
const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，薪资申报信息将从系统消失，请谨慎操作！</span></p>`;
	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deleteCuerrentSalary(item.id);
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
			currentSalaryReportDilogRef,
			refreshList,
			APPLY_DELETE_IMPORT_HEADER,
			onReset,
			isShowExportLoading
		};
	},
};
</script>

<style lang="scss" scoped src="./css/comm.scss">

</style>
