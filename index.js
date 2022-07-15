const express =require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require('mongoose')
const helmet = require("helmet");
const dotenv = require("dotenv")

const {ErrorHandler} = require("./src/Utils/ErrorHandler");
dotenv.config()


const ProjectRouter = require('./src/Routes/projectRouter')
const ResourceRouter = require('./src/Routes/resourceRouter')
const clientRouter = require('./src/Routes/clientRouter');
const permissionRouter = require('./src/Routes/permissionRouter');
const roleRouter = require('./src/Routes/roleRouter')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())       //for security headers 



app.use("/project",ProjectRouter);
app.use("/resource" , ResourceRouter);
app.use("/client", clientRouter);
app.use("/permission" , permissionRouter);
app.use("/role",roleRouter)
app.use(async (err, req, res, next) => {
    console.log("caught")
    const errorObj = ErrorHandler(err);
    res.status(errorObj.status).send({"error" : errorObj.message});
});

app.get("/" , (req,res)=>{
    res.send("In Development Phase")
})


main().then(response =>{
    console.log("connected to database")
}).catch(err => {
    console.log(err)
    
});


async function getType(){
    if(process.env.ENVTYPE=="production"){
        return process.env.LIVE_LINK;
    }

    return process.env.TEST_LINK;
}
async function main() {

    const DB_URI = await getType();
    console.log(DB_URI)
   
    await mongoose.connect(DB_URI);
}
// mongodb://localhost:27017/test
//mongodb+srv://hamza:hamza@cluster0.zi0ab.mongodb.net/test?retryWrites=true&w=majority
app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server started");
})