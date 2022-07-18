const express = require('express')

const {addClient, getAllClients, updateClient, removeClient, getClientByKeyword} = require('../controllers/ClientController.js');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()

router.get("/", use(getAllClients));

router.post("/", use(addClient))

router.put("/:id", use(updateClient))

router.delete("/:id", use(removeClient))

router.get('/search', getClientByKeyword);      //by query: localhost.../search?key= xyz

module.exports = router;