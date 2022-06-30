const express = require('express')

const {addProject , getAllProjects , updateProject , removeProject, addDeveloperToProject, removeDeveloperFromProject} = require('../controllers/ProjectController.js');

const router = express.Router()

router.get("/" , getAllProjects);

router.post("/" ,addProject)

router.put("/:id" ,updateProject)

router.delete("/:id" ,removeProject)

router.put("/addDev/:id" , addDeveloperToProject);

router.put("/removeDev/:id" , removeDeveloperFromProject);

module.exports = router;