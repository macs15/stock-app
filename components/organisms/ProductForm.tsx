import InputForm from '@atoms/InputForm'
import TextAlert from '@atoms/TextAlert'
import { categories } from '@helpers/categories-data'
import { Products } from '@interfaces/product-service.interface'
import { FC } from 'react'

import useProductForm from '../hooks/useProductForm'

const ProductForm: FC<ProductFormProps> = ({ values }) => {
  const { register, handleSubmit, notify, sending, errors, onSubmit } = useProductForm(values)

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
        labelText="Custo unitário"
        type="number"
        placeholder="Custo unitário"
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

type ProductFormProps = {
  values?: Products
}

export default ProductForm
