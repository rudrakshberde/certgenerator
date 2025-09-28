function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        var  obj= {
            r : Number(parseInt(result[1], 16) / 255),
            g : Number(parseInt(result[2], 16) / 255),
            b : Number(parseInt(result[3], 16) / 255)
          };
     
return obj
    }
    return null;
  }
  export default hexToRgb