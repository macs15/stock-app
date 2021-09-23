import { getErrorMsg } from '@helpers/errors'
import { AxiosPromise } from 'axios'
import { Products } from 'components/interfaces/product-service.interface'

import HttpRequest from './http-request'

export default class ProductService extends HttpRequest {
  private getProductConfig(productId?: string | number) {
    this.configEndpoint('/products')
    return this.get(productId)
  }

  async getProduct(productId: string | number): Promise<Products | null> {
    try {
      const response = await this.getProductConfig(productId)

      if (response.status !== this.statusCodes.OK) return null

      return response.data
    } catch (error) {
      getErrorMsg(error)
      return null
    }
  }

  async getProducts(): Promise<Products[]> {
    try {
      const response = await this.getProductConfig()

      if (response.status !== this.statusCodes.OK) return []

      return response.data
    } catch (error) {
      getErrorMsg(error)
      return []
    }
  }
}
