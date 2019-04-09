const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

// NOTE: This could be moved to a database, will need to collect all transactions again if server crashes
const results = {
  totalCount: null,
  page: 1,
  transactions: []
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

const fetchPage = async (page) => {
  try {
    const data = await fetch(`http://resttest.bench.co/transactions/${page}.json`);
    console.log('Collected transactions from page: ', page);
    return await data.json();
  } catch(err) {
    return { };
  }
}

const filterDuplicateTransactions = transactions => {
  const transactionsJson = JSON.stringify(results.transactions);
  return transactions.filter(transaction => transactionsJson.indexOf(JSON.stringify(transaction)) === -1);
}

const collectMissingTransactions = async (res, req, next, page = results.page) => {

  const { totalCount, transactions } = await fetchPage(page);

  // NOTE: Set running total count if first ever request
  if (!results.totalCount) {
    results.totalCount = totalCount;
  }

  // NOTE: Update result transactions if page has transactions and totalCount has not been exceeded
  if (transactions && results.transactions.length < totalCount) {
    const filteredTransactions = filterDuplicateTransactions(transactions);
    results.transactions = [ ...results.transactions, ...filteredTransactions ];
    results.totalCount = results.transactions.length;
    results.page = page;
  }

  // NOTE: Only make requests for missing transactions when totalCount is more than running total
  if (results.totalCount < totalCount) {
    await collectMissingTransactions(res, req, next, results.page + 1);
  } else {
    next();
  }

}

router.get('/transactions', asyncMiddleware(collectMissingTransactions), (req, res) => {
  res.json(results);
});

module.exports = router;
