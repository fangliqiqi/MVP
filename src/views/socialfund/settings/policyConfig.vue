<template>
	<div class="system-dict-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="columns" 
			:request="request" 
			:btn="btn" 
			:searchConfig="searchConfig" 
			:hasTown="false"
		>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>	

		<!-- 新增/编辑 -->
		<add-policyconfig-vue ref="addPolicyconfigRef" @ok="refresh"></add-policyconfig-vue>
		<!-- 详情 -->
		<table-detail 
			ref="tableDetailRef" 
			labelWidth="130px"
			:dictData=state.dictData
		></table-detail>
	</div>
</template>

<script setup name="政策配置">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import TableDetail from '/@/components/TableDetail/index.vue';
import addPolicyconfigVue from './component/addPolicyconfig.vue';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import {getPolicyConfigList,editPolicyConfig,delPolicyConfig} from '/@/api/socialfund/socialfundSet';

const proTableRef = ref(null);
const addPolicyconfigRef = ref(null);
const tableDetailRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addPolicyconfigRef.value&&addPolicyconfigRef.value.openDialog();
};

// 启用、禁用按钮置灰条件
const isStop = (row) => {
	return row.openFlag == 1;
};
const isStart = (row) => {
	return row.openFlag == 0;
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
				dataIndex: 'archivesLocation',
				title: '社保缴纳地',
				minWidth: 200,
				valueType:'addRess',
				params:{
					pro:'province',
					city:'city',
				},
			},
			{
				dataIndex: 'target',
				title: '适用范围',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'year',
				title: '适用年份',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'month',
				title: '生效月份',
				minWidth: 160,
				hideInSearch: true,
				formatter:(row)=>{
					return row.startMonth+'~'+row.endMonth;
				}
			},
			{
				dataIndex: 'pension',
				title: '养老',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'medical',
				title: '医疗',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'bear',
				title: '生育',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'unemployed',
				title: '失业',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'injury',
				title: '工伤',
				minWidth: 140,
				hideInSearch: true,
			},
			{
				dataIndex: 'openFlag',
				title: '状态',
				minWidth: 140,
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
				minWidth:220,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [
			{
				label: '创建新配置',
				onClick: handleAddClick,
				permission: ['social_tagentconfig_add'],
				icon: 'icon-ic_edit_add',
			},
			
		],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: ['social_tagentconfig_get'], // 权限标识
			},
			{
				text: '编辑',
				prop: 'edit', // 唯一标识
				permission: ['social_tagentconfig_edit'], // 权限标识
			},
			{
				text: '删除',
				prop: 'delete', // 唯一标识
				permission: ['social_tagentconfig_del'], // 权限标识
			},
			{
				text: '禁用',
				prop: 'stop', // 唯一标识
				permission: ['social_tagentconfig_edit'], // 权限标识
				isGray: isStop, // 灰色按钮
				tooltip:'目前禁用状态不可操作',
			},
			{
				text: '启用',
				prop: 'start', // 唯一标识
				permission: ['social_tagentconfig_edit'], // 权限标识
				isGray: isStart, // 灰色按钮
				tooltip:'目前启用状态不可操作',
			},
			
		],
		dictKeys:[
			'policy_config_scope',//适应范围
			'policy_config_status',//减免政策
			'hu_config_type'//配置状态
		],//字典项,
		dictData:{},//字典数据,
		detailConfig:[    //详情配置
			{label:'政策适应范围',key:'target',dict:'policy_config_scope'},
			{label:'政策适应年份',key:'year'},
			{label:'生效月份',key:'openFlag',formatter:(row)=>{
				return row.startMonth+'~'+row.endMonth;
			}},
			{label:'社保缴纳地',key:'address',address:['province','city']},
			{label:'养老',key:'pension',dict:'policy_config_status'},
			{label:'医疗',key:'medical',dict:'policy_config_status'},
			{label:'生育',key:'bear',dict:'policy_config_status'},
			{label:'失业',key:'unemployed',dict:'policy_config_status'},
			{label:'工伤',key:'injury',dict:'policy_config_status'},
			{label:'状态',key:'openFlag',dict:'hu_config_type'},
			{label:'创建时间',key:'createTime'},
		]  

		
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getPolicyConfigList(params);
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
		if (prop === 'delete') {
			ElMessageBox.confirm('是否确定删除？', '提示', {
				type: 'warning',
			}).then(async () => {
				const res = await delPolicyConfig(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				}else{
					ElMessage.error(res.msg||'删除失败');
				}
			}).catch((e) => {
			});
		} 
		else if (prop === 'edit') {
			addPolicyconfigRef.value&&addPolicyconfigRef.value.openDialog(item);
		} else if (prop === 'detail') {
			tableDetailRef.value&&tableDetailRef.value.openDialog(item,state.detailConfig,'政策配置详情');
		}else if(prop=='start'||'stop'){
			const title = prop=='stop'?'是否确定禁用？':'是否确定启用？';
			const sucMsg = prop=='stop'?'禁用成功':'启用成功';
			const errMsg = prop=='stop'?'禁用失败':'启用失败';
			ElMessageBox.confirm(title, '提示', {
				type: 'warning',
			}).then(async () => {
				const res = await editPolicyConfig({id:item.id,openFlag:prop=='stop'?1:0});
				if (res && res.code == 200) {
					ElMessage.success(sucMsg);
					refresh();
				}else{
					ElMessage.error(res.msg||errMsg);
				}
			}).catch((e) => {
			});

		}

	};

	// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			if (res) {
				state.dictData = res;
				// 列表赋值
				state.columns.map(item=>{
					const d = item.dataIndex
					switch(item.dataIndex){
						case 'target':               //适应范围
							item.valueEnum = res['policy_config_scope']; 
							break;
						case 'pension': case 'medical':	case 'bear'	:case 'unemployed':case 'injury':					//减免政策
							item.valueEnum = res['policy_config_status']; 
							break;
						case 'openFlag':										//配置状态
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
