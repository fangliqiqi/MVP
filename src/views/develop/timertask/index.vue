<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :showHeader="false">
			<template v-slot:status="item">
				<dot-status :title="status[item.status]" :type="statusColor[item.status]"></dot-status>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick">
					<template v-if="item.status == '0'">
						<span class="pro-btn">
							<a @click="() => onCellClick('pause', item)">暂停</a>
						</span>
					</template>
					<template v-else-if="item.status == '1'">
						<span class="pro-btn">
							<a @click="() => onCellClick('resume', item)">启用</a>
						</span>
					</template>
				</pro-buttons>
			</template>
		</pro-table>

		<!-- <add-dic-dialog ref="addDicDialog" @ok="refreshList"></add-dic-dialog>
		<add-dict-item-dialog-vue ref="addDictItemRef"> </add-dict-item-dialog-vue> -->
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { getDictPage, clearCache, delDict } from '/@/api/dict';
import { getTimerTaskList, getTimerTask, resumeTimerTask, pauseTimerTask, runTimerTask } from '/@/api/timertask';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import DotStatus from '/@/components/DotStatus/index.vue';
import { ElMessageBox } from 'element-plus';

export default {
	name: '定时任务',
	components: {
		ProTable,
		ProButtons,
		DotStatus,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const state = reactive({
			status: {
				0: '正常',
				1: '暂停',
			},
			statusColor: {
				0: 'success',
				1: 'error',
			},
			columns: [
				{
					dataIndex: 'jobId',
					title: '任务ID',
					hideInSearch: true,
					minWidth: 80,
				},
				{
					dataIndex: 'beanName',
					title: '任务类名',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
				},
				{
					dataIndex: 'methodName',
					title: '任务执行方法',
					hideInSearch: true,
					minWidth: 140,
					tooltip: true,
				},

				{
					dataIndex: 'cronExpression',
					title: 'CRON表达式',
					minWidth: 180,
					tooltip: true,
				},
				{
					dataIndex: 'status', // 0:菜单，1：按钮
					title: '状态',
					hideInSearch: true,
					minWidth: 180,
					scopedSlots: {
						customRender: 'status',
					},
				},

				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 260,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			cellBtns: [
				{
					text: '立即执行',
					prop: 'run', // 唯一标识
				},
			],
		});

		const request = async (params) => {
			try {
				const res = await getTimerTaskList(params);
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

		const runCell = (item) => {
			ElMessageBox.confirm(`是否确定执行？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await runTimerTask({ jobIds: item.jobId });
						if (res && res.code === 200) {
							message.success('执行成功');
							refreshList();
						} else {
							message.error(res.msg || '执行失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error('执行失败');
					}
				})
				.catch(() => {});
		};

		const pauseCell = async (item) => {
			try {
				const res = await pauseTimerTask({ jobIds: item.jobId });
				if (res && res.code === 200) {
					message.success('暂停成功');
					refreshList();
				} else {
					message.error(res.msg || '状态更新失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				message.error('状态更新失败');
			}
		};

		const resumeCell = async (item) => {
			try {
				const res = await resumeTimerTask({ jobIds: item.jobId });
				if (res && res.code === 200) {
					message.success('启用成功');
					refreshList();
				} else {
					message.error(res.msg || '启用失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				message.error('启用失败');
			}
		};

		const onCellClick = async (prop, item) => {
			if (prop === 'run') {
				// 删除操作
				runCell(item);
			} else if (prop === 'pause') {
				// 暂停操作
				pauseCell(item);
			} else if (prop === 'resume') {
				// 启用
				resumeCell(item);
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			refreshList,
		};
	},
};
</script>

<style lang="scss" scoped>
.system-dict-container {
}
</style>
