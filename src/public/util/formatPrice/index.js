
function FormatPrice (price,space='\.',unit='₫') {
    let priceStr = price.toString()
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
    const priceLen =priceStr.length
    var result
    for (var i= priceLen ;i>=1;i-=3){
        priceStr = setCharAt(priceStr,i,space+priceStr[i]);
    }
    return (priceStr + unit)
}
