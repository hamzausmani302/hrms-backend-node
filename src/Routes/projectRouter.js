const express = require('express')
const router = express.Router()
const { getAllProjectInfo, addProject, getAllProjects, updateProject, removeProject, addDeveloperToProject, removeDeveloperFromProject, getProjectByKeyword } = require('../controllers/ProjectController.js');

//middlewares for checking authorize user
const { authorizeUserMiddleWare } = require('../Middlewares/auth');
const { getPermissionById } = require('../Middlewares/getPermissionById');
const { Authorizer } = require('../Middlewares/Authorizer');
const { use } = require('../Middlewares/CatchError');

router.get("/", use(getPermissionById), use(Authorizer.AuthReadProject),
    use(authorizeUserMiddleWare), use(getAllProjects));        //get projects

router.post("/", use(getPermissionById), use(Authorizer.AuthCreateProject),
    use(authorizeUserMiddleWare), use(addProject))             // add projects

router.put("/:id", use(getPermissionById), use(Authorizer.AuthUpdateProject),
    use(authorizeUserMiddleWare), use(updateProject))          // update projects

router.delete("/:id", use(getPermissionById), use(Authorizer.AuthRemoveProject),
    use(authorizeUserMiddleWare), use(removeProject))          // delete projects 

router.put("/addDev/:id", use(getPermissionById), use(Authorizer.AuthUpdateProject),
    use(authorizeUserMiddleWare), use(addDeveloperToProject));    // add resources on projects

router.put("/removeDev/:id", use(getPermissionById), use(Authorizer.AuthRemoveProject),
    use(authorizeUserMiddleWare), use(removeDeveloperFromProject)) //remove resource on projects

router.get("/all", use(getPermissionById), use(Authorizer.AuthReadProject),
    use(authorizeUserMiddleWare), use(getAllProjectInfo));  //get all information of projects eg: resources,clients

router.get('/search', use(getPermissionById), use(Authorizer.AuthReadProject),        //get projects by search keywords
    use(authorizeUserMiddleWare), use(getProjectByKeyword));   //by query: localhost.../search?key= xyz

module.exports = router;