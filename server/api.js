require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const admin = require('./classes/admin/Admin');
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

/**
* modify header in the middleware
*/
api.use((req, res, next) => {
    console.log('request ...');
    //return next();
    /*const corsWhitelist = [
        'https://localhost:3636',
        'https://postwoman.io'
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.setHeader('Content-Type', 'application/json');
    next();
});


/**
* apply some rules on request
* - Accept preflight requests [method == 'OPTIONS']
* - Check authentication for all requests except auth endpoint (post/put)
*/
api.use(function(req, res, next) {
    // Accept preflight requests
    if(req.method === 'OPTIONS'){
        res.status(200).send();

    // Check authentication for all requests except auth endpoint
    }else if(!!req.url.match(/^\/auth/) && (req.method === 'PUT' || req.method === 'POST') ){
    	next();
    }else{
        admin.isAdminAuthenticated(
            req.cookies['token'],
            (authenticatedAdmin) => {
                if(!!authenticatedAdmin){
                    req.__authenticatedAdmin = authenticatedAdmin;
                    next();
                }else{
                    res.status(403).json({
                        error: {
                            errors: ['Not Authenticated']
                        },
                        code: 403
                    });
                }
            }
        );
    }

});



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
        },
        code: 400
    });
});


api.listen(PORT, ()=> console.log('API is running on ', PORT));
