const express = require('express');
const cors = require('cors');
const healthCheckController = require('./controllers/health-check');
const authControllers = require('./controllers/auth')
const userControllers = require('./controllers/usuario');
const postControllers = require('./controllers/postagem');
const itineraryControllers = require('./controllers/roteiro')
const itineraryStepControllers = require('./controllers/etapa-roteiro')
const expenseControllers = require('./controllers/despesa');
const journalControllers = require('./controllers/folha-diario')
const jwt = require('jsonwebtoken');

const router = express.Router();

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado: Token de acesso ausente' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado: Token de acesso ausente' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    console.log(decoded)
    req.usuario = decoded;  
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Acesso negado: Token inválido' });
  }
}

router.get('/healthcheck', healthCheckController.healthCheckHandler);

router.post("/login", authControllers.login);
router.post("/refresh", authControllers.refreshAuthToken);
router.get("/logout", authControllers.logout);

router.post('/usuarios', userControllers.createUser);
router.get('/usuarios/:userID', userControllers.getUserById);
router.post('/usuarios/:userID', userControllers.updateUser);
router.delete('/usuarios/:userID', userControllers.updateUser);

router.get('/postagens', postControllers.listPublicPostsSortedByRating);
router.post('/postagens', postControllers.createBlogPost);
router.get('/postagens/:postID', postControllers.getBlogPost);
router.post('/postagens/:postID', postControllers.updateBlogPost);
router.delete('/postagens/:postID', postControllers.updateBlogPost);
router.post('/postagens/:postID/publicar', postControllers.publishBlogPost);

router.post('/roteiros', itineraryControllers.createItinerary);
router.get('/roteiros', itineraryControllers.listItinerariesByUser);
router.get('/roteiros/:itineraryID', itineraryControllers.getItineraryById);
router.post('/roteiros/:itineraryID', itineraryControllers.updateItinerary);
router.post('/roteiros/:itineraryID/criar-postagem', postControllers.createBlogPostFromItinerary);
router.delete('/roteiros/:itineraryID', itineraryControllers.updateItinerary);

router.post('/roteiros/:itineraryID/despesas/', expenseControllers.createExpense);
router.get('/roteiros/:itineraryID/despesas/', expenseControllers.listExpenses);
router.get('/roteiros/:itineraryID/despesas/:expenseID', expenseControllers.getExpenseById);
router.post('/roteiros/:itineraryID/despesas/:expenseID', expenseControllers.updateExpense);
router.delete('/roteiros/:itineraryID/despesas/:expenseID', expenseControllers.updateExpense);

router.post('/roteiros/:itineraryID/etapas', itineraryStepControllers.createStep);
router.get('/roteiros/:itineraryID/etapas', itineraryStepControllers.listSteps);
router.get('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.getStepById);
router.post('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.updateStep);
router.post('/roteiros/:itineraryID/etapas/:stepID/criar-postagem', postControllers.createBlogPostFromItineraryStep);
router.delete('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.updateStep);

router.post('/roteiros/:itineraryID/diario', journalControllers.createJournalRecord);
router.get('/roteiros/:itineraryID/diario', journalControllers.listJournalRecords);
router.get('/roteiros/:itineraryID/diario/:journalRecordID', journalControllers.getJournalRecordById);
router.post('/roteiros/:itineraryID/diario/:journalRecordID', journalControllers.updateJournalRecord);
router.post('/roteiros/:itineraryID/diario/:journalRecordID/criar-postagem', postControllers.createBlogPostFromJournalRecord);
router.delete('/roteiros/:itineraryID/diario/:journalRecordID', journalControllers.updateJournalRecord);

module.exports = router;
