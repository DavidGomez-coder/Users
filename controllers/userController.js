const firebase = require('../database')
const User = require('../models/User')
const firestore = firebase.firestore()

const addUser = async (req, res, next) => {
    try {
        const data = req.body;

        //add a 0 length set connection to a new user
        let user_data = {
            ...data,
            "connections": []
        }

        const user = await firestore.collection('users').doc().set(user_data);
        res.send(`User with  name ${data.name} has been added`);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();

        if (!data.exists) {
            res.status(404).send('There are not any user to display');
        } else {
            let data_to_send = {
                "name": data.data().name,
                "connections": data.data().connections
            }
            res.send(data.data());
        }

    } catch (error) {
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
                const nUser = new User(atrb.id, atrb.data().name);
                nUser.setConnections(atrb.data().connections);
                users_collection.push(nUser);
            });
            res.send(users_collection);
        }


    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setConnection = async (req, res, next) => {
    try {
        const id1 = req.params.id1;
        const id2 = req.params.id2;

        // check id similarity
        if (id1 === id2)
            res.status(404).send(`An user couldn have connection with himself`)


        const user1 = await firestore.collection('users').doc(id1);
        const data1 = await user1.get();

        const user2 = await firestore.collection('users').doc(id2);
        const data2 = await user2.get();


        if (data1.exists && data2.exists) {
            //
            const user1_connections = data1.data().connections;
            const user2_connections = data2.data().connections;
            console.log(user1_connections)
            console.log(user2_connections)
            if (user1_connections.includes(id2) || user2_connections.includes(id1)) {
                res.status(404).send(`This connection already exists`);
            } else {
                const new_data1 = {
                    ...data1.data(),
                    "connections": [...data1.data().connections, id2]
                }

                const new_data2 = {
                    ...data2.data(),
                    "connections": [...data2.data().connections, id1]
                }

                console.log(new_data1)

                await user1.update(new_data1);
                await user2.update(new_data2);
                res.status(300).send("OK");
            }
        } else {
            res.status(404).send("Connection already exists");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getConnections = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();


        if (!data.exists)
            res.status(404).send(`User with id ${id} doesnt exists`);

        let my_connections = [];

        //
        for (let i = 0; i < data.data().connections.length; i++) {
            const connection_id = data.data().connections[i];
            console.log(connection_id);

            const _user = await firestore.collection('users').doc(connection_id);
            const _data = await _user.get();
            const n_user = new User(_data.id, _data.data().name);
            n_user.setConnections(_data.data().connections);
            console.log(n_user);
            my_connections.push(n_user);
        }

       

        await res.status(300).send(my_connections);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    setConnection,
    getConnections
}