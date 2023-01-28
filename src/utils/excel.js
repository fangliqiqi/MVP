import * as ExcelJs from 'exceljs';
import {saveAs} from "file-saver";

/**
 * 前端excel导出(单个sheet) 包含多级表头(二级表头)  合并单元格  表格样式
 * @param header 导出头 有children的是二级表头  header是个数组：[header key width children]
 * @param data 导出的数据 有row col 就是合并
 * @param fileName 导出的文件名
 * @param isMerge 是否合并单元格
 * @param styleObj 样式对象 自定义列 行 以及单元格样式
 * @returns {Promise<void>}
 */

export const exportExcelSheet = (header,data,fileName,isMerge=false,styleObj)=>{
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet('sheet1');
  // 设置 sheet 的默认行高
  worksheet.properties.defaultRowHeight = 20;
  // 设置 sheet 的默认列宽
  worksheet.properties.defaultColWidth = 20;
  // 设置表头
  worksheet.columns = header;
  // console.log(`header`,header)
  // 是否是多级表头
  const isMultiHeader = header.some(item => item.children && item.children.length > 0);
  if (isMultiHeader) {
    excelHeaderTwo(header,worksheet)
  }
  // console.log(data)
  // 设置数据  这里很重要一定要放在表头设置后
  const rows =  worksheet.addRows(data);

  // 设置默认样式这个顺序也是的 一定要在数据后 不然数据样式不生效
  defaultStyle(worksheet)
  
  // 如果styleObj 是对象 且不为空  则调用自定义的样式 rows行 cols列 cels单元  arr:数组 style:样式
  if(styleObj && typeof styleObj === 'object'){
    const {rows,cols,cels,} = styleObj
    addCellStyle(worksheet,rows,cols,cels)
  }

  // 设置表头样式
  headerStyle(worksheet,isMultiHeader)
  

   // 是否合并单元格
  if(isMerge){
    mergeExcel(worksheet,data)
  }

  // 下载文件
  saveFile(workbook,fileName)
}

// 下载文件
export const saveFile = (workbook,fileName)=>{
  workbook.xlsx.writeBuffer().then(data => {
    saveAs(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), fileName);
  }).catch(err => {
    console.log(`导出失败->err`,err)
  })
}

 /**
  * 多级表头导出 -- 目前暂定的是2级表头 所以就是第一行 第二行的操作
  * @param headers 导出头 有children的是二级表头
  * @param worksheet 工作表
  * @returns {Promise<void>}
  */
export const excelHeaderTwo = (headers,worksheet)=>{
  let header1 = [] // 第一行表头
  let header2 = []  // 第二行表头
  let mergeArr = [] // 合并单元格
  headers.map((item,index)=>{
    if(item.children){
      mergeArr.push({
        index:index+1,
        len:item.children.length
      })
      item.children.map((child,i)=>{
        header1.push({
          header: item.header,
          key: child.key,
          width: child.width,
          len:item.children.length,
        })
        header2.push(child.header)
      })
    }else{
      header1.push(item)
      header2.push(item.header)
    }
  })
  // 表头数据
  worksheet.columns = header1;
  // 添加第二行
  worksheet.addRow(header2);
  // 第一行 左右合并单元格
  mergeArr.forEach((item,index)=>{
    if(index==0){
      worksheet.mergeCells(1,item.index,1,item.len+item.index-1)
    }else{
      worksheet.mergeCells(1,item.index+mergeArr[index-1].len-1,1,item.index+mergeArr[index-1].len-1+item.len-1)
    }
  })
  // 表头第二行上下合并
  header1.forEach((item,index)=>{
    if(!item.len){
      worksheet.mergeCells(1,index+1,2,index+1)
    }
  })
}


/**
 *默认样式
  * @param worksheet 工作表
 */
export const defaultStyle = (worksheet)=>{
  worksheet.eachRow((rows,num)=>{
    // 单元格添加边框
    rows.eachCell({ includeEmpty: true},cell => {
      cell.style = {
        border:{
          top: { style: 'thin' }, // 上边框
          bottom: { style: 'thin' }, // 下边框
          left: { style: 'thin' }, // 左边框
          right: { style: 'thin' }, // 右边框
        },
      }
    })
    // 每一行添加基本样式  //wrapText:true 自动换行
    rows.alignment = { vertical: 'middle', horizontal: 'center' ,indent:1};
    rows.font = { name: '宋体', size: 10 };
  })
}

/**
 * 表头样式
 * @param worksheet 工作表
 * @param isMultiHeader 是否多级表头
 */
export const headerStyle = (worksheet,isMultiHeader)=>{
  if(isMultiHeader){
    // 获取表头
    const header = worksheet.getRow(1);
    const header2 = worksheet.getRow(2);
    // 设置表头样式
    header.eachCell((cell, colNumber) => {
      cell.font = {name: '宋体', size: 11, bold: true};
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.fill = {type: 'pattern', pattern:'solid',fgColor:{argb:'FFD9D9D9'}}
    })
    header2.eachCell((cell, colNumber) => {
      cell.font = {name: '宋体', size: 11, bold: true};
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.fill = {type: 'pattern', pattern:'solid',fgColor:{argb:'FFD9D9D9'}}
    })

  }else{
    // 获取表头
    const header = worksheet.getRow(1);
    // 设置表头样式
    header.eachCell((cell, colNumber) => {
      cell.font = {name: '宋体', size: 11, bold: true};
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.fill = {type: 'pattern', pattern:'solid',fgColor:{argb:'FFD9D9D9'}}
    })
  }
}


/**
 * 给表格的第几行或者第几列 添加样式 默认添加边框和文字居中等
 * @param worksheet 工作表
 * \@param rows 指定行的样式   arr:指定行的数组  style:样式
 * @param cols 指定列的样式  arr:指定列的数组  style:样式
 * @param cels 指定单元格的样式 arr:指定单元格的数组  style:样式
 * 例如：rows:{arr:[2],style:{font: {name: '宋体',size: 12,bold: true,color: { argb: '0xFF00FF' },},}},
 * 
 */
 export const addCellStyle = (worksheet,rows,cols,cels)=>{
  // 指定行的样式
  if(rows){
    rows['arr'].map(r=>{
      worksheet.getRow(r).font= rows['style'].font;
      worksheet.getRow(r).alignment= rows['style'].alignment||{vertical: 'middle',horizontal: 'center'};
      worksheet.getRow(r).fill= rows['style'].fill;
    })
  }
  // 指定列的样式
  if(cols){
    cols['arr'].map(c=>{
      worksheet.getColumn(c).font= cols['style'].font;
      worksheet.getColumn(c).alignment= cols['style'].alignment||{vertical: 'middle',horizontal: 'center'};
      worksheet.getColumn(c).fill= cols['style'].fill;
    })
  }
  // 指定单元格的样式
  if(cels){
    cels['arr'].map(c=>{
      worksheet.getCell(c).font= cels['style'].font;
      worksheet.getCell(c).alignment= cels['style'].alignment||{vertical: 'middle',horizontal: 'center'};
      worksheet.getCell(c).fill= cels['style'].fill;
    })
  }
}


/**
 * 合并单元格
 * @param {*} worksheet 工作表
 * @param {*} data 表单数据  参数 row []合并行（开始行，结束行） col [开始列，结束列]合并列
 * 
 * 注意：如果报错很有可能是合并的单元格重复合并问题，注意检查
 */
export const mergeExcel = (worksheet,data)=>{
  data.map((item,index)=>{
    if(item.row&&!item.col){
      // 如果只有row 那就是只合并行 开始列的话就是从1到表头的长度结束
      worksheet.mergeCells(item.row[0],1,item.row[1],worksheet.columnCount);
    }else if(!item.row&&item.col){
      // 如果只有col 那就是只合并列 开始行的话就是从表头下面到数据的长度结束
      worksheet.mergeCells(worksheet.rowCount-data.length+1,item.col[0],worksheet.rowCount,item.col[1]);
    }else if(item.row&&item.col){
      // 如果都有 那就是合并行和列
      worksheet.mergeCells(item.row[0],item.col[0],item.row[1],item.col[1]);
    }
  })
}


/**
 * 多sheet页的excel的简单导出
 * @param {*} headers 表头  二维数组
 * @param {*} datas 数据    二维数组
 * @param {*} sheetNames sheet页的名称  一维数组
 * @param {*} fileName 文件名 string
 * 
*/
export const exportMoreSheet = (headers,datas,sheetNames,fileName)=>{
  // 创建workbook
  const workbook = new ExcelJs.Workbook();
  // 创建sheet页 多个sheet页
  headers.map((item,index)=>{
    // 创建sheet页
    const worksheet = workbook.addWorksheet(sheetNames[index]||'sheet'+index);
    // 设置 sheet 的默认行高
    worksheet.properties.defaultRowHeight = 20;
    // 设置 sheet 的默认列宽
    worksheet.properties.defaultColWidth = 20;

    // 设置表头
    worksheet.columns = item;

    // 设置表格数据
    worksheet.addRows(datas[index]);

    // 设置默认样式这个顺序也是的 一定要在数据后 不然数据样式不生效
    defaultStyle(worksheet)

    // 设置表头样式
    headerStyle(worksheet)
  })
  // 下载文件
  saveFile(workbook,fileName)
}