const mongoose = require("mongoose")



const ProjectSchema = mongoose.Schema({
    name : {
        type : String, 
        minLength : 4,
        required : true,
        maxLength : 50,
        unique : true
    },
    description : {
        type : String,
        maxLength : 100
    },
    createdAt : {
        type : Date,
        required:true,
        default : Date.now()
    },
    startingDate : {
        type :Date ,
        min : this.createdAt,
        

    },
    dueDate : {
        type : Date ,
        min : this.startingDate

    },
    developersOnProject : {
        type : [mongoose.Types.ObjectId]
    },
    teamLead : {
        type : mongoose.Types.ObjectId,
       
    },
    status : {
        type : String,
        enum : {
            values :  ['Assigned' , "Ongoing" , "Completed"],
            message : "Unacceptable values provided"
        }
    },
    priority : {
        type : Number ,
        default : 1
    },
    clientId :{
        type : mongoose.Types.ObjectId,

    } ,
    progress : {
        type : Number,
        default : 0
    }


})  

const Project = mongoose.model("Project", ProjectSchema);



module.exports = Project;