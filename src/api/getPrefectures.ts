import { Prefectures } from '@/types'

export const getPrefectures: () => Promise<Prefectures> = async () => {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
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
