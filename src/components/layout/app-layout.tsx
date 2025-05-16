"use client"

/**
 * @fileoverview Componente de layout principal para la aplicación
 * 
 * Este componente proporciona un layout común para todas las páginas
 * de la aplicación, incluyendo el botón flotante para móviles.
 */

import * as React from "react"
import { VentasProvider } from "@/components/dashboard/ventas-table"
import { BotonFlotanteVenta } from "@/components/dashboard/boton-flotante-venta"
import { Toaster } from "@/components/ui/toaster"

/**
 * Componente AppLayout
 * 
 * Proporciona un layout común para todas las páginas de la aplicación,
 * incluyendo el botón flotante para móviles y el contexto de ventas.
 * 
 * @param children - Contenido de la página
 * @returns Componente de layout renderizado
 */
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <VentasProvider>
      {/* Contenido principal de la página */}
      {children}
      
      {/* Botón flotante para agregar ventas (solo visible en móviles) */}
      <BotonFlotanteVenta />
      
      {/* Componente para mostrar notificaciones */}
      <Toaster />
    </VentasProvider>
  )
}
