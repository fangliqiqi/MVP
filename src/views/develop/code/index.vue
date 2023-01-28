<template>
	<div class="system-menu-container">
		<pro-table ref="proRef" row-key="id" :columns="columns" :request="request" :searchConfig="searchConfig" :multi="true" :operation="operation">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:icon="item">
				<em :class="`iconfont icon-ic-arrow-fill-up ${item.icon}`"></em>
			</template>

			<template v-slot:dsName="item">
				<el-select v-model.trim="dsName" style="width: 100%" :placeholder="item.placeholder || '请选择'" clearable filterable>
					<el-option
						v-for="(option, oIndex) in dsNameDataSource"
						:key="'arch_search_props_' + item.dateIndex + '_' + oIndex"
						:label="option.name"
						:value="option.name"
					/>
				</el-select>
			</template>
		</pro-table>

		<add-config-vue ref="addConfigRef"></add-config-vue>
	</div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue';
import { getCodeList, getDsNameList } from '/@/api/code';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addConfigVue from './component/addConfig.vue';

export default defineComponent({
	name: '代码生成',
	components: {
		ProTable,
		ProButtons,
		addConfigVue,
	},
	setup() {
		const proRef = ref(null); // proTable
		const addConfigRef = ref(null); //addConfigRef
		// const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const handleClick = (item, selection) => {
			if (item.prop === 'create') {
				// 批量生成
				// console.log('get selection:',selection);
				addConfigRef.value.openDialog(
					{
						tableName: selection.map((item) => item.tableName).join('-'),
					},
					1,
					{ dsName: state.dsName }
				);
			}
		};

		const state = reactive({
			searchConfig: {},
			dsName: null,
			dsNameDataSource: [],
			columns: [
				{
					dataIndex: 'dsName',
					title: '数据源',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: {
						customRender: 'dsName',
					},
				},
				{
					dataIndex: 'index',
					title: '#',
					hideInSearch: true,
				},
				{
					dataIndex: 'tableName',
					minWidth: 140,
					title: '表名称',
				},
				{
					dataIndex: 'tableComment',
					minWidth: 180,
					title: '表注释',
					hideInSearch: true,
				},
				{
					dataIndex: 'tableCollation',
					minWidth: 120,
					title: '表编码',
					hideInSearch: true,
				},
				{
					dataIndex: 'engine',
					title: '引擎',
					hideInSearch: true,
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					minWidth: 140,
					hideInSearch: true,
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
			cellBtns: [
				{
					text: '生成',
					prop: 'gen', // 唯一标识
				},
			],
			operation: [
				{
					label: '批量生成',
					prop: 'create',
					handleClick: handleClick,
				},
			],
		});

		const request = async (params) => {
			try {
				const p = { ...params };
				if (state.dsName) {
					p.dsName = state.dsName;
				}

				const res = await getCodeList(p);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.size,
						data: res.data.records.map((item, index) => {
							return {
								...item,
								index: (params.current - 1) * params.size + index + 1,
							};
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
			if (prop === 'gen') {
				// 生成
				addConfigRef.value.openDialog(item, 0, { dsName: state.dsName });
			}
		};

		onMounted(() => {
			getDsNameList().then((res) => {
				if (res && res.code === 200) {
					state.dsNameDataSource = res.data;
				}
			});
		});

		return {
			...toRefs(state),
			request,
			onCellClick,
			proRef,
			addConfigRef,
		};
	},
});
</script>

