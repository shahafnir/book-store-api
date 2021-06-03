const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        author: {
            type: String,
            trim: true,
            required: true,
        },
        publisher: {
            type: String,
            trim: true,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        language: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        priceUSD: {
            type: Number,
            required: true,
        },
        imgURL: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

bookSchema.plugin(mongoosePaginate)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
