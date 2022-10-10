const firebase = require('firebase');
const config = require('./config');

const database = firebase.initializeApp(config.firebase_config);

module.exports = database;