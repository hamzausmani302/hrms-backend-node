
const Admin = require('../Model/administrator.schema');

const {addAdmin , getAllAdmin , updateAdmin , removeAdmin} = require('../Service/AdminServices');
const addAdminController = async (req,res)=>{
     console.log(req.body);
    const {name ,email , password , address , joiningDate , rights  } = req.body;
    const admin = new Admin({
        name : name , 
        email:email,
        password : password,
        joiningDate : joiningDate, 
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

// const addDeveloper_ProjectController = async (req, res)=>{ 
//     const {devId} = req.params;

//     const addedDeveloper_project = await addDeveloperToproject(devId)
//     try{
//         res.json(addedDevloper_project);
//     }catch(err){
//         res.status(400).json({error : err});    //400 = project doesn't exist
//     }
// }

const updateAdminController = async (req, res)=>{
    const {id} = req.params;
    const updates = req.body.updates;
    try{
        const updatedAdmin = await updateAdmin(id , updates);
        res.json(updatedAdmin);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const removeAdminController = async (req, res)=>{
    const {id} = req.params;
    try{
    const result = await removeAdmin(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getAdminController = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllAdmin(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

module.exports.addAdmin = addAdminController;
module.exports.updateAdmin = updateAdminController;
module.exports.removeAdmin = removeAdminController;
module.exports.getAdmin = getAdminController;
// module.exports.addDeveloper_Project = addDeveloper_ProjectController;
