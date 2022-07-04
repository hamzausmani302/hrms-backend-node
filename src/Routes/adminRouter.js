const express = require('express')
const {addAdmin , updateAdmin , removeAdmin , getAdmin} = require('../controllers/AdminController');
const {encrypt} = require('../Middlewares/EncryptPassword');
const {use} = require('../Middlewares/CatchError');
const router = express.Router()

router.get("/" , getAdmin).post("/",encrypt ,addAdmin)
router.put("/:id" ,updateAdmin).delete("/:id" ,removeAdmin)


module.exports = router;