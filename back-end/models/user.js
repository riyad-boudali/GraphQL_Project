const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    staus: {
        type: String,
        required: true,
    },
    post: [
        {
            type: mongoose.Schema.Types,
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)
