<template>
	<div class="arch-pro-layout page-container">
		<div
			v-if="showHeader && searchProps && searchProps.length"
			:class="`arch-pro-filters arch-pro-seacher-container ${!isCollapse ? 'search-not-collapse' : 'search-is-collapse'}`"
		>
			<!-- 类型分类--->
			<el-form ref="search" :model="searchForm" :label-width="search.labelWidth" @submit.prevent size="default">
				<el-row :class="showColNum > searchProps.length || isCollapse ? 'one-line' : ''">
					<template v-for="(item, i) in searchProps">
						<template v-if="!(i > showColNum - 2 && isCollapse ? true : false)">
							<el-col :key="`search_props_${i}`" class="arch-search-item" :span="search.span">
								<el-form-item
									:label="`${item.title}`"
									:class="item.title === '    ' || item.title === '  ' ? 'cus-time-label' : ''"
									:prop="item.dataIndex"
									:label-width="search.labelWidth || `${String(item.title).length * 14 + 16 + 32}px`"
								>
									<!---select 选择框 单选 -->
									<template v-if="(item.valueType === 'select' || item.valueEnum) && !item.multiple">
										<el-select
											v-model="searchForm[item.dataIndex]"
											style="width: 100%"
											:placeholder="item.placeholder || '请选择'"
											:auto-test="item.dateIndex"
											clearable
											filterable
										>
											<el-option
												v-for="(option, oIndex) in item.valueEnum"
												:key="'arch_search_props_' + item.dateIndex + '_' + oIndex"
												:label="Array.isArray(item.valueEnum) ? option.value : String(option)"
												:value="Array.isArray(item.valueEnum) ? option.key || oIndex : oIndex"
											/>
										</el-select>
									</template>

									<!-- 选择框 多选  multiple searchIndex 【可选兼容，不能因为新增属性影响既有属性的样式】-->
									<template v-else-if="(item.valueType === 'select' || item.valueEnum) && item.multiple">
										<el-select
											v-model="searchForm[item.searchIndex || item.dataIndex]"
											style="width: 100%"
											:placeholder="item.placeholder || '请选择'"
											:auto-test="item.dateIndex"
											clearable
											filterable
											multiple
										>
											<el-option
												v-for="(option, oIndex) in item.valueEnum"
												:key="'arch_search_props_' + item.dateIndex + '_' + oIndex"
												:label="Array.isArray(item.valueEnum) ? option.value : String(option)"
												:value="Array.isArray(item.valueEnum) ? option.key || oIndex : oIndex"
											/>
										</el-select>
									</template>

									<template v-else-if="item.valueType == 'date'">
										<el-date-picker
											v-model="searchForm[item.dataIndex]"
											style="width: 100%"
											:value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
											:format="item.format || 'YYYY-MM-DD'"
											:type="item.selectType || 'date'"
											placeholder="请选择"
											:clearable="item.clearable"
											:disabled="item.disabled"
										/>
									</template>

									<!-- 时间周期搜索 -->
									<template v-else-if="item.valueType == 'dateTimeRange' && item.searchIndex">
										<el-date-picker
											v-model="searchForm[item.searchIndex]"
											unlink-panels
											:type="item.selectType || 'datetimerange'"
											range-separator="-"
											start-placeholder="开始日期时间"
											end-placeholder="结束日期时间"
											@change="handleDateTimeRange(item, $event)"
											:default-time="item.defaultTime || [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
											:format="item.format || 'YYYY-MM-DD HH:mm:ss'"
											:value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
										>
										</el-date-picker>
									</template>

									<!-- 地址 -->
									<template v-else-if="item.valueType === 'addRess'">
										<el-tree-select
											v-model="searchForm[`${item.valueType}_${item.params.pro || item.params.city || item.params.town}`]"
											:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
											style="width: 100%"
											placeholder="请选择"
											:data="areaJson"
											:props="
												item.areaProps || {
													children: 'children',
													label: 'areaName',
													isLeaf: 'isLeaf',
												}
											"
											@current-change="(val, node) => changeFileAddress(val, node, item)"
											@clear="clearFileAddress(item)"
											node-key="id"
											:load="loadArea"
											check-strictly
											clearable
										/>
									</template>

									<!-- 分页搜索 -->
									<template v-else-if="item.valueType == 'PageSelect'">
										<page-select
											ref="pageSelectRef"
											v-model="searchForm[item.dataIndex]"
											:request="item.request"
											:value-key="item.pageProps.valueKey"
											:title="item.pageProps.title"
											:search="item.pageProps.search"
											:placeholder="item.placeholder || '请选择'"
											:options="item.pageProps.options"
											:ext="item.pageProps.parmas"
											@change="onChangePageSelect"
										/>
									</template>

									<template v-else-if="item.valueType === 'custom'">
										<slot :name="item.scopedSlots.customRender"></slot>
									</template>

									<template v-else>
										<el-input
											v-model.trim="searchForm[item.dataIndex]"
											:placeholder="item.placeholder || '请输入'"
											clearable
											:maxlength="item.maxlength"
											@input="change($event)"
											@keyup.enter="enter"
										/>
									</template>
								</el-form-item>
							</el-col>
						</template>
					</template>

					<!--搜索、重置区域 -->
					<el-col :span="search.span" :offset="offsetSearchOpt" :class="`arch-search-item arch-search-operation ${!isCollapse ? 'has-bottom' : ''}`">
						<div>
							<el-button :loading="isShowLoading" @click="onSearch" type="primary">
								{{ search.searchText }}
							</el-button>
							<el-button :loading="isShowLoadingReset" @click="doReset">
								{{ search.resetText }}
							</el-button>
							<div
								v-if="showColNum <= searchProps.length"
								:class="`arch-table-collapse-container ${!isCollapse ? 'is-opened' : ''}`"
								@click="onCollapseClick"
							>
								{{ collapseText }}
								<em :class="`iconfont icon-ic-arrow-down ${!isCollapse ? 'isCollapse' : ''}`"> </em>
							</div>
							<!--  -->
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<span class="arch-pro-tip-container" v-if="tipBoxShow">
			<slot name="tipBox"></slot>
		</span>
		<div
			v-if="showTable"
			class="arch-pro-content-container"
			:class="{ 'arch-pro-content-container1': styleChange == true }"
			:style="`min-height:${minContentHeight};`"
		>
			<template v-if="search && search.option && search.option.customRender">
				<!--自定义-->
				<div class="options-btn-container">
					<slot name="protableTitle"></slot>
					<slot :name="search.option.customRender"> </slot>
					<template v-if="search.option.customWord">
						<slot :name="search.option.customWord"> </slot>
					</template>
				</div>
			</template>

			<template v-else-if="btn && btn.length">
				<!--动态配置-->
				<slot name="tabChange"></slot>
				<div class="options-btn-container">
					<slot name="protableTitle"></slot>
					<el-button
						v-for="(item, k) in btn"
						:key="`arch-btn-index-${k}`"
						v-auths="item.permission || []"
						:type="item.type == 'normal' ? '' : item.type ? item.type : 'primary'"
						class="arch-btn"
						size="default"
						:loading="item.loading"
						:disabled="typeof item.disabled === 'function' ? item.disabled() : item.disabled"
						v-show="item.show ? item.show() : true"
						@click="item.onClick"
					>
						<svg-icon v-if="item.icon" :name="`iconfont ${item.icon || ''}`" />
						{{ item.label }}
					</el-button>
					<template v-if="search && search.option && search.option.extBtn">
						<slot :name="search.option.extBtn"> </slot>
					</template>
				</div>
			</template>

			<template v-else>
				<div class="options-btn-container">
					<slot name="protableTitle"></slot>
				</div>
			</template>
			<div v-if="hasSelected" class="select-control">
				<span>
					<span>
						已选择
						<span class="light">
							{{ selection.length }}
						</span>
						条
					</span>
					<div style="float: right">
						<span class="light clear-btn" @click="clearAllSelection">清空</span>
						<span class="light" v-for="item in operation" :key="item.prop" @click="item.handleClick(item, selection)">
							{{ item.label }}
						</span>
					</div>
				</span>
			</div>

			<el-table
				ref="archTable"
				v-loading="loading"
				:data="tableData"
				:stripe="stripe"
				:border="border"
				scrollbar-always-on
				size="default"
				:row-key="getRowKey"
				:cell-class-name="({ row, column, rowIndex, columnIndex }) => 'arch-pro-table-cell ' + cellClassName({ row, column, rowIndex, columnIndex })"
				class="arch-pro-table"
				header-cell-class-name="arch-pro-table-header-cell"
				@selection-change="handleSelectionChange"
				@cell-click="cellClick"
				:expand-row-keys="expandKeys"
				@row-click="rowClick"
				@expand-change="expandChange"
				:row-class-name="tableRowClassName"
			>
				<el-table-column v-if="multi" key="checkBox" type="selection" :reserve-selection="true" width="60" />
				<template v-if="tableExpand">
					<el-table-column type="expand">
						<template #default="props">
							<slot name="expand" v-bind="{ ...props.row }" />
						</template>
					</el-table-column>
				</template>

				<template v-for="(item, i) in tableProps">
					<el-table-column
						v-if="item.scopedSlots"
						:key="`archTable_column_${i}`"
						:prop="item.dataIndex"
						:label="item.title"
						:resizable="item.resizable || resizable"
						:width="item.width || null"
						:min-width="item.minWidth || null"
						:fixed="item.fixed"
						:sortable="item.sortable"
						:align="item.align || 'left'"
						:formatter="item.formatter || ((row, column, cellValue) => formatter(row, column, cellValue, item))"
						:show-overflow-tooltip="item.ellipsis"
						:selectable="item.selectable"
					>
						<template #default="scope" v-if="item.tooltip">
							<el-tooltip
								placement="top"
								effect="dark"
								popper-class="tooltip_con"
								:disabled="
									item.formatter
										? !item.formatter(scope.row, null, scope.row[item.dataIndex])
										: !formatter(scope.row, null, scope.row[item.dataIndex], item)
								"
							>
								<template #content>{{
									item.formatter
										? item.formatter(scope.row, null, scope.row[item.dataIndex])
										: formatter(scope.row, null, scope.row[item.dataIndex], item)
								}}</template>
								<span class="tooltip">
									<slot :name="item.scopedSlots.customRender" v-bind="{ ...scope.row, __index: scope.$index }" :indexPath="scope.$index" />
								</span>
							</el-tooltip>
						</template>

						<template #default="scope" v-else>
							<slot :name="item.scopedSlots.customRender" v-bind="{ ...scope.row, __index: scope.$index }" :indexPath="scope.$index" />
						</template>
					</el-table-column>

					<!--省略可复制-->
					<el-table-column
						v-else-if="item.tooltip"
						:key="`archTable_column_${i}t`"
						:prop="item.dataIndex"
						:label="item.title"
						:resizable="item.resizable || resizable"
						:width="item.width || null"
						:min-width="item.minWidth || null"
						:fixed="item.fixed"
						:align="item.align || 'left'"
						:sortable="item.sortable"
						:show-overflow-tooltip="item.ellipsis"
						:selectable="item.selectable"
					>
						<template #default="scope">
							<el-tooltip placement="top" effect="dark" popper-class="tooltip_con">
								<template #content>{{
									item.formatter
										? item.formatter(scope.row, null, scope.row[item.dataIndex])
										: formatter(scope.row, null, scope.row[item.dataIndex], item)
								}}</template>
								<span class="tooltip">
									{{
										item.formatter
											? item.formatter(scope.row, null, scope.row[item.dataIndex])
											: formatter(scope.row, null, scope.row[item.dataIndex], item)
									}}
								</span>
							</el-tooltip>
						</template>
					</el-table-column>

					<!-- switch -->
					<el-table-column
						v-else-if="item.switch"
						:key="`archTable_column_${i}s`"
						:prop="item.dataIndex"
						:label="item.title"
						:resizable="item.resizable || resizable"
						:width="item.width || null"
						:min-width="item.minWidth || null"
						:fixed="item.fixed"
						:align="item.align || 'left'"
						:sortable="item.sortable"
						:show-overflow-tooltip="item.ellipsis"
						:selectable="item.selectable"
					>
						<template #default="scope">
							<el-switch
								:model-value="scope.row[item.dataIndex]"
								@change="(val) => switchChange(val, scope.row, item.dataIndex)"
								:active-value="item.switch.activeValue"
								:inactive-value="item.switch.inactiveValue"
								:disabled="item.switch.disabled"
								size="small"
							></el-switch>
						</template>
					</el-table-column>
					<!-- el-tag -->
					<el-table-column
						v-else-if="item.tag"
						:key="`archTable_column_${i}tag`"
						:prop="item.dataIndex"
						:label="item.title"
						:resizable="item.resizable || resizable"
						:width="item.width || null"
						:min-width="item.minWidth || null"
						:fixed="item.fixed"
						:align="item.align || 'left'"
						:sortable="item.sortable"
						:show-overflow-tooltip="item.ellipsis"
						:selectable="item.selectable"
					>
						<template #default="scope">
							<el-tag
								:type="item.tag[scope.row[item.dataIndex]].type"
								:hit="item.tag[scope.row[item.dataIndex]].hit"
								:closable="item.tag[scope.row[item.dataIndex]].closable"
								:color="item.tag[scope.row[item.dataIndex]].color"
								:size="item.tag[scope.row[item.dataIndex]].size || 'small'"
								:effect="item.tag[scope.row[item.dataIndex]].effect"
								:round="item.tag[scope.row[item.dataIndex]].round"
							>
								{{
									item.formatter
										? item.formatter(scope.row, null, scope.row[item.dataIndex])
										: formatter(scope.row, null, scope.row[item.dataIndex], item)
								}}
							</el-tag>
						</template>
					</el-table-column>

					<el-table-column
						v-else
						:key="`archTable_column_${i}I`"
						:prop="item.dataIndex"
						:label="item.title || EMPTY_PLACEHOLDER"
						:resizable="item.resizable || resizable"
						:width="item.width || ''"
						:min-width="item.minWidth || ''"
						:fixed="item.fixed"
						:sortable="item.sortable"
						:align="item.align || 'left'"
						:item="item"
						:formatter="item.formatter || ((row, column, cellValue) => formatter(row, column, cellValue, item))"
						:show-overflow-tooltip="item.ellipsis"
						:selectable="item.selectable"
					>
					</el-table-column>
				</template>

				<!-- 空数据展示 -->
				<template v-slot:empty>
					<div v-if="customEmpty">
						<slot name="empty"></slot>
					</div>
					<div v-else class="empty-slot">
						<empty-View :style="`height:${minEmptyHeight};min-height:100px;`" />
					</div>
				</template>
			</el-table>

			<div class="table-footer">
				<span v-if="paginationShow" class="arch-table-pagination-container">
					<el-pagination
						class="arch-table-pagination"
						:current-page="pagination.current"
						:page-sizes="paginationSizes"
						:page-size="pagination.pageSize"
						:layout="paginationLayout"
						:total="totalNum"
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					/>
				</span>
			</div>
		</div>
		<div v-else class="empty-table-container" :style="`min-height:${minContentHeight};`">
			<empty-View :style="`height:${minEmptyHeight};min-height:100px;`" />
		</div>
	</div>
</template>

<script>
import { ref, reactive, defineComponent, toRefs, toRef, computed, onMounted, defineExpose, onUnmounted } from 'vue';
import { toRaw } from '@vue/reactivity';
import Config from './Enum';
import PageSelect from '../PageSelect/index.vue';
import EmptyView from '../EmptyView/index.vue';
import SvgIcon from '/@/components/svgIcon/index.vue';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { getAreaJson, getCityLevelJson, loadNode, idToArea } from '/@/utils/city';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { menuMatchId } from '/@/utils/menu';
import moment from 'moment';

const { SearchConfig } = Config;

export default defineComponent({
	name: 'ProTable',
	components: {
		EmptyView,
		SvgIcon,
		PageSelect,
	},
	props: {
		isInitParams: {
			type: Boolean,
			default: false,
		},
		initParams: {
			// 初始传入默认查询条件
			type: Object,
			default: () => {
				return {};
			},
		},
		styleChange: {
			type: Boolean,
			default: false,
		},
		request: {
			type: Function,
			default: () => function () {},
		},
		dataSource: {
			// 传入数据源
			type: Object,
			require: false,
			default: () => null,
		},
		stripe: {
			type: Boolean,
			default: false,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		cellClassName: {
			type: Function,
			default: () => {},
		},
		searchConfig: {
			// 搜索配置
			type: Object,
			default: () => SearchConfig,
		},
		columns: {
			// 设置columns数据
			type: Array,
			require: true,
			default: () => [],
		},
		childrenData: {
			type: Array,
			require: true,
			default: () => [],
		},
		expandRowKeys: {
			type: Array,
			require: true,
			default: () => [],
		},
		rowKey: {
			// 单行key设置字段
			type: [String, Function],
			default: 'id',
		},
		border: {
			type: Boolean,
			default: true,
		},
		// 是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真
		resizable: {
			type: Boolean,
			default: true,
		},
		// 表单内容区域最大高度，超出滑动
		maxHeight: {
			type: Number,
			default: 900,
		},
		multi: {
			// 是否多选
			type: Boolean,
			default: false,
		},
		btn: {
			type: Array,
			default: () => [],
		},
		draggable: {
			type: Boolean,
			default: false,
		},
		showTable: {
			// 空数据的时候是否显示table
			type: Boolean,
			default: true,
		},
		tipBoxShow: {
			// 提示区域是否显示，招聘列表用
			type: Boolean,
			default: false,
		},
		operation: {
			//  批量操作区域
			type: Array,
			default: () => [],
		},
		manualRequest: {
			//  是否手动发起第一次请求
			type: Boolean,
			default: false,
		},
		customEmpty: {
			//  默认配置空数据
			type: Boolean,
			default: false,
		},
		tableExpand: {
			type: Boolean,
			default: false,
		},
		hasTown: {
			//省市区是否有区县 默认有
			type: Boolean,
			default: true,
		},
		tableRowClassName: {
			// 表格行的类名
			type: Function,
			default: () => {},
		},
	},
	emits: [
		'cell-click',
		'row-click',
		'expand-change',
		'onSearch',
		'refresh',
		'onReset',
		'selectionChange',
		'onDraggable',
		'handleCurrentChange',
		'handleSizeChange',
		'onDraggable',
		'current-change',
		'clear',
		'switch-change',
		'onLoading',
	],
	setup(props, context) {
		const pageSelectRef = ref(null);
		const archTable = ref(null);
		const store = useStore();
		const { proxy } = getCurrentInstance();
		const routePath = proxy.$router.currentRoute.value.fullPath;
		const menuList = store.state.routesList.routesList;
		// 菜单id
		const mId = computed(() => {
			return menuMatchId(routePath, menuList);
		});
		// 监听路由地址变化 并设置页面table的滚动条位置
		watchEffect(() => {
			// console.log('路由变化', proxy.$router.currentRoute.value.fullPath);
			if (proxy.$router.currentRoute.value.fullPath) {
				archTable.value && archTable.value.setScrollLeft(0);
			}
		});
		const state = reactive({
			searchForm: {
				// 搜索栏
			},
			loading: false, // 查询刷新
			response: {
				data: [],
				total: 0,
				current: 1,
			}, // 请求返回结果
			selection: [], // 选中项
			pagination: {
				current: 1,
				pageSize: 10,
			}, // 分页信息response
			isCollapse: true, // 是否收起了
			onDragChangeIndex: null,
			changeFilter: {}, // 改变搜索条件，但并未搜索
			sortable: null, // 拖拽对象
			expand_row_keys: [], // 展开行ID
			areaJson: [], // 地区json
		});

		watchEffect(() => {
			// console.log('执行了吗', state.loading);
			context.emit('onLoading', state.loading);
		});

		const search = computed(() => {
			return Object.assign({}, SearchConfig, props.searchConfig);
		});
		const searchProps = computed(() => {
			// console.log('get props columns:', props.columns);
			const obj = props.columns && props.columns.filter((item) => !item.hideInSearch);
			return obj || [];
		});

		const tableProps = computed(() => {
			// console.log('get props columns：', props.columns);
			const obj = props.columns && props.columns.filter((item) => !item.hideInTable);
			return obj || [];
		});

		const offsetSearchOpt = computed(() => {
			if (state.isCollapse) {
				// 收起状态
				const cols = searchProps.value.length;
				if (cols > showColNum.value - 1) {
					return 0;
				} else {
					return (showColNum.value - cols - 1) * search.value.span;
				}
			}
			return 24 - search.value.span - ((search.value.span * searchProps.value.length) % 24);
		});

		const tableData = computed(() => {
			const data = (props.dataSource && props.dataSource.records) || state.response.data || [];
			return JSON.parse(JSON.stringify(data));
		});

		const hasSelected = computed(() => {
			return props.multi && state.selection && state.selection.length;
		});

		const current = computed(() => {
			return (state.pagination && state.pagination.current) || 0;
		});

		const paginationSizes = computed(() => {
			return (search.value && search.value.pagination.sizes) || [10, 20, 30, 50, 100];
		});

		const paginationLayout = computed(() => {
			return (search.value && search.value.pagination.layout) || 'total, sizes, prev, pager, next';
		});

		const paginationShow = computed(() => {
			if (!search.value.pagination) {
				return false;
			}
			if (totalNum.value || (search.value && search.value.pagination && search.value.pagination.emptyShow)) {
				return true;
			}
			return false;
		});

		const totalNum = computed(() => {
			if (props.dataSource) {
				return props.dataSource.total;
			}
			return state.response.total || 0;
		});

		const collapseText = computed(() => {
			return state.isCollapse ? '展开' : '收起';
		});

		const showColNum = computed(() => {
			return 24 / search.value.span;
		});

		const lines = computed(() => {
			if (!props.showHeader || !searchProps.value || !searchProps.value.length) {
				return 0;
			}
			if (showColNum.value > searchProps.value.length || state.isCollapse) {
				return 1;
			}
			const total = searchProps.value.length + 1;
			return Math.ceil(total / showColNum.value);
		});

		const minContentHeight = computed(() => {
			if (lines.value === 0) {
				return 'calc(100% - 98px - 6px - 20px)';
			} else if (lines.value === 1) {
				return 'calc(100% - 98px   - 6px -72px - 20px)';
			}
			const searchHeight = lines.value * 32 + 30 * (lines.value - 1);
			return `calc(100% - 98px  - 6px  - 40px - 20px - ${searchHeight}px )`;
		});

		const minEmptyHeight = computed(() => {
			if (lines.value === 0) {
				return 'calc(100% - 98px - 20px - 300px)';
			} else if (lines.value === 1) {
				return 'calc(100% - 98px - 72px - 20px - 1px - 300px)';
			}
			const searchHeight = lines.value * 32 + 30 * (lines.value - 1);
			return `calc(100% - 98px - 40px - 20px - 300px - ${searchHeight}px )`;
		});

		const change = () => {
			// this.$forceUpdate();
			// console.log('change');
		};

		const handleDateRange = () => {};

		/*
			 时间周期选择
				searchIndex 为 startEndTime,则代表传给后台的是开始时间结束时间不同的字段
				其他情况下 都是 searchIndex直接传给后端的字段
			*/
		const handleDateTimeRange = (item, val) => {
			if (item.startTime && item.endTime && val && val.length) {
				state.searchForm[item.startTime] = val[0];
				state.searchForm[item.endTime] = val[1];
			} else {
				delete state.searchForm[item.startTime];
				delete state.searchForm[item.endTime];
			}
		};

		const loadArea = (node, resolve) => {
			const level = node.level;
			const isLeaf = node.isLeaf;
			if (level === 0) {
				const data = loadNode(0);
				resolve(data);
			} else if (isLeaf) {
				return resolve([]);
			} else {
				return resolve(loadNode(node.data.id));
			}
			return resolve([]);
		};

		// 省市区地址选择
		const changeFileAddress = (val, node, item) => {
			const values = [val.id];
			if (node.parent && node.parent.level != 0) {
				// 获取市或者省
				values.unshift(node.parent.data.id);
				if (node.parent.parent && node.parent.parent.level != 0) {
					// 获取省
					values.unshift(node.parent.parent.data.id);
				}
			}

			const area = {};
			const params = item.params;

			if (values.length == 1) {
				area[params.pro] = values[0];
				area[params.city] = null;
				area[params.town] = null;
			} else if (values.length == 2) {
				area[params.pro] = values[0];
				area[params.city] = values[1];
				area[params.town] = null;
			} else if (values.length == 3) {
				area[params.pro] = values[0];
				area[params.city] = values[1];
				area[params.town] = values[2];
			} else {
				area[params.pro] = null;
				area[params.city] = null;
				area[params.town] = null;
			}
			state.searchForm = { ...state.searchForm, ...area };
		};

		// 清除省市区地址
		const clearFileAddress = (item) => {
			const area = {};
			const params = item.params;
			area[params.pro] = null;
			area[params.city] = null;
			area[params.town] = null;
			state.searchForm = { ...state.searchForm, ...area };
		};

		// switch 事件
		const switchChange = (val, item, type) => {
			context.emit('switch-change', val, item, type);
		};

		// 分页选择
		const onChangePageSelect = (val) => {
			// console.log(val);
			// context.emit('page-change', val);
		};

		const cellClick = (row, column, cell, event) => {
			event.preventDefault();
			context.emit('cell-click', row, column, cell, event);
		};

		const rowClick = (row, column, cell, event) => {
			context.emit('row-click', row, column, cell, event);
		};

		const expandChange = (row, expandedRows) => {
			context.emit('expand-change', row, expandedRows);
		};

		const enter = () => {
			onSearch();
		};

		const onSearch = () => {
			isShowLoading.value = true;
			state.pagination.current = 1;
			if (search.value.onSearch) {
				// 自定义搜索触发
				const res = search.value.onSearch(tableData.value, getParams());
				state.response = res || { data: [], total: 0, current: 1 };
				isShowLoading.value = false;
			} else {
				// 默认触发搜索
				doSearch();
			}
			isShowDefaultDate('onSearch');
		};

		const expandKeys = computed(() => {
			return state.expand_row_keys || props.expandRowKeys;
		});

		const setExpandRowKeys = (array) => {
			if (array) {
				state.expand_row_keys = array;
			} else {
				state.expand_row_keys = [];
			}
		};
		const removePropertyOfNull = (obj) => {
			// console.log(obj);
			// 去除对象里为NULL的键值对
			Object.keys(obj).forEach((item) => {
				if (!obj[item]) {
					delete obj[item];
				}
			});
			return obj;
		};
		const isShowLoading = ref(false);
		const isShowLoadingReset = ref(false);
		const doSearch = async (data) => {
			try {
				if (props.dataSource) {
					return;
				}
				state.loading = true;
				// 搜索接口
				let query = getParams();
				if (data) {
					query = data;
					// 这里是针对 人员档案跳转项目档案的问题
					if (data.initParams) {
						state.searchForm = { ...state.searchForm, ...props.initParams };
						delete query.initParams;
					}
				}
				// 清空时间走起搜索问题
				if (query.startEndTime) {
					delete query.startEndTime;
				}

				// 菜单页面id
				if (mId.value) {
					query.mId = mId.value;
				} else {
					delete query.mId;
				}
				// 清除导出必须传的菜单id
				if (query.menuInfo) {
					delete query.menuInfo;
				}

				// 清除地址
				Object.keys(query).forEach((item) => {
					if (item.indexOf('_') > -1) {
						delete query[item];
					}
				});

				// console.log('query', query);
				const res = await props.request(query); // 调用接口
				if (!res.data) {
					return;
				}
				state.response = res;
				isShowLoading.value = false;
				isShowLoadingReset.value = false;
				setExpandRowKeys([]); // 清空下拉展开
			} catch (e) {
				console.log('get exception:', e);
			} finally {
				isShowLoading.value = false;
				isShowLoadingReset.value = false;
				setTimeout(() => {
					state.loading = false;
				}, 200);
			}
		};

		const refresh = (params) => {
			// refresh操作 搜索条件清空、当前页码回到第一页，页码size回到默认状态，所有状态回到初始
			const p = params ? JSON.parse(JSON.stringify(params)) : {};
			// console.log('[ refresh ] >',state.searchForm)
			if (search.value.pagination) {
				state.pagination = {
					current: 1,
					pageSize: search.value.pagination.size,
				};
			}
			clearAllSelection();
			if (p) {
				state.searchForm = { ...p, ...state.searchForm };
			} else {
				state.searchForm = { ...state.searchForm };
			}

			doSearch();
			context.emit('refresh');
		};

		const getParams = () => {
			const param = {
				current: state.pagination.current,
				size: state.pagination.pageSize,
				menuInfo: mId.value,
			};
			if (state.searchForm) {
				for (let key in state.searchForm) {
					const value = toRaw(state.searchForm[key]);
					param[key] = value;
				}
			}
			return removePropertyOfNull(param);
		};

		// 重置
		const doReset = () => {
			isShowLoadingReset.value = true;
			// 重置操作,搜索栏搜索条件重置，当前页码回到第一页，页码size不变
			resetFilter();
			state.pagination.current = 1;
			clearAllSelection();
			// 重置回调
			context.emit('onReset');
			state.searchForm = JSON.parse(JSON.stringify(props.initParams)) || {};
			isShowDefaultDate('reset');
			doSearch();
		};

		// 清空所有选项
		const clearAllSelection = () => {
			if (archTable.value) archTable.value.clearSelection();
		};
		const getRowKey = (row) => {
			return row.id;
		};
		// 多选框勾选
		const handleSelectionChange = (val) => {
			state.selection = val;
			context.emit('selectionChange', val);
		};

		const resetFilter = () => {
			state.searchForm = JSON.parse(JSON.stringify(props.initParams)) || {};
			// this.$refs.search.resetFields() // 清楚筛选项,此方法会导致日期控件打开的时间为1970年
		};

		const handleSizeChange = (val) => {
			state.selection = [...new Set(state.selection)];
			state.pagination = {
				current: 1,
				pageSize: val,
			};
			context.emit('handleSizeChange');
			doSearch();
		};

		const handleCurrentChange = (val) => {
			const newVal = {
				current: val,
				pageSize: state.pagination.pageSize,
			};

			if (Number(val) !== 1) {
				const last = state.changeFilter;
				const keys = Object.keys(last);
				const diff = keys.some((item) => {
					if (item !== 'current' && item !== 'size') {
						return last[item] !== state.searchForm[item];
					}
				});
				if (diff) {
					newVal.current = 1;
				}
			}
			state.pagination = { ...newVal };
			context.emit('handleCurrentChange');
			doSearch();
		};

		const onCollapseClick = () => {
			state.isCollapse = !state.isCollapse;
		};

		const setupDefault = (value, item) => {
			if (value === null || value === undefined || value === '') {
				return EMPTY_PLACEHOLDER;
			}
			if (item.dateFormat) {
				// 支持日期格式格式化
				return moment(value).format(item.dateFormat);
			}

			return value;
		};

		const formatter = (row, column, cellValue, item) => {
			// 格式化列文本
			if (item && item.valueEnum) {
				if (Array.isArray(item.valueEnum)) {
					// 是数组
					const current = item.valueEnum.find((i) => i.key === cellValue);
					return (current && current.value) || EMPTY_PLACEHOLDER;
				} else {
					return setupDefault(item.valueEnum[cellValue], item);
				}
			}
			// 地址显示
			if (item.valueType == 'addRess') {
				const pro = item.params['pro'];
				const city = item.params['city'];
				const town = item.params['town'];

				return idToArea({ province: row[pro], city: row[city], town: row[town] });
			}
			return setupDefault(cellValue, item);
		};
		const isShowDefaultDate = (type) => {
			const defaulDateList = JSON.parse(JSON.stringify(props.columns.filter((e) => !!e.isShowDefaultDate)));
			if (defaulDateList.length == 0) return;
			const getParamsData = getParams();
			//这个判断是为了区分：  选择个日期后，如果选择了一个日期，点击搜索按钮，会出现输入框里日期会立马跳转为当前日期（正常不应该跳转为当前日期，而应还是选择的日期，只有手动删除日期后，在点击搜索按钮即可跳转为当前日期进行搜索），这个情况只有点击搜索按钮才会出现
			if (type == 'onSearch') {
				for (let j = 0; j < defaulDateList.length; j++) {
					const element = defaulDateList[j];
					const typ = element.isShowDefaultDate.type ? element.isShowDefaultDate.type : 'null';
					for (const key in getParamsData) {
						if (key != typ) {
							if (!getParamsData[typ]) {
								const dateValue = element.isShowDefaultDate.defaultValue ? element.isShowDefaultDate.defaultValue : null;
								state.searchForm[typ] = dateValue;
							}
						}
					}
				}
			} else {
				for (let j = 0; j < defaulDateList.length; j++) {
					const element = defaulDateList[j];
					const typee = element.isShowDefaultDate.type ? element.isShowDefaultDate.type : 'null';
					const dateValue = element.isShowDefaultDate.defaultValue ? element.isShowDefaultDate.defaultValue : null;
					state.searchForm[typee] = dateValue;
				}
			}
		};

		onMounted(() => {
			state.searchForm = JSON.parse(JSON.stringify(props.initParams)) || {};
			if (!props.manualRequest) doSearch(); // 首次请求主动触发
			const json = props.hasTown ? getAreaJson() : getCityLevelJson();
			state.areaJson = json;
			isShowDefaultDate('init');
		});

		return {
			...toRefs(props),
			...toRefs(state),
			state,
			search,
			searchProps,
			tableProps,
			offsetSearchOpt,
			tableData,
			hasSelected,
			current,
			paginationSizes,
			paginationLayout,
			paginationShow,
			totalNum,
			collapseText,
			lines,
			showColNum,
			minEmptyHeight,
			change,
			handleDateRange,
			handleDateTimeRange,
			loadArea,
			changeFileAddress,
			clearFileAddress,
			onCollapseClick,
			formatter,
			handleSizeChange,
			handleSelectionChange,
			getRowKey,
			clearAllSelection,
			handleCurrentChange,
			minContentHeight,
			cellClick,
			rowClick,
			enter,
			onSearch,
			doReset,
			expandChange,
			refresh,
			doSearch,
			setExpandRowKeys,
			archTable,
			expandKeys,
			getParams,
			EMPTY_PLACEHOLDER,
			switchChange,
			isShowLoading,
			isShowLoadingReset,
			onChangePageSelect,
		};
		context.expose({ clearAllSelection, doSearch, refresh });
	},
});
</script>

<style lang="scss" scoped src="./css/ProTable.scss"></style>

<style lang="scss">
@import './css/ProTable1.scss';
</style>
