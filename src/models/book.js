const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        author: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        publisher: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        language: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            lowercase: true,
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

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
