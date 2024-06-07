const express = require('express');
const healthCheckController = require('./controllers/health-check');
const userControllers = require('./controllers/usuario');
const itineraryControllers = require('./controllers/roteiro')
const itineraryStepControllers = require('./controllers/etapa-roteiro')
const expenseControllers = require('./controllers/despesa')

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

router.post('/roteiros', itineraryControllers.createItinerary);
router.get('/roteiros', itineraryControllers.listItinerariesByUser);
router.get('/roteiros/:itineraryID', itineraryControllers.getItineraryById);
router.post('/roteiros/:itineraryID', itineraryControllers.updateItinerary);
router.delete('/roteiros/:itineraryID', itineraryControllers.updateItinerary);

router.post('/despesas/:itineraryID', expenseControllers.createExpense);
router.get('/despesas/:itineraryID', expenseControllers.listExpenses);
router.get('/despesas/:itineraryID/:expenseID', expenseControllers.getExpenseById);
router.post('/despesas/:itineraryID/:expenseID', expenseControllers.updateExpense);
router.delete('/despesas/:itineraryID/:expenseID', expenseControllers.updateExpense);

router.post('/roteiros/:itineraryID/etapas', itineraryStepControllers.createStep);
router.get('/roteiros/:itineraryID/etapas', itineraryStepControllers.listSteps);
router.get('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.getStepById);
router.post('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.updateStep);
router.delete('/roteiros/:itineraryID/etapas/:stepID', itineraryStepControllers.updateStep);

module.exports = router;
