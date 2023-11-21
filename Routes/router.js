const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const jwtMiddleware = require('../Middtlewares/jwtMiddleware')
const projectController = require('../Controller/projectController')
const multerConfig = require('../Middtlewares/multerMiddleware')

// Api Call to register
router.post('/user/register',userController.register)

// Api Call to login
router.post('/user/login',userController.login)

// add projects
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addprojects)

// get all projects
router.get('/projects/all',jwtMiddleware,projectController.getAllProjects)

// get user projects
router.get('/user/projects',jwtMiddleware,projectController.allUserProjects)

// get home projects
router.get('/projects/home',projectController.getHomeProjects)


// export router
module.exports = router