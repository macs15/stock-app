import EmptyTransactions from '@atoms/EmptyTransactions'
import ProductItem from '@atoms/ProductItem'
import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

const ProductList: FC<ProductListProps> = ({ products }) => {
  if (!products.length) return <EmptyTransactions />

  return (
    <table cellSpacing={12} cellPadding={12} className="w-full">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Costo proveedor</th>
          <th>Estoque</th>
        </tr>
      </thead>
      <tbody className="border-t border-gray-900">
        {products.map(p => (
          <ProductItem key={p.cod} product={p} />
        ))}
      </tbody>
    </table>
  )
}

type ProductListProps = {
  products: Products[]
}

export default ProductList
