import { useRef } from 'react'

const react = () => {
  const ref = useRef<HTMLDivElement>(null)

  return <div ref={ref}>react</div>
}

export default react
