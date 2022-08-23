const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema ({
    image: {
        data:Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('imageModel', ImageSchema)