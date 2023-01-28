<template>
	<div class="archives-online-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn"
			:searchConfig="searchConfig" @onReset="onReset">
			<template v-slot:billingType="item">
				<div>{{ billType[item.billingType] || '--' }}</div>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:CompanySelect>
				<company-select v-model="params.companyName" style="width: 100%" />
			</template>

			<template v-slot:AreaSelect>
				<page-area :address="params.insuranceHandleCity" @current-change="changeAddress" @clear="clearAddress"
					style="width: 100%" :check-strictly="false" :has-town="false"></page-area>
			</template>

			<template #AreaAddress="item">
				<span v-if="item.insuranceHandleProvinceName && item.insuranceHandleCityName">{{
						item.insuranceHandleProvinceName
				}}/{{ item.insuranceHandleCityName }}</span>
				<span v-else>--</span>
			</template>
		</pro-table>
		<!--新增校验弹框-->
		<downshift-dialog ref="downshiftDialog" @ok="fresh"></downshift-dialog>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { insuranceCompany } from '/@/api/insurance/company.js';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import downshiftDialog from './component/downshiftDialog.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { billType } from '../../component/dict';

import pageArea from '/@/components/PageArea/index.vue';
import CompanySelect from '../../component/InsureCompanySelect.vue';

export default {
	name: '保险公司',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		downshiftDialog,
		pageArea,
		CompanySelect,
	},
	setup() {
		const proTableRef = ref(null);
		const downshiftDialog = ref(null);
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};
		const onSearch = () => {
			if (proTableRef.value) proTableRef.value.doSearch();
		};
		// 跟新,新增是到第一页，编辑时页数不动
		const fresh = (flag) => {
			if (flag) {
				onSearch()
			} else {
				refreshList()
			}
		}
		/**新增保险公司 */
		const batchImport = () => {
			if (downshiftDialog.value) downshiftDialog.value.openDialog();
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
					dataIndex: 'companyName',
					title: '保险公司',
					minWidth: 200,
					tooltip: true,
					fixed: 'left',
					hideInSearch: true,
				},
				{
					dataIndex: 'companyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},

				{
					dataIndex: 'companyDocking',
					title: '对接人',
					hideInSearch: true,
					minWidth: 120,
				},
				{
					dataIndex: 'companyAddress',
					title: '保险公司地址',
					tooltip: true,
					hideInSearch: true,
					minWidth: 200,
				},
				{
					dataIndex: 'companyHandlerAddress',
					title: '商险办理地',
					minWidth: 200,
					hideInSearch: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'AreaAddress' },
				},
				{
					dataIndex: 'companyHandlerAddress',
					title: '商险办理地',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'AreaSelect' },
				},
				{
					dataIndex: 'billingType',
					title: '计费方式',
					hideInSearch: true,
					minWidth: 100,
					valueType: 'custom',
					scopedSlots: {
						customRender: 'billingType',
					},
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
					label: '新增保险公司',
					onClick: batchImport,
					type: 'default',
					permission: ['insurance_company_ad'],
					icon: 'icon-ic_edit_add',
				},
			],
			cellBtns: [
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
				},
			],
			params: {},
		});

		const onReset = () => {
			state.params = {};
		};

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params);
				delete p.fileAddress;

				const res = await insuranceCompany(p);
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

		// 缴纳地
		const changeAddress = (val) => {
			if (val.city) {
				// 选中城市才更新
				state.params.insuranceHandleProvince = val.pro;
				state.params.insuranceHandleCity = val.city;
			}
		};
		const clearAddress = () => {
			state.params.insuranceHandleProvince = null;
			state.params.insuranceHandleCity = null;
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'edit':
					if (downshiftDialog.value) downshiftDialog.value.editDialog(item);
					break;
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			downshiftDialog,
			onSearch,
			refreshList,
			fresh,
			onReset,
			billType,
			changeAddress,
			clearAddress,
		};
	},
};
</script>
