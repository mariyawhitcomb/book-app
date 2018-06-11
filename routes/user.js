const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/signUp', userController.signUp)
router.post('/signUp', userController.createSignUp)
router.get('/login', userController.logIn)
router.post('/login', userController.createLogIn)
router.get('/logout', userController.logOut)
router.get('/:id', userController.show)
router.put('/:id', userController.update)

module.exports = router