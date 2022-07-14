
const mongoose = require("mongoose")

const resetPasswordSchema = mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required: true,
    },
    email : {
        type : String,
        required: true
    },
    code : {
        type : String,
        required : true
    },
    status : {
        type :String,
        enum : ["ACTIVE" , "INACTIVE"],
        default : "ACTIVE",
        required : true
    },
    createdAt : {
        type : Date , 
        default : Date.now(),
        expires : '1m'
    },
    endDate : {
        type :Date , 
        default : new Date(Date.now()).getTime() 
    }

})
const resetPassword =mongoose.model("resetTokens" , resetPasswordSchema )
module.exports=resetPassword;