const express = require('express')
const router = express.Router()
const {addRole,updateRole,removeRole,getRole} = require('../controllers/roleController.js')
const {use} = require('../Middlewares/CatchError');

router.get("/",use(getRole))
router.post("/" ,use(addRole))
router.put("/:id",use(updateRole))
router.delete("/:id",use(removeRole))

module.exports = router;