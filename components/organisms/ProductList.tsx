import EmptyTransactions from '@atoms/EmptyTransactions'
import ProductItem from '@atoms/ProductItem'
import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

const ProductList: FC<ProductListProps> = ({ products }) => {
  if (!products)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )

  return (
    <table cellSpacing={12} cellPadding={12} className="w-full relative">
      <thead className="bg-gray-100 sticky top-0">
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Costo proveedor</th>
          <th>Estoque</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.reverse().map(p => <ProductItem key={p.cod} product={p} />)
        ) : (
          <EmptyTransactions className="w-full" colSpan={6} />
        )}
      </tbody>
    </table>
  )
}

type ProductListProps = {
  products: Products[] | undefined
}

export default ProductList
