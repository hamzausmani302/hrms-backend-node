
const { MongooseError } = require('mongoose');
const Project = require('../Model/project.schema');
const {getProjectWithDevelopers, searchProject, addProject , getAllProjects , updateProject , removeProject ,addDeveloper_Project, removeDeveloper_Project} = require('../Service/ProjectService.js');
const { APIError , HTTP400Error, HTTP404Error } = require('../Utils/Error/CustomError');
const HttpStatusCode = require('../Utils/Error/HttpStatusCode');

const getProjectByKeyword = async (req, res, next) =>{
    const {key} = req.query;

    const result = await searchProject(key);
    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result});
}

const addProjectController = async (req,res)=>{ 
    const {name ,description , startingDate , dueDate ,teamLead ,  status  , progress, clientId } = req.body;
    const project = new Project({
        name : name , 
        description:description,
        
        startingDate : startingDate , 
        dueDate : dueDate ,
        status : status,
        progress : progress,
        clientId : clientId,
        teamLead : teamLead
    });
  
    const result = await addProject(project).catch(err=>{
        // console.log(err.message);
        throw new APIError("ValidationError" , HttpStatusCode.BAD_REQUEST , true , err.message);
    })
    
    res.status(201).send(result);
}

const updateProjectController = async (req, res)=>{
    const {id} = req.params;
    const {updates} = req.body;
    const updatedUser = await updateProject(id , updates).catch(err=>{
       throw new APIError("DatabaseError" , 500 , true , err.message);
    });
    if(!updatedUser){
        throw new HTTP404Error("Porject not found. Cannot update");
    }
        res.status(200).json(updatedUser);    
}

const removeProjectController = async (req, res)=>{
    const {id} = req.params;
   
        
    const result = await removeProject(id).catch(err=>{
        const error =  new Error("Invalid Identifier")
        error.statusCode = 400;
        throw error;
    })
    if(!result){
        const error =  new Error("Resource not Found")
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(result);
    
      
    
}

const getProjectsController = async (req, res)=>{
    const filter = req.query;
   
        const result = await getAllProjects(filter).catch(err=>{
            const error = new Error(err.message);
            error.statusCode = 404
            throw error;
        });
        res.status(200).json(result);
    
}

const addDeveloperToProject = async (req, res)=>{
    const {id:projid} = req.params;
    const {developerId:devId} = req.body;
   
    const addedResult = await addDeveloper_Project(projid, devId).catch(err=>{
        const error = new Error(err.message);
        error.statusCode = 202
        throw error;
    });
    res.status(200).json(addedResult);
}

const removeDeveloperFromProject = async (req, res)=>{
    const {id:projid} = req.params;
    const {developerId:devId} = req.body;
    
    const removedResult = await removeDeveloper_Project(projid, devId).catch(err=>{
        const error = new Error(err.message);
        error.statusCode = 404
        throw error;
    });
    res.status(200).json(removedResult);
    
}

const getAllProjectInfo = async (req,res)=>{
        const allProjects = await getProjectWithDevelopers([]).catch(err=>{
            const error = new Error(err.message);
            error.statusCode = 404
            throw error;
        })
        res.status(200).json(allProjects);
    
}

module.exports.removeDeveloperFromProject = removeDeveloperFromProject;
module.exports.addDeveloperToProject = addDeveloperToProject;
module.exports.addProject = addProjectController;
module.exports.getAllProjects = getProjectsController;
module.exports.removeProject = removeProjectController;
module.exports.updateProject = updateProjectController;
module.exports.getAllProjectInfo = getAllProjectInfo;
module.exports.getProjectByKeyword = getProjectByKeyword;