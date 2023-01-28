
<template>
	<div class="cardinal-config-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			:searchConfig="state.searchConfig"
			@selectionChange="selectionChange"
			multi
		>
			<template #extBtns>
					<div class="tipsText">社保、公积金同时派单时，以社保审核人为准，公积金审核人无待审核任务；仅单独派公积金时，流转到公积金审核人处</div>
			</template>

			<template v-slot:houresName="item">
				<span>{{ item.houseNameType==1?item.fundHousehold:item.socialHousehold }}</span>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

		</pro-table>
		
	<!-- 新增 社保公积金审核权限-->
	<add-social-and-fund-check-permission ref="addSocialAndFundCheckPermissionRef" @ok="refresh"/>
	</div>
</template>

<script setup name="社保公积金审核权限">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addSocialAndFundCheckPermission from './component/addSocialAndFundCheckPermission.vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { PERMISSION_SOCIALANDFUND_HEADER_EXPORT } from '/@/utils/header.js';
import {exportExcelSheet} from '/@/utils/excel';
import moment from 'moment';

import {getTableList,deleteInfo,getExportList,disabledAndNotDisabled} from '/@/api/permission/socialAndFundCheckPermission';

const proTableRef = ref(null);
const store = useStore();
const addSocialAndFundCheckPermissionRef  = ref(null)
const refresh = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};
const isShowLoading = ref(false)
// 新增
const handleAdd = () => {
  if (addSocialAndFundCheckPermissionRef.value) addSocialAndFundCheckPermissionRef.value.openDialog();
};
// 导出
const handleBatchExport = () => {
	isShowLoading.value = true
	let p =null
	if(state.selectionChangeList.length!=0){
			p = state.params;
	}else{
			p = Object.assign({}, state.params,proTableRef.value.getParams());
	}
			delete p.size;
			delete p.current;
			getExportList(p).then((res) => {
				exportExcelSheet(
					PERMISSION_SOCIALANDFUND_HEADER_EXPORT,
					(res.data || []).map((item) => {
						item.status = item.status==0?'启用':'禁用';
						item.socialAndFund = item.houseNameType==1?item.fundHousehold:item.socialHousehold
						item.houseNameType = item.houseNameType==0?'社保户':'公积金户';
						return item;
					}),
					`社保公积金审核权限批量导出${moment().format('YYYYMMDD-HHmmss')}`
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
		option: {
					extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'userName',
			title: '审核人',
			minWidth: 200,
			tooltip: true,
		},
    {
			dataIndex: 'userDeptName',
			title: '审核人所在部门',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'socialHousehold',
			title: '社保户',
			minWidth: 200,
			tooltip: true,
			hideInTable: true,
		},
		{
			dataIndex: 'fundHousehold',
			title: '公积金户',
			minWidth: 200,
			tooltip: true,
			hideInTable: true,
		},
		{
			dataIndex: 'houseNameType',
			title: '户类型',
			minWidth: 120,
			tooltip: false,
			hideInSearch: true,
			valueEnum: {
				'0': '社保户',
				'1': '公积金户',
			},
		},
		{
			dataIndex: 'socialAndFund',
			title: '户名',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
			valueType: 'custom',
			scopedSlots: { customRender: 'houresName' },
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
			permission: ['social_tsocialfundhouseres_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导出',
			onClick: handleBatchExport,
			loading:isShowLoading,
			permission: [],
      type:'normal',
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['social_tsocialfundhouseres_del'],
		},
    {
			text: '启用',
			prop: 'enable', // 唯一标识
			permission: [],
			isGray:(row)=>{
				return row.status == 0
			},
		},
    {
			text: '禁用',
			prop: 'stop', // 唯一标识
			permission: [],
			isGray:(row)=>{
				return row.status == 1
			},
		},
	],
  selectionChangeList: [], // 列表多选选中的内容
	statusRes:0,
});
// 多选
const selectionChange = (selection) => {
	state.selectionChangeList = selection;
	let selData = null
	if(state.selectionChangeList.length>0){
		const arrList = []
		state.selectionChangeList.map(item=>{
			arrList.push(item.id)
		})
		selData={
			idList:arrList,
			...proTableRef.value.getParams()
		}
	}else{
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
			item.status=0
			disabledFunc(item)
			break;
		case 'stop':
			item.status=1
			disabledFunc(item)
			break;
	}
};
// 启用禁用接口
const disabledFunc = (data)=>{
	disabledAndNotDisabled(data).then(
          (res) => {
            if (res && res.code == 200) {
							refresh()
							ElMessage.success(res.msg || `${data.status==0?'启用':'禁用'}成功`);
            } else {
              ElMessage.error(res.msg || `${data.status==0?'启用':'禁用'}失败`);
            }
          },
          (err) => {}
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
				.catch(() => {});
		};

const request = async (params) => {
	try {
	
		params = Object.assign({},{authType:0},params)
		const res = await getTableList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data:res.data.records.map(e=>{
							e.socialAndFund = e.houseNameType==1?e.fundHousehold:e.socialHousehold
						return e
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
</script>

<!-- <style lang="scss" scoped src="./css/socialAndFundCheckPermission.scss">

</style> -->
<style lang="scss" >
	@import './css/socialAndFundCheckPermission.scss'
</style>
