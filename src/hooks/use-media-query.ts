/**
 * @fileoverview Hook personalizado para detectar media queries
 * 
 * Este hook permite detectar si una media query coincide con el estado actual
 * del dispositivo, útil para implementar diseños responsivos.
 */

import { useState, useEffect } from 'react'

/**
 * Hook useMediaQuery
 * 
 * Detecta si una media query coincide con el estado actual del dispositivo.
 * 
 * @param query - Media query a evaluar (ej: "(max-width: 768px)")
 * @returns Boolean indicando si la media query coincide
 */
export function useMediaQuery(query: string): boolean {
  // Estado inicial basado en SSR-safe check
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Verificar si window está disponible (solo en cliente)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query)
      
      // Establecer el estado inicial
      setMatches(media.matches)

      // Función para actualizar el estado cuando cambia la media query
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      // Agregar listener
      media.addEventListener('change', listener)

      // Limpiar listener al desmontar
      return () => {
        media.removeEventListener('change', listener)
      }
    }
  }, [query]) // Re-ejecutar si cambia la query

  return matches
}
