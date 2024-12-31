const User = require('../models/user')
const mongoose = require('mongoose')


//get single user
const getUser = async(req,res)=>
    {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such user'})
        }

        const user = await User.findById(id)

        if (!user){
            return res.status(404).json({error:"No such user"})
        }

        res.status(200).json(user)
    }


//update 

const updateUser = async(req,res)=>{
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such user'})
    }
    
    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body
        
    },{ new: true })
    
    if (!user){
        return res.status(400).json({error:"No such user"})
    }

    res.status(200).json(user)

}


const deleteUser = async(req,res)=>{
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }
    
    const user = await User.findOneAndDelete({_id: id})
    
    if (!user){
        return res.status(400).json({error:"No such User"})
    }

    res.status(200).json(user)

}

module.exports = {
    
  
    getUser,
    updateUser,
    deleteUser
}