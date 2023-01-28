<template>
	<div class="system-dict-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="columns" 
			:request="request" 
			:btn="btn" 
			:searchConfig="searchConfig" 
		>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>	

		<!-- 户新增/编辑 -->
		<add-huconfig-vue ref="addHuconfigRef" @ok="refresh"></add-huconfig-vue>
		<!-- 详情 -->
		<table-detail 
			ref="tableDetailRef" 
			labelWidth="130px"
			:dictData=state.dictData
		></table-detail>

	</div>
</template>

<script setup name="户配置">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import TableDetail from '/@/components/TableDetail/index.vue';
import addHuconfigVue from './component/addHuconfig.vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import {editHuConfig, getHuConfigList} from '/@/api/socialfund/socialfundSet';
import { idToArea } from '/@/utils/city';


const proTableRef = ref(null);
const addHuconfigRef = ref(null);
const tableDetailRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addHuconfigRef.value&&addHuconfigRef.value.openDialog();
};

// 启用、禁用按钮置灰条件
const isStop = (row) => {
	return row.delFlag == 1;
};
const isStart = (row) => {
	return row.delFlag == 0;
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
				dataIndex: 'name',
				title: '户名',
				minWidth:240,
				tooltip:true,
			},
			{
				dataIndex: 'type',
				title: '账户性质',
				minWidth:160,
			},
			{
				dataIndex: 'archivesLocation',
				title: '缴纳地',
				minWidth: 200,
				valueType:'addRess',
				params:{
					pro:'province',
					city:'city',
					town:'town'
				},
			},
			{
				dataIndex: 'organId',
				title: '所属机构',
				minWidth: 200,
				tooltip:true,
			},
			{
				dataIndex: 'delFlag',
				title: '状态',
				minWidth: 200,
			},
			{
				dataIndex: 'option',
				title: '操作',
				key: 'option',
				minWidth:200,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [
			{
				label: '新增',
				onClick: handleAddClick,
				permission: ['demo_syshouseholdinfo_add'],
				icon: 'icon-ic_edit_add',
			},
			
		],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: ['demo_syshouseholdinfo_get'], // 权限标识
			},
			{
				text: '编辑',
				prop: 'edit', // 唯一标识
				permission: ['demo_syshouseholdinfo_edit'], // 权限标识
			},
			{
				text: '禁用',
				prop: 'stop', // 唯一标识
				permission: ['demo_syshouseholdinfo_edit'], // 权限标识
				isGray: isStop, // 灰色按钮
				tooltip:'目前禁用状态不可操作',
			},
			{
				text: '启用',
				prop: 'start', // 唯一标识
				permission: ['demo_syshouseholdinfo_edit'], // 权限标识
				isGray: isStart, // 灰色按钮
				tooltip:'目前启用状态不可操作',
			},
		],
		dictKeys:[
			'hu_config_type',//启用状态
			'nature_account',// 账户性质
			'dept_config_type'// 所属机构
		],//字典项,
		dictData: {},//字典数据
		detailConfig:[    //详情数据
			{label:'户名',key:'name',tooltip:true},
			{label:'账户性质',key:'type',dict:'nature_account'},
			{label:'缴纳地',key:'archivesLocation',address:['province','city','town']},
			{label:'所属机构',key:'organId',dict:'dept_config_type'},
			{label:'状态',key:'delFlag',dict:'hu_config_type'},
			{label:'创建时间',key:'createTime'},
			{label:'审核人',key:'auditUserName'},
			{label:'办理人',key:'handleUserName'},
			{label:'备注',key:'rmark',tooltip:true,size:24},
		]
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getHuConfigList(params);
			if (res && res.code == 200 && res.data) {
				return {
					current: res.data.current,
					total: res.data.total,
					data: res.data.records
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
	const refresh = ()=>{
		proTableRef.value.refresh();
	}

	const onCellClick = async (prop, item) => {
		if (prop == 'stop') {
			ElMessageBox.confirm('是否确定禁用？', '提示', {
				type: 'warning'
			}).then(async () => {
				try {
					const res = await editHuConfig({
						id: item.id,
						delFlag: 1
					});
					if (res && res.code == 200) {
						ElMessage.success('禁用成功');
						refresh();
					}else{
						ElMessage.error(res.msg);
					}
				} catch (e) {
					console.log('get exception:', e);
				}
			});
		}else if(prop=='start'){
			ElMessageBox.confirm('是否确定启用？', '提示', {
				type: 'warning'
			}).then(async () => {
				try {
					const res = await editHuConfig({
						id: item.id,
						delFlag: 0
					});
					if (res && res.code == 200) {
						ElMessage.success('启用成功');
						refresh();
					}else{
						ElMessage.error(res.msg);
					}
				} catch (e) {
					console.log('get exception:', e);
				}
			});
		}
		else if (prop === 'edit') {
			let copyItme  = Object.assign({},item)
			addHuconfigRef.value&&addHuconfigRef.value.openDialog(copyItme);
		} else if (prop === 'detail') {
			tableDetailRef.value&&tableDetailRef.value.openDialog(item,state.detailConfig,'户配置详情');
		}
	};

	// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			state.dictData = res;
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'type':              //账户性质
							item.valueEnum = res['nature_account']; 
							break;
						case 'organId':           //所属机构
							item.valueEnum = res['dept_config_type']; 
							break;
						case 'delFlag':           //启用状态
							item.valueEnum = res['hu_config_type'];
							break;
					}
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};

	onMounted(async () => {
		loadDicts();
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
