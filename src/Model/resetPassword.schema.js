
const mongoose = require("mongoose")
const { reset } = require("nodemon")

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
        default : Date.now()
    },
    endDate : {
        type :Date , 
        default : new Date(Date.now()).getTime() + 6000
    }

})

const resetPassword =mongoose.model("resetTokens" , resetPasswordSchema )
module.exports=resetPassword;