const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({

    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
    },
    status:{
        type: String,
        default: 'Unclaimed'
    },
    category:{
        type:String,
        default: 'None'
    },
    photo: {
        type: String, 
    },

},{timestamps: true})

module.exports = mongoose.model('Item', itemSchema)
