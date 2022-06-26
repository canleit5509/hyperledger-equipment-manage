/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const server = require('http').Server(app);

if (process.env.APP_ENV !== 'production') {
    const morgan = require('morgan');
    require('dotenv').config();
    app.use(morgan('combined'));
}
require('./src/config/database').connect();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Routes init
routes(app);


server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
