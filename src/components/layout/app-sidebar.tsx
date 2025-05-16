/**
 * @fileoverview Componente de barra lateral principal de la aplicación
 * 
 * Este componente implementa la barra lateral principal que contiene
 * la navegación y los menús de la aplicación.
 */

"use client"

import * as React from "react"

// Importación de iconos
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import { NuevaVentaButton } from "@/components/dashboard/nueva-venta-button"

// Importación de componentes de navegación
import { NavMain } from "@/components/navigation/nav-main"
import { NavSecondary } from "@/components/navigation/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

/**
 * Datos de navegación para la barra lateral
 * 
 * Contiene la información del usuario y los elementos de navegación
 * que se muestran en la barra lateral.
 */
const data = {
  // Información del usuario
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  // Elementos de navegación principal
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Ventas",
      url: "/ventas",
      icon: IconUsers,
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: IconReport,
    },
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: IconDatabase,
    }    
  ],
  
  // Elementos de navegación secundaria con submenús
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  
  // Elementos de navegación secundaria (pie de la barra lateral)
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
}

/**
 * Componente AppSidebar
 * 
 * Implementa la barra lateral principal de la aplicación con navegación,
 * logo y elementos de menú. También permite mostrar contenido adicional
 * como el botón de nueva venta.
 * 
 * @param props - Propiedades heredadas del componente Sidebar
 * @param children - Contenido adicional para mostrar en la barra lateral
 * @returns Componente de barra lateral renderizado
 */
export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar> & { children?: React.ReactNode }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Encabezado de la barra lateral con logo/nombre */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Nombre web</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      {/* Contenido principal de la barra lateral */}
      <SidebarContent>
        {/* Botón de nueva venta (siempre visible en el sidebar) */}
        <div className="px-4 py-4 mb-2">
          <NuevaVentaButton className="w-full justify-center text-sm" />
        </div>
        
        {/* Contenido adicional */}
        {children}
        
        {/* Navegación principal */}
        <NavMain items={data.navMain} />
        
        {/* Navegación secundaria (configuración, etc.) */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      
      {/* Pie de la barra lateral */}
      <SidebarFooter>
        {/* Espacio para contenido adicional en el pie */}
      </SidebarFooter>
    </Sidebar>
  )
}
