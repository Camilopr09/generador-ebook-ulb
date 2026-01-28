// EJEMPLOS DE PATRONES RESPONSIVE PARA TITOS COMPONENTES

// =================================
// ✅ PATRÓN 1: Hook + Conditional Rendering
// =================================

import React from 'react'
import { useResponsive } from '../hooks/useResponsive'

export const ExampleComponent1 = () => {
  const { isMobile, isDesktop } = useResponsive()

  return (
    <div>
      {isMobile && (
        <div style={{ padding: '12px' }}>
          📱 Vista Mobile
        </div>
      )}
      {!isMobile && (
        <div style={{ padding: '24px' }}>
          🖥️ Vista Desktop
        </div>
      )}
    </div>
  )
}

// =================================
// ✅ PATRÓN 2: Dynamic Styling
// =================================

export const ExampleComponent2 = () => {
  const { isMobile, isTablet } = useResponsive()

  const padding = isMobile ? '8px' : isTablet ? '14px' : '20px'
  const fontSize = isMobile ? '13px' : '15px'
  const columns = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <div style={{
      padding,
      fontSize,
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '12px'
    }}>
      <Card />
      <Card />
      <Card />
    </div>
  )
}

// =================================
// ✅ PATRÓN 3: Responsive Images
// =================================

export const ExampleComponent3 = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  let imageSrc = 'image-large.jpg'
  if (isMobile) imageSrc = 'image-small.jpg'
  else if (isTablet) imageSrc = 'image-medium.jpg'

  return (
    <img
      src={imageSrc}
      alt="Responsive"
      style={{
        width: isMobile ? '100%' : isTablet ? '80%' : '60%',
        maxWidth: '100%'
      }}
    />
  )
}

// =================================
// ✅ PATRÓN 4: Responsive Modal/Dialog
// =================================

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ResponsiveModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { isMobile } = useResponsive()

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--ulb-surface)',
        borderRadius: isMobile ? '20px 20px 0 0' : '12px',
        padding: isMobile ? '20px 16px 32px' : '32px',
        width: isMobile ? '100%' : 'auto',
        maxWidth: isMobile ? '100%' : '500px',
        maxHeight: isMobile ? '90vh' : '80vh',
        overflow: 'auto'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--ulb-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

// =================================
// ✅ PATRÓN 5: Responsive Table
// =================================

export const ResponsiveTable = () => {
  const { isMobile, isTablet } = useResponsive()

  const data = [
    { id: 1, name: 'Item 1', value: '$100', status: 'Active' },
    { id: 2, name: 'Item 2', value: '$200', status: 'Inactive' }
  ]

  if (isMobile) {
    // Mobile: Card layout
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map(item => (
          <div key={item.id} style={{
            padding: '12px',
            border: '1px solid var(--ulb-border-subtle)',
            borderRadius: '8px'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>{item.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>{item.value}</span>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Desktop: Table layout
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse'
    }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--ulb-border-subtle)' }}>
          <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} style={{ borderBottom: '1px solid var(--ulb-border-subtle)' }}>
            <td style={{ padding: '12px' }}>{item.name}</td>
            <td style={{ padding: '12px' }}>{item.value}</td>
            <td style={{ padding: '12px' }}>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// =================================
// ✅ PATRÓN 6: Responsive Navigation
// =================================

export const ResponsiveNav = () => {
  const { isMobile } = useResponsive()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const navItems = ['Home', 'About', 'Services', 'Contact']

  if (isMobile) {
    return (
      <nav style={{ padding: '12px' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'var(--ulb-primary)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {menuOpen ? '✕ Menú' : '☰ Menú'}
        </button>
        {menuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '12px'
          }}>
            {navItems.map(item => (
              <a
                key={item}
                href="#"
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  border: '1px solid var(--ulb-border-subtle)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--ulb-text)'
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    )
  }

  return (
    <nav style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      backgroundColor: 'var(--ulb-surface)',
      borderBottom: '1px solid var(--ulb-border-subtle)'
    }}>
      {navItems.map(item => (
        <a
          key={item}
          href="#"
          style={{
            padding: '8px 16px',
            textDecoration: 'none',
            color: 'var(--ulb-text)',
            fontWeight: '500',
            borderRadius: '6px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--ulb-secondary)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {item}
        </a>
      ))}
    </nav>
  )
}

// =================================
// ✅ PATRÓN 7: Flexible Container
// =================================

export const FlexibleContainer = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  const getMaxWidth = () => {
    if (isMobile) return '100%'
    if (isTablet) return '768px'
    if (isDesktop) return '1280px'
    return '100%'
  }

  const getPadding = () => {
    if (isMobile) return '12px'
    if (isTablet) return '16px'
    return '24px'
  }

  return (
    <div style={{
      maxWidth: getMaxWidth(),
      margin: '0 auto',
      padding: getPadding()
    }}>
      {children}
    </div>
  )
}

// =================================
// ✅ PATRÓN 8: CSS Media Query Example
// =================================

const mediaQueryStyles = `
  .responsive-card {
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    .responsive-card {
      padding: 12px;
      border-radius: 8px;
    }
  }

  @media (min-width: 1024px) {
    .responsive-card {
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`

// =================================
// COMPONENTES HELPER
// =================================

const Card = () => (
  <div style={{
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid var(--ulb-border-subtle)',
    background: 'var(--ulb-surface)'
  }}>
    Card
  </div>
)

// =================================
// EXPORTAR EJEMPLOS
// =================================

export const AllExamples = {
  ExampleComponent1,
  ExampleComponent2,
  ExampleComponent3,
  ResponsiveModal,
  ResponsiveTable,
  ResponsiveNav,
  FlexibleContainer
}
