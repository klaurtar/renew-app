const admin = require('../classes/admin/Admin');

const Authentication = function(req, res, next) {
    // Accept preflight requests
    if(req.method === 'OPTIONS'){
        res.status(200).send();

    // Check authentication for all requests except auth endpoint
    }else if(!!req.url.match(/^\/auth/) && (req.method === 'PUT' || req.method === 'POST') ){
    	next();
    }else{
        admin.isAdminAuthenticated(
            req.cookies['token'] || req.headers['token'],
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
}

module.exports = { Authentication };
