export interface HistoricalStock {
  id?: number
  product_id: number
  transaction_type: TransactionType
  price_per_product: number
  total_price: number
  date: Date
  quantity: number
}

export type TransactionType = 'Entrada' | 'Saída'
