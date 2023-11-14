const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')

// Api Call to register
router.post('/user/register',userController.register)

// Api Call to login
router.post('/user/login',userController.login)

// export router
module.exports = router