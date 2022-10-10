const express = require('express')
const { addUser, getAllUsers } = require('../controllers/userController')

const router = express.Router()

//users routes
router.post('/user/add', addUser);
router.get('/user/all', getAllUsers);


module.exports = {
    routes: router
}