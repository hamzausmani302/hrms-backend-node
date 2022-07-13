const express = require('express')


const {TEST, forgotPassword , addResource , getAllResources , updateResource , removeResource , loginAsResource, updateSkills} = require('../controllers/ResourceController');
const {encrypt} = require('../Middlewares/EncryptPassword');
const {getUserMiddleWare} = require("../Middlewares/getUser");
const {use} = require('../Middlewares/CatchError');



const router = express.Router()

router.get("/" , use(getAllResources));

router.post("/" ,encrypt ,use(addResource))

router.put("/:id" ,use(updateResource))

router.delete("/:id", use(removeResource))

router.post("/login" , use(loginAsResource))

router.put("/skills/:id" , use(updateSkills))

router.post("/recover-password" , use(getUserMiddleWare) ,use(forgotPassword) )




module.exports = router