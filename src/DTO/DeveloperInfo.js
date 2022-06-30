module.exports.DeveloperInfo = (developer)=>{

    return {
        user : {
            name : developer.name,
            address : developer.address,
            designation : developer.designation,
            joiningDate : developer.joiningDate,
            email : developer.email,
        
        },
        token : developer.token
    }

}