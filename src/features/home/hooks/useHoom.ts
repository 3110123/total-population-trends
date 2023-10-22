import { Population, Prefecture } from '@/types'
import { ChangeEvent, useState } from 'react'
import { useCallbackSetPopulation } from './useCallbackSetPopulation'

export const useHome = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>([])
  const [displayPrefPopulation, setDisplayPrefPopulation] = useState<
    Population[]
  >([])

  const callbackSetPopulation: (e: ChangeEvent<HTMLInputElement>) => void =
    useCallbackSetPopulation({
      setSelectedPrefecture,
      displayPrefPopulation,
      setDisplayPrefPopulation,
    })

  return {
    selectedPrefecture,
    setSelectedPrefecture,
    displayPrefPopulation,
    setDisplayPrefPopulation,
    onChange: callbackSetPopulation,
  }
}
