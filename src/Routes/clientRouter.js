const express = require('express')
const Client = require('../Model/Client.schema');

const {addClient, getAllClients, updateClient, removeClient} = require('../controllers/ClientController.js');

const router = express.Router()

router.get("/", getAllClients);

router.post("/", addClient)

router.put("/:id", updateClient)

router.delete("/:id", removeClient)


module.exports = router;