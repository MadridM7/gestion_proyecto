"use client"

/**
 * @fileoverview Componente de encabezado del sitio
 * 
 * Este componente implementa el encabezado superior que aparece en todas las páginas
 * de la aplicación. Contiene el botón para mostrar/ocultar la barra lateral
 * y espacio para títulos o elementos adicionales de navegación.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

/**
 * Componente SiteHeader
 * 
 * Implementa el encabezado superior que aparece en todas las páginas
 * de la aplicación. Contiene el botón para mostrar/ocultar la barra lateral
 * y muestra el título de la página actual según la ruta.
 * 
 * @returns Componente de encabezado renderizado
 */
export function SiteHeader() {
  // Obtener la ruta actual
  const pathname = usePathname()
  
  // Determinar el título según la ruta
  const getPageTitle = React.useCallback(() => {
    switch (pathname) {
      case "/":
        return "Dashboard"
      case "/ventas":
        return "Ventas"
      case "/reportes":
        return "Reportes"
      case "/usuarios":
        return "Usuarios"
      case "/configuracion":
        return "Configuración"
      default:
        // Extraer el nombre de la ruta y capitalizarlo
        const path = pathname.split("/").pop() || ""
        return path.charAt(0).toUpperCase() + path.slice(1)
    }
  }, [pathname])
  
  // Título de la página actual
  const pageTitle = getPageTitle()
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Botón para mostrar/ocultar la barra lateral */}
        <SidebarTrigger className="-ml-1" />
        
        {/* Separador vertical */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        {/* Título de la página actual */}
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  )
}
