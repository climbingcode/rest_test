import React from 'react';
import theme from './../theme.js';

const TransactionsTable = ({
  hits,
  balance
}) => (
  <table style={ styles.table } cellspacing="0" cellpadding="0">
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
          <tr style={ index % 2 === 0 ? styles.row.even : styles.row.odd }>
            <td>{ Date }</td>
            <td>{ Company }</td>
            <td>{ Ledger }</td>
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
    background: '#fff'
  },
  row: {
    even: {
      background: '#FCFBFB'
    },
    odd: {
      background: '#FCFBFB'
    }
  }
}

export default TransactionsTable;
