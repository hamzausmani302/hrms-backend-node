const express =require('express');
const Project = require('./src/Model/project.schema');
const Client=  require('./src/Model/client.schema');
const Adminsitrator = require('./src/Model/administrator.schema');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.post("/" , (req,res)=>{
    const {name , organization  } = req.body;
    const client = new Client({name , organization});

    res.send(client);
})



app.listen(3000 , ()=>{
    console.log("server started");
})