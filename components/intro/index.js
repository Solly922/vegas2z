import { useMediaQuery } from '@darkroom.engineering/hamo'
import cn from 'clsx'
import { useStore } from 'lib/store'
import { useEffect, useState } from 'react'
import s from './intro.module.scss'

export const Intro = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')
  const [isLoaded, setIsLoaded] = useState(false)
  const [scroll, setScroll] = useState(false)
  const introOut = useStore(({ introOut }) => introOut)
  const setIntroOut = useStore(({ setIntroOut }) => setIntroOut)
  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isMobile) {
      lenis.start()
      document.documentElement.classList.toggle('intro', false)
      return
    }

    if (!scroll) {
      document.documentElement.classList.toggle('intro', true)
    }

    if (!lenis) return
    if (scroll) {
      lenis.start()
      document.documentElement.classList.toggle('intro', false)
    } else {
      setTimeout(() => {
        lenis.stop()
      }, 0)

      document.documentElement.classList.toggle('intro', true)
    }
  }, [scroll, lenis, isMobile])

  return (
    <div
      className={cn(s.wrapper, isLoaded && s.out)}
      onTransitionEnd={(e) => {
        e.target.classList.forEach((value) => {
          if (value.includes('out')) {
            setScroll(true)
          }
          if (value.includes('show')) {
            setIntroOut(true)
          }
        })
      }}
    >
      <div className={cn(isLoaded && s.relative)}>
        <LNS
          isLoaded={isLoaded}
          fill={'var(--black)'}
        />
        <EI
          isLoaded={isLoaded}
          fill={'var(--black)'}
          className={cn(introOut && s.translate)}
        />
      </div>
    </div>
  )
}

export const Title = ({ className }) => {
  const introOut = useStore(({ introOut }) => introOut)

  return (
    <div className={className}>
      <LNS fill={'var(--pink)'} />
      <EI
        fill={'var(--pink)'}
        className={cn(introOut && s.translate, s.mobile)}
      />
    </div>
  )
}

const LNS = ({ isLoaded, className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1360 336"
      className={cn(s.lns, className)}
    >
      <g fill={fill}>
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 2 }}
          d="M50 30 L150 30 L200 280 L150 280 L120 80 L90 280 L40 280 L50 30Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 1 }}
          d="M400 30 L550 30 L550 80 L450 80 L450 230 L500 230 L500 150 L480 150 L480 100 L550 100 L550 280 L400 280 Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 3 }}
          d="M800 30 L950 30 L950 80 L850 80 L850 130 L950 130 L950 280 L800 280 L800 230 L900 230 L900 180 L800 180 Z"
        />
      </g>
    </svg>
  )
}

const EI = ({ isLoaded, className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1360 336"
      className={cn(s.ei, className)}
    >
      <g fill={fill}>
        <path
          style={{ '--index': 5 }}
          className={cn(s.start, isLoaded && s.show)}
          d="M220 30 L370 30 L370 80 L270 80 L270 130 L350 130 L350 180 L270 180 L270 230 L370 230 L370 280 L220 280 Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 4 }}
          d="M580 280 L630 30 L730 30 L780 280 L730 280 L715 230 L645 230 L630 280 L580 280 M655 180 L705 180 L680 80 Z"
        />
      </g>
    </svg>
  )
}
