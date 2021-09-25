import useProducts from '@hooks/useProducts'
import { Products } from '@interfaces/product-service.interface'
import { createContext, FC, useContext } from 'react'

interface ContextProps {
  products: Products[] | undefined
  currentProduct: Products | undefined
  activeProduct: Products | undefined
  activeTab: string
  setProducts: (products: Products[]) => void
  setCurrentProduct: (product?: Products) => void
  setActiveProduct: (product?: Products) => void
  setActiveTab: (tab: string) => void
}

export const ProductsContext = createContext({} as ContextProps)

export const ProductsProvider: FC = ({ children }) => {
  const {
    products,
    setProducts,
    currentProduct,
    setCurrentProduct,
    setActiveProduct,
    activeProduct,
    activeTab,
    setActiveTab
  } = useProducts()

  return (
    <ProductsContext.Provider
      value={{
        setProducts,
        products,
        currentProduct,
        setCurrentProduct,
        activeProduct,
        setActiveProduct,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (typeof context === 'undefined') {
    throw new Error('useProductsContext must be use within a ProductsProvider')
  }
  return context
}
