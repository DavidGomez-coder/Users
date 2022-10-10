const express = require('express')
const { addUser, getAllUsers, getUser, addNewConnection } = require('../controllers/userController')

const router = express.Router()

//users routes
router.post('/user/add', addUser);
router.get('/user/:id', getUser);
router.post('/user/connection/:id1/:id2', addNewConnection);
router.get('/users', getAllUsers);


module.exports = {
    routes: router
}