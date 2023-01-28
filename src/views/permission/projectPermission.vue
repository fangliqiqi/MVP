<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn"
			:searchConfig="state.searchConfig" @selectionChange="selectionChange" multi>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 新增 项目权限-->
		<add-project-permission ref="addProjectPermissionRef" @ok="refresh" />
	</div>
</template>

<script setup name="项目权限">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addProjectPermission from './component/addProjectPermission.vue'
import { ElMessage, ElMessageBox } from 'element-plus';

import { PERMISSION_HEADER_EXPORT } from '/@/utils/header.js';
import { exportExcelSheet } from '/@/utils/excel';
import moment from 'moment';

import { getTableList, disabledAndNotDisabled, deleteInfo, getExportList } from '/@/api/permission/projectPermission';

const proTableRef = ref(null);
const store = useStore();
const addProjectPermissionRef = ref(null)

const refresh = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};
const isShowLoading = ref(false)
// 新增
const handleAdd = () => {
	if (addProjectPermissionRef.value) addProjectPermissionRef.value.openDialog();
};
// 导出
const handleBatchExport = () => {
	isShowLoading.value = true
	let p = null
	if (state.selectionChangeList.length != 0) {
		p = state.params;
	} else {
		p = Object.assign({}, state.params, proTableRef.value.getParams());
	}
	delete p.size;
	delete p.current;
	getExportList(p).then((res) => {
		exportExcelSheet(
			PERMISSION_HEADER_EXPORT,
			(res.data || []).map((item) => {
				item.status = item.status == 0 ? '启用' : '禁用';
				return item;
			}),
			`项目权限批量导出${moment().format('YYYYMMDD-HHmmss')}`
		)
		ElMessage.success('导出成功');
	}).finally((e) => {
		console.log(e)
		isShowLoading.value = false
	});
};

const state = reactive({
	searchConfig: {
		labelWidth: 120,
	},
	columns: [
		{
			dataIndex: 'userNickName',
			title: '员工姓名',
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'userLoginName',
			title: '登录账号',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'userDeptName',
			title: '所在部门',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'settleDomainName',
			title: '项目名称',
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'settleDomainNo',
			title: '项目编码',
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'status',
			title: '授权状态',
			minWidth: 120,
			tooltip: false,
			valueEnum: {
				'0': '启用',
				'1': '禁用',
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 200,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	params: {},
	btn: [
		{
			label: '新增',
			onClick: handleAdd,
			permission: [],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导出',
			onClick: handleBatchExport,
			loading: isShowLoading,
			permission: [],
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: [],
		},
		{
			text: '启用',
			prop: 'enable', // 唯一标识
			permission: [],
			isGray: (row) => {
				return row.status == 0
			},
		},
		{
			text: '禁用',
			prop: 'stop', // 唯一标识
			permission: [],
			isGray: (row) => {
				return row.status == 1
			},
		},
	],
	selectionChangeList: [], // 列表多选选中的内容
	statusRes: 0,
});
// 多选
const selectionChange = (selection) => {
	state.selectionChangeList = selection;
	let selData = null
	if (state.selectionChangeList.length > 0) {
		const arrList = []
		state.selectionChangeList.map(item => {
			arrList.push(item.id)
		})
		selData = {
			idList: arrList,
			...proTableRef.value.getParams()
		}
	} else {
		selData = {
			...proTableRef.value.getParams()
		}
	}
	state.params = selData
};
const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'delete':
			deleteCell(item)
			break;
		case 'enable':
			disabledFunc({ id: item.id, status: 0, userId: item.userId })
			break;
		case 'stop':
			disabledFunc({ id: item.id, status: 1, userId: item.userId })
			break;
	}
};
// 启用禁用接口
const disabledFunc = (data) => {
	disabledAndNotDisabled(data).then(
		(res) => {
			if (res && res.code == 200) {
				refresh()
				ElMessage.success(res.msg || `${data.status == 0 ? '启用' : '禁用'}成功`);
			} else {
				ElMessage.error(res.msg || `${data.status == 0 ? '启用' : '禁用'}失败`);
			}
		},
		(err) => { }
	).finally(() => {
		state.loading = false;
	});
}
//删除操作
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
				const res = await deleteInfo(item.id);
				if (res && res.code === 200) {
					ElMessage.success('删除成功');
					refresh();
					proTableRef.value.clearAllSelection()
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				ElMessage.error((e && e.msg) || '删除失败');
			}
		})
		.catch(() => { });
};

const request = async (params) => {
	try {
		const res = await getTableList(params);
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


