const express = require('express')
const router = express.Router()
const {addRole,updateRole,removeRole,getRole} = require('../controllers/rolesController.js')
const {use} = require('../Middlewares/CatchError');

router.get("/",getRole)
router.post("/" ,use(addRole))
router.put("/:id",updateRole)
router.delete("/:id",removeRole)

module.exports = router;