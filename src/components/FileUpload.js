import React from "react";
import readXlFile from "read-excel-file";
import generatePDF from "../utils/generatePDF";
import hexToRgb from "../utils/hexToRgb";
import downloadFiles from "../utils/downloadFiles";
import certificatePreview from "./pages/CertificatePreview";
var values;
var respon;
var longest,
  column = 0;
var temparray = [];
var x_cod = 300;
var y_cod = 300;
var fntsize = 50;
var r = 0.95;
var g = 0.1;
var b = 0.1;
class FileUploader extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
    });
  }
  handleChange(event) {
    readXlsxFile(event.target.files[0]).then(function (rows) {
      values = rows;
    console.log(rows)
    });
  }

  onSubmit() {
    if (!this.state.selectedFile) {
      alert("Please select a file!");
      return false;
    }

    const input = document.querySelector("#file");
    const data = new FileReader();
    document.getElementById("editspace").style.display = "block";
    console.log(input.files[0])
    data.readAsArrayBuffer(input.files[0]);
    data.onload = function () {
      respon = data.result;

      analyze(values);
      generate(longest,longest, 300, 300, fntsize, r, g, b,respon);
    };
    
    
  }

  resetFile() {
    // Reset file input control
    document.getElementsByName("file")[0].value = null;
  }

  render() {
    const mystyle = {
      padding: "10px",

      margin: "10px",
      marginLeft: "25%",
    };

    return (
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
              onChange={this.handleInputChange}
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
            
          >
            Upload File
          </button>
        </div>

      </section>
    );
  }
}
const generate=(name,longest, xcod, ycod, fntsize, r, g, b,respon)=>{
  generatePDF(name, longest,xcod, ycod, fntsize, r, g, b,respon).then((pdfUri) => {
    document.querySelector("#showpdf").src = pdfUri.uri;
  });
}





const download = async (e) => {
  document.getElementById("editspace").style.display = "none";
 downloadFiles(e,values,longest,x_cod,y_cod,fntsize,r,g,b,respon)
}
async function changecolor() {
  var hashcode = document.getElementById("color").value;
  var result=await hexToRgb(hashcode);
  r=result.r
  g=result.g
  b=result.b
  
  generate=(longest, x_cod, y_cod, fntsize, r, g, b,respon);
}
function increaseFont() {
  fntsize = Number(document.getElementById("fntsize").value);
  generate(longest, x_cod, y_cod, fntsize, r, g, b,respon);
}
async function analyze(array) {
  temparray.splice(0, temparray.length);
  for (let i = 0; i < array.length; i++) {
    temparray[i] = array[i][column];
  }
  longest = temparray.sort(function (a, b) {
    return b.length - a.length;
  })[0];
}

window.onload = function () {
  document.getElementById("editspace").style.display = "none";
};

export default FileUploader;
