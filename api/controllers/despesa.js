const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Expense = require('../models/despesa');

async function createExpense(req, res) {
  const expenseData = req.body;
  const itineraryID = req.params.itineraryID;

  try {
    expenseData.roteiroId = itineraryID;
    const newExpense = new Expense(expenseData);
    await newExpense.save();
    console.info('Despesa criada com sucesso!');
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
}

async function listExpenses(req, res) {
  const itineraryID = req.params.itineraryID;

  try {
    const expenses = await Expense.find({ roteiroId: new ObjectId(itineraryID) });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getExpenseById(req, res) {
  const expenseID = req.params.expenseID;

  try {
    const expense = await Expense.findById(expenseID);
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
  const expenseID = req.params.expenseID;
  const updatedData = req.body;

  if (!expenseID) {
    return res.status(400).json({ error: 'ID da despesa não fornecido' });
  }

  try {
    let existingExpense = await Expense.findById(expenseID);
    if (!existingExpense) {
      return res.status(404).json({ message: "Despesa não encontrada" });
    }

    if (req.method === 'DELETE') {
      try {
        await Expense.findByIdAndDelete(expenseID);
        res.status(200).json({ message: "Despesa deletada com sucesso!" });
      } catch (error) {
        console.error("Erro ao deletar despesa:", error);
        res.status(500).json({ message: "Erro ao deletar despesa" });
      }
    } else {

      existingExpense = Object.assign(existingExpense, { ...updatedData });
      await existingExpense.save();
      res.status(200).json(existingExpense);
    }
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
