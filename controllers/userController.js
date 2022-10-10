const firebase = require('../database')
const User = require('../models/User')
const firestore = firebase.firestore()

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await firestore.collection('users').doc().set(data);
        res.send(`User with id ${data.id} and name ${data.name} has been added`);

    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser
}