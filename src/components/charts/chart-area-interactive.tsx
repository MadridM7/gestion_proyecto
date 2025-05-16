/**
 * @fileoverview Componente de gráfico de área interactivo para visualizar ventas diarias
 * 
 * Este componente implementa un gráfico de área que muestra las ventas diarias
 * con la capacidad de filtrar por diferentes rangos de tiempo.
 */

"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

// Hook personalizado para detectar dispositivos móviles
import { useIsMobile } from "@/hooks/use-mobile"

// Importación de utilidades de formato
import { formatCLP } from "@/lib/utils/format"

// Componentes UI para la tarjeta
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Componentes para la configuración del gráfico
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/**
 * Datos para el gráfico de área
 * 
 * Contiene los valores de ventas diarias para la primera semana de mayo 2025.
 */
const chartData = [
  { date: "2025-05-01", venta: 678450 },
  { date: "2025-05-02", venta: 523120 },
  { date: "2025-05-03", venta: 749300 },
  { date: "2025-05-04", venta: 601780 },
  { date: "2025-05-05", venta: 824950 },
  { date: "2025-05-06", venta: 534560 },
  { date: "2025-05-07", venta: 692330 }
];

/**
 * Configuración del gráfico
 * 
 * Define las etiquetas y colores para la serie de datos de ventas
 * que se muestra en el gráfico de área.
 */
const chartConfig = {
  venta: {
    label: "Venta",
    color: "hsl(var(--chart-1))", // Color para el área de ventas
  },
} satisfies ChartConfig

/**
 * Componente ChartAreaInteractive
 * 
 * Muestra un gráfico de área interactivo que visualiza las ventas diarias
 * con capacidad para filtrar por diferentes rangos de tiempo.
 * 
 * @returns Componente de gráfico de área interactivo renderizado
 */
export function ChartAreaInteractive() {
  // Detecta si el dispositivo es móvil
  const isMobile = useIsMobile()
  
  // Estado para el rango de tiempo seleccionado (por defecto 7 días)
  const [timeRange, setTimeRange] = React.useState("7d")

  // Efecto para resetear el rango de tiempo en dispositivos móviles
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  /**
   * Filtra los datos según el rango de tiempo seleccionado
   * Calcula la fecha de inicio basada en el rango seleccionado y
   * filtra los datos para mostrar solo los que están dentro del rango.
   */
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2025-05-07") // Última fecha de los datos
    let daysToSubtract = 7
    
    // Determina cuántos días restar según el rango seleccionado
    if (timeRange === "1d") {
      daysToSubtract = 1
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    
    // Calcula la fecha de inicio para el filtro
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    
    // Devuelve true si la fecha está dentro del rango
    return date >= startDate
  })

  return (
    <Card className="@container/card h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle>Ventas totales día</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de la última semana
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 h-[290px] pb-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[270px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVenta" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                return formatCLP(value)
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  // Eliminamos valueFormatter ya que causa error de tipo
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="venta"
              type="monotone"
              fill="url(#fillVenta)"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}