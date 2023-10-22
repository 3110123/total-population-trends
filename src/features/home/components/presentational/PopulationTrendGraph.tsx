'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { COLOR_LIST } from '../../constants'
import { Population, Prefecture } from '@/types'

type Props = {
  selectedPrefecture: Prefecture[]
  displayPrefPopulation: Population[]
}

export const PopulationTrendGraph = ({
  selectedPrefecture,
  displayPrefPopulation,
}: Props) => {
  return (
    <section>
      <h3>総人口推移グラフ</h3>

      {selectedPrefecture.length > 0 ? (
        <Graph {...{ displayPrefPopulation, selectedPrefecture }} />
      ) : (
        '都道府県を選択するとグラフが表示されます'
      )}
    </section>
  )
}

const Graph = ({ displayPrefPopulation, selectedPrefecture }: Props) => {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <LineChart
        data={displayPrefPopulation}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{
            value: '年度',
            position: 'bottom',
            offset: 10,
          }}
        />
        <YAxis
          width={95}
          label={{ value: '人口数', angle: -90, position: 'insideLeft' }}
        />
        {selectedPrefecture.map((pref, i) => (
          <Line
            type="monotone"
            dataKey={pref.prefName}
            stroke={COLOR_LIST[Number(String(i).slice(-1))]}
            key={pref.prefName}
          />
        ))}

        <Legend wrapperStyle={{ marginBottom: -40 }} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
