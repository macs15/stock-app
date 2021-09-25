import EmptyTransactions from '@atoms/EmptyTransactions'
import TransactionItem from '@atoms/TransactionItem'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { FC } from 'react'

const TransactionsList: FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <section className="bg-white rounded-md p-5 mx-auto shadow-md table-section">
      <h2 className="mb-5 text-xl font-bold">Movimento Estoque</h2>
      <table cellSpacing={12} cellPadding={12} className="w-full">
        <thead>
          <tr>
            <th align="left" colSpan={2}>
              ID
            </th>
            <th align="left">Produto</th>
            <th align="left">Tipo movimentação</th>
            <th align="left">Data</th>
            <th align="left">Quantidade</th>
            <th align="left">Total</th>
          </tr>
        </thead>
        {transactions.length ? (
          <tbody className="text-left">
            {transactions.map(t => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </tbody>
        ) : (
          <EmptyTransactions />
        )}
      </table>
    </section>
  )
}

export type TransactionsListProps = {
  transactions: HistoricalStock[]
}

export default TransactionsList
