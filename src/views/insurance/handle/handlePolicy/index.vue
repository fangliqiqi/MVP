<template>
	<div class="archives-online-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" @onReset="onReset">
			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>

			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<policy-edit-dialog ref="editPolicyRef" @ok="refreshList"></policy-edit-dialog>
		<policy-detail-dialog ref="detailPolicyRef"></policy-detail-dialog>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { insurancePolicy, insurancePolicyList, deletePolicyDetail } from '/@/api/insurance/policy.js';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import CompanySelect from '../../component/InsureCompanySelect.vue';
import { INSURE_POLICE_HEADER_EXPORT } from '/@/utils/header.js';
import moment from 'moment';
import { exportExcelSheet } from '/@/utils/excel';
import { formatRangeDateAndDiff } from '/@/utils/formatTime.js';
import PolicyDetailDialog from './PolicyDetailDialog.vue';
import PolicyEditDialog from './PolicyEditDialog.vue';
import { ElMessageBox } from 'element-plus';

export default {
	name: '保单维护',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		CompanySelect,
		PolicyEditDialog,
		PolicyDetailDialog,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		// 编辑
		const editPolicyRef = ref(null);
		// 详情
		const detailPolicyRef = ref(null);

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.doSearch();
		};

		// 导出
		const handleExport = () => {
			state.btn.find((item) => item.label == '导出').loading = true;
			let tParams = Object.assign(proTableRef.value.getParams(), state.params);
			delete tParams.size;
			delete tParams.current;
			insurancePolicyList(tParams)
				.then((res) => {
					if (res && res.code === 200) {
						const ex = res.data.map((item) => {
							return {
								...item,
								enableFlag: { 0: '启用', 1: '禁用' }[item.enableFlag],
							};
						});

						exportExcelSheet(INSURE_POLICE_HEADER_EXPORT, ex, `保单信息批量导出${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
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
					dataIndex: 'policyNo',
					title: '保单号',
					minWidth: 140,
				},
				{
					dataIndex: 'createTime',
					title: '保单起止日期',
					hideInSearch: true,
					minWidth: 200,
					valueType: 'custom',
					scopedSlots: { customRender: 'BeginEndTime' },
				},
				{
					dataIndex: 'createTime',
					title: '保单起止日期',
					hideInTable: true,
					searchIndex: 'startEndTime',
					startTime: 'policyStart',
					endTime: 'policyEnd',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInSearch: true,
					minWidth: 120,
				},

				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 120,
				},
				{
					dataIndex: 'enableFlag',
					title: '是否启用',
					minWidth: 100,
					valueEnum: {
						0: '启用',
						1: '禁用',
					},
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 170,
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
					onClick: handleExport,
					permission: ['insurancePolicy_list'],
					type: 'default',
					icon: 'icon-ic_edit_upload',
				},
			],
			cellBtns: [
				{
					text: '查看',
					prop: 'detail', // 唯一标识
					permission: ['insurancePolicy_getById'],
				},
				{
					text: '编辑',
					prop: 'edit',
					permission: ['insurancePolicy_update'],
				},
				{
					text: '删除',
					prop: 'delete',
					permission: ['insurancePolicy_delete'],
				},
			],
			params: {
				insuranceCompanyName: '',
			},
		});

		const onReset = () => {
			state.params = {};
		};

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params);

				const res = await insurancePolicy(p);
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
					unref(detailPolicyRef)?.openDialog(item);
					break;
				case 'edit':
					unref(editPolicyRef)?.openDialog(item);
					break;
				case 'delete':
					const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，保单将从系统消失，请谨慎操作！</span></p>`;

					ElMessageBox.confirm(text, {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						dangerouslyUseHTMLString: true,
					})
						.then(async () => {
							try {
								const res = await deletePolicyDetail(item.id);
								if (res.code === 200) {
									message.success('删除成功');
								} else {
									message.error(res.msg || '删除失败');
								}
							} catch (e) {
								message.error('删除失败');
							} finally {
								refreshList();
							}
						})
						.catch(() => {});

					break;
			}
		};

		return {
			...toRefs(state),
			editPolicyRef,
			detailPolicyRef,
			request,
			onCellClick,
			proTableRef,
			refreshList,
			onReset,
			formatRangeDateAndDiff,
		};
	},
};
</script>
