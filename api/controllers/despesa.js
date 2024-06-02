const Expense = require('../models/despesa');
const Itinerary = require('../models/roteiro')
const { ObjectId } = require('mongodb');
const {
    exists,
    retrieve,
    upsert,
    retrieveAll
} = require('../database/general');

const ITINERARY_COLLECTION = Itinerary;
const EXPENSE_COLLECTION = Expense;

async function createExpense(req, res) {
    const expense = req.body;
    const itineraryID = req.params.itineraryID;
    itineraryIDObject =  new ObjectId(itineraryID);
    try {

        if (!await exists(ITINERARY_COLLECTION, "_id",itineraryIDObject)) {
            return res.status(404).json({ message: "Roteiro não encontrado" });
        }

        expense['roteiroId'] = itineraryIDObject;

        const result = await upsert(EXPENSE_COLLECTION, expense);
        console.info(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar despesa:', error);
        res.status(500).json({ error: 'Erro ao criar despesa' });
    }
}


async function listExpenses(req, res) {
    console.log("gorf", req.params)

    const itineraryID = req.params.itineraryID;


    try {
        const expenses = await retrieveAll(EXPENSE_COLLECTION, "roteiroId", new ObjectId(itineraryID));
        console.info(expenses)
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


async function getExpenseById(req, res) {
    const expenseID = req.params.expenseID;
    try {
        const expense = await retrieve(EXPENSE_COLLECTION, "_id", new ObjectId(expenseID));
        if (!expense) {
            return res.status(404).json({ message: "Despesa não encontrada" });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function updateExpense(req, res) {
    let expenseID = req.params.expenseID;

    if (!expenseID) {
        return res.status(400).json({ error: 'ID da despesa não fornecido' });
    }

    const updatedExpense = req.body;

    try {
        let existingExpense = await retrieve(EXPENSE_COLLECTION, "_id", new ObjectId(expenseID));
        if (!existingExpense) {
            return res.status(404).json({ message: "Despesa não encontrada" });
        }

        existingExpense._id = expenseID;

        if (req.method === 'DELETE') {
            existingExpense.deleted = true;
        } else {
            console.info("faers56", existingExpense)
            Object.assign(existingExpense, updatedExpense);
            console.info("vmfixt", existingExpense)
        }
        const result = await upsert(EXPENSE_COLLECTION, existingExpense);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao atualizar despesa:", error);
        res.status(500).json({ message: "Erro ao atualizar despesa" });
    }
}


module.exports = {
    listExpenses,
    createExpense,
    getExpenseById,
    updateExpense,
};
