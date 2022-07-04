
const Developer = require('../Model/developer.schema');
const {AUTHENTICATE_HASH , HASH_PASSWORD} = require('../Utils/Encryption');
const {JWT_SIGN , JWT_VERIFY} =  require('../Utils/Authentication');
const path = require("path");
const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper} = require(path.resolve(__dirname , "../Service/developerService.js"));
const {DeveloperInfo} = require('../DTO/DeveloperInfo');

const addDeveloperController = async (req,res)=>{
    const {name , address ,designation ,  joiningDate ,email, password} = req.body;
    const developer = new Developer({
       name : name,
       address : address,
       designation : designation,
       joiningDate : joiningDate,
       email : email,
       password : password
    });
    try{
        const result = await addDeveloper(developer)
        res.send(result)
    }catch(err){
        res.status(400).send({error : err})
    }
}

const updateDeveloperController = async (req, res)=>{
    const {id} = req.params;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateDeveloper(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const removeDeveloperController = async (req, res)=>{
    const {id} = req.params;
    try{
    const result = await removeDeveloper(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getDevelopersController = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllDevelopers(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

const loginAsDeveloper = async (req,res)=>{
    const {email , password}  =req.body;
    try{
        

        const filter=  {
            email : email,
        }
        const allDevelopers = await getAllDevelopers(filter)
        
        if(allDevelopers.length !== 0){
            const _dev = allDevelopers[0]
            console.log(_dev)
            const result = await AUTHENTICATE_HASH(password , allDevelopers[0].password);
            if(result){
                
                const token = JWT_SIGN({
                    email : _dev.email,
                    password : _dev.password
                })
                _dev["token"] = token;
                res.cookie("AUTH_TOKEN" , token  , { maxAge: 900000})
                return res.status(200).json(DeveloperInfo(_dev));

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

module.exports.addDeveloper = addDeveloperController;
module.exports.getAllDevelopers = getDevelopersController;
module.exports.removeDeveloper = removeDeveloperController;
module.exports.updateDeveloper = updateDeveloperController;
module.exports.loginAsDeveloper = loginAsDeveloper;