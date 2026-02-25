import { Variants, Transition } from "framer-motion"

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
  fast: { duration: 0.25 } as Transition,
  default: { duration: 0.5 } as Transition,
  slow: { duration: 0.6 } as Transition,
  spring: {
    type: "spring",
    damping: 30,
    stiffness: 300,
  } as Transition,
  springHover: {
    type: "spring",
    stiffness: 500,
    damping: 40,
  } as Transition,
} as const

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

/**
 * Fade simple - para contenedores y overlays
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

/**
 * Fade + slide up - para títulos y contenido principal
 * y: 20 para elementos más importantes (mayor presencia)
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Fade + slide up suave - para subtítulos y descripciones
 * y: 10 para elementos secundarios
 */
export const fadeUpSoftVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Fade + slide desde la izquierda - para sidebars y elementos laterales
 */
export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

/**
 * Fade + slide desde la derecha - para elementos complementarios
 */
export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

/**
 * Drawer desde la izquierda - para navigation drawers
 */
export const drawerLeftVariants: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
}

/**
 * Drawer desde la derecha - para cart/settings drawers
 */
export const drawerRightVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
}

// =============================================================================
// STAGGER CONTAINER VARIANTS
// =============================================================================

/**
 * Contenedor para animaciones escalonadas
 * Usar con staggerChildren para crear efecto cascada
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Contenedor con stagger más lento - para secciones con pocos elementos
 */
export const staggerContainerSlowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// =============================================================================
// ANIMATION PROPS HELPERS
// =============================================================================

/**
 * Props base para animaciones que se activan al entrar en viewport
 */
export const viewportAnimationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-50px" },
} as const

/**
 * Props para animaciones que se activan inmediatamente (sin viewport)
 */
export const immediateAnimationProps = {
  initial: "hidden",
  animate: "visible",
} as const

// =============================================================================
// DELAY CALCULATOR
// =============================================================================

/**
 * Calcula el delay para animaciones escalonadas
 * @param index - Índice del elemento en la lista
 * @param baseDelay - Delay base en segundos (default: 0.05)
 * @param offset - Offset inicial en segundos (default: 0)
 */
export const getStaggerDelay = (
  index: number,
  baseDelay: number = 0.05,
  offset: number = 0
): number => {
  return offset + index * baseDelay
}

// =============================================================================
// HOVER EFFECTS
// =============================================================================

/**
 * Props para hover con lift effect en cards
 */
export const cardHoverProps = {
  whileHover: {
    scale: 1.01,
    y: -5,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
  },
  transition: transitions.springHover,
} as const

/**
 * Props para hover suave (sin shadow)
 */
export const subtleHoverProps = {
  whileHover: {
    scale: 1.02,
    y: -3,
  },
  transition: transitions.springHover,
} as const
