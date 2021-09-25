import { productsAPI } from '@helpers/api/product'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { Products } from '@interfaces/product-service.interface'
import TransactionsList from '@organisms/TransactionsList'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { historicalAPI } from '../components/helpers/api/historical'

const Home: NextPage = () => {
  const [products, setProducts] = useState<Products[]>()
  const [historical, setHistorical] = useState<HistoricalStock[]>()

  const getProducts = async () => {
    const productsResponse = await productsAPI.getProducts()
    setProducts(productsResponse)
  }

  const getHistoricalStock = async () => {
    const historicalResponse = await historicalAPI.getHistoricalStock()
    setHistorical(historicalResponse)
  }

  useEffect(() => {
    getProducts()
    getHistoricalStock()
  }, [])

  return (
    <div>
      {JSON.stringify(products)}

      {historical && <TransactionsList transactions={historical} />}
    </div>
  )
}

export default Home
