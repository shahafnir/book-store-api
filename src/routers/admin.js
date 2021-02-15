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

router.post('/admin/login', async (req, res) => {})

router.post('/admin/logout', async (req, res) => {})

router.post('/admin/logoutAll', async (req, res) => {})

module.exports = router
