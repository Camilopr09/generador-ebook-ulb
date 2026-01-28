# 🎨 Guía de Personalización - Premium UI System

## 📚 Índice Rápido

- [Paleta de Colores](#paleta-de-colores)
- [Gradientes](#gradientes)
- [Animaciones](#animaciones)
- [Sombras](#sombras)
- [Personalización Fácil](#personalización-fácil)
- [Componentes Premium](#componentes-premium)

---

## 🎨 Paleta de Colores

### Colores Principales

Todos los colores están centralizados en `src/styles/tokens.css`:

```css
:root {
  /* Colores principales */
  --ulb-primary: #6366F1;           /* Indigo - Color primario */
  --ulb-primary-light: #E0E7FF;     /* Indigo claro */
  --ulb-primary-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);

  /* Colores secundarios */
  --ulb-accent: #EC4899;            /* Rosa - Acento */
  --ulb-accent-light: #FCE7F3;      /* Rosa claro */

  /* Colores de lujo */
  --ulb-gold: #D4AF37;              /* Dorado - Lujo */
  --ulb-gold-light: #F4C430;        /* Dorado claro */

  /* Complementarios */
  --ulb-secondary: #F3F4F6;         /* Gris claro */
  --ulb-text: #1F2937;              /* Texto oscuro */
  --ulb-text-muted: #6B7280;        /* Texto mutedo */
  --ulb-bg: #FFFFFF;                /* Fondo blanco */
}
```

### Cómo Cambiar la Paleta

Para cambiar los colores globales:

1. Abre `src/styles/tokens.css`
2. Modifica los valores en `:root`
3. Ejemplo - Cambiar a tema azul:

```css
:root {
  --ulb-primary: #0066FF;
  --ulb-primary-gradient: linear-gradient(135deg, #0066FF 0%, #0047B2 100%);
  --ulb-accent: #00D4FF;
  /* ... etc */
}
```

---

## 🌈 Gradientes

### Gradientes Disponibles

```javascript
// Gradiente primario (Indigo → Púrpura)
background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'

// Gradiente dual (Indigo → Rosa)
background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'

// Gradiente triple (Indigo → Púrpura → Rosa)
background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'

// Gradiente RGB suave
background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)'

// Gradiente dorado
background: 'linear-gradient(90deg, #D4AF37, #F4C430)'

// Gradiente verde (para exportar)
background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'

// Gradiente ámbar (para HTML)
background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
```

### Crear Gradientes Personalizados

**Estructura base:**
```javascript
`linear-gradient(135deg, COLOR1 0%, COLOR2 100%)`
```

**Ejemplos:**
```javascript
// Rojo → Rosa
'linear-gradient(135deg, #DC2626 0%, #EC4899 100%)'

// Verde → Turquesa
'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'

// Naranja → Rojo
'linear-gradient(135deg, #F97316 0%, #EF4444 100%)'

// Púrpura → Violeta
'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)'
```

---

## 🎬 Animaciones

### Animaciones Disponibles

**1. Shine Effect (Brillo deslizante)**
```javascript
// En JSX:
<div style={{
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  animation: 'shimmer 0.6s'
}} />

// En CSS:
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

**2. Float Animation (Flotación)**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Uso */
style={{ animation: 'float 3s ease-in-out infinite' }}
```

**3. Slide Up (Entrada desde abajo)**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Uso */
style={{ animation: 'slideUp 0.4s ease' }}
```

**4. Shimmer Lento (Shine continuo)**
```css
@keyframes shimmer-slow {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Uso */
animation: 'shimmer-slow 3s infinite'
```

### Cómo Crear Animaciones Personalizadas

```javascript
// En un componente React
<style>{`
  @keyframes myAnimation {
    0% { 
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`}</style>

// En el elemento
<div style={{ animation: 'myAnimation 0.6s ease' }} />
```

---

## 💫 Sombras

### Sistema de Sombras

```css
/* Sombra pequeña */
box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15)

/* Sombra media */
box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25)

/* Sombra grande */
box-shadow: 0 12px 24px rgba(99, 102, 241, 0.35)

/* Sombra extra grande */
box-shadow: 0 16px 32px rgba(99, 102, 241, 0.3)
```

### Cambiar Color de Sombra

Para usar sombra con otro color:

```javascript
// Rosa
boxShadow: '0 12px 24px rgba(236, 72, 153, 0.3)'

// Verde
boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3)'

// Dorado
boxShadow: '0 12px 24px rgba(212, 175, 55, 0.3)'

// Custom (usando RGB)
const r = 99, g = 102, b = 241;
boxShadow: `0 12px 24px rgba(${r}, ${g}, ${b}, 0.3)`
```

---

## 🎯 Personalización Fácil

### Cambiar Tema Completo

#### Paso 1: Abre `src/styles/tokens.css`

#### Paso 2: Reemplaza los colores en `:root`

**Ejemplo - Tema Rojo:**
```css
:root {
  --ulb-primary: #DC2626;
  --ulb-primary-light: #FEE2E2;
  --ulb-primary-gradient: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
  --ulb-accent: #EF4444;
  --ulb-accent-light: #FECACA;
  /* ... resto */
}
```

**Ejemplo - Tema Verde:**
```css
:root {
  --ulb-primary: #10B981;
  --ulb-primary-light: #D1FAE5;
  --ulb-primary-gradient: linear-gradient(135deg, #10B981 0%, #047857 100%);
  --ulb-accent: #14B8A6;
  --ulb-accent-light: #CCFBF1;
  /* ... resto */
}
```

**Ejemplo - Tema Púrpura:**
```css
:root {
  --ulb-primary: #A855F7;
  --ulb-primary-light: #F3E8FF;
  --ulb-primary-gradient: linear-gradient(135deg, #A855F7 0%, #7C3AED 100%);
  --ulb-accent: #D946EF;
  --ulb-accent-light: #F3E8FF;
  /* ... resto */
}
```

#### Paso 3: ¡Listo! Todos tus componentes cambiarán automáticamente

---

## 🛠️ Componentes Premium

### Usar Gradientes en Texto

```javascript
// Para hacer que el texto tenga gradiente
<h2 style={{
  fontSize: '20px',
  fontWeight: '700',
  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}>
  Texto con Gradiente
</h2>
```

### Botones Premium Reutilizables

```javascript
// Crear un botón premium personalizado
export const PremiumButton = ({ 
  label, 
  gradient = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  onClick,
  icon
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: gradient,
        color: 'white',
        fontWeight: '700',
        padding: '13px 18px',
        fontSize: '15px',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        boxShadow: hovered 
          ? '0 12px 24px rgba(99, 102, 241, 0.35)' 
          : '0 8px 16px rgba(99, 102, 241, 0.25)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>
        {icon && <span style={{ marginRight: '6px' }}>{icon}</span>}
        {label}
      </span>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        animation: hovered ? 'shimmer 0.6s' : 'none'
      }} />
    </button>
  )
}
```

### Input Premium Personalizable

```javascript
export const PremiumInput = ({
  label,
  placeholder,
  value,
  onChange,
  gradient = '#6366F1',
  focusGradient = 'rgba(99, 102, 241, 0.5)'
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '700',
        marginBottom: '6px',
        color: gradient === '#6366F1' ? 'var(--ulb-primary)' : gradient
      }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: '15px',
          border: `2px solid ${focused ? focusGradient : gradient}22`,
          borderRadius: '10px',
          background: focused ? `${gradient}08` : 'rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box',
          fontWeight: '500',
          boxShadow: focused ? `0 0 0 3px ${gradient}20` : 'none'
        }}
      />
    </div>
  )
}
```

---

## 📱 Responsive Design

### Hook para Responsividad

Ya existe en `src/hooks/useResponsive.ts`:

```javascript
import { useResponsive } from '../hooks/useResponsive'

export const MyComponent = () => {
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsive()

  return (
    <div style={{
      padding: isMobile ? '16px' : isTablet ? '20px' : '24px',
      gap: isMobile ? '12px' : '16px',
      fontSize: isMobile ? '14px' : '16px'
    }}>
      {/* Tu contenido */}
    </div>
  )
}
```

### Breakpoints

```javascript
const BREAKPOINTS = {
  mobile: 480,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
}

// Uso:
// isMobile: ancho < 480px
// isTablet: 480px ≤ ancho < 1024px
// isLaptop: 1024px ≤ ancho < 1280px
// isDesktop: ancho ≥ 1280px
```

---

## 🎯 Checklist de Personalización

- [ ] Cambiar tema de colores en `tokens.css`
- [ ] Ajustar paleta de gradientes según marca
- [ ] Personalizar sombras si es necesario
- [ ] Probar en móvil y desktop
- [ ] Verificar animaciones en navegadores antiguos
- [ ] Actualizar emojis en labels si lo deseas
- [ ] Revisar contraste para accesibilidad
- [ ] Hacer screenshot del resultado final

---

## 🚀 Tips Profesionales

1. **Mantén consistencia**: Usa máximo 3-4 colores primarios
2. **Respeta el branding**: Adapta la paleta a tu identidad visual
3. **Prueba en producción**: Verifica rendimiento de gradientes
4. **Accesibilidad**: Asegura contraste suficiente en texto
5. **Animaciones sutiles**: No exageres con animaciones
6. **Mobile first**: Prueba siempre en móvil primero
7. **Emojis contextuales**: Cambia si no se ajustan a tu marca

---

## 💡 Recursos

- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [CSS Gradients Generator](https://cssgradient.io/)
- [Animation Timing Functions](https://cubic-bezier.com/)
- [Box Shadow Generator](https://www.cssmatic.com/box-shadow)

---

**¡Ahora eres capaz de personalizar completamente el tema premium de tu app! 🎨✨**
