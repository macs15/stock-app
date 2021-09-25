import { FC } from 'react'

const EmptyTransactions: FC<EmptyTransactionsProps> = ({ className = '', colSpan = 1 }) => {
  return (
    <tr className={`${className} mt-5`}>
      <td className="py-5" colSpan={colSpan}>
        Sem entradas
      </td>
    </tr>
  )
}

type EmptyTransactionsProps = {
  className?: string
  colSpan?: number
}

export default EmptyTransactions
