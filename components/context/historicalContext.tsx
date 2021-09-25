import useHistorical from '@hooks/useHistorical'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { createContext, FC, useContext } from 'react'

interface ContextProps {
  historical: HistoricalStock[] | undefined
  setHistorical: (historical: HistoricalStock[]) => void
}

export const HistoricalContext = createContext({} as ContextProps)

export const HistoricalProvider: FC = ({ children }) => {
  const { historical, setHistorical } = useHistorical()

  return (
    <HistoricalContext.Provider
      value={{
        historical,
        setHistorical
      }}
    >
      {children}
    </HistoricalContext.Provider>
  )
}

export const useHistoricalContext = () => {
  const context = useContext(HistoricalContext)
  if (typeof context === 'undefined') {
    throw new Error('useHistoricalContext must be use within a HistoricalProvider')
  }
  return context
}
