const dotenv  = require('dotenv');
const assert = require('assert');

//load enviroment vars 
dotenv.config()
const {
    PORT,
    HOST,
    HOST_URL, 
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

//check if env. vars are defined
assert(PORT, 'A port is required to continue');
assert(HOST, 'A host is required to continue');

// configuration export
module.exports = {
    port: PORT, 
    host: HOST, 
    host_url: HOST_URL,
    firebase_config : {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}