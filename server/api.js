const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + './../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeMiddlewares = require('./routeMiddlewares');

const puppeteerPlayer = require('./puppeteer');
const routes = require('./routes');

const api = express();
const PORT = process.env.API_PORT || 8181;

/**
* apply some middlewares
*/
api.use(bodyParser.json());
api.use(bodyParser.raw());
api.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
api.use(cookieParser());

api.use(routeMiddlewares.EndWith);
api.use(routeMiddlewares.CustomMulter);
api.use(routeMiddlewares.ModifyHeader);
api.use(routeMiddlewares.Authentication);



/**
* apply routes onto api express app
*/
routes(api);

/**
* response with error for any not supported api endpoint
*/
api.all('*', (req, res) => {
    res.status(400).json({
        error: {
            errors: ['set correct api resource ...'],
            message: 'set correct api resource ...'
        }
    });
});


api.listen(PORT, ()=> console.log('API is running on ', PORT));
