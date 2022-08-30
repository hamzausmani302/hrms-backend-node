const express = require('express')
const router = express.Router()
const { addRole, updateRole, removeRole, getRoles } = require('../controllers/roleController.js')

//middlewares for checking authorize user
const { getPermissionById } = require('../Middlewares/getPermissionById');
const { Authorizer } = require('../Middlewares/Authorizer');
const { authorizeUserMiddleWare } = require('../Middlewares/auth');
const { use } = require('../Middlewares/CatchError');

router.get("/", use(getPermissionById), use(Authorizer.AuthReadRoles),
    use(authorizeUserMiddleWare), use(getRoles))  //get roles

router.post("/", use(getPermissionById), use(Authorizer.AuthCreateRole),
    use(authorizeUserMiddleWare), use(addRole))   //add roles

router.put("/:id", use(getPermissionById), use(Authorizer.AuthUpdateRoles),
    use(authorizeUserMiddleWare), use(updateRole)) //update roles

router.delete("/:id", use(getPermissionById), use(Authorizer.AuthRemoveRoles),
    use(authorizeUserMiddleWare), use(removeRole)) //remove roles

module.exports = router;