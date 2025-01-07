import { useMediaQuery, useRect } from '@darkroom.engineering/hamo'
import cn from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import s from './appear-title.module.scss'

export function AppearTitle({ children, visible = true }) {
  const el = useRef()

  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(el, {
    threshold: 1,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIntersected(true)
    }
  }, [intersection])

  const { width } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 800px)')

  const [rectRef, rect] = useRect()

  useEffect(() => {
    if (isMobile === false) {
    }
  }, [width, rect, isMobile])

  return (
    <span
      ref={(node) => {
        el.current = node
        rectRef(node)
      }}
      className={cn(s.title, intersected && visible && s.visible)}
    >
      {children}
    </span>
  )
}
