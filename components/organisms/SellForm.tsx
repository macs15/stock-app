import InputForm from '@atoms/InputForm'
import SubmitButton from '@atoms/SubmitButton'
import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

import useSellForm from '../hooks/useSellForm'

const SellForm: FC<SellFormProps> = ({ activeProduct }) => {
  const { in_stock } = activeProduct
  const { provider_cost, sending, register, handleSubmit, errors, onSubmit, getTotal } =
    useSellForm(activeProduct, 'out')

  return (
    <>
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
        <SubmitButton disabled={sending} value={sending ? 'Enviando...' : 'Enviar'} />
      </form>
    </>
  )
}

type SellFormProps = {
  activeProduct: Products
}

export default SellForm
