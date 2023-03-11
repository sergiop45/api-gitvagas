const route = require('express').Router();
const User = require('../src/app/model/modelUsuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//LOGIN

route.post('/login', async(req, res) => {

    const userLogin = req.body;
    
    const user = await User.findOne({user: userLogin.user})
    
    if(user != undefined) {

        const aut = await bcrypt.compareSync(userLogin.password, user.password);

        if(aut) {

            const id = user._id;
            const secret = process.env.MY_SECRET;
            const token = jwt.sign({ id }, secret, {
                expiresIn: 300
            });

            res.status(200).json({auth: true, token: token});

        } else {
            res.status(401).json({message: 'Usuario ou senha incorretos'});
        }
        


    } else {

        res.status(404).json({message: 'usuario nao encontrado!'});

    }

});

route.post('/logout', (req, res) => {

    res.status(200).json({auth: false, token: null})

});

module.exports = route;