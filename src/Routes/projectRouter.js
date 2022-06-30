const express = require('express')

const {addProject , getAllProjects , updateProject , removeProject} = require('../controllers/ProjectController.js');

const router = express.Router()

router.get("/" , getAllProjects);

router.post("/" ,addProject)

router.put("/:id" ,updateProject)

router.delete("/:id" ,removeProject)


module.exports = router;