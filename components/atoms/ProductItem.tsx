import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

import Meatballs from './Meatballs'

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { in_stock: inStock, id, name, description, category, provider_cost: cost } = product
  return (
    <tr>
      <td>{id}</td>
      <td className="whitespace-nowrap font-semibold">{name}</td>
      <td className="description mb-2 -mt-1">{description}</td>
      <td>{category}</td>
      <td>{inStock}</td>
      <td>{cost}</td>
      <td className="meatballs relative">
        <Meatballs
          className="cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => console.log(name)}
        />
      </td>
    </tr>
  )
}

type ProductItemProps = {
  product: Products
}

export default ProductItem
