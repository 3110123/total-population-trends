'use client'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  )
}

export default Error
