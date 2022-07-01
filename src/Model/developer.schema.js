const mongoose = require("mongoose")

const validator = require("email-validator");

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
   },

   joiningDate : {
      type : Date ,
      default : Date.now()
   },

   email : {
      type : String , 
      minLength : 6,
      required :true,
      unique : true,
      validate: {
      validator: function(v) {
         return validator.validate(v);
      },
      message: 'Invalid email format'
    },
  
   },
   password : {
      type:String , 
      maxLength:200,
      minLength : 6,
      required : true
   }
},

)  

const Developer = mongoose.model("Developer", DeveloperSchema);



module.exports = Developer;