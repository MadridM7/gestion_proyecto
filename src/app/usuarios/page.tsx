/**
 * @fileoverview Página de usuarios
 * 
 * Esta página muestra una tabla con información de los usuarios del sistema,
 * permitiendo gestionar y visualizar todos los usuarios registrados.
 */

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/layout/site-header"
import { UsuariosTable } from "@/components/dashboard"
import { AppLayout } from "@/components/layout/app-layout"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

/**
 * Componente principal de la página de usuarios
 * 
 * @returns Componente de página de usuarios renderizado
 */
export default function UsuariosPage() {
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
              <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
              <p className="text-muted-foreground">
                Administra los usuarios del sistema y sus permisos.
              </p>
              
              {/* Tabla de usuarios */}
              <UsuariosTable />
            </div>
          </div>
        </div>
      </SidebarInset>
      </SidebarProvider>
    </AppLayout>
  )
}
