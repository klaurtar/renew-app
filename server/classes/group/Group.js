const App = require('../App');
const mongoose = require('mongoose');
const GroupSchema = require('./GroupSchema');
class Group extends App{
    constructor() {
        super();
        this.groupModel = false;

    }
    /**
    * @returns {mongoose.Model} mongoose model - used to create new doc for mongo.
    */
    getGroupModel(){
        if(!this.groupModel){
            this.groupModel = mongoose.model('Groups', GroupSchema);
        }
        return this.groupModel;
    }
    /**
    * @param {Object} group - Object that contains the group date.
    * @param {sting} group.title - name of the user.
    * @param {sting} group.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getGroups(onSuccess, onError){
        this.connectDB(() => {
            this.getGroupModel().find( {} , (err, docs) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess(docs);
                }
            );
        });
    }
    /**
    * @param {Sting} _id - Group ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    getGroup(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getGroupModel().findOne( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess(doc);
                }
            );
        });
    }
    /**
    * @param {Object} group - Object that contains the group date.
    * @param {sting} group.title - name of the user.
    * @param {sting} group.description - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    addGroup(group, onSuccess, onError){
        this.connectDB(() => {
            let groupDoc = new (this.getGroupModel())(group);
            groupDoc.save((err)=>{
                if(!!err){
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                    return;
                }
                onSuccess && onSuccess(groupDoc, 201);
            });
        });
    }
    /**
    * @param {Sting} _id - Group ID.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    deleteGroup(_id, onSuccess, onError){
        this.connectDB(() => {
            this.getGroupModel().findOneAndDelete( {_id} , (err, doc) => {
                if(!!err)
                    onError && onError({ errors: this.parseMongooseValidationErrors(err) });
                else
                    onSuccess && onSuccess({success: true});
                }
            );
        });
    }
}

module.exports = new Group();
