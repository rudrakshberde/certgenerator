import { createContext, useState, useContext} from "react"

 export const FileContext = createContext();
 
 export const  FileContextProvider = ()=>{
    const [certBase64,SetcertBase64]=useState(null);
    return (
        <FileContext.Provider  value={{certBase64,SetcertBase64}}>
        {children}
        </FileContext.Provider>
    );


 }