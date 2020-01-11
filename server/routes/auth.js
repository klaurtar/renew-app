const admin = require('../classes/admin/Admin');

module.exports = (api) => {
    /**
     * @api {put} /auth Sign Up
     * @apiName Sing Up New Admin
     * @apiGroup Auth
     *
     * @apiParam {String} username  username or email.
     * @apiParam {String} password password.
     *
     * @apiSuccess (Success: 201) {Object} data Response object.
     * @apiSuccess (Success: 201) {String} data._id The id of user.
     * @apiSuccess (Success: 201) {String} data.token  Generated token. Note, this token is also setted within header cookie.
     * @apiSuccess (Success: 201) {Number} code  Status code.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     * @apiError (Error: 400) {Number} code Status code error.
     */
    api.put('/auth', (req, res) => {
        admin.signUp(
            req.body || {},
            (data, code) => {
                let statusCode = code || 200;
                res.cookie('token', data.token, {expire: (1000 * 60 * 60 * 24 * 30 + Date.now())});
                res.status(statusCode).json({ data, code: statusCode });
            },
            (error, code) => {
                let statusCode = code || 400;
                res.status(statusCode).json({ error, code: statusCode });
            }
        );
    });

    /**
     * @api {post} /auth Sign In
     * @apiName Sing In For Admin
     * @apiGroup Auth
     *
     * @apiParam {String} username  username or email.
     * @apiParam {String} password password.
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {String} data._id The id of user.
     * @apiSuccess (Success: 200) {String} data.token  Generated token. Note, this token is also setted within header cookie.
     * @apiSuccess (Success: 200) {Number} code  Status code.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     * @apiError (Error: 400) {Number} code Status code error.
     */
    api.post('/auth', (req, res) => {
        admin.signIn(
            req.body || {},
            (data, code) => {
                let statusCode = code || 200;
                res.cookie('token', data.token, {expire: (1000 * 60 * 60 * 24 * 30 + Date.now())});
                res.status(statusCode).json({ data, code: statusCode });
            },
            (error, code) => {
                let statusCode = code || 400;
                res.status(statusCode).json({ error, code: statusCode });
            }
        );
    });

    /**
     * @api {delete} /auth Sign Out
     * @apiName Sing Admin Out
     * @apiGroup Auth
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {Boolean} data.sign_out Signed out successfully or not. It will clear token cookie.
     * @apiSuccess (Success: 200) {Number} code  Status code.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     * @apiError (Error: 400) {Number} code Status code error.
     */
    api.delete('/auth', (req, res) => {
        admin.signOut(
            req.__authenticatedAdmin,
            (data, code) => {
                let statusCode = code || 200;
                res.clearCookie('token');
                res.status(statusCode).json({ data, code: statusCode });
            },
            (error, code) => {
                let statusCode = code || 400;
                res.status(statusCode).json({ error, code: statusCode });
            }
        );
    });
}
