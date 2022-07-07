const express = require('express')
const router = express.Router()
const {addRole,updateRole,removeRole,getRole} = require('../controllers/rolesController.js')

router.get("/",getRole)
router.post("/" ,addRole)
router.put("/:id",updateRole)
router.delete("/:id",removeRole)

module.exports = router;