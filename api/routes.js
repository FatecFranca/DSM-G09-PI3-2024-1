const express = require('express');
const healthCheckController = require('./controllers/health-check');
const userControllers = require('./controllers/usuario');
const itineraryControllers = require('./controllers/roteiro')
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
router.get('/roteiros/:itineraryID', itineraryControllers.getItineraryById);
router.post('/roteiros/:itineraryID', itineraryControllers.updateItinerary);
router.delete('/roteiros/:itineraryID', itineraryControllers.updateItinerary);

router.post('/despesas/:itineraryID', expenseControllers.createExpense);
router.get('/despesas/:itineraryID', expenseControllers.listExpenses);
router.get('/despesas/:itineraryID/:expenseID', expenseControllers.getExpenseById);
router.put('/despesas/:itineraryID/:expenseID', expenseControllers.updateExpense);
router.delete('/despesas/:itineraryID/:expenseID', expenseControllers.updateExpense);

module.exports = router;
