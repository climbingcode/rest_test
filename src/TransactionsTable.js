import React from 'react';

const TransactionsTable = ({
  hits,
  balance
}) => (
  <table style={ styles.table }>
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
        }) => (
          <tr style={ styles.row }>
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
    background: '#FCFBFB'
  }
}

export default TransactionsTable;
