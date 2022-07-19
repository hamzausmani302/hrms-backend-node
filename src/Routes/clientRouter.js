const express = require('express')

const {addClient, getProjectsOfClient, getAllClients, updateClient, removeClient, getClientByKeyword} = require('../controllers/ClientController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()

router.get("/", use(getAllClients));

router.post("/", use(addClient))

router.put("/:id", use(updateClient))

router.delete("/:id", use(removeClient))

router.get('/search', use(getClientByKeyword));      //by query: localhost.../search?key= xyz

router.get('/Projects', use(getProjectsOfClient));

module.exports = router;