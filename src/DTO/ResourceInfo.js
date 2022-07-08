module.exports.ResourceInfo = (resource)=>{

    return {
        user : {
            name : resource.name,
            address : resource.address,
            designation : resource.designation,
            joiningDate : resource.joiningDate,
            email : resource.email,
            skills : resource.skills,
            myRole : resource.newRole,
            permissions : resource.permission
        },
            token : resource.token
        }
    
}   