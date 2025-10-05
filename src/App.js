import { React, useContext } from "react";
import FileUpload from "./components/FileUploader";
import { FileContextProvider, FileContext } from "./contexts/FileContexts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CertificatePreview from "./components/CertificatePreview";
import ProtectedRoute from "./components/routes/ProtectedRoute";
//import TopNavigationBar from "./components/TopNavigationBar";

function App() {
  return (
    <section>
      <FileContextProvider>
      <Router basename="/certgenerator">
        <Routes >
          <Route path="/" element={<FileUpload />} />

          <Route path="/preview" element={
      <ProtectedRoute>
        <CertificatePreview />
      </ProtectedRoute>
    } />
        </Routes>
      </Router>
      </FileContextProvider>
    
    </section>
  );
}
export default App;
