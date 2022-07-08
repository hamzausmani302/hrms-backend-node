const roleSchema = require('../Model/role.schema')

const getRoleService = async()=>{
    const result =  await roleSchema.find({})
    return result;
}
const addRoleService = async(roleName,permissions)=>{
const result = await roleSchema.create({roleName,permissions})
return result;
}  

const updateRoleService =  async(id,updates)=>{
    const result = await roleSchema.findByIdAndUpdate({_id : id},updates , {new :true})
    return result;
}  
const removeRoleService = async (id)=>{
    const result = await roleSchema.findOneAndDelete({_id : id});
    return result;
}

module.exports.getRoleService = getRoleService
module.exports.addRoleService = addRoleService
module.exports.updateRoleService = updateRoleService
module.exports.removeRoleService = removeRoleService