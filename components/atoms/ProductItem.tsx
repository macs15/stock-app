import { categories } from '@helpers/categories-data'
import { Products } from '@interfaces/product-service.interface'
import ProductMenu from '@molecules/ProductMenu'
import { useHistoricalContext } from 'components/context/historicalContext'
import { FC, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { useProductsContext } from '../context/productContext'
import Meatballs from './Meatballs'

const LOCALE = 'pt-BR'

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const [open, setOpen] = useState(false)
  const { setActiveProduct, activeProduct, category: activeCategory } = useProductsContext()
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => setOpen(false))
  const { in_stock: inStock, id, name, description, category, provider_cost: cost } = product
  const isActive = activeProduct?.id === product.id

  const { historical = [] } = useHistoricalContext()

  const handleClick = () => {
    setActiveProduct(product)
  }

  const getTotalSoldByProduct = () => {
    const totalSold = historical
      .filter(h => h.product_id === id && h.transaction_type === 'Saída')
      .reduce((acum, { total_price }) => acum + total_price, 0)

    return totalSold
  }

  return (
    <tr
      onClick={handleClick}
      className={`cursor-pointer hover:bg-blue-100 transition ${isActive ? 'item-active' : ''}`}
    >
      <td>{id}</td>
      <td className="whitespace-nowrap font-semibold">{name}</td>
      {!activeCategory && <td className="description mb-2 -mt-1">{description}</td>}
      <td>{categories[category]}</td>
      <td>{inStock}</td>
      <td>R$ {cost.toLocaleString(LOCALE)}</td>
      {activeCategory && (
        <td className="text-green-500">R$ {getTotalSoldByProduct().toLocaleString(LOCALE)}</td>
      )}
      <td className="meatballs relative">
        <Meatballs
          className="cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => setOpen(!open)}
        />
        {open && <ProductMenu ref={ref} product={product} />}
      </td>
    </tr>
  )
}

type ProductItemProps = {
  product: Products
}

export default ProductItem
