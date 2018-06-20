const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/signup', userController.signup)
router.post('/signup', userController.createSignup)
router.get('/login', userController.login)
router.post('/login', userController.createLogin)
router.get('/logout', userController.logout)
router.get('/mybooks/:id', userController.index)
router.put('/:id', userController.update)
// router.get('/:bookId', userController.show)

module.exports = router