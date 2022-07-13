
const ErrorCodes = require('../config/ErrorVariables');

const CustomError = (err)=>{
    return {
        status : err.statusCode||err.httpCode||500 , 
        message : err.message
    }
}

const handleError = (err)=>{
    console.log("caught")
    const errorObj = CustomError(err);
    return errorObj;
}

module.exports.ErrorHandler = handleError;