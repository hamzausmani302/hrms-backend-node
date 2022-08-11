const express = require('express')
const router = express.Router()
const {addRole,updateRole,removeRole,getRoles} = require('../controllers/roleController.js')
const {use} = require('../Middlewares/CatchError');

router.get("/",use(getRoles))
router.post("/" ,use(addRole))
router.put("/:id",use(updateRole))
router.delete("/:id",use(removeRole))

module.exports = router;