
const Developer = require('../Model/developer.schema.js');

const addDeveloper = async (developer)=>{
    const result = await developer.save();   
    return result;
}
const getAllDevelopers = async (filter)=>{
    const result = await Developer.find(filter);
    return result;
}

const updateDeveloper = async (id , newDeveloper)=>{
    const updatedResult = await Developer.findOneAndUpdate({_id : id} , newDeveloper , {new:true});
    return updatedResult
}
const removeDeveloper = async (id)=>{
    const deletedResult = await Developer.findOneAndDelete({_id : id});
    return deletedResult;
}
const addSkills = async(id, updates) =>{
    const {skills} = updates;
    const addedResult = await Developer.findOneAndUpdate({_id : id},  {$push: { skills: skills }}, {new:true});
    return addedResult;
}

module.exports.addDeveloper = addDeveloper;
module.exports.getAllDevelopers = getAllDevelopers;
module.exports.updateDeveloper = updateDeveloper
module.exports.removeDeveloper = removeDeveloper;
module.exports.addSkills = addSkills;
