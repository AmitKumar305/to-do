const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Todo', TodoSchema);