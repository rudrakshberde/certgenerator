import JSZip from "jszip";
import { saveAs } from "file-saver";
import generatePDF from "./generatePDF";
const downloadFiles = async (e, values,longest, x_cod, y_cod, fntsize, r, g, b,respon) => {
    e.preventDefault();
  
    var zip = new JSZip();
    var img = zip.folder("certificates");
  
    for (let i = 0; i < values.length; i++) {
      var result=await generatePDF(values[i][0],longest, x_cod, y_cod, fntsize, r, g, b,respon);
  
      img.file(values[i][0] + ".pdf", result.pdfBytes);
    }
  
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "certificates.zip");
    });
  }
  export default downloadFiles