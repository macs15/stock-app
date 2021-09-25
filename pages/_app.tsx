import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { HistoricalProvider } from 'components/context/historicalContext'
import { ModalProvider } from 'components/context/modalContext'
import { ProductsProvider } from 'components/context/productContext'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <HistoricalProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </HistoricalProvider>
    </ProductsProvider>
  )
}
export default MyApp
