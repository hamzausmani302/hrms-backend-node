
const { HTTP400Error, APIError, HTTP404Error } = require("../Utils/Error/CustomError");
const Resource = require("../Model/resource.schema")

//find user by id in db
const checkIdMiddleWare =async (req,res,next)=>{
    const {id} = req.params;
    if(!id){
        throw new HTTP400Error("Id not provided");
    } 
    const resource = await Resource.findById(id).catch(err=>{
        throw new APIError("DatabaseError" , 500 , true ,err.message)
    });
    if(!resource){
        throw new HTTP404Error("Resource not found");
    }
    req.body.id=  id;
    next();
}


module.exports.checkIdMiddleWare = checkIdMiddleWare
