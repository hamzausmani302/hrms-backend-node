const { addRoleService,updateRoleService,removeRoleService,getRoleService} = require('../Service/RoleService')  
const { APIError, HTTP400Error, HTTP404Error } = require('../Utils/Error/CustomError')
  
const getRole = async(req,res)=>{
    const result = await getRoleService()
    res.json(result)

}

 const addRole = async(req,res)=>{
    const {roleName,permissions} = req.body
    const result = await addRoleService(roleName,permissions).catch(err=>{
      throw new HTTP400Error(err.message);
    })
    res.json(result)

 }

  const updateRole = async(req,res)=>{
  const {id} = req.params
  const {updates} = req.body
  const result = await updateRoleService(id,updates).catch((err)=>{
    throw new HTTP400Error(err.message);
  })
  res.status(200).json(result)


}

const removeRole = async(req,res)=>{
    const {id} = req.params  
    const result = await removeRoleService(id).catch(err=>{
      throw new HTTP404Error(err.message);
    })
  
    res.json(result);

}

module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole
module.exports.removeRole = removeRole