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
        default: 'unclaimed'
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null,
    },
    claimRequests: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            requestedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Admin who approved
        default: null,
    },

    

},{timestamps: true})

module.exports = mongoose.model('Item', itemSchema)
