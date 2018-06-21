const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

router.get('/:id', bookController.show)
router.post('/:id', bookController.requireAuth, bookController.createnote)
// router.put('/:id', bookController.requireAuth, bookController.update)
module.exports = router