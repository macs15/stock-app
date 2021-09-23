import { productsAPI } from '@helpers/api/product'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Products } from '../components/interfaces/product-service.interface'

const Home: NextPage = () => {
  const [products, setProducts] = useState<Products[]>()

  const getProducts = async () => {
    const products = await productsAPI.getProducts()
    setProducts(products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return <div>{JSON.stringify(products)}</div>
}

export default Home
