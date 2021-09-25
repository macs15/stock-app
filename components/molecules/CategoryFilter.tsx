import { categories } from '@helpers/categories-data'
import { useProductsContext } from 'components/context/productContext'
import { FC, useEffect, useState } from 'react'

const CategoryFilter: FC<CategoryFilterProps> = ({}) => {
  const { category, setCategory } = useProductsContext()

  return (
    <div className="mt-5">
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        name="categories"
        className="bg-gray-200 p-2 rounded-md"
      >
        <option value="">-- Seleccione uma categoria --</option>
        {Object.entries(categories).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

type CategoryFilterProps = {}

export default CategoryFilter
