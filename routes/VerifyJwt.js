const jwt = require('jsonwebtoken');

function VerifyJwt(req, res, next)  {

    const authToken = req.headers['authorization'];
    const secret = process.env.MY_SECRET;
    
    if(authToken != undefined) {
    
        const bearer = authToken.split(' ');
        const token = bearer[1];

        jwt.verify(token, secret, (err, data) => {
            if(err) {
                res.status(401).json({err: "token invalido!"});
            } 
            else {

                req.token = token;
                req.userLogged = {id: data.id, user: data.email};
                next();
            }
        });

    } else {

        res.status(401).json({auth: false, message: 'Voce precisa do token para accessar essa rota!'});
        
    }

}

module.exports = VerifyJwt;