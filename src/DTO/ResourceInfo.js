module.exports.ResourceInfo = (resource)=>{

    return {
        user : {
            name : resource.name,
            address : resource.address,
            designation : resource.designation,
            joiningDate : resource.joiningDate,
            email : resource.email,
            
        },
            token : resource.token
        }
    
}   