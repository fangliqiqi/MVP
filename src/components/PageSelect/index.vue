<template>
	<div class="page-select-container" style="width: 100%">
		<el-select
			ref="selectRef"
			:style="selectwidth ? selectwidth : 'width:100%'"
			v-model="selected"
			:value-key="valueKey"
			filterable
			:multiple="multiple"
			:clearable="clearable"
			remote
			no-match-text="暂无数据"
			no-data-text="暂无数据"
			:placeholder="placeholder"
			:remote-method="remoteMethod"
			:loading="selectLoading"
			:disabled="isDisabled"
			:loading-text="loadingText"
			class="page-select"
			popper-class="page-select-popper"
			@clear="clearData"
			@change="selectChanged"
			@visible-change="hidden"
		>
			<template v-if="defaultOptions && defaultOptions.length">
				<!--预赋值-->
				<el-option
					style="display: hidden"
					v-for="item in defaultOptions"
					:key="item[valueKey] + '_hidden'"
					:label="item[title]"
					:value="item"
					class="el-option-hidden"
					:title="item[title]"
				>
				</el-option>
			</template>

			<el-option style="width:100%" v-for="item in optionList" :key="item[valueKey]" :label="item[title]" :value="item" :title="item[title]">
				{{ item[title] }}
			</el-option>
			<div class="pagination-container" v-if="total > 10" @mousedown="(e) => e.preventDefault()">
				<span v-if="total > 10" class="spare-line"> </span>
				<el-pagination
					v-model:currentPage="params.current"
					ref="paginationRef"
					v-if="total > 10"
					background
					small
					:pager-count="5"
					layout="prev, pager, next"
					:total="total"
					@current-change="handleCurrentChange"
				/>
			</div>
		</el-select>
	</div>
	
</template>

<script>
import { ref, reactive, defineComponent, toRefs, computed, onMounted, watch } from 'vue';

export default defineComponent({
	name: 'PageSelect',
	props: {
		placeholder: {
			// placeholder 内容
			type: String,
			default: '',
			required: false,
		},
		clearable: {
			// 是否可清空
			type: Boolean,
			default: true,
		},
		disabled: {
			// 是否可编辑
			type: Boolean,
			default: false,
		},
		valueKey: {
			// 作为 value 唯一标识的键名，绑定值为对象类型时必填
			type: String,
			default: 'value',
		},
		request: {
			// 分页请求方法
			type: Function,
			default: () => function () {},
			required: true,
		},
		search: {
			// 自定义筛选项
			type: String,
			default: 'name',
		},
		title: {
			// option显示的字段
			type: String,
			required: true,
			default: 'title',
		},
		multiple: {
			// 是否多选
			type: Boolean,
			default: false,
		},
		modelValue: {
			// v-model 配置
			type: [String, Number, Array],
			default: null,
		},
		manual: {
			// 手动启动列表接口请求的，默认首次自动请求
			type: Boolean,
			default: false,
		},
		ext: {
			// 额外请求参数
			type: Object,
			default: () => {
				return {};
			},
		},
		options: {
			// 默认带入选项
			type: Array,
			default: () => [],
		},
		selectwidth: {
			// select宽度
			type: String,
			default: '',
		},
	},
	emits: ['change', 'clear', 'update:modelValue'],
	setup(props, context) {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const selectRef = ref(null);
		const paginationRef = ref(null);
		const state = reactive({
			selectLoading: false,
			searchKey: '', // 搜索的文字
			total: 0, // 总条数
			selected: null, // 绑定的对象
			optionList: [], // 下拉列表显示的数据
			isDisabled: false,
			loadingText: '加载中',
			arrowStatus: 'down',
			params: {
				current: 1,
				size: 10,
			}, // 筛选项
		});
		// 监听属性值改变
		watch(
			() => props.modelValue,
			(newVal, oldVal) => {
				handlerModelChange(newVal);
			}
		);
		

		const isDisabled = computed(() => {
			return props.disabled;
		});

		const handlerModelChange = (newVal) => {
			if(!newVal) {
				state.selected = null;
				return;
			}
			// 更新选中项
			if (newVal !== null && newVal !== undefined) {
				// 未赋值的情况，初次赋初始值
				const list = state.optionList.concat(props.options);
				// 分为两种情况，一种是多选，一种是单选
				if (props.multiple && Array.isArray(newVal)) {
					// 多选
					state.selected = newVal;
				} else if (!props.multiple) {
					// 单选
					const target = list.find((item) => item[props.valueKey] === newVal);
					if (target) {
						state.selected = target;
					}
				}
			} else {
				// 清空
				state.selected = null;
			}
		};

		const defaultOptions = computed(() => {
			let target = null;
			if (state.optionList && state.optionList.length && Array.isArray(state.optionList) && Array.isArray(props.options)) {
				target = props.options.filter((item) => !state.optionList.some((t) => t[props.valueKey] === item[props.valueKey]));
			} else {
				target = props.options;
			}
			return target;
		});

		const getArrowStatus = () => {
			if (state.arrowStatus === 'up') {
				if (state.selected) {
					return 'arrow-up select-value';
				}
				return 'arrow-up';
			} else {
				if (state.selected) {
					return 'arrow-down select-value';
				}
				return 'arrow-down';
			}
		};

		const selectChanged = (val) => {
			// 下拉选框值发生变化
			if (!val) {
				context.emit('update:modelValue', null);
			}

			if (props.multiple) {
				// 多选操作
				if (state.selected.length === 0) {
					context.emit('update:modelValue', null);
				} else {
					context.emit('update:modelValue', state.selected || []);
				}
			} else {
				// 单选
				context.emit('update:modelValue', state.selected[props.valueKey] || null);
			}

			context.emit('change', state.selected);
			if (!val) {
				// 点击清空按钮会走这个方法。值为null,此时调用第一页数据
				state.searchKey = '';
				state.params = {
					current: 1,
					size: 10,
				}
				handleCurrentChange(1);
				state.selectLoading = false;
			}
		};

		const clearData = () => {
			// 当点击清除图标时触发
			context.emit('clear');
			context.emit('update:modelValue', null);
		};

		const hidden = (bool) => {
			if (!bool) {
				state.arrowStatus = 'down';
				state.selectLoading = false;
				state.loadingText = '加载中';
				state.searchKey = '';
				state.params = {
					current: 1,
					size: 10,
				}
				handleCurrentChange(1);
				// 移除mousedown事件监听
				removeEventListener('mousedown', function () {}, false);
			} else {
				state.arrowStatus = 'up';
				document.addEventListener(
					'mousedown',
					function (e) {
						if (e.target.tagName === 'LI' || (e.target.tagName == 'I' && e.target.localName == 'i')) {
							e.preventDefault();
						}
					},
					false
				);
				if (!state.optionList || state.optionList.length === 0) {
					// 数据为空的时候需要请求数据
					if (paginationRef.value) {
						paginationRef.value.internalCurrentPage = 1;
					}
					handleCurrentChange(1);
				}
			}
		};

		const handleCurrentChange = (page) => {
			// 当前页发生改变
			state.params['current'] = page;
			loadData();
		};

		// 加载数据
		const remoteMethod = (query) => {
			state.searchKey = query;
			state.selectLoading = true;
			state.params = {
				[props.search]: query,
				current: 1,
				size: 10, // 默认为10
			};
			loadData();
		};

		const loadData = async () => {
			state.optionList=[]
			// 加载远程数据
			const that = state;
			that.loadingText = '加载中';
			state.selectLoading = true;
			try {
				const params = Object.assign({}, state.params, props.ext || {})
				// 删除空值
				for(let p in params){
					if(params[p]===null||params[p]===undefined||params[p]===''){
						delete params[p]
					}
				}
				const res = await props.request(params);
				setTimeout(() => {
					// 添加一个加载状态
					if (res&&res.data && res.data.length) {
						state.selectLoading = false;
						state.optionList = res.data;
						state.total = res.total;
					} else {
						state.selectLoading = true;
						state.loadingText = '暂无数据';
						state.total = 0;
					}
				}, 200);
			} catch (e) {
				console.log('get exception:', e);
				state.optionList = [];
				state.params = {
					current: 1,
					size: 10,
				};
				state.selectLoading = true;
				state.loadingText = '暂无数据';
				state.total = 0;
				message.warning('数据加载失败');
			}
		};

		const refresh = () => {
			state.searchKey = '';
			state.params = {
				current: 1,
				size: 10, // 默认为10
			};
			handleCurrentChange(1);
		};

		
		onMounted(() => {
			handlerModelChange(props.modelValue);
			if (!props.manual) handleCurrentChange(1);
		});
		const params = state.params
		context.expose({ loadData,refresh,params})
		
		return {
			...toRefs(state),
			...toRefs(props),
			selectRef,
			paginationRef,
			getArrowStatus,
			selectChanged,
			clearData,
			hidden,
			handleCurrentChange,
			remoteMethod,
			defaultOptions,
			refresh,
			isDisabled,
		};
	},
	
});

</script>

<style lang="scss">
 @import './css/index.scss'
</style>
