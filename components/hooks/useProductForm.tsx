import { Types } from '@atoms/TextAlert'
import { productsAPI } from '@helpers/api/product'
import { ProductFormSchema } from '@helpers/product-form-schema'
import { joiResolver } from '@hookform/resolvers/joi'
import { Products } from '@interfaces/product-service.interface'
import { useProductsContext } from 'components/context/productContext'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useModalContext } from '../context/modalContext'

const useProductForm = (values?: Products) => {
  const { id, in_stock, ...defaultValues } = values || {}
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductsForm>({
    resolver: joiResolver(ProductFormSchema),
    defaultValues
  })
  const { setProducts, products = [], setCurrentProduct } = useProductsContext()
  const { closeModal } = useModalContext()
  const [notify, setNotify] = useState<Notify | null>(null)
  const [sending, setSending] = useState(false)
  let timer: NodeJS.Timeout

  const onSubmit: SubmitHandler<Products> = async (data, e) => {
    setSending(true)

    const productResponse = values?.id
      ? await productsAPI.updateProduct(values.id, { ...data, in_stock: values.in_stock })
      : await productsAPI.createProduct({ ...data, in_stock: 0 })

    if (!productResponse) {
      /* Generic error because our API has no a properly error handler */
      setNotify({ message: 'Houve um erro no envio dos dados', type: 'error' })
      setSending(false)
      timer = setTimeout(() => {
        setNotify(null)
      }, 5000)
      return
    }

    if (values?.id) {
      setProducts([...products.filter(p => p.id !== values.id), productResponse])
      setCurrentProduct() // cleanup
      closeModal()
      alert('Produto atualizado con sucesso')
      return
    } else {
      setProducts(products?.length ? [...products, productResponse] : [productResponse])
    }

    setNotify({ message: 'dados enviados com sucesso', type: 'success' })
    setSending(false)
    reset()

    setTimeout(() => {
      setNotify(null)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return {
    register,
    handleSubmit,
    notify,
    sending,
    onSubmit,
    errors
  }
}

type ProductsForm = Omit<Products, 'id' | 'in_stock'>

type Notify = {
  message: string
  type: Types
}

export default useProductForm
