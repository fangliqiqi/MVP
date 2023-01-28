<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :multi="false"
			:searchConfig="searchConfig">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
	</div>
</template>

<script setup name="预派单查询">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';

import {
	getpresendorderList,
} from '/@/api/socialfund/presendorder';

const proTableRef = ref(null);
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
			dataIndex: 'id',
			title: 'ID',
			minWidth: 200,
			hideInSearch: true,
		},
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 120,
			tooltip: true,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},
		{
			dataIndex: 'departNameAdd',
			title: '项目名称',
			minWidth: 220,
			tooltip: true,
		},
		{
			dataIndex: 'customerName',
			title: '单位名称',
			minWidth: 220,
			tooltip: true,
		},
		{
			dataIndex: 'userDeptName',
			title: '派单人所属部门',
			minWidth: 200,
			hideInSearch: false,
			tooltip: true,
		},
		{
			dataIndex: 'payAddress',
			title: '缴费地',
			minWidth: 200,
			hideInSearch: true,
			tooltip: true,
		},
		{
			dataIndex: 'type',
			title: '增减类型',
			minWidth: 140,
			tag: {
				0: { type: 'success', },
				1: { type: 'danger', },
			},
			valueEnum: {
				0: "派增",
				1: "派减"
			}
		},
		{
			dataIndex: 'preStatus',
			title: '单据状态',
			minWidth: 140,
			valueEnum: {
				0: "正常未派单",
				1: "异常未派单",
				2: "已派单"
			},
		},
		{
			dataIndex: 'dispatchFlag',
			title: '是否派单',
			minWidth: 140,
			hideInSearch: true,
			align: 'center',
			valueEnum: {
				0: '是',
				1: '否',
			},
		},
		{
			dataIndex: 'dataSubStatus',
			title: '资料是否提交',
			minWidth: 140,
			align: 'center',
			valueEnum: {
				0: "已提交",
				1: "未提交"
			},
		},
		{
			dataIndex: 'remark',
			title: '备注',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'createTime',
			title: '导入日期',
			minWidth: 180,
			searchIndex: 'startEndTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
			valueType: 'dateTimeRange',

			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			format: 'YYYY-MM-DD',
			selectType: 'daterange',
		},
		{
			dataIndex: 'createName',
			title: '导入人',
			minWidth: 220,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 140,
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
			permission: ['social_tpredispatchinfo_get'], // 权限标识
		},
	],
	dictKeys: [
		'send_order_type', //派单类型
		'pre_send_status', //单据状态
		'data_submit_status', //资料是否提交
		'is_send_order', //是否派单
	], //字典项,
	selectionChangeList: [],
	dictData: {}, //字典数据
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);


const request = async (params) => {
	try {
		const res = await getpresendorderList(params);
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
// 页面刷新
const refresh = () => {
	proTableRef.value.refresh();
};
const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			router.push({
				name: 'pre-order-detail-query',
				params: {
					id: item.id,
				},
			});
			break;
		default:
	}
};
const listener = () => {
	onRefresh(proxy, route.path, () => {
		refresh();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	listener();
});



</script>
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
