import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FileContext } from "../../contexts/FileContexts";

const ProtectedRoute = ({ children }) => {
  const { certFile } = useContext(FileContext); // or certBase64 if you use that

  if (!certFile) {
    // Redirect to home if no certificate uploaded
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;