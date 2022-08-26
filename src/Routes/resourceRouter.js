const express = require('express')
const router = express.Router()
const { forgotPassword , addResource , getAllResources , updateResource , removeResource , loginAsResource, updateSkills, verifyPassword, changeForgottenPassword, getResourceByKeyword , getResourceOnBench, getProjectsOfResourcesController} = require('../controllers/ResourceController');

//middlewares for checking authorize user
const {encrypt} = require('../Middlewares/EncryptPassword');
const {getUserMiddleWare} = require("../Middlewares/getUser");
const {getTokenMiddleWare} = require('../Middlewares/getToken');
const {checkIdMiddleWare}  = require('../Middlewares/checkIdMiddleWare');
const {use} = require('../Middlewares/CatchError');
const { authorizeUserMiddleWare } = require('../Middlewares/auth');
const { getPermissionById } = require('../Middlewares/getPermissionById');
const { Authorizer } = require('../Middlewares/Authorizer');
const { checkTokenExistence } = require('../Middlewares/checkTokenExistence');


router.get("/",use(getPermissionById),use(Authorizer.AuthReadResources),
 use(authorizeUserMiddleWare),use(getAllResources));   //get resource

router.post("/",use(getPermissionById),use(Authorizer.AuthCreateResources),
encrypt,use(addResource))                              //create resource

router.put("/:id",use(Authorizer.AuthUpdateResources), //update resource
use(updateResource))

router.delete("/:id",use(Authorizer.AuthRemoveResources), //remove resource
 use(removeResource))

router.post("/login", use(loginAsResource))             //login resource

router.put("/skills/:id",use(Authorizer.AuthUpdateResources), //update skills of resource 
 use(updateSkills))

router.post("/recover-password", use(checkTokenExistence), //recover password
use(getUserMiddleWare), use(forgotPassword))

router.post("/verify/:id", use(getTokenMiddleWare), use(verifyPassword)) //check with recover code 

router.post("/new-password/:id", use(checkIdMiddleWare) , use(changeForgottenPassword)) //new password 

router.get('/onbench',use(Authorizer.AuthReadResources),use(getResourceOnBench)) //get resource on bench

router.get('/search',use(getPermissionById),use(Authorizer.AuthGetResources),
 use(authorizeUserMiddleWare),use(getResourceByKeyword));      //by query: localhost.../search?key= xyz

router.get('/projects/:id' ,use(getPermissionById),use(Authorizer.AuthGetResources),
 use(authorizeUserMiddleWare),use(getProjectsOfResourcesController) ) //get resource on projects

module.exports = router


