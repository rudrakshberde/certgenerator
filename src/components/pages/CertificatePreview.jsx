import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { FileContext } from "../../contexts/FileContexts";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; // Uncomment if you want PDF export
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;
const CertificatePreview =()=>{
  const {certBase64} = useContext(FileContext);
  const [pdfImage, setPdfImage] = useState(null);
useEffect(() => {


    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        setPdfImage(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("Error rendering PDF:", err);
        alert("Failed to render PDF. Check console for details.");
      }
    };
    if(certBase64){
      reader.readAsArrayBuffer(certBase64);
    }

    

  
}, []);

  
    return(
        <div className="container">
          <section id="editspace">
            <h5>Preview</h5>
            <div className="edit-options">
             
            </div>
                {pdfImage && (
                  <div>
        <div
          className="relative border shadow-lg"
          style={{
            backgroundImage: `url(${pdfImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "800px",
            height: "600px", // ensure preview is visible
          }}
        ></div>
        <Draggable>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "black",
                cursor: "move",
                position: "absolute",
                top: "50px",
                left: "50px",
              }}
            >
              {"example text"}
            </div>
          </Draggable>
          </div>
          )}
         <div className="download-button">
                <button  className="btn btn-warning btn-lg">
                  download
                </button>
              </div>
          </section>
          
        </div>
    );

}

export default CertificatePreview;
