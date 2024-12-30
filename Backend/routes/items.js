const express = require('express')
const router = express.Router()
const{
    createItem,  getallItems,
    getItem, deleteItem,
    updateItem, updateItemStatus, claimItem, requestClaim
} = require('../controllers/itemcontroller')

//all
router.get('/',getallItems)

//single
router.get('/:id',getItem)

router.post('/', createItem)

router.delete('/:id',deleteItem)


router.patch('/:id',updateItem)

router.patch('/:id',updateItemStatus)

router.patch('/:id/claim', claimItem);

router.patch('/:id/request-claim', requestClaim);

module.exports = router