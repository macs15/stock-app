import Button from '@atoms/Button'
import NavigationBar from '@atoms/NavigationBar'
import Modal from '@molecules/Modal'
import ProductForm from '@organisms/ProductForm'
import ProductList from '@organisms/ProductList'
import { useModalContext } from 'components/context/modalContext'
import { useProductsContext } from 'components/context/productContext'
import { useRef } from 'react'
import { useClickAway } from 'react-use'

const ProductsPage = () => {
  const { products, currentProduct, setCurrentProduct } = useProductsContext()
  const { open, openModal, closeModal } = useModalContext()
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => {
    /* clearing form */
    closeModal()
    setCurrentProduct(undefined)
  })

  return (
    <div className="w-full mt-24 mb-5">
      <NavigationBar title="Produtos">
        <Button text="Adicionar produto" onClick={openModal} />
      </NavigationBar>

      <Modal ref={ref} open={open}>
        <div className="h-full flex flex-col justify-center items-center">
          <h3 className="text-xl mt-5 font-semibold">Novo produto</h3>
          {open && <ProductForm defaultValues={currentProduct} />}
        </div>
      </Modal>

      <section className="flex mt-10 text-center mx-5">
        <div className="bg-white mr-5 p-5 shadow-md rounded-md">
          <h3 className="font-bold mt-1">Filtro de produtos</h3>
          <div></div>
        </div>
        <div className="table-section bg-white rounded-md shadow-md w-full">
          <ProductList products={products} />
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
