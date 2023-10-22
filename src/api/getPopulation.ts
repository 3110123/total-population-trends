import { Populations } from '@/types'

export const getPopulation: (prefCode: number) => Promise<Populations> = async (
  prefCode: number
) => {
  const res = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC__API_KEY!,
      },
    }
  )
  const json = res.json()

  return json.catch((e) => {
    throw new Error('Failed to fetch data')
  })
}
