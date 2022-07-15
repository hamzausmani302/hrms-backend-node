const express = require('express')


const {TEST , addResource , getAllResources , updateResource , removeResource , loginAsResource, updateSkills} = require('../controllers/ResourceController');
const {encrypt} = require('../Middlewares/EncryptPassword');

const {use} = require('../Middlewares/CatchError');



const router = express.Router()

router.get("/" , use(getAllResources));

router.post("/" ,encrypt ,use(addResource))

router.put("/:id" ,use(updateResource))

router.delete("/:id", use(removeResource))

router.post("/login" , use(loginAsResource))

router.put("/skills/:id" , use(updateSkills))





module.exports = router