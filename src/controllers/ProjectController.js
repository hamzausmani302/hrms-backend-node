// const { addProject } = require("../Service/ProjectService")
const express = require('express')
const Project = require('../Model/project.schema');

const {addProject , getAllProjects , updateProject , removeProject} = require('../Service/ProjectService.js');
const add_project = async (req,res)=>{
     
    const {name ,description , startingDate , dueDate , status , progress  } = req.body;
    const project = new Project({
        name : name , 
        description:description,
        startingDate : startingDate , 
        dueDate : dueDate ,
        status : status,
        progress : progress
    });

    try{
        const result = await addProject(project)
        res.send(result);
    }catch(err){
        res.status(400).send({error : err})
    }

}

const update_project = async (req, res)=>{
    const id = req.params.id;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateProject(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const remove_project = async (req, res)=>{
    const id = req.params.id;
    try{
    const result = await removeProject(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getProjects = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllProjects(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}


module.exports.addProject = add_project;
module.exports.getAllProjects = getProjects;
module.exports.removeProject = remove_project;
module.exports.updateProject = update_project;
