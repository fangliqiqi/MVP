<template>
	<div class="system-dict-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="columns" 
			:request="request" 
		>
		</pro-table>	


	</div>
</template>

<script setup name="预派配置">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import {getPreConfigList} from '/@/api/socialfund/socialfundSet';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { idToArea } from '/@/utils/city';


const proTableRef = ref(null);
const days = {
	1:'1日',2:'2日',3:'3日',4:'4日',5:'5日',6:'6日',7:'7日',8:'8日',9:'9日',10:'10日',
	11:'11日',12:'12日',13:'13日',14:'14日',15:'15日',16:'16日',17:'17日',18:'18日',19:'19日',20:'20日',
	21:'21日',22:'22日',23:'23日',24:'24日',25:'25日',26:'26日',27:'27日',28:'28日',29:'29日',30:'30日',31:'31日',
}
const state = reactive({
		columns: [
			{
				dataIndex: 'province',
				title: '省',
				minWidth:160,
				hideInSearch: true,
				valueType:'addRess',
				params:{
					pro:'province',
				},
			},
			{
				dataIndex: 'city',
				title: '市',
				minWidth:160,
				hideInSearch: true,
				valueType:'addRess',
				params:{
					city:'city',
				},
			},
			{
				dataIndex: 'town',
				title: '县',
				minWidth:160,
				hideInSearch: true,
				valueType:'addRess',
				params:{
					town:'town',
				},
			},
			{
				dataIndex: 'archivesLocation',
				title: '省市区',
				minWidth: 200,
				hideInTable: true,
				valueType:'addRess',
				params:{
					pro:'province',
					city:'city',
					town:'town'
				},
			},
			{
				dataIndex: 'day',
				title: '截止日期',
				minWidth: 140,
				formatter: (row) => {
					return row.day?row.day+'日':EMPTY_PLACEHOLDER;
				},
				valueEnum:days
			},

		],
	});

	const { columns,} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getPreConfigList(params);
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


	

</script>
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
