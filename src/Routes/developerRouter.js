const express = require('express')


const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper , loginAsDeveloper, updateSkills} = require('../controllers/DeveloperController.js');
const {encrypt} = require('../Middlewares/EncryptPassword');
const { addListener } = require('../Model/developer.schema.js');
const router = express.Router()

router.get("/" , getAllDevelopers);

router.post("/" ,encrypt ,addDeveloper)

router.put("/:id" ,updateDeveloper)

router.delete("/:id", removeDeveloper)

router.post("/login" , loginAsDeveloper)

router.put("/skills/:id" , updateSkills)

module.exports = router;