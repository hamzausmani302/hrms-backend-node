const express = require('express')
const Client = require('../Model/client.schema');

const {addClient , getAllClients , updateClient , removeClient} = require('../Service/ClientService.js');
const add_Client = async (req,res)=>{
     
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

const update_Client = async (req, res)=>{
    const id = req.params.id;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateClient(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const remove_Client = async (req, res)=>{
    const id = req.params.id;
    try{
        const result = await removeClient(id);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getClients = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllClients(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}


module.exports.addClient = add_Client;
module.exports.getAllClients = getClients;
module.exports.removeClient = remove_Client;
module.exports.updateClient = update_Client;