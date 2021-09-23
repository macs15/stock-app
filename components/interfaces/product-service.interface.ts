export interface Products {
  cod: number
  description: string
  category: Category
  provider_cost: number
  in_stock: number
}

export enum Category {
  Eletrodoméstico = 'Eletrodoméstico',
  Eletrônico = 'Eletrônico',
  Móvel = 'móvel'
}
