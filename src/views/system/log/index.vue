<template>
	<div class="system-dict-container">
		<pro-table row-key="id" ref="proRef" :columns="columns" columnEmptyText="--" :request="request" :initParams="initParams">
			<template v-slot:type="item">
				{{ typeOptions[item.type] }}
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<detail-log ref="detailLogRef" />
	</div>
</template>

<script setup name="日志管理">
import { reactive, toRefs } from 'vue';
import { getLogList, delLogById } from '/@/api/log';
import { ElMessageBox, ElMessage } from 'element-plus';
import moment from 'moment';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import DetailLog from './component/detailLog.vue';

const proRef = ref(null);
const detailLogRef = ref(null);
// 这个后面可能是需要字典，暂时写死
const typeOptions = { 0: '正常', 9: '异常' };

const state = reactive({
	columns: [
		{
			dataIndex: 'index',
			title: '序号',
			hideInSearch: true,
			minWidth: '80px',
		},
		{
			dataIndex: 'type',
			title: '类型',
			scopedSlots: { customRender: 'type' },
			valueType: 'select',
			valueEnum: typeOptions,
		},
		{
			dataIndex: 'title',
			title: '标题',
			minWidth:200,
			tooltip: true
		},
		{
			dataIndex: 'remoteAddr',
			title: 'IP地址',
			hideInSearch: true,
		},
		{
			dataIndex: 'method',
			title: '请求方式',
			hideInSearch: true,
		},
		{
			dataIndex: 'serviceId',
			title: '服务端',
			hideInSearch: true,
		},
		{
			dataIndex: 'time',
			title: '请求时间',
			hideInSearch: true,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			width: '200px',
			searchIndex: 'createTime',
			valueType: 'dateTimeRange',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 120,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	initParams: {
		createTime: [moment().format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59')],
	},
	cellBtns: [
		{
			text: '查看',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['sys_log_del'], // 权限标识
		},
	],
});

const { columns, cellBtns, initParams } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getLogList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records.map((item, i) => {
					return { ...item, index: (params.current - 1) * params.size + i + 1 };
				}),
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
	console.log('get onCellClick:', prop, item);
	if (prop === 'delete') {
		ElMessageBox.confirm('是否确定删除？', '提示', {
			type: 'warning',
		}).then(async () => {
			try {
				const res = await delLogById(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					proRef.value.refresh();
				} else {
					ElMessage.warning(res.msg);
				}
			} catch (e) {
				console.log('get exception:', e);
			}
		});
	} else if (prop === 'detail') {
		detailLogRef.value.openDialog(item);
	}
};
</script>

