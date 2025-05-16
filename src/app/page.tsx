/**
 * Importaciones de componentes organizados por categorías
 */
// Componentes de layout
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/layout/site-header"
import { AppLayout } from "@/components/layout/app-layout"

// Componentes de dashboard
import { SectionCards } from "@/components/dashboard/section-cards"

// Componentes de gráficos
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive"
import { ChartBar } from "@/components/charts/chart-bar"

// Componentes UI
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

/**
 * Componente principal de la página del dashboard
 * 
 * Este componente estructura la interfaz principal del dashboard,
 * organizando la barra lateral, el encabezado y los diferentes
 * componentes de visualización de datos.
 */
export default function Page() {
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
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* Sección de tarjetas de resumen */}
                <SectionCards />
                
                {/* Sección de gráficos */}
                <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-2">
                  {/* Gráfico de barras */}
                  <div className="flex flex-col gap-4 h-[400px]">
                    <ChartBar />
                  </div>
                  
                  {/* Gráfico de área interactivo */}
                  <div className="flex flex-col gap-4">
                    <ChartAreaInteractive />
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