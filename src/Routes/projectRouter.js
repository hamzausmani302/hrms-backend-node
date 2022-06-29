const express = require('express')
const Project = require('../Model/project.schema');

const {addProject , getAllProjects , updateProject , removeProject} = require('../Service/ProjectService.js');

const router = express.Router()

router.get("/" , async (req,res)=>{
    const filter = req.query;
    const result = await getAllProjects(filter);
    res.json(result);
} )

router.post("/" , async (req,res)=>{
    
    const {name ,description , startingDate , dueDate , status , progress  } = req.body;
    const project = new Project({
        name : name , 
        description:description,
        startingDate : startingDate , 
        dueDate : dueDate ,
        status : status,
        progress : progress
    });

    try{
        const result = await addProject(project)
        res.send(result);
    }catch(err){
        res.send({error : err})
    }

})

router.put("/:id" ,async (req,res)=>{
    const id = req.params.id;
    const user = req.body.user;
    const updatedUser = await updateProject(id , user);
    res.json(updatedUser);
})

router.delete("/:id" , async (req,res)=>{
    const id = req.params.id;
    const result = await removeProject(id)
    res.json(result);
})


module.exports = router;