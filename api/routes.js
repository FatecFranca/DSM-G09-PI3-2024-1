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

const allowedOrigins = ['http://localhost:80', 'http://192.168.100.91'];

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
router.get("/logout", authMiddleware, authControllers.logout);

router.post('/usuarios', userControllers.createUser);
router.get('/usuarios/:userID', authMiddleware, userControllers.getUserById);
router.post('/usuarios/:userID', authMiddleware, userControllers.updateUser);
router.delete('/usuarios/:userID', authMiddleware, userControllers.updateUser);

router.post('/postagens', postControllers.createBlogPost);
router.get('/postagens/:postID', authMiddleware, postControllers.getBlogPost);
router.post('/postagens/:postID', authMiddleware, postControllers.updateBlogPost);
router.delete('/postagens/:postID', authMiddleware, postControllers.updateBlogPost);
router.post('/postagens/:postID/publicar', authMiddleware, postControllers.publishBlogPost);

router.post('/roteiros', authMiddleware, itineraryControllers.createItinerary);
router.get('/roteiros', authMiddleware, itineraryControllers.listItinerariesByUser);
router.get('/roteiros/:itineraryID', authMiddleware, itineraryControllers.getItineraryById);
router.post('/roteiros/:itineraryID', authMiddleware, itineraryControllers.updateItinerary);
router.delete('/roteiros/:itineraryID', authMiddleware, itineraryControllers.updateItinerary);

router.post('/roteiros/:itineraryID/despesas/', authMiddleware, expenseControllers.createExpense);
router.get('/roteiros/:itineraryID/despesas/', authMiddleware, expenseControllers.listExpenses);
router.get('/roteiros/:itineraryID/despesas/:expenseID', authMiddleware, expenseControllers.getExpenseById);
router.post('/roteiros/:itineraryID/despesas/:expenseID', authMiddleware, expenseControllers.updateExpense);
router.delete('/roteiros/:itineraryID/despesas/:expenseID', authMiddleware, expenseControllers.updateExpense);

router.post('/roteiros/:itineraryID/etapas', authMiddleware, itineraryStepControllers.createStep);
router.get('/roteiros/:itineraryID/etapas', authMiddleware, itineraryStepControllers.listSteps);
router.get('/roteiros/:itineraryID/etapas/:stepID', authMiddleware, itineraryStepControllers.getStepById);
router.post('/roteiros/:itineraryID/etapas/:stepID', authMiddleware, itineraryStepControllers.updateStep);
router.delete('/roteiros/:itineraryID/etapas/:stepID', authMiddleware, itineraryStepControllers.updateStep);

router.post('/roteiros/:itineraryID/diario', authMiddleware, journalControllers.createJournalRecord);
router.get('/roteiros/:itineraryID/diario', authMiddleware, journalControllers.listJournalRecords);
router.get('/roteiros/:itineraryID/diario/:journalRecordID', authMiddleware, journalControllers.getJournalRecordById);
router.post('/roteiros/:itineraryID/diario/:journalRecordID', authMiddleware, journalControllers.updateJournalRecord);
router.delete('/roteiros/:itineraryID/diario/:journalRecordID', authMiddleware, journalControllers.updateJournalRecord);

module.exports = router;
