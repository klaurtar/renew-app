const mongoose = require('mongoose');
const FbItemSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Item id is required']
    },
    url: {
        type: String,
        required: [true, 'FbItem url is required']
    },
    published_at: {
        type: Number,
        default: () => Date.now()
    },
});

module.exports = FbItemSchema;
