import InputForm from '@atoms/InputForm'
import TextAlert from '@atoms/TextAlert'
import { categories } from '@helpers/categories-data'
import { ProductFormSchema } from '@helpers/product-form-schema'
import { joiResolver } from '@hookform/resolvers/joi'
import { Products } from '@interfaces/product-service.interface'
import { FocusEventHandler } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Products>({ resolver: joiResolver(ProductFormSchema) })
  const onSubmit: SubmitHandler<Products> = data => {
    console.log(data)
  }

  return (
    <form
      className="flex flex-col w-full h-full justify-center px-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        placeholder="Nome do produto"
        register={() => register('name')}
        error={errors.name?.message}
      />

      <InputForm
        placeholder="Descripção detalhada"
        register={() => register('description')}
        error={errors.description?.message}
      />

      <select className="bg-gray-100 mb-5 p-2 rounded-md" {...register('category')}>
        <option value="">--Seleccione uma categoria--</option>
        {Object.entries(categories).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {errors.category && <TextAlert text="O campo é obrigatório" />}

      <InputForm
        type="number"
        defaultValue={0}
        placeholder="Quantidade recibida"
        register={() => register('in_stock')}
        error={errors.in_stock?.message}
      />

      <InputForm
        placeholder="Custo unitário"
        register={() => register('provider_cost')}
        error={errors.provider_cost?.message}
      />

      <input
        type="submit"
        className="bg-blue-500 text-white font-semibold cursor-pointer py-2 rounded-md"
      />
    </form>
  )
}

export default ProductForm
