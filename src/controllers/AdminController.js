const express = require('express')
const Admin = require('../Model/administrator.schema');

const {addAdmin , getAllAdmin , updateAdmin , removeAdmin} = require('../Service/AdminServices');
const add_admin = async (req,res)=>{
     console.log(req.body);
    const {name ,email , password , address , joiningDate , rights  } = req.body;
    const admin = new Admin({
        name : name , 
        email:email,
        password : password,
        joiningDate : joiningDate , 
        address : address ,
        rights  : rights,
    });

    try{
        const result = await addAdmin(admin)
        res.send(result);
    }catch(err){
        res.status(400).send({error : err})
    }

}

const addDeveloper_Project = async (req, res)=>{ 
    const devId = req.params.devId;

    const addedDeveloper_project = await addDeveloperToproject(devId)
    try{
        res.json(addedDevloper_project);
    }catch(err){
        res.status(400).json({error : err});    //400 = project doesn't exist
    }
}

const update_admin = async (req, res)=>{
    const id = req.params.id;
    const updates = req.body.updates;
    try{
        const updatedAdmin = await updateAdmin(id , updates);
        res.json(updatedAdmin);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const remove_admin = async (req, res)=>{
    const id = req.params.id;
    try{
    const result = await removeAdmin(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const get_admin = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllAdmin(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

module.exports.addAdmin = add_admin;
module.exports.updateAdmin = update_admin;
module.exports.removeAdmin = remove_admin;
module.exports.getAdmin = get_admin;
module.exports.addDeveloper_Project = addDeveloper_Project;
