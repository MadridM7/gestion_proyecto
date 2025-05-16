/**
 * @fileoverview Componente de tarjetas de resumen para el dashboard
 * 
 * Este componente implementa una sección de tarjetas que muestran métricas
 * clave de ventas (diarias, mensuales y anuales) con indicadores de tendencia.
 */

// Nota: Los iconos de tendencia podrían usarse en futuras implementaciones
// para mostrar indicadores visuales junto a los porcentajes

// Importación de componentes UI
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Importación de utilidades de formato
import { formatCLP } from "@/lib/utils/format"

/**
 * Componente SectionCards
 * 
 * Muestra una sección de tarjetas con métricas clave de ventas,
 * incluyendo totales diarios, mensuales y anuales con indicadores
 * de tendencia y fechas de última actualización.
 * 
 * @returns Componente de sección de tarjetas renderizado
 */
export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {/* Tarjeta de ventas diarias */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ventas Totales Dia</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCLP(534560)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <CardAction className="w-full justify-between">
            <span className="text-xs text-muted-foreground">
              Última actualización: 13:37
            </span>
          </CardAction>
        </CardFooter>
      </Card>
      
      {/* Tarjeta de ventas mensuales con indicador de tendencia */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ventas Totales Mes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCLP(3684340)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* Indicador de tendencia con respecto al mes anterior */}
          <div className="flex items-center gap-2">
            <Badge variant="default" className="rounded-full px-2 py-1">
              +12%
            </Badge>
            <span className="text-muted-foreground">vs. mes anterior</span>
          </div>
          <CardAction className="w-full justify-between">
            <span className="text-xs text-muted-foreground">
              Última actualización: 05/05/2025
            </span>
          </CardAction>
        </CardFooter>
      </Card>
      
      {/* Tarjeta de ventas anuales con indicador de tendencia */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ventas Totales Año</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCLP(154065430)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* Indicador de tendencia con respecto al año anterior */}
          <div className="flex items-center gap-2">
            <Badge variant="default" className="rounded-full px-2 py-1">
              +3%
            </Badge>
            <span className="text-muted-foreground">vs. año anterior</span>
          </div>
          <CardAction className="w-full justify-between">
            <span className="text-xs text-muted-foreground">
              Última actualización: 04/05/2025
            </span>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  )
}
