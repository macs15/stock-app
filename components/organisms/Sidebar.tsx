import { FC } from 'react'

import ActionsSection from './ActionsSection'

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="bg-white mr-5 p-5 shadow-md rounded-md max-w-sm w-1/3">
      <ActionsSection />
    </aside>
  )
}

type SidebarProps = {}

export default Sidebar
