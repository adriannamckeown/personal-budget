const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        minlength: 6,
        required: true
    }
}, {collection: 'my_budget'})

module.exports = mongoose.model('my_budget', budgetSchema)