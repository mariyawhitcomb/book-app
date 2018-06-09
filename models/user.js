const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const User = new Schema({
    local: {
        email: String,
        password: String
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})
module.exports = mongoose.model('User', User)