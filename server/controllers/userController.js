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
        if (data.name.trim().length === 0) // not blank names
            res.status(400).send(error.message);

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
            let nuser = new User(data.id, data.data().name);
            nuser.setConnections(data.data().connections)
            
            res.send(nuser);
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
                nUser.setConnections(atrb.data().connections)
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
        const data = req.body;
        const id1 = data.id1;
        const id2 = data.id2;

        // check id similarity
        if (id1 === id2)
            res.status(404).send(`An user couldn have connection with himself`)


        const user1 = await firestore.collection('users').doc(id1);
        const data1 = await user1.get();

        const user2 = await firestore.collection('users').doc(id2);
        const data2 = await user2.get();


        if (data1.exists && data2.exists) {
            //
            const obj_user1 = new User(data1.id, data1.data().name);
            obj_user1.setConnections(data1.data().connections);
            obj_user1.addConnection(id2);

            const obj_user2 = new User(data2.id, data2.data().name);
            obj_user2.setConnections(data2.data().connections);
            obj_user2.addConnection(id1);
            
            //update
            await user1.update({
                ...data1.data(),
                "connections" : [...obj_user1.getConnections()]
            });
            await user2.update({
                ...data2.data(),
                "connections" : [...obj_user2.getConnections()]
            });

            res.status(300).send("New connection has been stablished");
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

        const user_u = new User(data.id, data.data().name);
        user_u.setConnections(data.data().connections);
        
        let my_connections = [];


        for (let i=0; i<user_u.getConnections().length; i++){
            const con_id = user_u.getConnections()[i];
            const temp_user = await firestore.collection('users').doc(con_id);
            const temp_data = await temp_user.get();

            

            const con_user = new User(temp_data.id, temp_data.data().name);
            con_user.setConnections(temp_data.data().connections);


            my_connections.push(con_user);           
        }
        console.log(my_connections)
       
        res.send(my_connections);

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