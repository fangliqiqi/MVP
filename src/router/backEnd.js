import { store } from '/@/store/index';
import { Local, Session } from '/@/utils/storage';
import { NextLoading } from '/@/utils/loading';
import { setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '/@/router/index';
import { dynamicRoutes } from '/@/router/route';
import { getMenus } from '/@/api/menu';
import { getUserInfo } from '/@/api/user';

// const menuApi = useMenuApi();

const layouModules = import.meta.glob('../layout/routerView/*.{vue,js}');
const viewsModules = import.meta.glob('../views/**/*.{vue,js}');
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules = Object.assign({}, { ...layouModules }, { ...viewsModules });

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method store.dispatch('userInfos/setUserInfos') 触发初始化用户信息
 * @method store.dispatch('requestOldRoutes/setBackEndControlRoutes') 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initBackEndControlRoutes() {
	// 界面 loading 动画开始执行
	if (window.nextLoading === undefined) NextLoading.start();
	// 无 token 停止执行下一步
	if (!Local.get('access_token')) return false;

	/**
	 * add by hfcai,这里需要做一个判断，路由加载只需要在重新登录或者关闭当前页面后才再次请求，降低请求频次
	 *
	 */
	let menu = Session.get('menu');
	if (!menu) {
		// 触发初始化用户信息
		store.dispatch('userInfos/setUserInfos');
		// 获取路由菜单数据
		const menu = await getBackEndControlRoutes();
		// store.dispatch('menuList/setMenuList', JSON.parse(JSON.stringify(menu)));
		// 菜单缓存
		Session.set('menu', menu);
	} else {
		const p = Local.get('user_permission');
		store.commit('userInfos/setFieldsVal', { field: 'permission', val: p });
	}
	if (menu) {
		// 存储接口原始路由（未处理component），根据需求选择使用
		store.dispatch('requestOldRoutes/setBackEndControlRoutes', JSON.parse(JSON.stringify(menu)));
		// 处理路由（component），替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
		// dynamicRoutes[0].children = await backEndComponent(menu);

		const res = await backEndComponent(menu);
		dynamicRoutes[0].children.unshift(...res);

		dynamicRoutes[0].redirect = menu[0].redirect || menu[0].path;
		// 添加动态路由
		await setAddRoute();
		// 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
		setFilterMenuAndCacheTagsViewRoutes();
		return true; // 加载成功
	} else {
		// 请求获取路由失败，需要退出登录
		return false;
	}
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export async function getBackEndControlRoutes() {
	console.log('getBackEndControlRoutes-----------------------------------------');
	try {
		const resp = await getMenus();
		// console.log(resp);
		const permission = await getUserInfo();

		if (permission && permission.code == 200) {
			// 这里需要保存按钮权限
			const p = permission.data.permissions || [];
			Local.set('user_permission', p);
			store.commit('userInfos/setFieldsVal', { field: 'permission', val: p });
		}
		if (resp && resp.code == 200&&resp.data&&resp.data.length>0) {
			return tranformMenuData(resp.data || []);
		}
	} catch (excption) {
		console.log('get exception:', excption);
	}
	return null;
	// return res
	// 	return menuApi.getMenuList();
}

function tranformMenuData(menu) {
	return menu.map((item) => {
		const target = {
			path: item.path,
			name: item.name,
			id: item.id,
			component: item.path.substring(1),
			meta: {
				title: item.label,
				isKeepAlive: true,
			},
		};

		// if (item.path && item.path.indexOf('/') !== -1 && item.path.indexOf('/') + 1 < item.path.length) {
		// 	target.name = item.path.substring(String(item.path).lastIndexOf('/') + 1, item.path.length) + item.name;
		// }

		if (item.icon) {
			target.meta.icon = `iconfont ${item.icon || 'icon-ic-sidemenu-01da'}`; // 设置了一个默认icon，开发适用
		}
		// console.log(`output->item`,item)
		// UI 要求二级三级菜单不要图标
		if(item.parentId!=-1){
			target.meta.icon = null
		}
		if (item.children) {
			// 存在子页面
			target.component = 'layout/routerView/parent';
			target.children = tranformMenuData(item.children);
			target.redirect = target.children[0].path;
		}
		return target;
	});
}

// 后台返回的菜单接口封装 (不全  试一试)
export function setMenuList(data) {
	data.map((item) => {
		if (item.children.length == 0) {
			item.meta.roles = ['common'];
		} else {
			setMenuList(item.children);
		}
	});
	return data;
}

/**
 * 重新请求后端路由菜单接口
 * @description 用于菜单管理界面刷新菜单（未进行测试）
 * @description 路径：/src/views/system/menu/component/addMenu.vue
 */
export function setBackEndControlRefreshRoutes() {
	getBackEndControlRoutes();
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes) {
	if (!routes) return;
	return routes.map((item) => {
		if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component);
		item.children && backEndComponent(item.children);
		return item;
	});
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules, component) {
	const keys = Object.keys(dynamicViewsModules);
	// console.log('222');
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, '');
		// return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
		return k === component + '.vue' || k === '/' + component + '.vue'; // 防止存在 eleContract 和eleContractTemplate情况出现
	});
	// console.log('get dynamicImport matchKeys:', matchKeys, component);
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}
