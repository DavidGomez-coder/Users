const express = require('express')
const cors    = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')

//routes import
const user_routes = require('./routes/user-routes')





//load app config
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', user_routes.routes);

app.listen(config.port, () => console.log(`App is running on ${config.host_url}`));