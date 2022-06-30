
const Developer = require('../Model/developer.schema');
const {AUTHENTICATE_HASH , HASH_PASSWORD} = require('../Utils/Encryption');
const {JWT_SIGN , JWT_VERIFY} =  require('../Utils/Authentication');

const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper} = require('../Service/DeveloperService.js');
const {DeveloperInfo} = require('../DTO/DeveloperInfo');


const add_Developer = async (req,res)=>{

    
    const {name , address ,designation ,  joiningDate ,email, password   } = req.body;
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

const update_Developer = async (req, res)=>{
    const id = req.params.id;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateDeveloper(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const remove_Developer = async (req, res)=>{
    const id = req.params.id;
    try{
    const result = await removeDeveloper(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getDevelopers = async (req, res)=>{
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
            email : email ,
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
            
                return res.json(DeveloperInfo(_dev));

            }else{
                return res.status(403).json({error : "Incorrect username or password"});
            
            }

        }
        return res.status(404).json({error  : "No record found"});
        
        

    }catch(err){
        console.log(err);
        res.status(404).json({error  : err});
        
    }
}

module.exports.addDeveloper = add_Developer;
module.exports.getAllDevelopers = getDevelopers;
module.exports.removeDeveloper = remove_Developer;
module.exports.updateDeveloper = update_Developer;
module.exports.loginAsDeveloper = loginAsDeveloper;
