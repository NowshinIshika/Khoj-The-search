const express = require('express')
const router = express.Router()
const upload = require('../Middlewares/multer');
const{
    createItem,  getallItems,
    getItem, deleteItem,
    updateItem, updateItemStatus
} = require('../controllers/itemcontroller')

//all
router.get('/',getallItems)

//single
router.get('/:id',getItem)

router.post('/', upload.single('photo'), createItem)

router.delete('/:id',deleteItem)


router.patch('/:id',updateItem)

router.patch('/:id',updateItemStatus)

module.exports = router