import * as CryptoJS from 'crypto-js';

import { getDictbyType, getItembyTypes } from '/@/api/dict';
import { Session } from '/@/utils/storage';

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
	if (!(typeof obj == 'object')) {
		return;
	}

	for (var key in obj) {
		if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
			delete obj[key];
		}
	}
	return obj;
}

/**
 *加密处理
 */
export const encryption = (params) => {
	let { data, type, param, key } = params;
	const result = JSON.parse(JSON.stringify(data));
	if (type === 'Base64') {
		param.forEach((ele) => {
			result[ele] = btoa(result[ele]);
		});
	} else {
		param.forEach((ele) => {
			var data = result[ele];
			key = CryptoJS.enc.Latin1.parse(key);
			var iv = key;
			// 加密
			var encrypted = CryptoJS.AES.encrypt(data, key, {
				iv: iv,
				mode: CryptoJS.mode.CFB,
				padding: CryptoJS.pad.NoPadding,
			});
			result[ele] = encrypted.toString();
		});
	}
	return result;
};

/**
 *
 *翻译字典
 * @param {*} dict 字典数组
 * @param {*} value 字典值
 * @return {*}
 */
export const translateDict = (dict, value) => {
	if (!dict || !dict.length) {
		return value;
	}
	const item = dict.find((item) => item.value == value);
	return item ? item.label : value;
};

// md5 加密
export const md5 = (str) => CryptoJS.MD5(str).toString().toUpperCase();

const defaultAppKey = '888888888';
const defaultAppSecret = 'sdggdsgcdhdshdhfhhfhdhhhfvc';

/**
 *
 * @param {*} params
 * @param {*} appKey
 * @param {*} appSecret
 * @returns
 */
export const sign = (params, appKey = defaultAppKey, appSecret = defaultAppSecret) => {
	const obj = {};
	let str = '';

	for (const k in params) {
		if (['sign', 'appKey'].includes(k) || k instanceof Array || k instanceof Object || params[k] === undefined) {
			continue;
		}
		obj[k] = params[k];
	}

	Object.keys(obj)
		.sort()
		.forEach((k) => {
			console.log(k, ': ', obj[k]);
			str += obj[k];
		});
	str = encodeURI(`${appKey}${str}${appSecret}`).toUpperCase();
	return md5(str);
};

/**
 * 通过身份证号码解析出生日期、性别和年龄
 * @param {*} IdCard
 */
export function parseIDCardInfo(IdCard) {
	const target = {};
	let birthday = null;
	// console.log('get parseIDcardInfo:',String(IdCard).trim().length )
	if (IdCard && String(IdCard).trim().length === 15) {
		// 15位身份证
		birthday = '19' + IdCard.substring(6, 8) + '-' + IdCard.substring(8, 10) + '-' + IdCard.substring(10, 12);
		target.birthday = birthday;

		/**
		 * 1:男，2:女
		 */
		if (parseInt(IdCard.substr(14, 1)) % 2 === 1) {
			target.sex = 1;
		} else {
			target.sex = 2;
		}

		//获取年龄
		let ageDate = new Date();
		let month = ageDate.getMonth() + 1;
		let day = ageDate.getDate();

		let age = ageDate.getFullYear() - `19${IdCard.substring(6, 8)}` - 1;
		if (IdCard.substring(8, 10) < month || (IdCard.substring(8, 10) === month && IdCard.substring(10, 12) <= day)) {
			age++;
		}
		if (age <= 0) {
			age = 1;
		}
		target.age = age;
	} else if (IdCard && String(IdCard).trim().length === 18) {
		birthday = IdCard.substring(6, 10) + '-' + IdCard.substring(10, 12) + '-' + IdCard.substring(12, 14);
		target.birthday = birthday;

		/**
		 * 1:男，2:女
		 */
		if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
			target.sex = 1;
		} else {
			target.sex = 2;
		}

		//获取年龄
		let ageDate = new Date();
		let month = ageDate.getMonth() + 1;
		let day = ageDate.getDate();
		let age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1;
		if (IdCard.substring(10, 12) < month || (IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day)) {
			age++;
		}
		if (age <= 0) {
			age = 1;
		}
		target.age = age;
	}

	return target;
}

/**
 * 暂时
 */
async function getDictByItemType(t) {
	try {
		let v = Session.get(t);
		if (!v) {
			const res = await getDictbyType(t);
			if (res && res.code === 200) {
				const target = res.data || [];
				v = {};
				target.forEach((item) => {
					v[item.value] = item.label;
				});
				Session.set(t, v);
			}
		}
		return v || {};
	} catch (e) {
		console.log('get exception:', e);
		return {};
	}
}

/**
 * @todo 等老房添加批量请求接口后需要改造,
 * 通过字典的itemtype获取字典值[字典通过sessionStroage缓存，建议缓存最大字典数20个，超出滚动缓存]
 * @param {string | array} itemtypes 字典项或者字典项数组
 *
 */
export async function getDictByItemTypes(itemtypes) {
	// console.log('get itemtypes:',itemtypes)
	if (Array.isArray(itemtypes)) {
		// 数组格式，
		let target = {};
		const noExists = [];
		for (let item of itemtypes) {
			let v = Session.get(item);
			if (v) {
				target[item] = v;
			} else {
				noExists.push(item);
			}
		}
		try {
			if (noExists && noExists.length) {
				const res = await getItembyTypes(noExists);
				if (res && res.code === 200) {
					const data = res.data;
					for (let key in data) {
						Session.set(key, data[key]);
						target[key] = data[key];
					}
				}
			}
		} catch (e) {
			console.log('get exception:', e);
		}

		return target;
	} else {
		return await getDictByItemType(itemtypes);
	}
}

/**
 * 通过map 格式dict获取当前的字典值，不存在返回当前的字典值key
 * @param source dict of map
 * @param value dict of key
 * @return any 返回对应字典值
 */
export function getDictValueByMap(source, value) {
	if (source && value !== null && value !== undefined) {
		return source[value] || EMPTY_PLACEHOLDER;
	}

	if (value === null || value === undefined) return EMPTY_PLACEHOLDER;

	return value;
}

export const EMPTY_PLACEHOLDER = '--'; // 默认占位符

/**
 * 获取字典值
 * @param {str} type 字典itemType
 * @param {object} dict 字典集合 {itemType:{}}
 * @param {str} 当前数据的字典值
 * @param {str} 空数据占位符默认为EMPTY_PLACEHOLDER
 * @returns
 */
export function getDictValue(type, value, dict, empty = EMPTY_PLACEHOLDER) {
	if (value === null || value === undefined || value === '') {
		return empty;
	}
	if (dict[type]) {
		return dict[type][value] || empty;
	}
	return value;
}

// 处理 tagsView 高亮（多标签详情时使用，单标签详情未使用）
const setTagsViewHighlight = (v) => {
	let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params;
	if (!params || Object.keys(params).length <= 0) return v.path;
	let path = '';
	for (let i in params) {
		path += params[i];
	}
	// 判断是否是动态路由（xxx/:id/:name"）
	return `${v.meta.isDynamic ? v.meta.isDynamicPath : v.path}-${path}`;
};

/**
 * 关闭当前tab页
 */
export function closeCurrentTab(route, proxy) {
	const r = { ...route };
	r.path = route.meta.isDynamic ? route.meta.isDynamicPath : route.path;
	r.url = setTagsViewHighlight(route);
	proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...r }));
}

/**
 * 金额转换 保留2位小数 并每隔3位用逗号分开 1,234.56
 * @param {*} val
 * @returns
 */
export function formatMoney(val) {
	if (val === null || val === undefined || val === '') {
		return EMPTY_PLACEHOLDER;
	}
	let str = (val / 1).toFixed(2) + '';
	let intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
	let dot = str.substring(str.length, str.indexOf('.')); //取到小数部分搜索
	let ret = intSum + dot;
	if (ret.endsWith('.00')) {
		ret = ret.substr(0, ret.length - 3);
	}
	return ret;
}

/**
 * 获取随机字符串
 * @param {位数} e
 */
export function randomString(e) {
	e = e || 32;
	var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
		a = t.length,
		n = '';
	for (let i = 0; i < e; i++) {
		n += t.charAt(Math.floor(Math.random() * a));
	}
	return n;
}

/**
 * 输入框防抖输入，默认延迟600毫秒执行
 * 
 */
export function debounce_Input(fn, wait) {
	let timeout = null;
	wait = wait || 600;
	return function () {
		let that = this;
		if(timeout !== null)   clearTimeout(timeout);  
		timeout = setTimeout(() => {
			fn.apply(that);
		}, wait);
	}    
}

