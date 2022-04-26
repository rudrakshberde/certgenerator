import { React } from "react";

import FileUploader from "./FileUpload";
var sessvar = localStorage.getItem("filepath");

function App() {
  return (
    <section>
      <FileUploader />
    </section>
  );
}
export default App;
