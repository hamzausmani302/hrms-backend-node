const express = require('express')
const router = express.Router()
const projectRoute = require('./projectRouter')
const adminRoute = require('./adminRouter')
const clientRoute = require('./clientRouter')
const devRoute = require('./devRouter')


router.use( '/project',projectRoute)
router.use( '/admin',adminRoute) 
router.use( '/client',clientRoute) 
router.use( '/devoloper',devRoute) 
module.exports = router