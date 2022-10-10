const express = require('express')
const { addUser } = require('../controllers/userController')

const router = express.Router()

//users routes
router.post('/user/add', addUser)


module.exports = {
    routes: router
}