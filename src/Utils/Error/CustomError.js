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
    constructor(description='Forbidden access'){
        super('FORBIDDEN ACCESS' , HttpStatusCode.FORBIDDEN_ACCESS  ,description ,true );
    }
}

class HTTP410Error extends BaseError{
    constructor(desciption = "Expired resource"){
        super("ExpiredToken" , HttpStatusCode.EXPIRED_RESOURCE , desciption , true);
    }
}
module.exports.APIError = APIError
module.exports.HTTP400Error = HTTP400Error
module.exports.HTTP404Error = HTTP404Error
module.exports.HTTP403Error = HTTP403Error
module.exports.HTTP410Error = HTTP410Error;