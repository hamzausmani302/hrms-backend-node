const express = require('express')


const {addDeveloper , getAllDevelopers , updateDeveloper , removeDeveloper} = require('../controllers/DeveloperController.js');

const router = express.Router()

router.get("/" , getAllDevelopers);

router.post("/" ,addDeveloper)

router.put("/:id" ,updateDeveloper)

router.delete("/:id" ,removeDeveloper)


module.exports = router;