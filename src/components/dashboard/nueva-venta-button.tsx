"use client"

/**
 * @fileoverview Componente de botón para agregar nueva venta
 * 
 * Este componente implementa un botón que se adapta a diferentes tamaños de pantalla
 * y permite abrir un modal para agregar una nueva venta.
 */

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VentaForm } from "./venta-form"

/**
 * Componente NuevaVentaButton
 * 
 * Muestra un botón para agregar una nueva venta en la barra lateral.
 * Utiliza el componente VentaForm para mostrar el formulario de nueva venta.
 * 
 * @param className - Clase CSS opcional para el botón
 * @returns Componente de botón para nueva venta
 */
export function NuevaVentaButton({ className }: { className?: string }) {
  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  
  // Función para cerrar el modal
  const handleClose = React.useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Renderizar el botón para el sidebar y el formulario
  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`h-9 ${className}`}
        variant="default"
        size="sm"
      >
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        <span className="whitespace-nowrap">Nueva Venta</span>
      </Button>

      {/* Formulario de nueva venta */}
      <VentaForm isOpen={isModalOpen} onClose={handleClose} />
    </>
  )
}
