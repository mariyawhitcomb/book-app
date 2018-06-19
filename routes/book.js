const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

router.get('/:id', bookController.show)
router.post('/:id', bookController.requireAuth, bookController.createnote)
router.delete('/:id', bookController.requireAuth, bookController.destroy)
router.put('/:id', bookController.update)
module.exports = router