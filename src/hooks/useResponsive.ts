import { useState, useEffect } from 'react'

export interface ScreenSize {
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  width: number
  height: number
  isPortrait: boolean
  isLandscape: boolean
}

export const useResponsive = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: window.innerWidth < 640,
    isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
    isLaptop: window.innerWidth >= 1024 && window.innerWidth < 1280,
    isDesktop: window.innerWidth >= 1280,
    width: window.innerWidth,
    height: window.innerHeight,
    isPortrait: window.innerHeight > window.innerWidth,
    isLandscape: window.innerWidth > window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isLaptop: width >= 1024 && width < 1280,
        isDesktop: width >= 1280,
        width,
        height,
        isPortrait: height > width,
        isLandscape: width > height,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}
