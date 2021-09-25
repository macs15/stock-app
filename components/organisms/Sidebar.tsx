import { FC } from 'react'

import ActionsSection from './ActionsSection'
import ProductsFilterSection from './ProductsFilterSection'

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="bg-white z-10 sticky sidebar mr-5 p-5 shadow-md rounded-md max-w-sm w-1/3">
      <ActionsSection />
      <ProductsFilterSection />
    </aside>
  )
}

type SidebarProps = {}

export default Sidebar
