const express = require('express')
const { addUser, getAllUsers, getUser, setConnection, getConnections } = require('../controllers/userController')

const router = express.Router()

//users routes
router.post('/user/add', addUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);
router.put('/addConnection', setConnection);
router.get('/connections/:id', getConnections);

module.exports = {
    routes: router
}