const Project = require('../Model/project.schema.js');

const addProject = async (project)=>{
    const result = await project.save();   
    return result;
}
const getAllProjects = async (filter)=>{
    const result = await Project.find(filter);
    return result;
}

const updateProject = async (id , newProject)=>{
    const updatedResult = await Project.findOneAndUpdate({_id : id} , newProject , {new:true});
    return updatedResult;
}
const removeProject = async (id)=>{
    const deletedResult = await Project.findOneAndDelete({_id : id});
    return deletedResult;
}
const addDeveloperToProject = async(projId, id)=>{
    const addedResult = await Project.findOneAndUpdate({_id : projId}, {$push: { developersOnProject: id }}, {new:true});
    return addedResult;
}
const removeDev_Project = async(projId, id)=>{
    const deletedResult = await Project.findOneAndUpdate({_id : projId}, {$pull: { developersOnProject: id }}, {new:true});
    return deletedResult;
}

module.exports.removeDeveloper_Project = removeDev_Project;
module.exports.addDeveloper_Project = addDeveloperToProject;
module.exports.addProject = addProject;
module.exports.getAllProjects = getAllProjects;
module.exports.updateProject = updateProject;
module.exports.removeProject = removeProject;
