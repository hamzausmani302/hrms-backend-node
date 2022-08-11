const { addRoleService,updateRoleService,removeRoleService, getRoleService} = require('../Service/RoleService')  
const {APIError}  =require('../Utils/Error/CustomError');  
const HttpStatusCode = require('../Utils/Error/HttpStatusCode');

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
const getRoles = async (req,res)=>{
  const result = await getRoleService().catch(err=>{
    throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true ,  err.message)
  })
  res.status(200).json(result);
}
module.exports.addRole = addRole
module.exports.updateRole = updateRole
module.exports.removeRole = removeRole
module.exports.getRoles = getRoles