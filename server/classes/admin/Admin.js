const App = require('../App');
const mongoose = require('mongoose');
const AdminSchema = require('./AdminSchema');
class Admin extends App{
    constructor() {
        super();
        this.adminModel = false;

    }
    /**
    * @returns {mongoose.Model} mongoose model - used to create new doc for mongo.
    */
    getAdminModel(){
        if(!this.adminModel){
            this.adminModel = mongoose.model('Admins', AdminSchema);
        }
        return this.adminModel;
    }
    /**
    * @param {Object} credentials - Object that contains the credentials.
    * @param {sting} credentials.username - name of the user.
    * @param {sting} credentials.password - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    signUp(credentials, onSuccess, onError){
        this.connectDB(() => {
            this.isUsernameExists(credentials.username, (usernameExists)=>{
                if(!!usernameExists){
                    onError({errors: ['This username is already exists.']}, 400);
                }else{
                    credentials['token'] = this.generateToken();
                    let adminDoc = new (this.getAdminModel())(credentials);
                    adminDoc.save((err)=>{
                        if(!!err){
                            onError && onError({
                                errors: this.parseMongooseValidationErrors(err),
                            });
                            return;
                        }
                        onSuccess && onSuccess({
                            _id: adminDoc._id,
                            token: adminDoc.token,
                            sign_up: true
                        }, 201);
                    });
                }
            }, onError);
        });
    }
    /**
    * @param {Object} credentials - Object that contains the credentials.
    * @param {sting} credentials.username - name of the user.
    * @param {sting} credentials.password - password of the user.
    * @param {function} onSuccess - callback function for success
    * @param {function} onError - callback function for error
    */
    signIn(credentials, onSuccess, onError){
        this.connectDB(() => {
            this.getAdminModel().findOneAndUpdate(
                {
                    username: credentials.username,
                    password: credentials.password,
                },
                {
                    token: this.generateToken(),
                    last_login: Date.now()
                },
                {
                    new: true
                },
                (err, adminDoc) => {
                    if(!!err){
                        onError && onError({
                            errors: this.parseMongooseValidationErrors(err),
                        });
                        return;
                    }
                    onSuccess && onSuccess({
                        _id: adminDoc._id,
                        token: adminDoc.token,
                        sign_in: true
                    }, 200);
                }
            );
        });
    }
    /**
    *
    */
    signOut(authenticatedAdmin, onSuccess, onError){
        this.connectDB(() => {
            this.getAdminModel().findOneAndUpdate(
                {
                    token: authenticatedAdmin.token
                },
                {
                    token: ''
                },
                {
                    new: true
                },
                (err, adminDoc) => {
                    if(!!err){
                        onError && onError({
                            errors: this.parseMongooseValidationErrors(err),
                        });
                        return;
                    }
                    onSuccess && onSuccess({
                        sign_out: true
                    }, 200);
                }
            );
        });
    }
    /**
    *
    */
    isAdminAuthenticated(token, onSuccess, onError){
        if(!!token){
            this.connectDB(() => {
                this.getAdminModel().findOne({ token }, (err, doc) => {
                    if(!!err){
                        onError({
                            errors: ['Something went wrong.']
                        });
                        return;
                    }
                    onSuccess( doc || false );
                });
            });
            return;
        }
        onSuccess && onSuccess(false);
    }
    /**
    *
    */
    isUsernameExists(username, onSuccess, onError){
        this.connectDB(() => {
            this.getAdminModel().findOne({username}, (err, doc) => {
                if(!!err){
                    onError({
                        errors: ['Something went wrong.']
                    });
                    return;
                }
                onSuccess( ((doc)? doc.username: false) , doc);
            });
        });
    }
    /**
    *
    */
    // isUserExists(username, password, onSuccess, onError){
    //     this.connectDB(() => {
    //         this.getAdminModel().findOne({username, password}, (err, doc) => {
    //             if(!!err){
    //                 onError({
    //                     errors: ['Something went wrong.']
    //                 });
    //                 return;
    //             }
    //             onSuccess(doc || false);
    //         });
    //     });
    // }

}

module.exports = new Admin();
