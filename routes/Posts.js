const route = require('express').Router();
const ModelPost = require('../src/app/model/modelPost');
const VerifyJwt = require('./VerifyJwt');

//POST

/*
{
    "title": "teste update",
    "description": "com 6 meses de experiencia, salario a combinar",
    "author": "sergio",
}
*/

route.post('/post', async (req, res) => {

    const post = req.body;

    await ModelVaga.create(post)
    .then(() => {
        res.status(201).json({message: 'Post registrado com sucesso!'});
    })
    .catch((erro) => res.status(500).json({message: 'erro: ' + erro}));

});

//GET ALL

route.get('/post', async (req, res) => {

    try{

        const posts = await ModelPost.find();
        res.status(200).json(posts);

    }
    catch (erro){

        res.status(500).json({message: 'erro: '+ erro});

    }

});

//GET

route.get('/post/:id', async (req, res) => {

    try {
        
        const id = req.params.id;
        await ModelPost.findById(id)
        .then((post) => {

            if(post != null){
            res.status(200).json(post);
            } else {
            res.status(422).json({message: 'Post não encontrado!'});
            }

        });


    } catch (error) {
        
        res.status(500).json({message: 'erro: ' + error});

    }

});

//DELETE 

route.delete('/post/:id', VerifyJwt, async (req, res) => {

    const id = req.params.id;

    try {

        const post = await ModelPost.findById(id);

        if(post != undefined) {

            await ModelPost.deleteOne({_id: id});
            res.status(200).json({message: "Post deletado com sucesso!"});

        } else {

            res.status(422).json({message: "Post não encontrado!"});

        }

    } catch (error) {
        
        console.log("erro: " + error);

    }

});

//UPDATE

route.patch('/post/:id', VerifyJwt, async (req, res) => {

    try {
        
        const postupdate = req.body;
        const id = req.params.id;
        const post = await ModelVaga.findById(id);

        if(post != undefined){

            await ModelPost.updateOne({_id: id}, postupdate);

            res.status(200).json(postupdate);

        } else {

            res.status(422).json({message: 'Post não encontrada para update!'});

        }
        


    } catch (error) {
        
        res.status(500).json({message: 'erro ao tentar atualizar!'})

    }

});

module.exports = route;