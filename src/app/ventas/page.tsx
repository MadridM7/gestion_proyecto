/**
 * @fileoverview Página de ventas
 * 
 * Esta página muestra una tabla con información detallada de las ventas,
 * incluyendo fecha, hora, vendedor, monto y tipo de pago.
 * También permite agregar nuevas ventas mediante un botón que se adapta
 * a diferentes tamaños de pantalla.
 */

"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/layout/site-header"
import { VentasTable } from "@/components/dashboard/ventas-table"
import { AppLayout } from "@/components/layout/app-layout"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

/**
 * Componente principal de la página de ventas
 * 
 * Muestra la tabla de ventas y proporciona funcionalidad para agregar nuevas ventas.
 * El botón de nueva venta se adapta a diferentes tamaños de pantalla.
 * 
 * @returns Componente de página de ventas renderizado
 */
export default function VentasPage() {
  return (
    <AppLayout>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 50)", // Ancho reducido de la barra lateral
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        {/* Barra lateral de la aplicación */}
        <AppSidebar variant="inset" />
        
        {/* Contenido principal */}
        <SidebarInset>
          {/* Encabezado del sitio */}
          <SiteHeader />
          
          {/* Contenedor principal */}
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">Registro de Ventas</h1>
                    <p className="text-muted-foreground">
                      Visualiza y gestiona todas las ventas realizadas en el sistema.
                    </p>
                  </div>
                </div>
                
                {/* Tabla de ventas */}
                <VentasTable />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppLayout>
  )
}
