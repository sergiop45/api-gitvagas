const mongoose = require('mongoose');

const ModelVaga = new mongoose.Schema({
    
    title: {
            type: String,
            required: true   
            },
    description: {
                  type: String,
                  required: true   
                 },
    email: String,
    fone: String,
    city: String,

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Vaga', ModelVaga);