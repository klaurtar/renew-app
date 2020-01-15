const ModifyHeader = function(req, res, next) {
    // console.log('req.files', req.files);
    // console.log('request ...');
    // res.end('doen');
    // return;
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
}

module.exports = { ModifyHeader };
