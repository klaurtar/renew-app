const item = require('../classes/item/Item');

module.exports = (api) => {
    /**
     * @api {get} /items Retrieve Items
     * @apiName Retrieve Items
     * @apiGroup Items
     *
     * @apiSuccess (Success: 200) {Array} data Array of items. See the GET `/items/:item_id` endpoint to know more about the return item object.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/items', (req, res) => {
        item.getItems(
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {get} /items/:item_id Retrieve Item
     * @apiName Retrieve Item
     * @apiGroup Items
     *
     * @apiParam {String} item_id The id the item you need to retrieve.
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {String} data._id The item id.
     * @apiSuccess (Success: 200) {String} data.title The title of the item.
     * @apiSuccess (Success: 200) {String} data.description The description of the item.
     * @apiSuccess (Success: 200) {Number} data.price The fb price of the item.
     * @apiSuccess (Success: 200) {Number} data.views Total views.
     * @apiSuccess (Success: 200) {Array} data.photos Array of photo names of item.
     * @apiSuccess (Success: 200) {Array} data.item Array of group ids where this item will be share.
     * @apiSuccess (Success: 200) {Number} data.created_at The timestamp of item creation date.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/items/:item_id', (req, res) => {
        item.getItem(
            req.params.item_id,
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {post} /items Create Item
     * @apiName Create New Item
     * @apiGroup Items
     *
     * @apiParam {String} title The title of the item.
     * @apiParam {String} [description] The description of the item.
     * @apiParam {Number} price The fb price of the item.
     * @apiParam {Array} photos Array of photo names of item.
     * @apiParam {Array} item Array of group ids where this item will be share.
     *
     * @apiSuccess (Success: 201) {Object} data Response object. See the GET `/items/:item_id` endpoint to know more about the return item object.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.post('/items', (req, res) => {
        console.log('files', req.files);
        let submittedItem = req.body || {};
        submittedItem['photos'] = (req.files || []).map(f => f.filename);
        item.addItem(
            submittedItem,
            (data, code) => res.endWithSuccess(code || 201, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {delete} /item/:item_id Delete Item
     * @apiName Delete Item
     * @apiGroup Items
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {Boolean} data.success Is deleting process has been performed successfully or not.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
     api.delete('/items/:item_id', (req, res) => {
         item.deleteItem(
             req.params.item_id,
             (data, code) => res.endWithSuccess(code || 200, data),
             (error, code) => res.endWithError(code || 400, error)
         );
     });

}
