import * as XLSX from 'xlsx';

/**
 * 生成ASCll值 从A开始
 * @param {*} n
 */
function getCharCol(n) {
	let s = '';
	let m = 0;
	while (n > 0) {
		m = (n % 26) + 1;
		s = String.fromCharCode(m + 64) + s;
		n = (n - m) / 26;
	}
	return s;
}

/**
 * 多sheet导出
 *
 * @param { array }  options       多表配置，参考  @exportExcel
 * @param { array }  headers       表头，二维数组 [[{ title: '职位名称', dataIndex: 'name', width: 140 }],[{ title: '职位名称', dataIndex: 'name', width: 140 }]]
 * @param { array }  datasource    数据源 [[{name:'amiko',age:30,like:'发呆'}],[{name:'amiko',age:30,like:'发呆'}]]
 * @param { array }  sheetsName    表单的名称数组 ['sheet1','sheet2']
 *
 */
function exportMutltiSheet(headers, datasource, sheetsName, params) {
	const { type, fileName = '未命名' } = params;
	const _cloWidth = []; // 行宽(二维数组)
	const _output = []; //数据源
	const _outputPos = []; //渲染参数(二维数组)
	headers.forEach((e, _index) => {
		const cloWidth = [];
		e.forEach((item) => {
			cloWidth.push({ wpx: item.width || 60 });
		});

		// 处理表头
		const _headers = e
			.map((item, i) =>
				Object.assign(
					{},
					{
						key: item.dataIndex,
						title: item.title,
						position: (i > 25 ? getCharCol(i) : String.fromCharCode(65 + i)) + 1,
					}
				)
			)
			.reduce(
				(prev, next) =>
					Object.assign({}, prev, {
						[next.position]: { v: next.title, key: next.key },
					}),
				{}
			);
		let _data = {};
		datasource[_index].forEach((item, i) => {
			e.forEach((obj, index) => {
				const key = (index > 25 ? getCharCol(index) : String.fromCharCode(65 + index)) + (i + 2);
				const key_t = obj.dataIndex;
				_data[key] = {
					v: item[key_t] ?? '',
					s: {
						alignment: { vertical: 'center', horizontal: 'left', wrapText: true },
					},
				};
			});
		});

		const output = Object.assign({}, _headers, _data);
		const outputPos = Object.keys(output); // 设置表格渲染区域,如从A1到C8

		e.forEach((item, index) => {
			const key = (index > 25 ? getCharCol(index) : String.fromCharCode(65 + index)) + 1;
			output[key].s = {
				// border: borderAll,
				font: { name: '宋体', sz: 11, italic: false, underline: false, bold: true },
				alignment: { vertical: 'center', horizontal: 'left' },
			};
		});
		_output.push(output)
		_outputPos.push(outputPos)
		_cloWidth.push(cloWidth)
	})

	const _res = _output.reduce(

		(prev, next, index) => {
			let obj = {}
			obj[sheetsName[index]] = Object.assign(
				{},
				next, // 导出的内容
				{
					'!ref': `${_outputPos[index][0]}:${_outputPos[index][_outputPos[index].length - 1]}`, // 设置填充区域（表格渲染区域）
					'!cols': [..._cloWidth[index]],
				}
			)
			return Object.assign({}, prev, obj)
		}, {}
	)

	const wb = {
		SheetNames: sheetsName, // 保存的表标题
		Sheets: _res
	}
	/**
 * 以下这种导出方法对于js-xlsx/xlsx-style都适用
 * 区别在于import XLSX from 'xlsx-style';可以设置单元格样式
 * import XLSX from 'xlsx';不支持设置单元格样式
 *
 * new Blob转换成二进制类型的对象
 */
	const tmpDown = new Blob(
		[
			s2ab(
				XLSX.write(
					wb,
					{ bookType: type == undefined ? 'xlsx' : type.bookType, bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
				)
			),
		],
		{
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		}
	);

	// 数据都准备完成，可以开始下载excel了
	downExcel(tmpDown, `${fileName + '.'}${type.bookType == 'biff2' ? 'xls' : type.bookType}`);
};





/**
 * @param { array } headers 表头字段数组 [{ title: '职位名称', dataIndex: 'name', width: 140 },]
 * @param { array  } datasource   [{name:'amiko',age:30,like:'发呆'}]
 * @param { string } type 配置文件类型，默认xlsx
 * @param { string } fileName 导出文件名
 */
function exportExcel(headers, datasource, params) {
	const { type, fileName = '未命名' } = params;
	const rows = []; // 行高无效
	const cloWidth = []; // 行宽
	headers.forEach((item) => {
		rows.push({ hpx: 50 });
		cloWidth.push({ wpx: item.width || 60 });
	});

	// 处理表头
	const _headers = headers
		.map((item, i) =>
			Object.assign(
				{},
				{
					key: item.dataIndex,
					title: item.title,
					position: (i > 25 ? getCharCol(i) : String.fromCharCode(65 + i)) + 1,
				}
			)
		)
		.reduce(
			(prev, next) =>
				Object.assign({}, prev, {
					[next.position]: { v: next.title, key: next.key },
				}),
			{}
		);
	let _data = {};
	datasource.forEach((item, i) => {
		headers.forEach((obj, index) => {
			const key = (index > 25 ? getCharCol(index) : String.fromCharCode(65 + index)) + (i + 2);
			const key_t = obj.dataIndex;
			_data[key] = {
				v: item[key_t] ?? '',
				s: {
					alignment: { vertical: 'center', horizontal: 'left', wrapText: true },
				},
			};
		});
	});

	const output = Object.assign({}, _headers, _data);
	const outputPos = Object.keys(output); // 设置表格渲染区域,如从A1到C8

	headers.forEach((item, index) => {
		const key = (index > 25 ? getCharCol(index) : String.fromCharCode(65 + index)) + 1;
		output[key].s = {
			// border: borderAll,
			font: { name: '宋体', sz: 11, italic: false, underline: false, bold: true },
			alignment: { vertical: 'center', horizontal: 'left' },
		};
	});

	const wb = {
		SheetNames: [fileName], // 保存的表标题
		Sheets: {
			[fileName]: Object.assign(
				{},
				output, // 导出的内容
				{
					'!ref': `${outputPos[0]}:${outputPos[outputPos.length - 1]}`, // 设置填充区域（表格渲染区域）
					'!cols': [...cloWidth],
				}
			),
		},
	};

	/**
	 * 以下这种导出方法对于js-xlsx/xlsx-style都适用
	 * 区别在于import XLSX from 'xlsx-style';可以设置单元格样式
	 * import XLSX from 'xlsx';不支持设置单元格样式
	 *
	 * new Blob转换成二进制类型的对象
	 */
	const tmpDown = new Blob(
		[
			s2ab(
				XLSX.write(
					wb,
					{ bookType: type == undefined ? 'xlsx' : type.bookType, bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
				)
			),
		],
		{
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		}
	);

	// 数据都准备完成，可以开始下载excel了
	downExcel(tmpDown, `${fileName + '.'}${type.bookType == 'biff2' ? 'xls' : type.bookType}`);
}

/**
 * <a>标签下载excel
 * @param { Blob对象:二进制的数据 } obj
 * @param { 文件名+文件类型后缀 } fileName
 */
function downExcel(obj, fileName) {
	const a_node = document.createElement('a');
	a_node.download = fileName;
	// 兼容ie
	if ('msSaveOrOpenBlob' in navigator) {
		window.navigator.msSaveOrOpenBlob(obj, fileName);
	} else {
		// URL.createObjectURL根据传入的参数创建一个指向该参数对象的URL. 这个URL的生命仅存在于它被创建的这个文档里.
		// 新的对象URL指向执行的File对象或者是Blob对象.
		a_node.href = URL.createObjectURL(obj);
	}
	a_node.click();

	// 每次调用createObjectURL的时候,一个新的URL对象就被创建了.即使你已经为同一个文件创建过一个URL.
	// 如果你不再需要这个对象,要释放它,需要使用URL.revokeObjectURL()方法.
	//  当页面被关闭,浏览器会自动释放它,但是为了最佳性能和内存使用,当确保不再用得到它的时候,就应该释放它.
	setTimeout(() => {
		URL.revokeObjectURL(obj);
	}, 100);
}

// 字符串转字符流---转化为二进制的数据流
function s2ab(s) {
	if (typeof ArrayBuffer !== 'undefined') {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
		return buf;
	} else {
		const buf = new Array(s.length);
		for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
		return buf;
	}
}

/**
 * 读取excel文件【单表解析】
 * @param { Object } file 文件对象
 * @returns Promise 返回Promise对象 [过滤获取sheet列表，若不考虑多sheet情况可直接取第一个sheet]
 */
function readExcel(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		let wb = null;
		reader.onload = function (e) {
			try {
				const data = e.target.result;
				wb = XLSX.read(data, { type: 'binary', cellDates: false, dateNF: 'YYYY-MM-DD' });
				// h红色 打印日志
				// console.log('%c wb', 'color: red', wb);
				let target = [];
				wb.SheetNames.forEach((name) => {
					// raw: false 使用w的值而不是v的值 v是原始值 w是格式化后的值 
					//例如日期格式 2020-01-01 00:00:00 会被格式化为 2020-1-1,但是如果你是5位数字的日期格式,会被格式化为2020-01-01
					const json = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '',raw: false},); 
					if (json && json.length) {
						//过滤空sheet
						target.push({
							sheetName: name,
							data: json,
							headers: Object.keys(json[0]).filter((item) => !item.startsWith('__EMPTY')), // 过滤带样式的空头部
						});
					}
				});
				resolve(target);
			} catch (exception) {
				console.log('解析文件异常：', exception);
				reject(exception);
			}
		};
		reader.onerror = function (e) {
			console.log('文件加载失败：', e);
			reject(e);
		};

		reader.readAsBinaryString(file);
	});
}

/**
 * 校验表头是否合法
 * @param {array} sheet  sheet数据
 * @param {array} headers sheet表头数组
 * @param {number} type, 匹配方式：0表头包含匹配校验【sheet表头长度小于等于待校验表头，且需被待校验表头包含】，1表头精确匹配【sheet表头需要和待校验表头一致，顺序不做限制】
 *2 不校验
 * @return boolean 是否校验通过
 */
function validSheetHeader(sheet, validHeader, type = 0, mustHeader) {
	const { headers } = sheet;
	if (type === 0) {
		// 表头包含匹配校验,sheet表头长度小于等于待校验表头，且需被待校验表头包含
		if (headers.length > validHeader.length) {
			// 标头校验不通过，表头超出限制
			return false;
		}

		// 当前表头长度小于必填表头长度
		if (headers.length <= mustHeader.length) {
			return false;
		}
		// console.log('是走到这里了吧' ,mustHeader, headers)
		if (!mustHeader.every((item) => !!headers.find((t) => String(t).trim() === String(item).trim()))) {
			return false;
		}
		// console.log('是走到这里了吧11111')
	} else if (type === 1) {
		if (headers.length !== validHeader.length) {
			return false;
		}
	}

	// console.log('get headers:',headers,validHeader)
	return !headers.some((item) => !validHeader.some((t) => String(t).trim() === String(item).trim()));
}

/**
 * 校验字典值是否合法
 * @param {array} sheet sheet数据
 * @param {key:name,dict:[]} valid  待校验数据
 * @return boolean 字典值是否校验通过
 *
 */
function validSheetValid(sheet, valid) {
	const { data } = sheet;
	const keys = Object.keys(valid);
	return !data.find((item) => {
		return keys.find((key) => {
			const value = item[key];
			const exit = valid[key].indexOf(value) !== -1;
			return !exit;
		});
	});
}

/**
 * 单sheet可用
 * @param {File} file  文件
 * @param {array} header 需要校验的表头
 * @param {number} type type, 匹配方式：0表头包含匹配校验，1表头精确匹配 @validSheetHeader
 * @param {object} dicts 校验填写字段 @validSheetValid
 * @param {object} mustHeader
 */
async function validImportSheet(file, header, type = 0, dicts = null, mustHeader) {
	try {
		const data = await readExcel(file);
		// 检查两个表头不一样的地方
		// const diff = data[0].headers.filter((item) => !Object.values(header).includes(item));
		// console.log('diff:', diff);

		if (!data.length) {
			return {
				code: 1,
				msg: `表格数据为空，请检查表格数据是否正确`,
			};
		}
		// 如果type是2,不校验
		if(type==2){
			return data[0].data
		}
		
		const validDict = dicts ? validSheetValid(data[0], dicts) : true;
		const valid = header ? validSheetHeader(data[0], Object.values(header), type, mustHeader ? Object.values(mustHeader) : []) : true;
		// console.log(validDict,valid);
		if (valid && validDict) {
			// 校验通过
			const map = {};
			Object.keys(header).forEach((key) => {
				map[header[key]] = key;
			});

			return data[0].data.map((item) => {
				const target = {};
				Object.values(header).forEach((t) => {
					const key = map[t];
					const value = item[t];
					if (key) {
						target[key] = value;
					}
				});
				return target;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return false; // 校验不通过
}

export { exportExcel, exportMutltiSheet, readExcel, validSheetHeader, validSheetValid, validImportSheet };
