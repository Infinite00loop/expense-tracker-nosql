const express = require('express');

const router = express.Router();

const purchaseController = require('../controllers/purchase');
const userauthentication = require('../middleware/auth');

router.get('/premiummembership',userauthentication.authenticate, purchaseController.purchasepremium);
router.post('/updatetransactionstatus',userauthentication.authenticate, purchaseController.updateTransactionStatus);
// router.delete('/delete-expense/:id',userauthentication.authenticate, expenseController.deleteExpense);

module.exports = router;