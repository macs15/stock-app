import Button from '@atoms/Button'
import { FC, useEffect, useState } from 'react'

import { useProductsContext } from '../context/productContext'
import SellForm from './SellForm'

const ActionsSection: FC<ActionsSectionProps> = ({}) => {
  const [{ tab, active }, setActiveTab] = useState<ActiveTab>({ tab: null, active: false })
  const { activeProduct, currentProduct } = useProductsContext()

  useEffect(() => {
    if (!active) return

    setActiveTab({ active: false, tab: null })
  }, [activeProduct, currentProduct])

  const handleNewSell = () => {
    setActiveTab({ tab: 'sell', active: true })
  }

  const handleProductEntry = () => {
    setActiveTab({ tab: 'entry', active: true })
  }

  return (
    <div className={`w-full ${activeProduct ? '' : 'h-32'}`}>
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
        <h3 className="text-lg font-bold">Ações</h3>
      </div>
      {activeProduct && !active && (
        <div className=" px-5 my-10 flex flex-col">
          <Button onClick={handleNewSell} className="w-full shadow-md" text="Nova venda" />
          <Button
            onClick={handleProductEntry}
            className="w-full mt-5 shadow-md"
            text="Cadastrar entrada"
          />
        </div>
      )}

      {!activeProduct && !active && (
        <p className="mt-10">Selecione um produto para ver as opções</p>
      )}

      {tab === 'sell' && activeProduct && <SellForm activeProduct={activeProduct} />}
    </div>
  )
}

type ActionsSectionProps = {}

type ActiveTab = {
  tab: 'sell' | 'entry' | null
  active: boolean
}

export default ActionsSection