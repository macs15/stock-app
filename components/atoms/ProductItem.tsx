import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { in_stock: inStock, cod, description, category, provider_cost: cost } = product
  return (
    <tr>
      <td>{cod}</td>
      <td className="whitespace-nowrap">Nome do produto</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{inStock}</td>
      <td>{cost}</td>
      {/* <td>{}</td> */}
    </tr>
  )
}

type ProductItemProps = {
  product: Products
}

export default ProductItem
