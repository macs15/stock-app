import { FC } from 'react'

import ActionsSection from './ActionsSection'

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="bg-white mr-5 p-5 shadow-md rounded-md max-w-sm w-1/3">
      <ActionsSection />
      <h3 className="font-bold mt-1">Filtro de produtos</h3>
      <div></div>
    </aside>
  )
}

type SidebarProps = {}

export default Sidebar
