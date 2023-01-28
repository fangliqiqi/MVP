<template>
	<div class="batch-import-dialog">
		<el-dialog :title="title" v-model="state.isShowDialog" :width="props.width" @close="closeDialog" :close-on-click-modal="false">
			<template v-if="state.state === 0 || state.state === 1">
				<el-form
					v-loading="!props.customProcess && state.state === 1"
					ref="formRef"
					:model="state.ruleForm"
					:rules="rules"
					size="default"
					style="padding-bottom: 40px"
					:label-width="props.labelWidth"
				>
					<el-row :style="{ marginTop: headerParams ? '0px' : '40px' }">
						<template v-if="headerParams">
							<el-col v-for="(item, index) in headerParams" :key="`header_${index}`" :span="item.span || state.span">
								<el-form-item :label="item.title" :prop="item.dataIndex" v-if="item.dataIndex">
									<template v-if="item.custom">
										<slot :name="item.custom" v-bind="item"></slot>
									</template>

									<template v-else-if="item.type && item.type === 'page-select'">
										<page-select
											ref="pageSelectRef"
											v-model="state.ruleForm[item.dataIndex]"
											:request="item.config.request"
											:value-key="item.config.valueKey"
											:title="item.config.title"
											:search="item.config.search"
											:placeholder="item.config.placeholder"
											@change="item.config.onChange"
										/>
									</template>

									<template v-else-if="item.type === 'date' || item.type === 'month'">
										<el-date-picker
											v-model="state.ruleForm[item.dataIndex]"
											:type="item.type"
											:placeholder="item.config.placeholder"
											:disabled-date="item.config.disabledDate || null"
											:format="item.config.format"
											:value-format="item.config.valueFormat"
											:clearable="item.config.clearable || true"
										/>
									</template>

									<!-- 单选框 value是默认选中值 -->
									<template v-else-if="item.type == 'radio'">
										<el-radio-group v-model="state.ruleForm[item.dataIndex]" @change="item.config.onChange">
											<el-radio :label="key" v-for="(r, key) in item.radioData" :key="key">{{ r }}</el-radio>
										</el-radio-group>
									</template>
									
									<!-- 下拉框  -->
									<template v-else-if="item.type == 'select'">
										<el-select
											v-model="state.ruleForm[item.dataIndex]"
											:placeholder="`请选择${item.title}`"
											:disabled="item.disabled || false"
											filterable
											clearable
											style="width: 100%"
											@change="item.config.onChange"
										>
											<el-option
												v-for="(s, key) in item.selectData"
												:key="key"
												:label="s[item.config.label] || s"
												:value="s[item.config.value] || key"
											>
											</el-option>
										</el-select>
									</template>

									<template v-else>
										<el-input v-model="state.ruleForm[item.dataIndex]" clearable />
									</template>
								</el-form-item>
							</el-col>
						</template>

						<el-col :span="24">
							<el-form-item label="文件" prop="file">
								<el-upload
									class="upload-demo"
									drag
									:auto-upload="false"
									accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
									:show-file-list="false"
									:on-change="onChange"
									:disabled="props.beforeFlag"
									v-loading="props.beforeFlag"
								>
									<template v-if="state.ruleForm.file" >

										<el-icon style="vertical-align: text-top">
											<Document />
										</el-icon>
										<span style="margin-left: 3px">{{ state.ruleForm.file.name }} </span>
									</template>

									<template v-else>
										<div style="padding: 10px 0">
											<el-icon class="el-icon--upload">
												<upload-filled />
											</el-icon>
											<div class="el-upload__text">拖拽或<em>点击上传</em></div>
										</div>
									</template>

									<template #tip>
										<div class="el-upload__tip">请按“{{ title }}”模板要求填写</div>
									</template>
								</el-upload>
							</el-form-item>
						</el-col>

						<!-- 项目档案的 -->
						<template v-if="props.demobilize">
							<el-col>
								<el-form-item label="复档复项" prop="demobilize">
									<el-select v-model="state.ruleForm.demobilize" placeholder="请选择" clearable style="width: 100%">
										<el-option label="是" :value="1"></el-option>
										<el-option label="否" :value="0"></el-option>
									</el-select>
								</el-form-item>
								<div style="margin-left: 110px">
									<span style="vertical-align: text-bottom; font-size: 12px; color: #aeaeae">
										导入的人员为原减档、减项人员时，“复档复项”控制是否对人员和项目进行恢复
									</span>
								</div>
							</el-col>
						</template>

						<!-- 薪酬人员查询信息 -->
						<template v-if="props.salaryFlag">
							<el-col :span="24">
								<el-form-item label="" prop="salaryFlag">
									<el-checkbox v-model="state.ruleForm.salaryFlag" label="1">系统已有的人员默认更新</el-checkbox>
								</el-form-item>
							</el-col>
						</template>


						<template v-if="footerParams">
							<el-col v-for="item in footerParams" :key="`header_${item.dataIndex}`">
								<el-form-item :label="item.title" :prop="item.dataIndex">
									<template v-if="item.custom">
										<slot :name="item.custom" v-bind="{...item}"></slot>
									</template>
									<template v-else>
										<el-input v-model="state.ruleForm[item.dataIndex]" clearable />
									</template>
								</el-form-item>
							</el-col>
						</template>
					</el-row>

					<div class="custom-loading-bar" v-if="props.customProcess && state.state === 1">
						<!--自定义加载-->
						<slot name="loading"></slot>
					</div>
				</el-form>
			</template>

			<div v-else-if="state.state === 2" style="text-align: center">
				<slot name="error">
					<div>
						<div style="font-size: 24px; text-align: center; margin: 10px 0 25px">导入反馈</div>
						<!--反馈信息-->
						<span>操作完成！<br />已为您提供反馈结果</span>
					</div>
				</slot>
				<p style="color: var(--el-color-primary); margin-top: 15px; cursor: pointer">
					<a  @click="downErrorExcel"> {{ errorName + '.xlsx' }}</a>
				</p>
			</div>
			<slot v-bind:state="state.state"></slot>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading"  size="default" :disabled="state.state === 1 || props.cardCheck">确 定 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="batchImportDialog">
import { uploadFile } from '/@/api/system';
import { Document, UploadFilled } from '@element-plus/icons-vue';
import { exportExcel, validImportSheet, readExcel } from '/@/utils/xlsx';
import{ formatExcelDate } from '/@/utils/formatTime';
import {exportExcelSheet} from '/@/utils/excel';
import { checkIdCard } from '/@/api/check.js';
import PageSelect from '/@/components/PageSelect/index.vue';
import { ERROR_HEADER } from '/@/utils/header';
import { ElMessage } from 'element-plus';
import moment from 'moment';

const props = defineProps({
	title: {
		type: String,
		default: '批量导入',
	},
	// 导入反馈表名称
	errName: {
		type: String,
		default: '',
	},
	// 是否自动下载
	download: {
		type: Boolean,
		default: false,
	},
	width: {
		// 弹窗宽度
		type: String,
		default: '600px',
	},
	labelWidth: {
		type: String,
		default: '110px',
	},
	valid: Function, // 用于校验上传文件回调, 返回数据要求 {code:200,msg:'',data:{}}
	demobilize: Boolean, // 是否展示复档复项
	demobilizeParamsName: String, // 是否复员参数名
	url: String, // 批量操作文件上传地址
	header: [Array, Object], // 批量导入的头部，默认精确匹配，
	type: Number, // 匹配方式：0表头包含匹配校验，1表头精确匹配 2 不校验
	batchName: String, // 批量操作名称
	errorHeader: Array,
	errorData: Function,
	customError: {
		// 自定义错误类型
		type: Boolean,
		default: false,
	},
	limitZipSize: {
		// 限制上传文件大小
		type: Number,
		default: 5,
	},
	upload: Function, // 自定义批量导入方法，校验通过后调用
	rules: Object, // 校验规则
	extParams: Array, // 扩展属性,默认只支持input输入框，其他方式自己定制或者通过slot设置
	// customErrorContent: Boolean, // 是否是自定义错误显示，文件点击下载之前的文案
	dateFormatKeys: Object,
	ext: Object, // 额外上传删除，query
	customProcess: Boolean, // 自定义加载
	cardCheck: Boolean, // 身份证校验
	beforeFlag: Boolean, // 是否在上传前校验,校验结果出来之前不允许上传
	fileStream: Boolean, // 是否是后端返回的文件流直接下载（例如：年终奖测算）
	salaryFlag: Boolean, // 是否是薪酬人员查询导入
});

const beforeUpload = (file) => {
	let size10M = file.size / 1024 / 1024 < props.limitZipSize;
	if (!size10M) {
		return false;
	}
	return true;
};

const state = reactive({
	isShowDialog: false,
	loading: false,
	// limitZipSize: 5, //  限制批量导入最大文件大小，单位m,默认单个文件不可超出5m
	ruleForm: {
		// file: null, // 文件
		// demobilize: null,
	},
	state: 0, // 0:待提交状态,1:校验状态，2：返回成功(code==200,data中有数据)  3：..还有特殊需求导入
	error: null, // 错误信息
	rules: {
		file: [{ required: true, message: '请上传文件', trigger: 'blur' }],
		demobilize: [{ required: true, message: '请选择是否复档复项', trigger: 'blur' }],
	},
	span: 24,
});

const formRef = ref(null);
const pageSelectRef = ref(null);

const rules = computed(() => {
	if (props.rules) {
		return Object.assign({}, state.rules, props.rules);
	}
	return state.rules;
});

const headerParams = computed(() => {
	if (props.extParams) {
		props.extParams.map((item) => {
			state.ruleForm[item.dataIndex] = item.value || item.defalutValue || '';
		});
		return props.extParams.filter((item) => item.position === 'header');
	}
	return null;
});

const footerParams = computed(() => {
	if (props.extParams) {
		return props.extParams.filter((item) => item.position === 'footer');
	}
	return null;
});

const check = async (values) => {
	const file = values.file.raw;
	const isLimitSize = beforeUpload(values.file);
	if (!isLimitSize) {
		return {
			code: 1,
			msg: `上传文件大小不能超过 ${props.limitZipSize}MB!`,
		};
	}
	// console.log('[ props.header] >',props.header)
	const data = await validImportSheet(file, props.header, props.type ?? 0);
	// console.log(`output->data`,data)
	if (data && data.code && data.code == 1) {
		return {
			code: 1,
			msg: `表格数据为空，请检查表格数据是否正确`,
		};
	} else if (data) {
		const split = ['', '/', '-', '.'];
		const date = [
			['MMM', 'YYYY'],
			['YYYY', 'MM'],
			['YYYY', 'MM', 'DD'],
			['YYYY', 'M', 'D'],
			['M', 'D', 'YY'],
		];
		const defaultMoment = ['YYYY年MM月', 'YYYY年MM月DD日', 'YYYY年M月', 'YYYY年M月D日'];
		const momentFormat = date.map((item) => split.map((s) => item.join(s))).reduce((arr, i) => arr.concat(i), defaultMoment);
		(data || []).forEach((item) => {
			Object.keys(item).forEach((key) => {
				if (typeof item[key] === 'string') {
					item[key] = item[key].trim();
				}
				const format = props.dateFormatKeys && props.dateFormatKeys[key];
				if (format && item[key] && item[key].length > 5) {
					const m = moment(item[key], momentFormat, true);
					if (m.invalidAt() === -1) {

						const formatTime = m.format(format || 'YYYY-MM-DD');
						if (formatTime !== 'Invalid date') {
							item[key] = formatTime;
						}
					}
				}
			});
		});
		return { code: 200, data: data };
	} else {
		return {
			code: 1,
			msg: `表头信息同模板不一致，请核实后重新上传`,
		};
	}
};

const emits = defineEmits(['ok', 'changeStatus', 'changeFile']);

const uploadValid = async () => {
	try {
		let validRes = null;
		// console.log('[ state.ruleForm]>', state.ruleForm);
		if (props.valid) {
			// 存在自定义校验
			validRes = await props.valid(state.ruleForm);
		} else {
			validRes = await check(state.ruleForm);
		}

		const params = {};
		if (props.demobilizeParamsName) {
			params[props.demobilizeParamsName] = state.ruleForm.demobilize;
		}

		if (validRes && validRes.code === 200) {
			emits('changeStatus', { state: 'uploading' });
			// 校验成功
			if (props.upload && typeof props.upload === 'function') {
				// 自定义方法
				const res = await props.upload(state.ruleForm, validRes.data);
				if (res && res.code == 200 && res.data && res.data.length) {
					emits('changeStatus', { state: 'error' });
					state.state = 2;
					state.error = res.data;
					emits('ok');
					props.download && downErrorExcel();
				} else if (res && res.data && res.data.length) {
					emits('changeStatus', { state: 'error' });
					// 批量导入失败，需要提供下载错误excel入口
					emits('ok');
					state.state = 2;
					state.error = res.data;
					props.download && downErrorExcel();
				} else if (res && res.code == 200) {
					emits('changeStatus', { state: 'success' });
					emits('ok');
					ElMessage.success('批量操作成功');
					closeDialog();
				} else {
					emits('ok');
					ElMessage.error((res && res.msg) || '批量操作失败');
					closeDialog();
				}

				return;
			}

			// 默认导入方式，上传文件
			const formData = new FormData();
			formData.append('file', state.ruleForm.file.raw);
		
			if (props.demobilize) {
				formData.append('isCanAdd', state.ruleForm.demobilize);
			}

			// 默认方式 但是有参数
			if (headerParams.value && headerParams.value.length > 0) {
				headerParams.value.map((item) => {
					params[item.dataIndex] = state.ruleForm[item.dataIndex];
				});
			}

			const contextType = { 'Content-Type': 'multipart/form-data' };

			const result = await uploadFile(props.url, formData, Object.assign({}, params, props.ext || {}), contextType);
			// console.log(result);
			if (result && result.code == 200 && result.data && result.data.length) {
				emits('changeStatus', { state: 'error' });
				state.state = 2;
				state.error = result.data;
				emits('ok');
				props.download && downErrorExcel();
			} else if (result && result.data && result.data.length) {
				// 批量导入失败，需要提供下载错误excel入口
				emits('ok');
				emits('changeStatus', { state: 'error' });
				state.state = 2;
				state.error = result.data;
				props.download && downErrorExcel();
			} else if (result && result.code == 200) {
				emits('changeStatus', { state: 'success' });
				emits('ok');
				ElMessage.success('批量操作成功');
				closeDialog();
			} else {
				emits('ok');
				ElMessage.error(result.msg || '批量操作失败');
				closeDialog();
			}
		} else if (validRes && validRes.code === 1) {
			emits('changeStatus', { state: 'error' });
			ElMessage.error(validRes.msg || '批量操作失败');
			closeDialog();
		}
	} catch (e) {
		emits('changeStatus', { state: 'error' });
		console.log('get exception:', e);
		ElMessage.error('批量操作失败');
		closeDialog();
	}
};

const onSubmit = () => {
	if (state.state === 0) {
		// 待提交可提交
		if (formRef.value)
			formRef.value.validate((valid) => {
				if (valid) {
					// 表单校验通过
					state.state = 1;
					setTimeout(() => {
						uploadValid();
					}, 2000);
				}
			});
	} else if (state.state === 2) {
		// 错误状态，直接关闭
		closeDialog();
	}
};

const errorName = computed(() => {
	if (props.errName) {
		return props.errName + '结果反馈';
	}
	if (state.ruleForm.file) {
		const name = state.ruleForm.file.name;
		const lastIndex = String(name).lastIndexOf('.');
		return name.substring(0, lastIndex) + '结果反馈';
	}
	return '结果反馈';
});

const setRuleform = (data) => {
	state.ruleForm = data;
};

const onChange = async (file) => {
	let name = file.name;
	if (!/\.(xlsx|xls|XLSX|XLS)$/.test(name)) {
		ElMessage.error('上传文件必须为excel文件，且为xlsx,xls格式');
		state.ruleForm.file = null;
		return false;
	}

	state.ruleForm.file = file;
	nextTick(() => {
		formRef?.value?.validateField('file');
	});

	emits('changeFile', file);
};

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		formRef.value.resetFields();
	}, 50);
	state.isShowDialog = false;
	state.state = 0; // 0:待提交状态,1:校验状态，2：返回成功(code==200,data中有数据)  3：..还有特殊需求导入
	state.error = null; // 错误信息
	state.ruleForm = {};
	if (props.extParams) {
		props.extParams.map((item) => {
			item.value = '';
		});
	}
};

/**
 * 下载错误excel
 */
const downErrorExcel = () => {
	try {
		let header = ERROR_HEADER; // 默认批量导入表头
		let data = null; // 默认批量导入数据
		if (props.customError) {
			// 自定义错误信息
			header = props.errorHeader;
			if (props.errorData) {
				data = props.errorData(props.batchName, state.error); // 通过返回数据处理格式
			} else {
				data = state.error; // 错误数据原样导出
			}
		} else {
			// 默认的
			data = state.error.map((item) => {
				return {
					line: item.lineNum,
					error: item.message,
				};
			});
		}
		exportExcelSheet(header, data, errorName.value);
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('结果反馈文件下载失败');
	}
};

const onCancel = () => {
	closeDialog();
};

// 打开弹窗
const openDialog = async (data) => {
	state.ruleForm = {
		demobilize: props.demobilize ? 1 : '',
		salaryFlag: props.salaryFlag
	};
	
	state.state = 0;
	state.error = null;
	state.isShowDialog = true;
	if (pageSelectRef.value) {
		pageSelectRef.value.map((item) => {
			try {
				item.refresh();
			} catch (e) {
				// console.log('get exception:', e);
			}
		});
	}
};

const openErrorDialog = async (data) => {
	state.state = 2;
	state.error = data;
	state.ruleForm.file = {
		name: '批量删除',
	};
	state.isShowDialog = true;
	props.download && downErrorExcel();
};

const form = ref(state.ruleForm);

// 暴露变量
defineExpose({
	openDialog,
	openErrorDialog,
	closeDialog,
	setRuleform,
});
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
