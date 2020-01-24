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
                    onSuccess && onSuccess({ fbitems: docs }, 200);
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
    * @param {Object} fbitem - Object that contains the fbitem date.
    * @param {sting} fbitem.title - name of the user.
    * @param {sting} fbitem.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    async addFbItemSync(fbitem){
        await this.connectDBSync();
        let fbitemDoc = await new (this.getFbItemModel())(fbitem);
        await fbitemDoc.save();
        return fbitemDoc;
    }
    /**
    * @param {Sting} _id - FbItem ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    deleteFbItem(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getFbItemModel().findOneAndDelete( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess({success: true});
                }
            );
        });
    }

}

module.exports = new FbItem();
