const express = require('express')

const {getAllProjectInfo , addProject , getAllProjects , updateProject , removeProject, addResourcesToProjectController, removeResourceFromProject, getProjectByKeyword} = require('../controllers/ProjectController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()



router.get("/" , use(getAllProjects));

router.post("/" ,use(addProject))

router.put("/:id" ,use(updateProject))

router.delete("/:id" ,use(removeProject))

router.put("/addRes/:id" , use(addResourcesToProjectController));

router.put("/removeRes/:id" , use(removeResourceFromProject));

router.get("/all" ,use(getAllProjectInfo));

router.get('/search', use(getProjectByKeyword));      //by query: localhost.../search?key= xyz

module.exports = router;