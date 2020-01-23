const fbitem = require('../classes/fbitem/FbItem');

module.exports = (api) => {
    /**
     * @api {get} /fbitems Retrieve FbItems
     * @apiName Retrieve FbItems
     * @apiGroup FbItems
     *
     * @apiSuccess (Success: 200) {Array} data Array of fbitems. See the GET `/fbitems/:fbitem_id` endpoint to know more about the return fbitem object.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/fbitems', (req, res) => {
        fbitem.getFbItems(
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {get} /fbitems/:fbitem_id Retrieve FbItem
     * @apiName Retrieve FbItem
     * @apiGroup FbItems
     *
     * @apiParam {String} fbitem_id The id the fbitem you need to retrieve.
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {String} data._id The fbitem id.
     * @apiSuccess (Success: 200) {String} data.title The title of the fbitem.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/fbitems/:fbitem_id', (req, res) => {
        fbitem.getFbItem(
            req.params.fbitem_id,
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {post} /fbitems Create FbItem
     * @apiName Create New FbItem
     * @apiGroup FbItems
     *
     * @apiParam {String} title The title of the fbitem.
     * @apiParam {String} [description] The description of the fbitem.
     * @apiParam {Number} price The fb price of the fbitem.
     * @apiParam {Array} photos Array of photo names of fbitem.
     * @apiParam {Array} fbitem Array of group ids where this fbitem will be share.
     *
     * @apiSuccess (Success: 201) {Object} data Response object. See the GET `/fbitems/:fbitem_id` endpoint to know more about the return fbitem object.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.post('/fbitems', (req, res) => {
        //console.log('files', req.files);
        let submittedFbItem = req.body || {};
        submittedFbItem['photos'] = (req.files || []).map(f => f.filename);
        fbitem.addFbItem(
            submittedFbItem,
            (data, code) => res.endWithSuccess(code || 201, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    
    /**
     * @api {delete} /fbitem/:fbitem_id Delete FbItem
     * @apiName Delete FbItem
     * @apiGroup FbItems
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {Boolean} data.success Is deleting process has been performed successfully or not.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
     api.delete('/fbitems/:fbitem_id', (req, res) => {
         fbitem.deleteFbItem(
             req.params.fbitem_id,
             (data, code) => res.endWithSuccess(code || 200, data),
             (error, code) => res.endWithError(code || 400, error)
         );
     });

}
