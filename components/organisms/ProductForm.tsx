import InputForm from '@atoms/InputForm'
import TextAlert, { Types } from '@atoms/TextAlert'
import { categories } from '@helpers/categories-data'
import { ProductFormSchema } from '@helpers/product-form-schema'
import { joiResolver } from '@hookform/resolvers/joi'
import { Products } from '@interfaces/product-service.interface'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useProductsContext } from '../context/productContext'
import { productsAPI } from '../helpers/api/product'

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Products>({ resolver: joiResolver(ProductFormSchema) })
  const { setProducts, products } = useProductsContext()
  const [notify, setNotify] = useState<Notify | null>(null)
  const [sending, setSending] = useState(false)

  const onSubmit: SubmitHandler<Products> = async (data, e) => {
    setSending(true)
    const newProduct = await productsAPI.createProduct(data)

    if (!newProduct) {
      /* Generic error because our API has no a properly error handler */
      setNotify({ message: 'Houve um erro no envio dos dados', type: 'error' })
      setSending(false)
      setTimeout(() => {
        setNotify(null)
      }, 5000)
      return
    }

    setProducts(products?.length ? [...products, newProduct] : [newProduct])
    setNotify({ message: 'dados enviados com sucesso', type: 'success' })
    setSending(false)
    reset()

    setTimeout(() => {
      setNotify(null)
    }, 5000)
  }

  return (
    <form
      className="flex flex-col w-full h-full justify-center px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        placeholder="Nome do produto"
        labelText="Nome do produto"
        register={() => register('name')}
        error={errors.name?.message}
      />

      <InputForm
        placeholder="Descripção detalhada"
        labelText="Descripção detalhada"
        register={() => register('description')}
        error={errors.description?.message}
      />

      <select className="bg-gray-100 p-2 mb-5 rounded-md" {...register('category')}>
        <option value="">--Seleccione uma categoria--</option>
        {Object.entries(categories).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {errors.category && <TextAlert className="-mt-5" text="O campo é obrigatório" />}

      <InputForm
        type="number"
        defaultValue={0}
        onFocus={({ target }) => target.select()}
        placeholder="Quantidade recibida"
        labelText="Quantidade recibida"
        register={() => register('in_stock')}
        error={errors.in_stock?.message}
      />

      <InputForm
        labelText="Custo unitário"
        type="number"
        placeholder="Custo unitário"
        defaultValue={0}
        onFocus={({ target }) => target.select()}
        register={() => register('provider_cost')}
        error={errors.provider_cost?.message}
      />

      {notify && <TextAlert text={notify.message} type={notify.type} />}
      <input
        disabled={sending}
        type="submit"
        value={sending ? 'Enviando...' : 'Enviar'}
        className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold cursor-pointer py-2 rounded-md mt-5"
      />

      <input
        type="reset"
        value="Limpar"
        className="cursor-pointer mt-5 bg-transparent mx-auto px-2 py-1 rounded-md hover:bg-red-100 text-red-400"
      />
    </form>
  )
}

type Notify = {
  message: string
  type: Types
}

export default ProductForm
