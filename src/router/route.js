/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      roles：          当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

// 社保公积金详情页面
const socialfundDetail = [
	{
		path: '/socialfund/detail/:id',
		name: 'social-fund-detail',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '社保公积金-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];
// 社保公积金预派单详情页面 以及编辑页面
const preSendorder = [
	{
		path: '/socialfund/sendOrder/preSendorder/detail/:id',
		name: 'pre-order-detail',
		component: () => import('/@/views/socialfund/component/detailPre.vue'),
		meta: {
			title: '预派单-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/preSendorder/edit/:id',
		name: 'pre-order-edit',
		component: () => import('/@/views/socialfund/component/editPreorder.vue'),
		meta: {
			title: '预派单-编辑',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/preSendorderQuery/detail/:id',
		name: 'pre-order-detail-query',
		component: () => import('/@/views/socialfund/component/detailQuery.vue'),
		meta: {
			title: '预派单查询-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];

/**
 * 社保公积金模板
 */
const socialFund = [
	...socialfundDetail,
	...preSendorder,
	{
		path: '/socialfund/sendOrder/order/detail/:id',
		name: 'socialfund-order-detail',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '派单查询-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/orderApply/detail/:id',
		name: 'socialfund-order-apply-detail',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '派单申请-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/orderAudit/audit/:id',
		name: 'socialfund-order-audit',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '派单审核-审核',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/socialConduct/conduct/:id',
		name: 'socialfund-social-conduct',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '社保办理-办理',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/socialfund/sendOrder/fundConduct/conduct/:id',
		name: 'socialfund-fund-conduct',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '公积金办理-办理',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];

/**
 * 商险详情
 */
const insurance = [
	{
		path: '/insurance/detail/:id',
		name: 'insurance-detail',
		component: () => import('/@/views/insurance/component/InsuranceDetail.vue'),
		meta: {
			title: '商业保险-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];

/**
 * 订单管理
 */
const orderManage = [
	{
		path: '/order/detail/:id',
		name: 'oreder-manage-detail',
		component: () => import('../views/order/Detail.vue'),
		meta: {
			title: '订单管理-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: true,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/order/handle/:id',
		name: 'oreder-manage-handle',
		component: () => import('../views/order/Detail.vue'),
		meta: {
			title: '订单管理-办理',
			isLink: '',
			isHide: true,
			isKeepAlive: true,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/order/handle/socialfund/detail/:id',
		name: 'oreder-manage-socialfund-detail',
		component: () => import('/@/views/socialfund/component/detail.vue'),
		meta: {
			title: '社保公积金-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/order/handle/payservice/detail/:id',
		name: 'oreder-manage-payservice-bill-detail',
		component: () => import('/@/views/payservice/component/detail.vue'),
		meta: {
			title: '薪酬-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];

/*
 * 薪酬服务
 */
const payService = [
	{
		path: '/payservice/payImport/detail/:id',
		name: 'payservice-import-detail',
		component: () => import('/@/views/payservice/component/detail.vue'),
		meta: {
			title: '薪酬导入-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/payservice/payAudit/detail/:id',
		name: 'payservice-audit-detail',
		component: () => import('/@/views/payservice/component/detail.vue'),
		meta: {
			title: '薪酬审核-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/payservice/payProjectSearch/detail/:id',
		name: 'payservice-project-detail',
		component: () => import('/@/views/payservice/component/detail.vue'),
		meta: {
			title: '项目薪酬-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	{
		path: '/payservice/peopleBillSearchh/detail/:id/:dataId',
		name: 'payservice-bill-detail',
		component: () => import('/@/views/payservice/component/detail.vue'),
		meta: {
			title: '员工报账-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
];

/**
 * 定义动态路由
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/system/permission/addPermission',
				name: '新增_数据权限',
				component: () => import('/@/views/system/permission/component/addPermission.vue'),
				meta: {
					title: '新增_数据权限',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/permission/editPermission',
				name: '编辑_数据权限',
				component: () => import('/@/views/system/permission/component/editPermission.vue'),
				meta: {
					title: '编辑_数据权限',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/archives/staff/online/add',
				name: 'online-add',
				component: () => import('/@/views/archives/staff/editStaff.vue'),
				meta: {
					title: '在档人员-新增',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/archives/staff/online/edit/:id',
				name: 'online-edit',
				component: () => import('/@/views/archives/staff/editStaff.vue'),
				meta: {
					title: '在档人员-编辑',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/payservice/settings/specialDeduction/detail/:id',
				name: 'decution-detail',
				component: () => import('/@/views/payservice/settings/detail.vue'),
				meta: {
					title: '专项扣除-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},

			{
				path: '/archives/staff/online/detail/:id',
				name: 'online-detail',
				component: () => import('/@/views/archives/staff/detail.vue'),
				meta: {
					title: '在档人员-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/archives/withdrawn//detail/:id',
				name: 'withdrawn-detail',
				component: () => import('/@/views/archives/staff/detail.vue'),
				meta: {
					title: '离职库-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			
			{
				path: '/archives/subject/add',
				name: 'subject-add',
				component: () => import('/@/views/archives/editSubject.vue'),
				meta: {
					title: '项目档案-新增',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/archives/subject/edit/:id',
				name: 'subject-edit',
				component: () => import('/@/views/archives/editSubject.vue'),
				meta: {
					title: '项目档案-编辑',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/archives/subject/detail/:id',
				name: 'subject-detail',
				component: () => import('/@/views/archives/staff/detail.vue'),
				meta: {
					title: '项目档案-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractApply/add',
				name: 'contract-add',
				component: () => import('/@/views/contract/component/addContract.vue'),
				meta: {
					title: '员工合同-申请',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractApply/edit',
				name: 'contract-edit',
				component: () => import('/@/views/contract/component/addContract.vue'),
				meta: {
					title: '员工合同-编辑',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractApply/detail',
				name: 'contract-detail',
				component: () => import('/@/views/contract/component/detailContract.vue'),
				meta: {
					title: '员工合同-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractSearch/detail',
				name: 'contractSearch-detail',
				component: () => import('/@/views/contract/component/detailContract.vue'),
				meta: {
					title: '员工合同-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/staff/online/contractdetail',
				name: 'onlineContract-detail',
				component: () => import('/@/views/contract/component/detailContract.vue'),
				meta: {
					title: '员工合同-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/staff/subject/contractdetail',
				name: 'subjectContract-detail',
				component: () => import('/@/views/contract/component/detailContract.vue'),
				meta: {
					title: '员工合同-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractApply/renew',
				name: 'contract-renew',
				component: () => import('/@/views/contract/component/addContract.vue'),
				meta: {
					title: '续签待办-续签',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/contract/contractCheck/audit/:id',
				name: 'contract-audit',
				component: () => import('/@/views/contract/contractAudit.vue'),
				meta: {
					title: '员工合同-审核',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/social/add',
				name: 'social-config-add',
				component: () => import('/@/views/socialfund/settings/addCardinalConfig.vue'),
				meta: {
					title: '社保基数配置-新增',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/social/edit/:id',
				name: 'social-config-edit',
				component: () => import('/@/views/socialfund/settings/addCardinalConfig.vue'),
				meta: {
					title: '社保基数配置-编辑',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/social/detail/:id',
				name: 'social-config-detail',
				component: () => import('/@/views/socialfund/settings/cardinalConfigDetail.vue'),
				meta: {
					title: '社保基数配置-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/fund/add',
				name: 'fund-config-add',
				component: () => import('/@/views/socialfund/settings/addCardinalConfig.vue'),
				meta: {
					title: '公积金基数配置-新增',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/fund/edit/:id',
				name: 'fund-config-edit',
				component: () => import('/@/views/socialfund/settings/addCardinalConfig.vue'),
				meta: {
					title: '公积金基数配置-编辑',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			{
				path: '/socialfund/settings/cardinalConfig/fund/detail/:id',
				name: 'fund-config-detail',
				component: () => import('/@/views/socialfund/settings/cardinalConfigDetail.vue'),
				meta: {
					title: '公积金基数配置-详情',
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
				},
			},
			...socialFund, // 社保公积金模板
			...payService, //薪酬服务
			...insurance, // 商险服务
			...orderManage, // 订单管理
		],
	},
	{
		path: '/projectmanage/detail/:id',
		name: 'projectmanage-detail',
		component: () => import('/@/views/projectmanage/detail.vue'),
		meta: {
			title: '项目管理-详情',
			isLink: '',
			isHide: true,
			isKeepAlive: false,
			isAffix: false,
			isIframe: false,
		},
	},
	
];

/**
 * 定义静态路由
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '页面找不到',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '页面无权限',
		},
	},
];
