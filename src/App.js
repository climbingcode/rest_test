import React, { useState, useEffect } from 'react';
import theme from './../theme.js';

import TransactionsTable from './TransactionsTable';

const App = () => {

  const [ transactions, setTransactions ] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    }
    fetchData();
  }, []);

  return (
    <section>
      <nav style={ styles.nav }>Rest Test</nav>
      {
        transactions.hits ?
        <TransactionsTable { ...transactions }/> :
        <p style={ styles.paragraph }>Loading...</p>
      }
    </section>
  )
}

const styles = {
  nav: {
    background: theme.colors.primary,
    textAlign: 'center',
    color: '#fff',
    padding: '20px 0'
  },
  paragraph: {
    textAlign: 'center'
  }
}

export default App;
