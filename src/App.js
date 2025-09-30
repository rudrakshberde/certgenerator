import { React, useContext } from "react";
import FileUpload from "./components/FileUploader";
import { FileContextProvider, FileContext } from "./contexts/FileContexts";

var sessvar = localStorage.getItem("filepath");

function App() {
 // const {CertBase64} = useContext(FileContext);
  return (
    <section>
 <FileUpload/>   
    </section>
  );
}
export default App;
