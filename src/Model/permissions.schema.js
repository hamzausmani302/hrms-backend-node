const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    name: {type: String , unique:true, required : true},
    createProject : {type : Boolean , default : false },
    readProject : {type : Boolean , default : false },
    deleteProject : {type : Boolean , default : false },
    updateProject : {type : Boolean , default : false },
    
    createResources : {type : Boolean , default : false },
    readResources : {type : Boolean , default : false },
    deleteResources : {type : Boolean , default : false },
    updateResources : {type : Boolean , default : false },
    
    createRole : {type : Boolean , default : false },
    readRoles : {type : Boolean , default : false },
    deleteRoles : {type : Boolean , default : false },
    updateRoles : {type : Boolean , default : false },
    
    createPermission : {type : Boolean , default : false },
    readPermissions : {type : Boolean , default : false },
    deletePermission : {type : Boolean , default : false },
    updatePermission : {type : Boolean , default : false },

    createClient : {type : Boolean , default : false },
    readClient : {type : Boolean , default : false },
    deleteClient : {type : Boolean , default : false },
    updateClient : {type : Boolean , default : false },
})

const Permission = mongoose.model("Permission" , PermissionSchema)
module.exports = Permission;
