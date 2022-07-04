
const { MongooseError } = require('mongoose');
const Project = require('../Model/project.schema');
const {getProjectWithDevelopers,addProject , getAllProjects , updateProject , removeProject ,addDeveloper_Project, removeDeveloper_Project} = require('../Service/ProjectService.js');

const addProjectController = async (req,res)=>{
     
    const {name ,description , startingDate , dueDate , status , progress  } = req.body;
    const project = new Project({
        name : name , 
        description:description,
        startingDate : startingDate , 
        dueDate : dueDate ,
        status : status,
        progress : progress
    });

  
    const result = await addProject(project).catch(err=>{
        const error = new Error(err.message)
        error.statusCode = 202;
        throw error;
    })
    
    res.status(201).send(result);
    
    

}

const updateProjectController = async (req, res)=>{
    const {id} = req.params;
    const {updates} = req.body;
    const updatedUser = await updateProject(id , updates).catch(err=>{
       const error = new Error(err.message);
        error.statusCode = 202
        throw error;
    });
    if(!updatedUser){
        const error =  new Error("Resource not Found")
        error.statusCode = 404;
        throw error;
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