import { memo } from 'react'

const Component = () => {
  return (
    <header>
      <h2>都道府県別の総人口推移</h2>
    </header>
  )
}

export const Header = memo(Component)
