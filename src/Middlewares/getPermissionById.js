const { getPermissionByIdService } = require("../Service/PermissionService")
const { APIError, HTTP404Error } = require("../Utils/Error/CustomError")
const HttpStatusCode = require("../Utils/Error/HttpStatusCode")

//get permission id and check in db
const getPermissionById = async (req,res,next)=>{
        const {id} = req.headers;
        const result = await getPermissionByIdService(id).catch(err=>{
            throw new APIError("DatabaseError", HttpStatusCode.INTERNAL_SERVER , true , err.message);
        })
        if(!result){
            throw new HTTP404Error("Permission not found");
        }
        req.permission = result;
        
        next();
}

module.exports.getPermissionById = getPermissionById;