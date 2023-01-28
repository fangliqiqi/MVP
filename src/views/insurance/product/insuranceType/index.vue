<template>
	<div class="archives-online-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" @onReset="onReset">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>
			<template v-slot:NameSelect>
				<type-select v-model="params.name" style="width: 100%" />
			</template>
		</pro-table>
		<!--新增校验弹框-->
		<downshift-dialog ref="downshiftDialog" @ok="refreshList"></downshift-dialog>
		<!-- 详情 -->
		<insurance-detail-dialog ref="insuranceDetailDialog" />
		<!-- 编辑详情或费率 -->
		<edit-insurance-dialog ref="editInsuranceDialog" />
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { insuranceType } from '/@/api/insurance/company';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import downshiftDialog from './component/downshiftDialog.vue';
import insuranceDetailDialog from './component/insuranceDetail.vue';
import editInsuranceDialog from './component/editInsuranceDialog.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import CompanySelect from '../../component/InsureCompanySelect.vue';
import TypeSelect from '../../component/InsuranceTypeSelect.vue';

export default {
	name: '险种',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		downshiftDialog,
		insuranceDetailDialog,
		editInsuranceDialog,
		CompanySelect,
		TypeSelect,
	},
	setup() {
		const proTableRef = ref(null);
		const downshiftDialog = ref(null);
		const insuranceDetailDialog = ref(null);
		const editInsuranceDialog = ref(null);
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};
		/**新增保险公司 */
		const batchImport = () => {
			if (downshiftDialog.value) downshiftDialog.value.openDialog();
		};
		/**编辑保险公司 */
		const editCell = (item) => {
			if (downshiftDialog.value) downshiftDialog.value.editDialog(item);
		};

		const state = reactive({
			nameList: [], // 险种搜索框
			searchConfig: {
				labelWidth: 100,
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'name',
					title: '险种',
					minWidth: 140,
					tooltip: true,
					fixed: 'left',
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					minWidth: 200,
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
					dataIndex: 'bankName',
					title: '收款银行',
					hideInSearch: true,
					minWidth: 200,
				},
				{
					dataIndex: 'bankNo',
					title: '收款银行账号',
					hideInSearch: true,
					minWidth: 200,
				},
				{
					dataIndex: 'receiptUnitName',
					title: '收款单位',
					hideInSearch: true,
					minWidth: 200,
					tooltip: true,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 220,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '新增险种',
					onClick: batchImport,
					type: 'default',
					permission: ['insuranceType_add'],
					icon: 'icon-ic_edit_add',
				},
			],
			cellBtns: [
				{
					text: '编辑',
					prop: 'edit',
				},
				{
					text: '查看',
					prop: 'detail', // 唯一标识
				},
				{
					text: '购买标准',
					prop: 'standard', // 唯一标识
				},
				{
					text: '费率',
					prop: 'rate', // 唯一标识
				},
			],
			params: {},
		});

		const onReset = () => {
			state.params = {};
		};

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params); // fileStatus: 0 正常 1 已减档
				delete p.fileAddress;

				const res = await insuranceType(p);
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

		const detailcell = (item) => {
			if (insuranceDetailDialog.value) insuranceDetailDialog.value.openDialog(item.id);
		};
		const rateCell = (item, flag) => {
			if (editInsuranceDialog.value) editInsuranceDialog.value.openDialog(item.id, flag);
		};
		const standardCell = (item, flag) => {
			if (editInsuranceDialog.value) editInsuranceDialog.value.openDialog(item.id, flag);
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'edit':
					editCell(item);
					break;
				case 'rate':
					// 费率操作
					rateCell(item, 'rate');
					break;
				case 'detail':
					// 打开详情
					detailcell(item);
					break;
				case 'standard':
					standardCell(item, 'standard');
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			downshiftDialog,
			refreshList,
			onReset,
			insuranceDetailDialog,
			editInsuranceDialog,
		};
	},
};
</script>
