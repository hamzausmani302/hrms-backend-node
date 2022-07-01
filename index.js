const express =require('express');
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const helmet = require("helmet");
const dotenv = require("dotenv")

dotenv.config()


const ProjectRouter = require('./src/Routes/projectRouter')
const DeveloperRouter = require('./src/Routes/developerRouter')
const AdminRouter = require('./src/Routes/adminRouter');
const clientRouter = require('./src/Routes/clientRouter');


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())       //for security headers 



app.use("/project",ProjectRouter);
app.use("/developer" , DeveloperRouter);





app.use("/client", clientRouter);
app.use("/administrator" , AdminRouter);

app.get("/" , (req,res)=>{
    res.send("In Development Phase")
})


main().then(response =>{
    console.log("connected to database")
}).catch(err => {
    console.log(err)
});
async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.b1kww.mongodb.net/test
  `);
}
// mongodb://localhost:27017/test
app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server started");
})