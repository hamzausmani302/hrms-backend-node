const mongoose = require("mongoose")

const validator = require("email-validator");

const ResourceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 40
    },

    address: {
        type: String,
        maxLength: 100
    },

    designation: {
        type: String,
        maxLength: 30,
        required: true
    },

    joiningDate: {
        type: Date,
        default: Date.now()
    },

    email: {
        type: String,
        minLength: 6,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.validate(v);
            },
            message: 'Invalid email format'
        },

    },
    password: {         //if the resource should not get password,
        type: String,         //there will be no attribute of password at all in collection
        maxLength: 200,
        minLength: 6,

    },

    skills: {
        type: [String],
        minItems: 1,
        maxItems: 50
    },
    roleId: {
        type: mongoose.Types.ObjectId,
    },
    employmentStatus : {
        type : String,
        enum : {
            values :  ["LEFT" , "PRESENT"],
            message : "Invalid values provided"
        },
        required : true
        
    }
},

)

const Resource = mongoose.model("Resource", ResourceSchema);



module.exports = Resource;