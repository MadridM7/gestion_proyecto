/**
 * Utilidades para formateo de números y monedas
 */

/**
 * Formatea un número como moneda chilena (CLP)
 * @param value - El valor a formatear
 * @returns El valor formateado como moneda chilena
 */
export function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Formatea un número con separadores de miles según formato chileno
 * @param value - El valor a formatear
 * @returns El valor formateado con puntos como separadores de miles
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-CL').format(value);
}
