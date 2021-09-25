import { productsAPI } from '@helpers/api/product'
import { Products } from '@interfaces/product-service.interface'
import { useEffect, useState } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState<Products[]>()
  const [productsBase, setProductsBase] = useState<Products[]>()
  const [currentProduct, setCurrentProduct] = useState<Products | undefined>()
  const [activeProduct, setActiveProduct] = useState<Products | undefined>()
  const [activeTab, setActiveTab] = useState<string>('products')
  const [category, setCategory] = useState<string>('')

  const getProductsByCategory = () => {
    if (!category) return productsBase
    const updatedProducts = (productsBase || []).filter(p => p.category === category)
    return updatedProducts
  }

  const getProducts = async () => {
    const productsResponse = await productsAPI.getProducts()
    setProducts(productsResponse)
    setProductsBase(productsResponse)
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setActiveProduct(undefined)
  }, [activeTab])

  useEffect(() => {
    setProducts(getProductsByCategory())
  }, [category])

  return {
    products,
    setProducts,
    currentProduct,
    setCurrentProduct,
    activeProduct,
    setActiveProduct,
    activeTab,
    setActiveTab,
    productsBase,
    setProductsBase,
    category,
    setCategory
  }
}

export default useProducts
