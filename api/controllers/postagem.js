const BlogPost = require('../models/postagem');

async function createBlogPost(req, res) {
  try {
    const data = req.body;

    data.data_criacao = Date.now();
    data.data_atualizacao = data.data_criacao;

    const newBlogPost = new BlogPost(data);
    const savedPost = await newBlogPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
}

async function getBlogPost(req, res) {
  try {
    const postID = req.params.postID;

    const blogPost = await BlogPost.findById(postID).populate('gasto');

    if (!blogPost || blogPost.deleted) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Erro ao obter postagem:', error);
    res.status(500).json({ error: 'Erro ao obter postagem' });
  }
}

async function updateBlogPost(req, res) {
  try {
    const postID = req.params.postID;
    const updatedData = req.body;

    let existingPost = await BlogPost.findById(postID);

    if (!existingPost || existingPost.deleted) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }

    if (req.method === 'DELETE') {
      existingPost.deleted = true;
    } else {
      existingPost = Object.assign(existingPost, { ...updatedData });
    }

    const updatedDoc = await existingPost.save();
    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Erro ao atualizar postagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar postagem' });
  }
}

async function publishBlogPost(req, res) {
  try {
    const postID = req.params.postID;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      postID,
      { publico: true, data_publicacao: Date.now() },
      { new: true }
    );

    if (!updatedPost || updatedPost.deleted) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Erro ao publicar postagem:', error);
    res.status(500).json({ error: 'Erro ao publicar postagem' });
  }
}

async function listPublicPostsSortedByRating(req, res) {
  try {
    const publicPosts = await BlogPost.find({ publico: true, deleted: false })
      .sort({ avaliacao_media: -1 })
      .populate('comentarios');

    res.status(200).json(publicPosts);
  } catch (error) {
    console.error('Error getting public posts:', error);
    res.status(500).json({ error: 'Error getting public posts' });
  }
}

module.exports = {
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  publishBlogPost,
  listPublicPostsSortedByRating,
};