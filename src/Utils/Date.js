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


module.exports.compareDate = compare_dates;