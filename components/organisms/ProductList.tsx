import EmptyTransactions from '@atoms/EmptyTransactions'
import ProductItem from '@atoms/ProductItem'
import { Products } from '@interfaces/product-service.interface'
import { useProductsContext } from 'components/context/productContext'
import { FC } from 'react'

const ProductList: FC<ProductListProps> = ({ products }) => {
  const { category } = useProductsContext()

  if (!products)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )

  return (
    <table
      cellSpacing={12}
      cellPadding={12}
      className="w-full shadow-md rounded-md bg-white relative"
    >
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th>Código</th>
          <th>Nome</th>
          {!category && <th>Descrição</th>}
          <th>Categoria</th>
          <th>Estoque</th>
          <th>Costo proveedor</th>
          {category && <th>Total saída</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products
            .slice(0)
            .reverse()
            .map(p => <ProductItem key={p.id} product={p} />)
        ) : (
          <EmptyTransactions className="w-full" colSpan={6} />
        )}
      </tbody>
      <tfoot className="bg-gray-100">
        <tr className="w-full">
          <td colSpan={7}>Produtos total: {products.length}</td>
        </tr>
      </tfoot>
    </table>
  )
}

type ProductListProps = {
  products: Products[] | undefined
}

export default ProductList
