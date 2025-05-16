/**
 * @fileoverview Componente de navegación principal
 * 
 * Este componente implementa el menú de navegación principal que se muestra
 * en la barra lateral, con enlaces a las secciones principales de la aplicación.
 */

"use client"

// Importación de React y Next.js
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Importación de tipos para los iconos
import { type Icon } from "@tabler/icons-react"

// Importación de componentes UI para la barra lateral
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * Componente NavMain
 * 
 * Implementa el menú de navegación principal que se muestra en la barra lateral.
 * Recibe una lista de elementos de menú con títulos, URLs e iconos opcionales,
 * y los renderiza como botones de navegación.
 * 
 * @param items - Array de elementos de navegación con título, URL e icono opcional
 * @returns Componente de navegación principal renderizado
 */
export function NavMain({
  items,
  className,
}: {
  items: {
    title: string    // Título del elemento de menú
    url: string      // URL de destino
    icon?: Icon      // Icono opcional del elemento
  }[]
  className?: string // Clase CSS opcional
}) {
  // Obtener la ruta actual para determinar qué elemento está activo
  const pathname = usePathname()
  
  return (
    <SidebarGroup className={className}>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* Mapeo de los elementos de navegación */}
          {items.map((item) => {
            // Determinar si el elemento está activo
            const isActive = 
              (item.url === "/" && pathname === "/") || 
              (item.url !== "/" && pathname.startsWith(item.url))
              
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  data-active={isActive}
                  style={isActive ? { 
                    backgroundColor: 'var(--sidebar-active-bg)', 
                    color: 'var(--sidebar-active-text)' 
                  } : undefined}
                  className={isActive ? "active-nav-item" : ""}
                >
                  <Link href={item.url}>
                    {/* Icono del elemento (si existe) */}
                    {item.icon && <item.icon />}
                    {/* Título del elemento */}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
