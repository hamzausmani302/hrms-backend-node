const express = require('express')


const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper , loginAsDeveloper} = require('../controllers/DeveloperController.js');
const {encrypt} = require('../Middlewares/EncryptPassword');
const router = express.Router()

router.get("/" , getAllDevelopers);

router.post("/" ,encrypt ,addDeveloper)

router.put("/:id" ,updateDeveloper)

router.delete("/:id" ,removeDeveloper)

router.post("/login" , loginAsDeveloper)

module.exports = router;