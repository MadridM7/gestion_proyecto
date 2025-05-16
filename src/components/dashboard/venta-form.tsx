"use client"

/**
 * @fileoverview Componente de formulario para agregar nueva venta
 * 
 * Este componente implementa un formulario reutilizable para agregar
 * nuevas ventas, utilizado tanto en el botón de la barra lateral
 * como en el botón flotante para móviles.
 */

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TipoPago, useVentas } from "./ventas-table"
import { useToast } from "@/components/ui/use-toast"
import { formatCLP } from "@/lib/utils/format"

/**
 * Props para el componente VentaForm
 */
interface VentaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente VentaForm
 * 
 * Formulario reutilizable para agregar nuevas ventas.
 * 
 * @param isOpen - Si el modal está abierto
 * @param onClose - Función para cerrar el modal
 * @returns Componente de formulario para nueva venta
 */
export function VentaForm({ isOpen, onClose }: VentaFormProps) {
  // Estados para el formulario
  const [monto, setMonto] = React.useState('')
  const [tipoPago, setTipoPago] = React.useState<TipoPago | ''>('')
  
  // Obtener funciones del contexto
  const { agregarVenta } = useVentas()
  const { toast } = useToast()

  // Función para reiniciar el formulario
  const handleReset = React.useCallback(() => {
    setMonto('')
    setTipoPago('')
    onClose()
  }, [onClose])
  
  // Memoizar la función de formateo para evitar recrearla en cada render
  const formatMontoInput = React.useCallback((value: string) => {
    // Eliminar caracteres no numéricos y el símbolo de peso
    const cleaned = value.replace(/[^\d]/g, "")
    
    // Si no hay valor, devolver cadena vacía
    if (!cleaned) return ""
    
    // Convertir a número
    const numero = parseInt(cleaned, 10)
    
    // Formatear con separadores de miles (puntos)
    return numero.toLocaleString('es-CL', {
      maximumFractionDigits: 0,
      useGrouping: true
    })
  }, [])

  // Memoizar el handler para evitar recrearlo en cada render
  const handleMontoChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMontoInput(e.target.value)
    setMonto(formatted)
  }, [formatMontoInput])

  // Memoizar la función para generar IDs
  const generateId = React.useCallback(() => {
    return `V${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
  }, [])

  // Memoizar la función para registrar ventas
  const registrarVenta = React.useCallback(() => {
    // Validar que los campos estén completos
    if (!monto || !tipoPago) {
      toast({
        title: "Error",
        description: "Debe completar todos los campos",
        variant: "destructive"
      })
      return
    }

    // Convertir el monto a número (eliminar puntos de miles)
    const montoNumerico = Number(monto.replace(/\./g, ""))
    
    // Validar que el monto sea mayor a 0
    if (montoNumerico <= 0) {
      toast({
        title: "Error",
        description: "El monto debe ser mayor a 0",
        variant: "destructive"
      })
      return
    }

    // Crear objeto de venta con los datos del formulario
    const nuevaVenta = {
      id: generateId(),
      fechaHora: new Date(),
      vendedor: "Usuario Ejemplo", // Usuario de ejemplo
      monto: montoNumerico,
      tipoPago: tipoPago as TipoPago,
    }
    
    // Agregar la venta al contexto
    agregarVenta(nuevaVenta)
    
    // Mostrar notificación de éxito
    toast({
      title: "Venta registrada",
      description: `Se ha registrado una venta por ${formatCLP(montoNumerico)}.`,
    })
    
    // Reiniciar formulario y cerrar modal
    handleReset()
  }, [monto, tipoPago, toast, generateId, agregarVenta, handleReset])

  // Efecto para reiniciar el formulario cuando se cierra el modal
  React.useEffect(() => {
    if (!isOpen) {
      setMonto('')
      setTipoPago('')
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Venta</DialogTitle>
          <DialogDescription>
            Ingrese los detalles de la venta a registrar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Campo para el monto */}
          <div className="space-y-2">
            <Label htmlFor="monto">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="monto"
                value={monto}
                placeholder="0"
                className="pl-7"
                onChange={handleMontoChange}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="0"
                step="1"
              />
            </div>
          </div>
          
          {/* Campo para el tipo de pago */}
          <div className="space-y-2">
            <Label htmlFor="tipoPago">Tipo de Pago</Label>
            <Select value={tipoPago} onValueChange={(value) => setTipoPago(value as TipoPago)}>
              <SelectTrigger id="tipoPago">
                <SelectValue placeholder="Seleccione un tipo de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">Efectivo</SelectItem>
                <SelectItem value="debito">Débito</SelectItem>
                <SelectItem value="credito">Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Información adicional */}
          <div className="text-sm text-muted-foreground">
            <p>Fecha y hora: {new Date().toLocaleString('es-CL')}</p>
            <p>Vendedor: Usuario Ejemplo</p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleReset}>
              Cancelar
            </Button>
            <Button type="button" onClick={registrarVenta}>
              Registrar Venta
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
