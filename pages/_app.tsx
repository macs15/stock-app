import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ProductsProvider } from 'components/context/productContext'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  )
}
export default MyApp
