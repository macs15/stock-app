import { getErrorMsg } from '@helpers/errors'
import { HistoricalStock } from '@interfaces/historical-service.interface'

import HttpRequest from './http-request'

export default class HistoricalService extends HttpRequest {
  private getStockConfig(id?: string | number) {
    this.configEndpoint('/historical-stock')
    return this.get(id)
  }

  async getHistoricalStock(): Promise<HistoricalStock[]> {
    try {
      const response = await this.getStockConfig()

      if (response.status !== this.statusCodes.OK) return []

      return response.data
    } catch (error) {
      getErrorMsg(error)
      return []
    }
  }

  async getHistoricalStockById(id: string | number): Promise<HistoricalStock | null> {
    try {
      const response = await this.getStockConfig(id)

      if (response.status !== this.statusCodes.OK) return null

      return response.data
    } catch (error) {
      getErrorMsg(error)
      return null
    }
  }

  private getHistoricalPostConfig(data: HistoricalStock) {
    this.configEndpoint('/historical-stock')
    return this.post(data)
  }

  async createHistoricalStock(data: HistoricalStock): Promise<HistoricalStock | null> {
    try {
      const response = await this.getHistoricalPostConfig(data)
      if (response.status !== this.statusCodes.CREATED) return null

      return response.data
    } catch (error) {
      getErrorMsg(error)
      return null
    }
  }
}
