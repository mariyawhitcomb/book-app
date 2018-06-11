const express = require('express')
const router = express.Router()
const myBookController = require('../controllers/myBook')

router.get('/new', myBookController.new)
router.post('/', myBookController.create)
router.get('/:id', myBookController.show)
router.delete('/:id', myBookController.destroy)//delete note
router.put('/:id', myBookController.update)
router.get('/', myBookController.index)

module.exports = router