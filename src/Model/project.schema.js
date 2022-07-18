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
        maxLength : 500
    },

    createdAt : {
        type : Date,
        required:true,
        default : Date.now()
    },
    startingDate : {
        type :Date ,
        validate: {
            validator: function(v) {
              return this.startingDate > this.createdAt;
            },
            message: 'Starting date should be smaller'
          },
    },

    dueDate : {
        type : Date ,
        validate: {
            validator: function(v) {
              return this.dueDate > this.startingDate;
            },
            message: 'Starting date must be smaller than dueDate'
          },
        

    },

    resourcesOnProject : {
        type : [mongoose.Types.ObjectId]
    },

    teamLead : {
        type : mongoose.Types.ObjectId,
       
    },

    status : {
        type : String,
        enum : {
            values :  ['ASSIGNED' , "ONGOING" , "COMLETED" , "CANCELLED"],
            message : "Unacceptable values provided"
        },
        default:"ASSIGNED"
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
ProjectSchema.virtual('NumberOfDevelopers').get(function(){
    this.totalDevelopers =  this.developersOnProject.length;
    return this.totalDevelopers
})
const Project = mongoose.model("Project", ProjectSchema);



module.exports = Project;