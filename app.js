const express = require('express');
const  app = express();
const PostController = require('./routes/Posts');
const UserController = require('./routes/Usuarios');
const LoginController = require('./routes/Login');
const conn = require('./src/database/connection');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv-safe').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

conn();

//ROTAS

app.use('/api/', PostController);
app.use('/api/', UserController);
app.use('/api/', LoginController);

app.get('/', (req, res) => {

    res.status(200).json({message: 'Bem-vindo a Bigsoft'});

});

app.listen(port, () => {
    
    console.log('Servidor rodando na porta: ' + port);
    
});