const mongoose = require('mongoose');
const UUID = require('uuid');

const database = process.env.MONGO_DB || 'marketplace';

class App {
    constructor() {
        this.db = false;
        this.fixMongooseDeprecationWarning();

    }
    /**
    *
    */
    connectDB(onConnect, onError){
        if(!this.db){
            mongoose.connect(`mongodb://localhost/${database}`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );
            this.db = mongoose.connection;
            this.db.once('open', function() {
                console.log('connected to database.');
                onConnect();
            });
        }else{
            onConnect();
        }
    }
    /**
    *
    */
    generateToken(){
        return UUID() + '=' + UUID();
    }
    /**
    *
    */
    parseMongooseValidationErrors(err){
        let validationErrors = ['Something went wrong.'];
        if(!!err){
            let errs = err.errors;
            for(let k in errs){
                validationErrors.push(errs[k]['message']);
            }
        }
        return validationErrors;
    }
    /**
    *
    */
    fixMongooseDeprecationWarning(){
        mongoose.set('useCreateIndex', true);
    }
}

module.exports = App;
