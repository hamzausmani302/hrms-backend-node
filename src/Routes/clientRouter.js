const express = require('express')

const router = express.Router()

router.get("/" , getAllClient);

router.post("/" ,addClient)

router.put("/:id" ,updateClient)

router.delete("/:id" ,removeClient)


module.exports = router;