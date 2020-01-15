const App = require('../App');
const mongoose = require('mongoose');
const ItemSchema = require('./ItemSchema');
class Item extends App{
    constructor() {
        super();
        this.itemModel = false;

    }
    /**
    * @returns {mongoose.Model} mongoose model - used to create new doc for mongo.
    */
    getItemModel(){
        if(!this.itemModel){
            this.itemModel = mongoose.model('Items', ItemSchema);
        }
        return this.itemModel;
    }
    /**
    * @param {Object} item - Object that contains the item date.
    * @param {sting} item.title - name of the user.
    * @param {sting} item.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getItems(onSuccess, onError){
        this.connectDB(() => {
            this.getItemModel().find(
                {},
                (err, docs) => {
                    if(!!err){
                        onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                        return;
                    }
                    onSuccess && onSuccess({ items: docs }, 200);
                }
            ).sort({'_id': -1});
        });
    }
    /**
    * @param {Sting} _id - Item ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getItem(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getItemModel().findOne( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess(doc);
                }
            );
        });
    }
    /**
    * @param {Object} item - Object that contains the item date.
    * @param {sting} item.title - name of the user.
    * @param {sting} item.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    addItem(item, onSuccess, onError){
        this.connectDB(() => {
            let itemDoc = new (this.getItemModel())(item);
            itemDoc.save((err)=>{
                if(!!err){
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                    return;
                }
                onSuccess && onSuccess(itemDoc, 201);
            });
        });
    }
    /**
    * @param {Sting} _id - Item ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    deleteItem(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getItemModel().findOneAndDelete( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess({success: true});
                }
            );
        });
    }


}

module.exports = new Item();
