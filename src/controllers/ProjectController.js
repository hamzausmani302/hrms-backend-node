
const Project = require('../Model/project.schema');

const {getProjectWithDevelopers,addProject , getAllProjects , updateProject , removeProject ,addDeveloper_Project, removeDeveloper_Project} = require('../Service/ProjectService.js');
const add_project = async (req,res)=>{
     
    const {name ,description , startingDate , dueDate , status , progress  } = req.body;
    const project = new Project({
        name : name , 
        description:description,
        startingDate : startingDate , 
        dueDate : dueDate ,
        status : status,
        progress : progress
    });

    try{
        const result = await addProject(project)
        res.send(result);
    }catch(err){
        res.status(400).send({error : err})
    }

}

const update_project = async (req, res)=>{
    const id = req.params.id;
    const updates = req.body.updates;
    try{
        const updatedUser = await updateProject(id , updates);
        res.json(updatedUser);    
    }catch(err){
        res.status(400).json({error : err})
    }
    
}

const remove_project = async (req, res)=>{
    const id = req.params.id;
    try{
    const result = await removeProject(id)
    
    res.json(result);
    }catch(err){
        res.status(404).json({error : err})
    }
}

const getProjects = async (req, res)=>{
    const filter = req.query;
    try{
        const result = await getAllProjects(filter);
        res.json(result);
    }catch(err){
        res.status(404).json({error : err});
    }
}

const addDeveloperToProject = async (req, res)=>{
    const projid = req.params.id;
    const devId = req.body.developerId;
    try{
        const addedResult = await addDeveloper_Project(projid, devId);
        res.json(addedResult);
    }catch(err){
        res.status(404).json({error : err});            //no such ID exists
    }
}

const removeDeveloperFromProject = async (req, res)=>{
    const projid = req.params.id;
    const devId = req.body.developerId;
    try{
        const removedResult = await removeDeveloper_Project(projid, devId);
        res.json(removedResult);
    }catch(err){
        res.status(404).json({error : err});            //no such ID exists
    }
}

const getAllProjectInfo = async (req,res)=>{
    try{
        const allProjects = await getProjectWithDevelopers([])
        res.json(allProjects);
    }catch(err){
        res.status(404).json({error : err});            //no such ID exists
    }
}


module.exports.removeDeveloperFromProject = removeDeveloperFromProject;
module.exports.addDeveloperToProject = addDeveloperToProject;
module.exports.addProject = add_project;
module.exports.getAllProjects = getProjects;
module.exports.removeProject = remove_project;
module.exports.updateProject = update_project;
module.exports.getAllProjectInfo = getAllProjectInfo;