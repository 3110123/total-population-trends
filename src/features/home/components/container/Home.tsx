'use client'

import { PopulationTrendGraph, PrefectureList } from '../presentational'
import '../../styles/index.modules.css'
import { Prefecture } from '@/types'
import { useHome } from '../../hooks/useHoom'

type Props = {
  prefectures: Prefecture[]
}

export const Home = ({ prefectures }: Props) => {
  const { selectedPrefecture, displayPrefPopulation, onChange } = useHome()

  return (
    <div className="prefecture-population-trend-page">
      <PrefectureList
        {...{
          prefectures,
          onChange,
        }}
      />

      <PopulationTrendGraph
        {...{ selectedPrefecture, displayPrefPopulation }}
      />
    </div>
  )
}
