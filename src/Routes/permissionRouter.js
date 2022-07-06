const express = require('express')

const {getAllPermissions, addPermission, updatePermission, removePermission} = require('../controllers/PermissionController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()

router.get("/" , use(getAllPermissions)).post("/" ,use(addPermission));
router.put("/:id" ,use(updatePermission)).delete("/:id" , use(removePermission));

module.exports.router = router;