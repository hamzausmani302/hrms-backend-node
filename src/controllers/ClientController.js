const express = require('express')
const Client = require('../Model/client.schema');

const { addClient, getAllClients, updateClient, removeClient, searchClient} = require('../Service/ClientService.js');
const {getNumberOfProjects} = require('../Service/ProjectService.js');
const { HTTP400Error, APIError, HTTP404Error } = require('../Utils/Error/CustomError');

const getClientByKeyword = async (req, res, next) =>{
    const {key} = req.query;

    const result = await searchClient(key);
    if(!result)
        throw new APIError("mongoose", 500, true, err.message)

    return res.status(200).json({'message':result});
}

const getProjectsOfClient = async(req, res, next){
    const {clientId} = req.query;

    const result = await getNumberOfProjects(clientId)
        .catch((err) => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    res.status(200).json(result)
}

const addClientController = async (req, res) => {

    const { name, organization } = req.body;
    const client = new Client({
        name: name,
        organization: organization
    });
     const result = await addClient(client)
        .catch((err) => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    res.status(200).json(result)

}

const updateClientController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body.updates;
    const updatedUser = await updateClient(id, updates)
        .catch(err => {
            throw new  APIError("mongoose", 500, true, err.message)
        })
    if (!updatedUser) {
        throw new HTTP400Error("Not found Client")
    }
    res.status(200).json(updatedUser)
}

const removeClientController = async (req, res) => {
    const { id } = req.params;
    const result = await removeClient(id)
        .catch(err => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    if (!result) {
        throw  new HTTP400Error("Request Not Access")
    }
    res.status(200).json(result)
}

const getClientsController = async (req, res) => {
    const filter = req.query;
    const result = await getAllClients(filter)
        .catch(err => {
            throw new APIError("mongoose", 500, true, err.message)
        })
    if (!result) {
        throw  new HTTP400Error("Request Not Access")
    }
    res.status(200).json(result)
}



// const catchAsync= (fn) => {
//     return fn()
// }


module.exports.addClient = addClientController;
module.exports.getAllClients = getClientsController;
module.exports.removeClient = removeClientController;
module.exports.updateClient = updateClientController;
module.exports.getClientByKeyword = getClientByKeyword;
module.exports.getProjectsOfClient = getProjectsOfClient;