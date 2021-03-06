import Button from '@atoms/Button'
import { FC, useEffect, useState } from 'react'

import { useProductsContext } from '../context/productContext'
import EntryForm from './EntryForm'
import ProfitSection from './ProfitSection'
import SellForm from './SellForm'

const ActionsSection: FC<ActionsSectionProps> = ({}) => {
  const [{ tab, active }, setActiveTab] = useState<ActiveTab>({ tab: null, active: false })
  const { activeProduct, currentProduct } = useProductsContext()

  useEffect(() => {
    if (!active) return

    setActiveTab({ active: false, tab: null })
  }, [activeProduct, currentProduct])

  const getSidebarTitle = () => {
    if (!active) return 'Menu de entrada/saída'
    if (tab === 'sell') return 'Nova venda'
    if (tab === 'entry') return 'Cadastrar entrada'
    return 'Lucro do produto'
  }

  const handleNewSell = () => {
    setActiveTab({ tab: 'sell', active: true })
  }

  const handleProductEntry = () => {
    setActiveTab({ tab: 'entry', active: true })
  }

  const handleProductProfit = () => {
    setActiveTab({ tab: 'profit', active: true })
  }

  return (
    <div className={`w-full action-section ${activeProduct ? '' : 'h-32'}`}>
      <div className="relative">
        {active && (
          <button
            className="text-blue-400 bg-gray-100 px-2 py-1 rounded-md absolute left-0"
            type="button"
            onClick={() => setActiveTab({ tab: null, active: false })}
          >
            Voltar
          </button>
        )}
        <h3 className="text-lg font-bold border-b border-gray-200 pb-5">{getSidebarTitle()}</h3>
        {activeProduct && (
          <div className="relative">
            <h3 className="w-full text-lg font-semibold my-5 whitespace-nowrap overflow-ellipsis overflow-hidden">
              {activeProduct.name}
            </h3>
          </div>
        )}
      </div>
      {activeProduct && !active && (
        <div className=" px-5 my-10 flex flex-col">
          <Button onClick={handleNewSell} className="w-full shadow-md" text="Nova venda" />
          <Button
            onClick={handleProductEntry}
            className="w-full mt-5 shadow-md"
            text="Cadastrar entrada"
          />
          <Button
            onClick={handleProductProfit}
            className="w-full mt-5 shadow-md"
            text="Mostrar lucro"
          />
        </div>
      )}

      {!activeProduct && !active && (
        <p className="mt-10">Selecione um produto para ver as opções</p>
      )}

      {tab === 'sell' && activeProduct && <SellForm activeProduct={activeProduct} />}
      {tab === 'entry' && activeProduct && <EntryForm activeProduct={activeProduct} />}
      {tab === 'profit' && activeProduct && <ProfitSection activeProduct={activeProduct} />}
    </div>
  )
}

type ActionsSectionProps = {}

type ActiveTab = {
  tab: 'sell' | 'entry' | 'profit' | null
  active: boolean
}

export default ActionsSection
