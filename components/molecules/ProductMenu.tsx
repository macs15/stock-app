import { productsAPI } from '@helpers/api/product'
import { Products } from '@interfaces/product-service.interface'
import { forwardRef, MouseEventHandler } from 'react'

import { useModalContext } from '../context/modalContext'
import { useProductsContext } from '../context/productContext'

const ProductMenu = forwardRef<HTMLDivElement, ProductMenuProps>(({ product }, ref) => {
  const { setCurrentProduct, setProducts, products = [] } = useProductsContext()
  const { openModal } = useModalContext()

  const onDelete: MouseEventHandler<HTMLLIElement> = async () => {
    const userResponse = window.confirm('Quer remover este produto?')
    if (!userResponse) return

    const response = await productsAPI.deleteProduct(product.id)

    if (response) {
      setProducts(products?.filter(p => p.id !== product.id))
    } else {
      window.alert('Produto eliminado com sucesso')
    }
  }

  const onEdit: MouseEventHandler<HTMLLIElement> = () => {
    setCurrentProduct(product)
    openModal()
  }

  return (
    <div ref={ref} className="bg-white rounded-md shadow-md p-2 absolute meatball-menu top-0">
      <ul className="flex flex-col">
        <li className="cursor-pointer hover:text-blue-400 p-2" onClick={onEdit}>
          Editar
        </li>
        <li className="cursor-pointer hover:text-blue-400 p-2 text-red-500" onClick={onDelete}>
          Excluir
        </li>
      </ul>
    </div>
  )
})

type ProductMenuProps = {
  product: Products
}

export default ProductMenu
