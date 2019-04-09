import React, { useState, useEffect } from 'react';

const App = () => {

  const [ transactions, setTransactions ] = useState([]);
  const [ balance, setBalance ] = useState(0);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data.transactions);
    setBalance(data.balance);
  }

  useEffect(() => {
    fetchTransactions()
  }, []);

  return (
    <section>
    {
      transactions.map(({ Ledger, Company, Amount }) => (
        <li>{ Company } { Amount }</li>
      ))
    }
    </section>
  )
}

export default App;
