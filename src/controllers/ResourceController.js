
const Resource = require('../Model/resource.schema');
const {AUTHENTICATE_HASH , HASH_PASSWORD} = require('../Utils/Encryption');
const {JWT_SIGN , JWT_VERIFY} =  require('../Utils/Authentication');
const path = require("path");
const {ResourceInfo} = require('../DTO/ResourceInfo');
const {addResource , getAllResources , updateResource , removeResource, addSkills,getResourceWithRole} = require('../Service/ResourceService');

const addResourceController = async (req,res)=>{
    const {name , address ,designation ,  joiningDate ,email, password, skills} = req.body;
    const developer = new Resource({
       name : name,
       address : address,
       designation : designation,
       joiningDate : joiningDate,
       email : email,
       password : password,
       skills: [skills]                         //initially only one skill should be added!
    });
    try{
        const result = await addResource(developer)
        res.send(result)
    }catch(err){
        res.status(400).send({error : err})
    }
}

const updateResourceController = async (req, res)=>{
    const {id} = req.params;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateResource(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const updateSkillsController = async (req, res) =>{
    const {id} = req.params;
    const {updates} = req.body;

    try{
        const updatedRes = await addSkills(id, updates);
        res.json(updatedRes)
    }catch(err){
        res.status(404).json({error : err})
    }
}

const removeResourceController = async (req, res)=>{
    const {id} = req.params;
    try{
        const result = await removeResource(id)
        res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getResourcesController = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllResources(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

const loginAsResource = async (req,res)=>{
    const {email , password}  =req.body;
    try{
        

        const filter=  {
            email : email,
        }
        const allResources = await getAllResources(filter)
        
        if(allResources.length !== 0){
            const _resource = allResources[0]
            console.log(_resource)
            const result = await AUTHENTICATE_HASH(password , allResources[0].password);
            if(result){
                
                const token = JWT_SIGN({
                    email : _resource.email,
                    password : _resource.password
                })
                _resource["token"] = token;
                res.cookie("AUTH_TOKEN" , token  , { maxAge: 900000})
                return res.status(200).json(ResourceInfo(_resource));

            }else{
                return res.status(403).json({error : "Incorrect username or password"});
            
                
            }

        }
        return res.status(403).json({error  : "No record found"});
        
        

    }catch(err){
        console.log(err);
        res.status(404).json({error  : err});
        
    }
}

const getAllResourceInfo = async (req,res)=>{
    const allResources = await getResourceWithRole([]).catch(err=>{
        const error = new Error(err.message);
        error.statusCode = 404
        throw error;
    })
    res.status(200).json(allResources);
}

module.exports.addResource = addResourceController;
module.exports.getAllResources = getResourcesController;
module.exports.removeResource = removeResourceController;
module.exports.updateResource = updateResourceController;
module.exports.loginAsResource = loginAsResource;
module.exports.updateSkills = updateSkillsController;
module.exports.getAllResourceInfo = getAllResourceInfo;
