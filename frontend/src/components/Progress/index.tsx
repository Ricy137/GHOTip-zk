'use client'
import { useEffect, useState, useRef, ComponentProps } from 'react'
import cx from 'clsx'

interface ScrollProgressProps extends ComponentProps<'div'> {
  containerId: string
  gradientPer?: number
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  containerId,
  gradientPer,
  className,
  style,
  ...rest
}) => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const progressContainer = document.getElementById(containerId)

      if (progressContainer) {
        const progressHeight = progressContainer.clientHeight // height of the container
        const progressContainerTop =
          progressContainer.getBoundingClientRect().top // distance from the top of the viewport to the top of the container
        const passedDistanceHeight =
          progressContainerTop - (window.innerHeight - 100)
        if (passedDistanceHeight > 0) {
          if (scrollPercentage === 0) return
          setScrollPercentage(0)
          return
        }
        if (passedDistanceHeight < -progressHeight) return
        const percentage =
          (Math.abs(passedDistanceHeight) / progressHeight) * 100
        setScrollPercentage(percentage)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, #FDE694 ${Math.min(
          gradientPer ?? 100,
          scrollPercentage
        )}%, rgba(253, 230, 148, 0.3) ${Math.min(
          gradientPer ?? 100,
          scrollPercentage
        )}%, rgba(253, 230, 148, 0.3) ${scrollPercentage}%, transparent ${scrollPercentage}%)`,
      }}
      className="absolute top-[0px] left-[16px] sm:left-[50%] -ml-[1.5px] w-[3px] h-full bg-transparent "
    >
      {/* <div
        style={{
          height: `${scrollPercentage}%`,
        }}
        className={cx(
          'max-h-[100%] bg-[#FDE694] will-change-[height]',
          className
          //   gradientPer && scrollPercentage > gradientPer
        )}
        {...rest}
      /> */}
    </div>
  )
}

export default ScrollProgress
