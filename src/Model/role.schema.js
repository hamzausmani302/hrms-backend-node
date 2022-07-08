const mongoose = require('mongoose');
const Permisson = require('./permissions.schema')

const RoleSchema = mongoose.Schema({
   roleName : {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    permissions : {
        type : mongoose.Types.ObjectId,
        required : true
    }
})


const Role = mongoose.model("Role" , RoleSchema)
module.exports = Role;