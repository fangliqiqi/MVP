#  ProTable组件使用说明
> 复合搜索组件封装，支持搜索区域、table数据展示区域字段动态配置，搜索方法接口释放。



### 组件API







#### ProTable属性

|  属性    |   说明  |类型    |默认值|
|  ----    | ----  | ---- | ----|
| search | 是否显示搜索表单，传入对象时为搜索表单的配置  | false \| Object | - |
| rowKey   | table行的唯一key字段名 | string | - |
| columns  |  | | |
| columnEmptyText | 空值时的显示，不设置时显示 -， false 可以关闭此功能 | string \| false|  - |
| columns  | 搜索项、列表列定位集合  | Columns | - |



#### ProTable事件

|  事件名称    |   说明  | 回调参数 |
|  ----    | ----  | ---- |
| request | ProTable核心事件，用于回调请求接口数据加载数据,需保持格式一致 | (params:Object) => { current:number,total: number,data: array,} |



#### searchConfig 列定义
|  属性    |   说明  |类型    |默认值|
|  ----    | ----  | ---- | ----|
| labelWidth|  列宽 | number | - |


#### Columns 列定义

|  属性    |   说明  |类型    |默认值|
|  ----    | ----  | ---- | ----| 
| hideInTable | 在 Table 中不展示此列 | boolean| false |
| hideInForm  | 在 Form 中不展示此列 | boolean | false |
| valueType   | 属性类型 | ![string](ProTable#valuetype-类型定义) | text |
| title | 表格列表或者搜索表单属性名  | string | - |
| dataIndex  | 属性名【搜索表单属性或者table获取数据源的属性名】  | string  |  - |
| valueEnum |  提供的匹配值集  | string \| array  | - |
| placeholder | 搜索form的placehold设置 | string | - |
| valueFormat | 日期类型数据格式样式设置 | string | - |
 

#### ValueType 类型定义
|  valueType    |   说明  |
|  ----    | ----  | 
| text  |  文本输入框 |
| password  | 密码输入框 | 
| date | 日期 |
| dateRange | 日期区间 |
| select | 下拉选择框 |
| custom | 自定义类型，可通过slot设置 |

