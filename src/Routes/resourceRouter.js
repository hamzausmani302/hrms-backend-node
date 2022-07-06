const express = require('express')


const {addResource , getAllResources , updateResource , removeResource , loginAsResource, updateSkills} = require('../controllers/ResourceController');
const {encrypt} = require('../Middlewares/EncryptPassword');

const {use} = require('../Middlewares/CatchError');



const router = express.Router()

router.get("/" , getAllResources);

router.post("/" ,encrypt ,addResource)

router.put("/:id" ,updateResource)

router.delete("/:id", removeResource)

router.post("/login" , loginAsResource)

router.put("/skills/:id" , updateSkills)

module.exports = router;