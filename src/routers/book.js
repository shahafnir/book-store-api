const express = require('express')
const router = new express.Router()

const Book = require('../models/book')

router.post('/books', async (req, res) => {
    const book = new Book({ ...req.body })

    try {
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})

        res.send(books)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/books/:name', async (req, res) => {
    const name = req.params.name

    try {
        const book = await Book.findOne({ name })

        if (!book) {
            return res.status(404).send()
        }

        const updates = Object.keys(req.body)

        updates.forEach((update) => {
            book[update] = req.body[update]
        })

        await book.save()

        res.send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/books/:name', async (req, res) => {
    const name = req.params.name

    try {
        const book = await Book.findOneAndDelete({ name })

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/books', async (req, res) => {
    try {
        await Book.deleteMany({})

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
