const mongoose = require("mongoose")



const AdministratorSchema = mongoose.Schema({
    name : {
        type : String ,
        maxLength :50,
        required:true,

    },
    address : {
        type : String , 
        maxLength : 100,
        
    },
   
    email : {
        type : String , 
        required : true,
        unique : true,
        minLength :6 
    },
    password : {
        type : String , 
        required : true,
        maxLength : 100
    },
    joiningDate : {
        type : Date, 
          
    },
    rights : {
        addAdmin : {type : Boolean , default : false },
        addDevelopers: {type : Boolean , default : false },
        addProject : {type : Boolean , default : false },
        removeProject : {type : Boolean , default : false },
        updateProject : {type : Boolean , default : false },
        removeAdmin : {type : Boolean , default : false }

    }



})  

const Administrator= mongoose.model("Administrator", AdministratorSchema);



module.exports = Administrator;