const express = require('express')

const {getAllProjectInfo , addProject , getAllProjects , updateProject , removeProject, addDeveloperToProject, removeDeveloperFromProject} = require('../controllers/ProjectController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()



router.get("/" , use(getAllProjects));

router.post("/" ,use(addProject))

router.put("/:id" ,use(updateProject))

router.delete("/:id" ,use(removeProject))

router.put("/addDev/:id" , use(addDeveloperToProject));

router.put("/removeDev/:id" , use(removeDeveloperFromProject));

router.get("/all" ,use(getAllProjectInfo))
module.exports = router;