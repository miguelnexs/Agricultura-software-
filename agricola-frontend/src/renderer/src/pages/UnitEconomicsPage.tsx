import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Truck,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calculator,
  RefreshCw,
  Smartphone,
  Layers,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UnitEconomicsPage(): JSX.Element {
  // Sliders interactivos del modelo de negocio
  const [despachosMensuales, setDespachosMensuales] = useState<number>(300) // 10 viajes/día x 30 días
  const [bultosPorViaje, setBultosPorViaje] = useState<number>(20) // 1 Tonelada
  const [valorPromedioBulto, setValorPromedioBulto] = useState<number>(80000) // $80.000 por bulto
  const [tarifaFletePromedio, setTarifaFletePromedio] = useState<number>(140000) // 25 km consolidado
  const [comisionCargaPct, setComisionCargaPct] = useState<number>(10) // 10%
  const [comisionFletePct, setComisionFletePct] = useState<number>(15) // 15%

  // Cálculos de 1 Viaje Consolidado (Unit Economics)
  const valorBrutoCarga = bultosPorViaje * valorPromedioBulto // $1.600.000
  const costoFleteConsolidado = tarifaFletePromedio // $140.000 ($35.000 x 4 comercios)
  const pagoNetoCampesino = valorBrutoCarga * (1 - comisionCargaPct / 100) // $1.440.000 (90%)
  const pagoNetoConductor = costoFleteConsolidado * (1 - comisionFletePct / 100) // $119.000 (85%)
  const comisionAppCarga = valorBrutoCarga * (comisionCargaPct / 100) // $160.000
  const comisionAppFlete = costoFleteConsolidado * (comisionFletePct / 100) // $21.000
  const totalTransaccion = valorBrutoCarga + costoFleteConsolidado // $1.740.000
  const costoPasarelaPagos = Math.round(totalTransaccion * 0.025 * 1.19) // ~2.5% + IVA = ~$45.000
  const utilidadNeta1Viaje = comisionAppCarga + comisionAppFlete - costoPasarelaPagos // ~$136.000
  const margenNetoPct = ((utilidadNeta1Viaje / totalTransaccion) * 100).toFixed(1) // ~7.8%

  // Proyección Mensual
  const gmvMensual = totalTransaccion * despachosMensuales // ~$522.000.000
  const utilidadBrutaMensual = utilidadNeta1Viaje * despachosMensuales // ~$40.800.000
  const costoCloud = 1200000 // Servidores, Base de datos, API WhatsApp y Mapas
  const costoEquipoOperativo = 3600000 // 2 operadores logísticos y soporte en ruta
  const costoMarketing = 3000000 // Adquisición en campo
  const costosFijosTotales = costoCloud + costoEquipoOperativo + costoMarketing // $7.800.000
  const utilidadLibreMensual = utilidadBrutaMensual - costosFijosTotales // ~$33.000.000

  return (
    <div className="w-full space-y-7">
      {/* 1. Header Ejecutivo del Plan de Negocio */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/25 via-secondary/70 to-card border border-border p-6 md:p-8 shadow-md">
        <div className="h-1.5 w-full zocalo-border absolute top-0 left-0" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-black uppercase tracking-wider">
              <FileText className="h-3.5 w-3.5" />
              Estrategia y Modelo de Negocio • Plataforma Agro-Logística
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Análisis Financiero, Unit Economics y Rentabilidad
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Tesis Central: La intermediación tradicional deja solo el 20%-30% al campesino. El modelo B2C puro fracasa por el alto costo del flete individual. La rentabilidad real radica en la <strong className="text-foreground">Consolidación de Carga B2B (Milk-Run)</strong> y el <strong className="text-foreground">Flete de Retorno (Backhauling)</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <div className="p-4 rounded-2xl bg-card border border-border text-xs space-y-1 shadow-sm">
              <span className="font-extrabold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                Utilidad Libre Mensual (Etapa Temprana):
              </span>
              <p className="text-2xl font-black text-primary">
                ${utilidadLibreMensual.toLocaleString('es-CO')} COP
              </p>
              <span className="text-[11px] text-muted-foreground font-semibold">
                Base conservadora de {despachosMensuales} viajes/mes (10 diarios)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Simulador Interactivo de 1 Viaje Consolidado (Unit Economics) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders de Configuración de Viaje (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl border border-border bg-card shadow-md space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="font-black text-lg text-foreground flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Simulador de 1 Viaje Consolidado (1 Ton / 20 Bultos)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Trayecto de 25 km en camioneta 4x4 o camión con pedidos agrupados de 4 restaurantes.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Bultos por Viaje */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground">Bultos de Alimento por Viaje:</span>
                  <span className="text-foreground font-black text-sm">{bultosPorViaje} bultos (~{bultosPorViaje * 50} kg)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="2"
                  value={bultosPorViaje}
                  onChange={(e) => setBultosPorViaje(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Valor Promedio por Bulto */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground">Valor Promedio por Bulto:</span>
                  <span className="text-foreground font-black text-sm">${valorPromedioBulto.toLocaleString('es-CO')} COP</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="150000"
                  step="5000"
                  value={valorPromedioBulto}
                  onChange={(e) => setValorPromedioBulto(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Costo del Flete Consolidado */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground">Costo Total del Flete (25 km):</span>
                  <span className="text-foreground font-black text-sm">${tarifaFletePromedio.toLocaleString('es-CO')} COP</span>
                </div>
                <input
                  type="range"
                  min="80000"
                  max="250000"
                  step="10000"
                  value={tarifaFletePromedio}
                  onChange={(e) => setTarifaFletePromedio(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <span className="text-[11px] text-muted-foreground block text-right">
                  = ${(tarifaFletePromedio / 4).toLocaleString('es-CO')} por cada uno de los 4 restaurantes
                </span>
              </div>

              {/* Comisiones */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-secondary/50 border border-border space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground block">
                    Comisión Carga App:
                  </span>
                  <div className="text-base font-black text-primary">{comisionCargaPct}%</div>
                  <span className="text-[10px] text-muted-foreground">Campesino recibe el 90%</span>
                </div>
                <div className="p-3 rounded-2xl bg-secondary/50 border border-border space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground block">
                    Comisión Flete App:
                  </span>
                  <div className="text-base font-black text-primary">{comisionFletePct}%</div>
                  <span className="text-[10px] text-muted-foreground">Conductor recibe el 85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla Exacta de Unit Economics (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-black text-lg text-foreground flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Desglose de Unit Economics por 1 Viaje
                </h3>
                <p className="text-xs text-muted-foreground">
                  Estructuración operativa y distribución transparente de cada peso.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">Margen Neto App</span>
                <span className="text-xl font-black text-primary">~{margenNetoPct}%</span>
              </div>
            </div>

            {/* Tabla de Conceptos Operativos del PDF */}
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-secondary/70 border-b border-border text-foreground font-black uppercase text-left">
                    <th className="p-3">Concepto Operativo</th>
                    <th className="p-3 text-right">Valor (COP)</th>
                    <th className="p-3 text-left">Actor que Recibe / Asume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  <tr>
                    <td className="p-3 font-bold text-foreground">
                      Valor bruto de la carga ({bultosPorViaje} bultos)
                    </td>
                    <td className="p-3 text-right font-black text-foreground">
                      ${valorBrutoCarga.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Pagado por los 4 restaurantes compradores
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">
                      Costo del flete rural-urbano (25 km consolidados)
                    </td>
                    <td className="p-3 text-right font-black text-foreground">
                      ${costoFleteConsolidado.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Pagado por los restaurantes (${(costoFleteConsolidado / 4).toLocaleString('es-CO')} c/u)
                    </td>
                  </tr>
                  <tr className="bg-emerald-500/5">
                    <td className="p-3 font-extrabold text-emerald-700 dark:text-emerald-400">
                      Pago neto al Campesino (90% valor carga)
                    </td>
                    <td className="p-3 text-right font-black text-emerald-700 dark:text-emerald-400">
                      ${pagoNetoCampesino.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">
                      Ingreso directo a billetera del productor (Nequi/Daviplata)
                    </td>
                  </tr>
                  <tr className="bg-amber-500/5">
                    <td className="p-3 font-extrabold text-amber-700 dark:text-amber-400">
                      Pago neto al Conductor (85% valor flete)
                    </td>
                    <td className="p-3 text-right font-black text-amber-700 dark:text-amber-400">
                      ${pagoNetoConductor.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 font-bold text-amber-700 dark:text-amber-400">
                      Ingreso directo para el transportador veredal
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-primary">
                      Comisión de la App por Carga (10%)
                    </td>
                    <td className="p-3 text-right font-black text-primary">
                      ${comisionAppCarga.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Ingreso bruto de la plataforma (Marketplace)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-primary">
                      Comisión de la App por Flete (15%)
                    </td>
                    <td className="p-3 text-right font-black text-primary">
                      ${comisionAppFlete.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Ingreso bruto de la plataforma (Logística)
                    </td>
                  </tr>
                  <tr className="text-red-700 dark:text-red-400">
                    <td className="p-3 font-bold">
                      Costo de pasarela de pagos (~2,5% + IVA sobre total)
                    </td>
                    <td className="p-3 text-right font-black">
                      -${costoPasarelaPagos.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Pasarela financiera (Wompi / ePayco / Mercado Pago)
                    </td>
                  </tr>
                  <tr className="bg-primary/15 border-t-2 border-primary text-sm font-black">
                    <td className="p-3.5 text-primary uppercase">
                      UTILIDAD NETA PARA LA PLATAFORMA EN 1 VIAJE
                    </td>
                    <td className="p-3.5 text-right text-primary text-base">
                      ${utilidadNeta1Viaje.toLocaleString('es-CO')}
                    </td>
                    <td className="p-3.5 text-primary text-xs">
                      Margen neto por despacho (~{margenNetoPct}% del volumen total)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Proyección Financiera Mensual (Etapa Inicial — Meses 1 a 6) */}
      <section className="w-full rounded-3xl border border-border bg-card p-6 md:p-8 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-wider mb-1">
              <TrendingUp className="h-4 w-4" />
              Escalabilidad Financiera
            </div>
            <h2 className="text-2xl font-black text-foreground">
              Proyección Financiera Mensual (1 Solo Corredor Agrícola Regional)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Meta conservadora de 10 viajes consolidados por día ({despachosMensuales} despachos al mes).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-muted-foreground">Viajes/Mes:</span>
            <div className="flex items-center gap-1 bg-secondary p-1 rounded-xl border border-border">
              {[150, 300, 450, 600].map((v) => (
                <Button
                  key={v}
                  size="sm"
                  variant={despachosMensuales === v ? 'default' : 'ghost'}
                  onClick={() => setDespachosMensuales(v)}
                  className="h-7 px-3 text-xs font-black rounded-lg"
                >
                  {v} viajes
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla Financiera Mensual */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-secondary/70 border-b border-border text-foreground font-black uppercase text-left">
                <th className="p-3.5">Rubro Financiero Mensual (Base: {despachosMensuales} Despachos/Mes)</th>
                <th className="p-3.5 text-right">Monto Estimado (COP)</th>
                <th className="p-3.5 text-left">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              <tr>
                <td className="p-3.5 font-bold text-foreground">
                  Volumen Bruto de Mercancía y Fletes Movidos (GMV Mensual)
                </td>
                <td className="p-3.5 text-right font-black text-foreground text-sm">
                  ${gmvMensual.toLocaleString('es-CO')}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  Total de dinero movilizado a través de la pasarela de pagos
                </td>
              </tr>
              <tr className="bg-primary/5">
                <td className="p-3.5 font-extrabold text-primary">
                  Utilidad Operativa Bruta de la Plataforma ({despachosMensuales} viajes × ${utilidadNeta1Viaje.toLocaleString('es-CO')})
                </td>
                <td className="p-3.5 text-right font-black text-primary text-sm">
                  ${utilidadBrutaMensual.toLocaleString('es-CO')}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  Margen bruto generado por comisiones de carga y flete
                </td>
              </tr>
              <tr className="text-red-700 dark:text-red-400">
                <td className="p-3.5 font-semibold">
                  (-) Infraestructura Cloud (Servidores, Base de Datos, API WhatsApp y Mapas)
                </td>
                <td className="p-3.5 text-right font-black">
                  -${costoCloud.toLocaleString('es-CO')}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  AWS/GCP, Twilio / WhatsApp Cloud API, geocodificación
                </td>
              </tr>
              <tr className="text-red-700 dark:text-red-400">
                <td className="p-3.5 font-semibold">
                  (-) Equipo Operativo Inicial (2 operadores logísticos y soporte en ruta)
                </td>
                <td className="p-3.5 text-right font-black">
                  -${costoEquipoOperativo.toLocaleString('es-CO')}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  Personal en centro de acopio y seguimiento de camiones/Willys
                </td>
              </tr>
              <tr className="text-red-700 dark:text-red-400">
                <td className="p-3.5 font-semibold">
                  (-) Marketing y Adquisición de Usuarios en Campo (Campesinos y Comercios)
                </td>
                <td className="p-3.5 text-right font-black">
                  -${costoMarketing.toLocaleString('es-CO')}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  Visitas a veredas, activación de restaurantes y kits de balanza
                </td>
              </tr>
              <tr className="bg-emerald-500/15 border-t-2 border-emerald-500 text-sm font-black">
                <td className="p-4 text-emerald-800 dark:text-emerald-300 uppercase">
                  UTILIDAD LIBRE MENSUAL ESTIMADA (ETAPA TEMPRANA)
                </td>
                <td className="p-4 text-right text-emerald-800 dark:text-emerald-300 text-lg">
                  ${utilidadLibreMensual.toLocaleString('es-CO')} COP
                </td>
                <td className="p-4 text-emerald-800 dark:text-emerald-300 text-xs">
                  Flujo de caja libre mensual generado en 1 solo corredor agrícola
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Los 3 Pilares y los 4 Pasos del Sistema Antifraude (Escrow) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Los 3 Pilares Operativos */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="font-black text-lg text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Estructura del Ecosistema (3 Pilares)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 font-black text-foreground">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>A. El Campesino (WhatsApp Bot + IA & Pre-Cosecha)</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                El agricultor envía una nota de voz o foto por WhatsApp ("Tengo 15 bultos de plátano para el jueves a $65.000"). La IA transcribe, clasifica y publica la venta programada a 3-7 días para reducir a cero la merma.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 font-black text-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                <span>B. El Comprador (B2B Motor Financiero & B2C Grupos)</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Restaurantes, fruvers y hoteles compran por volumen ahorrando entre el 15% y 25%. Para familias (B2C), los pedidos se agrupan por edificio, conjunto residencial o canastas semanales pre-armadas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-1">
              <div className="flex items-center gap-2 font-black text-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>C. El Transporte Rural (Milk-Run & Backhauling)</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Aprovecha los viajes de retorno de camionetas que suben insumos a veredas y bajan vacías. Consolidación de ruta donde 1 conductor recoge en 3 fincas y entrega a 4 comercios.
              </p>
            </div>
          </div>
        </div>

        {/* Flujo Antifraude Paso a Paso (Escrow) */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="font-black text-lg text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Flujo Operativo Antifraude (Sistema Escrow)
          </h3>

          <div className="space-y-3 text-xs">
            {[
              {
                paso: '1. Compra y Retención en Custodia',
                desc: 'El comercio paga mediante PSE, Nequi o tarjeta. El dinero queda asegurado en custodia (Escrow) en la pasarela de la plataforma.',
                icono: '🔒'
              },
              {
                paso: '2. Asignación de "Agro-Driver"',
                desc: 'El algoritmo asigna el viaje a un conductor veredal cercano con vehículo verificado (SOAT, tecno y licencia al día).',
                icono: '🚙'
              },
              {
                paso: '3. Inspección en Origen & Pago Inmediato al Campesino',
                desc: 'El conductor verifica el peso y toma foto obligatoria. Al subir la carga al vehículo, se libera de inmediato el pago al campesino en su Nequi o Daviplata.',
                icono: '📸'
              },
              {
                paso: '4. Entrega, Validación QR & Liquidación del Flete',
                desc: 'El conductor entrega en la ciudad, el comprador valida con código QR y la plataforma libera automáticamente el pago del flete al transportador.',
                icono: '📲'
              }
            ].map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-secondary/50 border border-border flex items-start gap-3">
                <span className="text-xl p-1 bg-background rounded-xl shrink-0">{p.icono}</span>
                <div>
                  <h4 className="font-black text-foreground">{p.paso}</h4>
                  <p className="text-muted-foreground leading-relaxed mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

