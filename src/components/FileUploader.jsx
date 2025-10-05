import React from "react";
//import readXlsxFile from "read-excel-file";
import generatePDF from "../utils/generatePDF";
import hexToRgb from "../utils/hexToRgb";
import downloadFiles from "../utils/downloadFiles";
import {readPDFFile,readXlFile} from "../utils/readFilesHelper";
import { FileContext } from "../contexts/FileContexts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const FileUpload= ()=>{
    const mystyle = {
        padding: "10px",
  
        margin: "10px",
        marginLeft: "25%",
      };
      const {SetcertBase64, SetexcelLoad,certBase64} = useContext(FileContext);
      const navigate = useNavigate();
      const handleCertUpload= async(e)=>{
  const cert = await readPDFFile(e);
if(cert!=null){
  console.log(cert);
  SetcertBase64(cert);
}

}
      const handleExcelUpload= async(e)=>{
  const payload = await readXlFile(e);
if(payload!=null){
  SetexcelLoad(payload);
  
}

}

const setisUploadSuccesfull = ()=>{
  if (certBase64) {
      navigate("/preview"); // 👈 Navigate to CertificatePreview
    } else {
      alert("Please upload a certificate template first.");
    }
}
    return(
        <section>
        <h3>CERTIFICATE GENERATOR</h3>

        <div className="form-group" style={mystyle}>
          <div className="form-group col-md-6">
            <label>
              <h5>Upload Certificate Template:</h5>
            </label>

            <input
              type="file"
              name="file"
              className="form-control"
              id="file"
              onChange={handleCertUpload}
            />
          </div>
        </div>
        <div className="form-group" style={mystyle}>
          <div className="form-group col-md-6">
            <label>
              <h5>Upload Excel Sheet:</h5>
            </label>
            <input
              type="file"
              name="excel"
              id="excel"
              className="form-control"
              onChange={handleExcelUpload}
            />
            <small>
              note:the first column of the excel sheet should contain all the
              names
            </small>
          </div>
        </div>
        <div className="form-group" style={mystyle}>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={setisUploadSuccesfull}
          >
            Upload File
          </button>
        </div>
      </section>
    );

}


export default FileUpload;