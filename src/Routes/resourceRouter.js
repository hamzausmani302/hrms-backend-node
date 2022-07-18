const express = require('express')


const {TEST, forgotPassword , addResource , getAllResources , updateResource , removeResource , loginAsResource, updateSkills, verifyPassword, changeForgottenPassword, getResourceByKeyword} = require('../controllers/ResourceController');
const {encrypt} = require('../Middlewares/EncryptPassword');
const {getUserMiddleWare} = require("../Middlewares/getUser");
const {sendMail} = require("../Utils/Mailer");
const {getTokenMiddleWare} = require('../Middlewares/getToken');
const {checkIdMiddleWare}  = require('../Middlewares/checkIdMiddleWare');
const {use} = require('../Middlewares/CatchError');
const { APIError, HTTP400Error } = require('../Utils/Error/CustomError');



const router = express.Router()

router.get("/" , use(getAllResources));

router.post("/" ,encrypt ,use(addResource))

router.put("/:id" ,use(updateResource))

router.delete("/:id", use(removeResource))

router.post("/login" , use(loginAsResource))

router.put("/skills/:id" , use(updateSkills))

router.post("/recover-password" , use(getUserMiddleWare) ,use(forgotPassword) )

router.post("/verify/:id" , use(getTokenMiddleWare) , use(verifyPassword)) 

router.post("/new-password/:id" , use(checkIdMiddleWare) , use(changeForgottenPassword))

router.get('/search', getResourceByKeyword);      //by query: localhost.../search?key= xyz

module.exports = router