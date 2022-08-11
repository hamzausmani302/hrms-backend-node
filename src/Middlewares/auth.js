const { JWT_VERIFY } = require("../Utils/Authentication");
const { HTTP400Error } = require("../Utils/Error/CustomError");
const tokenIsValid = (token)=>{
    const decodedInfo = JWT_VERIFY(token);
    console.log(decodedInfo);
    if(decodedInfo){
        return true;
    }
    return false;
}
const authorizeUser = (req,res,next)=>{
    const {authorization} =req.headers
    //check token
    if(!authorization){
        throw new HTTP400Error("Authentication information is missing");
    }
    //check validity
    const token = authorization.split(" ")[1];
    if(!token || !tokenIsValid(token)){
        throw new HTTP400Error("Invalid Token")
    }


    next()

    
}


module.exports.authorizeUserMiddleWare = authorizeUser;