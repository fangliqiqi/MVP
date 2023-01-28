<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="title" v-model="isShowDialog" width="800px" @close="closeDialog"  :close-on-click-modal="false">
			<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
			<!-- 自定义表头 -->
			<el-radio-group class="radio_group" v-model="diyHead" >
				<el-radio 
					v-for="item in diyHeadlist" 
					:key="item.id" 
					:label="item.id" 
					class="radio_item" 
					@change="(val)=>changeDiy(val,item)"
				>
					<el-tooltip :content="item.name" placement="top" effect="dark">
						{{item.name}}
					</el-tooltip>
					<el-icon @click.stop="closeDiy(item.id)"><Close /></el-icon>
				</el-radio>
			</el-radio-group>
			
			<el-checkbox-group v-model="checkedHeads" @change="handleCheckedHeadsChange">
				<draggable
				class="draggable"
				group="export" 
				v-model="draggableHead"
				@start="drag=true" 
				@end="drag=false" 
				item-key="title"
				chosen-class="chosen"
			>
				<template #item="{element}">
					<el-checkbox 
					:key="element.dataIndex" 
					:label="element.dataIndex"
				>
					{{ element.title}}
				</el-checkbox>
				</template>
			</draggable>
			</el-checkbox-group>
			<template #footer>
				<span class="dialog-footer export-footer">
					<el-button 
						v-if="useCode"
						type="primary" 
						size="default" 
						:disabled="!checkedHeads || checkedHeads.length == 0"
						@click="saveFilter"
					>保存导出筛选</el-button>
					<span></span>
					<div>
						<el-button @click="closeDialog" size="default">取 消</el-button>
						<el-button 
							type="primary" 
							@click="onSubmit" 
							size="default" 
							:disabled="!checkedHeads || checkedHeads.length == 0" 
							:loading="exporting"
						>导 出</el-button>
					</div>
					
				</span>
			</template>
		</el-dialog>

		<!-- 保存筛选项弹窗 -->
		<save-vue ref="saveVueDialog" @save="saveFilterFn"></save-vue>
	</div>
</template>

<script>
import { reactive, defineComponent } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import { exportExcel } from '/@/utils/xlsx';
import draggable from 'vuedraggable'
import saveVue from './save.vue';
import { saveExportHead,getExportHeads,deleteExportHead} from '@/api/saveExport.js'
import moment from 'moment';
// 引入图标
import { Close } from '@element-plus/icons-vue';

export default defineComponent({
	name: 'ExportExcel',
	components: {
		draggable,
		saveVue,
		Close
	},
	props: {
		heads: {
			type: Array,
			default: null,
		},
		title: {
			type: String,
			default: '导出',
		},
		useCode: {        //保存自定义筛选项的code 暂定可以用数据权限标识
			type: String,
			default: '',
		},
	},
	setup(props,context) {
	


		const state = reactive({
			isShowDialog: false,
			checkAll: false,
			isIndeterminate: false,
			checkedHeads: [],
			fn: null, // 回调
			exportHeads: [], // 选中的导出头
			exporting: false, // 导出动画
			maxSaveFilter: 3, // 最多保存筛选 
			drag: false, // 拖拽
			// draggableHead: props.heads, //不能这么写，因为子组件的生命周期比父组件的生命周期早，所以会导致子组件的heads为空
			diyHeadlist: [], // 自定义筛选表头名称
			diyHead: '', // 自定义筛选表头名称
		});
		const saveVueDialog = ref(null);
		// 打开弹窗
		const openDialog = async (fn) => {
			if(props.useCode){
				getdiyHeadlist()
			}
			state.isShowDialog = true;
			state.fn = fn; // 添加回调函数
		};

		// 获取自定义的表头
		const getdiyHeadlist = async (arg) => {
			const res = await getExportHeads(props.useCode);
			if(res.code==200){
				state.diyHeadlist = res.data;
				if(arg){
					state.diyHead = state.diyHeadlist[state.diyHeadlist.length-1].id
				}
			}else{
				ElMessage.error(res.msg);
			}
		}

		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
			state.checkAll = false;
			state.isIndeterminate = false;
			state.exporting = false;
			state.diyHead = '';
			state.checkedHeads = [];
			state.exportHeads = [];
			state.fn = null;
		};

		// 导出文件
		const exportExcelFile = (downloadFile, data, formatData) => {
			if (downloadFile) {
				state.exporting = false;
				return;
			}

			// 只导处需要导出的
			const exportData = {};

			state.checkedHeads.forEach((item) => {
				if (formatData.item) {
					try {
						return (exportData[item] = formatData[item](item, exportData[item]));
					} catch (e) {
						// 不需要处理
					}
				}
				return (exportData[item] = data[item] || '');
			});

			exportExcel(state.exportHeads, exportData, {
				fileName: `${props.title}${moment().format('YYYYMMDD')}`,
				type: {
					bookType: 'xlsx',
					bookSST: true,
					type: 'binary',
					cellStyles: true,
				},
			});
			ElMessage.success('导出完成！');
		};

		// 打开保存筛选项弹窗
		const saveFilter = () => {
			saveVueDialog.value&&saveVueDialog.value.openDialog(props.useCode, state.checkedHeads);
		};

		// 保存导出筛选
		const saveFilterFn = (name) => {
			if(state.diyHeadlist.length>=state.maxSaveFilter){
				ElMessage.warning(`最多只允许添加${state.maxSaveFilter}个筛选配置！`);
				saveVueDialog.value&&saveVueDialog.value.closeDialog();
				return;
			}
			const params = {
				maxMun:state.maxSaveFilter,
			}
			const data = {
				name,
				remark:props.title,
				useCode:props.useCode,
				excelHeadText:state.checkedHeads.join(','),
			}
			saveExportHead(params,data).then(res=>{
				if(res.code === 200){
					ElMessage.success('保存成功');
					getdiyHeadlist(true);
					saveVueDialog.value&&saveVueDialog.value.closeDialog();
				}else{
					ElMessage.error(res.msg||'保存失败');
				}
			}).catch(e=>{
				console.log(e);
				ElMessage.error('保存失败');

			}).finally(()=>{
				saveVueDialog.value&&saveVueDialog.value.closeLoading();
			})
		};

		// 删除导出筛选
		const closeDiy = (id)=>{
			ElMessageBox.confirm('是否确定删除?', '提示', {
				type: 'warning',
			}).then(() => {
				deleteExportHead(id).then(res=>{
					if(res.code === 200){
						ElMessage.success('删除成功');
						state.checkedHeads = [];
						state.isIndeterminate = false;
						getdiyHeadlist();
						state.checkAll = false;
					}else{
						ElMessage.error(res.msg||'删除失败');
					}
				}).catch(e=>{
					console.log(e);
					ElMessage.error('删除失败');
				})
			})
		}

		// 选择自定义筛选
		const changeDiy = (val,item)=>{
			state.checkedHeads = item.excelHeadText.split(',');
			state.checkAll = state.checkedHeads.length === props.heads.length;
			state.isIndeterminate = state.checkedHeads.length > 0 && state.checkedHeads.length < props.heads.length;
		}

		// 给数据添加index 用于排序
		const dragfunction = (arr) => {
			arr.forEach((item, index) => {
				item.index = index
			})
			return arr
		}

		// const draggableHead = computed(() => {
		// 	return props.heads
		// })
		watchEffect(() => {
			state.draggableHead = props.heads
		})
		// 导出
		const onSubmit = () => {
			state.exportHeads = props.heads.filter((item) => state.checkedHeads.includes(item.dataIndex));

			if (!state.exportHeads || state.exportHeads.length === 0) {
				ElMessage.success('导出项为空，请选择需要的导出项');
				return;
			}
			// 拖拽排序
			dragfunction(state.draggableHead)

			// 导出排序  但是后端没有写这个功能，所以虽然可以拖拽但是顺序还是没有变 🤡
			state.exportHeads = state.exportHeads.sort((a, b) => a.index - b.index)
			if (state.fn) {
				state.exporting = true;
				state.fn(state.exportHeads, exportExcelFile);
			}
		};

		// 全选按钮点击
		const handleCheckAllChange = (val) => {
			if (val) {
				// 全选
				state.checkedHeads = props.heads.map((item) => item.dataIndex);
				
			} else {
				state.checkedHeads = [];
			}
			state.diyHead = false;
			state.isIndeterminate = false;
		};

		//
		const handleCheckedHeadsChange = (vals) => {
			state.checkedHeads = vals;
			state.checkAll = vals.length === props.heads.length;
			state.isIndeterminate = vals.length != 0 && vals.length != props.heads.length;
		};

		return {
			...toRefs(props),
			...toRefs(state),
			closeDialog,
			onSubmit,
			handleCheckAllChange,
			handleCheckedHeadsChange,
			openDialog,
			exportExcelFile,
			saveFilter,
			saveFilterFn,
			saveVueDialog,
			closeDiy,
			changeDiy,
		};
	},
});
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
