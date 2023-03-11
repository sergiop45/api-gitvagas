const route = require('express').Router();
const ModelPreVaga = require('../src/app/model/modelPreVaga');
const VerifyJwt = require('./VerifyJwt');

route.post('/prevaga', async (req, res) => {

    const vaga = req.body;

    await ModelPreVaga.create(vaga)
    .then(() => {
        res.status(201).json({message: 'Vaga registrada com sucesso!'});
    })
    .catch((erro) => res.status(500).json({message: 'erro: ' + erro}));

});

route.get('/prevaga', async (req, res) => {

    try{

        const vagas = await ModelPreVaga.find();
        res.status(200).json(vagas);

    }
    catch (erro){

        res.status(500).json({message: 'erro: '+ erro});

    }

});

route.delete('/vaga/:id', VerifyJwt, async (req, res) => {

    const id = req.params.id;

    try {

        const vaga = await ModelPreVaga.findById(id);

        if(vaga != undefined) {

            await ModelPreVaga.deleteOne({_id: id});
            res.status(200).json({message: "Vaga deletada com sucesso!"});

        } else {

            res.status(422).json({message: "Vaga não encontrada!"});

        }

    } catch (error) {
        
        console.log("erro: " + error);

    }

});