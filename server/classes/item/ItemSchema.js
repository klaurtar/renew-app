const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Item name is required']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: function(){
            return 0;
        }
    },
    photos: {
        type: [String]
    },
    groups: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    views: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Number,
        default: () => Date.now()
    },
});

module.exports = ItemSchema;
