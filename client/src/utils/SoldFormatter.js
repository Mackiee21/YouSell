export const soldFormatter = (totalSold) => {
    const stringConverted = totalSold.toString();
    switch(stringConverted.length){
        case 4:
            return stringConverted.split("")[0] + "K";
        case 5: 
            return stringConverted.split("").splice(0, 2).join("") + "K"
        case 6:
            return stringConverted.split("").splice(0, 3).join("") + "K"
        case 7:
            return stringConverted.split("")[0] + "M"
        default: return totalSold
    }
}