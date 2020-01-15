const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Group name is required']
    },
    description: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        required: [true, 'Group URL is required']
    },
    created_at: {
        type: Number,
        default: () => Date.now()
    },
});

module.exports = GroupSchema;
