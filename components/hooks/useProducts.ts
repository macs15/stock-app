import { productsAPI } from '@helpers/api/product'
import { Products } from '@interfaces/product-service.interface'
import { useEffect, useState } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState<Products[]>()

  const getProducts = async () => {
    const productsResponse = await productsAPI.getProducts()
    setProducts(productsResponse)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return { products }
}

export default useProducts
