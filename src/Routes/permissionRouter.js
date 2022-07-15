const express = require('express')

const {getAllPermissions, addPermissions, updatePermission, removePermission} = require('../controllers/PermissionController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()

router.get("/" , use(getAllPermissions)).post("/" ,use(addPermissions));
router.put("/:id" ,use(updatePermission)).delete("/:id" , use(removePermission));

module.exports = router;