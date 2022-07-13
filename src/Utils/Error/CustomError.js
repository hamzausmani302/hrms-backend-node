const BaseError = require("./BaseError");
const HttpStatusCode = require('./HttpStatusCode');
class APIError extends BaseError{
    constructor(name , httpCode , isOperational,desciption){
        super(name , httpCode , desciption, isOperational )
    }
}


class HTTP400Error extends BaseError {
    constructor(desciption='bad request'){
        super('BAD REQUEST' , HttpStatusCode.BAD_REQUEST , desciption,true)
    }
}

class HTTP404Error extends BaseError {
    constructor(desciption='not found'){
        super('NOT FOUND' , HttpStatusCode.NOT_FOUND  , desciption, true)
    }
}

class HTTP403Error extends BaseError{
    constructor(description='forbidden access' , httpCode = HttpStatusCode.FORBIDDEN_ACCESS , desciption , isOperational){
        super('FORBIDDEN ACCESS' , httpCode  ,"Access not allowed"  ,isOperational );
    }
}
module.exports.APIError = APIError
module.exports.HTTP400Error = HTTP400Error
module.exports.HTTP404Error = HTTP404Error
module.exports.HTTP403Error = HTTP403Error