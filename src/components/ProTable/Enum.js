export const ValueType = [
  'textarea', // 文本域
  'date', // 日期
  'dateTime', // 日期时间
  'time', // 时间
  'select', // 下拉框
  'text', // 文本框
  'addRess', // 地址 参考社保公积金-配置中心-户配置
];


// 表单列配置参数
const SearchConfig = {
  span: 6, // 配置查询表单的列数
  searchText: '搜索', // 查询按钮的文本
  resetText: '重置', // 重置按钮的文本
  className: null, // 封装的搜索 Form 的 className
  defaultCollapsed: true, // 默认是否收起 默认true
  onCollapse: () => {}, // 收起按钮的事件
  optionRender: false, // 自定义操作栏
  // labelWidth: 'auto', // 列宽 98px
  // labelWidth: '98px', // 列宽 98px
  onSearch: false, // 自定义搜索触发,传入boolean
  pagination: {
    sizes: [10, 20, 30, 50, 100],
    size: 10,
    layout: 'total, sizes, prev, pager, next, jumper',
    emptyShow: false, // 数据为空时是否显示分页器
  },
  option: {},
};

// 列配置参数
const ColumnProps = {
  ellipsis: false, // 是否自动缩略
};

export default {
  SearchConfig,
  ColumnProps,
};