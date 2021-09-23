import ProductService from "@services/product-service"

const productService = new ProductService()

export const productsAPI = {
  getProduct: async (productId: string | number) => {
    const response = await productService.getProduct(productId)
    return response
  },
  getProducts: async () => {
    const response = await productService.getProducts()
    return response
  }
}
