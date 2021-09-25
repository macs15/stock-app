import { FC } from 'react'

const NavigationBar: FC<NavigationBarProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <nav className="header shadow-md fixed top-0 left-0 z-10 px-5 py-3 w-full flex justify-between border-b bg-gray-50">
      <select
        className="bg-gray-200 px-2 text-lg font-semibold rounded-md"
        value={activeTab}
        onChange={e => setActiveTab(e.target.value)}
      >
        <option value="products">Produtos</option>
        <option value="movement">Movimentação</option>
      </select>
      <h1 className="font-bold text-xl">
        {activeTab === 'products' ? 'Listagens de produtos' : 'Movimentação de produtos'}
      </h1>
      {children}
    </nav>
  )
}

type NavigationBarProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default NavigationBar
