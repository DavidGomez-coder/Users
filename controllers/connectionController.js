const firebase = require('../database')
const firestore = firebase.firestore()

const addNewConnection = async (req, res, next) => {
    try {
       
        res.send("New connection has been stablished");
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addNewConnection
}