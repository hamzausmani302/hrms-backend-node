const { addRoleService,updateRoleService,removeRoleService,getRoleService} = require('../Service/RoleService')  
  
const getRole = async(req,res)=>{
    const result = await getRoleService()
    res.json(result)

}

 const addRole = async(req,res)=>{
    const {roleName,permissions} = req.body
    const result = await addRoleService(roleName,permissions)
    res.json(result)

 }

  const updateRole = async(req,res)=>{
  const {id} = req.params
  const {roleName,permissions} = req.body
  const result = await updateRoleService(id,roleName,permissions)
res.json(result)


}

const removeRole = async(req,res)=>{
    const {id} = req.params  
    const result = await removeRoleService(id)
  
    res.json(result);

}

module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole
module.exports.removeRole = removeRole