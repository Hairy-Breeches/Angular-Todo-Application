const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    checked: { type: Boolean, default: false },
    todo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model('Todo', todoSchema);