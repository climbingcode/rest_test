const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// NOTE: This could be moved to a database, will need to collect all transactions again if server crashes
const db = {
  totalCount: null,
  page: 1,
  hits: [],
  balance: 0
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

const fetchPage = async (page) => {
  try {
    const data = await fetch(`http://resttest.bench.co/transactions/${page}.json`);
    return await data.json();
  } catch(err) {
    return { };
  }
}

// Add all new unique transactions together
const sumTransactionsBalance = transactions => {
  return transactions.reduce((total, transaction) => total += parseInt(transaction.Amount), 0);
}

// HACK: Filter out duplicate records (Assuming that transactions with the same data, company, account and amount should only have one record)
// Would be better if each transaction had a unique ID
const filterDuplicates = transactions => {
  return transactions.filter(transaction => JSON.stringify(db.hits).indexOf(JSON.stringify(transaction)) === -1);
}

// Function to collect missing transactions only if API updates
const collectMissingTransactions = async (res, req, next, page = db.page) => {

  const { totalCount, transactions } = await fetchPage(page);

  // NOTE: Set running total count if first ever request
  if (!db.totalCount) {
    db.totalCount = totalCount;
  }

  // NOTE: Update result transactions if page has transactions and totalCount has not been exceeded
  if (transactions && db.hits.length < totalCount) {
    const filteredTransactions = filterDuplicates(transactions);
    db.hits = [ ...db.hits, ...filteredTransactions ];
    db.totalCount = db.hits.length;
    db.balance = db.balance += sumTransactionsBalance(filteredTransactions);
    db.page = page;
  }

  // NOTE: Only make requests for missing transactions when totalCount is more than running total
  if (db.totalCount < totalCount) {
    await collectMissingTransactions(res, req, next, db.page + 1);
  } else {
    next();
  }

}

router.get('/transactions', asyncMiddleware(collectMissingTransactions), (req, res) => {
  res.json(db);
});

module.exports = router;
