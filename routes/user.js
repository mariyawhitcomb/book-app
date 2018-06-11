const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/new', userController.new)
router.post('/', userController.create)
router.get('/login', userController.logIn)
router.post('/login', userController.createLogIn)
router.get('/logout', userController.logOut)
router.get('/:id', userController.show)
router.put('/:id', userController.update)

module.exports = router