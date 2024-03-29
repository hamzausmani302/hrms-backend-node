const Project = require('../Model/project.schema.js');

const addProject = async (project)=>{
    const result = await project.save();   
    return result;
}

const getAllProjects = async (filter)=>{
    const result = await Project.find(filter);
    return result;
}

const searchProject = async (key)=>{
    try{
        const objRes = await Project.find( { $or: [ {name:{'$regex' : key, '$options' : 'i'}},  {description:{'$regex' : key, '$options' : 'i'}} ] });
        return objRes;
    }catch(err){
        return "Project not found!";
    }
}

const updateProject = async (id , newProject)=>{
    const updatedResult = await Project.findOneAndUpdate({_id : id} , newProject , {new:true});
    return updatedResult;
}

const removeProject = async (id)=>{
    const deletedResult = await Project.findOneAndDelete({_id : id});
    return deletedResult;
}

const addDeveloperToProject = async(projId, id)=>{
    const addedResult = await Project.findOneAndUpdate({_id : projId}, {$push: { developersOnProject: id }}, {new:true});
    return addedResult;
}

const removeDev_Project = async(projId, id)=>{
    const deletedResult = await Project.findOneAndUpdate({_id : projId}, {$pull: { developersOnProject: id }}, {new:true});
    return deletedResult;
}

const getDevelopersfromIdMultiple = async (ids)=>{
    const aggregation = [
        { 
            "$project": {               
                "name" : 1,
                "description" : 1,
                "status" : 1,
                "progress" : 1,
                "createdAt" : 1,
                "startingDate" : 1,
                "dueDate" : 1,
                "progress" :1, 
                "priority" : 1,
                "clientId":1,
                "resourcesOnProject": { "$ifNull" : [ "$resourcesOnProject", null ] } 
            }
        },
        {
            "$lookup": {
                "from": "clients",
                "localField": "clientId",
                "foreignField": "_id",
                "as": "client",
                // "pipeline": [
                   
                //     { "$project": { "_id": 1 , "__v" : 0, "password" : 0 }}
                //   ],
                
            }
        },


        {
           "$unwind": {
               "path": "$resourcesOnProject",
               "preserveNullAndEmptyArrays": true
            }
        },    
        {
            "$lookup": {
                "from": "resources",
                "localField": "resourcesOnProject",
                "foreignField": "_id",
                "as": "resourcesOnProject",
                // "pipeline": [
                   
                //     { "$project": { "_id": 1 , "__v" : 0, "password" : 0 }}
                //   ],
                
            }
        },
       
        


       {
        "$group" : {
            "_id" : "$_id",
            "name" : {"$first" : "$name"},
            "description" : {"$first" : "$description"},
            "createdAt" : {"$first" : "$createdAt"},
            "startingDate" : {"$first" : "$startingDate"},
            "dueDate" : {"$first" : "$dueDate"},
            "status" : {"$first" : "$status"},
            "priority" : {"$first" : "$priority"},
            "resourcesOnProject" : {"$push" : "$resourcesOnProject"},
            "clientId" : {"$first" : "$clientId" },
            "client" : {"$first" : "$client"}
        }
       }
    
    ]
       
    const result = await Project.aggregate(aggregation);
    console.log(result);
    return result;
}

const getNumberOfProjects = async(clientId) =>{
    const result = await Project.find({clientId : clientId});
    console.log(clientId)
    
    return result;
}

module.exports.removeDeveloper_Project = removeDev_Project;
module.exports.addDeveloper_Project = addDeveloperToProject;
module.exports.addProject = addProject;
module.exports.getAllProjects = getAllProjects;
module.exports.updateProject = updateProject;
module.exports.removeProject = removeProject;
module.exports.searchProject = searchProject;
module.exports.getProjectWithDevelopers = getDevelopersfromIdMultiple;
module.exports.getNumberOfProjects = getNumberOfProjects;
