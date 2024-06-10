const BlogPost = require('../models/postagem');
const Itinerary = require('../models/roteiro');
const ItineraryStep = require('../models/etapa-roteiro');
const JournalRecord = require('../models/folha-diario');

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

async function createBlogPostFromItinerary(req, res) {
  try {
    const itineraryID = req.params.itineraryID;
    const blogPostData = req.body;

    const itinerary = await Itinerary.findById(itineraryID);
    if (!itinerary) {
      return res.status(404).json({ message: 'Roteiro não encontrado' });
    }

    const newBlogPost = new BlogPost({
      ...blogPostData,
      ...itinerary._doc,
    });

    delete newBlogPost._id;
    delete newBlogPost.__t;

    const savedPost = await newBlogPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Erro ao criar postagem a partir de roteiro:', error);
    res.status(500).json({ error: 'Erro ao criar postagem a partir de roteiro' });
  }
}

async function createBlogPostFromItineraryStep(req, res) {
  try {
    const stepID = req.params.stepID;
    const blogPostData = req.body;

    const step = await ItineraryStep.findById(stepID);
    if (!step) {
      return res.status(404).json({ message: 'Etapa de roteiro não encontrada' });
    }

    const newBlogPost = new BlogPost({
      ...blogPostData,
      ...step._doc,
    });

    delete newBlogPost._id;
    delete newBlogPost.__t;

    const savedBlogPost = await newBlogPost.save();

    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Erro ao criar postagem a partir de etapa de roteiro', error);
    res.status(500).json({ error: 'Erro ao criar postagem a partir de etapa de roteiro' });
  }
}

async function createBlogPostFromJournalRecord(req, res) {
  try {
    const journalRecordID = req.params.journalRecordID;
    const blogPostData = req.body;

    const step = await JournalRecord.findById(journalRecordID);
    if (!step) {
      return res.status(404).json({ message: 'Etapa de roteiro não encontrada' });
    }

    const newBlogPost = new BlogPost({
      ...blogPostData,
      ...step._doc,
    });

    delete newBlogPost._id;
    delete newBlogPost.__t;

    const savedBlogPost = await newBlogPost.save();

    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Erro ao criar postagem a partir de etapa de roteiro', error);
    res.status(500).json({ error: 'Erro ao criar postagem a partir de etapa de roteiro' });
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
  createBlogPostFromItinerary,
  createBlogPostFromItineraryStep,
  createBlogPostFromJournalRecord,
  getBlogPost,
  updateBlogPost,
  publishBlogPost,
  listPublicPostsSortedByRating,
};