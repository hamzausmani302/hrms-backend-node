const express =require('express');
const app = express()
const mongoose = require('mongoose')
const helmet = require("helmet");
const ProjectRouter = require('./src/Routes/projectRouter')

 

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(helmet())

app.use("/project",ProjectRouter);




main().then(response =>{
    console.log("connected to database")
}).catch(err => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
app.listen(3000 , ()=>{
    console.log("server started");
})