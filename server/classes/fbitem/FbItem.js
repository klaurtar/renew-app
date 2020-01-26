const App = require('../App');
const mongoose = require('mongoose');
const FbItemSchema = require('./FbItemSchema');
class FbItem extends App{
    constructor() {
        super();
        this.fbitemModel = false;

    }
    /**
    * @returns {mongoose.Model} mongoose model - used to create new doc for mongo.
    */
    getFbItemModel(){
        if(!this.fbitemModel){
            this.fbitemModel = mongoose.model('FbItems', FbItemSchema);
        }
        return this.fbitemModel;
    }
    /**
    * @param {Object} fbitem - Object that contains the fbitem date.
    * @param {sting} fbitem.title - name of the user.
    * @param {sting} fbitem.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getFbItems(onSuccess, onError){
        this.connectDB(() => {
            this.getFbItemModel().find(
                {},
                (err, docs) => {
                    if(!!err){
                        onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                        return;
                    }
                    onSuccess && onSuccess(docs);
                }
            ).sort({'_id': -1});
        });
    }
    /**
    * @param {Sting} _id - FbItem ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getFbItem(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getFbItemModel().findOne( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess(doc);
                }
            );
        });
    }
    /**
    *
    */
    async getFbItemSync(_id){
        await this.connectDBSync();
        let fbitem = await this.getFbItemModel().findOne({_id}).exec();
        return fbitem;
    }
    /**
    * @param {Object} fbitem - Object that contains the fbitem date.
    * @param {mongoID} fbitem.item_id - id of related item.
    * @param {Sting} fbitem.url - facebook URL.
    * @param {Number} fbitem.published_at - timestamp date of publishing.
    */
    async addFbItemSync(fbitem){
        await this.connectDBSync();
        let fbitemDoc = await new (this.getFbItemModel())(fbitem);
        await fbitemDoc.save();
        return fbitemDoc;
    }
    /**
    * @param {Sting} _id - fbitem_id.
    */
    async deleteFbItemSync(_id){
        await this.connectDBSync();
        await this.getFbItemModel().findOneAndDelete({ _id }).exec();
    }

    /**
    *
    */
    async getNextItemToBeDeletedSync(){
        await this.connectDBSync();
        let item = await this.getFbItemModel().findOne({
            published_at: {
                //$lt: ( Date.now() - ( 1000 * 60 * 60 * 24 * 3 ) ) // three days
                $lt: ( Date.now() - ( 1000 * 60 * 60 * 1 ) ) // one days
            }
        }).sort({_id: -1}).exec();
        return item;
    }

}

module.exports = new FbItem();
