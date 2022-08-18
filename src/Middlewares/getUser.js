
const Resource =require("../Model/resource.schema");
const { HTTP400Error, HTTP404Error, APIError } = require("../Utils/Error/CustomError");
const HttpStatusCode = require("../Utils/Error/HttpStatusCode");


const getUserMiddleWare =async  (req,res,next)=>{
    const {email} = req.body;
    if(!email){
        throw new HTTP400Error("email is missing");
    }
    const user = await Resource.findOne({email : email}).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true , err.message);
    })
    console.log(user);
    if(!user){
        throw new HTTP404Error("Resource not found");
    }
    req.body.user = user;
    next()
}


module.exports.getUserMiddleWare = getUserMiddleWare;