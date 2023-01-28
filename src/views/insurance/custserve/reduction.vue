<template>
	<div class="custserve-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" @onReset="onReset">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<!-- search -->
			<template v-slot:ProjectSelect>
				<project-select v-model="params.deptNo" style="width: 100%" />
			</template>
			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>

			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>
		</pro-table>

		<!-- 查看 -->
		<insure-detail-dialog ref="insureDetailRef" />
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import insureDetailDialog from '../component/insureDetailDialog.vue';
import ProjectSelect from '../component/ProjectSelect.vue';
import CompanySelect from '../component/InsureCompanySelect.vue';
import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import { INSURE_REDUCE_HEADER_EXPORT } from '/@/utils/header.js';
import { formatRangeDateAndDiff } from '/@/utils/formatTime.js';
import moment from 'moment';
import { getInsuranceRefundPageList, getInsuranceRefundList } from '/@/api/insurance/custserve.js';
import { buyType } from '../component/dict.js';
import { getProjectManageList } from '/@/api/projectmanage/index';
export default {
	name: '已退保',
	components: {
		ProTable,
		ProButtons,
		insureDetailDialog,
		ProjectSelect,
		CompanySelect,
	},
	setup() {
		const proTableRef = ref(null);
		const insureDetailRef = ref(null);

		const formatAddress = (province, city) => {
			if (province && city) {
				return `${province}/${city}`;
			}

			if (province) {
				return `${province}`;
			}

			if (city) {
				return `${city}`;
			}

			return '';
		};

		// 导出
		const handleReduceExport = () => {
			const p = Object.assign({}, state.params, proTableRef.value.getParams());
			delete p.size;
			delete p.current;
			state.btn.find((item) => item.label === '导出减员名册').loading = true;
			getInsuranceRefundList(p)
				.then((res) => {
					exportExcelSheet(
						INSURE_REDUCE_HEADER_EXPORT,
						(res.data || []).map((item) => {
							item.buyType = buyType[item.buyType];

							item['insuranceAddress'] = formatAddress(item.insuranceProvinceName, item.insuranceCityName); //商险购买地
							item['insuranceHandleAddress'] = formatAddress(item.insuranceHandleProvinceName, item.insuranceHandleCityName); //商险办理地

							return item;
						}),
						`商险已减员人员名册_${moment().format('YYYYMMDDHHmmss')}`
					);
					ElMessage.success('导出成功');
				})
				.finally(() => {
					state.btn.find((item) => item.label === '导出减员名册').loading = false;
				});
		};

		const onReset = () => {
			state.params = {
				deptNo: null,
				insuranceCompanyName: null,
			};
		};

// 获取结算主体列表
const requestZhutiList = async (params) => {
	try {
		const p = Object.assign({}, { deleteFlag: 0 }, params)
		const res = await getProjectManageList(p);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
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
}
		const state = reactive({
			params: {
				deptNo: null,
				insuranceCompanyName: null,
			},

			searchConfig: {
				labelWidth: '102px',
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'buyType',
					title: '投保类型',
					width: 120,
					valueEnum: {
						1: '新增',
						3: '批增',
						4: '替换',
					},
				},

				{
					dataIndex: 'projectName',
					title: '项目',
					hideInSearch: true,
					minWidth: 120,
					ellipsis: true,
				},
				// 仅搜索
				// {
				// 	dataIndex: 'deptNo',
				// 	title: '项目',
				// 	valueType: 'custom',
				// 	hideInTable: true,
				// 	scopedSlots: { customRender: 'ProjectSelect' },
				// },
				{
					dataIndex: 'deptNo',
					title: '项目',
					minWidth: 200,
					valueType: 'PageSelect',
					hideInTable: true,
					request:requestZhutiList,
					pageProps:{
							valueKey:'departNo',
							title:'departName',
							search:'departName',
							parmas:{
							}
					},
					tooltip: true,
				},

				{
					dataIndex: 'empName',
					title: '姓名',
					width: 100,
				},
				{
					dataIndex: 'empIdcardNo',
					title: '身份证号',
					width: 170,
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					minWidth: 120,
					ellipsis: true,
					hideInSearch: true,
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},
				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},

				{
					dataIndex: 'policyDate',
					title: '保单起止时间',
					minWidth: 220,
					hideInSearch: true,
					scopedSlots: { customRender: 'BeginEndTime' },
				},
				{
					dataIndex: 'policyDate',
					title: '保单起止时间',
					hideInTable: true,
					selectType: 'daterange',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					searchIndex: 'startEndTime',
					startTime: 'policyStart',
					endTime: 'policyEnd',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准（元）',
					width: 120,
					hideInSearch: true,
				},
				{
					dataIndex: 'createName',
					title: '派单人',
					width: 90,
					hideInSearch: false,
					hideInTable: false,
				},

				{
					dataIndex: 'refundCreateTime',
					title: '派单日期',
					width: 120,
					hideInSearch: true,
				},
				{
					dataIndex: 'createTime',
					title: '派单日期',
					hideInSearch: false,
					hideInTable: true,
					selectType: 'daterange',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					searchIndex: 'startEndTime_1',
					startTime: 'startDate',
					endTime: 'endDate',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'id',
					title: 'id',
					hideInSearch: true,
					width: 120,
					ellipsis: true,
					hideInSearch: true,
				},

				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 70,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '导出减员名册',
					onClick: handleReduceExport,
					permission: ['insurance_custserve_reduction_export'],
					icon: 'icon-ic_edit_export',
				},
			],
			cellBtns: [
				{
					text: '查看',
					prop: 'detail', // 唯一标识
					permission: ['insurance_custserve_reduction_detail'], // 权限标识
				},
			],
		});

		const request = async (params) => {
			const p = Object.assign({}, state.params, params);
			try {
				const res = await getInsuranceRefundPageList(
					{
						size: p.size,
						current: p.current,
						mId: p.mId,
					},
					p
				);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records || [],
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
					insureDetailRef.value && insureDetailRef.value.openDialog(item);
					break;
			}
		};

		return {
			...toRefs(state),
			request,
			onReset,
			onCellClick,
			proTableRef,
			insureDetailRef,
			handleReduceExport,
			formatRangeDateAndDiff,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/reduction.scss"></style>
