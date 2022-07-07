const { addRoleService,updateRoleService,removeRoleService} = require('../Service/RoleService')  
  

 const addRole = async(req,res)=>{
    const {roleName,permissions} = req.body
    const result = await addRoleService(roleName,permissions)
    res.send(result.json())
 }

  const updateRole = async(req,res)=>{
  const {id} = req.params
  const {roleName,permissions} = req.body
  const result = await updateRoleService(id,roleName,permissions)
  res.send(result.json())

}

const removeRole = async(req,res)=>{
    const {id} = req.params  
    const result = await removeRoleService(id)
    res.send(result.json())

}

module.exports = addRole
module.exports = updateRole
module.exports = removeRole