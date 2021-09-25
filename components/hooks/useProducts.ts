import { productsAPI } from '@helpers/api/product'
import { Products } from '@interfaces/product-service.interface'
import { useEffect, useState } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState<Products[]>()
  const [currentProduct, setCurrentProduct] = useState<Products | undefined>()
  const [activeProduct, setActiveProduct] = useState<Products | undefined>()
  const [activeTab, setActiveTab] = useState<string>('products')

  const getProducts = async () => {
    const productsResponse = await productsAPI.getProducts()
    setProducts(productsResponse)
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setActiveProduct(undefined)
  }, [activeTab])

  return {
    products,
    setProducts,
    currentProduct,
    setCurrentProduct,
    activeProduct,
    setActiveProduct,
    activeTab,
    setActiveTab
  }
}

export default useProducts
