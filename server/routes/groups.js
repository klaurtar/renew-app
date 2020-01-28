const group = require('../classes/group/Group');

module.exports = (api) => {
    /**
     * @api {get} /groups Retrieve FB Groups
     * @apiName Retrieve Groups
     * @apiGroup Groups
     *
     * @apiSuccess (Success: 200) {Array} data Array of groups. See the GET `/groups/:group_id` endpoint to know more about the return group object.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/groups', (req, res) => {
        group.getGroups(
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {get} /groups/:group_id Retrieve FB Group
     * @apiName Retrieve Group
     * @apiGroup Groups
     *
     * @apiParam {String} group_id The id the group you need to retrieve.
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {String} data._id The group id.
     * @apiSuccess (Success: 200) {String} data.name The name of the group.
     * @apiSuccess (Success: 200) {String} data.url The fb URL of the group.
     * @apiSuccess (Success: 200) {String} data.description The description of the group.
     * @apiSuccess (Success: 200) {Number} data.created_at The timestamp of group creation date.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.get('/groups/:group_id', (req, res) => {
        group.getGroup(
            req.params.group_id,
            (data, code) => res.endWithSuccess(code || 200, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });
    /**
     * @api {post} /groups Create FB Group
     * @apiName Create New Group
     * @apiGroup Groups
     *
     * @apiParam {String} name Facebook group name.
     * @apiParam {String} url URL of the Facebook group.
     * @apiParam {String} [description] Optional, the description.
     *
     * @apiSuccess (Success: 201) {Object} data Response object.
     * @apiSuccess (Success: 201) {String} data._id The group id.
     * @apiSuccess (Success: 201) {String} data.name The name of the group.
     * @apiSuccess (Success: 201) {String} data.url The fb URL of the group.
     * @apiSuccess (Success: 201) {String} data.description The description of the group.
     * @apiSuccess (Success: 201) {Number} data.created_at The timestamp of group creation date.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
    api.post('/groups', (req, res) => {
        group.addGroup(
            req.body || {},
            (data, code) => res.endWithSuccess(code || 201, data),
            (error, code) => res.endWithError(code || 400, error)
        );
    });

    /**
     * @api {delete} /groups/:group_id Delete FB Group
     * @apiName Delete Group
     * @apiGroup Groups
     *
     * @apiSuccess (Success: 200) {Object} data Response object.
     * @apiSuccess (Success: 200) {Boolean} data.success Is deleting process has been performed successfully or not.
     *
     * @apiError (Error: 400) {Object} error Error object.
     * @apiError (Error: 400) {Array} error.errors Array of errors.
     */
     api.delete('/groups/:group_id', (req, res) => {
         group.deleteGroup(
             req.params.group_id,
             (data, code) => res.endWithSuccess(code || 200, data),
             (error, code) => res.endWithError(code || 400, error)
         );
     });

     /**
      * @api {put} /groups Update FB Group
      * @apiName Update FB Group
      * @apiGroup Groups
      *
      * @apiParam {String} name Facebook group name.
      * @apiParam {String} url URL of the Facebook group.
      * @apiParam {String} [description] Optional, the description.
      *
      * @apiSuccess (Success: 201) {Object} data Response object.
      * @apiSuccess (Success: 201) {String} data._id The group id.
      * @apiSuccess (Success: 201) {String} data.name The name of the group.
      * @apiSuccess (Success: 201) {String} data.url The fb URL of the group.
      * @apiSuccess (Success: 201) {String} data.description The description of the group.
      * @apiSuccess (Success: 201) {Number} data.created_at The timestamp of group creation date.
      *
      * @apiError (Error: 400) {Object} error Error object.
      * @apiError (Error: 400) {Array} error.errors Array of errors.
      */
      api.put('/groups/:group_id', (req, res) => {
         let submittedGroup = req.body || {};
         group.updateGroup(
             req.params.group_id,
             submittedGroup,
             (data, code) => res.endWithSuccess(code || 200, data),
             (error, code) => res.endWithError(code || 400, error)
         );
     });
}
