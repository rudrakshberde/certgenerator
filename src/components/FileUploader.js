import React from "react";
import readXlsxFile from "read-excel-file";
import generatePDF from "../utils/generatePDF";
import hexToRgb from "../utils/hexToRgb";
import downloadFiles from "../utils/downloadFiles";

const FileUpload= ()=>{
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
              onChange={}
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
              onChange={this.handleChange}
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
            onClick={() => this.onSubmit()}
          >
            Upload File
          </button>
        </div>

      </section>
    );

}
export default FileUpload;