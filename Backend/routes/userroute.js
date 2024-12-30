const express = require('express')
const router = express.Router()
const{
    getUser,updateUser,deleteUser
} = require('../controllers/usercontroller')


router.get('/:id',getUser)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)
module.exports = router