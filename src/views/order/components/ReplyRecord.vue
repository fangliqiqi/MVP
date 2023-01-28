<template>
	<div>
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			:showHeader="false"
			class="reply-record-table"
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:orderReplyEnclosure="item">
				<template v-if="item.orderReplyEnclosure && item.orderReplyEnclosure.length">
					<template v-for="en in item.orderReplyEnclosure" :key="en.id">
						<a @click="onItemClick(en)" class="enclosure">{{ en.enclosureName }}</a>
					</template>
				</template>
				<template v-else>--</template>
			</template>
		</pro-table>
		<add-reply ref="addReplyRef" @ok="refresh" :orderNo="props.orderNo"></add-reply>
		<reply-file-detail ref="replyFileDetailRef"></reply-file-detail>
	</div>
</template>

<script setup name="ReplyRecord">
import { reactive, ref } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessage } from 'element-plus';
import AddReply from './AddReply.vue';
import ReplyFileDetail from './ReplyFileDetail.vue';
import { getOrderReplyPageList, getEnclosureUrl } from '/@/api/order.js';

const emits = defineEmits(['onActionUpdate']);

const props = defineProps({ orderNo: String });

const proTableRef = ref(null);
// 新增
const addReplyRef = ref(null);

const replyFileDetailRef = ref(null);

// 新增
const handleAddClick = () => {
	addReplyRef?.value?.openDialog();
};

const state = reactive({
	columns: [
		{
			dataIndex: 'index',
			title: '序号',
			width: 100,
		},
		{
			dataIndex: 'createName',
			title: '回复人',
		},

		{
			dataIndex: 'createTime',
			title: '回复时间',
		},
		{
			dataIndex: 'replyContent',
			title: '回复内容',
			minWidth: 150,
			tooltip: true,
		},
		{
			dataIndex: 'orderReplyEnclosure',
			title: '相关附件',
			minWidth: 150,
			tooltip: true,
			valueType: 'custom',
			scopedSlots: { customRender: 'orderReplyEnclosure' },
			formatter: (a, b, c) => {
				return (c || []).reduce((str, i) => str + i.enclosureName + '\n', '');
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
			label: '添加',
			onClick: handleAddClick,
			permission: ['order:order_uploadReplyEnclosure'],
			icon: 'icon-ic_edit_add',
			disabled: () => {
				return inject('disable');
			},
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
	],
});

const refresh = () => {
	proTableRef?.value?.doSearch();
	emits('onActionUpdate');
};

const onItemClick = (item) => {
	ElMessage.warning('正在下载');
	getEnclosureUrl(item.id).then((res) => {
		const path = (res.data || '').replace(/(http:|https:)/, location.protocol);
		window.open(path, '_blank');
	});
};

const request = async (params) => {
	try {
		params['orderNo'] = props.orderNo;
		const res = await getOrderReplyPageList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records.map((item, i) => {
					return {
						...item,
						index: (params.current - 1) * params.size + i + 1,
					};
				}),
			};
		}
	} catch (e) {}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			replyFileDetailRef?.value?.openDialog(item);
			break;
	}
};
</script>

<style lang="scss" scoped src="./css/ReplyRecord.scss">
</style>
