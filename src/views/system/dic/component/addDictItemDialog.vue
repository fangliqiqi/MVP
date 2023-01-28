<template>
	<div class="system-add-dict-item-list-container">
		<el-dialog title="配置字典项" v-model="state.isShowDialog" width="1200px" :close-on-click-modal="false" style="max-width: calc(100vw - 40px)">
			<pro-table
				ref="proRef"
				row-key="id"
				:columns="columns"
				:request="request"
				:showHeader="false"
				:searchConfig="state.searchConfig"
				:manualRequest="true"
			>
				<template #btns>
					<div class="options-btn-container" v-if="!state.modal || state.modal.systemFlag !== '0'">
						<el-button type="primary" class="arch-btn" size="default" @click="handleAddClick">
							<svg-icon name="iconfont icon-ic_edit_add" />
							新增
						</el-button>
					</div>
				</template>

				<template v-slot:option="item">
					<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
				</template>

				<template v-slot:icon="item">
					<em :class="`iconfont ${item.icon}`"></em>
				</template>
			</pro-table>
<!-- 
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onCancel" size="default">确 定</el-button>
				</span>
			</template> -->
		</el-dialog>

		<add-dic-item-vue ref="addDicItemRef" @ok="refreshList"></add-dic-item-vue>
	</div>
</template>

<script setup name="addDictItemDialog">
import { getDicItemPage, delDicItem, getDictInfo } from '/@/api/dict';
import { ElMessageBox } from 'element-plus';
import ProTable from '/@/components/ProTable/ProTable.vue';
import addDicItemVue from './addDicItem.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessage } from 'element-plus';

const proRef = ref(null);
const addDicItemRef = ref(null);
const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	item: null,
	modal: null,
	searchConfig: {
		option: {
			customRender: 'btns',
		},
	},
});

const columns = reactive([
	{
		dataIndex: 'type',
		title: '字典编码',
		minWidth: 160,
		fixed: 'left',
		tooltip: true,
	},
	{
		dataIndex: 'value',
		title: '数据值',
		minWidth: 140,
		tooltip: true,
	},
	{
		dataIndex: 'label',
		title: '标签名',
		minWidth: 120,
		tooltip: true,
	},
	{
		dataIndex: 'description',
		title: '描述',
		minWidth: 160,
		tooltip: true,
	},
	{
		dataIndex:'parentLabelOfValue',
		title: '父级字典值',
		minWidth: 160,
		tooltip: true,

	},
	{
		dataIndex: 'sortOrder',
		title: '排序',
		hideInSearch: true,
		minWidth: 80,
	},
	{
		dataIndex: 'remark',
		title: '备注信息',
		hideInSearch: true,
		minWidth: 160,
		tooltip: true,
	},
	{
		dataIndex: 'option',
		title: '操作',
		key: 'option',
		minWidth: 160,
		hideInSearch: true,
		fixed: 'right',
		scopedSlots: {
			customRender: 'option',
		},
	},
]);

const handleAddClick = () => {
	if (addDicItemRef.value) addDicItemRef.value.openDialog({ item: { type: state.item.type, dictId: state.item.id }, modal: state.modal });
};


const isGray = () => {
	return state.modal && state.modal.systemFlag === '0';
};

const cellBtns = reactive([
	{
		text: '编辑',
		prop: 'edit', // 唯一标识
		tooltip: '当前字典不可删除',
		isGray: isGray,
	},
	{
		text: '删除',
		prop: 'delete', // 唯一标识
		tooltip: '当前字典不可删除',
		isGray: isGray,
	},
]);

const getDetail = async (id) => {
	try {
		const res = await getDictInfo(id);
		if (res && res.code === 200) {
			const detail = { ...res.data };
			state.modal = detail;
		} else {
			ElMessage.error(res.msg || '获取字典详情失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取字典详情失败');
	}
};

const refreshList = () => {
	// console.log('get refreshList---------,', proRef);
	if (proRef.value) proRef.value.refresh();
};

const onCellClick = (prop, item) => {
	if (prop === 'edit') {
		// 编辑
		if (addDicItemRef.value) addDicItemRef.value.openDialog({ item, modal: state.modal });
	} else if (prop === 'delete') {
		// 删除
		ElMessageBox.confirm(`是否确定删除？`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
			.then(async () => {
				try {
					const res = await delDicItem(item.id);
					if (res && res.code === 200) {
						ElMessage.success('删除成功');
						refreshList();
					} else {
						ElMessage.error(res.msg || '删除失败');
					}
				} catch (e) {
					console.log('get exception:', e);
					ElMessage.error('删除失败');
				}
			})
			.catch(() => {});
	}
};

const request = async (params) => {
	try {
		let p = params;
		if (state.item) {
			p = Object.assign({}, params, { type: state.item.type });
		}
		const res = await getDicItemPage(p);
		if (res && res.code === 200) {
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

const openDialog = async (data) => {
	state.id = data.id;
	state.item = data;
	state.isShowDialog = true;
	nextTick(async () => {
		await getDetail(data.id);
		refreshList();
	});
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss">
@import './css/addDictItemDialog.scss'
</style>
