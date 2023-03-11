const route = require('express').Router();
const ModelVaga = require('../src/app/model/modelVaga');
const VerifyJwt = require('./VerifyJwt');

//POST

/*
{
    "title": "teste update",
    "description": "com 6 meses de experiencia, salario a combinar",
    "email": "newempresa@gmail.com",
    "fone": "41 3677-1421",
    "city": "Curitiba"
}
*/

route.post('/vaga', async (req, res) => {

    const vaga = req.body;

    await ModelVaga.create(vaga)
    .then(() => {
        res.status(201).json({message: 'Vaga registrada com sucesso!'});
    })
    .catch((erro) => res.status(500).json({message: 'erro: ' + erro}));

});

//GET ALL

route.get('/vaga', async (req, res) => {

    try{

        const vagas = await ModelVaga.find();
        res.status(200).json(vagas);

    }
    catch (erro){

        res.status(500).json({message: 'erro: '+ erro});

    }

});

//GET

route.get('/vaga/:id', async (req, res) => {

    try {
        
        const id = req.params.id;
        await ModelVaga.findById(id)
        .then((vaga) => {

            if(vaga != null){
            res.status(200).json(vaga);
            } else {
            res.status(422).json({message: 'Vaga não encontrada!'});
            }

        });


    } catch (error) {
        
        res.status(500).json({message: 'erro: ' + error});

    }

});

//DELETE 

route.delete('/vaga/:id', VerifyJwt, async (req, res) => {

    const id = req.params.id;

    try {

        const vaga = await ModelVaga.findById(id);

        if(vaga != undefined) {

            await ModelVaga.deleteOne({_id: id});
            res.status(200).json({message: "Vaga deletada com sucesso!"});

        } else {

            res.status(422).json({message: "Vaga não encontrada!"});

        }

    } catch (error) {
        
        console.log("erro: " + error);

    }

});

//UPDATE

route.patch('/vaga/:id', VerifyJwt, async (req, res) => {

    try {
        
        const vagaupdate = req.body;
        const id = req.params.id;
        const vaga = await ModelVaga.findById(id);

        if(vaga != undefined){

            await ModelVaga.updateOne({_id: id}, vagaupdate);

            res.status(200).json(vagaupdate);

        } else {

            res.status(422).json({message: 'Vaga não encontrada para update!'});

        }
        


    } catch (error) {
        
        res.status(500).json({message: 'erro ao tentar atualizar!'})

    }

});

module.exports = route;