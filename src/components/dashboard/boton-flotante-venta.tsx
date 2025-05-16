"use client"

/**
 * @fileoverview Componente de botón flotante para agregar nueva venta en móviles
 * 
 * Este componente implementa un botón flotante que siempre está visible
 * en dispositivos móviles para agregar una nueva venta.
 */

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { VentaForm } from "./venta-form"

/**
 * Componente BotonFlotanteVenta
 * 
 * Muestra un botón flotante para agregar una nueva venta en dispositivos móviles.
 * Este botón siempre está visible, independientemente del estado del sidebar.
 * Utiliza el componente VentaForm para mostrar el formulario de nueva venta.
 * 
 * @returns Componente de botón flotante para nueva venta
 */
export function BotonFlotanteVenta() {
  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  
  // Detectar si es un dispositivo móvil
  const isMobile = useMediaQuery("(max-width: 768px)")
  
  // Función para cerrar el modal
  const handleClose = React.useCallback(() => {
    setIsModalOpen(false)
  }, [])
  
  // Si no es un dispositivo móvil, no renderizar nada
  if (!isMobile) return null

  return (
    <>
      {/* Botón flotante para móviles (siempre visible) */}
      <Button
        onClick={() => setIsModalOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Nueva Venta</span>
      </Button>

      {/* Formulario de nueva venta */}
      <VentaForm isOpen={isModalOpen} onClose={handleClose} />
    </>
  )
}
