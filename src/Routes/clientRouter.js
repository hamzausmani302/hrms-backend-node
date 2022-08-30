const express = require('express')
const router = express.Router()
const { addClient, getProjectsOfClient, getAllClients, updateClient, removeClient, getClientByKeyword } = require('../controllers/ClientController.js');
//middlewares for checking authorize user 
const { authorizeUserMiddleWare } = require('../Middlewares/auth');
const { getPermissionById } = require('../Middlewares/getPermissionById');
const { Authorizer } = require('../Middlewares/Authorizer');
const { use } = require('../Middlewares/CatchError');


router.get("/", use(getPermissionById), use(Authorizer.AuthReadClient),          // get all client
    use(authorizeUserMiddleWare), use(getAllClients));

router.post("/", use(getPermissionById), use(Authorizer.AuthCreateClient),       //add clients
    use(authorizeUserMiddleWare), use(addClient))

router.put("/:id", use(getPermissionById), use(Authorizer.AuthUpdateClient),     //update client information
    use(authorizeUserMiddleWare), use(updateClient))

router.delete("/:id", use(getPermissionById), use(Authorizer.AuthRemoveClient),  //remove clients
    use(authorizeUserMiddleWare), use(removeClient))

router.get('/search', use(getPermissionById), use(Authorizer.AuthReadClient),
    use(authorizeUserMiddleWare), use(getClientByKeyword));                      //by query: localhost.../search?key= xyz

router.get('/Projects', use(getPermissionById), use(Authorizer.AuthReadClient),  //get client's project 
    use(authorizeUserMiddleWare), use(getProjectsOfClient));

module.exports = router;