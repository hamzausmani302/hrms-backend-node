const express = require('express')
const router = express.Router()
const { getAllPermissions, addPermissions, updatePermission, removePermission } = require('../controllers/PermissionController.js');
//middlewares for checking authorize user
const { use } = require('../Middlewares/CatchError');
const { authorizeUserMiddleWare } = require('../Middlewares/auth');
const { getPermissionById } = require('../Middlewares/getPermissionById');
const { Authorizer } = require('../Middlewares/Authorizer');


router.get("/", use(getPermissionById), use(Authorizer.AuthReadPermission),         // get permissions
    use(authorizeUserMiddleWare), use(getAllPermissions))

router.post("/", use(getPermissionById), use(Authorizer.AuthCreatePermission),      // add permissions
    use(authorizeUserMiddleWare), use(addPermissions));
router.put("/:id", use(getPermissionById), use(Authorizer.AuthUpdatePermission),    // update permissions
    use(authorizeUserMiddleWare), use(updatePermission))

router.delete("/:id", use(getPermissionById), use(Authorizer.AuthRemovePermission), // remove permissions
    use(authorizeUserMiddleWare), use(removePermission));

module.exports = router;
