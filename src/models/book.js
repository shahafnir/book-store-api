const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            lowercase: true,
        },
        author: {
            type: String,
            lowercase: true,
        },
        publisher: {
            type: String,
            lowercase: true,
        },
        publicationDate: {
            type: Date,
        },
        language: {
            type: String,
            lowercase: true,
        },
        priceUSD: {
            type: Number,
        },
        imgURL: {
            type: String,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
