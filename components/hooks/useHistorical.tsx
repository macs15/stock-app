import { historicalAPI } from '@helpers/api/historical'
import { HistoricalStock } from '@interfaces/historical-service.interface'
import { useEffect, useState } from 'react'

const useHistorical = () => {
  const [historical, setHistorical] = useState<HistoricalStock[]>()

  const getHistoricalStock = async () => {
    const historicalResponse = await historicalAPI.getHistoricalStock()
    setHistorical(historicalResponse)
  }

  useEffect(() => {
    getHistoricalStock()
  }, [])

  return {
    historical,
    setHistorical
  }
}

export default useHistorical
