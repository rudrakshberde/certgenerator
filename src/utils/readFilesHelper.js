
import readXlsxFile from "read-excel-file";

export const readXlFile=(e)=>{
    console.log("reached here-xls")
    
    if(e.target.files[0]!=null ){
        const extention = e.target.files[0].name.split(".").pop().toLowerCase();
        if(extention === "xls"||extention === "xlsx"){
            readXlsxFile(e.target.files[0]).then(function (rows) {
                const values = rows; 
              console.log(rows);
              return values;
              });
        }
        else{
            alert("Wrong File Type: please upload an excel file(xsl,xlsx)")

        }
       
    }else{
        alert("Please upload a file")
    }
   

}

export const readPDFFile = (e) =>{

    if(e.target.files[0]!=null ){
        const extention = e.target.files[0].name.split(".").pop().toLowerCase();
        if(extention === "pdf"){
         return e.target.files[0]

        }
        else{
            alert("Wrong File Type: please upload a PDF file")
        }

    }
    else{
        alert("Please upload a file")
    }

}
