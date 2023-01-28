import moment from 'moment';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { idToArea } from '/@/utils/city';
import { ElMessage } from 'element-plus';

/**
 * 社保公积金详情页面数据翻译
 * @param item 单条数据
 * @param dicts 字典
 * @param data 数据
 *
 */
export function translateData(item, data, dicts) {
	if (!item || !data || !dicts) return EMPTY_PLACEHOLDER;

	// 如果有字典，则替换字典
	if (item.dict) {
		const dict = dicts[item.dict];
		if (dict) {
			return dict[data[item.key]] || EMPTY_PLACEHOLDER;
		}
	} else if (item.date) {
		// 如果有时间格式，则替换时间格式
		return data[item.key] ? moment(data[item.key]).format(item.date) : EMPTY_PLACEHOLDER;
	} else if (item.address) {
		// 如果有地址格式，则替换地址格式
		const add = item.address;
		return idToArea({ province: data[add.pro], city: data[add.city], town: data[add.town] });
	} else if (item.key == 'validity') {
		//身份证有效期
		const validityStart = data.validityStart;
		const validityEnd = data.validityEnd;
		if (validityStart && validityEnd) {
			return `${moment(validityStart).format('YYYY-MM-DD')} 至 ${validityEnd=='2999-12-31'?'长期':moment(validityEnd).format('YYYY-MM-DD')}`;
		} else {
			return EMPTY_PLACEHOLDER;
		}
	} else if (item.default) {
		// 设置固定值
		return item.default;
	} else if (item.formatter) {
		// 如果有函数格式,则替换函数格式
		return item.formatter(data);
	} else if (item.dictValue) {
		// 如果自带简单的翻译字段
		return item.dictValue[data[item.key]] || EMPTY_PLACEHOLDER;
	} else {
		return data[item.key] || EMPTY_PLACEHOLDER;
	}
}
