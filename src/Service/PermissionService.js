const Permission = require('../Model/permissions.schema.js');

const addPermission = async (permission)=>{
    const result = await permission.save();   
    return result;
}
const getAllPermissions = async (filter)=>{
    const result = await Permission.find(filter);
    return result;
}

const updatePermission = async (id , newPermission)=>{
    const updatedResult = await Permission.findOneAndUpdate({_id : id}, newPermission, {new:true});
    return updatedResult;
}
const removePermission = async (id)=>{
    const deletedResult = await Permission.findOneAndDelete({_id : id});
    return deletedResult;
}

module.exports.getAllPermissions = getAllPermissions;
module.exports.updatePermission = updatePermission;
module.exports.removePermission = removePermission;
module.exports.addPermission = addPermission;