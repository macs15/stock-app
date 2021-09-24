import useProducts from '@hooks/useProducts'
import { Products } from '@interfaces/product-service.interface'
import { createContext, FC, ReactNode, useContext } from 'react'

interface ContextProps {
  products: Products[] | undefined
  setProducts: (products: Products[]) => void
}

export const ProductsContext = createContext({} as ContextProps)

export const ProductsProvider: FC = ({ children }) => {
  const { products, setProducts } = useProducts()

  return (
    <ProductsContext.Provider
      value={{
        setProducts,
        products
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
