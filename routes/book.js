const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')

router.get('/:id', bookController.show)
router.get('/', bookController.index)



module.exports = router