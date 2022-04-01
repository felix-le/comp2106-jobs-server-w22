const express = require('express')
const router = express.Router()
const Employer = require('../models/employer')

// GET: /api/employers => fetch all employer documents
router.get('/', (req, res) => {
    // use Mongoose model to fetch and return all employers
    Employer.find((err, employers) => {
        if (err) {
            return res.json(err).status(400)  // 400: Bad Request
        }
        else {
            return res.json(employers).status(200)  // 200: OK
        }
    })
})

// POST: /api/employers => receive form post with new employer data
router.post('/', (req, res) => {
    // use mongoose to try to create new document from the request body
    Employer.create(req.body, (err, employer) => {
        if (err) {
            return res.json(err).status(400)
        }
        else {
            return res.json(employer).status(201) // 201: Resource Created
        }
    })
})

module.exports = router