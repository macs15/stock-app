import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ModalProvider } from 'components/context/modalContext'
import { ProductsProvider } from 'components/context/productContext'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ProductsProvider>
  )
}
export default MyApp
