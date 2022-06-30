
const Developer = require('../Model/developer.schema');

const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper} = require('../Service/DeveloperService.js');
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


module.exports.addDeveloper = add_Developer;
module.exports.getAllDevelopers = getDevelopers;
module.exports.removeDeveloper = remove_Developer;
module.exports.updateDeveloper = update_Developer;
