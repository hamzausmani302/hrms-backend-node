const express = require('express')

const router = express.Router()

router.get("/" , getAllDeveloper);

router.post("/" ,addDeveloper)

router.put("/:id" ,updateDeveloper)

router.delete("/:id" ,removeDeveloper)


module.exports = router;