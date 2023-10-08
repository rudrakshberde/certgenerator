import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
const generatePDF = async (name, longest,xcod, ycod, fntsize, r, g, b,respon) => {
    console.log(respon);
    var pdfDoc, pdfBytes;
    var longestname = longest;
    const exBytes = respon;
    pdfDoc = await PDFDocument.load(exBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
  
    const textWidth = name.length;
    const textwidthMax = longestname.length;
    if (textWidth < textwidthMax) {
      for (let i = 0; i < Math.abs((textwidthMax - textWidth) / 2); i++) {
        name = " " + name + " ";
      }
    }
    const { width, height } = firstPage.getSize();
  
    firstPage.drawText(name, {
      x: xcod,
      y: ycod,
      size: fntsize,
  
      color: rgb(r, g, b),
    });
  
    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
   
    pdfBytes = await pdfDoc.save();
     var  obj={
        pdfBytes:pdfBytes,
        uri:uri
    }
    return obj
  }
  export default generatePDF