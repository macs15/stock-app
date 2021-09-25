import 'dayjs/locale/pt-br'

import { HistoricalStock } from '@interfaces/historical-service.interface'
import dayjs from 'dayjs'
import { FC } from 'react'

const LOCALE = 'pt-BR'

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const { id, product_id, total_price, price_per_product, transaction_type, date, quantity } =
    transaction
  return (
    <tr className="">
      <td colSpan={2}>{id}</td>
      <td>{product_id}</td>
      <td>{transaction_type}</td>
      <td>{dayjs(date).format('DD MM YY hh:mma')}</td>
      <td>{quantity}</td>
      <td>R$ {(price_per_product || 0).toLocaleString(LOCALE)}</td>
      <td>R$ {total_price.toLocaleString(LOCALE)}</td>
    </tr>
  )
}

type TransactionItemProps = {
  transaction: HistoricalStock
}

export default TransactionItem
