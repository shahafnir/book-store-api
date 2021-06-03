const express = require('express')
const userAuth = require('../middleware/userAuth')
const router = new express.Router()

router.post('/cart/add-item/:id', userAuth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()

        await cart.addItem(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/cart/remove-item/:id', userAuth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()
        await cart.removeItem(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/cart/reduce-amount/:id', userAuth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()
        await cart.reduceAmount(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/cart/icrease-amount/:id', userAuth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()
        await cart.icreaseAmount(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cart', userAuth, async (req, res) => {
    try {
        const cart = await req.user.getCart()
        res.send(cart)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/cart', userAuth, async (req, res) => {
    try {
        const cart = await req.user.getCart()
        await cart.remove()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
