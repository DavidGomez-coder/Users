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

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const users_collection = [];

        if (data.empty) {
            res.status(404).send('There are not users to display');
        } else {
            data.forEach(atrb => {
                const nUser = new User(atrb.data().id, atrb.data().name);
                users_collection.push(nUser);
            });
            res.send(users_collection);
        }


    }catch(error){  
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers
}