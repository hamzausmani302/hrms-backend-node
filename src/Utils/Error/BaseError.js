
class BaseError extends Error{
    
    constructor(name , httpCode , description , isOperational ){
        super(description)
        Object.setPrototypeOf(this , new.target.prototype)
        this.name = name;
        this.httpCode = httpCode
        
        this.description = description
        this.isOperational = isOperational
        this.message= description
        Error.captureStackTrace(this)
    }
}


module.exports = BaseError