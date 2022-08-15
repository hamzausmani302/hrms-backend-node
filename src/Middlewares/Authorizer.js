const { HTTP403Error } = require("../Utils/Error/CustomError");

class Authorizer {

    static AuthGetDeveloper(req,res,next){
        const {viewResources} = req.permission;
        if(viewResources===false){
        
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

}
module.exports.Authorizer = Authorizer;