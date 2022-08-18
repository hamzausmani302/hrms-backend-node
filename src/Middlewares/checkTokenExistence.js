const resetPassword = require("../Model/resetPassword.schema");
const { HTTP410Error, APIError, HTTP404Error } = require("../Utils/Error/CustomError");
const HttpStatusCode = require("../Utils/Error/HttpStatusCode");

module.exports.checkTokenExistence =async  (req,res,next)=>{
    const {email} = req.body;
    const Token = await resetPassword.findOne({email :email , used: false }).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true ,err.message)
    })
    console.log(Token);
    if(Token){
        throw new APIError("DuplicateEntry" , HttpStatusCode.INTERNAL_SERVER , true , "Duplicate token");
    }
    next();

}