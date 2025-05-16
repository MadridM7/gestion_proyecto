/**
 * @fileoverview Página de reportes
 * 
 * Esta página muestra una interfaz para generar y visualizar reportes
 * del sistema de ventas.
 */

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/layout/site-header"
import { AppLayout } from "@/components/layout/app-layout"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { formatCLP, formatNumber } from "@/lib/utils/format"

/**
 * Componente principal de la página de reportes
 * 
 * @returns Componente de página de reportes renderizado
 */
export default function ReportesPage() {
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
                <h1 className="text-2xl font-bold">Reportes</h1>
                <p className="text-muted-foreground">
                  Genera y visualiza reportes de ventas y actividad.
                </p>
                
                {/* Contenido de reportes */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas Diarias</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatCLP(12234)}</div>
                    <p className="text-xs text-muted-foreground">
                      +19% respecto al día anterior
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas Semanales</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatCLP(45231)}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% respecto a la semana anterior
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas Mensuales</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatCLP(145890)}</div>
                    <p className="text-xs text-muted-foreground">
                      +12% respecto al mes anterior
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas por Vendedor</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumber(10)} vendedores</div>
                    <p className="text-xs text-muted-foreground">
                      Datos del mes actual
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas por Producto</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumber(150)} productos</div>
                    <p className="text-xs text-muted-foreground">
                      Datos del mes actual
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="tracking-tight text-sm font-medium">Reporte de Ventas por Categoría</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumber(8)} categorías</div>
                    <p className="text-xs text-muted-foreground">
                      Datos del mes actual
                    </p>
                    <div className="mt-4">
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppLayout>
  )
}
