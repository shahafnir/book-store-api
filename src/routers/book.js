const express = require('express')
const Book = require('../models/book')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

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

router.patch('/books/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'title',
        'author',
        'publisher',
        'publicationDate',
        'language',
        'description',
        'priceUSD',
        'imgURL',
    ]
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).send()
        }

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
