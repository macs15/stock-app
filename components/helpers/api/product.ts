import { Products } from '@interfaces/product-service.interface'
import ProductService from '@services/product-service'

const productService = new ProductService()

export const productsAPI = {
  getProduct: async (productId: string | number) => {
    const response = await productService.getProduct(productId)
    return response
  },
  getProducts: async () => {
    const response = await productService.getProducts()
    return response
  },
  createProduct: async (product: Products) => {
    const response = await productService.createProduct(product)
    return response
  },
  updateProduct: async (id: number, product: Products) => {
    const response = await productService.updateProduct(id, product)
    return response
  },
  deleteProduct: async (id: number) => {
    const response = await productService.deleteProduct(id)
    return response
  }
}
