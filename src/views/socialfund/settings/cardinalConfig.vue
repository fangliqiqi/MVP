<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" :searchConfig="state.searchConfig">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
	</div>
</template>

<!---->
<script setup name="基数配置">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getCardinalConfigList, disableOrEnableById } from '/@/api/socialfund/socialfundSet';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { EMPTY_PLACEHOLDER, formatMoney } from '/@/utils/utils';
import moment from 'moment';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
const proTableRef = ref(null);
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			// 详情
			{
				const name = state.detailName[item.baseType] || null;
				if (name) {
					router.push({ name: name, params: { id: item.id } });
				} else {
					ElMessage.warning('基数配置详情获取失败');
				}
			}

			break;
		case 'edit':
			{
				// 编辑
				const name = state.editName[item.baseType] || null;
				if (name) {
					router.push({ name, params: { id: item.id } });
				} else {
					ElMessage.warning('基数配置详情获取失败');
				}
			}

			break;
		case 'enable':
			// 启用
			ElMessageBox.confirm(`是否确定启用？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await disableOrEnableById({ id: item.id, status: 0 });
						if (res && res.code === 200) {
							ElMessage.success('启用成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '启用失败');
						}
					} catch (e) {
						ElMessage.error('启用失败');
					}
				})
				.catch(() => {});
			break;
		case 'disable':
			// 禁用
			ElMessageBox.confirm(`是否确定禁用？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await disableOrEnableById({ id: item.id, status: 1 });
						if (res && res.code === 200) {
							ElMessage.success('禁用成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '禁用失败');
						}
					} catch (e) {
						ElMessage.error('禁用失败');
					}
				})
				.catch(() => {});
			break;
	}
};

const state = reactive({
	searchConfig: {
		labelWidth: 90,
	},
	detailName: {
		// 对于模块的详情组件名称 0  社保，1公积金
		0: 'social-config-detail',
		1: 'fund-config-detail',
	},
	addName: {
		0: 'social-config-add',
		1: 'fund-config-add',
	},
	editName: {
		0: 'social-config-edit',
		1: 'fund-config-edit',
	},
	columns: [
		{
			dataIndex: 'departName',
			title: '户名称',
			minWidth: 220,
			tooltip: true,
			fixed: 'left',
		},
		{
			dataIndex: 'address',
			valueType: 'addRess',
			params: {
				pro: 'province',
				city: 'city',
				town: 'town',
			},
			title: '缴纳地',
			minWidth: 180,
			ellipsis: true,
			formatter: (row) => {
				return idToArea({ province: row.province, city: row.city, town: row.town });
			},
		},
		{
			dataIndex: 'applyStartDate',
			title: '适用周期',
			minWidth: 220,
			tooltip: true,
			hideInSearch: true,
			formatter: (row) => {
				let start = row.applyStartDate ? moment(row.applyStartDate).format('YYYY-MM-DD') : null;
				let end = row.applyEndDate ? moment(row.applyEndDate).format('YYYY-MM-DD') : '永久';
				return start + '~' + end;
			},
		},
		{
			dataIndex: 'applyDate',
			title: '适用月',
			hideInTable: true,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYY-MM-DD HH:mm:ss',
		},
		{
			dataIndex: 'upperLimit',
			title: '基数上限',
			minWidth: 160,
			hideInSearch: true,
			formatter: (row) => {
				return formatMoney(row.upperLimit);
			},
		},
		{
			dataIndex: 'lowerLimit',
			title: '基数下限',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return formatMoney(row.lowerLimit);
			},
		},
		{
			dataIndex: 'baseType',
			title: '类别',
			minWidth: 160,
			valueEnum: {
				0: '社保',
				1: '公积金',
			},
		},
		{
			dataIndex: 'fundPayType',
			title: '是否省直',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				if (row.baseType == 0) {
					return EMPTY_PLACEHOLDER;
				}
				const dic = {
					0: '市直',
					1: '省直',
				};
				return dic[row.fundPayType] || EMPTY_PLACEHOLDER;
			},
		},
		{
			// 改为已启用、已禁用无过期状态
			dataIndex: 'status',
			title: '状态',
			minWidth: 160,
			valueEnum: {
				0: '启用',
				1: '禁用',
			},
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			minWidth: 160,
			hideInSearch: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 240,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	btn: [
		{
			label: '新增社保配置',
			onClick: () => {
				router.push({ name: 'social-config-add' });
			},
			permission: ['social_sysbasesetinfo_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '新增公积金配置',
			onClick: () => {
				router.push({ name: 'fund-config-add' });
			},
			permission: ['social_sysbasesetinfo_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['social_sysbasesetinfo_detail'],
		},
		// {
		// 	text: '编辑',
		// 	permission: ['social_sysbasesetinfo_edit'],
		// 	prop: 'edit', // 唯一标识
		// },
		{
			text: '启用',
			permission: ['social_sysbasesetinfo_enable'],
			prop: 'enable', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return record.status != 1;
			},
		},
		{
			text: '禁用',
			permission: ['social_sysbasesetinfo_enable'],
			prop: 'disable', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return record.status != 0;
			},
		},
	],
	dictKeys: [],
	DICTS: {},
});

const listener = () => {
	onRefresh(proxy, route.path, () => {
		refreshList();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	listener();
	// loadDicts();
});

const loadDicts = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	}
};

const request = async (params) => {
	try {
		params.deleteFlag = 0; // 默认传参
		const res = await getCardinalConfigList(params);
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

<style lang="scss" scoped>
</style>
