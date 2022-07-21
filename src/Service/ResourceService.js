
const Resource = require('../Model/resource.schema.js');

const addResource = async (resource)=>{
    const result = await resource.save();   
    return result;
}
const getAllResources = async (filter)=>{
    const result = await Resource.find(filter);
    return result;
}

const updateResource = async (id , newResource)=>{
    const updatedResult = await Resource.findOneAndUpdate({_id : id} , newResource , {new:true});
    return updatedResult
}

const removeResource = async (id)=>{
    const deletedResult = await Resource.findOneAndDelete({_id : id});
    return deletedResult;
}
const addSkills = async(id, updates) =>{
    const {skills} = updates;
    const addedResult = await Resource.findOneAndUpdate({_id : id},  {$push: { skills: skills }}, {new:true});
    return addedResult;
}






// aggregation pipeline

const getResourcefromIdMultiple = async (ids)=>{
    const aggregation = [
        { 
            "$project": {               
                "name" : 1,
                "address":1,
                "designation" : 1,
                "joiningDate":1,
                "email":1,
                "password":1,
                "skills":1,
                "employmentStatus":1,
                
                // "role": { "$ifNull" : [ "$developersOnProject", [ ] ] } 
            }
        },
        {
            "$lookup": {
                "from": "Role",
                "localField": "roleId",
                "foreignField": "_id",
                "as": "Role",
                "pipeline": [
                   
                    { "$project": { "_id": 1 , "__v" : 0, "password" : 0 }}
                  ],
                
            }
        },
       {
        "$group" : {
            "_id" : "$_id",
            "name" : {"$first" : "$name"},
            "address" : {"$first" : "$address"},
            "designation" : {"$first" : "$designation"},
            "joiningDate" : {"$first" : "$joiningDate"},
            "dueDate" : {"$first" : "$dueDate"},
            "email" : {"$first" : "$email"},
            "skills" : {"$first" : "$skills"},
            "employmentStatus" : {"$first" : "$employmentStatus"},
            "Role" : {"$push" : "$Role"},

        }
       }
    
    ]
       
    
    const result = await Project.aggregate(aggregation);
    console.log(result);
    return result;
}




module.exports.addResource = addResource;
module.exports.getAllResources = getAllResources;
module.exports.updateResource = updateResource
module.exports.removeResource = removeResource;
module.exports.addSkills = addSkills;
module.exports.getResourceWithRole = getResourcefromIdMultiple;