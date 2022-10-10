const express = require('express')
const { addNewConnection } = require('../controllers/connectionController')
const router = express.Router()


router.put('/connection/:id1/:id2', addNewConnection);


module.exports = {
    routes: router
}