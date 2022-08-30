const compare_dates = (startDate , createdAt)=>{
    var d1 = new Date(startDate);
     
    // (YYYY-MM-DD)
    var d2 = new Date(createdAt);
    console.log(d1 , d2);
    if (d1.getTime() < d2.getTime())
        return false;
    else if (d1.getTime() > d2.getTime())
        return true;
    else
        document.write("both are equal");
}

const secondInTwoHours = ()=>{
    return 60*60*2;
}
const differenceFromDate = ( d1 , d2=Date.now() )=>{
    const seconds = Math.abs(d2-d1)/1000;
    console.log(seconds)    
    return Math.ceil(seconds)
}


module.exports.compareDate = compare_dates;
module.exports.secondInTwoHours = secondInTwoHours;
module.exports.differenceFromDate = differenceFromDate;