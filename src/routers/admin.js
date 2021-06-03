const express = require('express')
const Admin = require('../models/admin')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

// router.post('/admin', async (req, res) => {
//     const admin = new Admin(req.body)

//     try {
//         await admin.save()
//         res.status(201).send(admin)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(
            req.body.email,
            req.body.password
        )

        const token = await admin.generateAuthToken()

        res.send({ token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/admin/logout', adminAuth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.admin.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/admin/logoutAll', adminAuth, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
