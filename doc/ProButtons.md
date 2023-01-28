#  ProButtons组件使用说明



### ProButtons属性

|  属性    |   说明  |类型    |默认值|
|  ----    | ----  | ---- | ----|
| array | 按钮组，按钮配置   |  array | - |
| model   | 关联model数据 | object | - |



### ProButtons按钮配置属性

|  属性    |   说明  |类型    |默认值|
|  ----    | ----  | ---- | ----|
| text | 显示按钮文字  |  string | - |
| prop   | 按钮唯一标识 | string | - |
| permission   | 权限标识符，为空则默认不验证按钮权限 | array | - |
| tooltip   | 是否显示tooltip,设置为字符串则为显示内容 | boolean \| string | - |
| isGray   | 是否置灰,(model)=>{},model为传入的model属性 | function  | - |
| loading | 添加加载状态 | boolean | false |