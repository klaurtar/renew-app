const mongoose = require('mongoose');
//const crypto = require('crypto');
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    token: {
        type: String,
        default: function(){
            return '';
        }
    },
    last_login: {
        type: Number,
        default: () => Date.now()
    },
    registered_at: {
        type: Number,
        default: () => Date.now()
    },
});

// note)-> doc['password']; -> later, encrpt password
AdminSchema.pre('save', function(next){
    let doc = this;
    return next();
    // if(doc.isNew){
    //     crypto.randomBytes(48, function(err, buffer) {
    //         doc['token'] = buffer.toString('base64');
    //         return next();
    //     });
    // }
});

module.exports = AdminSchema;
