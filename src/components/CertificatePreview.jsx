import React from "react";
import { useState } from "react";

const certificatePreview =()=>{
    return(
        <div className="container">
          <section id="editspace">
            <h5>Preview</h5>
            <iframe
              src=""
              id="showpdf"
             
              className="iframes"
            ></iframe>
            <div className="edit-options">
              <div className="form-group">
                <button
                  type="button"
                  id="upbutton"
                  className="btn btn-dark"
                >
                  up
                </button>

                <button
                  type="button"
                  id="leftbutton"
                  className="btn btn-dark"
                >
                  left
                </button>

                <button
                  type="button"
                  id="rightbutton"
                  className="btn btn-dark"
                >
                  Right
                </button>

                <button
                  type="button"
                  id="downbutton"
                  className="btn btn-dark"
                >
                  down
                </button>
              </div>
              <div className="form-group">
                <h4>choose colour</h4>
                <input
                  type="color"
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
                      id="fntsize"
                      className="form-control"
                      placeholder="50"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="download-button">
                <button  className="btn btn-warning btn-lg">
                  download
                </button>
              </div>
            </div>
          </section>
        </div>
    );

}

export default certificatePreview;
