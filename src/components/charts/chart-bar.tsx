/**
 * @fileoverview Componente de gráfico de barras para visualizar ventas por tipo de pago
 * 
 * Este componente implementa un gráfico de barras que muestra las ventas
 * mensuales clasificadas por tipo de pago (efectivo, débito, crédito).
 */

"use client"

// Importaciones de Recharts para el gráfico de barras
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

// Importaciones de componentes UI para la tarjeta
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Importaciones de componentes para la configuración del gráfico
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/**
 * Datos para el gráfico de barras
 * 
 * Contiene los valores de ventas mensuales clasificados por tipo de pago
 * (efectivo, débito, crédito) para los primeros cinco meses del año.
 */
const chartData = [
  { month: "Enero", efectivo: 645561, debito: 805012, credito: 504363 },
  { month: "Febrero", efectivo: 473397, debito: 968408, credito: 758295 },
  { month: "Marzo", efectivo: 741463, debito: 577296, credito: 878825 },
  { month: "Abril", efectivo: 548458, debito: 480156, credito: 893612},
  { month: "Mayo", efectivo: 666971, debito: 602529, credito: 806660 },
]

/**
 * Configuración del gráfico
 * 
 * Define las etiquetas y colores para cada tipo de pago que se muestra
 * en el gráfico de barras.
 */
const chartConfig = {
  efectivo: {
    label: "Efectivo",
    color: "hsl(var(--chart-1))", // Color para barras de efectivo
  },
  debito: {
    label: "Debito",
    color: "hsl(var(--chart-2))", // Color para barras de débito
  },
  credito: {
    label: "Credito",
    color: "hsl(var(--chart-3))", // Color para barras de crédito
  },
} satisfies ChartConfig

/**
 * Componente ChartBar
 * 
 * Muestra un gráfico de barras que visualiza las ventas mensuales
 * clasificadas por tipo de pago (efectivo, débito, crédito).
 * 
 * @returns Componente de gráfico de barras renderizado
 */
export function ChartBar() {
  return (
    <Card className="h-full w-full">
      {/* Encabezado de la tarjeta con título y descripción */}
      <CardHeader className="pb-2">
        <CardTitle>Ventas por tipo</CardTitle>
        <CardDescription>Enero - Mayo 2025</CardDescription>
      </CardHeader>
      
      {/* Contenido principal con el gráfico */}
      <CardContent className="flex-1">
        <div className="h-[270px] w-full">
          {/* Contenedor del gráfico con la configuración */}
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                {/* Cuadrícula del gráfico (solo líneas horizontales) */}
                <CartesianGrid vertical={false} />
                
                {/* Eje X con los meses (abreviados a 3 letras) */}
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                
                {/* Tooltip que se muestra al pasar el mouse */}
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                
                {/* Barras para cada tipo de pago */}
                <Bar dataKey="efectivo" fill="hsl(var(--chart-1))" radius={4} />
                <Bar dataKey="debito" fill="hsl(var(--chart-2))" radius={4} />
                <Bar dataKey="credito" fill="hsl(var(--chart-3))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      
      {/* Pie de la tarjeta (vacío por ahora) */}
      <CardFooter className="pt-0"></CardFooter>
    </Card>
  )
}