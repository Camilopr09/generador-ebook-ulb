import React from 'react'
import { useResponsive } from '../hooks/useResponsive'

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  className?: string
  style?: React.CSSProperties
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: '12px', tablet: '16px', desktop: '20px' },
  className = '',
  style = {}
}) => {
  const { isMobile, isTablet } = useResponsive()

  const gridColumns = isMobile ? columns.mobile : isTablet ? columns.tablet : columns.desktop
  const gridGap = isMobile ? gap.mobile : isTablet ? gap.tablet : gap.desktop

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: gridGap,
        ...style
      }}
    >
      {children}
    </div>
  )
}

interface ResponsiveStackProps {
  children: React.ReactNode
  direction?: 'row' | 'column'
  gap?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  alignItems?: string
  justifyContent?: string
  className?: string
  style?: React.CSSProperties
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  direction = 'column',
  gap = { mobile: '8px', tablet: '12px', desktop: '16px' },
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  className = '',
  style = {}
}) => {
  const { isMobile, isTablet } = useResponsive()

  const stackGap = isMobile ? gap.mobile : isTablet ? gap.tablet : gap.desktop

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: stackGap,
        alignItems,
        justifyContent,
        ...style
      }}
    >
      {children}
    </div>
  )
}

interface ResponsiveTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  sizes?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  className?: string
  style?: React.CSSProperties
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  as: Component = 'p',
  sizes = { mobile: '14px', tablet: '16px', desktop: '18px' },
  className = '',
  style = {}
}) => {
  const { isMobile, isTablet } = useResponsive()

  const fontSize = isMobile ? sizes.mobile : isTablet ? sizes.tablet : sizes.desktop

  return (
    <Component
      className={className}
      style={{
        fontSize,
        ...style
      }}
    >
      {children}
    </Component>
  )
}
