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

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())
app.use(helmet())       //for security headers 



app.use("/project",ProjectRouter);
app.use("/resource" , ResourceRouter);
app.use("/client", clientRouter);
app.use("/permission" , permissionRouter);

app.use(async (err, req, res, next) => {
    ErrorHandler(err);
});

app.get("/" , (req,res)=>{
    res.send("In Development Phase")
})


main().then(response =>{
    console.log("connected to database")
}).catch(err => {
    console.log(err)
    
});
async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}
// mongodb://localhost:27017/test
//mongodb+srv://hamza:hamza@cluster0.zi0ab.mongodb.net/test?retryWrites=true&w=majority
app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server started");
})