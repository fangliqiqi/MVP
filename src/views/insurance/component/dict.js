// 投保类型
export const buyType = { 1: '新增', 3: '批增', 4: '替换' };

//派单类型
export const buyTypeDown = { 1: '减员' };

// 费用类型
export const premiumType = { 0: '预估', 1: '实缴' };

// 结算类型
export const settleType = { 0: '与薪资结算', 1: '单独结算' };

// 投保办理状态
export const buyHandleStatus = { 1: '待投保', 2: '投保中', 3: '已投保', 4: '投保退回', 5: '已减员' };

// 投保办理投保列表允许的状态
export const buyHandleStatusList = { 1: '待投保', 2: '投保中', 4: '投保退回' };

// 减员状态
export const reduceHandleStatus = { 1: '待减员', 2: '减员中', 3: '减员退回', 4: '减员成功' };

// 结算办理状态
export const settleHandleStatus = { 1: '待结算', 2: '结算中', 3: '已结算' };

// 是否出险
export const isUse = { 0: '未出险', 1: '已出险' };

// 是否有效
export const isEffect = { 0: '有效', 1: '无效' };

// 是否过期
export const isOverdue = { 0: '未过期', 1: '已过期' };

// 计费方式
export const billType = { 0: '按天', 1: '按月' };

// 派单类型
export const distributeType = { 1: '新增', 3: '批增', 4: '替换', 5: '减员' };

export default {
	distributeType,
	buyType,
	premiumType,
	settleType,
	buyHandleStatus,
	reduceHandleStatus,
	settleHandleStatus,
	isUse,
	isEffect,
	isOverdue,
	billType,
};
