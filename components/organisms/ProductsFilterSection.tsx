import CategoryFilter from '@molecules/CategoryFilter'
import { FC } from 'react'

const ProductsFilterSection: FC<ProductsFilterSectionProps> = ({}) => {
  return (
    <div>
      <h3 className="text-lg font-bold border-b border-gray-200 pb-5">Filtro de produtos</h3>
      <CategoryFilter />
    </div>
  )
}

type ProductsFilterSectionProps = {}

export default ProductsFilterSection
