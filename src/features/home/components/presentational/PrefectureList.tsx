'use client'

import { Prefecture } from '@/types'
import { ChangeEvent } from 'react'

type Props = {
  prefectures: Prefecture[] | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PrefectureList = ({ prefectures, onChange }: Props) => {
  return (
    <section>
      <h3>都道府県</h3>
      <div className="prefecture-list">
        {prefectures?.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <input
              type="checkbox"
              id={prefecture.prefName}
              name="prefecture"
              value={prefecture.prefCode}
              onChange={onChange}
            />
            <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
          </div>
        ))}
      </div>
    </section>
  )
}
