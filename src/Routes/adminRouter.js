const express = require('express')
const {addAdmin , updateAdmin , removeAdmin , getAdmin} = require('../controllers/AdminController');
const {encrypt} = require('../Middlewares/EncryptPassword');
const router = express.Router()

router.get("/" , getAdmin);

router.post("/",encrypt ,addAdmin)

router.put("/:id" ,updateAdmin)

router.delete("/:id" ,removeAdmin)


module.exports = router;