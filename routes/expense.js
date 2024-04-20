const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');
const userauthentication = require('../middleware/auth');

router.get('/get-expense',userauthentication.authenticate, expenseController.getExpense);
router.get('/get-income', userauthentication.authenticate, expenseController.getIncome);
router.post('/insert-expense',userauthentication.authenticate, expenseController.insertExpense);
router.post('/insert-income', userauthentication.authenticate, expenseController.insertIncome);
router.delete('/delete-expense/:id',userauthentication.authenticate, expenseController.deleteExpense);
router.delete('/delete-income/:id', userauthentication.authenticate, expenseController.deleteIncome);

module.exports = router;