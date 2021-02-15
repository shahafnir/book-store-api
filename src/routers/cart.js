const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const router = new express.Router()

// router.post('/cart', auth, async (req, res) => {
//     const cart = new Cart({ ...req.body, owner: req.user._id })

//     try {
//         await cart.save()
//         res.status(201).send(cart)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/cart/addItem/:id', auth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()

        await cart.addItem(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/cart/removeItem/:id', auth, async (req, res) => {
    const bookId = req.params.id

    try {
        const cart = await req.user.getCart()
        await cart.removeItem(bookId)

        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cart', auth, async (req, res) => {
    try {
        const cart = await req.user.getCart()
        res.send(cart)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/cart', auth, async (req, res) => {
    try {
        const cart = await req.user.getCart()
        await cart.remove()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
