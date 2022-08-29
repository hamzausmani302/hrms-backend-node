
const express = require('express')
const Permission = require('../Model/permissions.schema');
const { getAllPermissions, updatePermission, removePermission, addPermission } = require('../Service/PermissionService.js');
const { HTTP400Error, APIError, HTTP404Error } = require('../Utils/Error/CustomError');



const addPermissionController = async (req, res) => {
    const { name } = req.body;
    const { createProject, readProject, deleteProject, updateProject, createResources, readResources,
        deleteResources, updateResources,
        createRole, readRoles, deleteRoles, updateRoles,
        createPermission, readPermission, deletePermission, updatePermission,
        createClient, readClient, deleteClient, updateClient } = req.body.permissions;

    const NewPermission = new Permission({
        name: name,
        createProject: createProject,
        readProject: readProject,
        deleteProject: deleteProject,
        updateProject: updateProject,

        createResources: createResources,
        readResources: readResources,
        deleteResources: deleteResources,
        updateResources: updateResources,

        createRole: createRole,
        readRoles: readRoles,
        deleteRoles: deleteRoles,
        updateRoles: updateRoles,

        createPermission: createPermission,
        readPermission: readPermission,
        deletePermission: deletePermission,
        updatePermission: updatePermission,

        createClient: createClient,
        readClient: readClient,
        deleteClient: deleteClient,
        updateClient: updateClient,
    });
    const result = await addPermission(NewPermission).catch(err => {
        throw new APIError("mongoose", 500, true, err.message);
    })
    if (!result) {
        throw new HTTP400Error("Invalid Fields")
    }
    res.status(200).json(result)

}

const updatePermissionController = async (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;

    const updatedUser = await updatePermission(id, updates)
        .catch((err) => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    if (!updatedUser) {
        throw new HTTP400Error("Not Access")
    }
    res.status(200).json(result)


}

const removePermissionController = async (req, res) => {
    const { id } = req.params;

    const result = await removePermission(id)
        .catch(err => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    res.status(200).json(result)
}

const getAllPermissionsController = async (req, res) => {
    const filter = req.query;


    const result = await getAllPermissions(filter)
        .catch((err) => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    res.status(200).json(result)
}

module.exports.addPermissions = addPermissionController;
module.exports.getAllPermissions = getAllPermissionsController;
module.exports.removePermission = removePermissionController;
module.exports.updatePermission = updatePermissionController;