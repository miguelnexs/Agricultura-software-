import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Clock,
  Layers,
  BarChart2,
  Scale,
  Search,
  Building2,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Info,
  Calendar,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface PuntoCotizacion {
  etiqueta: string
  precio: number
  volumen: number
  fecha: string
}

export interface AlimentoCotizacion {
  id: string
  nombre: string
  categoria: 'tuberculos' | 'hortalizas' | 'frutas' | 'granos' | 'cafe_panela'
  variedad: string
  presentacion: string
  precioHoy: number
  precioAyer: number
  precioFinca: number
  precioMayorista: number
  precioMinorista: number
  tendencia: 'alza' | 'baja' | 'estable'
  variacionPorcentaje: number
  volumenToneladas: number
  plazaReferencia: string
  emoji: string
  calidad: 'Primera' | 'Extra' | 'Corriente'
  series: {
    '1D': PuntoCotizacion[]
    '7D': PuntoCotizacion[]
    '1M': PuntoCotizacion[]
    '3M': PuntoCotizacion[]
    '1A': PuntoCotizacion[]
  }
}

export const DATOS_ALIMENTOS_TRADING: AlimentoCotizacion[] = [
  {
    id: 'papa-pastusa',
    nombre: 'Papa Pastusa',
    categoria: 'tuberculos',
    variedad: 'Pastusa Suprema Lavada',
    presentacion: 'Bulto de 50 kg',
    precioHoy: 115000,
    precioAyer: 108000,
    precioFinca: 90000,
    precioMayorista: 115000,
    precioMinorista: 145000,
    tendencia: 'alza',
    variacionPorcentaje: 6.48,
    volumenToneladas: 1840,
    plazaReferencia: 'Corabastos (Bogotá) / Mercar',
    emoji: '🥔',
    calidad: 'Primera',
    series: {
      '1D': [
        { etiqueta: '04:00 AM', precio: 108000, volumen: 180, fecha: 'Apertura de subasta' },
        { etiqueta: '06:00 AM', precio: 110000, volumen: 420, fecha: 'Llegada camiones Boyacá' },
        { etiqueta: '08:00 AM', precio: 112500, volumen: 650, fecha: 'Alta demanda compradores' },
        { etiqueta: '10:00 AM', precio: 114000, volumen: 390, fecha: 'Jornada media' },
        { etiqueta: '12:00 PM', precio: 115000, volumen: 200, fecha: 'Cierre mayorista' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 98000, volumen: 1200, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 101000, volumen: 1350, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 104000, volumen: 1420, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 106500, volumen: 1580, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 108000, volumen: 1720, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 112000, volumen: 1950, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 115000, volumen: 1840, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 88000, volumen: 5200, fecha: 'Semana 1 Oct' },
        { etiqueta: 'Sem 2', precio: 94000, volumen: 6100, fecha: 'Semana 2 Oct' },
        { etiqueta: 'Sem 3', precio: 99000, volumen: 5800, fecha: 'Semana 3 Oct' },
        { etiqueta: 'Sem 4', precio: 105000, volumen: 6400, fecha: 'Semana 4 Oct' },
        { etiqueta: 'Actual', precio: 115000, volumen: 7200, fecha: 'Noviembre' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 82000, volumen: 22000, fecha: 'Septiembre 2026' },
        { etiqueta: 'Oct', precio: 96000, volumen: 24500, fecha: 'Octubre 2026' },
        { etiqueta: 'Nov', precio: 115000, volumen: 27000, fecha: 'Noviembre 2026' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 75000, volumen: 85000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 84000, volumen: 89000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 92000, volumen: 91000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 81000, volumen: 87000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 96000, volumen: 94000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 115000, volumen: 98000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'papa-criolla',
    nombre: 'Papa Criolla',
    categoria: 'tuberculos',
    variedad: 'Criolla Colombia Amarilla Limpia',
    presentacion: 'Bulto de 50 kg',
    precioHoy: 160000,
    precioAyer: 165000,
    precioFinca: 130000,
    precioMayorista: 160000,
    precioMinorista: 210000,
    tendencia: 'baja',
    variacionPorcentaje: -3.03,
    volumenToneladas: 620,
    plazaReferencia: 'Corabastos / Cavasa',
    emoji: '🟡',
    calidad: 'Primera',
    series: {
      '1D': [
        { etiqueta: '04:00 AM', precio: 165000, volumen: 110, fecha: 'Apertura' },
        { etiqueta: '06:00 AM', precio: 164000, volumen: 210, fecha: 'Carga Nariño' },
        { etiqueta: '08:00 AM', precio: 162000, volumen: 190, fecha: 'Presión oferta' },
        { etiqueta: '10:00 AM', precio: 161000, volumen: 90, fecha: 'Jornada media' },
        { etiqueta: '12:00 PM', precio: 160000, volumen: 40, fecha: 'Cierre' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 175000, volumen: 490, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 172000, volumen: 520, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 170000, volumen: 550, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 168000, volumen: 580, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 165000, volumen: 610, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 162000, volumen: 640, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 160000, volumen: 620, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 185000, volumen: 2100, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 180000, volumen: 2250, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 174000, volumen: 2400, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 168000, volumen: 2500, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 160000, volumen: 2600, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 195000, volumen: 9200, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 180000, volumen: 9800, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 160000, volumen: 10400, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 140000, volumen: 36000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 155000, volumen: 38000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 210000, volumen: 34000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 190000, volumen: 37000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 175000, volumen: 39000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 160000, volumen: 41000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'tomate-chonto',
    nombre: 'Tomate Chonto',
    categoria: 'hortalizas',
    variedad: 'Chonto Maduro / Pintón',
    presentacion: 'Caja de 22 kg',
    precioHoy: 54000,
    precioAyer: 58000,
    precioFinca: 40000,
    precioMayorista: 54000,
    precioMinorista: 78000,
    tendencia: 'baja',
    variacionPorcentaje: -6.89,
    volumenToneladas: 940,
    plazaReferencia: 'Central Mayorista Antioquia / Corabastos',
    emoji: '🍅',
    calidad: 'Primera',
    series: {
      '1D': [
        { etiqueta: '04:00 AM', precio: 58000, volumen: 120, fecha: 'Apertura' },
        { etiqueta: '06:00 AM', precio: 57000, volumen: 310, fecha: 'Llegada Boyacá' },
        { etiqueta: '08:00 AM', precio: 55500, volumen: 280, fecha: 'Abundancia' },
        { etiqueta: '10:00 AM', precio: 54500, volumen: 150, fecha: 'Media jornada' },
        { etiqueta: '12:00 PM', precio: 54000, volumen: 80, fecha: 'Cierre' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 68000, volumen: 780, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 65000, volumen: 810, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 62000, volumen: 850, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 60000, volumen: 890, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 58000, volumen: 920, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 55000, volumen: 960, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 54000, volumen: 940, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 75000, volumen: 3200, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 70000, volumen: 3450, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 64000, volumen: 3700, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 58000, volumen: 3900, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 54000, volumen: 4100, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 82000, volumen: 14000, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 68000, volumen: 15500, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 54000, volumen: 16800, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 45000, volumen: 48000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 62000, volumen: 52000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 78000, volumen: 49000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 90000, volumen: 46000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 74000, volumen: 53000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 54000, volumen: 58000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'cebolla-cabezona',
    nombre: 'Cebolla Cabezona Roja',
    categoria: 'hortalizas',
    variedad: 'Roja Boyacense / Ocañera',
    presentacion: 'Bulto de 50 kg',
    precioHoy: 95000,
    precioAyer: 90000,
    precioFinca: 72000,
    precioMayorista: 95000,
    precioMinorista: 125000,
    tendencia: 'alza',
    variacionPorcentaje: 5.55,
    volumenToneladas: 810,
    plazaReferencia: 'Corabastos / Cenabastos',
    emoji: '🧅',
    calidad: 'Primera',
    series: {
      '1D': [
        { etiqueta: '04:00 AM', precio: 90000, volumen: 110, fecha: '04:00 AM' },
        { etiqueta: '06:00 AM', precio: 92000, volumen: 240, fecha: '06:00 AM' },
        { etiqueta: '08:00 AM', precio: 93500, volumen: 280, fecha: '08:00 AM' },
        { etiqueta: '10:00 AM', precio: 94500, volumen: 120, fecha: '10:00 AM' },
        { etiqueta: '12:00 PM', precio: 95000, volumen: 60, fecha: '12:00 PM' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 82000, volumen: 680, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 84000, volumen: 710, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 87000, volumen: 730, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 89000, volumen: 750, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 90000, volumen: 790, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 92000, volumen: 820, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 95000, volumen: 810, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 72000, volumen: 2800, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 76000, volumen: 2950, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 81000, volumen: 3100, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 88000, volumen: 3250, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 95000, volumen: 3400, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 68000, volumen: 11000, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 78000, volumen: 12200, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 95000, volumen: 13500, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 58000, volumen: 42000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 64000, volumen: 44000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 72000, volumen: 46000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 85000, volumen: 48000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 76000, volumen: 49000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 95000, volumen: 52000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'platano-harton',
    nombre: 'Plátano Dominico Hartón',
    categoria: 'tuberculos',
    variedad: 'Hartón Quindiano Verde',
    presentacion: 'Canastilla de 20 kg',
    precioHoy: 42000,
    precioAyer: 42000,
    precioFinca: 32000,
    precioMayorista: 42000,
    precioMinorista: 58000,
    tendencia: 'estable',
    variacionPorcentaje: 0.0,
    volumenToneladas: 1100,
    plazaReferencia: 'Mercar (Armenia) / Cavasa',
    emoji: '🍌',
    calidad: 'Primera',
    series: {
      '1D': [
        { etiqueta: '04:00 AM', precio: 42000, volumen: 190, fecha: '04:00 AM' },
        { etiqueta: '06:00 AM', precio: 42000, volumen: 360, fecha: '06:00 AM' },
        { etiqueta: '08:00 AM', precio: 42000, volumen: 410, fecha: '08:00 AM' },
        { etiqueta: '10:00 AM', precio: 42000, volumen: 100, fecha: '10:00 AM' },
        { etiqueta: '12:00 PM', precio: 42000, volumen: 40, fecha: '12:00 PM' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 40000, volumen: 980, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 41000, volumen: 1020, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 42000, volumen: 1060, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 42000, volumen: 1090, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 42000, volumen: 1120, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 42000, volumen: 1150, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 42000, volumen: 1100, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 38000, volumen: 4200, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 39500, volumen: 4400, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 41000, volumen: 4500, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 42000, volumen: 4600, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 42000, volumen: 4700, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 36000, volumen: 15200, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 39000, volumen: 16400, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 42000, volumen: 17200, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 32000, volumen: 58000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 35000, volumen: 60000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 38000, volumen: 62000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 36000, volumen: 61000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 39000, volumen: 63000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 42000, volumen: 65000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'cafe-pergamino',
    nombre: 'Café Pergamino Seco',
    categoria: 'cafe_panela',
    variedad: 'Factor 88 • Federación Nal. de Cafeteros',
    presentacion: 'Carga de 125 kg',
    precioHoy: 2190000,
    precioAyer: 2165000,
    precioFinca: 2190000,
    precioMayorista: 2240000,
    precioMinorista: 2600000,
    tendencia: 'alza',
    variacionPorcentaje: 1.15,
    volumenToneladas: 3400,
    plazaReferencia: 'Comité de Cafeteros / FNC',
    emoji: '☕',
    calidad: 'Extra',
    series: {
      '1D': [
        { etiqueta: '08:00 AM', precio: 2165000, volumen: 420, fecha: 'Fijación FNC' },
        { etiqueta: '10:00 AM', precio: 2175000, volumen: 910, fecha: 'Bolsa NY alza' },
        { etiqueta: '12:00 PM', precio: 2182000, volumen: 820, fecha: 'Copia mercado' },
        { etiqueta: '02:00 PM', precio: 2188000, volumen: 650, fecha: 'Entregas cooperativa' },
        { etiqueta: '04:00 PM', precio: 2190000, volumen: 600, fecha: 'Cierre oficial' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 2080000, volumen: 2800, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 2100000, volumen: 2950, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 2125000, volumen: 3100, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 2150000, volumen: 3250, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 2165000, volumen: 3350, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 2175000, volumen: 3500, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 2190000, volumen: 3400, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 1980000, volumen: 11800, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 2040000, volumen: 12400, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 2090000, volumen: 12900, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 2140000, volumen: 13500, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 2190000, volumen: 14200, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 1890000, volumen: 45000, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 2050000, volumen: 48000, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 2190000, volumen: 52000, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 1720000, volumen: 180000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 1850000, volumen: 195000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 1940000, volumen: 190000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 1880000, volumen: 185000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 2050000, volumen: 210000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 2190000, volumen: 225000, fecha: 'Nov' }
      ]
    }
  },
  {
    id: 'aguacate-hass',
    nombre: 'Aguacate Hass',
    categoria: 'frutas',
    variedad: 'Hass Calibre Exportación',
    presentacion: 'Kilo al por mayor',
    precioHoy: 5800,
    precioAyer: 5600,
    precioFinca: 4400,
    precioMayorista: 5800,
    precioMinorista: 8500,
    tendencia: 'alza',
    variacionPorcentaje: 3.57,
    volumenToneladas: 750,
    plazaReferencia: 'Mercado Nacional & Exportación',
    emoji: '🥑',
    calidad: 'Extra',
    series: {
      '1D': [
        { etiqueta: '06:00 AM', precio: 5600, volumen: 80, fecha: '06:00 AM' },
        { etiqueta: '08:00 AM', precio: 5650, volumen: 240, fecha: '08:00 AM' },
        { etiqueta: '10:00 AM', precio: 5720, volumen: 260, fecha: '10:00 AM' },
        { etiqueta: '12:00 PM', precio: 5780, volumen: 110, fecha: '12:00 PM' },
        { etiqueta: '02:00 PM', precio: 5800, volumen: 60, fecha: '02:00 PM' }
      ],
      '7D': [
        { etiqueta: 'Lun', precio: 5200, volumen: 580, fecha: '03 Nov' },
        { etiqueta: 'Mar', precio: 5300, volumen: 610, fecha: '04 Nov' },
        { etiqueta: 'Mié', precio: 5400, volumen: 640, fecha: '05 Nov' },
        { etiqueta: 'Jue', precio: 5500, volumen: 670, fecha: '06 Nov' },
        { etiqueta: 'Vie', precio: 5600, volumen: 710, fecha: '07 Nov' },
        { etiqueta: 'Sáb', precio: 5700, volumen: 760, fecha: '08 Nov' },
        { etiqueta: 'Hoy', precio: 5800, volumen: 750, fecha: 'Hoy' }
      ],
      '1M': [
        { etiqueta: 'Sem 1', precio: 4600, volumen: 2400, fecha: 'Sem 1' },
        { etiqueta: 'Sem 2', precio: 4850, volumen: 2600, fecha: 'Sem 2' },
        { etiqueta: 'Sem 3', precio: 5100, volumen: 2800, fecha: 'Sem 3' },
        { etiqueta: 'Sem 4', precio: 5500, volumen: 3000, fecha: 'Sem 4' },
        { etiqueta: 'Actual', precio: 5800, volumen: 3200, fecha: 'Nov' }
      ],
      '3M': [
        { etiqueta: 'Sep', precio: 4200, volumen: 10500, fecha: 'Sep' },
        { etiqueta: 'Oct', precio: 4900, volumen: 11800, fecha: 'Oct' },
        { etiqueta: 'Nov', precio: 5800, volumen: 13000, fecha: 'Nov' }
      ],
      '1A': [
        { etiqueta: 'Ene', precio: 3800, volumen: 38000, fecha: 'Ene' },
        { etiqueta: 'Mar', precio: 4200, volumen: 41000, fecha: 'Mar' },
        { etiqueta: 'May', precio: 5100, volumen: 43000, fecha: 'May' },
        { etiqueta: 'Jul', precio: 4700, volumen: 42000, fecha: 'Jul' },
        { etiqueta: 'Sep', precio: 4400, volumen: 44000, fecha: 'Sep' },
        { etiqueta: 'Nov', precio: 5800, volumen: 46000, fecha: 'Nov' }
      ]
    }
  }
]

export function PizarraPreciosPage(): JSX.Element {
  const [alimentos, setAlimentos] = useState<AlimentoCotizacion[]>(DATOS_ALIMENTOS_TRADING)
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState<AlimentoCotizacion>(
    DATOS_ALIMENTOS_TRADING[0] // Papa Pastusa
  )
  const [temporalidad, setTemporalidad] = useState<'1D' | '7D' | '1M' | '3M' | '1A'>('7D')
  const [categoria, setCategoria] = useState<string>('todos')
  const [busqueda, setBusqueda] = useState<string>('')
  const [puntoHover, setPuntoHover] = useState<PuntoCotizacion | null>(null)

  // Obtener la serie de datos según la temporalidad
  const serieActual = useMemo(() => {
    return alimentoSeleccionado.series[temporalidad] || alimentoSeleccionado.series['7D']
  }, [alimentoSeleccionado, temporalidad])

  // Cálculos dinámicos de rango y gráfica
  const precios = serieActual.map((p) => p.precio)
  const minPrecio = Math.min(...precios) * 0.96
  const maxPrecio = Math.max(...precios) * 1.04
  const rango = maxPrecio - minPrecio || 1

  const maxVolumen = Math.max(...serieActual.map((p) => p.volumen)) || 1

  // Puntos SVG del gráfico de cotización (Ancho 1000px, Alto 280px)
  const anchoGrafico = 1000
  const altoGrafico = 280

  const puntosCoordenadas = useMemo(() => {
    return serieActual.map((p, idx) => {
      const x = (idx / (serieActual.length - 1)) * anchoGrafico
      const y = altoGrafico - ((p.precio - minPrecio) / rango) * (altoGrafico - 40) - 20
      return { x, y, punto: p }
    })
  }, [serieActual, minPrecio, rango])

  const puntosSVG = puntosCoordenadas.map((c) => `${c.x},${c.y}`).join(' ')
  const areaSVG = `0,${altoGrafico} ${puntosSVG} ${anchoGrafico},${altoGrafico}`

  const esAlza = alimentoSeleccionado.variacionPorcentaje >= 0

  const filtrados = alimentos.filter((a) => {
    const coincideCat = categoria === 'todos' || a.categoria === categoria
    const coincideTxt =
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.variedad.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCat && coincideTxt
  })

  return (
    <div className="w-full space-y-6">
      {/* 1. Barra de Ticker Tape Continuo de Precios */}
      <div className="w-full rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="bg-secondary/40 px-4 py-2 border-b border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-extrabold text-foreground">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Activity className="h-4 w-4 text-primary" />
            <span>TERMINAL DE PRECIOS AGROPECUARIOS EN VIVO • SIPSA / CORABASTOS / DANE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" /> Transmitiendo Cotizaciones en Tiempo Real
            </span>
          </div>
        </div>

        {/* Ticker Selector Horizontal */}
        <div className="p-2.5 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {alimentos.map((item) => {
            const up = item.variacionPorcentaje >= 0
            const active = alimentoSeleccionado.id === item.id
            return (
              <div
                key={item.id}
                onClick={() => {
                  setAlimentoSeleccionado(item)
                  setPuntoHover(null)
                }}
                role="button"
                className={`px-3.5 py-2 rounded-xl border flex items-center gap-2.5 shrink-0 cursor-pointer transition-all ${
                  active
                    ? 'bg-primary/15 border-primary shadow-sm ring-1 ring-primary'
                    : 'bg-background hover:bg-secondary/60 border-border'
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-foreground">{item.nombre}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                        up
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15'
                          : 'text-red-700 dark:text-red-400 bg-red-500/15'
                      }`}
                    >
                      {up ? '▲' : '▼'} {Math.abs(item.variacionPorcentaje).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs font-black text-foreground mt-0.5">
                    ${item.precioHoy.toLocaleString('es-CO')}{' '}
                    <span className="text-[10px] font-medium text-muted-foreground">
                      / {item.presentacion.split('(')[0]}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Gran Pantalla de Gráfica de Ancho Completo (Trading Terminal) */}
      <section className="w-full rounded-3xl border border-border bg-card p-5 md:p-8 shadow-lg space-y-6">
        {/* Cabecera del Activo con Información Enriquecida */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex items-start gap-4">
            <div className="text-5xl p-3.5 rounded-3xl bg-secondary border border-border shadow-inner shrink-0">
              {alimentoSeleccionado.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                  {alimentoSeleccionado.nombre}
                </h1>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                  Calidad {alimentoSeleccionado.calidad}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  📍 {alimentoSeleccionado.plazaReferencia}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Variedad: <strong className="text-foreground">{alimentoSeleccionado.variedad}</strong> • Comercialización en {alimentoSeleccionado.presentacion}
              </p>
            </div>
          </div>

          {/* Precio y Variación en Grande */}
          <div className="flex flex-wrap items-baseline gap-4 lg:text-right">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Cotización Mayorista Oficial
              </span>
              <div className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                ${(puntoHover ? puntoHover.precio : alimentoSeleccionado.precioHoy).toLocaleString('es-CO')}{' '}
                <span className="text-sm font-bold text-muted-foreground">COP</span>
              </div>
              <div className="flex items-center lg:justify-end gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full ${
                    esAlza
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/25'
                      : 'text-red-700 dark:text-red-400 bg-red-500/15 border border-red-500/25'
                  }`}
                >
                  {esAlza ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {esAlza ? '+' : ''}
                  {alimentoSeleccionado.variacionPorcentaje.toFixed(2)}% (24 horas)
                </span>
                {puntoHover && (
                  <span className="text-xs font-semibold text-primary">
                    • {puntoHover.etiqueta} ({puntoHover.fecha})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Controles de Temporalidad y Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Periodo:
            </span>
            <div className="flex items-center gap-1 bg-secondary/70 p-1 rounded-2xl border border-border">
              {(['1D', '7D', '1M', '3M', '1A'] as const).map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={temporalidad === t ? 'default' : 'ghost'}
                  onClick={() => {
                    setTemporalidad(t)
                    setPuntoHover(null)
                  }}
                  className={`h-8 px-4 text-xs font-black rounded-xl transition-all ${
                    temporalidad === t
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-muted-foreground">
              Máx Periodo: <strong className="text-foreground">${Math.round(maxPrecio).toLocaleString('es-CO')}</strong>
            </span>
            <span>•</span>
            <span className="text-muted-foreground">
              Mín Periodo: <strong className="text-foreground">${Math.round(minPrecio).toLocaleString('es-CO')}</strong>
            </span>
            <span>•</span>
            <span className="text-muted-foreground">
              Volumen: <strong className="text-primary">{alimentoSeleccionado.volumenToneladas.toLocaleString('es-CO')} Toneladas</strong>
            </span>
          </div>
        </div>

        {/* Gráfica Panorámica SVG de Ancho Completo con Crosshair y Barras de Volumen */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-secondary/40 via-card to-background p-4 md:p-6 border border-border overflow-hidden shadow-inner">
          <div className="h-72 md:h-96 w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${anchoGrafico} ${altoGrafico}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="gradientFullTrading" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={esAlza ? '#15803d' : '#b91c1c'}
                    stopOpacity="0.38"
                  />
                  <stop
                    offset="70%"
                    stopColor={esAlza ? '#15803d' : '#b91c1c'}
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor={esAlza ? '#15803d' : '#b91c1c'}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>

              {/* Líneas Guía Horizontales de Cuadrícula */}
              <line x1="0" y1={altoGrafico * 0.25} x2={anchoGrafico} y2={altoGrafico * 0.25} stroke="hsl(var(--border))" strokeDasharray="6 6" />
              <line x1="0" y1={altoGrafico * 0.5} x2={anchoGrafico} y2={altoGrafico * 0.5} stroke="hsl(var(--border))" strokeDasharray="6 6" />
              <line x1="0" y1={altoGrafico * 0.75} x2={anchoGrafico} y2={altoGrafico * 0.75} stroke="hsl(var(--border))" strokeDasharray="6 6" />

              {/* Barras Verticales de Volumen en la parte inferior */}
              {puntosCoordenadas.map((c, i) => {
                const barraAltura = (c.punto.volumen / maxVolumen) * 45
                const barraY = altoGrafico - barraAltura
                const anchoBarra = Math.max(8, anchoGrafico / (puntosCoordenadas.length * 3))

                return (
                  <rect
                    key={i}
                    x={c.x - anchoBarra / 2}
                    y={barraY}
                    width={anchoBarra}
                    height={barraAltura}
                    rx="3"
                    fill={esAlza ? 'hsl(var(--primary) / 0.25)' : 'rgba(239, 68, 68, 0.25)'}
                  />
                )
              })}

              {/* Área del Gráfico con Gradiente Suave */}
              <polygon points={areaSVG} fill="url(#gradientFullTrading)" />

              {/* Curva Principal de la Cotización */}
              <polyline
                fill="none"
                stroke={esAlza ? '#16a34a' : '#dc2626'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={puntosSVG}
              />

              {/* Puntos de Datos Interactivos */}
              {puntosCoordenadas.map((c, i) => {
                const esHover = puntoHover?.etiqueta === c.punto.etiqueta
                const esUltimo = i === puntosCoordenadas.length - 1

                return (
                  <g key={i}>
                    {/* Línea Vertical Crosshair si está en hover */}
                    {esHover && (
                      <line
                        x1={c.x}
                        y1="0"
                        x2={c.x}
                        y2={altoGrafico}
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Círculo Principal */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={esHover ? 7 : esUltimo ? 6 : 4.5}
                      fill={esAlza ? '#16a34a' : '#dc2626'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setPuntoHover(c.punto)}
                    />

                    {/* Radar Pulse en el último punto */}
                    {esUltimo && !esHover && (
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="14"
                        fill="none"
                        stroke={esAlza ? '#16a34a' : '#dc2626'}
                        strokeWidth="1.8"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="r"
                          values="6;18;6"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.8;0;0.8"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Eje X de Tiempo en la Base del Gráfico */}
          <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border mt-2 font-bold px-2">
            {serieActual.map((item, idx) => (
              <span
                key={idx}
                onMouseEnter={() => setPuntoHover(item)}
                className={`cursor-pointer transition-colors ${
                  puntoHover?.etiqueta === item.etiqueta ? 'text-primary font-black scale-105' : ''
                }`}
              >
                {item.etiqueta}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Desglose Transparente de la Cadena de Valor (4 Columnas Anchas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              1. En Finca (Campesino)
            </span>
            <div className="text-2xl font-black text-primary">
              ${alimentoSeleccionado.precioFinca.toLocaleString('es-CO')}
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Pago directo en báscula de finca sin comisiones abusivas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              2. Central Mayorista
            </span>
            <div className="text-2xl font-black text-foreground">
              ${alimentoSeleccionado.precioMayorista.toLocaleString('es-CO')}
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Precio de subasta en Corabastos / Mercar / Cavasa.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/50 border border-border space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              3. Supermercado (Ciudad)
            </span>
            <div className="text-2xl font-black text-foreground">
              ${alimentoSeleccionado.precioMinorista.toLocaleString('es-CO')}
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Precio al consumidor con sobrecostos tradicionales (+{(((alimentoSeleccionado.precioMinorista - alimentoSeleccionado.precioFinca) / alimentoSeleccionado.precioFinca) * 100).toFixed(0)}%).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-primary/10 border border-primary/25 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Ahorro Directo con AgroConexión
            </span>
            <div className="text-2xl font-black text-primary">
              -${(alimentoSeleccionado.precioMinorista - alimentoSeleccionado.precioMayorista).toLocaleString('es-CO')} COP
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Comprando a precio de finca ahorras un 35% y apoyas a la familia campesina.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Tabla Completa de Cotizaciones en Vivo de Todos los Alimentos (Ancho Completo) */}
      <section className="w-full rounded-3xl border border-border bg-card shadow-md overflow-hidden">
        <div className="p-5 md:p-6 border-b border-border bg-secondary/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-xl text-foreground flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Pizarra General de Cotizaciones Agropecuarias
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Haz clic en cualquier alimento para cargar instantáneamente su gráfica interactiva en la pantalla principal.
            </p>
          </div>

          {/* Buscador Rápido */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar papa pastusa, tomate, plátano..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="px-6 py-3 border-b border-border bg-card flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'todos', label: 'Todos los Alimentos' },
            { id: 'tuberculos', label: '🥔 Papas y Yuca' },
            { id: 'hortalizas', label: '🍅 Tomates y Cebollas' },
            { id: 'frutas', label: '🥑 Frutas y Aguacate' },
            { id: 'cafe_panela', label: '☕ Café y Panela' }
          ].map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={categoria === cat.id ? 'default' : 'outline'}
              onClick={() => setCategoria(cat.id)}
              className="rounded-full text-xs font-bold shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-muted-foreground font-extrabold uppercase tracking-wider text-left">
                <th className="p-4">Alimento / Variedad</th>
                <th className="p-4">Presentación</th>
                <th className="p-4 text-right">Cotización Mayorista</th>
                <th className="p-4 text-right">Precio en Finca</th>
                <th className="p-4 text-right">Variación 24h</th>
                <th className="p-4 text-right">Volumen Jornada</th>
                <th className="p-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtrados.map((item) => {
                const up = item.variacionPorcentaje >= 0
                const isSelected = alimentoSeleccionado.id === item.id

                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setAlimentoSeleccionado(item)
                      setPuntoHover(null)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-primary/10' : 'hover:bg-secondary/40'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <div className="font-extrabold text-foreground text-sm">
                            {item.nombre}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-medium">
                            {item.variedad}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground font-bold text-xs">
                        {item.presentacion}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="text-base font-black text-foreground">
                        ${item.precioHoy.toLocaleString('es-CO')}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Ayer: ${item.precioAyer.toLocaleString('es-CO')}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <span className="text-base font-extrabold text-primary">
                        ${item.precioFinca.toLocaleString('es-CO')}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-black px-2.5 py-1 rounded-full text-xs ${
                          up
                            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/15'
                            : 'text-red-700 dark:text-red-400 bg-red-500/15'
                        }`}
                      >
                        {up ? '▲ +' : '▼ '}
                        {item.variacionPorcentaje.toFixed(2)}%
                      </span>
                    </td>

                    <td className="p-4 text-right font-bold text-muted-foreground">
                      {item.volumenToneladas.toLocaleString('es-CO')} Ton
                    </td>

                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        variant={isSelected ? 'default' : 'outline'}
                        className="h-8 px-3 font-bold text-xs"
                      >
                        Ver en Gráfica
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
