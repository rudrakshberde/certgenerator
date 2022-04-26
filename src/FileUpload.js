import React from "react";
import axios from "axios";
import $ from "jquery";

import readXlsxFile from "read-excel-file";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { saveAs } from "file-saver";
import JSZip from "jszip";

var values;
var respon;
var array,
  longest,
  column = 0;
var temparray = [];
var x_cod = 300;
var y_cod = 300;
var fntsize = 50;
var r = 0.95;
var g = 0.1;
var b = 0.1;
var flpth;
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
    data.onload = function () {
      respon = data.result;

      analyze(values);

      generatePDF(longest, 300, 300, fntsize, r, g, b);
    };
    data.readAsArrayBuffer(input.files[0]);
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
            onClick={() => this.onSubmit()}
          >
            Upload File
          </button>
        </div>

        <div className="container">
          <section id="editspace">
            <h5>Preview</h5>
            <iframe
              src=""
              id="showpdf"
              frameBorder="0"
              className="iframes"
            ></iframe>
            <div className="edit-options">
              <div className="form-group">
                <button
                  type="button"
                  id="upbutton"
                  className="btn btn-dark"
                  onClick={customUp}
                >
                  up
                </button>

                <button
                  type="button"
                  id="leftbutton"
                  className="btn btn-dark"
                  onClick={customLeft}
                >
                  left
                </button>

                <button
                  type="button"
                  id="rightbutton"
                  className="btn btn-dark"
                  onClick={customRight}
                >
                  Right
                </button>

                <button
                  type="button"
                  id="downbutton"
                  onClick={customDown}
                  className="btn btn-dark"
                >
                  down
                </button>
              </div>
              <div className="form-group">
                <h4>choose colour</h4>
                <input
                  type="color"
                  onChange={changecolor}
                  id="color"
                  className="form-control form-control-color"
                ></input>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="form-group col-md-3">
                    <h5>Font size:</h5>
                    <input
                      type="number"
                      onInput={increaseFont}
                      id="fntsize"
                      className="form-control"
                      placeholder="50"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="download-button">
                <button onClick={download} className="btn btn-warning btn-lg">
                  download
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}
var pdfDoc, pdfBytes;
const generatePDF = async (name, xcod, ycod, fntsize, r, g, b) => {
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
  document.querySelector("#showpdf").src = uri;
  pdfBytes = await pdfDoc.save();
};

function customUp() {
  y_cod = y_cod + 15;

  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
}
function customDown() {
  y_cod = y_cod - 15;

  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
}
function customLeft() {
  x_cod = x_cod - 15;

  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
}

function customRight() {
  x_cod = x_cod + 15;

  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
}

const download = async (e) => {
  e.preventDefault();
  document.getElementById("editspace").style.display = "none";

  var zip = new JSZip();
  var img = zip.folder("certificates");

  for (let i = 0; i < values.length; i++) {
    await generatePDF(values[i][0], x_cod, y_cod, fntsize, r, g, b);

    img.file(values[i][0] + ".pdf", pdfBytes);
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "certificates.zip");
  });
};
async function changecolor() {
  var hashcode = document.getElementById("color").value;
  await hexToRgb(hashcode);
  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
}
function increaseFont() {
  fntsize = Number(document.getElementById("fntsize").value);
  generatePDF(longest, x_cod, y_cod, fntsize, r, g, b);
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
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    r = Number(parseInt(result[1], 16) / 255);
    g = Number(parseInt(result[2], 16) / 255);
    b = Number(parseInt(result[3], 16) / 255);
  }
  return null;
}
window.onload = function () {
  document.getElementById("editspace").style.display = "none";
};

export default FileUploader;
