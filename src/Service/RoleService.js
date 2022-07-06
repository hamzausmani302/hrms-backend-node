const roleSchema = require('../Model/role.schema')

const addRoleService = async(roleName,permissions)=>{
const result = await roleSchema.create({roleName,permissions})
}  

const updateRoleService =  async(id,roleName, permissions)=>{
    const result = await roleSchema.findByIdAndUpdate({_id : id,roleName : roleName,permissions :permissions})
 }  
const removeRoleService = async (id)=>{
    const Result = await roleSchema.findOneAndDelete({_id : id});

}

module.exports = addRoleService
module.exports = updateRoleService
module.exports = removeRoleService