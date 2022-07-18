
const { default: mongoose } = require('mongoose');
const Resource = require('../Model/resource.schema.js');
const { APIError, HTTP404Error } = require('../Utils/Error/CustomError.js');

const addResource = async (resource)=>{
    const result = await resource.save();   
    return result;
}
const getAllResources = async (filter)=>{
    const result = await Resource.find(filter);
    return result;
}

const searchResource = async (key)=>{
    const obj1 = await Resource.find({name:{'$regex' : key, '$options' : 'i'}});
    const obj2 = await Resource.find({'employmentStatus': key});
    const obj3 = await Resource.find({designation:{'$regex' : key, '$options' : 'i'}});

    if(obj1 || obj2 || obj3){
        let objRes = [];
        if(obj1)
            objRes.push(obj1);
        if(obj2)
            objRes.push(obj2);
        if(obj3)
            objRes.push(obj3);

        return objRes;
    }else{
        return "Resource not found!";
    }
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

const getAResource = async (filter)=>{
    const result = await Resource.findOne(filter);
    
    return result;
}

const getAResourceTest = async (filter)=>{
    const email = filter.email;
    console.log(email)
    const aggregation = [
        {
            "$match" : {
                email : email
            },
        },
        {
            "$lookup" : {
                from : "roles",
                localField : "roleId",
                foreignField : "_id",
                as : "newRole",
                pipeline : [
                    {
                       
                      "$project" : { __v : 0  }   
                    },
                   
            ]
            }
        },
        {   $unwind:"$newRole" },   
        

        {
            "$lookup" : {
                from  : "permissions",
                localField : "newRole.permissions",
                foreignField : "_id",
                as : "permission"
            }
        },
        {   "$unwind":"$permission" }, 
        // {
        //     "$project" : {
        //         _id :1,
        //         name : 1,
        //         address: 1,
        //         designation : 1,
        //         joiningDate : 1,
        //         email : 1,
        //         skills : 1,
        //         newRole : 1,
        //         permission : 1
        //     }
        // }
    ]
    const _resource =await  Resource.aggregate(aggregation)
   
    return _resource
   
}



const resourceOnBench = async(threshhold)=>{
    const result = await  Resource.find({"availability": { $lte: threshhold || 7}})
    return result
}
module.exports.addResource = addResource;
module.exports.getAllResources = getAllResources;
module.exports.updateResource = updateResource
module.exports.removeResource = removeResource;
module.exports.addSkills = addSkills;
module.exports.getAResource = getAResource;
module.exports.getAResourceTest = getAResourceTest;
module.exports.searchResource = searchResource;
module.exports.resourceOnBench = resourceOnBench;
