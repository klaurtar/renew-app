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
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.put('/auth', (req, res) => {
        admin.signUp(
            req.body || {},
            (data, code) => {
                res.cookie('token', data.token, {expire: (1000 * 60 * 60 * 24 * 30 + Date.now())});
                res.endWithSuccess(code || 201, data);
            },
            (error, code) => res.endWithError(code || 400, error)
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
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.post('/auth', (req, res) => {
        admin.signIn(
            req.body || {},
            (data, code) => {
                res.cookie('token', data.token, {expire: (1000 * 60 * 60 * 24 * 30 + Date.now())});
                res.endWithSuccess(code || 200, data);
            },
            (error, code) => res.endWithError(code || 400, error)
        );
    });

    /**
     * @api {delete} /auth Sign Out
     * @apiName Sing Admin Out
     * @apiGroup Auth
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {Boolean} data.sign_out Signed out successfully or not. It will clear token cookie.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.delete('/auth', (req, res) => {
        admin.signOut(
            req.__authenticatedAdmin,
            (data, code) => {
                res.clearCookie('token');
                res.endWithSuccess(code || 200, data);
            },
            (error, code) => res.endWithError(code || 400, error)
        );
    });
}
