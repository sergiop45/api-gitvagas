const mongoose = require('mongoose');

const ModelPost = new mongoose.Schema({
    
    title: {
            type: String,
            required: true   
            },
    description: {
                  type: String,
                  required: true   
                 },
    author: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', ModelPost);