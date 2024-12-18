const express = require('express')
const router = express.Router()
const{
    createItem,  getallItems,
    getItem, deleteItem,
    updateItem
} = require('../controllers/itemcontroller')

//all
router.get('/',getallItems)

//single
router.get('/:id',getItem)

router.post('/', createItem)

router.delete('/:id',deleteItem)


router.patch('/:id',updateItem)

router.patch('/:id',updateItemStatus)

module.exports = router