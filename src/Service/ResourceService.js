
const Resource = require('../Model/resource.schema.js');

const addResource = async (resource)=>{
    const result = await resource.save();   
    return result;
}
const getAllResources = async (filter)=>{
    const result = await Resource.find(filter);
    return result;
}

const updateResource = async (id , newResource)=>{
    const updatedResult = await Resource.findOneAndUpdate({_id : id} , newResource , {new:true});
    return updatedResult
}

const removeResource = async (id)=>{
    const deletedResult = await Resource.findOneAndDelete({_id : id});
    return deletedResult;
}
const addSkills = async(id, updates) =>{
    const {skills} = updates;
    const addedResult = await Resource.findOneAndUpdate({_id : id},  {$push: { skills: skills }}, {new:true});
    return addedResult;
}


module.exports.addResource = addResource;
module.exports.getAllResources = getAllResources;
module.exports.updateResource = updateResource
module.exports.removeResource = removeResource;
module.exports.addSkills = addSkills;
