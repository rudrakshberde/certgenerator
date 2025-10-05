import { createContext, useState, useContext} from "react"

 export const FileContext = createContext();
 
 export const  FileContextProvider = ({children})=>{
    const [certBase64,SetcertBase64] = useState(null);
    const [excelLoad,SetexcelLoad] = useState(null);
    return (
        <FileContext.Provider  value={{certBase64,SetcertBase64,excelLoad,SetexcelLoad}}>
        {children}
        </FileContext.Provider>
    );


 }