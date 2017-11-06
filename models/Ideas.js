const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ideaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('ideas', ideaSchema);