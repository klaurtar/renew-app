const mongoose = require('mongoose');
const utilities = require('../../utilities');
const ItemSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: utilities.ITEM_CATEGORIES,
        required: [true, 'Item category is required']
    },
    title: {
        type: String,
        required: [true, 'Item name is required']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Item price is required'],
        default: function(){
            return 1;
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
    last_fb_published_at: {
        type: Number,
        default: 0
    },
});

module.exports = ItemSchema;
