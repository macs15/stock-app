import InputForm from '@atoms/InputForm'
import { SellFormSchema } from '@helpers/sell-form-schema'
import { joiResolver } from '@hookform/resolvers/joi'
import { Products } from '@interfaces/product-service.interface'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SellForm: FC<SellFormProps> = ({ activeProduct }) => {
  const { name, in_stock, provider_cost } = activeProduct
  const [sending, setSending] = useState(false)
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors }
  } = useForm<ProductsForm>({
    resolver: joiResolver(SellFormSchema)
  })
  let timer: NodeJS.Timer

  const onSubmit: SubmitHandler<ProductsForm> = data => {
    setSending(true)

    if (data.productQty > activeProduct.in_stock) {
      setError('productQty', {
        type: 'value',
        message: 'A quantidade encomendada é maior que o estoque'
      })

      timer = setTimeout(() => {
        clearErrors('productQty')
      }, 2000)
      return
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <h3 className="w-full text-lg font-semibold my-5 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {name}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <InputForm
          type="number"
          labelText={`Quantidade produtos (Disponíveis: ${in_stock})`}
          onFocus={({ target }) => target.select()}
          error={errors.productQty?.message}
          register={() => register('productQty')}
        />
        <InputForm
          type="number"
          step={0.1}
          onFocus={({ target }) => target.select()}
          labelText={`Preço por produto (Preço fornecedor: R$ ${provider_cost})`}
          error={errors.pricePerProduct?.message}
          register={() => register('pricePerProduct')}
        />
        <input
          disabled={sending}
          className="bg-blue-500 rounded-md cursor-pointer text-white px-2 py-1 w-1/2"
          type="submit"
        />
      </form>
    </>
  )
}

type SellFormProps = {
  activeProduct: Products
}

export type ProductsForm = {
  pricePerProduct: number
  productQty: number
}

export default SellForm
