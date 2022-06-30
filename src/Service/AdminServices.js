const Admin = require('../Model/administrator.schema');

const addAdmin = async (admin)=>{
    const result = await admin.save();   
    return result;
}
const getAllAdmin = async (filter)=>{
    const result = await Admin.find(filter);
    return result;
}

const updateAdmin = async (id , newAdmin)=>{
    const updatedResult = await Admin.findOneAndUpdate({_id : id} , newAdmin , {new:true});
    return updatedResult;
}
const removeAdmin = async (id)=>{
    const deletedResult = await Admin.findOneAndDelete({_id : id});
    return deletedResult;
}

module.exports.addAdmin = addAdmin;
module.exports.getAllAdmin = getAllAdmin;
module.exports.updateAdmin = updateAdmin
module.exports.removeAdmin = removeAdmin
