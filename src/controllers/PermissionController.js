// getAllPermissions, addPermission, updatePermission, removePermission

const express = require('express')
const Permission = require('../Model/permissions.schema');
const {getAllPermissions, addPermission, updatePermission, removePermission} = require('../Service/PermissionService.js');



const addPermissionController = async (req,res)=>{

    const {createProject, readProject, addProject, updateProject, createResources, viewResources, 
    addResources, updateResources,
    createRole, viewRoles, addRoles, updateRoles,
    createPermission, viewPermission, addPermissions, updatePermission,
    createClient, viewClient, addClient, updateClient} = req.body;

    const NewPermission = new Permission({
        createProject : createProject,
        readProject : readProject,
        addProject : addProject,
        updateProject : updateProject,
        
        createResources :  createResources,
        viewResources : viewResources,
        addResources : addResources,
        updateResources : updateResources,
        
        createRole : createRole,
        viewRoles : viewRoles,
        addRoles : addRoles,
        updateRoles : updateRoles,
        
        createPermission : createPermission,
        viewPermission : viewPermission,
        addPermissions : addPermissions,
        updatePermission : updatePermission,
    
        createClient : createClient,
        viewClient : viewClient,
        addClient : addClient,
        updateClient : updateClient, 
    });

    try{
        const result = await addPermission(NewPermission)
        res.send(result);
    }catch(err){
        res.status(400).send({error : err})
    }

}

const updatePermissionController = async (req, res)=>{
    const {id} = req.params;
    const updates = req.body.updates;
    try{
        const updatedUser = await updatePermission(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const removePermissionController = async (req, res)=>{
    const {id} = req.params;
    try{
        const result = await removePermission(id);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getAllPermissionsController = async (req, res)=>{
    const filter = req.query;
    
    try{
        const result = await getAllPermissions(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

module.exports.addPermissions = addPermissionController;
module.exports.getAllPermission = getAllPermissionsController;
module.exports.removePermission = removePermissionController;
module.exports.updatePermission = updatePermissionController;