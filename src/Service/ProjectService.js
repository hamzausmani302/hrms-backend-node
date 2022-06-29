const mongoose = require("mongoose");
const { update } = require("../Model/developer.schema.js");
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
    return updatedResult
}
const removeProject = async (id)=>{
    const deletedResult = await Project.findOneAndDelete({_id : id});
    return deletedResult;
}


module.exports.addProject = addProject;
module.exports.getAllProjects = getAllProjects;
module.exports.updateProject = updateProject
module.exports.removeProject = removeProject
