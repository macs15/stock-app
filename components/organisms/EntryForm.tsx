import InputForm from '@atoms/InputForm'
import SubmitButton from '@atoms/SubmitButton'
import { Products } from '@interfaces/product-service.interface'
import { FC, useEffect } from 'react'

import useSellForm from '../hooks/useSellForm'

const EntryForm: FC<useEntryFormProps> = ({ activeProduct }) => {
  const { setValue, provider_cost, sending, register, handleSubmit, errors, onSubmit, getTotal } =
    useSellForm(activeProduct, 'entry')

  useEffect(() => {
    setValue('pricePerProduct', provider_cost)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        type="number"
        labelText={`Quantidade produtos`}
        onFocus={({ target }) => target.select()}
        error={errors.productQty?.message}
        register={() => register('productQty')}
      />
      <InputForm
        type="number"
        step={0.1}
        defaultValue={provider_cost}
        disabled
        onFocus={({ target }) => target.select()}
        labelText={`Preço/produto de fornecedor: R$ ${provider_cost})`}
        error={errors.pricePerProduct?.message}
        register={() => register('pricePerProduct')}
      />
      <p className="text-sm text-left mb-5">
        * O preço do produto só pode ser alterado através da edição do produto.
      </p>

      <p className="mb-5">
        Total: <span className="font-semibold">R$ {getTotal()}</span>
      </p>
      <SubmitButton disabled={sending} value={sending ? 'Enviando...' : 'Enviar'} />
    </form>
  )
}

type useEntryFormProps = {
  activeProduct: Products
}

export default EntryForm
