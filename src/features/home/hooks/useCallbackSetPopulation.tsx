import { getPopulation } from '@/api'
import { Population, Prefecture } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react'

type SetPopulation = {
  setSelectedPrefecture: Dispatch<SetStateAction<Prefecture[]>>
  displayPrefPopulation: Population[]
  setDisplayPrefPopulation: Dispatch<SetStateAction<Population[]>>
}

export const useCallbackSetPopulation = ({
  setSelectedPrefecture,
  displayPrefPopulation,
  setDisplayPrefPopulation,
}: SetPopulation) => {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.checked) {
        // チェックを外した場合
        return setSelectedPrefecture((pre) =>
          pre.filter((p) => p.prefCode !== Number(e.target.value))
        )
      }

      const prefName = e.target.id
      const prefCode = Number(e.target.value)

      setSelectedPrefecture((pre) => [...pre, { prefName, prefCode }])

      requestTotalPopulation({
        prefCode,
        prefName,
        displayPrefPopulation,
        setDisplayPrefPopulation,
      })
    },
    [displayPrefPopulation, setDisplayPrefPopulation, setSelectedPrefecture]
  )
}

type RequestTotalPopulation = {
  prefCode: number
  prefName: string
  displayPrefPopulation: SetPopulation['displayPrefPopulation']
  setDisplayPrefPopulation: SetPopulation['setDisplayPrefPopulation']
}

const requestTotalPopulation = async ({
  prefCode,
  prefName,
  displayPrefPopulation,
  setDisplayPrefPopulation,
}: RequestTotalPopulation) => {
  await getPopulation(prefCode).then((population) => {
    const selectedPrefPopulation: Population[] =
      population.result.data[0].data.map((d) => {
        return {
          year: d.year,
          [prefName]: d.value,
        }
      })

    if (displayPrefPopulation.length === 0) {
      setDisplayPrefPopulation([...selectedPrefPopulation])
    } else {
      // 過去に選択したことがある場合、return
      if (
        Object.prototype.hasOwnProperty.call(displayPrefPopulation[0], prefName)
      )
        return

      const mergePrefPopulations = [
        ...displayPrefPopulation,
        ...selectedPrefPopulation,
      ]
      const prefPopulations: Population[] = mergePrefPopulations.reduce(
        (result: Population[], current: Population) => {
          const { year, ...rest } = current

          const populationItem = result.find((item) => item.year === year)

          if (populationItem) {
            Object.assign(populationItem, rest)
          } else {
            result.push(current)
          }
          return result
        },
        []
      )
      setDisplayPrefPopulation(prefPopulations)
    }
  })
}
