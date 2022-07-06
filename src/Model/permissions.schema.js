const mongoose = require('mongoose');


const PermissionSchema = mongoose.Schema({
    
    createAdmin : {type : Boolean , default : false },
    viewAdmin : {type : Boolean , default : false },
    updateAdmin : {type : Boolean , default : false },
    deleteAdmin : {type : Boolean , default : false },
    
    createProject : {type : Boolean , default : false },
    readProject : {type : Boolean , default : false },
    addProject : {type : Boolean , default : false },
    updateProject : {type : Boolean , default : false },
    
    createResources : {type : Boolean , default : false },
    viewResources : {type : Boolean , default : false },
    addResources : {type : Boolean , default : false },
    updateResources : {type : Boolean , default : false },
    
    createRole : {type : Boolean , default : false },
    viewRoles : {type : Boolean , default : false },
    addRoles : {type : Boolean , default : false },
    updateRoles : {type : Boolean , default : false },
    
    createPermission : {type : Boolean , default : false },
    viewPermissions : {type : Boolean , default : false },
    addPermission : {type : Boolean , default : false },
    updatePermission : {type : Boolean , default : false },

    createClient : {type : Boolean , default : false },
    viewClient : {type : Boolean , default : false },
    addClient : {type : Boolean , default : false },
    updateClient : {type : Boolean , default : false },



})


const Permission = mongoose.model("Permission" , PermissionSchema)
module.exports = Permission;