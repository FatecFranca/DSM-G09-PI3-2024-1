const { ObjectId } = require('mongodb');
const Post = require('../models/post');
const {
    retrieve,
    upsert,
    retrieveAll
} = require('../database/general');

const POST_COLLECTION = Post;

async function createPost(req, res) {
    const post = req.body;

    post.data_criacao = new Date();
    post.usuario = new ObjectId(post.usuario)

    try {
        const result = await upsert(POST_COLLECTION, post);
        res.status(201).json(result);
    } catch (error) {

        console.error('Erro ao criar novo post:', error);
        res.status(500).json({ error: 'Erro ao criar novo post' });
    }
};

async function getPostById(req, res) {
    const postID = req.params.postID;

    if (!postID) {
        return res.status(400).json({
            error: "ID do post não fornecido"
        });
    }

    try {
        const post = await retrieve(POST_COLLECTION, "_id", new ObjectId(postID))
        if (!post) {
            return res.status(404).json({
                error: "Post não encontrado"
            });
        }
        return res.status(200).json(post);
    } catch (error) {

    }
}

async function updatePost(req, res) {
    const postID = req.params.postID;

    if (!postID) {
        return res.status(400).json({
            error: "ID do post não fornecido"
        });
    }

    const updatedPost = req.body;

    try {
        let existingPost = await retrieve(POST_COLLECTION, "_id", new ObjectId(postID));
        if (!existingPost) {
            return res.status(404).json({
                error: "Post não encontrado"
            });
        }
        if (req.method === 'DELETE') {
            existingPost.deleted = true;
        } else {
            existingPost.data_atualizacao = new Date();
            existingPost.titulo = updatedPost.titulo;
            existingPost.descricao = updatedPost.descricao;
            existingPost.url_imagem = updatedPost.url_imagem;
            existingPost.local = updatedPost.local;
            existingPost.valor_gasto = updatedPost.valor_gasto;
        }
        const result = await upsert(POST_COLLECTION, existingPost);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({ error: 'Erro ao atualizar post' });
    }
};

async function getPostsByUser(req, res) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({
            error: "ID do usuário não fornecido"
        });
    }
    try {
        const posts = await retrieveAll(POST_COLLECTION, { usuario: new ObjectId(userID) });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar posts do usuário' });
    }
}

module.exports = {
    createPost,
    getPostById,
    updatePost,
    getPostsByUser
}