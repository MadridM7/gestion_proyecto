"use client"

/**
 * @fileoverview Componente de tabla de ventas
 * 
 * Este componente implementa una tabla que muestra información detallada
 * de las ventas, incluyendo fecha, hora, vendedor, monto y tipo de pago.
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
import { useToast } from "@/components/ui/use-toast"

// Importación de utilidades de formato
import { formatCLP } from "@/lib/utils/format"

// Tipos para los datos de ventas
export type TipoPago = "efectivo" | "debito" | "credito"

export type Venta = {
  id: string
  fechaHora: Date
  vendedor: string
  monto: number
  tipoPago: TipoPago
}

// Datos de ejemplo para la tabla de ventas
const ventasIniciales: Venta[] = [
  {
    id: "V001",
    fechaHora: new Date("2025-05-09T08:30:00"),
    vendedor: "Juan Pérez",
    monto: 125000,
    tipoPago: "efectivo"
  },
  {
    id: "V002",
    fechaHora: new Date("2025-05-09T09:15:00"),
    vendedor: "María González",
    monto: 78500,
    tipoPago: "debito"
  },
  {
    id: "V003",
    fechaHora: new Date("2025-05-09T10:05:00"),
    vendedor: "Carlos Rodríguez",
    monto: 245000,
    tipoPago: "credito"
  },
  {
    id: "V004",
    fechaHora: new Date("2025-05-08T14:20:00"),
    vendedor: "Ana Martínez",
    monto: 56000,
    tipoPago: "efectivo"
  },
  {
    id: "V005",
    fechaHora: new Date("2025-05-08T16:45:00"),
    vendedor: "Pedro Sánchez",
    monto: 189000,
    tipoPago: "debito"
  },
  {
    id: "V006",
    fechaHora: new Date("2025-05-08T17:30:00"),
    vendedor: "Laura Torres",
    monto: 320000,
    tipoPago: "credito"
  },
  {
    id: "V007",
    fechaHora: new Date("2025-05-07T09:10:00"),
    vendedor: "Juan Pérez",
    monto: 95000,
    tipoPago: "efectivo"
  },
  {
    id: "V008",
    fechaHora: new Date("2025-05-07T11:25:00"),
    vendedor: "María González",
    monto: 145000,
    tipoPago: "debito"
  },
  {
    id: "V009",
    fechaHora: new Date("2025-05-07T15:40:00"),
    vendedor: "Carlos Rodríguez",
    monto: 275000,
    tipoPago: "credito"
  },
  {
    id: "V010",
    fechaHora: new Date("2025-05-06T10:15:00"),
    vendedor: "Ana Martínez",
    monto: 68000,
    tipoPago: "efectivo"
  },
]

// Función para formatear montos en pesos chilenos
const formatMonto = (monto: number) => {
  return formatCLP(monto)
}

// Función para formatear fecha y hora
const formatFechaHora = (fecha: Date) => {
  return fecha.toLocaleString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Definición de las columnas de la tabla
export const columns: ColumnDef<Venta>[] = [
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fechaHora",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha y Hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fecha = row.getValue("fechaHora") as Date
      return <div>{formatFechaHora(fecha)}</div>
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "vendedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendedor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("vendedor")}</div>,
  },
  {
    accessorKey: "monto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue("monto"))
      return <div className="font-medium">{formatMonto(monto)}</div>
    },
  },
  {
    accessorKey: "tipoPago",
    header: "Tipo de Pago",
    cell: ({ row }) => {
      const tipoPago = row.getValue("tipoPago") as TipoPago
      
      // Definir variante y color según el tipo de pago
      let variant: "default" | "outline" | "secondary" = "default"
      
      if (tipoPago === "efectivo") {
        variant = "default"
      } else if (tipoPago === "debito") {
        variant = "secondary"
      } else if (tipoPago === "credito") {
        variant = "outline"
      }
      
      return (
        <Badge variant={variant} className="capitalize">
          {tipoPago}
        </Badge>
      )
    },
    filterFn: "equals",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const venta = row.original
      
      // Creamos un componente interno para manejar las acciones
      // Esto nos permite usar hooks de React correctamente
      function AccionesVenta() {
        const { eliminarVenta } = useVentas()
        const { toast } = useToast()
        
        // Función para eliminar una venta
        const handleEliminar = () => {
          eliminarVenta(venta.id)
          toast({
            title: "Venta eliminada",
            description: `Se ha eliminado la venta ${venta.id}.`,
          })
        }
        
        // Función para copiar el ID de la venta
        const handleCopiarId = () => {
          navigator.clipboard.writeText(venta.id)
          toast({
            title: "ID copiado",
            description: `Se ha copiado el ID ${venta.id} al portapapeles.`,
          })
        }

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
              <DropdownMenuItem onClick={handleCopiarId}>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleEliminar}
                className="text-red-600"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
      
      // Renderizar el componente de acciones
      return <AccionesVenta />
    },
  },
]

/**
 * Tipos para el contexto de ventas
 */
interface VentasContextType {
  ventas: Venta[];
  agregarVenta: (venta: Venta) => void;
  eliminarVenta: (id: string) => void;
  actualizarVenta: (id: string, venta: Partial<Venta>) => void;
}

// Contexto para compartir las ventas entre componentes
export const VentasContext = React.createContext<VentasContextType>({
  ventas: [],
  agregarVenta: () => {},
  eliminarVenta: () => {},
  actualizarVenta: () => {}
});

// Hook para usar el contexto de ventas
export function useVentas() {
  return React.useContext(VentasContext);
}

// Clave para guardar las ventas en localStorage
const VENTAS_STORAGE_KEY = 'dashboard-ventas';

/**
 * Función para cargar las ventas desde localStorage
 * 
 * @returns Array de ventas cargadas desde localStorage o datos iniciales
 */
const cargarVentasGuardadas = (): Venta[] => {
  // Si estamos en el servidor, usar datos iniciales
  if (typeof window === 'undefined') return ventasIniciales;
  
  try {
    const ventasGuardadas = localStorage.getItem(VENTAS_STORAGE_KEY);
    if (ventasGuardadas) {
      const ventasParsed = JSON.parse(ventasGuardadas);
      // Convertir las fechas de string a Date
      return ventasParsed.map((venta: Omit<Venta, 'fechaHora'> & { fechaHora: string }) => ({
        ...venta,
        fechaHora: new Date(venta.fechaHora)
      }));
    }
  } catch (error) {
    console.error('Error al cargar ventas desde localStorage:', error);
  }
  
  return ventasIniciales;
};

/**
 * Función para guardar las ventas en localStorage
 * 
 * @param ventas - Array de ventas a guardar
 */
const guardarVentas = (ventas: Venta[]): void => {
  try {
    localStorage.setItem(VENTAS_STORAGE_KEY, JSON.stringify(ventas));
  } catch (error) {
    console.error('Error al guardar ventas en localStorage:', error);
  }
};

/**
 * Proveedor del contexto de ventas
 * 
 * Gestiona el estado de las ventas y proporciona funciones para manipularlas.
 * Implementa persistencia en localStorage para mantener los datos entre sesiones.
 * 
 * @param children - Componentes hijos que tendrán acceso al contexto
 * @returns Proveedor de contexto de ventas
 */
export function VentasProvider({ children }: { children: React.ReactNode }) {
  // Usar lazy initialization para cargar las ventas desde localStorage
  const [ventas, setVentas] = React.useState<Venta[]>(() => cargarVentasGuardadas());

  // Guardar las ventas en localStorage cuando cambien
  React.useEffect(() => {
    guardarVentas(ventas);
  }, [ventas]);

  // Función para agregar una nueva venta (memoizada para evitar recreaciones)
  const agregarVenta = React.useCallback((nuevaVenta: Venta) => {
    setVentas(prev => [nuevaVenta, ...prev]);
  }, []);
  
  // Función para eliminar una venta por su ID
  const eliminarVenta = React.useCallback((id: string) => {
    setVentas(prev => prev.filter(venta => venta.id !== id));
  }, []);
  
  // Función para actualizar una venta existente
  const actualizarVenta = React.useCallback((id: string, ventaActualizada: Partial<Venta>) => {
    setVentas(prev => prev.map(venta => 
      venta.id === id ? { ...venta, ...ventaActualizada } : venta
    ));
  }, []);

  // Memoizar el valor del contexto para evitar renderizados innecesarios
  const contextValue = React.useMemo(() => ({
    ventas,
    agregarVenta,
    eliminarVenta,
    actualizarVenta
  }), [ventas, agregarVenta, eliminarVenta, actualizarVenta]);

  return (
    <VentasContext.Provider value={contextValue}>
      {children}
    </VentasContext.Provider>
  );
}

/**
 * Componente VentasTable
 * 
 * Muestra una tabla con información detallada de las ventas,
 * con capacidades de ordenación, filtrado y paginación.
 * 
 * @returns Componente de tabla de ventas renderizado
 */
export function VentasTable() {
  // Usar el contexto de ventas
  const { ventas } = useVentas();
  
  // Estados para la tabla con inicialización perezosa
  const [sorting, setSorting] = React.useState<SortingState>(() => [{
    id: 'fechaHora',
    desc: true // Ordenar por fecha descendente por defecto
  }])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(() => [])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => ({}))
  const [rowSelection, setRowSelection] = React.useState(() => ({}))

  // Memoizar los datos para evitar recálculos innecesarios
  const data = React.useMemo(() => ventas, [ventas]);
  
  // Memoizar las funciones de procesamiento de la tabla
  const coreRowModel = React.useMemo(() => getCoreRowModel(), []);
  const paginationRowModel = React.useMemo(() => getPaginationRowModel(), []);
  const sortedRowModel = React.useMemo(() => getSortedRowModel(), []);
  const filteredRowModel = React.useMemo(() => getFilteredRowModel(), []);
  
  // Crear la tabla con valores memoizados
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: coreRowModel,
    getPaginationRowModel: paginationRowModel,
    getSortedRowModel: sortedRowModel,
    getFilteredRowModel: filteredRowModel,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  
  // Actualizar la tabla cuando cambien las ventas
  React.useEffect(() => {
    // Reiniciar la selección de filas cuando cambian los datos
    setRowSelection({});
    // Forzar la actualización de la tabla
    table.resetRowSelection();
    // Mantener la primera página para ver las nuevas ventas
    table.setPageIndex(0);
  }, [ventas, table, setRowSelection]);

  // Memoizar el filtro de vendedor para evitar recrearlo en cada render
  const vendedorFilter = React.useMemo(() => {
    const column = table.getColumn("vendedor");
    return column ? (column.getFilterValue() as string) ?? "" : "";
  }, [table]);

  // Memoizar el handler del filtro para evitar recrearlo en cada render
  const handleVendedorFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const column = table.getColumn("vendedor");
      if (column) {
        column.setFilterValue(event.target.value);
      }
    },
    [table]
  );

  // Memoizar las columnas visibles para evitar recalcularlas en cada render
  const visibleColumns = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.getCanHide());
  }, [table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por vendedor..."
          value={vendedorFilter}
          onChange={handleVendedorFilterChange}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {visibleColumns.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id === "fechaHora"
                    ? "Fecha y Hora"
                    : column.id === "tipoPago"
                    ? "Tipo de Pago"
                    : column.id}
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
