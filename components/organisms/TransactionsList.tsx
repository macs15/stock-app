import EmptyTransactions from '@atoms/EmptyTransactions'
import TransactionItem from '@atoms/TransactionItem'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { FC } from 'react'

const TransactionsList: FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <section className="rounded-md p-5 mx-auto bg-white shadow-md h-full table-section">
      <h2 className="mb-5 text-xl font-bold">Movimento Estoque</h2>
      <table cellSpacing={12} cellPadding={12} className="w-full">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th align="left" colSpan={2}>
              ID
            </th>
            <th align="left">Produto</th>
            <th align="left">Tipo movimentação</th>
            <th align="left">Data</th>
            <th align="left">Quantid.</th>
            <th align="left">Preço fornecedor</th>
            <th align="left">Preço venda</th>
            <th align="left">Total</th>
          </tr>
        </thead>
        <tbody className="text-left h-full">
          {/* Slice because we can't reverse the main array */}
          {transactions.length ? (
            transactions
              .slice(0)
              .reverse()
              .map(t => <TransactionItem key={t.id} transaction={t} />)
          ) : (
            <EmptyTransactions colSpan={7} className="w-full text-center" />
          )}
        </tbody>
      </table>
    </section>
  )
}

export type TransactionsListProps = {
  transactions: HistoricalStock[]
}

export default TransactionsList
