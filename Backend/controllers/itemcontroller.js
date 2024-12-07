const Item = require('../models/itemModel')
const mongoose = require('mongoose')
//get all items
const getallItems = async(req,res)=>
{
    const items = await Item.find({}).sort({createdAt: -1})
    res.status(200).json(items)
}

//get single item
const getItem = async(req,res)=>
    {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such item'})
        }

        const item = await Item.findById(id)

        if (!item){
            return res.status(404).json({error:"No such item"})
        }

        res.status(200).json(item)
    }

//post new item
const createItem = async(req,res) =>
{
    const {title,description} = req.body

    // let empty = []
    // if(!title){
    //     empty.push('title')
    // }
    // if(empty.length > 0) {
    //     return res.status(400).json({error:'Please provide a title', empty})
    // }
    
    //add item to db
    try{
        const item= await Item.create({title,description})
        res.status(200).json(item)

    }
    catch(error){
        res.status(400).json({error: error.message})

    }
}

//delete item

const deleteItem = async(req,res)=>{
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }
    
    const item = await Item.findOneAndDelete({_id: id})
    
    if (!item){
        return res.status(400).json({error:"No such item"})
    }

    res.status(200).json(item)

}

//update item

const updateItem = async(req,res)=>{
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
    }
    
    const item = await Item.findOneAndUpdate({_id: id},{
        ...req.body
    })
    
    if (!item){
        return res.status(400).json({error:"No such item"})
    }

    res.status(200).json(item)

}


module.exports = {
    createItem,
    getallItems,
    getItem,
    deleteItem,
    updateItem
}