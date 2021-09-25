import InputForm from '@atoms/InputForm'
import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

import useSellForm from '../hooks/useSellForm'

const SellForm: FC<SellFormProps> = ({ activeProduct }) => {
  const { in_stock } = activeProduct
  const { name, provider_cost, sending, register, handleSubmit, errors, onSubmit, getTotal } =
    useSellForm(activeProduct)

  return (
    <>
      <div className="relative">
        <h3 className="w-full text-lg font-semibold my-5 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {name}
        </h3>
      </div>
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
        <p className="mb-5">
          Total venda: <span className="font-semibold">R$ {getTotal()}</span>
        </p>
        <input
          disabled={sending}
          className="bg-blue-500 rounded-md cursor-pointer text-white px-2 py-1 w-1/2"
          type="submit"
          value={sending ? 'Enviando...' : 'Enviar'}
        />
      </form>
    </>
  )
}

type SellFormProps = {
  activeProduct: Products
}

export default SellForm
