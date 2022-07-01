const express = require('express')
const Client = require('../Model/client.schema');

const {addClient , getAllClients , updateClient , removeClient} = require('../Service/ClientService.js');
const addClientController = async (req,res)=>{
     
    const {name, organization } = req.body;
    const client = new Client({
        name : name,
        organization : organization
    });

    try{
        const result = await addClient(client)
        res.send(result);
    }catch(err){
        res.status(400).send({error : err})
    }

}

const updateClientController = async (req, res)=>{
    const {id} = req.params;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateClient(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const removeClientController = async (req, res)=>{
    const {id} = req.params;
    try{
        const result = await removeClient(id);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getClientsController = async (req, res)=>{
    const filter = req.query;
    
    try{
        const result = await getAllClients(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}


// const catchAsync= (fn) => {
//     return fn()
// }


module.exports.addClient = addClientController;
module.exports.getAllClients = getClientsController;
module.exports.removeClient = removeClientController;
module.exports.updateClient = updateClientController;