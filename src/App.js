import React, { useState, useEffect } from 'react';
import theme from './../theme.js';

import TransactionsTable from './TransactionsTable';

const App = () => {

  const [ transactions, setTransactions ] = useState({});
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch(err) {
        setError('Sorry, there was an error fetch your transactions. \n Please try again later!');
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <nav style={ styles.nav }>Rest Test</nav>
      {
        error ?
          <p style={ styles.error }>{ error }</p> :
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
  },
  error: {
    color: 'red'
  }
}

export default App;
