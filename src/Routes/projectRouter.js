const express = require('express')

const {getAllProjectInfo , addProject , getAllProjects , updateProject , removeProject, addDeveloperToProject, removeDeveloperFromProject} = require('../controllers/ProjectController.js');

const router = express.Router()

const use = (fn)=>(req  ,res, next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}


router.get("/" , use(getAllProjects));

router.post("/" ,use(addProject))

router.put("/:id" ,use(updateProject))

router.delete("/:id" ,use(removeProject))

router.put("/addDev/:id" , use(addDeveloperToProject));

router.put("/removeDev/:id" , use(removeDeveloperFromProject));

// router.get("/testError" , use((req,res)=>{throw new Error("error1 ")}))
router.get("/all" ,getAllProjectInfo);
module.exports = router;