const resetPassword = require("../Model/resetPassword.schema");
const { differenceFromDate } = require("../Utils/Date");
const { HTTP410Error, APIError, HTTP404Error } = require("../Utils/Error/CustomError");
const HttpStatusCode = require("../Utils/Error/HttpStatusCode");

//check email in db for forget password request
module.exports.checkTokenExistence =async  (req,res,next)=>{
    const {email} = req.body;
    const Token = await resetPassword.find({email :email , used: false }).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true ,err.message)
    })
    console.log(Token);
   
    if(Token && Token.length > 0){
        throw new APIError("DuplicateEntry" , HttpStatusCode.INTERNAL_SERVER , true , "Duplicate token");
    }
    next();

}