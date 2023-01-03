const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Auth", Schema);