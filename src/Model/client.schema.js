const mongoose = require('mongoose');


const ClientSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength : 50,
        required: true,
    },
    organization : {
        type : String,
        maxLength : 30
    }
})


const Client = mongoose.model("Client" , ClientSchema)
module.exports = Client;