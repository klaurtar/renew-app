const App = require('../App');
const mongoose = require('mongoose');
const ItemSchema = require('./ItemSchema');
const fs = require('fs');
const path = require('path');
/*
*
*/
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
                    onSuccess && onSuccess(docs);
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
    *
    */
    async getItemSync(_id){
        await this.connectDBSync();
        let item = await this.getItemModel().findOne({_id}).exec();
        return item;
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
                else{
                    onSuccess && onSuccess({success: true});
                    if(!!doc && doc.photos.length > 0){
                        try{
                            let itemDir = path.resolve(`${__dirname}./../../../${process.env.ITEM_PHOTOS_DIR}`);
                            doc.photos.forEach(photo => fs.unlinkSync(itemDir + '/' + photo));
                        }catch(e){
                            console.log('error during deleting photo', e);
                        }

                    }
                }
            });
        });
    }
    /**
    * @param {Sting} _id - Item ID.
    * @param {Object} item - Object that contains the item date.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    updateItem(_id, item, onSuccess, onError){
        this.connectDB(() => {
            this.getItemModel().findOneAndUpdate(
                { _id },
                {
                    title: item.title,
                    description: item.description,
                    price: item.price,
                },
                {
                    new: true // return the updated doc
                },
                (err, updatedDoc) => {
                    if(!!err){
                        onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                    }else{
                        if(!updatedDoc){ // not signed in
                            onError && onError({ errors: ['this item is not found'] });
                        }else{
                            onSuccess && onSuccess(updatedDoc, 200);
                        }
                    }
                }
            );
        });
    }
    /**
    * @param {Sting} _id - Item ID.
    * @param {Object} item - Object that contains the item date.
    */
    async updateItemSync(_id, update){
        await this.connectDBSync();
        let updatedDoc = await this.getItemModel().findOneAndUpdate( { _id }, update,
            {
                new: true // return the updated doc
            }
        ).exec();
        return updatedDoc;
    }

    /**
    *
    */
    async getNextItemToBePublishedSync(){
        await this.connectDBSync();
        let item = await this.getItemModel().findOne({
            last_fb_published_at: {
                //$lt: ( Date.now() - ( 1000 * 60 * 60 * 24 * 3 ) ) // three days
                $lt: ( Date.now() - ( 1000 * 60 * 60 * 24  ) ) // one day
            }
        }).sort({_id: -1}).exec();
        return item;
    }
}

module.exports = new Item();
