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

const updateItemStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' })
    }

    try {
        const item = await Item.findByIdAndUpdate(id, { status }, { new: true })
        if (!item) {
            return res.status(404).json({ error: 'No such item' })
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const claimItem = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' });
    }

    try {
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        if (item.status === 'claimed') {
            return res.status(400).json({ error: 'Item is already claimed' });
        }

        item.status = 'claimed';
        item.claimedBy = userId; // Store the ID of the claiming user
        await item.save();

        res.status(200).json({ message: 'Item claimed successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const requestClaim = async (req, res) => {
    const { id } = req.params; // Item ID
    const { userId } = req.body; // User ID from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' });
    }

    try {
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        if (item.status === 'claimed') {
            return res.status(400).json({ error: 'Item is already claimed' });
        }

        // Check if the user has already requested to claim this item
        const alreadyRequested = item.claimRequests.find((req) => req.userId.toString() === userId);
        if (alreadyRequested) {
            return res.status(400).json({ error: 'You have already requested to claim this item' });
        }

        // Add the claim request
        item.claimRequests.push({ userId });
        await item.save();

        res.status(200).json({ message: 'Claim request submitted', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createItem,
    getallItems,
    getItem,
    deleteItem,
    updateItem,
    updateItemStatus,
    claimItem,
    requestClaim,
};