const Client = require('../Model/client.schema.js');
const addClient = async (client)=>{
    const result = await client.save();   
    return result;
}
const getAllClients = async (filter)=>{
    const result = await Client.find(filter);
    return result;
}

const updateClient = async (id , newClient)=>{
    const updatedResult = await Client.findOneAndUpdate({_id : id}, newClient, {new:true});
    return updatedResult;
}
const removeClient = async (id)=>{
    const deletedResult = await Client.findOneAndDelete({_id : id});
    return deletedResult;
}


module.exports.addClient = addClient;
module.exports.getAllClients = getAllClients;
module.exports.updateClient = updateClient;
module.exports.removeClient = removeClient;
