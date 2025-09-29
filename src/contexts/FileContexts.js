import { createContext, useState, useContext, Children } from "react"

 export const FileContext = ()=> createContext();
 
 export const  FileContextProvider = ()=>{
    Const [CertBase64,SetcertBase64]=useState(null);
    return (
        <FileContext.Provider  value={{CertBase64,SetcertBase64}}>
        {Children}
        </FileContext.Provider>
    );


 }