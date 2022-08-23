const { addRoleService,updateRoleService,removeRoleService, getRoleService, getRoleWithPermissionsService} = require('../Service/RoleService')  
const {APIError}  =require('../Utils/Error/CustomError');  
const HttpStatusCode = require('../Utils/Error/HttpStatusCode');

 const addRole = async(req,res)=>{
    const {roleName,permissions} = req.body
    const result = await addRoleService(roleName,permissions).catch(err => {
      throw new APIError("MongooseError", 500, true, err.message);
  });
    res.status(200).json(result)
 }

  const updateRole = async(req,res)=>{
  const {id} = req.params
  const {updates} = req.body
  const result = await updateRoleService(id,updates).catch(err => {
    throw new APIError("MongooseError", 500, true, err.message);
});
  res.status(200).json(result)

}

const removeRole = async(req,res)=>{
    const {id} = req.params  
    const result = await removeRoleService(id).catch(err => {
      throw new APIError("MongooseError", 500, true, err.message);
  });
    res.status(200).json(result)

}
const getRoles = async (req,res)=>{
  const result = await getRoleWithPermissionsService().catch(err=>{
    throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true ,  err.message)
  })
  res.status(200).json(result)
}
module.exports.addRole = addRole
module.exports.updateRole = updateRole
module.exports.removeRole = removeRole
module.exports.getRoles = getRoles
