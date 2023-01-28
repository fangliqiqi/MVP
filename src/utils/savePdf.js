
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const savePdf=(el, filename)=>{
  html2Canvas(el,{scale: 2,}).then(canvas=>{  
    const pdf = new JsPDF('p', 'mm', 'a4') // A4纸，纵向
    pdf.setFont("SimSun");
    const ctx = canvas.getContext('2d')
    const a4w = 190; const a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
    const imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
    let renderedHeight = 0
    while (renderedHeight < canvas.height) {
      let page = document.createElement('canvas')
      page.width = canvas.width
      page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页
      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
      pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
      renderedHeight += imgHeight
      if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
    }
    pdf.save(`${filename}.pdf`)

  })
  
}
  
export const printFn=()=>{
    let iframe = document.getElementById('printIframe')
    if (!iframe) {
        const el = document.getElementById('pdfDom')
        iframe = document.createElement('IFRAME')
        let doc = null
        iframe.setAttribute('id', 'printIframe')
        iframe.setAttribute('style', 'position: absolute; width: 0px; height: 0px; left: -200px; top: -200px;')
        document.body.appendChild(iframe)
        doc = iframe.contentWindow.document
        doc.write('<link rel="stylesheet" type="text/css" href="../../assets/pdf.css">')
        doc.write('<div>' + el.innerHTML + '</div>')
        doc.close()
        iframe.contentWindow.focus()
    }

    iframe.onload = function () {
        iframe.contentWindow.print()
    }
    if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.removeChild(iframe)
    }

} 