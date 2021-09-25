import { historicalAPI } from '@helpers/api/historical'
import { productsAPI } from '@helpers/api/product'
import { SellFormSchema } from '@helpers/sell-form-schema'
import { joiResolver } from '@hookform/resolvers/joi'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { Products } from '@interfaces/product-service.interface'
import { useHistoricalContext } from 'components/context/historicalContext'
import { useProductsContext } from 'components/context/productContext'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const useSellForm = (activeProduct: Products, type: TransactionType) => {
  const { in_stock, id, provider_cost } = activeProduct
  const { setProducts, products = [], setActiveProduct } = useProductsContext()
  const { setHistorical, historical } = useHistoricalContext()
  const [sending, setSending] = useState(false)
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SellForm>({
    resolver: joiResolver(SellFormSchema)
  })
  let timer: NodeJS.Timer

  const onSubmit: SubmitHandler<SellForm> = async data => {
    const { productQty, pricePerProduct } = data
    setSending(true)

    if (productQty > activeProduct.in_stock && type === 'out') {
      setError('productQty', {
        type: 'manual',
        message: 'A quantidade encomendada é maior que o estoque'
      })

      setSending(false)
      timer = setTimeout(() => {
        clearErrors('productQty')
      }, 2000)
      return
    }

    const productResponse = await productsAPI.updateProduct(id, {
      ...activeProduct,
      in_stock: type === 'entry' ? in_stock + productQty : in_stock - productQty
    })

    const newHistorical: HistoricalStock = {
      date: new Date(),
      product_id: id,
      transaction_type: type === 'entry' ? 'Entrada' : 'Saída',
      price_per_product: pricePerProduct,
      total_price: pricePerProduct * productQty,
      quantity: productQty
    }

    /* this is like atomic operation, if the last one fails we'll not register at historical  */
    /* BUT these records should happen just in backend, never in frontend */
    const historicalResponse =
      productResponse && (await historicalAPI.createHistoricalStock(newHistorical))

    /* we'll return the stock to its initial condition if historical fails */
    /* again, this thing should only happen in the backend */
    if (!historicalResponse && productResponse) {
      await productsAPI.updateProduct(id, {
        ...activeProduct,
        in_stock: in_stock
      })
    }

    if (!historicalResponse) {
      /* Generic error because our API has no a properly error handler */
      setError('pricePerProduct', { message: 'Houve um erro no envio dos dados', type: 'manual' })
      setSending(false)
      timer = setTimeout(() => {
        clearErrors('pricePerProduct')
      }, 5000)
      return
    }

    setHistorical(historical ? [...historical, historicalResponse] : [historicalResponse])
    setProducts([...products.filter(p => p.id !== id), productResponse])
    setActiveProduct(productResponse)
    reset()
    setSending(false)
    timer = setTimeout(() => {
      alert('Venda acrescentada com sucesso')
    }, 300)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const getTotal = () => {
    const price = watch('pricePerProduct')
    const qty = watch('productQty')

    if (!price || !qty) return 0
    return price * qty
  }
  return {
    provider_cost,
    sending,
    register,
    handleSubmit,
    errors,
    onSubmit,
    getTotal,
    setValue
  }
}

export type SellForm = {
  pricePerProduct: number
  productQty: number
}

type TransactionType = 'entry' | 'out'

export default useSellForm
