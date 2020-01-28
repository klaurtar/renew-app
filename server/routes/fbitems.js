const fbitem = require('../classes/fbitem/FbItem');
const eventManager = require('../eventManager');

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
     * @apiSuccess (Success: 200) {String} data.item_id The id of related item.
     * @apiSuccess (Success: 200) {String} data.url The facebook URL of the fbitem.
     * @apiSuccess (Success: 200) {Number} data.published_at The timestamp date when the fbitem has been published.
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
     * @api {post} /fbitems Publish Item
     * @apiName Publish Item
     * @apiGroup FbItems
     *
     * @apiDescription This request is responsible for notifying the automation process to publish the submitted item.
     * And of course, the response is of the notification not the publishing process itself. The reason behind this is;
     * the publishing process will take some time to finish. So, if you need to check the result of the publishing, make
     * a further `GET /fbitems` request to see if the new fbitem has been published yet or not.
     *
     * @apiParam {String} item_id The id of the item to be published on facebook.
     *
     * @apiSuccess (Success: 201) {Object} data Response object.
     * @apiSuccess (Success: 201) {Boolean} data.success Response of publishing notification.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.post('/fbitems', (req, res) => {
        //fire event
        let submittedItem = req.body || {};
        eventManager.emit('publishItem', submittedItem.item_id);
        res.endWithSuccess(200, { success: true });
    });

    /**
     * @api {delete} /fbitem/:fbitem_id Delete FbItem
     * @apiName Delete FbItem
     * @apiGroup FbItems
     *
     * @apiDescription This request is responsible for notifying the automation process to delete the submitted fbitem.
     * And of course, the response is of the notification not the deleting process itself. The reason behind this is;
     * the deleting process will take some time to finish. So, if you need to check the result of the deleting, make
     * a further `GET /fbitems` request to see if the fbitem has been deleted yet or not.
     *
     * @apiParam {String} _id The id of the fbitem to be deleted from facebook.
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 201) {Boolean} data.success Response of deleting notification.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
     api.delete('/fbitems/:fbitem_id', (req, res) => {
         //fire event
         eventManager.emit('removeFbItem', req.params['fbitem_id']);
         res.endWithSuccess(200, { success: true });
     });

}
