const mongoose = require('mongoose');
const { uri } = require('./config');

async function main() {

    try {
        
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri);
        
    } catch (error) {

        console.log('Erro: ' + error);

    }

}

module.exports = main;