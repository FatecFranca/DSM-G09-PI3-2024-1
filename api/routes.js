const express = require('express');
const healthCheckController = require('./controllers/health-check');
const userControllers = require('./controllers/usuario');

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

router.get('/healthcheck', healthCheckController.healthCheckHandler);
router.post('/usuarios', userControllers.createUser);
router.get('/usuarios/:userID', userControllers.getUserById);
router.post('/usuarios/:userID', userControllers.updateUser);
router.delete('/usuarios/:userID', userControllers.updateUser);
router.post('/posts', userControllers.createPost);
router.get('/posts/:postID', userControllers.getPostById);
router.post('/posts/:postID', userControllers.updatePost);
router.delete('/posts/:postID', userControllers.updatePost);
router.get('/posts-by-user/:userID', userControllers.getPostsByUser)

module.exports = router;
