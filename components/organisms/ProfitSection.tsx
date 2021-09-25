import { LOCALE } from '@helpers/constants'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { Products } from '@interfaces/product-service.interface'
import { useProductsContext } from 'components/context/productContext'
import { FC, useEffect, useState } from 'react'

import { useHistoricalContext } from '../context/historicalContext'

const ProfitSection: FC<ProfitSectionProps> = ({ activeProduct }) => {
  const { id, in_stock } = activeProduct
  const [{ sales, profit, productsSold }, setProductSales] = useState({
    sales: 0,
    profit: 0,
    productsSold: 0
  })
  const {} = useProductsContext()
  const { historical = [] } = useHistoricalContext()

  const getTotalSold = (sales: HistoricalStock[]) => {
    return sales.reduce((acum, { total_price }) => acum + total_price, 0)
  }

  const getTotalProfit = (sales: HistoricalStock[]) => {
    return sales.reduce(
      (acum, { total_price: total, quantity: qty, price_per_product: price }) =>
        acum + (total - qty * price),
      0
    )
  }

  const getTotalProductsSold = (sales: HistoricalStock[]) =>
    sales.reduce((acum, { quantity }) => acum + quantity, 0)

  const getSales = () => {
    const productSalesFilter = (h: HistoricalStock) =>
      h.product_id === id && h.transaction_type === 'Saída'
    const totalSales = historical.filter(productSalesFilter)

    setProductSales({
      profit: getTotalProfit(totalSales),
      sales: getTotalSold(totalSales),
      productsSold: getTotalProductsSold(totalSales)
    })
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <div>
      <ul className="w-full text-left text-lg flex gap-2 flex-col">
        <li>
          Saída total: <span className="font-semibold">R$ {sales.toLocaleString(LOCALE)}</span>
        </li>
        <li>
          Lucro total: <span className="font-semibold">R$ {profit.toLocaleString(LOCALE)}</span>
        </li>
        <li>
          <p className="">
            Quantidade disponível: <span className="font-semibold">{in_stock} und.</span>
          </p>
        </li>
        <li>
          <p>
            Produtos vendidos: <span className="font-semibold">{productsSold} und.</span>
          </p>
        </li>
      </ul>
    </div>
  )
}

type ProfitSectionProps = {
  activeProduct: Products
}

export default ProfitSection
