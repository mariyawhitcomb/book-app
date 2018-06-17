const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

router.get('/:id', bookController.show)
router.post('/:id', bookController.requireAuth, bookController.update)
router.delete('/:id', bookController.requireAuth, bookController.destroy)
module.exports = router