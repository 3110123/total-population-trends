import { getPrefectures } from '@/api'
import { Home } from '@/features/home/components/container/Home'
import { Prefectures } from '@/types'

const Page = async () => {
  const prefectures: Prefectures | undefined = await getPrefectures()

  return <Home {...{ prefectures: prefectures.result }} />
}

export default Page
