const express = require('express')
const Book = require('../models/book')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

router.post('/books', adminAuth, async (req, res) => {
    try {
        const sameBook = await Book.findOne({
            title: req.body.title,
            author: req.body.author,
        })

        if (sameBook) {
            return res.status(400).send('This book already exists')
        }

        const book = new Book({ ...req.body })

        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/books', async (req, res) => {
    const queryOptions = [
        'title',
        'author',
        'publisher',
        'publicationDate',
        'language',
        'price',
    ]
    const match = {}

    queryOptions.forEach((option) => {
        if (req.query[option]) {
            switch (option) {
                case 'publicationDate':
                    match[option] = req.query[option]
                    break
                case 'price':
                    const minMaxValues = req.query[option].split(':')
                    const min = parseInt(minMaxValues[0])
                    const max = parseInt(minMaxValues[1])
                    match['priceUSD'] = { $gt: min, $lt: max }
                    break
                default:
                    match[option] = new RegExp(req.query[option], 'i')
                    break
            }
        }
    })

    const sortBy = req.query.sortBy.split(':')[0]
    const sortOrder = req.query.sortBy.split(':')[1]

    const sort = {
        [sortBy]: sortOrder,
    }

    const options = {
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.skip),
        sort,
    }

    try {
        const books = await Book.paginate(match, options)

        res.send(books)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).send('Book ID not found')
        }

        res.send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/books/:id', adminAuth, async (req, res) => {
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
        return res.status(400).send('Invalid updates!')
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

router.delete('/books/:id', adminAuth, async (req, res) => {
    const bookId = req.params.id

    try {
        const book = await Book.findByIdAndDelete(bookId)

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/books', adminAuth, async (req, res) => {
    try {
        await Book.deleteMany({})

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
