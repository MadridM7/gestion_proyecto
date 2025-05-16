"use client"

/**
 * @fileoverview Componente de tabla de usuarios
 * 
 * Este componente implementa una tabla que muestra información de los usuarios
 * del sistema, incluyendo nombre, correo, rol, estado y fecha de registro.
 */

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Tipos para los datos de usuarios
export type RolUsuario = "admin" | "vendedor" | "supervisor" | "contador"
export type EstadoUsuario = "activo" | "inactivo" | "suspendido"

export type Usuario = {
  id: string
  nombre: string
  email: string
  rol: RolUsuario
  estado: EstadoUsuario
  fechaRegistro: Date
  avatar?: string
}

// Datos de ejemplo para la tabla de usuarios
const usuariosData: Usuario[] = [
  {
    id: "U001",
    nombre: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    rol: "admin",
    estado: "activo",
    fechaRegistro: new Date("2024-01-15"),
    avatar: "/avatars/01.png"
  },
  {
    id: "U002",
    nombre: "María González",
    email: "maria.gonzalez@ejemplo.com",
    rol: "vendedor",
    estado: "activo",
    fechaRegistro: new Date("2024-02-20"),
    avatar: "/avatars/02.png"
  },
  {
    id: "U003",
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    rol: "vendedor",
    estado: "activo",
    fechaRegistro: new Date("2024-03-10"),
    avatar: "/avatars/03.png"
  },
  {
    id: "U004",
    nombre: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    rol: "supervisor",
    estado: "activo",
    fechaRegistro: new Date("2024-03-15"),
    avatar: "/avatars/04.png"
  },
  {
    id: "U005",
    nombre: "Pedro Sánchez",
    email: "pedro.sanchez@ejemplo.com",
    rol: "vendedor",
    estado: "inactivo",
    fechaRegistro: new Date("2024-04-05"),
    avatar: "/avatars/05.png"
  },
  {
    id: "U006",
    nombre: "Laura Torres",
    email: "laura.torres@ejemplo.com",
    rol: "contador",
    estado: "activo",
    fechaRegistro: new Date("2024-04-20"),
    avatar: "/avatars/06.png"
  },
  {
    id: "U007",
    nombre: "Roberto Díaz",
    email: "roberto.diaz@ejemplo.com",
    rol: "vendedor",
    estado: "suspendido",
    fechaRegistro: new Date("2024-05-01"),
    avatar: "/avatars/07.png"
  },
  {
    id: "U008",
    nombre: "Sofía López",
    email: "sofia.lopez@ejemplo.com",
    rol: "supervisor",
    estado: "activo",
    fechaRegistro: new Date("2024-05-05"),
    avatar: "/avatars/08.png"
  },
]

// Función para formatear fecha
const formatFecha = (fecha: Date) => {
  return fecha.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// Función para obtener las iniciales de un nombre
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Definición de las columnas de la tabla
export const columns: ColumnDef<Usuario>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const usuario = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={usuario.avatar} alt={usuario.nombre} />
            <AvatarFallback>{getInitials(usuario.nombre)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{usuario.nombre}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => {
      const rol = row.getValue("rol") as RolUsuario
      
      return (
        <div className="capitalize">{rol}</div>
      )
    },
    filterFn: "equals",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as EstadoUsuario
      
      // Definir variante según el estado
      let variant: "default" | "outline" | "destructive" | "secondary" = "default"
      
      if (estado === "activo") {
        variant = "default"
      } else if (estado === "inactivo") {
        variant = "secondary"
      } else if (estado === "suspendido") {
        variant = "destructive"
      }
      
      return (
        <Badge variant={variant} className="capitalize">
          {estado}
        </Badge>
      )
    },
    filterFn: "equals",
  },
  {
    accessorKey: "fechaRegistro",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha Registro
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fecha = row.getValue("fechaRegistro") as Date
      return <div>{formatFecha(fecha)}</div>
    },
    sortingFn: "datetime",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const usuario = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(usuario.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
            <DropdownMenuItem>Editar usuario</DropdownMenuItem>
            <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
            {usuario.estado === "activo" ? (
              <DropdownMenuItem className="text-amber-600">
                Desactivar usuario
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-green-600">
                Activar usuario
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600">
              Eliminar usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

/**
 * Componente UsuariosTable
 * 
 * Muestra una tabla con información de los usuarios del sistema,
 * con capacidades de ordenación, filtrado y paginación.
 * 
 * @returns Componente de tabla de usuarios renderizado
 */
export function UsuariosTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: usuariosData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "fechaRegistro" ? "Fecha Registro" : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
