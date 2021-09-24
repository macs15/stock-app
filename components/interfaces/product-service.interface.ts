import { Category } from '../helpers/categories-data'

export interface Products {
  cod: number
  name: string
  description: string
  category: Category
  provider_cost: number
  in_stock: number
}
