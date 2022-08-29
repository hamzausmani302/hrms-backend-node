

const Resource =require("../Model/resource.schema");
const ResetPasswordToken = require("../Model/resetPassword.schema");
const { HTTP400Error, HTTP404Error, APIError } = require("../Utils/Error/CustomError");
const HttpStatusCode = require("../Utils/Error/HttpStatusCode");
const { differenceFromDate } = require("../Utils/Date");

// checking token exist in db
const getTokenMiddleWare =async  (req,res,next)=>{
    const {id} = req.params;
    console.log(id)
    if(!id){
        throw new HTTP400Error("Id is missing");
    }
    const resetDoc = await ResetPasswordToken.findOne({_id : id}).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true , err.message);
    })
    //if token exist or not used in 2 mints
    if(!resetDoc || differenceFromDate(new Date(resetDoc.createdAt )) > 120 || resetDoc.used == true){
        throw new HTTP404Error("The link is expired");
    }
    req.body.resetDoc = resetDoc;
    
    
    next()
    

}
module.exports.getTokenMiddleWare = getTokenMiddleWare;
