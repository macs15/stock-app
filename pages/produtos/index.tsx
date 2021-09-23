import useProducts from '@hooks/useProducts'
import ProductList from '@organisms/ProductList'

const ProductsPage = () => {
  const { products } = useProducts()
  console.log(products)

  return (
    <div className="w-full text-center">
      <h1 className="text-xl font-bold mt-5">Produtos</h1>
      <section className="table-section mx-auto mt-10 bg-white rounded-md shadow-md">
        {products && <ProductList products={products} />}
      </section>
    </div>
  )
}

export default ProductsPage
