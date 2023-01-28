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
								<a href="/template/专项扣税模板.xlsx" download> 专项扣除导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--专项扣除批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:type="1"
			:header="SPECIAL_DEDUCTION_HEADER"
			:upload="importSpecialDeduction"
			@ok="refreshList"
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<batch-delete ref="batchDeleteRef" @ok="refreshList"></batch-delete>

		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import {
	getSpeciaDecutionList,
	deleteSpeciaDecution,
	speciaDecutionUploadSds,
	findSpeciaDecution
} from '/@/api/payservice/specialdeduction';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox,ElMessage } from 'element-plus';
import { ArrowDown, } from '@element-plus/icons-vue';

import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import batchDelete from './component/batchDelete.vue';

import attachDetailVue from './component/attachDetail.vue';

import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';
import moment from 'moment';
import {
	SPECIAL_DEDUCTION_HEADER,
} from '/@/utils/header';

export default {
	name: '专享扣除数据',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		BatchImportDialog,
		batchDelete,
		ExportExcelDialog,
		attachDetailVue
	},
	setup() {
		const route = useRoute();
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);

		const batchImportDialogRef = ref(null);
		const attachDetailRef = ref(null);

		const batchDeleteRef = ref(null);
		const { proxy } = getCurrentInstance();

		// 刷新
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.onSearch();
		};
		// 导入弹框
		const batchImport = () => {
			if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
		};
		// 执行导入上传
		const importSpecialDeduction = (_, data) => {
			return speciaDecutionUploadSds(data);
		};

	
	  

		// 批量删除
		const handleDeleteClick = () => {
			if (batchDeleteRef.value) batchDeleteRef.value.openDialog();
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
					dataIndex: 'name',
					title: '姓名',
					minWidth: 140,
					tooltip: true,
					fixed: 'left',
				},
				{
					dataIndex: 'jobNumber',
					title: '工号',
					hideInSearch: true,
					minWidth: 160,
				},
				{
					dataIndex: 'createMonth',
					title: '导入月份',
					valueType: 'date',
					minWidth: 160,
					selectType: 'month',
					format: 'YYYYMM',
					valueFormat: 'YYYYMM',
				},
				{
					dataIndex: 'idNumber',
					title: '身份证号',
					minWidth: 200,
				},

				{
					dataIndex: 'preTaxDeduction',
					title: '税前扣除项目合计',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'declareTitle',
					title: '申报单位',
					minWidth: 160,
					tooltip: true,
				},
				{
					dataIndex: 'costReduction',
					title: '减除费用',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 160,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '专项扣除导入',
					onClick: batchImport,
					type: 'default',
					permission: ['employee_batch_import'],
					icon: 'icon-ic_edit_upload',
				},
				{
					label: '批量删除',
					type: 'default',
					onClick: handleDeleteClick,
					permission: ['employee_batch_import'],
					icon: 'icon-ic_edit_delete',
				},
			],
			cellBtns: [
				{
					text: '详情',
					prop: 'detail', // 唯一标识
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['wxhr:tspecialdeducationsum_del'], // 权限标识
					tooltip: '当前状态不可删除',
					isGray: (record) => {
						if(record.createMonth){
							return (record.createMonth!=moment().format('YYYYMM'));
						}
							
						},
				},
			],
			DICTS: {},
			detailConf:[
			// {label: '姓名', key: 'name'},
			{label: '创建时间', key: 'createTime',tooltip: true},
			{label: '所得期间起', key: 'createStart',tooltip: true},
			{label: '所得期间止', key: 'createEnd',tooltip: true},
			{label: '减除费用', key: 'costReduction',tooltip: true},
			{label: '导入月份', key: 'createMonth',tooltip: true},
			{label: '本期收入', key: 'currentIncome',tooltip: true},
			{label: '本期免税收入', key: 'currentIncomeTaxFree',tooltip: true},
			{label: '其他金额', key: 'otherMoney',tooltip: true},
			{label: '准予扣除的捐赠额', key: 'donationAmount',tooltip: true},
			{label: '企业（职业）年金', key: 'enterpriseAnnuity',tooltip: true},
			{label: '住房公积金', key: 'fund',tooltip: true},
			{label: '证照号码', key: 'idNumber',tooltip: true},
			{label: '基本医疗保险费', key: 'insuranceMedical',tooltip: true},
			{label: '基本养老保险费', key: 'insurancePension',tooltip: true},
			{label: '失业保险费', key: 'insuranceUnemployment',tooltip: true},
			{label: '累计子女教育', key: 'sumChildEduMoney',tooltip: true},
			{label: '累计继续教育', key: 'sumContinuingEducationMoney',tooltip: true},
			{label: '累计住房贷款利息', key: 'sumHousingLoanMoney',tooltip: true},
			{label: '累计住房租金', key: 'sumHousingRentMoney',tooltip: true},
			{label: '累计赡养老人', key: 'sumSupportElderlyMoney',tooltip: true},
			{label: '累计3岁以下婴幼儿照护', key: 'sumBabyMoney',tooltip: true},
			{label: '累计个人养老金', key: 'sumPrivatePension',tooltip: true},
			{label: '商业健康保险', key: 'takingRisks',tooltip: true},
			{label: '税延养老保险', key: 'taxDeferredInsurance',tooltip: true},
			{label: '减免税额', key: 'taxSavings',tooltip: true},
			{label: '已扣缴税额', key: 'taxesWithheld',tooltip: true},
			{label: '税前扣除项目合计', key: 'preTaxDeduction',tooltip: true},
			{label: '申报单位', key: 'declareTitle',tooltip: true},
		
		],
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
				const res = await getSpeciaDecutionList(p);
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

		const deleteCell = (item) => {
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，配置将从系统消失，请谨慎操作！</span></p>`;

			ElMessageBox.confirm(text, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await deleteSpeciaDecution(item.id);
						if (res && res.code === 200) {
							message.success('专项扣除删除成功');
							refreshList();
						} else {
							message.error(res.msg || '专项扣除删除失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error((e && e.msg) || '专项扣除删除失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					findSpeciaDecution(item.id).then((res)=>{
					if(res.code == 200){
							if (attachDetailRef.value) attachDetailRef.value.openDialog(res.data, '详情','',state.detailConf);
					}else{
								ElMessage.error('未查询到当前详情数据');
					}
			
					}).catch(err=>{
						console.log(err)
					}).finally(err=>{
						console.log(err)
					})
				
					break;
				case 'delete':
					// 删除操作
					deleteCell(item);
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
			batchImportDialogRef,
			batchDeleteRef,
			refreshList,
			SPECIAL_DEDUCTION_HEADER,
			onReset,
			attachDetailRef,
			importSpecialDeduction
		};
	},
};
</script>

<style lang="scss" scoped src="./css/comm.scss"></style>

