import React from 'react';
import theme from './../theme.js';

const formatDate = date => new Date(date).toDateString();

const TransactionsTable = ({
  hits,
  balance
}) => (
  <table style={ styles.table } cellSpacing="0" cellPadding="0">
    <tbody>
      <tr style={ styles.header }>
        <th>Date</th>
        <th>Company</th>
        <th>Account</th>
        <th>${ balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</th>
      </tr>
      {
        hits.map(({
          Date,
          Company,
          Ledger,
          Amount
        }, index) => (
          <tr key={ `transaction_${ index }` } style={ parseInt(Amount) > 0 ? styles.row.income : styles.row.payment }>
            <td style={ parseInt(Amount) > 0 ? styles.row.income : styles.lighterColor  }>{ formatDate(Date) }</td>
            <td>{ Company }</td>
            <td style={ parseInt(Amount) > 0 ? styles.row.income : styles.lighterColor  }>{ Ledger }</td>
            <td>{ Amount }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

const styles = {
  table: {
    width: '100%'
  },
  header: {
    color: theme.colors.primary,
    background: '#fff'
  },
  row: {
    income: {
      color: theme.colors.primary
    },
    payment: {
      color: theme.colors.secondary
    }
  },
  lighterColor: {
    color: '#9C9C9E'
  }
}

export default TransactionsTable;
