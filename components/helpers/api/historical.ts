import { HistoricalStock } from '@interfaces/historical-service.interface'
import HistoricalService from '@services/historical-service'

const historicalService = new HistoricalService()

export const historicalAPI = {
  getHistoricalStockById: async (id: string | number) => {
    const response = await historicalService.getHistoricalStockById(id)
    return response
  },
  getHistoricalStock: async () => {
    const response = await historicalService.getHistoricalStock()
    return response
  },
  createHistoricalStock: async (data: HistoricalStock) => {
    const response = await historicalService.createHistoricalStock(data)
    return response
  }
}
