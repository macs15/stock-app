import { Category } from '../helpers/categories-data'

export interface Products {
  id: number
  name: string
  description: string
  category: Category
  provider_cost: number
  in_stock: number
}
