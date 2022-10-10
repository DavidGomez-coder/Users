const express = require('express')
const { addUser, getAllUsers, getUser } = require('../controllers/userController')

const router = express.Router()

//users routes
router.post('/user/add', addUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);


module.exports = {
    routes: router
}