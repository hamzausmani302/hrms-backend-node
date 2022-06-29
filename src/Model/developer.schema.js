const mongoose = require("mongoose")



const DeveloperSchema = mongoose.Schema({
   name : {
    type : String , 
    required: true,
    maxLength : 40
   },
   address : {
    type : String , 
    maxLength : 100
   },
   designation : {
    type :String ,
    maxLength : 30,
    required: true
   } ,
   joiningDate : {
    type : Date ,
    max: Date.now()
   },
   email : {
    type : String , 
    minLength : 6,
    required :true 
   },
   password : {
      type:String , 
      maxLength: 100,
      minLength : 6,
      required : true
   },


})  

const Developer = mongoose.model("Developer", DeveloperSchema);



module.exports = Developer;